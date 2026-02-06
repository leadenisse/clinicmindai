from typing import Annotated
from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.models.user import User, UserRole
from app.repositories.user_repository import UserRepository
from app.core.security import decode_token
from app.core.exceptions import UnauthorizedException, ForbiddenException

# Security scheme
security = HTTPBearer()


async def get_current_user(
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(security)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> User:
    """Récupère l'utilisateur courant depuis le token JWT"""

    token = credentials.credentials
    payload = decode_token(token)

    if not payload:
        raise UnauthorizedException(detail="Token invalide")

    if payload.get("type") != "access":
        raise UnauthorizedException(detail="Type de token invalide")

    user_id = payload.get("sub")
    if not user_id:
        raise UnauthorizedException(detail="Token invalide")

    user_repo = UserRepository(db)
    user = await user_repo.get_by_id(user_id)

    if not user:
        raise UnauthorizedException(detail="Utilisateur non trouvé")

    if not user.is_active:
        raise UnauthorizedException(detail="Compte désactivé")

    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
) -> User:
    """Vérifie que l'utilisateur est actif"""
    if not current_user.is_active:
        raise ForbiddenException(detail="Compte inactif")
    return current_user


def require_role(*roles: UserRole):
    """Dependency pour vérifier les rôles"""
    async def role_checker(
        current_user: Annotated[User, Depends(get_current_user)],
    ) -> User:
        if current_user.role not in roles:
            raise ForbiddenException(detail="Permission refusée")
        return current_user
    return role_checker


# Type hints pour les dépendances
CurrentUser = Annotated[User, Depends(get_current_user)]
DBSession = Annotated[AsyncSession, Depends(get_db)]
