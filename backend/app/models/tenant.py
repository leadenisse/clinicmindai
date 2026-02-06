from sqlalchemy import Column, String, Boolean, DateTime, Integer, JSON
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.base import TimestampMixin, generate_uuid


class Tenant(Base, TimestampMixin):
    """Cabinet dentaire (multi-tenancy)"""
    __tablename__ = "tenants"

    id = Column(String(36), primary_key=True, default=generate_uuid)

    # Informations générales
    name = Column(String(255), nullable=False)
    address = Column(String(500))
    address_line2 = Column(String(255))
    zip_code = Column(String(10))
    city = Column(String(100))
    country = Column(String(100), default="France")
    phone = Column(String(20))
    email = Column(String(255))
    website = Column(String(255))

    # Identifiants légaux
    siret = Column(String(14))
    rpps = Column(String(11))
    adeli = Column(String(9))

    # Logo
    logo_url = Column(String(500))

    # Paramètres planning
    default_appointment_duration = Column(Integer, default=30)
    slot_duration = Column(Integer, default=15)
    opening_time = Column(String(5), default="08:00")
    closing_time = Column(String(5), default="19:00")
    working_days = Column(JSON, default=[1, 2, 3, 4, 5])

    # Paramètres facturation
    default_payment_delay = Column(Integer, default=30)
    default_quote_validity = Column(Integer, default=90)

    # Mentions légales
    legal_mentions = Column(JSON, default=dict)

    # Personnalisation
    primary_color = Column(String(7), default="#14B8A6")

    # Onboarding
    onboarding_completed = Column(Boolean, default=False)
    onboarding_level = Column(String(20))

    # Statut
    is_active = Column(Boolean, default=True)
    suspended_at = Column(DateTime)
    suspension_reason = Column(String(500))

    # Relations
    users = relationship("User", back_populates="tenant", lazy="selectin")

    def __repr__(self):
        return f"<Tenant {self.name}>"
