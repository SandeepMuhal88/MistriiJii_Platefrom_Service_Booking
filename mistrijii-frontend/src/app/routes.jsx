import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

// Public Pages
import Home from "../features/public/pages/Home";
import About from "../features/public/pages/About";
import Contact from "../features/public/pages/Contact";

// Booking
import Booking from "../features/booking/pages/Booking";

// Auth
import Login from "../features/auth/pages/Login";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";

// Admin
import Dashboard from "../features/admin/pages/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Public */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
      </Route>

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
      </Route>

    </Routes>
  );
}