from datetime import datetime, date
from typing import Optional, TYPE_CHECKING
from sqlalchemy import (
    Column, String, Integer, Boolean, DateTime, Date,
    Text, Enum, ForeignKey
)
from sqlalchemy.orm import relationship
from app.database import Base
from app.models.base import TimestampMixin, TenantMixin, generate_uuid
import enum

if TYPE_CHECKING:
    from app.models.patient import Patient
    from app.models.invoice import Invoice


class PaymentMethod(str, enum.Enum):
    """Modes de paiement"""
    CASH = "cash"
    CHECK = "check"
    CARD = "card"
    TRANSFER = "transfer"
    SOCIAL_SECURITY = "social_security"
    MUTUAL = "mutual"
    OTHER = "other"


class PaymentStatus(str, enum.Enum):
    """Statut du paiement"""
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"
    CANCELLED = "cancelled"


class Payment(Base, TimestampMixin, TenantMixin):
    """
    Paiement
    """
    __tablename__ = "payments"

    id = Column(String(36), primary_key=True, default=generate_uuid)

    # ══════════════════════════════════════════════════════════════
    # IDENTIFICATION
    # ══════════════════════════════════════════════════════════════

    payment_number = Column(String(20), nullable=False, unique=True, index=True)

    external_reference = Column(String(100))

    # ══════════════════════════════════════════════════════════════
    # RELATIONS
    # ══════════════════════════════════════════════════════════════

    invoice_id = Column(String(36), ForeignKey("invoices.id"), nullable=False, index=True)
    invoice = relationship("Invoice", back_populates="payments")

    patient_id = Column(String(36), ForeignKey("patients.id"), nullable=False, index=True)
    patient = relationship("Patient")

    recorded_by_id = Column(String(36), ForeignKey("users.id"))
    recorded_by = relationship("User")

    # ══════════════════════════════════════════════════════════════
    # PAIEMENT
    # ══════════════════════════════════════════════════════════════

    amount = Column(Integer, nullable=False)

    payment_method = Column(Enum(PaymentMethod), nullable=False)

    payment_date = Column(Date, nullable=False, default=date.today)

    status = Column(Enum(PaymentStatus), nullable=False, default=PaymentStatus.COMPLETED)

    # ══════════════════════════════════════════════════════════════
    # DÉTAILS SELON LE MODE
    # ══════════════════════════════════════════════════════════════

    check_number = Column(String(50))
    check_bank = Column(String(100))

    card_last_digits = Column(String(4))
    card_authorization = Column(String(50))

    transfer_reference = Column(String(100))

    reimbursement_reference = Column(String(100))

    # ══════════════════════════════════════════════════════════════
    # NOTES
    # ══════════════════════════════════════════════════════════════

    notes = Column(Text)

    # ══════════════════════════════════════════════════════════════
    # PROPRIÉTÉS
    # ══════════════════════════════════════════════════════════════

    @property
    def amount_formatted(self) -> str:
        """Montant formaté en euros"""
        return f"{self.amount / 100:.2f} €"

    def __repr__(self):
        return f"<Payment {self.payment_number}: {self.amount_formatted}>"
