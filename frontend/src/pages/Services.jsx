import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import './Services.css';

const servicesSchema = [
    {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'All Home Services — MistriJii',
        description: 'Complete list of professional home services available for booking at MistriJii.',
        url: 'https://mistrijii.in/services',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Electrician — From ₹199', url: 'https://mistrijii.in/booking?service=Electrician' },
            { '@type': 'ListItem', position: 2, name: 'Inverter & Battery — From ₹299', url: 'https://mistrijii.in/booking?service=Inverter+%26+Battery' },
            { '@type': 'ListItem', position: 3, name: 'AC Service & Repair — From ₹499', url: 'https://mistrijii.in/booking?service=AC+Service+%26+Repair' },
            { '@type': 'ListItem', position: 4, name: 'AC Installation — From ₹699', url: 'https://mistrijii.in/booking?service=AC+Installation' },
            { '@type': 'ListItem', position: 5, name: 'General Mechanic — From ₹299', url: 'https://mistrijii.in/booking?service=General+Mechanic' },
            { '@type': 'ListItem', position: 6, name: 'Plumber — From ₹199', url: 'https://mistrijii.in/booking?service=Plumber' },
            { '@type': 'ListItem', position: 7, name: 'Car Service — From ₹799', url: 'https://mistrijii.in/booking?service=Car+Service' },
            { '@type': 'ListItem', position: 8, name: 'Bike Service — From ₹399', url: 'https://mistrijii.in/booking?service=Bike+Service' },
            { '@type': 'ListItem', position: 9, name: 'Painter — From ₹599', url: 'https://mistrijii.in/booking?service=Painter' },
            { '@type': 'ListItem', position: 10, name: 'Appliance Repair — From ₹249', url: 'https://mistrijii.in/booking?service=TV+%2F+Appliance+Repair' },
            { '@type': 'ListItem', position: 11, name: 'Solar Installation', url: 'https://mistrijii.in/booking?service=Solar+Installation' },
        ],
    },
];


const categories = [
    { id: 'all', label: 'All Services', icon: '🏠' },
    { id: 'electric', label: 'Electrical', icon: '⚡' },
    { id: 'ac', label: 'AC & HVAC', icon: '❄️' },
    { id: 'mechanic', label: 'Mechanic', icon: '🔧' },
    { id: 'vehicle', label: 'Vehicle', icon: '🚗' },
    { id: 'other', label: 'More Services', icon: '🔩' },
];

const allServices = [
    {
        id: 1, category: 'electric', icon: '⚡', title: 'Electrician',
        desc: 'Wiring, short circuit repair, switchboard replacement, fan & light installation. Certified electricians for all electrical work.',
        price: '₹199', time: '30–60 min', rating: 4.9, reviews: 2840, color: '#F59E0B',
        features: ['Wiring & Rewiring', 'Switch/Plug Repair', 'Light Installation', 'Fan Fitting', 'MCB/Fuse Repair'],
    },
    {
        id: 2, category: 'electric', icon: '🔌', title: 'Inverter & Battery',
        desc: 'Inverter installation, battery check, UPS repair and maintenance at your home.',
        price: '₹299', time: '45–90 min', rating: 4.8, reviews: 1200, color: '#F59E0B',
        features: ['Battery Checkup', 'Inverter Repair', 'UPS Setup', 'Wiring Connection'],
    },
    {
        id: 3, category: 'ac', icon: '❄️', title: 'AC Service & Repair',
        desc: 'AC deep cleaning, gas refill, PCB repair, compressor check — all managed by certified AC technicians.',
        price: '₹499', time: '1–2 hours', rating: 4.9, reviews: 4150, color: '#06B6D4',
        features: ['Deep Cleaning', 'Gas Refill', 'PCB Repair', 'Cooling Check', 'Installation'],
    },
    {
        id: 4, category: 'ac', icon: '🌡️', title: 'AC Installation',
        desc: 'New AC installation — split or window type, all brands handled professionally.',
        price: '₹699', time: '2–3 hours', rating: 4.8, reviews: 980, color: '#06B6D4',
        features: ['Wall Mounting', 'Pipe Fitting', 'Gas Charging', 'Test Run', 'Demo'],
    },
    {
        id: 5, category: 'mechanic', icon: '🔧', title: 'General Mechanic',
        desc: 'Motor, pump, machine — any mechanical problem solved by our experienced technicians.',
        price: '₹299', time: '1–2 hours', rating: 4.7, reviews: 1670, color: '#A78BFA',
        features: ['Motor Repair', 'Pump Servicing', 'Belt & Pulley', 'Machine Maintenance'],
    },
    {
        id: 6, category: 'mechanic', icon: '🚿', title: 'Plumber',
        desc: 'Pipe repair, tap replacement, geyser installation, bathroom fitting and drain cleaning.',
        price: '₹199', time: '30–90 min', rating: 4.8, reviews: 3200, color: '#60A5FA',
        features: ['Pipe Repair', 'Tap Fitting', 'Geyser Install', 'Drain Clean', 'Leakage Fix'],
    },
    {
        id: 7, category: 'vehicle', icon: '🚗', title: 'Car Service',
        desc: 'Doorstep car service — oil change, tyre rotation, brake check, AC recharge and full checkup.',
        price: '₹799', time: '2–3 hours', rating: 4.8, reviews: 2100, color: '#10B981',
        features: ['Oil Change', 'Tyre Check', 'Brake Repair', 'Car AC Service', 'Full Checkup'],
    },
    {
        id: 8, category: 'vehicle', icon: '🏍️', title: 'Bike Service',
        desc: 'Full bike service — chain lube, oil change, brake checkup and tyre pressure at your home.',
        price: '₹399', time: '1–2 hours', rating: 4.9, reviews: 1890, color: '#34D399',
        features: ['Engine Oil', 'Chain Lubrication', 'Brake Check', 'Tyre Pressure', 'Wash & Polish'],
    },
    {
        id: 9, category: 'other', icon: '🎨', title: 'Painter',
        desc: 'Wall painting, POP work, texture design — professional painters at affordable rates.',
        price: '₹599', time: 'Per day basis', rating: 4.7, reviews: 870, color: '#FB923C',
        features: ['Interior Painting', 'Exterior Painting', 'POP Work', 'Texture Design', 'Waterproofing'],
    },
    {
        id: 10, category: 'other', icon: '📺', title: 'Appliance Repair',
        desc: 'LED TV, washing machine, refrigerator — all appliance repairs at your home.',
        price: '₹249', time: '1–2 hours', rating: 4.8, reviews: 1450, color: '#818CF8',
        features: ['LED TV Repair', 'Washing Machine', 'Refrigerator', 'Microwave', 'Geyser'],
    },
    {
        id: 11, category: 'other', icon: '☀️', title: 'Solar Installation',
        desc: 'Solar panel installation, battery setup, system maintenance by certified solar engineers.',
        price: 'As Required', time: 'Per day basis', rating: 4.7, reviews: 320, color: '#FACC15',
        features: ['Panel Installation', 'Battery Setup', 'System Maintenance', 'Net Metering', 'Monitoring'],
    },
];

