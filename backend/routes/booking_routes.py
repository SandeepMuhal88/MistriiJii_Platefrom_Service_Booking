from fastapi import APIRouter

router = APIRouter()

bookings = []

@router.post("/bookings")
def create_booking(data: dict):

    bookings.append(data)

    return {
        "message": "Booking created"
    }


@router.get("/bookings")
def get_bookings():

    return bookings