from datetime import datetime, date, timedelta
from typing import Optional, List, TYPE_CHECKING
from sqlalchemy import (
    Column, String, Integer, Boolean, DateTime, Date,
    Text, Enum, ForeignKey, Float
)
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.base import TimestampMixin, SoftDeleteMixin, TenantMixin, generate_uuid
import enum

if TYPE_CHECKING:
    from app.models.patient import Patient
    from app.models.user import User
    from app.models.treatment import Treatment


class QuoteStatus(str, enum.Enum):
    """Statut d'un devis"""
    DRAFT = "draft"
    SENT = "sent"
    ACCEPTED = "accepted"
    REJECTED = "rejected"
    EXPIRED = "expired"
    CANCELLED = "cancelled"


class Quote(Base, TimestampMixin, SoftDeleteMixin, TenantMixin):
    """
    Devis dentaire
    """
    __tablename__ = "quotes"

    id = Column(String(36), primary_key=True, default=generate_uuid)

    # ══════════════════════════════════════════════════════════════
    # IDENTIFICATION
    # ══════════════════════════════════════════════════════════════

    quote_number = Column(String(20), nullable=False, unique=True, index=True)

    reference = Column(String(50))

    # ══════════════════════════════════════════════════════════════
    # RELATIONS
    # ══════════════════════════════════════════════════════════════

    patient_id = Column(String(36), ForeignKey("patients.id"), nullable=False, index=True)
    patient = relationship("Patient", foreign_keys=[patient_id])

    practitioner_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    practitioner = relationship("User", foreign_keys=[practitioner_id])

    created_by_id = Column(String(36), ForeignKey("users.id"))
    created_by = relationship("User", foreign_keys=[created_by_id])

    # ══════════════════════════════════════════════════════════════
    # DATES
    # ══════════════════════════════════════════════════════════════

    quote_date = Column(Date, nullable=False, default=date.today)

    validity_date = Column(Date)

    sent_at = Column(DateTime)

    responded_at = Column(DateTime)

    # ══════════════════════════════════════════════════════════════
    # MONTANTS
    # ══════════════════════════════════════════════════════════════

    total_ht = Column(Integer, nullable=False, default=0)

    tva_rate = Column(Float, default=0.0)
    tva_amount = Column(Integer, default=0)

    total_ttc = Column(Integer, nullable=False, default=0)

    social_security_amount = Column(Integer, default=0)

    mutual_amount = Column(Integer, default=0)

    patient_amount = Column(Integer, default=0)

    # ══════════════════════════════════════════════════════════════
    # STATUT
    # ══════════════════════════════════════════════════════════════

    status = Column(Enum(QuoteStatus), nullable=False, default=QuoteStatus.DRAFT)

    # ══════════════════════════════════════════════════════════════
    # CONTENU
    # ══════════════════════════════════════════════════════════════

    subject = Column(String(255))

    notes = Column(Text)

    terms = Column(Text)

    rejection_reason = Column(Text)

    # ══════════════════════════════════════════════════════════════
    # SIGNATURE
    # ══════════════════════════════════════════════════════════════

    is_signed = Column(Boolean, default=False)
    signed_at = Column(DateTime)
    signature_data = Column(Text)

    # ══════════════════════════════════════════════════════════════
    # FACTURE LIÉE
    # ══════════════════════════════════════════════════════════════

    invoice_id = Column(String(36), ForeignKey("invoices.id"))

    # ══════════════════════════════════════════════════════════════
    # RELATIONS (LIGNES)
    # ══════════════════════════════════════════════════════════════

    treatments = relationship(
        "Treatment",
        backref="quote",
        foreign_keys="Treatment.quote_id",
        lazy="selectin"
    )

    # ══════════════════════════════════════════════════════════════
    # PROPRIÉTÉS
    # ══════════════════════════════════════════════════════════════

    @property
    def is_expired(self) -> bool:
        if not self.validity_date:
            return False
        return date.today() > self.validity_date

    @property
    def can_be_accepted(self) -> bool:
        return self.status in [QuoteStatus.DRAFT, QuoteStatus.SENT] and not self.is_expired

    def calculate_totals(self):
        """Recalcule les totaux à partir des lignes"""
        self.total_ht = sum(t.total_amount for t in self.treatments if t.total_amount)
        self.tva_amount = int(self.total_ht * (self.tva_rate / 100))
        self.total_ttc = self.total_ht + self.tva_amount

        self.social_security_amount = sum(
            t.social_security_amount for t in self.treatments
            if t.social_security_amount
        )
        self.mutual_amount = sum(
            t.mutual_amount for t in self.treatments
            if t.mutual_amount
        )
        self.patient_amount = self.total_ttc - self.social_security_amount - self.mutual_amount

    def __repr__(self):
        return f"<Quote {self.quote_number}>"
