import { Routes, Route } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";
import './App.css';

import MainLayout from "./layout/MainLayout";
import AdminLayout from "./layout/AdminLayout";

import PhoneLogin from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/about.jsx";
import Booking from "./pages/Booking.jsx";
import Contact from "./pages/Contact.jsx";
import Dashboard from "./admin/Dashboard.jsx";


function App() {
  return (
    <BookingProvider>
      <Routes>

        {/* Login Route (Public — Outside Layout) */}
        <Route path="/login" element={<PhoneLogin />} />

        {/* Public Website */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<Dashboard />} />
          <Route path="services" element={<Dashboard />} />
          <Route path="customers" element={<Dashboard />} />
          <Route path="settings" element={<Dashboard />} />
        </Route>

      </Routes>
    </BookingProvider>
  );
}