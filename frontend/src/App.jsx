import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Public Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import BookService from './pages/BookService';
import Confirmation from './pages/Confirmation';
import Contact from './pages/Contact';
import Login from './pages/Login';

// Admin Pages
import Dashboard from './admin/Dashboard';
import Bookings from './admin/Bookings';
import Technicians from './admin/Technicians';

import './index.css';
import './App.css';

/* ── Scroll to top on navigation ── */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
};

/* ── Instagram Floating Button ── */
const InstagramFloat = () => (
  <a
    href="https://instagram.com/yourusername" // Replace 'yourusername' with your actual handle
    target="_blank"
    rel="noreferrer"
    className="insta-float"
    aria-label="Follow us on Instagram"
    id="insta-float-btn"
  >
    <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
    <span>Instagram</span>
  </a>
);

/* ── 404 Page ── */
const NotFound = () => (
  <div className="not-found" style={{ marginTop: '100px' }}>
    <div className="nf-code">404</div>
    <h2 className="nf-title">Page Not Found</h2>
    <p className="nf-message">The page you're looking for doesn't exist or has been moved.</p>
    <a href="/" className="btn btn-primary btn-lg">🏠 Back to Home</a>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          {/* We can conditionally render Navbar and Footer based on routes, but for simplicity, we'll keep them globally or use layout wrappers. */}
          <Routes>
            {/* Public Routes */}
            <Route path="/*" element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/booking" element={<BookService />} />
                  <Route path="/booking/confirmation" element={<Confirmation />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <div className="divider" />
                <Footer />
                <InstagramFloat />
              </>
            } />

            {/* Admin Routes */}
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
                  {/* Simple Admin Navbar or reuse the main Navbar */}
                  <div style={{ backgroundColor: '#fff', padding: '15px 30px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between' }}>
                    <h2>Mistrijii Admin</h2>
                    <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      <a href="/admin" style={{ textDecoration: 'none', color: '#333' }}>Dashboard</a>
                      <a href="/admin/bookings" style={{ textDecoration: 'none', color: '#333' }}>Bookings</a>
                      <a href="/admin/technicians" style={{ textDecoration: 'none', color: '#333' }}>Technicians</a>
                      <a href="/" style={{ textDecoration: 'none', color: '#688cff', fontWeight: 'bold' }}>To Main Site</a>
                    </nav>
                  </div>
                  <div style={{ padding: '20px', flex: 1 }}>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="bookings" element={<Bookings />} />
                      <Route path="technicians" element={<Technicians />} />
                    </Routes>
                  </div>
                </div>
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
