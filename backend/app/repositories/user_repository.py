from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User
from app.repositories.base import BaseRepository


class UserRepository(BaseRepository[User]):
    """Repository pour les utilisateurs"""

    def __init__(self, db: AsyncSession):
        super().__init__(User, db)

    async def get_by_email(self, email: str) -> Optional[User]:
        """Récupère un utilisateur par email"""
        result = await self.db.execute(
            select(User).where(User.email == email)
        )
        return result.scalar_one_or_none()

    async def get_by_reset_token(self, token: str) -> Optional[User]:
        """Récupère un utilisateur par token de reset"""
        result = await self.db.execute(
            select(User).where(User.reset_token == token)
        )
        return result.scalar_one_or_none()

    async def get_by_invite_token(self, token: str) -> Optional[User]:
        """Récupère un utilisateur par token d'invitation"""
        result = await self.db.execute(
            select(User).where(User.invite_token == token)
        )
        return result.scalar_one_or_none()

    async def email_exists(self, email: str) -> bool:
        """Vérifie si un email existe déjà"""
        user = await self.get_by_email(email)
        return user is not None
