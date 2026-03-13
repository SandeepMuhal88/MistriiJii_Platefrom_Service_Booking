import React from 'react';
import SEOHead from '../context/SEOHead';

const Contact = () => {
    return (
        <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-20 px-6">
            <SEOHead 
                title="Contact Us" 
                description="Get in touch with MistriJii customer support."
            />
            
            <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom flex-col flex items-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-3xl mb-4 shadow-sm border border-orange-200">📞</div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 tracking-tight">Let's talk.</h1>
                <p className="text-lg text-gray-500 max-w-md">Our expert support team is always ready to resolve your issues and answer your questions.</p>
            </div>

            <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8">
                
                {/* Contact Forms */}
                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-left duration-500">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h3>
                    
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">First Name</label>
                                <input type="text" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" placeholder="John" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Last Name</label>
                                <input type="text" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" placeholder="Doe" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Email Address</label>
                            <input type="email" className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition" placeholder="john@example.com" />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Message</label>
                            <textarea className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition resize-none h-32" placeholder="How can we help you?"></textarea>
                        </div>

                        <button type="button" className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-orange-500 transition shadow-lg mt-4">
                            Send Message →
                        </button>
                    </form>
                </div>

                {/* Contact Information */}
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right duration-500 delay-100">
                    
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-[2rem] p-10 flex-1 shadow-lg shadow-orange-500/20">
                        <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">📍</div>
                                <div>
                                    <h4 className="font-semibold mb-1 shadow-black/10 text-[1.1rem]">Headquarters</h4>
                                    <p className="text-white/80 text-sm leading-relaxed">123 Service Hub, Tech Park<br/>New Delhi, India 110001</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">✉️</div>
                                <div>
                                    <h4 className="font-semibold mb-1 shadow-black/10 text-[1.1rem]">Email Us</h4>
                                    <p className="text-white/80 text-sm leading-relaxed">support@mistrijii.in<br/>partners@mistrijii.in</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">📱</div>
                                <div>
                                    <h4 className="font-semibold mb-1 shadow-black/10 text-[1.1rem]">Call Us</h4>
                                    <p className="text-white/80 text-sm leading-relaxed">+91 95115 82964<br/>Mon-Sat: 9AM - 8PM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hidden md:block">
                        <h4 className="font-bold text-gray-800 mb-2">Follow Us</h4>
                        <div className="flex gap-4 mt-4 text-2xl">
                            <a href="#" className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center hover:bg-orange-50 hover:text-orange-500 transition">📸</a>
                            <a href="#" className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center hover:bg-blue-50 hover:text-blue-500 transition">🐦</a>
                            <a href="#" className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center hover:bg-blue-50 hover:text-blue-700 transition">💼</a>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    );
};

export default Contact;