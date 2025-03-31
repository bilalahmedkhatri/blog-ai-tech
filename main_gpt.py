# main.py
import os
from datetime import datetime
from typing import List, Optional

from fastapi import FastAPI, HTTPException, Request, Form, Depends, status
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import databases
import logging

logger = logging.getLogger("uvicorn.error")

# Database configuration (update the DATABASE_URL with your credentials)
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:root@localhost/auto_video")
database = databases.Database(DATABASE_URL)

app = FastAPI(title="PostgreSQL App", version="1.0.0")
templates = Jinja2Templates(directory="templates")

# Connect/Disconnect events
@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# -----------------------------
# Pydantic Schemas
# -----------------------------

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    permissions: Optional[List[str]] = []

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    permissions: List[str]
    created_at: datetime

class ImageDetailCreate(BaseModel):
    title: str
    image_url: str
    resolution: Optional[str] = None
    download_engine: Optional[str] = None
    site_url: str

class ImageDetailOut(BaseModel):
    id: int
    title: str
    author_id: int
    image_url: str
    resolution: Optional[str]
    download_engine: Optional[str]
    site_url: str
    created_at: datetime
    approved: bool

# -----------------------------
# Helper & Auth Functions
# -----------------------------

async def get_current_user(request: Request) -> UserOut:
    user_id = request.cookies.get("id")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    query = "SELECT id, name, email, permissions, created_at FROM users WHERE id = :id"
    user = await database.fetch_one(query=query, values={"id": int(user_id)})
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid user")
    user_dict = dict(user)
    user_dict["permissions"] = user_dict["permissions"].split(",") if user_dict["permissions"] else []
    return UserOut(**user_dict)

# -----------------------------
# HTML Endpoints for Login/Signup
# -----------------------------

