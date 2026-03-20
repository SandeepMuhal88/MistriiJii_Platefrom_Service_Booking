import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../theme/ThemeContext";

const SERVICES_MENU = [
  { icon: "⚡", label: "Electrician",     sub: "Wiring & repairs" },
  { icon: "❄️", label: "AC Service",      sub: "Install & service" },
  { icon: "🔧", label: "Plumber",         sub: "Pipes & leaks" },
  { icon: "🚗", label: "Vehicle Service", sub: "Car & bike" },
  { icon: "📺", label: "Appliance Repair",sub: "All appliances" },
  { icon: "🏠", label: "Deep Cleaning",   sub: "Home & office" },
];

/* ── Theme Toggle ─────────────────────────────────────────── */
const ThemeToggle = () => {
  const { isDark, toggle } = useTheme();
  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="relative w-14 h-7 rounded-full flex items-center px-1 transition-colors duration-300 shrink-0"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #1a1c20, #2a2c32)"
          : "linear-gradient(135deg, #fef3c7, #fed7aa)",
        border: "1px solid var(--bg-border)",
        boxShadow: isDark ? "inset 0 0 8px rgba(0,0,0,0.4)" : "inset 0 0 8px rgba(0,0,0,0.08)",
      }}
    >
      {/* Track icons */}
      <span className="absolute left-1.5 text-[10px]">🌙</span>
      <span className="absolute right-1.5 text-[10px]">☀️</span>

      {/* Thumb */}
      <motion.div
        animate={{ x: isDark ? 0 : 28 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="w-5 h-5 rounded-full shadow-md z-10"
        style={{
          background: isDark
            ? "linear-gradient(135deg, #818cf8, #6366f1)"
            : "linear-gradient(135deg, #f97316, #fbbf24)",
        }}
      />
    </motion.button>
  );
};

