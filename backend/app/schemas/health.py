from pydantic import BaseModel, Field

class HealthResponse(BaseModel):
    status: str = Field(default="ok", example="ok")
    service: str = Field(default="uniflow-api", example="uniflow-api")

    class Config:
        json_schema_extra = {
            "example": {
                "status": "ok",
                "service": "uniflow-api"
            }
        }
