import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setMenuOpen(false); }, [location]);

    // Lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    return (
        <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-inner">

                {/* ── Logo ── */}
                <Link to="/" className="navbar-logo" aria-label="MistriJii Home">
                    <div className="logo-mark">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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

                {/* ── Right CTA ── */}
                <div className="navbar-right">
                    <a href="tel:+919511582964" className="nav-phone hide-mobile">
                        <span className="dot" />
                        +91 95115 82964
                    </a>
                    <Link to="/booking" className="btn btn-primary hide-mobile">
                        Book Now
                    </Link>
                    <button
                        id="hamburger-btn"
                        className={`hamburger ${menuOpen ? 'open' : ''}`}
                        onClick={() => setMenuOpen(v => !v)}
                        aria-label="Toggle navigation menu"
                        aria-expanded={menuOpen}
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </div>

            {/* ── Mobile Menu ── */}
            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} role="navigation" aria-label="Mobile navigation">
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
