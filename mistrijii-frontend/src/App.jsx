import { Routes, Route } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";
import ProtectedRoute from "./components/ProtectedRoute";   // ⭐ ADD
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

        {/* Login Route */}
        <Route path="/login" element={<PhoneLogin />} />

        {/* Public Website */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ⭐ Protected Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
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

export default App;