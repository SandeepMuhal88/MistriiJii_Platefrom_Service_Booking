import { useLocation, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import './Confirmation.css';

const nextSteps = [
    { title: 'Booking Confirmed', sub: 'You will receive a confirmation SMS on your mobile shortly.' },
    { title: 'Expert Assigned', sub: 'A nearby verified technician will be assigned within 15 minutes.' },
    { title: 'Expert on the Way', sub: 'You will receive a call before your expert departs.' },
    { title: 'Service Done & Reviewed', sub: 'Rate your experience after service — your feedback matters.' },
];

const Confirmation = () => {
    const { state: form } = useLocation();

    // Generate a booking ID
    const bookingId = `MJ-${Date.now().toString().slice(-6)}`;

    const summaryRows = form ? [
        ['Service', form.service],
        ['Date', form.date],
        ['Time Slot', form.slot],
        ['Name', form.name],
        ['Mobile', form.phone ? `+91 ${form.phone}` : '—'],
        ['Address', form.address ? `${form.address}${form.pincode ? `, ${form.pincode}` : ''}` : '—'],
    ].filter(([, v]) => v) : [];

    return (
        <div className="confirmation-page">
            <SEOHead
                title="Booking Confirmed | MistriJii"
                description="Your MistriJii home service booking is confirmed."
                noindex={true}
            />

            <div className="conf-card">
                <div className="conf-success-icon" aria-hidden="true">✅</div>

                <h1>
                    Booking <span className="gradient-text">Confirmed!</span>
                </h1>
                <p>
                    Your service has been successfully booked. Our team will contact you shortly with expert details.
                </p>

                <div className="conf-booking-id">
                    🎫 Booking ID: {bookingId}
                </div>

                {/* Summary */}
                {summaryRows.length > 0 && (
                    <div className="conf-summary">
                        <div className="cs-heading">📋 Your Booking Details</div>
                        <div className="cs-rows">
                            {summaryRows.map(([key, val]) => (
                                <div key={key} className="cs-row">
                                    <span className="cs-row-key">{key}</span>
                                    <span className="cs-row-val">{val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Next Steps */}
                <ul className="conf-next-steps" aria-label="What happens next">
                    {nextSteps.map((s, i) => (
                        <li key={i} className="conf-next-step">
                            <div className="cns-num">{i + 1}</div>
                            <div className="cns-text">
                                <strong>{s.title}</strong>
                                <span>{s.sub}</span>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Actions */}
                <div className="conf-actions">
                    <Link to="/" className="btn btn-primary" id="conf-home-btn">
                        🏠 Back to Home
                    </Link>
                    <a href="https://wa.me/919511582964" target="_blank" rel="noreferrer" className="btn btn-outline" id="conf-whatsapp-btn">
                        💬 WhatsApp Us
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
