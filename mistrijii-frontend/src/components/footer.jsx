import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-gray-400 mt-24">

            {/* Top Grid */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">

                {/* Brand */}
                <div>
                    <h2 className="text-3xl font-black bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-4">
                        MistriJii
                    </h2>

                    <p className="text-sm leading-relaxed mb-6">
                        India’s trusted on-demand home service platform. Book verified electricians,
                        plumbers, AC technicians & mechanics at your doorstep.
                    </p>

                    <div className="flex gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition cursor-pointer">
                            👍
                        </div>
                        <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition cursor-pointer">
                            📸
                        </div>
                        <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition cursor-pointer">
                            🐦
                        </div>
                    </div>
                </div>

                {/* Services */}
                <div>
                    <h3 className="text-white font-semibold mb-5">Services</h3>

                    <ul className="space-y-3 text-sm">
                        <li className="hover:text-orange-500 transition cursor-pointer">Electrician</li>
                        <li className="hover:text-orange-500 transition cursor-pointer">AC Repair</li>
                        <li className="hover:text-orange-500 transition cursor-pointer">Plumbing</li>
                        <li className="hover:text-orange-500 transition cursor-pointer">Mechanic</li>
                        <li className="hover:text-orange-500 transition cursor-pointer">Appliance Repair</li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h3 className="text-white font-semibold mb-5">Company</h3>

                    <ul className="space-y-3 text-sm">
                        <li>
                            <Link to="/about" className="hover:text-orange-500 transition">About Us</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-orange-500 transition">Contact</Link>
                        </li>
                        <li>
                            <Link to="/booking" className="hover:text-orange-500 transition">Book Service</Link>
                        </li>
                        <li className="hover:text-orange-500 transition cursor-pointer">Privacy Policy</li>
                        <li className="hover:text-orange-500 transition cursor-pointer">Terms & Conditions</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-semibold mb-5">Get in Touch</h3>

                    <div className="space-y-3 text-sm">
                        <p>📞 +91-9511582964</p>
                        <p>📍 Rajasthan, India</p>
                        <p>✉️ support@mistrijii.in</p>
                    </div>

                    {/* CTA */}
                    <Link
                        to="/booking"
                        className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold shadow hover:scale-[1.04] transition"
                    >
                        Book Service
                    </Link>
                </div>

            </div>

            {/* Bottom */}
            <div className="border-t border-gray-800 py-6 text-center text-sm">
                © {new Date().getFullYear()} MistriJii. All Rights Reserved.
            </div>

        </footer>
    );
};

export default Footer;