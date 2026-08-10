from fastapi import APIRouter
from app.schemas.health import HealthResponse

router = APIRouter()

@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Service Health Check",
    description="Returns the operational status of the UniFlow X API engine.",
)
def get_health():
    return HealthResponse(status="ok", service="uniflow-api")
