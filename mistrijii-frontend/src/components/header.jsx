import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navBase =
        "px-4 py-2 rounded-xl text-sm font-semibold transition";

    const active =
        "bg-orange-500 text-white shadow";

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
        ${scrolled
                        ? "bg-white/70 backdrop-blur-xl border-b shadow-sm"
                        : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-2xl font-black bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"
                    >
                        <img src={logo} alt="Logo" className="h-10" />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-2 relative">

                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `${navBase} ${isActive ? active : "hover:bg-gray-100 text-gray-700"}`
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `${navBase} ${isActive ? active : "hover:bg-gray-100 text-gray-700"}`
                            }
                        >
                            About
                        </NavLink>

                        {/* Services Mega Menu */}
                        <div
                            className="relative"
                            onMouseEnter={() => setServicesOpen(true)}
                            onMouseLeave={() => setServicesOpen(false)}
                        >
                            <button className={`${navBase} hover:bg-gray-100 text-gray-700`}>
                                Services ▾
                            </button>

                            {servicesOpen && (
                                <div className="absolute top-12 left-0 w-[420px] bg-white rounded-2xl shadow-xl border p-6 grid grid-cols-2 gap-4">

                                    {[
                                        "Electrician",
                                        "AC Repair",
                                        "Plumbing",
                                        "Mechanic",
                                        "Appliance Repair",
                                        "Painting"
                                    ].map((svc, i) => (
                                        <Link
                                            key={i}
                                            to="/booking"
                                            className="p-3 rounded-xl hover:bg-orange-50 transition text-sm font-semibold"
                                        >
                                            {svc}
                                        </Link>
                                    ))}

                                </div>
                            )}
                        </div>

                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                `${navBase} ${isActive ? active : "hover:bg-gray-100 text-gray-700"}`
                            }
                        >
                            Contact
                        </NavLink>

                        <NavLink
                            to="/admin"
                            className={({ isActive }) =>
                                `${navBase} ${isActive ? active : "hover:bg-gray-100 text-gray-700"} flex items-center gap-1`
                            }
                        >
                            <span>⚙️</span> Admin
                        </NavLink>

                        {/* CTA */}
                        <Link
                            to="/booking"
                            className="ml-4 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow hover:scale-[1.03] transition"
                        >
                            Book Now
                        </Link>

                    </nav>

                    {/* Mobile Button */}
                    <button
                        onClick={() => setOpen(true)}
                        className="lg:hidden text-3xl"
                    >
                        ☰
                    </button>

                </div>
            </header>

            {/* MOBILE DRAWER */}
            <div
                className={`fixed inset-0 z-50 transition ${open ? "visible" : "invisible"
                    }`}
            >
                {/* Overlay */}
                <div
                    onClick={() => setOpen(false)}
                    className={`absolute inset-0 bg-black/40 transition ${open ? "opacity-100" : "opacity-0"
                        }`}
                />

                {/* Drawer */}
                <div
                    className={`absolute right-0 top-0 h-full w-[280px] bg-white shadow-xl p-6 transition-transform duration-300 
          ${open ? "translate-x-0" : "translate-x-full"}`}
                >

                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-orange-500">Menu</h3>
                        <button onClick={() => setOpen(false)}>✕</button>
                    </div>

                    <nav className="flex flex-col gap-3">

                        <NavLink onClick={() => setOpen(false)} to="/" className="p-3 rounded hover:bg-gray-100">Home</NavLink>
                        <NavLink onClick={() => setOpen(false)} to="/about" className="p-3 rounded hover:bg-gray-100">About</NavLink>
                        <NavLink onClick={() => setOpen(false)} to="/contact" className="p-3 rounded hover:bg-gray-100">Contact</NavLink>
                        <NavLink onClick={() => setOpen(false)} to="/admin" className="p-3 rounded hover:bg-gray-100 flex items-center gap-2"><span>⚙️</span> Admin</NavLink>

                        <Link
                            to="/booking"
                            onClick={() => setOpen(false)}
                            className="mt-4 text-center px-5 py-3 bg-orange-500 text-white rounded-xl font-semibold"
                        >
                            Book Service
                        </Link>

                    </nav>

                </div>
            </div>
        </>
    );
};

export default Header;