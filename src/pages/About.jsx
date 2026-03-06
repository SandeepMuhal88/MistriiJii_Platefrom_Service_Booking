import { Link } from 'react-router-dom';
import './About.css';

const whatWeDo = [
    { icon: '⚡', title: 'Electrical Solutions', desc: 'From short circuits to full rewiring — our certified electricians handle it all. Safe, fast, reliable.', color: '#F59E0B' },
    { icon: '❄️', title: 'AC & Cooling Services', desc: 'AC service, deep clean, gas refill, PCB repair, compressor replacement — one call for all cooling needs.', color: '#06B6D4' },
    { icon: '🔧', title: 'Mechanic & Repair', desc: 'Motor, pump, machine, pipe — expert mechanics come to your doorstep for any mechanical repair.', color: '#A78BFA' },
    { icon: '🚗', title: 'Vehicle Services', desc: 'Car & bike doorstep service — oil change, brake check, tyre rotation — skip the garage entirely.', color: '#10B981' },
    { icon: '🏠', title: 'Home Maintenance', desc: 'Plumbing, painting, carpentry, cleaning — any home task, just call us.', color: '#FB923C' },
    { icon: '📺', title: 'Appliance Repair', desc: 'TV, washing machine, fridge, microwave — all appliance repairs at home with genuine parts.', color: '#818CF8' },
];

const values = [
    { icon: '🛡️', title: 'Fully Verified', desc: 'Every technician undergoes police verification and skill assessment before joining our platform.' },
    { icon: '⚡', title: 'Lightning Fast', desc: 'Expert at your doorstep within 60 minutes of booking — guaranteed response time.' },
    { icon: '💰', title: 'Fair Pricing', desc: 'Transparent billing — no hidden charges. You see the price, that\'s what you pay.' },
    { icon: '⭐', title: 'Quality Warranty', desc: '30-day service warranty on every job. Not satisfied? We\'ll fix it for free.' },
];

const team = [
    { name: 'Sandeep Singh', role: 'Founder & CEO', emoji: '👨‍💼', color: '#F97316' },
    { name: 'Priya Sharma', role: 'Operations Head', emoji: '👩‍💼', color: '#06B6D4' },
    { name: 'Rahul Gupta', role: 'Tech Lead', emoji: '👨‍💻', color: '#A78BFA' },
    { name: 'Anita Verma', role: 'Customer Success', emoji: '👩‍🎧', color: '#10B981' },
];

const storyStats = [
    { val: '2023', label: 'Founded' },
    { val: '10K+', label: 'Happy Customers' },
    { val: '500+', label: 'Expert Technicians' },
    { val: '20+', label: 'Cities in India' },
];

