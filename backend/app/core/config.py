import os
from typing import List, Union, Optional
from pydantic import field_validator
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    PROJECT_NAME: str = "UniFlow X API"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev_secret_key_change_in_production")
    
    # Environment Variables for MySQL Database
    DB_HOST: str = os.getenv("DB_HOST", os.getenv("MYSQL_HOST", "localhost"))
    DB_PORT: str = os.getenv("DB_PORT", os.getenv("MYSQL_PORT", "3306"))
    DB_NAME: str = os.getenv("DB_NAME", os.getenv("MYSQL_DATABASE", "uniflow_x"))
    DB_USER: str = os.getenv("DB_USER", os.getenv("MYSQL_USER", "uniflow_user"))
    DB_PASSWORD: str = os.getenv("DB_PASSWORD", os.getenv("MYSQL_PASSWORD", "uniflow_password"))
    
    DATABASE_URL: Optional[str] = os.getenv("DATABASE_URL")

    @field_validator("DATABASE_URL", mode="before")
    @classmethod
    def assemble_db_connection(cls, v: Optional[str], info) -> str:
        if isinstance(v, str) and v.strip():
            return v
        # Construct dynamically from individual environment variables
        values = info.data
        user = values.get("DB_USER", "uniflow_user")
        password = values.get("DB_PASSWORD", "uniflow_password")
        host = values.get("DB_HOST", "localhost")
        port = values.get("DB_PORT", "3306")
        db_name = values.get("DB_NAME", "uniflow_x")
        return f"mysql+pymysql://{user}:{password}@{host}:{port}/{db_name}"

    # CORS Configuration
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
    ]

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    class Config:
        case_sensitive = True
        env_file = ".env"
        extra = "ignore"

settings = Settings()
