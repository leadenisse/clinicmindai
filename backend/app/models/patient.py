from datetime import datetime, date
from typing import Optional, List
from sqlalchemy import (
    Column, String, Boolean, DateTime, Date,
    Text, Enum, JSON, ForeignKey, Integer, Float
)
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.base import TimestampMixin, SoftDeleteMixin, TenantMixin, generate_uuid
import enum


class Gender(str, enum.Enum):
    MALE = "M"
    FEMALE = "F"
    OTHER = "O"


class MaritalStatus(str, enum.Enum):
    SINGLE = "single"
    MARRIED = "married"
    DIVORCED = "divorced"
    WIDOWED = "widowed"
    PACS = "pacs"
    OTHER = "other"


class BloodType(str, enum.Enum):
    A_POS = "A+"
    A_NEG = "A-"
    B_POS = "B+"
    B_NEG = "B-"
    AB_POS = "AB+"
    AB_NEG = "AB-"
    O_POS = "O+"
    O_NEG = "O-"
    UNKNOWN = "unknown"


class Patient(Base, TimestampMixin, SoftDeleteMixin, TenantMixin):
    """Patient du cabinet dentaire"""
    __tablename__ = "patients"

    id = Column(String(36), primary_key=True, default=generate_uuid)

    # ══════════════════════════════════════════════════════════════
    # INFORMATIONS PERSONNELLES
    # ══════════════════════════════════════════════════════════════

    gender = Column(Enum(Gender), nullable=False)
    first_name = Column(String(100), nullable=False, index=True)
    last_name = Column(String(100), nullable=False, index=True)
    maiden_name = Column(String(100))
    birth_date = Column(Date, nullable=False)
    birth_place = Column(String(255))
    nationality = Column(String(100), default="Française")

    email = Column(String(255), index=True)
    phone = Column(String(20))
    mobile_phone = Column(String(20))

    address = Column(String(500))
    address_line2 = Column(String(255))
    zip_code = Column(String(10))
    city = Column(String(100))
    country = Column(String(100), default="France")

    marital_status = Column(Enum(MaritalStatus), default=MaritalStatus.SINGLE)
    profession = Column(String(255))
    employer = Column(String(255))

    photo_url = Column(String(500))

    # ══════════════════════════════════════════════════════════════
    # INFORMATIONS MÉDICALES
    # ══════════════════════════════════════════════════════════════

    blood_type = Column(Enum(BloodType), default=BloodType.UNKNOWN)

    referring_doctor = Column(String(255))
    referring_doctor_phone = Column(String(20))

    medical_history = Column(JSON, default={
        "allergies": [],
        "chronic_conditions": [],
        "surgeries": [],
        "medications": [],
        "family_history": [],
    })

    dental_contraindications = Column(JSON, default=[])

    medical_notes = Column(Text)

    medical_alerts = Column(JSON, default=[])

    # ══════════════════════════════════════════════════════════════
    # ASSURANCE MALADIE
    # ══════════════════════════════════════════════════════════════

    social_security_number = Column(String(15), index=True)

    insurance_regime = Column(String(100))
    insurance_fund = Column(String(100))
    insurance_fund_code = Column(String(10))

    vital_card_number = Column(String(20))
    vital_card_validity = Column(Date)

    has_ald = Column(Boolean, default=False)
    ald_number = Column(String(10))
    ald_expiry = Column(Date)

    has_cmu = Column(Boolean, default=False)
    cmu_expiry = Column(Date)

    # ══════════════════════════════════════════════════════════════
    # MUTUELLE
    # ══════════════════════════════════════════════════════════════

    has_mutual = Column(Boolean, default=False)
    mutual_name = Column(String(255))
    mutual_number = Column(String(100))
    mutual_contract = Column(String(100))
    mutual_phone = Column(String(20))
    mutual_guarantee_level = Column(String(50))
    mutual_expiry = Column(Date)

    mutual_teletransmission = Column(Boolean, default=False)
    mutual_tp = Column(Boolean, default=False)

    # ══════════════════════════════════════════════════════════════
    # CONTACT D'URGENCE
    # ══════════════════════════════════════════════════════════════

    emergency_contact_name = Column(String(255))
    emergency_contact_relation = Column(String(100))
    emergency_contact_phone = Column(String(20))

    # ══════════════════════════════════════════════════════════════
    # TUTEUR / RESPONSABLE LÉGAL (pour mineurs)
    # ══════════════════════════════════════════════════════════════

    is_minor = Column(Boolean, default=False)
    guardian_name = Column(String(255))
    guardian_relation = Column(String(100))
    guardian_phone = Column(String(20))
    guardian_email = Column(String(255))

    # ══════════════════════════════════════════════════════════════
    # PRÉFÉRENCES PATIENT
    # ══════════════════════════════════════════════════════════════

    preferred_contact_method = Column(String(20), default="phone")
    accepts_sms = Column(Boolean, default=True)
    accepts_email = Column(Boolean, default=True)
    preferred_language = Column(String(10), default="fr")

    reminder_sms = Column(Boolean, default=True)
    reminder_email = Column(Boolean, default=True)
    reminder_delay_hours = Column(Integer, default=24)

    # ══════════════════════════════════════════════════════════════
    # CONSENTEMENTS RGPD
    # ══════════════════════════════════════════════════════════════

    consent_data_processing = Column(Boolean, default=False)
    consent_data_processing_date = Column(DateTime)
    consent_marketing = Column(Boolean, default=False)
    consent_marketing_date = Column(DateTime)

    # ══════════════════════════════════════════════════════════════
    # STATUT & SUIVI
    # ══════════════════════════════════════════════════════════════

    is_active = Column(Boolean, default=True)
    is_vip = Column(Boolean, default=False)

    first_visit_date = Column(Date)
    last_visit_date = Column(Date)

    assigned_practitioner_id = Column(String(36), ForeignKey("users.id"))

    internal_notes = Column(Text)

    tags = Column(JSON, default=[])

    acquisition_source = Column(String(100))

    # ══════════════════════════════════════════════════════════════
    # SOLDE COMPTABLE
    # ══════════════════════════════════════════════════════════════

    account_balance = Column(Float, default=0.0)

    # ══════════════════════════════════════════════════════════════
    # RELATIONS
    # ══════════════════════════════════════════════════════════════

    assigned_practitioner = relationship("User", foreign_keys=[assigned_practitioner_id])

    # ══════════════════════════════════════════════════════════════
    # PROPRIÉTÉS
    # ══════════════════════════════════════════════════════════════

    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"

    @property
    def age(self) -> int:
        if not self.birth_date:
            return 0
        today = date.today()
        return today.year - self.birth_date.year - (
            (today.month, today.day) < (self.birth_date.month, self.birth_date.day)
        )

    @property
    def display_name(self) -> str:
        prefix = "M." if self.gender == Gender.MALE else "Mme"
        return f"{prefix} {self.last_name.upper()} {self.first_name}"

    def __repr__(self):
        return f"<Patient {self.full_name}>"
