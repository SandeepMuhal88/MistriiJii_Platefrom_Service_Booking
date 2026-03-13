import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SERVICES = ["Electrician", "AC Service", "Plumber", "Mechanic", "Appliance Repair", "Deep Cleaning"];
const COMPANY  = [
  { label: "About Us",     to: "/about" },
  { label: "Contact",      to: "/contact" },
  { label: "Book Service", to: "/booking" },
  { label: "Privacy Policy",  to: "#" },
  { label: "Terms & Conditions", to: "#" },
];

const SOCIALS = [
  { icon: "📸", label: "Instagram", hoverColor: "#ec4899" },
  { icon: "🐦", label: "Twitter",   hoverColor: "#38bdf8" },
  { icon: "💼", label: "LinkedIn",  hoverColor: "#60a5fa" },
];

const Footer = () => (
  <footer style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--bg-border)", color: "var(--text-3)" }}>
    <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">

      {/* Brand */}
      <div>
        <h2 className="text-2xl font-black text-gradient mb-3">MistriJii</h2>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-3)" }}>
          India's trusted on-demand home service platform. Verified professionals delivered to your doorstep within minutes.
        </p>
        <div className="flex gap-3">
          {SOCIALS.map((s, i) => (
            <motion.a
              key={i}
              href="#"
              aria-label={s.label}
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--bg-border)" }}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>
      </div>

      {/* Services */}
      <div>
        <h3 className="font-bold text-sm uppercase tracking-widest mb-5" style={{ color: "var(--text-1)" }}>Services</h3>
        <ul className="space-y-3 text-sm">
          {SERVICES.map((s, i) => (
            <li key={i}>
              <Link to="/booking" className="transition-colors duration-200 hover:text-orange-400" style={{ color: "var(--text-3)" }}>
                {s}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Company */}
      <div>
        <h3 className="font-bold text-sm uppercase tracking-widest mb-5" style={{ color: "var(--text-1)" }}>Company</h3>
        <ul className="space-y-3 text-sm">
          {COMPANY.map((c, i) => (
            <li key={i}>
              <Link to={c.to} className="transition-colors duration-200 hover:text-orange-400" style={{ color: "var(--text-3)" }}>
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="font-bold text-sm uppercase tracking-widest mb-5" style={{ color: "var(--text-1)" }}>Get in Touch</h3>
        <div className="space-y-3 text-sm mb-6" style={{ color: "var(--text-3)" }}>
          <p>📞 +91-95115-82964</p>
          <p>📍 Rajasthan, India</p>
          <p>✉️ support@mistrijii.in</p>
        </div>
        <Link to="/booking" className="btn-primary !py-2.5 !px-5 !text-sm">
          Book Service →
        </Link>
      </div>
    </div>

    {/* Bottom */}
    <div style={{ borderTop: "1px solid var(--bg-border)" }} className="py-5 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs" style={{ color: "var(--text-4)" }}>
        <span>© {new Date().getFullYear()} MistriJii Technologies Pvt. Ltd. All rights reserved.</span>
        <span>Made with ❤️ in India 🇮🇳</span>
      </div>
    </div>
  </footer>
);

export default Footer;