@app.get("/", response_class=HTMLResponse)
async def homepage(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/signup", response_class=HTMLResponse)
async def signup_page(request: Request):
    return templates.TemplateResponse("signup.html", {"request": request})

@app.get("/login", response_class=HTMLResponse)
async def login_page(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

@app.post("/signup")
async def signup_user(
    request: Request,
    name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...)
):
    # Check if email already exists
    query = "SELECT id FROM users WHERE email = :email"
    existing = await database.fetch_one(query=query, values={"email": email})
    if existing:
        return templates.TemplateResponse(
            "signup.html",
            {"request": request, "error": "Email already registered", "email": email, "name": name}
        )
    created_at = datetime.utcnow()
    query = """
    INSERT INTO users (name, email, password, permissions, created_at)
    VALUES (:name, :email, :password, :permissions, :created_at)
    RETURNING id
    """
    # For this example, permissions is empty and password is stored in plain text (remember to hash in production)
    user_id = await database.execute(query=query, values={
        "name": name,
        "email": email,
        "password": password,
        "permissions": "",
        "created_at": created_at
    })
    return RedirectResponse(url="/login", status_code=status.HTTP_303_SEE_OTHER)

@app.post("/login")
async def login_user(
    request: Request,
    email: str = Form(...),
    password: str = Form(...)
):
    query = "SELECT id, password FROM users WHERE email = :email"
    user = await database.fetch_one(query=query, values={"email": email})
    if not user or user["password"] != password:  # In production, use hashed password verification
        return templates.TemplateResponse(
            "login.html",
            {"request": request, "error": "Invalid email or password"}
        )
    response = RedirectResponse(url="/", status_code=status.HTTP_303_SEE_OTHER)
    response.set_cookie(key="id", value=str(user["id"]), httponly=True)
    return response

# -----------------------------
# User CRUD Endpoints
# -----------------------------

@app.post("/users/", response_model=UserOut)
async def create_user(user: UserCreate):
    query = "SELECT id FROM users WHERE email = :email"
    existing = await database.fetch_one(query=query, values={"email": user.email})
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    created_at = datetime.utcnow()
    query = """
    INSERT INTO users (name, email, password, permissions, created_at)
    VALUES (:name, :email, :password, :permissions, :created_at)
    RETURNING id, name, email, permissions, created_at
    """
    values = {
        "name": user.name,
        "email": user.email,
        "password": user.password,  # Hash in production!
        "permissions": ",".join(user.permissions) if user.permissions else "",
        "created_at": created_at
    }
    created_user = await database.fetch_one(query=query, values=values)
    user_dict = dict(created_user)
    user_dict["permissions"] = user_dict["permissions"].split(",") if user_dict["permissions"] else []
    return UserOut(**user_dict)

@app.get("/users/", response_model=List[UserOut])
async def list_users():
    query = "SELECT id, name, email, permissions, created_at FROM users"
    rows = await database.fetch_all(query=query)
    users = []
    for row in rows:
        user_dict = dict(row)
        user_dict["permissions"] = user_dict["permissions"].split(",") if user_dict["permissions"] else []
        users.append(UserOut(**user_dict))
    return users

@app.get("/users/{user_id}", response_model=UserOut)
async def get_user(user_id: int):
    query = "SELECT id, name, email, permissions, created_at FROM users WHERE id = :id"
    row = await database.fetch_one(query=query, values={"id": user_id})
    if not row:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    user_dict = dict(row)
    user_dict["permissions"] = user_dict["permissions"].split(",") if user_dict["permissions"] else []
    return UserOut(**user_dict)

@app.put("/users/{user_id}", response_model=UserOut)
async def update_user(user_id: int, user: UserCreate):
    query = """
    UPDATE users 
    SET name = :name, email = :email, password = :password, permissions = :permissions 
    WHERE id = :id 
    RETURNING id, name, email, permissions, created_at
    """
    values = {
        "id": user_id,
        "name": user.name,
        "email": user.email,
        "password": user.password,  # Hash in production!
        "permissions": ",".join(user.permissions) if user.permissions else ""
    }
    updated = await database.fetch_one(query=query, values=values)
    if not updated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    updated_dict = dict(updated)
    updated_dict["permissions"] = updated_dict["permissions"].split(",") if updated_dict["permissions"] else []
    return UserOut(**updated_dict)

@app.delete("/users/{user_id}")
async def delete_user(user_id: int):
    query = "DELETE FROM users WHERE id = :id RETURNING id"
    deleted = await database.fetch_one(query=query, values={"id": user_id})
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return {"message": "User deleted successfully"}

# -----------------------------
# Image CRUD Endpoints
# -----------------------------

@app.post("/images/", response_model=ImageDetailOut)
async def create_image(
    image: ImageDetailCreate,
    request: Request,
    current_user: UserOut = Depends(get_current_user)
):
    created_at = datetime.utcnow()
    query = """
    INSERT INTO image_details (title, author_id, image_url, resolution, download_engine, site_url, created_at, approved)
    VALUES (:title, :author_id, :image_url, :resolution, :download_engine, :site_url, :created_at, :approved)
    RETURNING id, title, author_id, image_url, resolution, download_engine, site_url, created_at, approved
    """
    values = {
        "title": image.title,
        "author_id": current_user.id,
        "image_url": image.image_url,
        "resolution": image.resolution,
        "download_engine": image.download_engine,
        "site_url": image.site_url,
        "created_at": created_at,
        "approved": False
    }
    created_image = await database.fetch_one(query=query, values=values)
    return ImageDetailOut(**dict(created_image))

@app.get("/images/", response_model=List[ImageDetailOut])
async def list_images():
    query = "SELECT id, title, author_id, image_url, resolution, download_engine, site_url, created_at, approved FROM image_details"
    rows = await database.fetch_all(query=query)
    return [ImageDetailOut(**dict(row)) for row in rows]

@app.get("/images/{image_id}", response_model=ImageDetailOut)
async def get_image(image_id: int):
    query = "SELECT id, title, author_id, image_url, resolution, download_engine, site_url, created_at, approved FROM image_details WHERE id = :id"
    row = await database.fetch_one(query=query, values={"id": image_id})
    if not row:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image not found")
    return ImageDetailOut(**dict(row))

@app.put("/images/{image_id}", response_model=ImageDetailOut)
async def update_image(
    image_id: int,
    image: ImageDetailCreate,
    request: Request,
    current_user: UserOut = Depends(get_current_user)
):
    # Check authorization: only the author or an admin can update
    check_query = "SELECT author_id FROM image_details WHERE id = :id"
    row = await database.fetch_one(query=check_query, values={"id": image_id})
    if not row:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image not found")
    if row["author_id"] != current_user.id and "admin" not in current_user.permissions:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")
    
    query = """
    UPDATE image_details 
    SET title = :title, image_url = :image_url, resolution = :resolution, download_engine = :download_engine, site_url = :site_url 
    WHERE id = :id 
    RETURNING id, title, author_id, image_url, resolution, download_engine, site_url, created_at, approved
    """
    values = {
        "id": image_id,
        "title": image.title,
        "image_url": image.image_url,
        "resolution": image.resolution,
        "download_engine": image.download_engine,
        "site_url": image.site_url,
    }
    updated = await database.fetch_one(query=query, values=values)
    if not updated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image not found")
    return ImageDetailOut(**dict(updated))

@app.delete("/images/{image_id}")
async def delete_image(
    image_id: int,
    current_user: UserOut = Depends(get_current_user)
):
    check_query = "SELECT author_id FROM image_details WHERE id = :id"
    row = await database.fetch_one(query=check_query, values={"id": image_id})
    if not row:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image not found")
    if row["author_id"] != current_user.id and "admin" not in current_user.permissions:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")
    
    query = "DELETE FROM image_details WHERE id = :id RETURNING id"
    deleted = await database.fetch_one(query=query, values={"id": image_id})
    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image not found")
    return {"message": "Image deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", reload=True)
