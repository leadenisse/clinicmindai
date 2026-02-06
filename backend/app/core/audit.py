from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Request
from app.models.audit_log import AuditLog, AuditAction
from app.models.user import User


class AuditService:
    """Service d'audit pour la conformité RGPD"""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def log(
        self,
        action: AuditAction,
        user: Optional[User],
        tenant_id: str,
        resource_type: Optional[str] = None,
        resource_id: Optional[str] = None,
        resource_name: Optional[str] = None,
        details: Optional[dict] = None,
        changes: Optional[dict] = None,
        request: Optional[Request] = None,
    ) -> AuditLog:
        """Enregistre une entrée d'audit"""

        ip_address = None
        user_agent = None

        if request:
            ip_address = request.client.host if request.client else None
            user_agent = request.headers.get("user-agent")

        log = AuditLog(
            tenant_id=tenant_id,
            user_id=user.id if user else None,
            user_email=user.email if user else None,
            action=action,
            resource_type=resource_type,
            resource_id=resource_id,
            resource_name=resource_name,
            details=details or {},
            changes=changes,
            ip_address=ip_address,
            user_agent=user_agent,
        )

        self.db.add(log)
        await self.db.flush()

        return log


def compute_changes(old_data: dict, new_data: dict) -> Optional[dict]:
    """
    Compare deux dictionnaires et retourne les changements.
    Format: {"field": {"old": value1, "new": value2}}
    """
    changes = {}

    all_keys = set(old_data.keys()) | set(new_data.keys())

    for key in all_keys:
        old_value = old_data.get(key)
        new_value = new_data.get(key)

        if old_value != new_value:
            changes[key] = {
                "old": old_value,
                "new": new_value
            }

    return changes if changes else None
