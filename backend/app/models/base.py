from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import declared_attr
import uuid


def generate_uuid() -> str:
    """Génère un UUID v4 sous forme de string"""
    return str(uuid.uuid4())


class TimestampMixin:
    """Ajoute created_at et updated_at à un modèle"""
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )


class SoftDeleteMixin:
    """Ajoute le soft delete à un modèle"""
    deleted_at = Column(DateTime, nullable=True)

    @property
    def is_deleted(self) -> bool:
        return self.deleted_at is not None


class TenantMixin:
    """Multi-tenancy : appartenance à un cabinet"""
    @declared_attr
    def tenant_id(cls):
        return Column(
            String(36),
            ForeignKey("tenants.id"),
            nullable=False,
            index=True
        )
