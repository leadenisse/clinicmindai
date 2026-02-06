from sqlalchemy import Column, String, Boolean, DateTime, Enum, ForeignKey, JSON, Integer
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.base import TimestampMixin, TenantMixin, generate_uuid
import enum


class UserRole(str, enum.Enum):
    ADMIN = "admin"
    PRACTITIONER = "practitioner"
    SECRETARY = "secretary"


class User(Base, TimestampMixin, TenantMixin):
    """Utilisateur du système"""
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=generate_uuid)

    # Auth
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)

    # Profil
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    phone = Column(String(20))
    avatar_url = Column(String(500))

    # Rôle
    role = Column(Enum(UserRole), nullable=False, default=UserRole.PRACTITIONER)

    # Identifiants professionnels (praticiens)
    rpps = Column(String(11))
    specialty = Column(String(100))

    # MFA
    mfa_enabled = Column(Boolean, default=False)
    mfa_secret = Column(String(32))

    # Statut
    is_active = Column(Boolean, default=True)
    is_email_verified = Column(Boolean, default=False)
    email_verified_at = Column(DateTime)

    # Invitation
    is_invite_pending = Column(Boolean, default=False)
    invite_token = Column(String(100))
    invite_expires_at = Column(DateTime)
    invited_by_id = Column(String(36), ForeignKey("users.id"))

    # Préférences
    preferences = Column(JSON, default=dict)

    # Sécurité
    last_login_at = Column(DateTime)
    last_password_change_at = Column(DateTime)
    failed_login_attempts = Column(Integer, default=0)
    locked_until = Column(DateTime)

    # Reset password
    reset_token = Column(String(100))
    reset_token_expires_at = Column(DateTime)

    # Relations
    tenant = relationship("Tenant", back_populates="users", lazy="selectin")
    invited_by = relationship("User", remote_side=[id])

    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"

    def __repr__(self):
        return f"<User {self.email}>"
