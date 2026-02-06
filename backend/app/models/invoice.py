from datetime import datetime, date
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
    from app.models.payment import Payment


class InvoiceStatus(str, enum.Enum):
    """Statut d'une facture"""
    DRAFT = "draft"
    PENDING = "pending"
    PARTIAL = "partial"
    PAID = "paid"
    OVERDUE = "overdue"
    CANCELLED = "cancelled"
    REFUNDED = "refunded"


class InvoiceType(str, enum.Enum):
    """Type de facture"""
    STANDARD = "standard"
    CREDIT_NOTE = "credit_note"
    TIERS_PAYANT = "tiers_payant"


class Invoice(Base, TimestampMixin, SoftDeleteMixin, TenantMixin):
    """
    Facture
    """
    __tablename__ = "invoices"

    id = Column(String(36), primary_key=True, default=generate_uuid)

    # ══════════════════════════════════════════════════════════════
    # IDENTIFICATION
    # ══════════════════════════════════════════════════════════════

    invoice_number = Column(String(20), nullable=False, unique=True, index=True)

    invoice_type = Column(Enum(InvoiceType), nullable=False, default=InvoiceType.STANDARD)

    reference = Column(String(50))

    # ══════════════════════════════════════════════════════════════
    # RELATIONS
    # ══════════════════════════════════════════════════════════════

    patient_id = Column(String(36), ForeignKey("patients.id"), nullable=False, index=True)
    patient = relationship("Patient", foreign_keys=[patient_id])

    practitioner_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    practitioner = relationship("User", foreign_keys=[practitioner_id])

    quote_id = Column(String(36), ForeignKey("quotes.id"))
    quote = relationship("Quote", foreign_keys=[quote_id])

    original_invoice_id = Column(String(36), ForeignKey("invoices.id"))

    created_by_id = Column(String(36), ForeignKey("users.id"))

    # ══════════════════════════════════════════════════════════════
    # DATES
    # ══════════════════════════════════════════════════════════════

    invoice_date = Column(Date, nullable=False, default=date.today)

    due_date = Column(Date)

    sent_at = Column(DateTime)

    # ══════════════════════════════════════════════════════════════
    # MONTANTS
    # ══════════════════════════════════════════════════════════════

    total_ht = Column(Integer, nullable=False, default=0)

    tva_rate = Column(Float, default=0.0)
    tva_amount = Column(Integer, default=0)

    total_ttc = Column(Integer, nullable=False, default=0)

    # ══════════════════════════════════════════════════════════════
    # REMBOURSEMENTS
    # ══════════════════════════════════════════════════════════════

    social_security_amount = Column(Integer, default=0)
    social_security_paid = Column(Boolean, default=False)
    social_security_paid_at = Column(DateTime)
    social_security_payment_ref = Column(String(50))

    mutual_amount = Column(Integer, default=0)
    mutual_paid = Column(Boolean, default=False)
    mutual_paid_at = Column(DateTime)
    mutual_payment_ref = Column(String(50))

    patient_amount = Column(Integer, default=0)

    # ══════════════════════════════════════════════════════════════
    # PAIEMENT
    # ══════════════════════════════════════════════════════════════

    paid_amount = Column(Integer, default=0)

    balance = Column(Integer, default=0)

    status = Column(Enum(InvoiceStatus), nullable=False, default=InvoiceStatus.DRAFT)

    # ══════════════════════════════════════════════════════════════
    # TIERS-PAYANT
    # ══════════════════════════════════════════════════════════════

    is_third_party_payment = Column(Boolean, default=False)

    transmission_batch_number = Column(String(50))

    transmitted_at = Column(DateTime)

    # ══════════════════════════════════════════════════════════════
    # CONTENU
    # ══════════════════════════════════════════════════════════════

    notes = Column(Text)

    payment_terms = Column(Text)

    # ══════════════════════════════════════════════════════════════
    # RELATIONS (LIGNES ET PAIEMENTS)
    # ══════════════════════════════════════════════════════════════

    treatments = relationship(
        "Treatment",
        backref="invoice",
        foreign_keys="Treatment.invoice_id",
        lazy="selectin"
    )

    payments = relationship(
        "Payment",
        back_populates="invoice",
        lazy="selectin"
    )

    # ══════════════════════════════════════════════════════════════
    # PROPRIÉTÉS
    # ══════════════════════════════════════════════════════════════

    @property
    def is_overdue(self) -> bool:
        if not self.due_date:
            return False
        return (
            date.today() > self.due_date and
            self.status in [InvoiceStatus.PENDING, InvoiceStatus.PARTIAL]
        )

    @property
    def is_fully_paid(self) -> bool:
        return self.paid_amount >= self.total_ttc

    def calculate_totals(self):
        """Recalcule les totaux"""
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
        self.balance = self.total_ttc - self.paid_amount

    def update_payment_status(self):
        """Met à jour le statut en fonction des paiements"""
        if self.status == InvoiceStatus.CANCELLED:
            return

        self.paid_amount = sum(p.amount for p in self.payments if p.status == "completed")
        self.balance = self.total_ttc - self.paid_amount

        if self.paid_amount >= self.total_ttc:
            self.status = InvoiceStatus.PAID
        elif self.paid_amount > 0:
            self.status = InvoiceStatus.PARTIAL
        elif self.is_overdue:
            self.status = InvoiceStatus.OVERDUE
        else:
            self.status = InvoiceStatus.PENDING

    def __repr__(self):
        return f"<Invoice {self.invoice_number}>"