/* ── Header ───────────────────────────────────────────────── */
const Header = () => {
  const [open, setOpen]                 = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLink = ({ isActive }) => `
    relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200
    ${isActive
      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
      : "hover:bg-[var(--bg-hover)]"
    }
  `;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "var(--nav-bg)" : "transparent",
          borderBottom: scrolled ? `1px solid var(--nav-border)` : "1px solid transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          boxShadow: scrolled ? "0 1px 40px rgba(0,0,0,0.08)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center gap-6">

          {/* Logo */}
          <Link to="/" className="shrink-0 mr-4 flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="relative"
            >
              <div
                className="absolute inset-0 rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, #f97316, #fb923c)" }}
              />
              <img
                src={logo}
                alt="MistriJii"
                className="relative h-12 w-12 object-contain rounded-xl"
                style={{
                  filter: "drop-shadow(0 2px 8px rgba(249,115,22,0.35))",
                }}
              />
            </motion.div>
            <div className="hidden sm:flex flex-col leading-none">
              <span
                className="text-xl font-extrabold tracking-tight"
                style={{
                  background: "linear-gradient(135deg, #f97316 0%, #fb923c 50%, #ea580c 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "-0.5px",
                }}
              >
                MistriJii
              </span>
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.18em] mt-0.5"
                style={{ color: "var(--text-4)" }}
              >
                Service On Demand
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            <NavLink to="/" end
              className={({ isActive }) => `relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25" : "hover:bg-[var(--bg-hover)]"}`}
              style={({ isActive }) => ({ color: isActive ? "#fff" : "var(--text-2)" })}
            >
              Home
            </NavLink>

            <NavLink to="/about"
              className={({ isActive }) => `px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive ? "bg-orange-500 text-white shadow-lg" : "hover:bg-[var(--bg-hover)]"}`}
              style={({ isActive }) => ({ color: isActive ? "#fff" : "var(--text-2)" })}
            >
              About
            </NavLink>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-[var(--bg-hover)]"
                style={{ color: "var(--text-2)" }}
              >
                Services
                <motion.span
                  animate={{ rotate: servicesOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[10px] opacity-60"
                >
                  ▼
                </motion.span>
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.16 }}
                    className="absolute top-[calc(100%+10px)] left-0 w-[420px] rounded-2xl p-3 grid grid-cols-2 gap-1 z-50 shadow-2xl"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--bg-border)",
                    }}
                  >
                    {SERVICES_MENU.map((s, i) => (
                      <Link
                        key={i}
                        to="/booking"
                        className="flex items-center gap-3 p-3 rounded-xl transition-colors group"
                        style={{ color: "var(--text-2)" }}
                        onMouseEnter={e => e.currentTarget.style.background = "var(--bg-elevated)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <span className="text-xl w-8 text-center">{s.icon}</span>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>{s.label}</p>
                          <p className="text-xs" style={{ color: "var(--text-3)" }}>{s.sub}</p>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/contact"
              className={({ isActive }) => `px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive ? "bg-orange-500 text-white shadow-lg" : "hover:bg-[var(--bg-hover)]"}`}
              style={({ isActive }) => ({ color: isActive ? "#fff" : "var(--text-2)" })}
            >
              Contact
            </NavLink>

            <NavLink to="/admin"
              className={({ isActive }) => `px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive ? "bg-orange-500 text-white shadow-lg" : "hover:bg-[var(--bg-hover)]"}`}
              style={({ isActive }) => ({ color: isActive ? "#fff" : "var(--text-2)" })}
            >
              ⚙️ Admin
            </NavLink>
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3 ml-auto">
            <ThemeToggle />
            <Link
              to="/booking"
              className="btn-primary !py-2.5 !px-5 !text-sm"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="lg:hidden ml-auto flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setOpen(true)}
              className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl transition"
              style={{ color: "var(--text-1)" }}
            >
              <span className="w-5 h-0.5 bg-current rounded-full" />
              <span className="w-5 h-0.5 bg-current rounded-full" />
              <span className="w-3.5 h-0.5 bg-current rounded-full self-start ml-0.5" />
            </button>
          </div>

        </div>
      </header>

      {/* ── Mobile Drawer ──────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60]"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            />
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[300px] flex flex-col p-6"
              style={{ background: "var(--bg-card)", borderLeft: "1px solid var(--bg-border)" }}
            >
              <div className="flex items-center justify-between mb-8">
                <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
                  <img
                    src={logo}
                    alt="MistriJii"
                    className="h-11 w-11 object-contain rounded-xl"
                    style={{ filter: "drop-shadow(0 2px 8px rgba(249,115,22,0.4))" }}
                  />
                  <div className="flex flex-col leading-none">
                    <span
                      className="text-lg font-extrabold tracking-tight"
                      style={{
                        background: "linear-gradient(135deg, #f97316, #ea580c)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      MistriJii
                    </span>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.15em] mt-0.5" style={{ color: "var(--text-4)" }}>
                      Service On Demand
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm transition"
                  style={{ background: "var(--bg-elevated)", color: "var(--text-2)" }}
                >
                  ✕
                </button>
              </div>

              <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
                {[
                  { to: "/",        label: "Home",    end: true },
                  { to: "/about",   label: "About" },
                  { to: "/contact", label: "Contact" },
                  { to: "/admin",   label: "⚙️ Admin" },
                ].map(({ to, label, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl text-sm font-semibold transition ${
                        isActive ? "bg-orange-500 text-white" : ""
                      }`
                    }
                    style={({ isActive }) => ({ color: isActive ? "#fff" : "var(--text-2)" })}
                  >
                    {label}
                  </NavLink>
                ))}

                <p className="px-4 mt-5 mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-4)" }}>
                  Services
                </p>
                {SERVICES_MENU.map((s, i) => (
                  <Link
                    key={i}
                    to="/booking"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition"
                    style={{ color: "var(--text-2)" }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--bg-elevated)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <span>{s.icon}</span>
                    <span className="font-medium">{s.label}</span>
                  </Link>
                ))}
              </nav>

              <Link
                to="/booking"
                onClick={() => setOpen(false)}
                className="btn-primary mt-6 justify-center w-full"
              >
                Book a Service
              </Link>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;