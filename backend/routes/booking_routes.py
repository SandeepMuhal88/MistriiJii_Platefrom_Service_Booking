from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import models
from schemas import schemas
from services.auth_service import get_current_user

router = APIRouter(prefix="/bookings", tags=["bookings"])


@router.post("", response_model=schemas.Booking)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    """Create a new booking — no auth required (public endpoint)."""
    new_booking = models.Booking(
        service=booking.service,
        name=booking.name,
        phone=booking.phone,
        address=booking.address,
        date=booking.date,
        time=booking.time,
        notes=booking.notes,
        status="Pending",
    )
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    return new_booking


@router.get("", response_model=list[schemas.Booking])
def get_bookings(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    """Get all bookings — admin only."""
    return db.query(models.Booking).order_by(models.Booking.created_at.desc()).all()


@router.get("/stats")
def get_booking_stats(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    """Get dashboard stats."""
    total = db.query(models.Booking).count()
    pending = db.query(models.Booking).filter(models.Booking.status == "Pending").count()
    confirmed = db.query(models.Booking).filter(models.Booking.status == "Confirmed").count()
    completed = db.query(models.Booking).filter(models.Booking.status == "Completed").count()
    cancelled = db.query(models.Booking).filter(models.Booking.status == "Cancelled").count()
    return {
        "total": total,
        "pending": pending,
        "confirmed": confirmed,
        "completed": completed,
        "cancelled": cancelled,
    }


@router.put("/{booking_id}", response_model=schemas.Booking)
def update_booking_status(
    booking_id: int,
    booking: schemas.BookingUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    db_booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    db_booking.status = booking.status
    db.commit()
    db.refresh(db_booking)
    return db_booking


@router.delete("/{booking_id}")
def delete_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    db_booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    db.delete(db_booking)
    db.commit()
    return {"message": "Booking deleted successfully"}