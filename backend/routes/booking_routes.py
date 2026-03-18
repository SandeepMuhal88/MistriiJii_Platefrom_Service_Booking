from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import models
from schemas import schemas
from services.auth_service import get_current_user

router = APIRouter(prefix="/bookings", tags=["bookings"])

@router.post("", response_model=schemas.Booking)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    new_booking = models.Booking(
        service=booking.service,
        name=booking.name,
        phone=booking.phone,
        address=booking.address,
        date=booking.date,
        time=booking.time,
        notes=booking.notes
    )
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    return new_booking

@router.get("", response_model=list[schemas.Booking])
def get_bookings(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # Assuming only logged-in users (admins) can view bookings
    return db.query(models.Booking).all()

@router.put("/{booking_id}", response_model=schemas.Booking)
def update_booking_status(booking_id: int, booking: schemas.BookingUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    db_booking.status = booking.status
    db.commit()
    db.refresh(db_booking)
    return db_booking

@router.delete("/{booking_id}")
def delete_booking(booking_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    db.delete(db_booking)
    db.commit()
    return {"message": "Booking deleted successfully"}