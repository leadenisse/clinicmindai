from typing import Optional, List, Tuple
from sqlalchemy import select, func, or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import JSONB
from datetime import date
from app.models.patient import Patient
from app.repositories.base import BaseRepository
from app.schemas.patient import PatientSearchParams


class PatientRepository(BaseRepository[Patient]):
    """Repository pour les patients"""

    def __init__(self, db: AsyncSession):
        super().__init__(Patient, db)

    async def search(
        self,
        tenant_id: str,
        params: PatientSearchParams
    ) -> Tuple[List[Patient], int]:
        """
        Recherche avancée de patients avec pagination.
        Retourne (patients, total_count)
        """

        query = select(Patient).where(
            Patient.tenant_id == tenant_id,
            Patient.deleted_at.is_(None)
        )

        if params.q:
            search_term = f"%{params.q}%"
            query = query.where(
                or_(
                    Patient.first_name.ilike(search_term),
                    Patient.last_name.ilike(search_term),
                    Patient.email.ilike(search_term),
                    Patient.phone.ilike(search_term),
                    Patient.mobile_phone.ilike(search_term),
                    Patient.social_security_number.ilike(search_term),
                )
            )

        if params.gender:
            query = query.where(Patient.gender == params.gender)

        if params.is_active is not None:
            query = query.where(Patient.is_active == params.is_active)

        if params.is_vip is not None:
            query = query.where(Patient.is_vip == params.is_vip)

        if params.practitioner_id:
            query = query.where(Patient.assigned_practitioner_id == params.practitioner_id)

        if params.city:
            query = query.where(Patient.city.ilike(f"%{params.city}%"))

        if params.min_age is not None or params.max_age is not None:
            today = date.today()

            if params.max_age is not None:
                min_birth = date(today.year - params.max_age - 1, today.month, today.day)
                query = query.where(Patient.birth_date >= min_birth)

            if params.min_age is not None:
                max_birth = date(today.year - params.min_age, today.month, today.day)
                query = query.where(Patient.birth_date <= max_birth)

        if params.has_alerts:
            query = query.where(
                func.coalesce(
                    func.jsonb_array_length(Patient.medical_alerts.cast(JSONB)), 0
                ) > 0
            )

        count_query = select(func.count()).select_from(query.subquery())
        total_result = await self.db.execute(count_query)
        total = int(total_result.scalar() or 0)

        sort_column = getattr(Patient, params.sort_by, Patient.last_name)
        if params.sort_order == "desc":
            query = query.order_by(sort_column.desc())
        else:
            query = query.order_by(sort_column.asc())

        offset = (params.page - 1) * params.page_size
        query = query.offset(offset).limit(params.page_size)

        result = await self.db.execute(query)
        patients = result.scalars().all()

        return list(patients), total

    async def get_by_email(self, tenant_id: str, email: str) -> Optional[Patient]:
        """Récupère un patient par email"""
        result = await self.db.execute(
            select(Patient).where(
                Patient.tenant_id == tenant_id,
                Patient.email == email,
                Patient.deleted_at.is_(None)
            )
        )
        return result.scalar_one_or_none()

    async def get_by_ssn(self, tenant_id: str, ssn: str) -> Optional[Patient]:
        """Récupère un patient par numéro de sécurité sociale"""
        result = await self.db.execute(
            select(Patient).where(
                Patient.tenant_id == tenant_id,
                Patient.social_security_number == ssn,
                Patient.deleted_at.is_(None)
            )
        )
        return result.scalar_one_or_none()

    async def get_recent(self, tenant_id: str, limit: int = 10) -> List[Patient]:
        """Récupère les patients récemment créés ou modifiés"""
        result = await self.db.execute(
            select(Patient)
            .where(
                Patient.tenant_id == tenant_id,
                Patient.deleted_at.is_(None)
            )
            .order_by(Patient.updated_at.desc())
            .limit(limit)
        )
        return list(result.scalars().all())

    async def get_birthdays_today(self, tenant_id: str) -> List[Patient]:
        """Récupère les patients dont c'est l'anniversaire aujourd'hui"""
        today = date.today()
        result = await self.db.execute(
            select(Patient)
            .where(
                Patient.tenant_id == tenant_id,
                Patient.deleted_at.is_(None),
                Patient.is_active == True,
                func.extract("month", Patient.birth_date) == today.month,
                func.extract("day", Patient.birth_date) == today.day,
            )
        )
        return list(result.scalars().all())

    async def count_active(self, tenant_id: str) -> int:
        """Compte les patients actifs d'un tenant"""
        result = await self.db.execute(
            select(func.count(Patient.id))
            .where(
                Patient.tenant_id == tenant_id,
                Patient.deleted_at.is_(None),
                Patient.is_active == True
            )
        )
        return int(result.scalar() or 0)

    async def count_total(self, tenant_id: str) -> int:
        """Compte tous les patients d'un tenant (actifs et inactifs)"""
        result = await self.db.execute(
            select(func.count(Patient.id))
            .where(
                Patient.tenant_id == tenant_id,
                Patient.deleted_at.is_(None)
            )
        )
        return int(result.scalar() or 0)
