import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import './BookService.css';

const bookingSchema = [
    {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Book a Home Service — MistriJii',
        url: 'https://mistrijii.in/booking',
        description:
            'Book any home service in 3 easy steps: enter your details, choose your service & time slot, confirm your address. Expert arrives within 60 minutes.',
        potentialAction: {
            '@type': 'ReserveAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://mistrijii.in/booking',
                inLanguage: 'en-IN',
                actionPlatform: [
                    'http://schema.org/DesktopWebPlatform',
                    'http://schema.org/MobileWebPlatform',
                ],
            },
            result: {
                '@type': 'Reservation',
                name: 'Home Service Booking',
            },
        },
    },
];


const services = [
    'Electrician', 'AC Service & Repair', 'AC Installation', 'Inverter & Battery',
    'General Mechanic', 'Plumber', 'Car Service', 'Bike Service',
    'Painter', 'TV / Appliance Repair', 'Solar Installation', 'Other',
];

const timeSlots = [
    '8:00 AM – 10:00 AM', '10:00 AM – 12:00 PM',
    '12:00 PM – 2:00 PM', '2:00 PM – 4:00 PM',
    '4:00 PM – 6:00 PM', '6:00 PM – 8:00 PM',
];

const trustItems = [
    { icon: '🛡️', title: 'Verified Professionals', sub: 'Police-verified & skill-tested' },
    { icon: '💰', title: 'No Hidden Charges', sub: 'Transparent pricing always' },
    { icon: '⭐', title: '4.9/5 Average Rating', sub: 'Based on 10,000+ reviews' },
    { icon: '🔄', title: '30-Day Warranty', sub: 'Free re-service guarantee' },
];

