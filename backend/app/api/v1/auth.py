from fastapi import APIRouter, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.auth import (
    RegisterRequest,
    LoginRequest,
    TokenResponse,
    RefreshTokenRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    MFASetupResponse,
    MFAVerifyRequest,
    ChangePasswordRequest,
)
from app.schemas.common import ResponseBase
from app.services.auth_service import AuthService
from app.api.deps import CurrentUser, DBSession
from app.core.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    create_refresh_token,
)
from app.core.exceptions import BadRequestException
from app.config import settings

router = APIRouter(prefix="/auth", tags=["Authentification"])


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(data: RegisterRequest, db: DBSession):
    """
    Inscription d'un nouveau cabinet.
    Crée le cabinet (tenant) et l'utilisateur admin.
    """
    service = AuthService(db)
    user, tenant = await service.register(data)

    access_token = create_access_token(
        subject=user.id,
        tenant_id=user.tenant_id,
        role=user.role.value,
    )
    refresh_token = create_refresh_token(subject=user.id)

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )


@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest, db: DBSession):
    """
    Connexion utilisateur.
    Retourne les tokens JWT.
    """
    service = AuthService(db)
    access_token, refresh_token, user = await service.login(data)

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(data: RefreshTokenRequest, db: DBSession):
    """
    Rafraîchit les tokens JWT.
    """
    service = AuthService(db)
    access_token, new_refresh_token = await service.refresh_tokens(data.refresh_token)

    return TokenResponse(
        access_token=access_token,
        refresh_token=new_refresh_token,
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )


@router.post("/forgot-password", response_model=ResponseBase)
async def forgot_password(data: ForgotPasswordRequest, db: DBSession):
    """
    Demande de réinitialisation du mot de passe.
    """
    service = AuthService(db)
    await service.request_password_reset(data.email)

    return ResponseBase(
        success=True,
        message="Si l'email existe, un lien de réinitialisation a été envoyé.",
    )


@router.post("/reset-password", response_model=ResponseBase)
async def reset_password(data: ResetPasswordRequest, db: DBSession):
    """
    Réinitialise le mot de passe avec le token.
    """
    service = AuthService(db)
    await service.reset_password(data.token, data.password)

    return ResponseBase(
        success=True,
        message="Mot de passe réinitialisé avec succès.",
    )


@router.get("/me")
async def get_me(current_user: CurrentUser):
    """
    Récupère les informations de l'utilisateur connecté.
    """
    tenant_name = current_user.tenant.name if current_user.tenant else None
    return {
        "id": current_user.id,
        "email": current_user.email,
        "first_name": current_user.first_name,
        "last_name": current_user.last_name,
        "phone": current_user.phone,
        "role": current_user.role,
        "rpps": current_user.rpps,
        "specialty": current_user.specialty,
        "avatar_url": current_user.avatar_url,
        "is_active": current_user.is_active,
        "is_email_verified": current_user.is_email_verified,
        "mfa_enabled": current_user.mfa_enabled,
        "last_login_at": current_user.last_login_at,
        "created_at": current_user.created_at,
        "tenant_id": current_user.tenant_id,
        "tenant_name": tenant_name,
        "preferences": current_user.preferences or {},
    }


@router.put("/me/password", response_model=ResponseBase)
async def change_password(
    data: ChangePasswordRequest,
    current_user: CurrentUser,
    db: DBSession,
):
    """
    Change le mot de passe de l'utilisateur connecté.
    """
    if not verify_password(data.current_password, current_user.password_hash):
        raise BadRequestException(detail="Mot de passe actuel incorrect")

    current_user.password_hash = get_password_hash(data.new_password)
    await db.flush()

    return ResponseBase(
        success=True,
        message="Mot de passe modifié avec succès.",
    )


@router.post("/mfa/setup", response_model=MFASetupResponse)
async def setup_mfa(current_user: CurrentUser, db: DBSession):
    """
    Configure le MFA (2FA) pour l'utilisateur.
    """
    if current_user.mfa_enabled:
        raise BadRequestException(detail="MFA déjà activé")

    service = AuthService(db)
    secret, uri = await service.setup_mfa(current_user)

    return MFASetupResponse(secret=secret, qr_code_uri=uri)


@router.post("/mfa/verify", response_model=ResponseBase)
async def verify_mfa(
    data: MFAVerifyRequest,
    current_user: CurrentUser,
    db: DBSession,
):
    """
    Vérifie le code MFA et active le MFA.
    """
    service = AuthService(db)
    success = await service.verify_and_enable_mfa(current_user, data.code)

    if not success:
        raise BadRequestException(detail="Code MFA invalide")

    return ResponseBase(
        success=True,
        message="MFA activé avec succès.",
    )


@router.post("/mfa/disable", response_model=ResponseBase)
async def disable_mfa(current_user: CurrentUser, db: DBSession):
    """
    Désactive le MFA.
    """
    if not current_user.mfa_enabled:
        raise BadRequestException(detail="MFA non activé")

    service = AuthService(db)
    await service.disable_mfa(current_user)

    return ResponseBase(
        success=True,
        message="MFA désactivé.",
    )
