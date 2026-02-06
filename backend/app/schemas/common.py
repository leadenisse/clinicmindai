from pydantic import BaseModel
from typing import Generic, TypeVar, Optional, List
from datetime import datetime

T = TypeVar("T")


class ResponseBase(BaseModel):
    """Réponse de base"""
    success: bool = True
    message: Optional[str] = None


class DataResponse(ResponseBase, Generic[T]):
    """Réponse avec données"""
    data: T


class PaginatedResponse(ResponseBase, Generic[T]):
    """Réponse paginée"""
    data: List[T]
    total: int
    page: int
    page_size: int
    total_pages: int


class ErrorResponse(BaseModel):
    """Réponse d'erreur"""
    success: bool = False
    detail: str
    error_code: Optional[str] = None


class HealthResponse(BaseModel):
    """Réponse health check"""
    status: str
    version: str
    timestamp: datetime
