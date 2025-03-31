from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

from sqlmodel import Field, SQLModel, create_engine


SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:root@localhost/auto_video")

engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()