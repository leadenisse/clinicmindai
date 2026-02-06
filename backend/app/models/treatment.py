from datetime import datetime, date
from typing import Optional, TYPE_CHECKING
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
    from app.models.appointment import Appointment
    from app.models.ccam_code import CCAMCode


class TreatmentStatus(str, enum.Enum):
    """Statut d'un acte"""
    PLANNED = "planned"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class Treatment(Base, TimestampMixin, SoftDeleteMixin, TenantMixin):
    """
    Acte / Soin réalisé ou planifié
    """
    __tablename__ = "treatments"

    id = Column(String(36), primary_key=True, default=generate_uuid)

    # ══════════════════════════════════════════════════════════════
    # RELATIONS PRINCIPALES
    # ══════════════════════════════════════════════════════════════

    patient_id = Column(String(36), ForeignKey("patients.id"), nullable=False, index=True)
    patient = relationship("Patient", foreign_keys=[patient_id])

    practitioner_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    practitioner = relationship("User", foreign_keys=[practitioner_id])

    appointment_id = Column(String(36), ForeignKey("appointments.id"), index=True)
    appointment = relationship("Appointment")

    ccam_code_id = Column(String(36), ForeignKey("ccam_codes.id"))
    ccam_code = relationship("CCAMCode")

    # ══════════════════════════════════════════════════════════════
    # DESCRIPTION DE L'ACTE
    # ══════════════════════════════════════════════════════════════

    ccam = Column(String(20))

    label = Column(String(255), nullable=False)

    description = Column(Text)

    tooth_numbers = Column(String(100))

    location = Column(String(50))

    # ══════════════════════════════════════════════════════════════
    # TARIFICATION
    # ══════════════════════════════════════════════════════════════

    unit_price = Column(Integer, nullable=False, default=0)

    quantity = Column(Integer, nullable=False, default=1)

    total_amount = Column(Integer, nullable=False, default=0)

    coefficient = Column(Float, default=1.0)

    # ══════════════════════════════════════════════════════════════
    # REMBOURSEMENT
    # ══════════════════════════════════════════════════════════════

    reimbursement_base = Column(Integer, default=0)

    reimbursement_rate = Column(Float, default=70.0)

    social_security_amount = Column(Integer, default=0)

    mutual_amount = Column(Integer, default=0)

    patient_amount = Column(Integer, default=0)

    # ══════════════════════════════════════════════════════════════
    # STATUT ET DATES
    # ══════════════════════════════════════════════════════════════

    status = Column(Enum(TreatmentStatus), nullable=False, default=TreatmentStatus.PLANNED)

    treatment_date = Column(Date)

    planned_date = Column(Date)

    completed_at = Column(DateTime)

    # ══════════════════════════════════════════════════════════════
    # LIENS FACTURATION
    # ══════════════════════════════════════════════════════════════

    quote_id = Column(String(36), ForeignKey("quotes.id"), index=True)

    invoice_id = Column(String(36), ForeignKey("invoices.id"), index=True)

    is_invoiced = Column(Boolean, default=False)

    # ══════════════════════════════════════════════════════════════
    # ENTENTE PRÉALABLE
    # ══════════════════════════════════════════════════════════════

    requires_prior_approval = Column(Boolean, default=False)
    prior_approval_status = Column(String(20))
    prior_approval_date = Column(Date)
    prior_approval_number = Column(String(50))

    # ══════════════════════════════════════════════════════════════
    # PROPRIÉTÉS
    # ══════════════════════════════════════════════════════════════

    @property
    def is_completed(self) -> bool:
        return self.status == TreatmentStatus.COMPLETED

    def calculate_amounts(self):
        """Calcule les montants de remboursement"""
        self.total_amount = int(self.unit_price * self.quantity * self.coefficient)

        if self.reimbursement_base and self.reimbursement_rate:
            self.social_security_amount = int(
                self.reimbursement_base * (self.reimbursement_rate / 100)
            )

        self.patient_amount = self.total_amount - self.social_security_amount

    def __repr__(self):
        return f"<Treatment {self.ccam}: {self.label}>"
