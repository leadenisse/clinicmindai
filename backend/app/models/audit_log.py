from datetime import datetime
from sqlalchemy import Column, String, DateTime, Text, Enum, JSON, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.base import generate_uuid
import enum


class AuditAction(str, enum.Enum):
    """Types d'actions auditées"""
    CREATE = "create"
    READ = "read"
    UPDATE = "update"
    DELETE = "delete"

    LOGIN = "login"
    LOGOUT = "logout"
    LOGIN_FAILED = "login_failed"
    PASSWORD_CHANGE = "password_change"
    PASSWORD_RESET = "password_reset"
    MFA_ENABLED = "mfa_enabled"
    MFA_DISABLED = "mfa_disabled"

    UPLOAD = "upload"
    DOWNLOAD = "download"

    EXPORT = "export"

    USER_INVITE = "user_invite"
    USER_DEACTIVATE = "user_deactivate"
    SETTINGS_CHANGE = "settings_change"


class AuditLog(Base):
    """Journal d'audit pour la conformité RGPD"""
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=generate_uuid)

    tenant_id = Column(String(36), ForeignKey("tenants.id"), nullable=False, index=True)

    user_id = Column(String(36), ForeignKey("users.id"), index=True)
    user_email = Column(String(255))

    action = Column(Enum(AuditAction), nullable=False, index=True)

    resource_type = Column(String(50), index=True)
    resource_id = Column(String(36), index=True)
    resource_name = Column(String(255))

    details = Column(JSON, default={})

    changes = Column(JSON)

    ip_address = Column(String(45))
    user_agent = Column(String(500))

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)

    tenant = relationship("Tenant")
    user = relationship("User")

    def __repr__(self):
        return f"<AuditLog {self.action} {self.resource_type}:{self.resource_id}>"
