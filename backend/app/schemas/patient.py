from pydantic import BaseModel, EmailStr, Field, field_validator, computed_field
from typing import Optional, List
from datetime import date, datetime
from app.models.patient import Gender, MaritalStatus, BloodType


# ═══════════════════════════════════════════════════════════════════
# SCHEMAS IMBRIQUÉS
# ═══════════════════════════════════════════════════════════════════

class MedicalHistorySchema(BaseModel):
    """Antécédents médicaux"""
    allergies: List[str] = []
    chronic_conditions: List[str] = []
    surgeries: List[str] = []
    medications: List[str] = []
    family_history: List[str] = []


class EmergencyContactSchema(BaseModel):
    """Contact d'urgence"""
    name: Optional[str] = None
    relation: Optional[str] = None
    phone: Optional[str] = None


class GuardianSchema(BaseModel):
    """Tuteur légal (mineurs)"""
    is_minor: bool = False
    name: Optional[str] = None
    relation: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None


# ═══════════════════════════════════════════════════════════════════
# CRÉATION
# ═══════════════════════════════════════════════════════════════════

class PatientCreate(BaseModel):
    """Création d'un patient - champs obligatoires et optionnels courants"""

    gender: Gender
    first_name: str = Field(..., min_length=2, max_length=100)
    last_name: str = Field(..., min_length=2, max_length=100)
    birth_date: date

    maiden_name: Optional[str] = None
    birth_place: Optional[str] = None
    nationality: str = "Française"

    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    mobile_phone: Optional[str] = None

    address: Optional[str] = None
    address_line2: Optional[str] = None
    zip_code: Optional[str] = None
    city: Optional[str] = None
    country: str = "France"

    marital_status: MaritalStatus = MaritalStatus.SINGLE
    profession: Optional[str] = None

    blood_type: BloodType = BloodType.UNKNOWN
    referring_doctor: Optional[str] = None
    medical_history: Optional[MedicalHistorySchema] = None
    medical_notes: Optional[str] = None
    medical_alerts: List[str] = []

    social_security_number: Optional[str] = None

    assigned_practitioner_id: Optional[str] = None

    @field_validator("birth_date")
    @classmethod
    def validate_birth_date(cls, v):
        if v > date.today():
            raise ValueError("La date de naissance ne peut pas être dans le futur")
        return v

    @field_validator("social_security_number")
    @classmethod
    def validate_ssn(cls, v):
        if v:
            v = v.replace(" ", "")
            if len(v) != 13 and len(v) != 15:
                raise ValueError("Le numéro de sécurité sociale doit contenir 13 ou 15 chiffres")
        return v


# ═══════════════════════════════════════════════════════════════════
# MISE À JOUR
# ═══════════════════════════════════════════════════════════════════

class PatientUpdate(BaseModel):
    """Mise à jour d'un patient - tous les champs optionnels"""

    gender: Optional[Gender] = None
    first_name: Optional[str] = Field(None, min_length=2, max_length=100)
    last_name: Optional[str] = Field(None, min_length=2, max_length=100)
    maiden_name: Optional[str] = None
    birth_date: Optional[date] = None
    birth_place: Optional[str] = None
    nationality: Optional[str] = None

    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    mobile_phone: Optional[str] = None

    address: Optional[str] = None
    address_line2: Optional[str] = None
    zip_code: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None

    marital_status: Optional[MaritalStatus] = None
    profession: Optional[str] = None
    employer: Optional[str] = None

    photo_url: Optional[str] = None

    blood_type: Optional[BloodType] = None
    referring_doctor: Optional[str] = None
    referring_doctor_phone: Optional[str] = None
    medical_history: Optional[MedicalHistorySchema] = None
    dental_contraindications: Optional[List[str]] = None
    medical_notes: Optional[str] = None
    medical_alerts: Optional[List[str]] = None

    social_security_number: Optional[str] = None
    insurance_regime: Optional[str] = None
    insurance_fund: Optional[str] = None
    insurance_fund_code: Optional[str] = None
    vital_card_number: Optional[str] = None
    vital_card_validity: Optional[date] = None
    has_ald: Optional[bool] = None
    ald_number: Optional[str] = None
    ald_expiry: Optional[date] = None
    has_cmu: Optional[bool] = None
    cmu_expiry: Optional[date] = None

    has_mutual: Optional[bool] = None
    mutual_name: Optional[str] = None
    mutual_number: Optional[str] = None
    mutual_contract: Optional[str] = None
    mutual_phone: Optional[str] = None
    mutual_guarantee_level: Optional[str] = None
    mutual_expiry: Optional[date] = None
    mutual_teletransmission: Optional[bool] = None
    mutual_tp: Optional[bool] = None

    emergency_contact_name: Optional[str] = None
    emergency_contact_relation: Optional[str] = None
    emergency_contact_phone: Optional[str] = None

    is_minor: Optional[bool] = None
    guardian_name: Optional[str] = None
    guardian_relation: Optional[str] = None
    guardian_phone: Optional[str] = None
    guardian_email: Optional[str] = None

    preferred_contact_method: Optional[str] = None
    accepts_sms: Optional[bool] = None
    accepts_email: Optional[bool] = None
    preferred_language: Optional[str] = None
    reminder_sms: Optional[bool] = None
    reminder_email: Optional[bool] = None
    reminder_delay_hours: Optional[int] = None

    consent_data_processing: Optional[bool] = None
    consent_marketing: Optional[bool] = None

    is_active: Optional[bool] = None
    is_vip: Optional[bool] = None

    assigned_practitioner_id: Optional[str] = None

    internal_notes: Optional[str] = None
    tags: Optional[List[str]] = None
    acquisition_source: Optional[str] = None


