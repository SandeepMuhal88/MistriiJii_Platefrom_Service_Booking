import React, { createContext, useState, useContext, useEffect } from 'react';

const BookingContext = createContext();

export const useBookings = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
    // Load bookings from local storage to keep state across refreshes
    const [bookings, setBookings] = useState(() => {
        const localData = localStorage.getItem('mistrijii_bookings');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('mistrijii_bookings', JSON.stringify(bookings));
    }, [bookings]);

    const addBooking = (bookingData) => {
        const newBooking = {
            id: Date.now().toString(),
            ...bookingData,
            status: 'Pending',
            dateCreated: new Date().toISOString()
        };
        setBookings(prev => [newBooking, ...prev]);
        return newBooking;
    };

    const updateBookingStatus = (id, newStatus) => {
        setBookings(prev =>
            prev.map(b => b.id === id ? { ...b, status: newStatus } : b)
        );
    };

    const deleteBooking = (id) => {
        setBookings(prev => prev.filter(b => b.id !== id));
    };

    return (
        <BookingContext.Provider value={{ bookings, addBooking, updateBookingStatus, deleteBooking }}>
            {children}
        </BookingContext.Provider>
    );
};
