from fastapi import FastAPI
from routes import booking_routes

app = FastAPI()

app.include_router(booking_routes.router)