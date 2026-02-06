from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from app.models.user import UserRole


class UserBase(BaseModel):
    """Base utilisateur"""
    email: EmailStr
    first_name: str = Field(..., min_length=2, max_length=100)
    last_name: str = Field(..., min_length=2, max_length=100)
    phone: Optional[str] = None
    role: UserRole = UserRole.PRACTITIONER
    rpps: Optional[str] = None
    specialty: Optional[str] = None


class UserCreate(UserBase):
    """Création utilisateur (invitation)"""
    pass


class UserUpdate(BaseModel):
    """Mise à jour utilisateur"""
    first_name: Optional[str] = Field(None, min_length=2, max_length=100)
    last_name: Optional[str] = Field(None, min_length=2, max_length=100)
    phone: Optional[str] = None
    rpps: Optional[str] = None
    specialty: Optional[str] = None
    avatar_url: Optional[str] = None


class UserResponse(UserBase):
    """Réponse utilisateur"""
    id: str
    avatar_url: Optional[str] = None
    is_active: bool
    is_email_verified: bool
    mfa_enabled: bool
    last_login_at: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True


class UserMeResponse(UserResponse):
    """Réponse utilisateur connecté (avec plus d'infos)"""
    tenant_id: str
    tenant_name: Optional[str] = None
    preferences: dict = {}

    class Config:
        from_attributes = True


class TenantResponse(BaseModel):
    """Réponse cabinet"""
    id: str
    name: str
    address: Optional[str] = None
    city: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    logo_url: Optional[str] = None
    primary_color: str = "#14B8A6"
    onboarding_completed: bool = False

    class Config:
        from_attributes = True
