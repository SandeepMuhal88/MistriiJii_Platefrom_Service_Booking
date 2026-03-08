import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/login', label: 'Admin' },
];

/* ── Sun Icon ── */
const SunIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
);

/* ── Moon Icon ── */
const MoonIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
);

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setMenuOpen(false); }, [location]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    return (
        <header className={`navbar ${scrolled ? 'scrolled' : ''}`} role="banner">
            <div className="container navbar-inner">

                {/* ── Logo ── */}
                <Link to="/" className="navbar-logo" aria-label="MistriJii Home">
                    <div className="logo-mark">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
                                fill="white" opacity="0.95" />
                            <circle cx="12" cy="11" r="2.5" fill="rgba(0,0,0,0.3)" />
                        </svg>
                    </div>
                    <div className="logo-wordmark">
                        <span className="logo-name">Mistri<span>Jii</span></span>
                        <span className="logo-tagline">Service on Demand</span>
                    </div>
                </Link>

                {/* ── Desktop Nav ── */}
                <nav className="navbar-links" aria-label="Main navigation">
                    {navLinks.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* ── Right ── */}
                <div className="navbar-right">
                    {/* <a href="tel:+919511582964" className="nav-phone hide-mobile">
                        <span className="dot" />
                        +91 95115 82964
                    </a> */}

                    {/* Theme Toggle */}
                    <button
                        id="theme-toggle-btn"
                        className="theme-toggle-btn"
                        onClick={toggleTheme}
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                    </button>

                    <Link to="/booking" className="btn btn-primary hide-mobile" id="nav-book-btn">
                        Book Now
                    </Link>

                    {/* Hamburger */}
                    <button
                        id="hamburger-btn"
                        className={`hamburger ${menuOpen ? 'open' : ''}`}
                        onClick={() => setMenuOpen(v => !v)}
                        aria-label="Toggle navigation menu"
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </div>

            {/* ── Mobile Menu ── */}
            <div
                id="mobile-menu"
                className={`mobile-menu ${menuOpen ? 'open' : ''}`}
                role="navigation"
                aria-label="Mobile navigation"
                aria-hidden={!menuOpen}
            >
                <div className="mobile-menu-links">
                    {navLinks.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`mobile-link ${location.pathname === link.to ? 'active' : ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
                <div className="mobile-menu-footer">
                    <Link to="/booking" className="btn btn-primary mobile-book-btn">
                        📅 Book a Service
                    </Link>
                    <a href="tel:+919511582964" className="mobile-call-link">
                        📞 Call: +91 95115 82964
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
