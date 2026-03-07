import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const services = [
        'AC Service & Repair', 'Electrician', 'General Mechanic',
        'Car Service', 'Bike Service', 'Plumber', 'Painter',
    ];

    const quickLinks = [
        { to: '/', label: 'Home' },
        { to: '/services', label: 'All Services' },
        { to: '/about', label: 'About Us' },
        { to: '/booking', label: 'Book a Service' },
        { to: '/contact', label: 'Contact Us' },
    ];

    const contacts = [
        { icon: '📞', label: 'Phone', value: '+91 95115 82964', href: 'tel:+919511582964' },
        { icon: '📸', label: 'Instagram', value: '@mistrijii', href: 'https://www.instagram.com/mistrijii' },
        { icon: '✉️', label: 'Email', value: 'support@mistrijii.in', href: 'mailto:support@mistrijii.in' },
        { icon: '📍', label: 'Location', value: 'Bikaner, Rajasthan, India', href: '#' },
    ];

    return (
        <footer className="footer">
            <div className="footer-main">
                <div className="container">
                    <div className="footer-grid">

                        {/* ── Brand ── */}
                        <div className="footer-brand">
                            <Link to="/" className="footer-logo" aria-label="MistriJii">
                                <div className="footer-logo-mark">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z" fill="white" opacity="0.95" />
                                        <circle cx="12" cy="11" r="2.5" fill="rgba(0,0,0,0.3)" />
                                    </svg>
                                </div>
                                <span className="footer-logo-name">Mistri<span>Jii</span></span>
                            </Link>

                            <p className="footer-tagline">
                                India's most trusted home services platform. Expert professionals at your doorstep — fast, safe, and affordable.
                            </p>

                            <div className="footer-rating">
                                <div className="fr-stars">
                                    {[1, 2, 3, 4, 5].map(n => <span key={n}>⭐</span>)}
                                </div>
                                <span className="fr-score">4.9</span>
                                <span className="fr-count">/ Based on 10,000+ reviews</span>
                            </div>

                            <div className="footer-socials">
                                <a href="https://www.instagram.com/mistrijii" target="_blank" rel="noreferrer" className="social-btn" aria-label="Instagram">
                                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                                    </svg>
                                </a>
                                <a href="#" className="social-btn" aria-label="Instagram">
                                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                                    </svg>
                                </a>
                                <a href="tel:+919511582964" className="social-btn" aria-label="Call us">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.13 6.13l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* ── Services ── */}
                        <div className="footer-col">
                            <h4>Our Services</h4>
                            <ul className="footer-links">
                                {services.map(s => (
                                    <li key={s}>
                                        <Link to="/services" className="footer-link">
                                            <span className="footer-link-dot" />
                                            {s}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* ── Quick Links ── */}
                        <div className="footer-col">
                            <h4>Quick Links</h4>
                            <ul className="footer-links">
                                {quickLinks.map(l => (
                                    <li key={l.to}>
                                        <Link to={l.to} className="footer-link">
                                            <span className="footer-link-dot" />
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* ── Contact ── */}
                        <div className="footer-col">
                            <h4>Contact Us</h4>
                            <div className="footer-contact-items">
                                {contacts.map(c => (
                                    <div key={c.label} className="footer-contact-item">
                                        <div className="fci-icon">{c.icon}</div>
                                        <div className="fci-text">
                                            <div className="fci-label">{c.label}</div>
                                            <a href={c.href} className="fci-value" target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                                                {c.value}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="footer-newsletter">
                                <div className="fn-title">🔔 Get Service Updates</div>
                                <div className="fn-sub">Subscribe for offers & news</div>
                                <form className="fn-form" onSubmit={e => e.preventDefault()}>
                                    <input type="email" placeholder="your@email.com" aria-label="Email address" />
                                    <button type="submit">Join</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ── Bottom Bar ── */}
            <div className="footer-bottom">
                <div className="container footer-bottom-inner">
                    <p className="footer-copy">
                        © 2025 <span>MistriJii</span>. All rights reserved. Made with ❤️ in India.
                    </p>
                    <div className="footer-bottom-links">
                        <a href="#" className="fb-link">Privacy Policy</a>
                        <span className="fb-sep">·</span>
                        <a href="#" className="fb-link">Terms of Service</a>
                        <span className="fb-sep">·</span>
                        <a href="#" className="fb-link">Refund Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
