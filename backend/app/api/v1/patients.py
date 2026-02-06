from fastapi import APIRouter, Query, status
from typing import Optional, List
from app.api.deps import CurrentUser, DBSession
from app.services.patient_service import PatientService
from app.schemas.patient import (
    PatientCreate,
    PatientUpdate,
    PatientListResponse,
    PatientDetailResponse,
    PatientSearchParams,
)
from app.schemas.common import ResponseBase, PaginatedResponse
from app.models.patient import Gender

router = APIRouter(prefix="/patients", tags=["Patients"])


@router.post("", response_model=PatientDetailResponse, status_code=status.HTTP_201_CREATED)
async def create_patient(
    data: PatientCreate,
    current_user: CurrentUser,
    db: DBSession,
):
    """
    Crée un nouveau patient.

    Champs obligatoires : gender, first_name, last_name, birth_date
    """
    service = PatientService(db)
    patient = await service.create(data, current_user)
    return patient


@router.get("", response_model=PaginatedResponse[PatientListResponse])
async def list_patients(
    current_user: CurrentUser,
    db: DBSession,
    q: Optional[str] = Query(None, description="Recherche (nom, email, téléphone, n° SS)"),
    gender: Optional[Gender] = Query(None, description="Filtrer par genre"),
    is_active: Optional[bool] = Query(None, description="Filtrer par statut actif"),
    is_vip: Optional[bool] = Query(None, description="Filtrer par statut VIP"),
    has_alerts: Optional[bool] = Query(None, description="Patients avec alertes médicales"),
    practitioner_id: Optional[str] = Query(None, description="Filtrer par praticien"),
    min_age: Optional[int] = Query(None, ge=0, description="Âge minimum"),
    max_age: Optional[int] = Query(None, ge=0, description="Âge maximum"),
    city: Optional[str] = Query(None, description="Filtrer par ville"),
    page: int = Query(1, ge=1, description="Numéro de page"),
    page_size: int = Query(20, ge=1, le=100, description="Taille de page"),
    sort_by: str = Query("last_name", description="Champ de tri"),
    sort_order: str = Query("asc", pattern="^(asc|desc)$", description="Ordre de tri"),
):
    """
    Liste les patients avec recherche et filtres.

    - **q** : Recherche textuelle dans nom, prénom, email, téléphone, n° SS
    - **gender** : M, F, ou O
    - **is_active** : true/false
    - **min_age** / **max_age** : Filtrer par tranche d'âge
    - **has_alerts** : Patients ayant des alertes médicales
    """
    params = PatientSearchParams(
        q=q,
        gender=gender,
        is_active=is_active,
        is_vip=is_vip,
        has_alerts=has_alerts,
        practitioner_id=practitioner_id,
        min_age=min_age,
        max_age=max_age,
        city=city,
        page=page,
        page_size=page_size,
        sort_by=sort_by,
        sort_order=sort_order,
    )

    service = PatientService(db)
    patients, total = await service.search(params, current_user.tenant_id)

    total_pages = (total + page_size - 1) // page_size

    return PaginatedResponse(
        success=True,
        data=[PatientListResponse.model_validate(p) for p in patients],
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
    )


@router.get("/recent", response_model=List[PatientListResponse])
async def get_recent_patients(
    current_user: CurrentUser,
    db: DBSession,
    limit: int = Query(10, ge=1, le=50, description="Nombre de patients"),
):
    """
    Récupère les patients récemment modifiés.
    Utile pour le dashboard ou l'accès rapide.
    """
    service = PatientService(db)
    patients = await service.get_recent(current_user.tenant_id, limit)
    return [PatientListResponse.model_validate(p) for p in patients]


@router.get("/stats")
async def get_patient_stats(
    current_user: CurrentUser,
    db: DBSession,
):
    """
    Statistiques des patients pour le dashboard.

    Retourne :
    - total_patients
    - active_patients
    - inactive_patients
    - birthdays_today
    - birthday_names (5 premiers)
    """
    service = PatientService(db)
    stats = await service.get_stats(current_user.tenant_id)
    return {"success": True, "data": stats}


@router.get("/{patient_id}", response_model=PatientDetailResponse)
async def get_patient(
    patient_id: str,
    current_user: CurrentUser,
    db: DBSession,
):
    """
    Récupère les détails complets d'un patient.
    """
    service = PatientService(db)
    patient = await service.get_by_id(patient_id, current_user.tenant_id)
    return patient


@router.put("/{patient_id}", response_model=PatientDetailResponse)
async def update_patient(
    patient_id: str,
    data: PatientUpdate,
    current_user: CurrentUser,
    db: DBSession,
):
    """
    Met à jour un patient.
    Seuls les champs fournis sont modifiés.
    """
    service = PatientService(db)
    patient = await service.update(patient_id, data, current_user)
    return patient


@router.delete("/{patient_id}", response_model=ResponseBase)
async def delete_patient(
    patient_id: str,
    current_user: CurrentUser,
    db: DBSession,
):
    """
    Supprime un patient (soft delete).
    Le patient est marqué comme supprimé mais conservé en base pour l'historique.
    """
    service = PatientService(db)
    await service.delete(patient_id, current_user)
    return ResponseBase(success=True, message="Patient supprimé")
