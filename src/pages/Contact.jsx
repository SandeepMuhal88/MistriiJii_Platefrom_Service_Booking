import { useState } from 'react';
import './Contact.css';

const contactCards = [
    { icon: '📞', title: 'Call Us', value: '+91 95115 82964', sub: 'Mon–Sun, 8 AM – 10 PM', href: 'tel:+919511582964' },
    { icon: '💬', title: 'WhatsApp', value: '+91 95115 82964', sub: 'Instant replies guaranteed', href: 'https://wa.me/919511582964' },
    { icon: '✉️', title: 'Email', value: 'support@mistrijii.in', sub: 'We reply within 24 hours', href: 'mailto:support@mistrijii.in' },
    { icon: '📍', title: 'Office', value: 'Bikaner, Rajasthan, India', sub: 'By appointment only', href: '#' },
];

const faqs = [
    'How long does it take for an expert to arrive?',
    'What are the service charges?',
    'Is there a warranty on the service done?',
    'How do I cancel or reschedule a booking?',
];

const Contact = () => {
    const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);

    const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async e => {
        e.preventDefault();
        setSending(true);
        await new Promise(r => setTimeout(r, 1500));
        setSending(false);
        setSubmitted(true);
        setForm({ name: '', phone: '', email: '', message: '' });
    };

    return (
        <main>
            {/* ── Page Hero ── */}
            <section className="page-hero">
                <div className="page-hero-blob blob-a" />
                <div className="page-hero-blob blob-b" />
                <div className="container page-hero-inner">
                    <span className="badge">📞 Contact</span>
                    <h1>Get In <span className="gradient-text">Touch</span></h1>
                    <p>Have a question, complaint, or suggestion? We're always here to help you.</p>
                </div>
            </section>

            {/* ── Contact Layout ── */}
            <section className="section">
                <div className="container">
                    <div className="contact-layout">

                        {/* ── Left: Info ── */}
                        <div>
                            <h2 className="contact-info-heading">
                                How Can We <span className="gradient-text">Help?</span>
                            </h2>
                            <p className="contact-info-sub">
                                Reach us through any of these channels — we aim to respond as fast as possible.
                            </p>

                            <div className="contact-info-cards">
                                {contactCards.map((c, i) => (
                                    <a
                                        key={i}
                                        href={c.href}
                                        className="ci-card"
                                        target={c.href.startsWith('http') ? '_blank' : undefined}
                                        rel="noreferrer"
                                        id={`contact-card-${i}`}
                                    >
                                        <div className="ci-icon-wrap">{c.icon}</div>
                                        <div className="ci-body">
                                            <div className="ci-title">{c.title}</div>
                                            <div className="ci-value">{c.value}</div>
                                            <div className="ci-sub">{c.sub}</div>
                                        </div>
                                        <div className="ci-arrow">→</div>
                                    </a>
                                ))}
                            </div>

                            {/* FAQ teaser */}
                            <div className="faq-card">
                                <h4>🙋 Frequently Asked Questions</h4>
                                <div className="faq-list">
                                    {faqs.map((q, i) => (
                                        <div key={i} className="faq-item">
                                            <span className="faq-item-dot" />
                                            {q}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── Right: Form ── */}
                        <div>
                            <div className="contact-form-card">
                                {!submitted ? (
                                    <>
                                        <h3 className="form-card-title">📝 Send a Message</h3>
                                        <p className="form-card-sub">We'll get back to you within 2 hours.</p>

                                        <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
                                            <div className="cf-group">
                                                <label htmlFor="cf-name">Full Name *</label>
                                                <input
                                                    id="cf-name"
                                                    type="text" name="name" required
                                                    placeholder="Your full name"
                                                    value={form.name} onChange={handleChange}
                                                />
                                            </div>

                                            <div className="cf-row">
                                                <div className="cf-group">
                                                    <label htmlFor="cf-phone">Mobile *</label>
                                                    <input
                                                        id="cf-phone"
                                                        type="tel" name="phone" required
                                                        placeholder="+91 9XXXXXXXXX"
                                                        value={form.phone} onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="cf-group">
                                                    <label htmlFor="cf-email">Email</label>
                                                    <input
                                                        id="cf-email"
                                                        type="email" name="email"
                                                        placeholder="email@example.com"
                                                        value={form.email} onChange={handleChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="cf-group">
                                                <label htmlFor="cf-message">Your Message *</label>
                                                <textarea
                                                    id="cf-message"
                                                    name="message" rows={5} required
                                                    placeholder="Tell us what you need..."
                                                    value={form.message} onChange={handleChange}
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="btn btn-primary cf-submit"
                                                disabled={sending}
                                                id="contact-submit-btn"
                                            >
                                                {sending ? '⏳ Sending...' : '🚀 Send Message'}
                                            </button>
                                        </form>
                                    </>
                                ) : (
                                    <div className="cf-success">
                                        <div className="cf-success-icon">🎉</div>
                                        <h3>Message Received!</h3>
                                        <p>Thank you! We'll contact you within 2 hours.</p>
                                        <button className="btn btn-outline" onClick={() => setSubmitted(false)}>
                                            Send Another
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
};

export default Contact;
