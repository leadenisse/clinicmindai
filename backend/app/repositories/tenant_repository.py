from sqlalchemy.ext.asyncio import AsyncSession
from app.models.tenant import Tenant
from app.repositories.base import BaseRepository


class TenantRepository(BaseRepository[Tenant]):
    """Repository pour les cabinets"""

    def __init__(self, db: AsyncSession):
        super().__init__(Tenant, db)