const Services = () => {
    const [active, setActive] = useState('all');

    const filtered = active === 'all' ? allServices : allServices.filter(s => s.category === active);

    return (
        <main className="flex-1 pt-[70px]">
            <SEOHead
                title="All Home Services — AC Repair, Electrician, Mechanic, Plumber Near Me"
                description="Browse 11+ professional home services: AC repair, Electrician, Mechanic, Plumber, Car & Bike service. Police-verified experts. Guaranteed quality. Book online in 2 min. Starting ₹199."
                canonical="/services"
                schema={servicesSchema}
            />

            {/* ── Page Hero ── */}
            <section className="page-hero">
                <div className="page-hero-blob blob-a" />
                <div className="page-hero-blob blob-b" />
                <div className="container page-hero-inner">
                    <span className="badge">🛠️ All Services</span>
                    <h1>Our <span className="gradient-text">Services</span></h1>
                    <p>Professional, verified and affordable home services — all on one platform.</p>
                </div>
            </section>

            {/* ── Category Filter ── */}
            <div className="filter-bar">
                <div className="container">
                    <div className="category-tabs" role="tablist" aria-label="Service categories">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                id={`tab-${cat.id}`}
                                role="tab"
                                aria-selected={active === cat.id}
                                className={`cat-tab ${active === cat.id ? 'active' : ''}`}
                                onClick={() => setActive(cat.id)}
                            >
                                <span className="tab-icon">{cat.icon}</span>
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Services Grid ── */}
            <section className="section">
                <div className="container">
                    <div className="results-row">
                        <p className="results-count">
                            Showing <strong>{filtered.length}</strong> services
                            {active !== 'all' && ` in ${categories.find(c => c.id === active)?.label}`}
                        </p>
                    </div>

                    <div className="svc-grid">
                        {filtered.map(svc => (
                            <article
                                key={svc.id}
                                className="svc-card"
                                aria-label={svc.title}
                            >
                                <div className="svc-card-head">
                                    <div className="svc-icon-box" style={{ background: `${svc.color}12`, border: `1px solid ${svc.color}22` }}>
                                        <span>{svc.icon}</span>
                                    </div>
                                    <div className="svc-rating-wrap">
                                        <div className="svc-rating-stars">
                                            {[1, 2, 3, 4, 5].map(n => <span key={n}>⭐</span>)}
                                        </div>
                                        <div className="svc-rating-val">{svc.rating} <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '0.75rem' }}>({svc.reviews.toLocaleString()})</span></div>
                                    </div>
                                </div>

                                <h3 className="svc-title">{svc.title}</h3>
                                <p className="svc-desc">{svc.desc}</p>

                                <div className="svc-features-wrap">
                                    {svc.features.slice(0, 3).map(f => (
                                        <span key={f} className="svc-feat-chip">✓ {f}</span>
                                    ))}
                                    {svc.features.length > 3 && (
                                        <span className="svc-feat-more">+{svc.features.length - 3} more</span>
                                    )}
                                </div>

                                <div className="svc-card-foot">
                                    <div className="svc-meta-info">
                                        <div className="svc-price" style={{ color: svc.color }}>From {svc.price}</div>
                                        <div className="svc-time">⏱ {svc.time}</div>
                                    </div>
                                    <Link
                                        to={`/booking?service=${encodeURIComponent(svc.title)}`}
                                        className="svc-book-btn"
                                        id={`book-${svc.id}`}
                                        style={{ background: `linear-gradient(135deg, ${svc.color}, ${svc.color}aa)` }}
                                    >
                                        Book Now
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="svc-page-cta" style={{ marginTop: '64px' }}>
                        <h2>Didn't Find Your Service? 🤔</h2>
                        <p>We cover almost every home need. Call us or chat on WhatsApp — we'll sort it out.</p>
                        <div className="svc-cta-btns">
                            <a href="tel:+919511582964" className="btn btn-primary">📞 Call Now</a>
                            <a href="https://wa.me/919511582964" target="_blank" rel="noreferrer" className="btn btn-outline">💬 WhatsApp Us</a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Services;
