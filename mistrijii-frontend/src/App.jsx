import { Routes, Route } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";
import './App.css';

import MainLayout from "./layout/MainLayout";
import AdminLayout from "./layout/AdminLayout";

import Home from "./pages/Home";
import About from "./pages/about";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Dashboard from "./admin/Dashboard";

function App() {
  return (
    <BookingProvider>
      <Routes>

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
          <Route path="bookings" element={<Dashboard />} /> {/* Placeholder for now */}
          <Route path="services" element={<Dashboard />} />
          <Route path="customers" element={<Dashboard />} />
          <Route path="settings" element={<Dashboard />} />
        </Route>

      </Routes>
    </BookingProvider>
  );
}

export default App;