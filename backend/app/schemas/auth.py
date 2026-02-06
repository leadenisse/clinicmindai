from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional
import re


class RegisterRequest(BaseModel):
    """Inscription d'un nouveau cabinet"""
    # Infos utilisateur admin
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=100)
    first_name: str = Field(..., min_length=2, max_length=100)
    last_name: str = Field(..., min_length=2, max_length=100)
    phone: Optional[str] = None

    # Infos cabinet
    cabinet_name: str = Field(..., min_length=2, max_length=255)

    # Plan sélectionné (optionnel pour l'instant)
    plan_id: Optional[str] = None
    billing_cycle: Optional[str] = None

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Le mot de passe doit contenir au moins 8 caractères")
        if not re.search(r"[A-Z]", v):
            raise ValueError("Le mot de passe doit contenir au moins une majuscule")
        if not re.search(r"[a-z]", v):
            raise ValueError("Le mot de passe doit contenir au moins une minuscule")
        if not re.search(r"\d", v):
            raise ValueError("Le mot de passe doit contenir au moins un chiffre")
        return v


class LoginRequest(BaseModel):
    """Connexion"""
    email: EmailStr
    password: str
    mfa_code: Optional[str] = None


class TokenResponse(BaseModel):
    """Réponse avec tokens"""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int


class RefreshTokenRequest(BaseModel):
    """Rafraîchir le token"""
    refresh_token: str


class ForgotPasswordRequest(BaseModel):
    """Demande de reset password"""
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    """Reset du password"""
    token: str
    password: str = Field(..., min_length=8, max_length=100)

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Le mot de passe doit contenir au moins 8 caractères")
        return v


class VerifyEmailRequest(BaseModel):
    """Vérification email"""
    token: str


class MFASetupResponse(BaseModel):
    """Réponse setup MFA"""
    secret: str
    qr_code_uri: str


class MFAVerifyRequest(BaseModel):
    """Vérification code MFA"""
    code: str = Field(..., min_length=6, max_length=6)


class ChangePasswordRequest(BaseModel):
    """Changement de mot de passe"""
    current_password: str
    new_password: str = Field(..., min_length=8, max_length=100)

    @field_validator("new_password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Le mot de passe doit contenir au moins 8 caractères")
        return v
