from sqlalchemy import Column, String, Integer, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from pydantic import BaseModel
from typing import Optional, List
from passlib.context import CryptContext
from pathlib import Path
from database import Base, engine
from sqlmodel import Field, SQLModel

BASE_DIR = Path(__file__).resolve().parent

# Password context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Models
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=True)
    hashed_password = Column(String, nullable=True)
    permissions = Column(String, nullable=True)  # Comma-separated list
    created_at = Column(DateTime, default=datetime.utcnow)
    num_img = Column(Integer, default=0)
    
    images = relationship("ImageDetail", back_populates="author")

class ImageDetail(Base):
    __tablename__ = "image_details"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    author_id = Column(Integer, ForeignKey("users.id"))
    image_url = Column(String)
    resolution = Column(String)
    download_engine = Column(String, nullable=True)
    site_url = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    approved = Column(Boolean, default=False)
    
    author = relationship("User", back_populates="images")

Base.metadata.create_all(bind=engine)

# Pydantic models
class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    permissions: List[str] = []
    
    class Config:
        from_attributes = True

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    permissions: List[str]
    created_at: datetime

    class Config:
        from_attributes = True
        
        
class ImageDetailCreate(BaseModel):
    title: str
    image_url: str
    resolution: Optional[str] = None
    download_engine: Optional[str] = None
    site_url: str
    
    class Config:
        from_attributes = True
        

class ImageDetailOut(BaseModel):
    id: str
    title: str
    author: UserOut
    image_url: str
    resolution: str
    download_engine: Optional[str]
    site_name: str
    site_url: str
    created_at: datetime
    approved: bool
    
    class Config:
        from_attributes = True

class ImageSelection(BaseModel):
    image_ids: List[int]
    
class TargetSize(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    plateform: str
    width: int
    height: int
     
class Parameter(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    file_name: str
    target_size: int | None = Field(default=None, foreign_key="target_size.id")
    image_view_duration: int | None
    clip_view_duration: int | None
    transition_duration: int | None
    zoom_in: float | None
    zoom_out: float | None