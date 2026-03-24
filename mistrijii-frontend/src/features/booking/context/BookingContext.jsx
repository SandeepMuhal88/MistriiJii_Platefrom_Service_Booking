import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { useAuth } from "../../auth/context/AuthContext";

const BookingContext = createContext();

export const useBookings = () => useContext(BookingContext);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const BookingProvider = ({ children }) => {
  const { getToken } = useAuth();
  const [bookings, setBookings]   = useState([]);
  const [loading, setLoading]     = useState(false);
  const [stats, setStats]         = useState(null);

  const authHeaders = () => {
    const token = getToken?.();
    const h = { "Content-Type": "application/json" };
    if (token) h["Authorization"] = `Bearer ${token}`;
    return h;
  };

  /* ── Fetch all bookings (admin only) ───────────────────── */
  const fetchBookings = useCallback(async () => {
    const token = getToken?.();
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/bookings`, { headers: authHeaders() });
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ── Fetch stats ────────────────────────────────────────── */
  const fetchStats = useCallback(async () => {
    const token = getToken?.();
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/bookings/stats`, { headers: authHeaders() });
      if (res.ok) setStats(await res.json());
    } catch (err) {
      console.error("Failed to fetch stats", err);
    }
  }, []);

  /* ── Create booking (public) ────────────────────────────── */
  const addBooking = async (bookingData) => {
    const res = await fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to create booking");
    }
    const newBooking = await res.json();
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  /* ── Update status ──────────────────────────────────────── */
  const updateBookingStatus = async (id, newStatus) => {
    const res = await fetch(`${API_URL}/bookings/${id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      const updated = await res.json();
      setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
    }
  };

  /* ── Delete booking ─────────────────────────────────────── */
  const deleteBooking = async (id) => {
    const res = await fetch(`${API_URL}/bookings/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (res.ok) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return (
    <BookingContext.Provider
      value={{ bookings, loading, stats, addBooking, updateBookingStatus, deleteBooking, fetchBookings, fetchStats }}
    >
      {children}
    </BookingContext.Provider>
  );
};
