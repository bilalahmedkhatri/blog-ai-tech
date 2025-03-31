from fastapi import FastAPI, Request, Depends, HTTPException, Form
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
from fastapi import FastAPI, Request, Depends, Form, HTTPException
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session, joinedload
from datetime import datetime
from urllib.parse import urlparse
from passlib.context import CryptContext
from pathlib import Path
from typing import Optional
from fastapi.responses import RedirectResponse
import logging
import random
# from auth import hash_password, verify_password, create_access_token, decode_access_token
from datetime import datetime
from db import TargetSize, User, ImageDetail, UserCreate, UserOut, ImageDetailCreate, ImageDetailOut, engine, ImageSelection, Parameter
from database import get_db
from tasks import process_images_task, language_country_codes

logger = logging.getLogger("uvicorn.error")

BASE_DIR = Path(__file__).resolve().parent

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
app = FastAPI()
app.mount(
    "/media", StaticFiles(directory=BASE_DIR.joinpath('media', 'image')), name="media")
templates = Jinja2Templates(directory="templates")


# GET endpoint to render the login page
@app.get("/login")
async def login_page(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

# POST endpoint to handle login


@app.post("/login")
async def login_user(
    request: Request,
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == email).first()
    if not user or not pwd_context.verify(password, user.hashed_password):
        # Render the login page again with an error message if credentials are invalid
        return templates.TemplateResponse("login.html", {"request": request, "error": "Invalid email or password"})

    # Create a response and set a secure, HTTP-only cookie with the user's ID
    response = RedirectResponse(url="/", status_code=303)
    response.set_cookie(key="id", value=user.id, httponly=True)
    return response


@app.post("/signup")
def signup_user(
    request: Request,
    email: str = Form(...),
    password: str = Form(...),
    name: str = Form(None),
    db: Session = Depends(get_db)
):
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        return templates.TemplateResponse(
            "signup.html",
            {
                "request": request,
                "error": "Email already registered",
                "email": email,
                "name": name
            }
        )

    # Create new user
    new_user = User(
        # id=str(uuid.uuid4()),
        email=email,
        hashed_password=hash_password(password),
        name=name
    )
    db.add(new_user)
    db.commit()

    # Redirect to login
    return RedirectResponse(url="/login", status_code=303)


# Simple user authentication (example)
def get_current_user(request: Request, db: Session = Depends(get_db)):
    # In real code, use a proper auth system (e.g., OAuth, JWT)
    user_id = request.cookies.get("id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Not authenticated")
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid user")
    return user

# Utility: get site name from URL


def get_site_name(url: str) -> str:
    parsed = urlparse(url)
    return parsed.netloc.split('.')[-2] if parsed.netloc else "Unknown"

# ------------------------------
# ROUTES
# ------------------------------


@app.get("/")
async def read_root(request: Request, db: Session = Depends(get_db)):
    # Get images with author data
    images = db.query(ImageDetail).options(
        joinedload(ImageDetail.author)).all()
    users = db.query(User).all()

    # Populate a 'site_name' attribute for convenience
    for img in images:
        img.site_name = get_site_name(img.site_url)

    # Render the updated "index.html" template
    return templates.TemplateResponse(
        "index.html",
        {
            "request": request,
            "images": images,
            "users": users
        }
    )


@app.post("/users/", response_model=UserOut)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Hash password
    print('running this function')
    hashed_password = pwd_context.hash(user.password)
    db_user = User(
        id=str(datetime.now().timestamp()),
        name=user.name,
        email=user.email,
        hashed_password=hashed_password,
        permissions=",".join(user.permissions)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Handle form submission for creating a user


@app.post("/create-user")
async def handle_create_user(
    name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    permissions: str = Form(""),
    db: Session = Depends(get_db)
):
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        return RedirectResponse(url="/?error=Email+already+exists", status_code=303)

    hashed_password = pwd_context.hash(password)
    db_user = User(
        # id=str(datetime.now().timestamp()),
        name=name,
        email=email,
        hashed_password=hashed_password,
        permissions=permissions
    )
    db.add(db_user)
    db.commit()
    return RedirectResponse(url="/", status_code=303)

# Handle form submission for creating an image


@app.post("/create-image")
async def handle_create_image(
    title: str = Form(...),
    image_url: str = Form(...),
    site_url: str = Form(...),
    author_id: str = Form(...),
    download_engine: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    db_image = ImageDetail(
        # id=str(datetime.now().timestamp()),
        title=title,
        image_url=image_url,
        site_url=site_url,
        author_id=author_id,
        download_engine=download_engine
    )
    db.add(db_image)
    db.commit()
    return RedirectResponse(url="/", status_code=303)


@app.post("/images/", response_model=ImageDetailOut)
async def create_image_api(
    image: ImageDetailCreate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_image = ImageDetail(
        id=str(datetime.now().timestamp()),
        title=image.title,
        author_id=user.id,
        image_url=image.image_url,
        resolution=image.resolution,
        download_engine=image.download_engine,
        site_url=image.site_url
    )
    db.add(db_image)
    db.commit()
    db.refresh(db_image)
    return db_image


@app.put("/images/{image_id}", response_model=ImageDetailOut)
async def update_image(
    image_id: int,
    image: ImageDetailCreate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_image = db.query(ImageDetail).filter(ImageDetail.id == image_id).first()
    if not db_image:
        raise HTTPException(status_code=404, detail="Image not found")
    # Basic authorization check
    if db_image.author_id != user.id and "admin" not in user.permissions.split(","):
        raise HTTPException(status_code=403, detail="Not authorized")

    for key, value in image.dict().items():
        setattr(db_image, key, value)

    db.commit()
    db.refresh(db_image)
    return db_image


# @app.delete("/delete/images/{image_id}")
# async def delete_image(
#     image_id: int,
#     user: User = Depends(get_current_user),
#     db: Session = Depends(get_db)
# ):
#     print("print this function")
#     db_image = db.query(ImageDetail).filter(ImageDetail.id == image_id).first()
#     if not db_image:
#         raise HTTPException(status_code=404, detail="Image not found")


@app.delete("/delete/image_id/{imageId}/user_id/{user_id}")
def delete_image(imageId: int, user_id: int):
    with Session(engine) as session:
        user = session.get(User, user_id)
        image = session.get(ImageDetail, imageId)
        if image.author_id != user.id and "admin" not in user.permissions.split(","):
            logger.error(
                f"Delete failed: User {user.id} {user.name} not authorized to delete image {image.title}")
            raise HTTPException(status_code=403, detail="Not authorized")
        session.delete(image)
        session.commit()
        logger.info(f"Image {image} deleted successfully by user {user_id}")
        return {"ok": True}


@app.post("/fetch-images/{name}")
async def fetch_images(name: str):
    # username = "honda_v2"
    rand_lang = random.choice(language_country_codes)
    rend_page = random.randint(1, 50)
    params = {
        "query": "honda cbr 650 rr",
        "categories": "images",
        "limit": 100,
        "size": "large",
        "page": rend_page,
        "orientation": "vertical",
        # Optional languages are: "en-EN", "de-DE", "es-ES", "fr-FR", "it-IT", "pt-PT"
        "language": rand_lang
    }
    process_images_task.delay(params, name)
    # process_images_task(params, name)
    return {"message": "Image processing started"}


@app.post("/update-checked-images")
def update_checked_images(data: ImageSelection):
    if not data.image_ids:
        raise HTTPException(status_code=400, detail="No images selected")

    # Process the image IDs (Example: Approve images, Delete, etc.)
    return {"message": f"Updated images: {data.image_ids}"}


@app.post("/submit")
async def submit_form(data: Parameter):
    return {"message": "Form submitted successfully!", "data": data}


@app.get("/video_gen")
async def serve_form_page(request: Request, target_size: TargetSize):
        return templates.TemplateResponse("video_gen.html", {"request": request, "target_size": target_size})