# ═══════════════════════════════════════════════════════════════════
# RÉPONSES
# ═══════════════════════════════════════════════════════════════════

class PatientListResponse(BaseModel):
    """Réponse patient pour les listes (condensé)"""
    id: str
    gender: Gender
    first_name: str
    last_name: str
    birth_date: date
    email: Optional[str] = None
    phone: Optional[str] = None
    mobile_phone: Optional[str] = None
    city: Optional[str] = None
    is_active: bool
    is_vip: bool
    last_visit_date: Optional[date] = None
    account_balance: float = 0.0
    photo_url: Optional[str] = None
    tags: List[str] = []
    medical_alerts: List[str] = []
    created_at: datetime

    @computed_field
    @property
    def age(self) -> int:
        if not self.birth_date:
            return 0
        today = date.today()
        return today.year - self.birth_date.year - (
            (today.month, today.day) < (self.birth_date.month, self.birth_date.day)
        )

    @computed_field
    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"

    class Config:
        from_attributes = True


class PatientDetailResponse(PatientListResponse):
    """Réponse patient complète (fiche détaillée)"""

    maiden_name: Optional[str] = None
    birth_place: Optional[str] = None
    nationality: Optional[str] = None

    address: Optional[str] = None
    address_line2: Optional[str] = None
    zip_code: Optional[str] = None
    country: Optional[str] = None

    marital_status: Optional[MaritalStatus] = None
    profession: Optional[str] = None
    employer: Optional[str] = None

    blood_type: Optional[BloodType] = None
    referring_doctor: Optional[str] = None
    referring_doctor_phone: Optional[str] = None
    medical_history: Optional[dict] = None
    dental_contraindications: Optional[List[str]] = None
    medical_notes: Optional[str] = None

    social_security_number: Optional[str] = None
    insurance_regime: Optional[str] = None
    insurance_fund: Optional[str] = None
    vital_card_number: Optional[str] = None
    vital_card_validity: Optional[date] = None
    has_ald: bool = False
    ald_number: Optional[str] = None
    ald_expiry: Optional[date] = None
    has_cmu: bool = False
    cmu_expiry: Optional[date] = None

    has_mutual: bool = False
    mutual_name: Optional[str] = None
    mutual_number: Optional[str] = None
    mutual_guarantee_level: Optional[str] = None
    mutual_expiry: Optional[date] = None
    mutual_teletransmission: bool = False
    mutual_tp: bool = False

    emergency_contact_name: Optional[str] = None
    emergency_contact_relation: Optional[str] = None
    emergency_contact_phone: Optional[str] = None

    is_minor: bool = False
    guardian_name: Optional[str] = None
    guardian_relation: Optional[str] = None
    guardian_phone: Optional[str] = None
    guardian_email: Optional[str] = None

    preferred_contact_method: Optional[str] = None
    accepts_sms: bool = True
    accepts_email: bool = True
    preferred_language: str = "fr"
    reminder_sms: bool = True
    reminder_email: bool = True

    consent_data_processing: bool = False
    consent_data_processing_date: Optional[datetime] = None
    consent_marketing: bool = False

    first_visit_date: Optional[date] = None
    assigned_practitioner_id: Optional[str] = None
    internal_notes: Optional[str] = None
    acquisition_source: Optional[str] = None

    updated_at: datetime


# ═══════════════════════════════════════════════════════════════════
# RECHERCHE
# ═══════════════════════════════════════════════════════════════════

class PatientSearchParams(BaseModel):
    """Paramètres de recherche patients"""
    q: Optional[str] = None
    gender: Optional[Gender] = None
    is_active: Optional[bool] = None
    is_vip: Optional[bool] = None
    has_alerts: Optional[bool] = None
    practitioner_id: Optional[str] = None
    min_age: Optional[int] = None
    max_age: Optional[int] = None
    city: Optional[str] = None
    tags: Optional[List[str]] = None

    page: int = 1
    page_size: int = 20

    sort_by: str = "last_name"
    sort_order: str = "asc"
