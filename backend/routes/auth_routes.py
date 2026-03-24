from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import models
from schemas import schemas
from services.auth_service import (
    verify_password, get_password_hash, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
)
from datetime import timedelta, datetime
import random

router = APIRouter(prefix="/auth", tags=["auth"])


# ─── Email / Password Auth ──────────────────────────────────

@router.post("/register", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if db.query(models.User).filter(models.User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = models.User(
        name=user.name,
        email=user.email,
        phone=user.phone,
        hashed_password=get_password_hash(user.password),
        is_admin=True  # MVP: all registered users are admin
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.post("/login", response_model=schemas.Token)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(
        data={"sub": db_user.email},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    return {"access_token": access_token, "token_type": "bearer"}


# ─── Phone OTP Auth ─────────────────────────────────────────

@router.post("/phone/send-otp")
def send_otp(payload: schemas.PhoneOTPRequest, db: Session = Depends(get_db)):
    """
    Generate a 6-digit OTP and store it. In production, send via SMS gateway.
    For MVP: OTP is returned in response (demo mode).
    """
    phone = payload.phone.strip()
    otp = str(random.randint(100000, 999999))
    expires = datetime.utcnow() + timedelta(minutes=10)

    db_user = db.query(models.User).filter(models.User.phone == phone).first()
    if not db_user:
        # Auto-register user with phone only
        db_user = models.User(
            name="User",
            phone=phone,
            is_admin=False,
        )
        db.add(db_user)

    db_user.otp_code = otp
    db_user.otp_expires = expires
    db.commit()

    # In production: integrate Twilio / MSG91 here
    # For demo, we return the OTP in the response
    return {
        "message": f"OTP sent to {phone}",
        "otp_demo": otp,  # Remove in production!
        "expires_in_minutes": 10,
    }


@router.post("/phone/verify-otp", response_model=schemas.Token)
def verify_otp(payload: schemas.PhoneOTPVerify, db: Session = Depends(get_db)):
    phone = payload.phone.strip()
    db_user = db.query(models.User).filter(models.User.phone == phone).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="Phone number not found. Request OTP first.")

    if not db_user.otp_code or db_user.otp_code != payload.otp.strip():
        raise HTTPException(status_code=400, detail="Invalid OTP")

    if db_user.otp_expires and datetime.utcnow() > db_user.otp_expires:
        raise HTTPException(status_code=400, detail="OTP has expired. Please request a new one.")

    # Clear OTP after successful verify
    db_user.otp_code = None
    db_user.otp_expires = None
    db.commit()

    # Use phone as the JWT subject for phone-auth users
    access_token = create_access_token(
        data={"sub": db_user.email or db_user.phone},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    return {"access_token": access_token, "token_type": "bearer"}
