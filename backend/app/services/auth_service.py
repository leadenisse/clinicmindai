from datetime import datetime, timedelta
from typing import Tuple, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User, UserRole
from app.models.tenant import Tenant
from app.repositories.user_repository import UserRepository
from app.repositories.tenant_repository import TenantRepository
from app.schemas.auth import RegisterRequest, LoginRequest
from app.core.security import (
    get_password_hash,
    verify_password,
    create_access_token,
    create_refresh_token,
    decode_token,
    generate_token,
    generate_mfa_secret,
    get_mfa_uri,
    verify_mfa_code,
)
from app.core.exceptions import (
    InvalidCredentialsException,
    EmailAlreadyExistsException,
    TokenExpiredException,
    InvalidTokenException,
    MFARequiredException,
    AccountLockedException,
)


class AuthService:
    """Service d'authentification"""

    MAX_LOGIN_ATTEMPTS = 5
    LOCKOUT_DURATION_MINUTES = 15

    def __init__(self, db: AsyncSession):
        self.db = db
        self.user_repo = UserRepository(db)
        self.tenant_repo = TenantRepository(db)

    async def register(self, data: RegisterRequest) -> Tuple[User, Tenant]:
        """Inscrit un nouveau cabinet avec son admin"""

        # Vérifier si l'email existe
        if await self.user_repo.email_exists(data.email):
            raise EmailAlreadyExistsException()

        # Créer le cabinet (tenant)
        tenant = await self.tenant_repo.create({
            "name": data.cabinet_name,
        })

        # Créer l'utilisateur admin
        user = await self.user_repo.create({
            "email": data.email,
            "password_hash": get_password_hash(data.password),
            "first_name": data.first_name,
            "last_name": data.last_name,
            "phone": data.phone,
            "role": UserRole.ADMIN,
            "tenant_id": tenant.id,
            "is_active": True,
            "is_email_verified": False,
        })

        return user, tenant

    async def login(self, data: LoginRequest) -> Tuple[str, str, User]:
        """Connecte un utilisateur et retourne les tokens"""

        user = await self.user_repo.get_by_email(data.email)

        if not user:
            raise InvalidCredentialsException()

        # Vérifier si le compte est verrouillé
        if user.locked_until and user.locked_until > datetime.utcnow():
            remaining = (user.locked_until - datetime.utcnow()).seconds // 60
            raise AccountLockedException(remaining + 1)

        # Vérifier le mot de passe
        if not verify_password(data.password, user.password_hash):
            user.failed_login_attempts += 1

            if user.failed_login_attempts >= self.MAX_LOGIN_ATTEMPTS:
                user.locked_until = datetime.utcnow() + timedelta(
                    minutes=self.LOCKOUT_DURATION_MINUTES
                )

            await self.db.flush()
            raise InvalidCredentialsException()

        # Vérifier si le compte est actif
        if not user.is_active:
            raise InvalidCredentialsException()

        # Vérifier MFA si activé
        if user.mfa_enabled:
            if not data.mfa_code:
                raise MFARequiredException()

            if not verify_mfa_code(user.mfa_secret or "", data.mfa_code):
                raise InvalidCredentialsException()

        # Reset tentatives et mettre à jour last_login
        user.failed_login_attempts = 0
        user.locked_until = None
        user.last_login_at = datetime.utcnow()
        await self.db.flush()

        # Générer les tokens
        access_token = create_access_token(
            subject=user.id,
            tenant_id=user.tenant_id,
            role=user.role.value,
        )
        refresh_token = create_refresh_token(subject=user.id)

        return access_token, refresh_token, user

    async def refresh_tokens(self, refresh_token: str) -> Tuple[str, str]:
        """Rafraîchit les tokens"""

        payload = decode_token(refresh_token)

        if not payload:
            raise InvalidTokenException()

        if payload.get("type") != "refresh":
            raise InvalidTokenException()

        user_id = payload.get("sub")
        user = await self.user_repo.get_by_id(user_id or "")

        if not user or not user.is_active:
            raise InvalidTokenException()

        access_token = create_access_token(
            subject=user.id,
            tenant_id=user.tenant_id,
            role=user.role.value,
        )
        new_refresh_token = create_refresh_token(subject=user.id)

        return access_token, new_refresh_token

    async def request_password_reset(self, email: str) -> Optional[str]:
        """Demande un reset de mot de passe"""

        user = await self.user_repo.get_by_email(email)

        if not user:
            return None

        token = generate_token()
        user.reset_token = token
        user.reset_token_expires_at = datetime.utcnow() + timedelta(hours=1)
        await self.db.flush()

        return token

    async def reset_password(self, token: str, new_password: str) -> bool:
        """Reset le mot de passe avec le token"""

        user = await self.user_repo.get_by_reset_token(token)

        if not user:
            raise InvalidTokenException()

        if user.reset_token_expires_at and user.reset_token_expires_at < datetime.utcnow():
            raise TokenExpiredException()

        user.password_hash = get_password_hash(new_password)
        user.reset_token = None
        user.reset_token_expires_at = None
        user.last_password_change_at = datetime.utcnow()
        await self.db.flush()

        return True

    async def setup_mfa(self, user: User) -> Tuple[str, str]:
        """Configure le MFA pour un utilisateur"""

        secret = generate_mfa_secret()
        uri = get_mfa_uri(secret, user.email)

        user.mfa_secret = secret
        await self.db.flush()

        return secret, uri

    async def verify_and_enable_mfa(self, user: User, code: str) -> bool:
        """Vérifie le code MFA et active le MFA"""

        if not user.mfa_secret:
            return False

        if not verify_mfa_code(user.mfa_secret, code):
            return False

        user.mfa_enabled = True
        await self.db.flush()

        return True

    async def disable_mfa(self, user: User) -> bool:
        """Désactive le MFA"""

        user.mfa_enabled = False
        user.mfa_secret = None
        await self.db.flush()

        return True
