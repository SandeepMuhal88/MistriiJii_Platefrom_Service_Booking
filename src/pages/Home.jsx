import { Link } from 'react-router-dom';
import './Home.css';

const services = [
    {
        icon: '⚡', title: 'Electrician',
        desc: 'Wiring, short circuit, fan & light installation by certified professionals.',
        price: 'From ₹199', color: '#F59E0B',
        bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)',
    },
    {
        icon: '❄️', title: 'AC Service',
        desc: 'AC cleaning, gas refill, repair & installation — all in one visit.',
        price: 'From ₹499', color: '#06B6D4',
        bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.2)',
    },
    {
        icon: '🔧', title: 'Mechanic',
        desc: 'Machine, motor, pump repair — skilled technicians at your doorstep.',
        price: 'From ₹299', color: '#A78BFA',
        bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.2)',
    },
    {
        icon: '🚗', title: 'Car Service',
        desc: 'Oil change, tyre, brake check — professional doorstep car care.',
        price: 'From ₹799', color: '#10B981',
        bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)',
    },
];

const stats = [
    { val: '10,000+', label: 'Happy Customers' },
    { val: '500+', label: 'Expert Technicians' },
    { val: '4.9★', label: 'Average Rating' },
    { val: '24/7', label: 'Service Available' },
];

const steps = [
    {
        num: '01', icon: '📱', title: 'Choose Your Service',
        desc: 'Select the service you need — AC, Electrician, Mechanic, or any home repair.',
    },
    {
        num: '02', icon: '📅', title: 'Pick a Time Slot',
        desc: 'Choose a date & time that works for you. Book in under 2 minutes.',
    },
    {
        num: '03', icon: '🏠', title: 'Expert Arrives',
        desc: 'A verified professional arrives on time and gets the job done with a quality guarantee.',
    },
];

const testimonials = [
    {
        name: 'Rahul Sharma', city: 'Bikaner, Rajasthan',
        rating: 5,
        text: 'Bahut accha service tha! AC technician ne 30 minutes mein sab kuch theek kar diya. Very professional and punctual. Highly recommend!',
        avatar: 'RS', color: '#F97316',
    },
    {
        name: 'Priya Verma', city: 'Bikaner, Rajasthan',
        rating: 5,
        text: 'MistriJii app se booking kar ke ek ghante mein electrician aa gaya. Kaam bhi ek baar mein theek ho gaya. Fantastic experience!',
        avatar: 'PV', color: '#06B6D4',
    },
    {
        name: 'Amit Kumar', city: 'Bikaner, Rajasthan',
        rating: 5,
        text: 'Very affordable and completely trusted service. Mechanic ne bike ki problem pehli baar mein hi pakad li. Zabardast platform hai!',
        avatar: 'AK', color: '#A78BFA',
    },
];

