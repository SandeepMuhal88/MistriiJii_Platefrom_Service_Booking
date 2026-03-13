import React, { useState } from 'react';
import { useBookings } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../context/SEOHead';

const Booking = () => {
    const { addBooking } = useBookings();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        service: '',
        name: '',
        phone: '',
        address: '',
        date: '',
        time: '',
        notes: ''
    });

    const services = [
        { id: 'electrician', name: 'Electrician', icon: '⚡', desc: 'Wiring, fixtures, repairs' },
        { id: 'ac', name: 'AC Service', icon: '❄️', desc: 'Installation & maintenance' },
        { id: 'plumber', name: 'Plumber', icon: '🔧', desc: 'Pipes, leaks, fittings' },
        { id: 'mechanic', name: 'Mechanic', icon: '🚗', desc: 'Car & bike services' },
        { id: 'appliance', name: 'Appliance Repair', icon: '📺', desc: 'Washing machines, fridges' },
        { id: 'cleaning', name: 'Deep Cleaning', icon: '🧹', desc: 'Home & office cleaning' }
    ];

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Save using Context
        addBooking(formData);
        
        // Move to success step
        setStep(3);
    };

    return (
        <main className="min-h-[85vh] bg-gray-50 flex items-center justify-center py-20 px-6">
            <SEOHead 
                title="Book a Service" 
                description="Easily book home services including electricians, plumbers, and mechanics with MistriJii."
            />
            
            <div className="w-full max-w-3xl bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
                
                {/* Visual Sidebar */}
                <div className="md:w-[35%] bg-gradient-to-br from-orange-500 to-red-500 text-white p-10 flex flex-col justify-between hidden md:flex">
                    <div>
                        <h2 className="text-3xl font-black leading-tight mb-4">You're in good hands.</h2>
                        <p className="text-white/80 text-sm">MistriJii provides verified and expert professionals to fix your problems instantly.</p>
                    </div>

                    <div className="space-y-6 text-sm font-medium">
                        <div className={`flex items-center gap-3 ${step >= 1 ? 'opacity-100' : 'opacity-40'}`}>
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">1</div>
                            Choose Service
                        </div>
                        <div className={`flex items-center gap-3 ${step >= 2 ? 'opacity-100' : 'opacity-40'}`}>
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">2</div>
                            Your Details
                        </div>
                        <div className={`flex items-center gap-3 ${step === 3 ? 'opacity-100' : 'opacity-40'}`}>
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">3</div>
                            Confirmation
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="flex-1 p-8 md:p-12">
                    
                    {/* STEP 1: SERVICE SELECTION */}
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">What do you need help with?</h3>
                            <p className="text-gray-500 text-sm mb-8">Select a service to view availability.</p>

                            <div className="grid grid-cols-2 gap-4">
                                {services.map(s => (
                                    <button
                                        key={s.id}
                                        onClick={() => setFormData({ ...formData, service: s.name })}
                                        className={`p-4 rounded-xl border text-left transition-all ${
                                            formData.service === s.name 
                                            ? 'border-orange-500 bg-orange-50/50 shadow-sm ring-1 ring-orange-500' 
                                            : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="text-2xl mb-2">{s.icon}</div>
                                        <h4 className="font-semibold text-gray-800 text-sm">{s.name}</h4>
                                        <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button 
                                    onClick={handleNext}
                                    disabled={!formData.service}
                                    className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-orange-500 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                                >
                                    Continue →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: USER DETAILS */}
                    {step === 2 && (
                        <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">When and where?</h3>
                            <p className="text-gray-500 text-sm mb-8">Selected: <span className="font-semibold text-orange-500">{formData.service}</span></p>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Full Name</label>
                                        <input 
                                            required
                                            type="text" 
                                            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                            placeholder="Sandeep Singh"
                                            value={formData.name}
                                            onChange={e => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Phone</label>
                                        <input 
                                            required
                                            type="tel" 
                                            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                            placeholder="+91 98765 43210"
                                            value={formData.phone}
                                            onChange={e => setFormData({...formData, phone: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Service Address</label>
                                    <textarea 
                                        required
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition resize-none h-24"
                                        placeholder="House number, street, landmark, city"
                                        value={formData.address}
                                        onChange={e => setFormData({...formData, address: e.target.value})}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Preferred Date</label>
                                        <input 
                                            required
                                            type="date" 
                                            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                                            value={formData.date}
                                            onChange={e => setFormData({...formData, date: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Time Slot</label>
                                        <select 
                                            required
                                            className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition bg-white"
                                            value={formData.time}
                                            onChange={e => setFormData({...formData, time: e.target.value})}
                                        >
                                            <option value="">Select a time</option>
                                            <option value="09:00 AM - 12:00 PM">Morning (9AM - 12PM)</option>
                                            <option value="12:00 PM - 03:00 PM">Afternoon (12PM - 3PM)</option>
                                            <option value="03:00 PM - 06:00 PM">Evening (3PM - 6PM)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-between">
                                <button 
                                    type="button"
                                    onClick={handleBack}
                                    className="px-6 py-3 text-gray-500 font-semibold hover:text-gray-900 transition"
                                >
                                    ← Back
                                </button>
                                <button 
                                    type="submit"
                                    className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-500/30"
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </form>
                    )}

                    {/* STEP 3: SUCCESS */}
                    {step === 3 && (
                        <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                                ✓
                            </div>
                            <h3 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h3>
                            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                                Thank you, <span className="font-semibold text-gray-700">{formData.name}</span>. Your request for <span className="font-semibold text-gray-700">{formData.service}</span> has been received. Our professional will contact you soon.
                            </p>

                            <div className="flex justify-center gap-4">
                                <button 
                                    onClick={() => navigate('/')}
                                    className="px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
                                >
                                    Back to Home
                                </button>
                                <button 
                                    onClick={() => {
                                        setFormData({ service: '', name: '', phone: '', address: '', date: '', time: '', notes: '' });
                                        setStep(1);
                                    }}
                                    className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition"
                                >
                                    Book Another
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </main>
    );
};

export default Booking;
