from typing import Optional
from fastapi import HTTPException, status


class ClinicMindException(HTTPException):
    """Exception de base pour ClinicMind"""
    def __init__(
        self,
        status_code: int,
        detail: str,
        headers: Optional[dict] = None
    ):
        super().__init__(status_code=status_code, detail=detail, headers=headers or {})


class BadRequestException(ClinicMindException):
    def __init__(self, detail: str = "Requête invalide"):
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)


class UnauthorizedException(ClinicMindException):
    def __init__(self, detail: str = "Non autorisé"):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
            headers={"WWW-Authenticate": "Bearer"},
        )


class ForbiddenException(ClinicMindException):
    def __init__(self, detail: str = "Accès interdit"):
        super().__init__(status_code=status.HTTP_403_FORBIDDEN, detail=detail)


class NotFoundException(ClinicMindException):
    def __init__(self, detail: str = "Ressource non trouvée"):
        super().__init__(status_code=status.HTTP_404_NOT_FOUND, detail=detail)


class ConflictException(ClinicMindException):
    def __init__(self, detail: str = "Conflit avec une ressource existante"):
        super().__init__(status_code=status.HTTP_409_CONFLICT, detail=detail)


# Exceptions spécifiques Auth
class InvalidCredentialsException(UnauthorizedException):
    def __init__(self):
        super().__init__(detail="Email ou mot de passe incorrect")


class EmailAlreadyExistsException(ConflictException):
    def __init__(self):
        super().__init__(detail="Cet email est déjà utilisé")


class TokenExpiredException(UnauthorizedException):
    def __init__(self):
        super().__init__(detail="Token expiré")


class InvalidTokenException(UnauthorizedException):
    def __init__(self):
        super().__init__(detail="Token invalide")


class MFARequiredException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Code MFA requis",
        )


class AccountLockedException(ForbiddenException):
    def __init__(self, minutes: int):
        super().__init__(
            detail=f"Compte verrouillé. Réessayez dans {minutes} minutes."
        )