const Home = () => (
    <main className="home">

        {/* ── HERO ── */}
        <section className="hero" aria-label="Hero section">
            <div className="hero-blobs">
                <div className="hero-blob hb-1" />
                <div className="hero-blob hb-2" />
                <div className="hero-blob hb-3" />
            </div>

            <div className="container hero-inner">
                {/* Left Content */}
                <div className="hero-content">
                    <div className="hero-eyebrow anim-fade-up">
                        <span className="hero-eyebrow-pill">NEW</span>
                        India's Most Trusted Home Service Platform
                    </div>

                    <h1 className="hero-title anim-fade-up delay-1">
                        Expert Services<br />
                        <span className="gradient-text">At Your Doorstep</span>
                    </h1>

                    <p className="hero-subtitle anim-fade-up delay-2">
                        AC service, Electrician, Mechanic & more — book a <strong>verified professional</strong> in under 2 minutes.
                        Guaranteed quality, fair pricing.
                    </p>

                    <div className="hero-actions anim-fade-up delay-3">
                        <Link to="/booking" className="btn btn-primary btn-xl" id="hero-book-btn">
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.13 6.13l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            Book Now — Free
                        </Link>
                        <Link to="/services" className="btn btn-outline btn-xl">
                            Explore Services →
                        </Link>
                    </div>

                    <div className="hero-trust anim-fade-up delay-4">
                        {[
                            ['✓', 'Police-Verified Experts'],
                            ['✓', 'No Hidden Charges'],
                            ['✓', '30-Day Warranty'],
                        ].map(([icon, text], i) => (
                            <div key={i} className="trust-item">
                                <span className="trust-check">{icon}</span>
                                <span>{text}</span>
                                {i < 2 && <span className="trust-sep" />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Visual */}
                <div className="hero-visual" aria-hidden="true">
                    <div className="hero-card-wrap">
                        <div className="hero-main-card">
                            <div className="hmc-header">
                                <div className="hmc-avatar">👷</div>
                                <div className="hmc-info">
                                    <div className="hmc-name">Sohil Khan</div>
                                    <div className="hmc-role">AC Technician · 6 yrs exp</div>
                                </div>
                                <div className="hmc-rating">
                                    <div className="hmc-rating-val">4.9</div>
                                    <div className="hmc-rating-stars">
                                        {[1, 2, 3, 4, 5].map(n => <span key={n} className="star">★</span>)}
                                    </div>
                                </div>
                            </div>

                            <div className="hmc-status">
                                <span className="status-dot live" />
                                <span className="hmc-status-text">Available Now</span>
                                <span className="hmc-eta">ETA: 25 min</span>
                            </div>

                            <div className="hmc-chips">
                                <span className="hmc-chip">❄️ AC Repair</span>
                                <span className="hmc-chip">🔧 Installation</span>
                                <span className="hmc-chip">💨 Deep Clean</span>
                            </div>
                        </div>

                        <div className="hmc-mini hmc-mini-1">
                            <div className="hmc-mini-icon" style={{ background: 'rgba(245,158,11,0.15)' }}>⚡</div>
                            <div>
                                <div className="hmc-mini-label">Electrician</div>
                                <div className="hmc-mini-sub">3 experts nearby</div>
                            </div>
                        </div>

                        <div className="hmc-mini hmc-mini-2">
                            <div className="hmc-mini-icon" style={{ background: 'rgba(16,185,129,0.15)' }}>🛡️</div>
                            <div>
                                <div className="hmc-mini-label">Verified & Safe</div>
                                <div className="hmc-mini-sub">Background checked</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* ── STATS BAND ── */}
        <section className="stats-band" aria-label="Key statistics">
            <div className="container">
                <div className="stats-band-inner">
                    {stats.map((s, i) => (
                        <div key={i} className="stat-item">
                            <div className="stat-val">{s.val}</div>
                            <div className="stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* ── SERVICES PREVIEW ── */}
        <section className="section services-preview" aria-label="Services">
            <div className="container">
                <div className="section-header">
                    <span className="badge">🛠️ What We Offer</span>
                    <h2>Popular <span className="gradient-text">Services</span></h2>
                    <p>Trained professionals for every home need — one call away, always on time.</p>
                </div>

                <div className="services-grid">
                    {services.map((svc, i) => (
                        <Link
                            key={i}
                            to="/services"
                            className="svc-preview-card"
                            style={{ '--svc-color': svc.color }}
                            aria-label={`Explore ${svc.title} service`}
                        >
                            <div className="svc-card-icon-wrap" style={{ background: svc.bg, border: `1px solid ${svc.border}` }}>
                                <span>{svc.icon}</span>
                            </div>
                            <h3 className="svc-card-title">{svc.title}</h3>
                            <p className="svc-card-desc">{svc.desc}</p>
                            <div className="svc-card-footer">
                                <span className="svc-card-price" style={{ color: svc.color }}>{svc.price}</span>
                                <span className="svc-arrow">→</span>
                            </div>
                            <div className="svc-card-glow" style={{ background: `radial-gradient(ellipse at bottom, ${svc.color}12, transparent 70%)` }} />
                        </Link>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <Link to="/services" className="btn btn-ghost" id="view-all-services-btn">
                        View All 10+ Services
                    </Link>
                </div>
            </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="section how-section" aria-label="How it works">
            <div className="container">
                <div className="section-header">
                    <span className="badge badge-cyan">📱 Process</span>
                    <h2>Book in <span className="gradient-text">3 Simple Steps</span></h2>
                    <p>From service selection to expert arrival — the entire process takes less than 2 minutes.</p>
                </div>

                <div className="steps-row">
                    {steps.map((step, i) => (
                        <>
                            <div key={step.num} className="step-card" data-num={step.num}>
                                <div className="step-num-badge">{step.num}</div>
                                <div className="step-icon-wrap">{step.icon}</div>
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-desc">{step.desc}</p>
                            </div>
                            {i < steps.length - 1 && (
                                <div key={`arrow-${i}`} className="step-connector-arrow">→</div>
                            )}
                        </>
                    ))}
                </div>
            </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="section testimonials-section" aria-label="Customer reviews">
            <div className="container">
                <div className="section-header">
                    <span className="badge">💬 Reviews</span>
                    <h2>What Our <span className="gradient-text">Customers Say</span></h2>
                    <p>10,000+ satisfied customers across India trust MistriJii for their home services.</p>
                </div>

                <div className="testim-grid">
                    {testimonials.map((t, i) => (
                        <div key={i} className="testim-card" aria-label={`Review by ${t.name}`}>
                            <div className="testim-stars">
                                {Array.from({ length: t.rating }).map((_, j) => (
                                    <span key={j} className="testim-star">⭐</span>
                                ))}
                            </div>
                            <p className="testim-quote">
                                <span className="testim-quota-mark">"</span>
                                {t.text}
                                <span className="testim-quota-mark">"</span>
                            </p>
                            <div className="testim-author">
                                <div className="testim-avatar" style={{ background: `${t.color}18`, color: t.color, border: `1.5px solid ${t.color}35` }}>
                                    {t.avatar}
                                </div>
                                <div>
                                    <div className="testim-name">{t.name}</div>
                                    <div className="testim-city">📍 {t.city}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="home-cta" aria-label="Call to action">
            <div className="container">
                <div className="cta-box">
                    <div className="cta-pre">Ready to get started?</div>
                    <h2>Book Today,<br /><span className="gradient-text">Get Expert Service at Home</span></h2>
                    <p>Every service comes with a satisfaction guarantee — or your money back. No questions asked.</p>
                    <div className="cta-actions">
                        <Link to="/booking" className="btn btn-primary btn-xl" id="cta-book-btn">
                            📅 Book a Service Now
                        </Link>
                        <a href="tel:+919511582964" className="btn btn-outline btn-xl">
                            📞 Call: +91 95115 82964
                        </a>
                    </div>
                </div>
            </div>
        </section>

    </main>
);

export default Home;
