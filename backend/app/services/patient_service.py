from typing import Tuple, List
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.patient import Patient
from app.models.user import User
from app.repositories.patient_repository import PatientRepository
from app.schemas.patient import PatientCreate, PatientUpdate, PatientSearchParams
from app.core.audit import AuditService, compute_changes
from app.models.audit_log import AuditAction
from app.core.exceptions import NotFoundException, ConflictException


class PatientService:
    """Service pour la gestion des patients"""

    def __init__(self, db: AsyncSession):
        self.db = db
        self.repo = PatientRepository(db)
        self.audit = AuditService(db)

    async def create(self, data: PatientCreate, user: User) -> Patient:
        """Crée un nouveau patient"""

        if data.email:
            existing = await self.repo.get_by_email(user.tenant_id, data.email)
            if existing:
                raise ConflictException("Un patient avec cet email existe déjà")

        if data.social_security_number:
            existing = await self.repo.get_by_ssn(user.tenant_id, data.social_security_number)
            if existing:
                raise ConflictException("Un patient avec ce numéro de sécurité sociale existe déjà")

        patient_data = data.model_dump(exclude_unset=True)
        patient_data["tenant_id"] = user.tenant_id
        patient_data["first_visit_date"] = datetime.utcnow().date()

        if "medical_history" in patient_data and patient_data["medical_history"]:
            if hasattr(patient_data["medical_history"], "model_dump"):
                patient_data["medical_history"] = patient_data["medical_history"].model_dump()

        patient = await self.repo.create(patient_data)

        await self.audit.log(
            action=AuditAction.CREATE,
            user=user,
            tenant_id=user.tenant_id,
            resource_type="patient",
            resource_id=patient.id,
            resource_name=patient.full_name,
        )

        return patient

    async def get_by_id(self, patient_id: str, tenant_id: str) -> Patient:
        """Récupère un patient par ID"""
        patient = await self.repo.get_by_id(patient_id)

        if not patient or patient.tenant_id != tenant_id:
            raise NotFoundException("Patient non trouvé")

        if patient.deleted_at:
            raise NotFoundException("Patient supprimé")

        return patient

    async def update(self, patient_id: str, data: PatientUpdate, user: User) -> Patient:
        """Met à jour un patient"""

        patient = await self.get_by_id(patient_id, user.tenant_id)

        old_state = {
            "first_name": patient.first_name,
            "last_name": patient.last_name,
            "email": patient.email,
            "phone": patient.phone,
            "mobile_phone": patient.mobile_phone,
            "address": patient.address,
            "city": patient.city,
        }

        if data.email and data.email != patient.email:
            existing = await self.repo.get_by_email(user.tenant_id, data.email)
            if existing and existing.id != patient_id:
                raise ConflictException("Un patient avec cet email existe déjà")

        update_data = data.model_dump(exclude_unset=True)

        if "medical_history" in update_data and update_data["medical_history"]:
            if hasattr(update_data["medical_history"], "model_dump"):
                update_data["medical_history"] = update_data["medical_history"].model_dump()

        if data.consent_data_processing is True and not patient.consent_data_processing:
            update_data["consent_data_processing_date"] = datetime.utcnow()
        if data.consent_marketing is True and not patient.consent_marketing:
            update_data["consent_marketing_date"] = datetime.utcnow()

        patient = await self.repo.update(patient, update_data)

        new_state = {
            "first_name": patient.first_name,
            "last_name": patient.last_name,
            "email": patient.email,
            "phone": patient.phone,
            "mobile_phone": patient.mobile_phone,
            "address": patient.address,
            "city": patient.city,
        }

        await self.audit.log(
            action=AuditAction.UPDATE,
            user=user,
            tenant_id=user.tenant_id,
            resource_type="patient",
            resource_id=patient.id,
            resource_name=patient.full_name,
            changes=compute_changes(old_state, new_state),
        )

        return patient

    async def delete(self, patient_id: str, user: User) -> bool:
        """Supprime un patient (soft delete)"""

        patient = await self.get_by_id(patient_id, user.tenant_id)

        patient.deleted_at = datetime.utcnow()
        patient.is_active = False
        await self.db.flush()

        await self.audit.log(
            action=AuditAction.DELETE,
            user=user,
            tenant_id=user.tenant_id,
            resource_type="patient",
            resource_id=patient.id,
            resource_name=patient.full_name,
        )

        return True

    async def search(
        self,
        params: PatientSearchParams,
        tenant_id: str
    ) -> Tuple[List[Patient], int]:
        """Recherche des patients"""
        return await self.repo.search(tenant_id, params)

    async def get_recent(self, tenant_id: str, limit: int = 10) -> List[Patient]:
        """Récupère les patients récents"""
        return await self.repo.get_recent(tenant_id, limit)

    async def get_stats(self, tenant_id: str) -> dict:
        """Statistiques patients pour le dashboard"""
        total = await self.repo.count_total(tenant_id)
        active = await self.repo.count_active(tenant_id)
        birthdays = await self.repo.get_birthdays_today(tenant_id)

        return {
            "total_patients": total,
            "active_patients": active,
            "inactive_patients": total - active,
            "birthdays_today": len(birthdays),
            "birthday_names": [p.full_name for p in birthdays[:5]],
        }
