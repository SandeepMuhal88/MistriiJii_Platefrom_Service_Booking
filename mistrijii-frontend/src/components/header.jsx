import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";

const Header = () => {
    const [open, setOpen] = useState(false);

    const navClass =
        "px-4 py-2 rounded-lg text-sm font-semibold transition";

    const activeClass = "bg-orange-500 text-white";

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur border-b">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="text-2xl font-black text-orange-500">
                    <img src={logo} alt="Logo" className="h-10" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-2">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `${navClass} ${isActive ? activeClass : "text-gray-700 hover:bg-gray-100"}`
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `${navClass} ${isActive ? activeClass : "text-gray-700 hover:bg-gray-100"}`
                        }
                    >
                        About
                    </NavLink>

                    <NavLink
                        to="/booking"
                        className={({ isActive }) =>
                            `${navClass} ${isActive ? activeClass : "text-gray-700 hover:bg-gray-100"}`
                        }
                    >
                        Booking
                    </NavLink>

                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            `${navClass} ${isActive ? activeClass : "text-gray-700 hover:bg-gray-100"}`
                        }
                    >
                        Contact
                    </NavLink>

                    <Link
                        to="/booking"
                        className="ml-4 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold shadow"
                    >
                        Book Now
                    </Link>

                </nav>

                {/* Mobile Button */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>

            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-white border-t">
                    <div className="flex flex-col p-4 gap-2">

                        <NavLink to="/" className="p-3 rounded hover:bg-gray-100">Home</NavLink>
                        <NavLink to="/about" className="p-3 rounded hover:bg-gray-100">About</NavLink>
                        <NavLink to="/booking" className="p-3 rounded hover:bg-gray-100">Booking</NavLink>
                        <NavLink to="/contact" className="p-3 rounded hover:bg-gray-100">Contact</NavLink>

                        <Link
                            to="/booking"
                            className="mt-2 text-center px-5 py-3 bg-orange-500 text-white rounded-lg font-semibold"
                        >
                            Book Service
                        </Link>

                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;