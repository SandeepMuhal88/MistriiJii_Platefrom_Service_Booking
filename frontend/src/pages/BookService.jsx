import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../admin/components/SEOHead';
import './BookService.css';

const services = [
    'Electrician', 'AC Service', 'Mechanic', 'Plumber', 'Car Service', 'Other'
];

const BookService = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        phone: '',
        service: '',
        address: '',
        date: ''
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const update = e => {
        const { name, value } = e.target;
        setForm(p => ({ ...p, [name]: value }));
        if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
    };

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.phone || !/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit phone number';
        if (!form.service) e.service = 'Service type is required';
        if (!form.address.trim()) e.address = 'Address is required';
        if (!form.date) e.date = 'Preferred date is required';
        return e;
    };

    const submit = async e => {
        e.preventDefault();
        const e2 = validate();
        if (Object.keys(e2).length) {
            setErrors(e2);
            return;
        }
        setSubmitting(true);
        // Simulate API call
        await new Promise(r => setTimeout(r, 1000));
        setSubmitting(false);
        navigate('/booking/confirmation', { state: form });
    };

    return (
        <main className="book-service">
            <SEOHead
                title="Book Service - MistriJii"
                description="Book your home service now."
            />

            <section className="container">
                <h1>Book Service</h1>
                <form onSubmit={submit} className="booking-form">
                    <div className="form-group">
                        <label htmlFor="name">Name *</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={update}
                            className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error-msg">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number *</label>
                        <input
                            id="phone"
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={update}
                            className={errors.phone ? 'error' : ''}
                        />
                        {errors.phone && <span className="error-msg">{errors.phone}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="service">Service Type *</label>
                        <select
                            id="service"
                            name="service"
                            value={form.service}
                            onChange={update}
                            className={errors.service ? 'error' : ''}
                        >
                            <option value="">Select Service</option>
                            {services.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.service && <span className="error-msg">{errors.service}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address *</label>
                        <textarea
                            id="address"
                            name="address"
                            value={form.address}
                            onChange={update}
                            className={errors.address ? 'error' : ''}
                        />
                        {errors.address && <span className="error-msg">{errors.address}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Preferred Date *</label>
                        <input
                            id="date"
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={update}
                            min={new Date().toISOString().split('T')[0]}
                            className={errors.date ? 'error' : ''}
                        />
                        {errors.date && <span className="error-msg">{errors.date}</span>}
                    </div>

                    <button type="submit" disabled={submitting} className="submit-btn">
                        {submitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </section>
        </main>
    );
};

export default BookService;