const BookService = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const today = new Date().toISOString().split('T')[0];

    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        name: '', phone: '', email: '',
        service: searchParams.get('service') || '',
        date: '', slot: '', address: '', pincode: '', note: '',
    });

    const update = e => {
        const { name, value } = e.target;
        setForm(p => ({ ...p, [name]: value }));
        if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
    };

    const setSlot = slot => {
        setForm(p => ({ ...p, slot }));
        if (errors.slot) setErrors(p => ({ ...p, slot: '' }));
    };

    const validate = n => {
        const e = {};
        if (n === 1) {
            if (!form.name.trim()) e.name = 'Please enter your name';
            if (!form.phone || !/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit mobile number';
            if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
        }
        if (n === 2) {
            if (!form.service) e.service = 'Please select a service';
            if (!form.date) e.date = 'Please pick a date';
            if (!form.slot) e.slot = 'Please select a time slot';
        }
        if (n === 3) {
            if (!form.address.trim()) e.address = 'Please enter your address';
            if (!form.pincode || !/^\d{6}$/.test(form.pincode)) e.pincode = 'Enter a valid 6-digit pincode';
        }
        return e;
    };

    const next = () => {
        const e = validate(step);
        if (Object.keys(e).length) { setErrors(e); return; }
        setStep(s => s + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const back = () => { setStep(s => s - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); };

    const submit = async e => {
        e.preventDefault();
        const e3 = validate(3);
        if (Object.keys(e3).length) { setErrors(e3); return; }
        setSubmitting(true);
        await new Promise(r => setTimeout(r, 1500));
        setSubmitting(false);
        navigate('/booking/confirmation', { state: form });
    };

    const steps = [
        { num: 1, label: 'Step 1', title: 'Your Details', icon: '👤' },
        { num: 2, label: 'Step 2', title: 'Service & Time', icon: '🛠️' },
        { num: 3, label: 'Step 3', title: 'Address', icon: '📍' },
    ];

    return (
        <main>
            <SEOHead
                title="Book a Home Service Online — AC, Electrician, Mechanic | MistriJii"
                description="Book AC repair, Electrician, Plumber, Mechanic & more in 3 easy steps. Choose your service, pick a time slot, get an expert at your doorstep in 60 min. Starting ₹199."
                canonical="/booking"
                schema={bookingSchema}
            />

            {/* ── Page Hero ── */}
            <section className="page-hero" style={{ paddingBottom: '48px' }}>
                <div className="page-hero-blob blob-a" />
                <div className="page-hero-blob blob-b" />
                <div className="container page-hero-inner">
                    <span className="badge">📅 Book a Service</span>
                    <h1>Book Your <span className="gradient-text">Expert</span></h1>
                    <p>3 simple steps — fill your details, choose service & time, and confirm your address.</p>
                </div>
            </section>

            {/* ── Main Layout ── */}
            <section className="section" style={{ paddingTop: '24px' }}>
                <div className="container">
                    <div className="booking-layout">

                        {/* ── Left: Form ── */}
                        <div>
                            {/* Stepper */}
                            <div className="stepper">
                                {steps.map((s, i) => (
                                    <>
                                        <div key={s.num} className={`stepper-step ${step > s.num ? 'done' : ''} ${step === s.num ? 'active' : ''}`}>
                                            <div className="stepper-circle">
                                                {step > s.num ? '✓' : s.icon}
                                            </div>
                                            <div className="stepper-info">
                                                <div className="stepper-label">{s.label}</div>
                                                <div className="stepper-title">{s.title}</div>
                                            </div>
                                        </div>
                                        {i < steps.length - 1 && (
                                            <div key={`ln-${i}`} className={`stepper-line ${step > s.num ? 'filled' : ''}`} />
                                        )}
                                    </>
                                ))}
                            </div>

                            {/* Form Card */}
                            <div className="booking-form-card">
                                <form onSubmit={submit}>

                                    {/* Step 1 */}
                                    {step === 1 && (
                                        <div className="anim-fade-up">
                                            <h2 className="form-step-title">👤 Your Personal Details</h2>
                                            <p className="form-step-sub">We'll use this to contact you and confirm your booking.</p>
                                            <div className="form-grid">
                                                <div className="field-group col-full">
                                                    <label htmlFor="b-name">Full Name *</label>
                                                    <input id="b-name" type="text" name="name" placeholder="e.g. Rahul Sharma" value={form.name} onChange={update} className={errors.name ? 'is-error' : ''} />
                                                    {errors.name && <span className="field-error">⚠ {errors.name}</span>}
                                                </div>

                                                <div className="field-group">
                                                    <label htmlFor="b-phone">Mobile Number *</label>
                                                    <div className="input-prefix-wrap">
                                                        <span className="prefix">+91</span>
                                                        <input id="b-phone" type="tel" name="phone" placeholder="9XXXXXXXXX" maxLength={10} value={form.phone} onChange={update} className={errors.phone ? 'is-error' : ''} />
                                                    </div>
                                                    {errors.phone && <span className="field-error">⚠ {errors.phone}</span>}
                                                </div>

                                                <div className="field-group">
                                                    <label htmlFor="b-email">Email (Optional)</label>
                                                    <input id="b-email" type="email" name="email" placeholder="email@example.com" value={form.email} onChange={update} className={errors.email ? 'is-error' : ''} />
                                                    {errors.email && <span className="field-error">⚠ {errors.email}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 2 */}
                                    {step === 2 && (
                                        <div className="anim-fade-up">
                                            <h2 className="form-step-title">🛠️ Service & Schedule</h2>
                                            <p className="form-step-sub">Choose what you need and when you'd like us to come.</p>
                                            <div className="form-grid">
                                                <div className="field-group col-full">
                                                    <label htmlFor="b-service">Which Service Do You Need? *</label>
                                                    <select id="b-service" name="service" value={form.service} onChange={update} className={errors.service ? 'is-error' : ''}>
                                                        <option value="">-- Select a Service --</option>
                                                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                                                    </select>
                                                    {errors.service && <span className="field-error">⚠ {errors.service}</span>}
                                                </div>

                                                <div className="field-group">
                                                    <label htmlFor="b-date">Preferred Date *</label>
                                                    <input id="b-date" type="date" name="date" min={today} value={form.date} onChange={update} className={errors.date ? 'is-error' : ''} />
                                                    {errors.date && <span className="field-error">⚠ {errors.date}</span>}
                                                </div>

                                                <div className="field-group">
                                                    <label>Preferred Time Slot *</label>
                                                    <div className="time-slot-grid">
                                                        {timeSlots.map(t => (
                                                            <button key={t} type="button" className={`time-slot-btn ${form.slot === t ? 'selected' : ''}`} onClick={() => setSlot(t)}>
                                                                {t}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    {errors.slot && <span className="field-error">⚠ {errors.slot}</span>}
                                                </div>

                                                <div className="field-group col-full">
                                                    <label htmlFor="b-note">Problem Description (Optional)</label>
                                                    <textarea id="b-note" name="note" rows={3} placeholder="e.g. AC is not cooling properly, light not working..." value={form.note} onChange={update} />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 3 */}
                                    {step === 3 && (
                                        <div className="anim-fade-up">
                                            <h2 className="form-step-title">📍 Service Address</h2>
                                            <p className="form-step-sub">Where should our expert come?</p>
                                            <div className="form-grid">
                                                <div className="field-group col-full">
                                                    <label htmlFor="b-address">Full Address *</label>
                                                    <textarea id="b-address" name="address" rows={3} placeholder="e.g. Flat 201, Anand Nagar, Sector 15, Near Metro, Delhi" value={form.address} onChange={update} className={errors.address ? 'is-error' : ''} />
                                                    {errors.address && <span className="field-error">⚠ {errors.address}</span>}
                                                </div>

                                                <div className="field-group">
                                                    <label htmlFor="b-pincode">Pincode *</label>
                                                    <input id="b-pincode" type="text" name="pincode" placeholder="334001" maxLength={6} value={form.pincode} onChange={update} className={errors.pincode ? 'is-error' : ''} />
                                                    {errors.pincode && <span className="field-error">⚠ {errors.pincode}</span>}
                                                </div>

                                                {/* Summary */}
                                                <div className="col-full booking-summary">
                                                    <div className="bs-title">📋 Booking Summary</div>
                                                    <div className="bs-rows">
                                                        {[
                                                            ['👤 Name', form.name || '—'],
                                                            ['📞 Phone', form.phone ? `+91 ${form.phone}` : '—'],
                                                            ['🛠️ Service', form.service || '—'],
                                                            ['📅 Date', form.date || '—'],
                                                            ['⏰ Slot', form.slot || '—'],
                                                        ].map(([k, v]) => (
                                                            <div key={k} className="bs-row">
                                                                <span>{k}</span><span>{v}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Navigation */}
                                    <div className="form-nav">
                                        {step > 1 ? (
                                            <button type="button" onClick={back} className="btn btn-outline">← Back</button>
                                        ) : <div />}

                                        {step < 3 ? (
                                            <button type="button" onClick={next} className="btn btn-primary" id={`step-${step}-next`}>
                                                Continue →
                                            </button>
                                        ) : (
                                            <button type="submit" className="btn btn-primary" disabled={submitting} id="confirm-booking-btn">
                                                {submitting ? '⏳ Booking...' : '✅ Confirm Booking'}
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* ── Right Sidebar ── */}
                        <div className="booking-sidebar">
                            <div className="sidebar-trust-card">
                                <div className="stc-title">🔒 Why Trust MistriJii?</div>
                                <div className="trust-items">
                                    {trustItems.map((t, i) => (
                                        <div key={i} className="trust-item-row">
                                            <div className="ti-icon">{t.icon}</div>
                                            <div className="ti-text">
                                                <strong>{t.title}</strong>
                                                <span>{t.sub}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="sidebar-help-card">
                                <div className="shc-emoji">🤝</div>
                                <div className="shc-title">Need Help?</div>
                                <div className="shc-sub">Our support team is available 24/7 to assist you with bookings.</div>
                                <a href="tel:+919511582964" className="btn btn-ghost shc-btn">📞 Call Support</a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
};

export default BookService;
