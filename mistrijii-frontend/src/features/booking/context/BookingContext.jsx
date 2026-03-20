import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuth } from '../../auth/context/AuthContext';

const BookingContext = createContext();

export const useBookings = () => useContext(BookingContext);

const API_URL = "http://localhost:8000";

export const BookingProvider = ({ children }) => {
    const { user } = useAuth() || {};
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = { "Content-Type": "application/json" };
            if (token) headers["Authorization"] = `Bearer ${token}`;

            // We still fetch even if not admin, but the backend will return 401 if not allowed
            // The frontend won't crash, just logs an error.
            if (!token) {
                setLoading(false);
                return;
            }

            const res = await fetch(`${API_URL}/bookings`, { headers });
            if (res.ok) {
                const data = await res.json();
                setBookings(data.sort((a,b) => new Date(b.created_at) - new Date(a.created_at)));
            }
        } catch (error) {
            console.error("Failed to fetch bookings", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBookings();
    }, [user, fetchBookings]);

    const addBooking = async (bookingData) => {
        try {
            const res = await fetch(`${API_URL}/bookings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData)
            });
            if (res.ok) {
                const newBooking = await res.json();
                setBookings(prev => [newBooking, ...prev]);
                return newBooking;
            } else {
                console.error("Failed to add booking");
            }
        } catch (error) {
            console.error("Error adding booking", error);
        }
    };

    const updateBookingStatus = async (id, newStatus) => {
        try {
            const token = localStorage.getItem("token");
            const headers = { "Content-Type": "application/json" };
            if (token) headers["Authorization"] = `Bearer ${token}`;

            const res = await fetch(`${API_URL}/bookings/${id}`, {
                method: "PUT",
                headers,
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                const updatedBooking = await res.json();
                setBookings(prev =>
                    prev.map(b => b.id === id ? updatedBooking : b)
                );
            }
        } catch (error) {
            console.error("Error updating booking status", error);
        }
    };

    const deleteBooking = async (id) => {
        try {
             const token = localStorage.getItem("token");
             const headers = { "Content-Type": "application/json" };
             if (token) headers["Authorization"] = `Bearer ${token}`;

             const res = await fetch(`${API_URL}/bookings/${id}`, {
                 method: "DELETE",
                 headers
             });

             if (res.ok) {
                 setBookings(prev => prev.filter(b => b.id !== id));
             }
        } catch (error) {
            console.error("Error deleting booking", error);
        }
    };

    return (
        <BookingContext.Provider value={{ bookings, loading, addBooking, updateBookingStatus, deleteBooking, fetchBookings }}>
            {children}
        </BookingContext.Provider>
    );
};
