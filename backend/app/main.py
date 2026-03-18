from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import booking_routes, auth_routes
from app.database import engine
from app.models import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="MistriJii API")

# Setup CORS to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router)
app.include_router(booking_routes.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to MistriJii Backend API"}