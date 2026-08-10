from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database import get_db, check_database_connection

router = APIRouter()

@router.get(
    "/db-test",
    summary="Database Connectivity Test",
    description="Tests connection to the configured MySQL database.",
)
def test_db_connection(db: Session = Depends(get_db)):
    connected, message = check_database_connection()
    if connected:
        return {
            "status": "connected",
            "database_engine": "MySQL / MariaDB",
            "message": message,
        }
    return JSONResponse(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        content={
            "status": "disconnected",
            "database_engine": "MySQL / MariaDB",
            "message": message,
        },
    )