const About = () => (
    <main>
        {/* ── Page Hero ── */}
        <section className="page-hero">
            <div className="page-hero-blob blob-a" />
            <div className="page-hero-blob blob-b" />
            <div className="container page-hero-inner">
                <span className="badge">🏢 About MistriJii</span>
                <h1>Who We <span className="gradient-text">Are</span></h1>
                <p>A platform that brings quality home services to every Indian household — quickly, safely, and affordably.</p>
            </div>
        </section>

        {/* ── Story ── */}
        <section className="section story-section">
            <div className="container story-grid">
                <div className="story-content">
                    <span className="badge badge-white">📖 Our Story</span>
                    <h2>Why <span className="gradient-text">MistriJii</span> Was Born</h2>
                    <p className="story-para">
                        In 2023, our founder <strong>Sandeep Singh</strong> spent 3 frustrating days trying to find a reliable AC technician during peak summer. No one was trustworthy, pricing was unclear.
                    </p>
                    <p className="story-para">
                        That's when MistriJii was born — a platform where <strong>one call brings a verified, skilled, and affordable expert</strong> to your door. No hassle, no surprises.
                    </p>
                    <p className="story-para">
                        Today, MistriJii has become the first choice for 10,000+ families across India, with a rapidly growing network of expert technicians.
                    </p>
                    <Link to="/booking" className="btn btn-primary" style={{ width: 'fit-content', marginTop: '8px' }} id="about-book-btn">
                        📅 Book Your First Service
                    </Link>
                </div>

                <div>
                    <div className="story-stats-grid">
                        {storyStats.map((s, i) => (
                            <div key={i} className="story-stat-card">
                                <div className="ssc-val">{s.val}</div>
                                <div className="ssc-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* ── What We Do ── */}
        <section className="section wwd-section">
            <div className="container">
                <div className="section-header">
                    <span className="badge">🛠️ What We Do</span>
                    <h2>Services We <span className="gradient-text">Provide</span></h2>
                    <p>MistriJii gives you India's best home service experience — a solution for every need.</p>
                </div>
                <div className="wwd-grid">
                    {whatWeDo.map((item, i) => (
                        <div key={i} className="wwd-card" style={{ '--wwd-border': `${item.color}30` }}>
                            <div className="wwd-icon" style={{ background: `${item.color}12`, border: `1px solid ${item.color}22` }}>
                                <span>{item.icon}</span>
                            </div>
                            <h3 className="wwd-title">{item.title}</h3>
                            <p className="wwd-desc">{item.desc}</p>
                            <div className="wwd-bar" style={{ background: item.color }} />
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* ── Values ── */}
        <section className="section values-section">
            <div className="container">
                <div className="section-header">
                    <span className="badge badge-cyan">💎 Our Values</span>
                    <h2>What Makes Us <span className="gradient-text">Different</span></h2>
                </div>
                <div className="values-grid">
                    {values.map((v, i) => (
                        <div key={i} className="value-card">
                            <div className="val-icon">{v.icon}</div>
                            <h3 className="val-title">{v.title}</h3>
                            <p className="val-desc">{v.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* ── Mission & Vision ── */}
        <section className="section mission-section">
            <div className="container">
                <div className="section-header">
                    <span className="badge">🎯 Our Purpose</span>
                    <h2>Mission & <span className="gradient-text">Vision</span></h2>
                </div>
                <div className="mission-grid">
                    <div className="mission-card" style={{ borderColor: 'rgba(249,115,22,0.25)' }}>
                        <div className="mission-icon">🎯</div>
                        <h3>Our Mission</h3>
                        <p>To bring affordable, reliable and fast home services to every household in India — without any hassle or uncertainty.</p>
                    </div>
                    <div className="mission-card" style={{ borderColor: 'rgba(6,182,212,0.25)' }}>
                        <div className="mission-icon">🔭</div>
                        <h3>Our Vision</h3>
                        <p>To become India's #1 home services platform by 2026 — giving 1 lakh+ technicians a stable income and professional dignity.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* ── Team ── */}
        <section className="section team-section">
            <div className="container">
                <div className="section-header">
                    <span className="badge badge-white">👥 Team</span>
                    <h2>The People Behind <span className="gradient-text">MistriJii</span></h2>
                    <p>Passionate professionals committed to making home services better for everyone.</p>
                </div>
                <div className="team-grid">
                    {team.map((m, i) => (
                        <div key={i} className="team-card">
                            <div className="team-avatar" style={{ background: `${m.color}12`, border: `2px solid ${m.color}25` }}>
                                {m.emoji}
                            </div>
                            <h3 className="team-name">{m.name}</h3>
                            <p className="team-role" style={{ color: m.color }}>{m.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* ── CTA ── */}
        <section className="section">
            <div className="container">
                <div className="about-cta">
                    <h2>Ready to Experience <span className="gradient-text">MistriJii</span>?</h2>
                    <p>Book now and get an expert at your doorstep within 30 minutes. Satisfaction guaranteed.</p>
                    <Link to="/booking" className="btn btn-primary btn-lg" id="about-cta-btn">
                        Book a Service →
                    </Link>
                </div>
            </div>
        </section>
    </main>
);

export default About;
