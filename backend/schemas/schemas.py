from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# ─── User Schemas ──────────────────────────────────────────
class UserBase(BaseModel):
    name: str
    email: str
    phone: str


class UserCreate(UserBase):
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class PhoneOTPRequest(BaseModel):
    phone: str


class PhoneOTPVerify(BaseModel):
    phone: str
    otp: str


class User(UserBase):
    id: int
    is_admin: bool
    created_at: datetime

    model_config = {"from_attributes": True}


# ─── Token Schemas ─────────────────────────────────────────
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None


# ─── Booking Schemas ───────────────────────────────────────
class BookingBase(BaseModel):
    service: str
    name: str
    phone: str
    address: str
    date: str
    time: str
    notes: Optional[str] = None


class BookingCreate(BookingBase):
    pass


class BookingUpdate(BaseModel):
    status: str


class Booking(BookingBase):
    id: int
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}
