import logging
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

logger = logging.getLogger("uniflow.database")

# 1. Engine
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=3600,
    pool_size=10,
    max_overflow=20,
    echo=(settings.ENVIRONMENT == "development"),
)

# 2. Session Factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 3. Dependency for Database Sessions
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 4. Connectivity Check Helper
def check_database_connection():
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            row = result.fetchone()
            if row and row[0] == 1:
                return True, "Successfully connected to MySQL database."
            return False, "Database returned unexpected response."
    except Exception as e:
        logger.warning(f"Database connection check failed: {str(e)}")
        return False, f"Database connection failed: {str(e)}"
