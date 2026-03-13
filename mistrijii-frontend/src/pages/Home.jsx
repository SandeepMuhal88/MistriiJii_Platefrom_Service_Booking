import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import SEOHead from "../context/SEOHead.jsx";
import { stagger, fadeUp, sectionReveal, scaleIn, slideLeft, slideRight } from "../animations/motion";

/* ─── Static Data ─────────────────────────────────────────── */
const SERVICES = [
  { icon: "⚡", title: "Electrician",      desc: "Wiring, circuit breakers, fixtures & installations", color: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
  { icon: "❄️", title: "AC Service",       desc: "Deep cleaning, gas refill & compressor repair",       color: "#06b6d4", bg: "rgba(6,182,212,0.08)"  },
  { icon: "🔧", title: "Plumber",          desc: "Pipe leaks, blockage & all plumbing solutions",       color: "#a78bfa", bg: "rgba(167,139,250,0.08)" },
  { icon: "🚗", title: "Vehicle Service",  desc: "Doorstep car & bike maintenance & repair",            color: "#10b981", bg: "rgba(16,185,129,0.08)"  },
  { icon: "📺", title: "Appliance Repair", desc: "Washing machine, fridge, microwave & more",           color: "#fb923c", bg: "rgba(251,146,60,0.08)"  },
  { icon: "🏠", title: "Deep Cleaning",    desc: "Full home, kitchen & bathroom deep clean",            color: "#818cf8", bg: "rgba(129,140,248,0.08)" },
];

const STATS = [
  { value: "10K+",  label: "Happy Customers",   icon: "👥" },
  { value: "500+",  label: "Verified Experts",  icon: "🛡️" },
  { value: "20+",   label: "Cities Covered",    icon: "📍" },
  { value: "4.9★",  label: "Average Rating",    icon: "⭐" },
];

const STEPS = [
  { step: "01", icon: "📱", title: "Choose a Service",    desc: "Browse 20+ expert services and select what you need." },
  { step: "02", icon: "📅", title: "Schedule Instantly",  desc: "Pick your preferred date, time and location." },
  { step: "03", icon: "🏠", title: "Expert at Your Door", desc: "Your verified professional arrives right on time." },
];

const REVIEWS = [
  { name: "Ravi Sharma",  city: "Jaipur",  stars: 5, text: "Electrician arrived in 40 mins. Fixed the entire wiring issue and explained everything. Absolutely professional!" },
  { name: "Priya Gupta",  city: "Delhi",   stars: 5, text: "AC was not cooling for weeks. The technician diagnosed and fixed it in under an hour. Great service at fair price." },
  { name: "Amit Verma",   city: "Mumbai",  stars: 5, text: "Booked a plumber at 8 PM — he arrived by 9 PM and resolved the pipe leak completely. Highly recommended!" },
  { name: "Sunita Rao",   city: "Pune",    stars: 5, text: "Deep cleaning was absolutely top-notch. Every corner was spotless. Will book again next month!" },
];

const BRANDS = ["⚡ Verified Experts", "🕐 Same-Day Booking", "🛡️ Service Guarantee", "💰 Transparent Pricing", "📍 20+ Cities", "⭐ 4.9 Rating"];

/* ─── Sub-components ──────────────────────────────────────── */

const Badge = ({ children }) => (
  <span className="badge-orange">{children}</span>
);

const ServiceCard = ({ s, i }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
    className="group relative rounded-3xl p-px overflow-hidden cursor-pointer"
  >
    {/* gradient border on hover */}
    <div
      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{ background: `linear-gradient(135deg, ${s.color}60, transparent 60%)` }}
    />
    <div
      className="relative rounded-[calc(1.5rem-1px)] p-7 h-full flex flex-col gap-5 card"
    >
      {/* icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
        style={{ background: s.bg, border: `1px solid ${s.color}30` }}
      >
        {s.icon}
      </div>

      <div className="flex-1">
        <h3 className="font-bold text-lg mb-2" style={{ color: "var(--text-1)" }}>{s.title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{s.desc}</p>
      </div>

      <Link
        to="/booking"
        className="inline-flex items-center gap-1.5 text-sm font-bold transition-all duration-200 group-hover:gap-2.5"
        style={{ color: s.color }}
      >
        Book Now
        <motion.span
          className="inline-block"
          initial={{ x: 0 }}
          whileHover={{ x: 3 }}
        >
          →
        </motion.span>
      </Link>
    </div>
  </motion.div>
);

const StarRow = ({ n }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: n }).map((_, i) => (
      <span key={i} className="text-yellow-400 text-sm">★</span>
    ))}
  </div>
);

/* ─── Page ────────────────────────────────────────────────── */
const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY    = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpac = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [activeReview, setActiveReview] = useState(0);

  return (
    <div style={{ background: "var(--bg-base)", color: "var(--text-1)" }} className="min-h-screen overflow-x-hidden">
      <SEOHead
        title="MistriJii — Demand Your Service Now"
        description="Book verified home service professionals — electricians, AC technicians, plumbers & more at your doorstep within 45 minutes."
      />

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Background layers */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
          {/* dot grid */}
          <div className="dot-grid absolute inset-0 opacity-40" />

          {/* radial gradient center */}
          <div className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, var(--orange-glow), transparent)" }} />

          {/* top-right orange blob */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="glow-orb w-[700px] h-[700px] bg-orange-500 opacity-20"
            style={{ top: "-20%", right: "-10%" }}
          />
          {/* bottom-left violet blob */}
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.18, 0.1] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            className="glow-orb w-[600px] h-[600px] bg-violet-600 opacity-15"
            style={{ bottom: "-15%", left: "-8%" }}
          />
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpac }}
          className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 text-center flex flex-col items-center gap-7"
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center gap-7"
          >
            {/* Floating trust pill */}
            <motion.div
              variants={scaleIn}
              className="card flex items-center gap-3 px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
              <span style={{ color: "var(--text-2)" }}>
                🇮🇳 Trusted by <strong style={{ color: "var(--text-1)" }}>10,000+</strong> households across India
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight"
            >
              Your Home.{" "}
              <br className="hidden sm:block" />
              <span className="relative inline-block">
                <span className="text-gradient">Fixed Fast.</span>
                <motion.svg
                  viewBox="0 0 300 12"
                  className="absolute -bottom-3 left-0 w-full"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  <motion.path
                    d="M 0 6 Q 75 0 150 6 Q 225 12 300 6"
                    stroke="url(#lineGrad)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#fbbf24" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              className="max-w-2xl text-lg md:text-xl leading-relaxed"
              style={{ color: "var(--text-2)" }}
            >
              Book verified electricians, AC technicians, plumbers, mechanics &amp; more — at your doorstep in{" "}
              <span className="font-bold" style={{ color: "var(--orange)" }}>under 45 minutes</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <Link to="/booking" className="btn-primary text-lg px-10 py-5">
                Book a Service — Free
                <span className="ml-1">→</span>
              </Link>
              <Link to="/about" className="btn-ghost text-lg px-10 py-5">
                How It Works
              </Link>
            </motion.div>

            {/* Social proof row */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm"
              style={{ color: "var(--text-3)" }}
            >
              <span>✅ No booking fee</span>
              <span className="hidden sm:inline" style={{ color: "var(--text-4)" }}>•</span>
              <span>⚡ 45-min response</span>
              <span className="hidden sm:inline" style={{ color: "var(--text-4)" }}>•</span>
              <span>🛡️ 100% satisfaction guarantee</span>
            </motion.div>
          </motion.div>

          {/* ── Floating Activity Cards ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="absolute left-6 bottom-24 hidden xl:flex card items-center gap-3 px-4 py-3 shadow-xl"
          >
            <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-sm">✓</div>
            <div>
              <p className="text-xs font-bold" style={{ color: "var(--text-1)" }}>Ravi booked Electrician</p>
              <p className="text-xs" style={{ color: "var(--text-3)" }}>3 min ago · Jaipur</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="absolute right-6 bottom-24 hidden xl:flex card items-center gap-3 px-4 py-3 shadow-xl"
          >
            <span className="text-2xl">⭐</span>
            <div>
              <p className="text-xs font-bold" style={{ color: "var(--text-1)" }}>4.9 / 5.0 Rating</p>
              <p className="text-xs" style={{ color: "var(--text-3)" }}>10,000+ verified reviews</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border-2 rounded-full flex items-start justify-center pt-1.5"
            style={{ borderColor: "var(--text-4)" }}
          >
            <div className="w-1 h-2 rounded-full" style={{ background: "var(--orange)" }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MARQUEE TRUST BAR
      ══════════════════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden py-4 border-y"
        style={{ background: "var(--bg-surface)", borderColor: "var(--bg-border)" }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span key={i} className="text-sm font-semibold px-2" style={{ color: "var(--text-3)" }}>
              {b}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════
          STATS
      ══════════════════════════════════════════════════════ */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="py-20 px-6"
      >
        <motion.div
          variants={stagger}
          className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              whileHover={{ y: -4 }}
              className="card p-8 text-center"
            >
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className="text-3xl md:text-4xl font-black text-gradient mb-1">{s.value}</div>
              <div className="text-sm font-medium" style={{ color: "var(--text-3)" }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════════════ */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="py-24 px-6"
        style={{ background: "var(--bg-surface)" }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div variants={stagger} className="flex flex-col items-center text-center gap-5 mb-16">
            <motion.div variants={fadeUp}><Badge>Our Services</Badge></motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              Everything Your Home{" "}
              <span className="text-gradient">Needs</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="max-w-xl text-lg leading-relaxed"
              style={{ color: "var(--text-2)" }}
            >
              From small fixes to complete overhauls — browse expert services delivered at your convenience.
            </motion.p>
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {SERVICES.map((s, i) => <ServiceCard key={i} s={s} i={i} />)}
          </motion.div>

          {/* CTA below grid */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link to="/booking" className="btn-primary text-base px-8 py-4">
              View All Services →
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════ */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="py-28 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={stagger} className="flex flex-col items-center text-center gap-5 mb-20">
            <motion.div variants={fadeUp}><Badge>How It Works</Badge></motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              3 Steps.{" "}
              <span className="text-gradient">Done.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid lg:grid-cols-3 gap-10 relative"
          >
            {/* Connector */}
            <div className="hidden lg:block absolute top-16 left-[calc(33.3%+1rem)] right-[calc(33.3%+1rem)] h-px"
              style={{ background: "linear-gradient(90deg, transparent, var(--bg-border), transparent)" }} />

            {STEPS.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="card p-10 text-center relative"
              >
                {/* Step number badge */}
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full text-xs font-black flex items-center justify-center"
                  style={{ background: "var(--orange)", color: "#fff" }}
                >
                  {s.step}
                </div>
                <div className="text-5xl mb-6">{s.icon}</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text-1)" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════
          SPLIT FEATURE SECTION
      ══════════════════════════════════════════════════════ */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="py-28 px-6"
        style={{ background: "var(--bg-surface)" }}
      >
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div variants={slideLeft} className="flex flex-col gap-7">
            <Badge>Why MistriJii?</Badge>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Professional Quality.{" "}
              <span className="text-gradient">Guaranteed.</span>
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-2)" }}>
              We don't just connect you with technicians — we connect you with
              background-verified, trained, and rated professionals who treat your
              home like their own.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { icon: "🛡️", title: "Background Verified",     desc: "Every expert is ID-verified and police-checked." },
                { icon: "⭐", title: "Rating System",            desc: "Transparent reviews after every job." },
                { icon: "💰", title: "Zero Hidden Charges",      desc: "Pay what you see — no surprise fees." },
                { icon: "🔁", title: "Free Re-service",         desc: "Not satisfied? We fix it free." },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-4 p-4 rounded-2xl"
                  style={{ background: "var(--bg-hover)" }}
                >
                  <div className="text-2xl mt-0.5">{f.icon}</div>
                  <div>
                    <h4 className="font-bold mb-0.5" style={{ color: "var(--text-1)" }}>{f.title}</h4>
                    <p className="text-sm" style={{ color: "var(--text-2)" }}>{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Showcase card */}
          <motion.div variants={slideRight} className="relative">
            {/* Main card */}
            <div className="card p-8 relative overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at top right, rgba(249,115,22,0.08), transparent)" }}
              />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl"
                    style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)" }}>
                    🔧
                  </div>
                  <div>
                    <p className="font-bold" style={{ color: "var(--text-1)" }}>AC Service Booked</p>
                    <p className="text-xs" style={{ color: "var(--text-3)" }}>Just now · Pune</p>
                  </div>
                  <div className="ml-auto">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/15 text-green-400 border border-green-500/20">
                      Confirmed
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl mb-4"
                  style={{ background: "var(--bg-elevated)" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-sm bg-gradient-to-br from-orange-500 to-orange-600">
                    R
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: "var(--text-1)" }}>Rajesh Kumar</p>
                    <p className="text-xs" style={{ color: "var(--text-3)" }}>AC Technician · 4.97 ★ (412 jobs)</p>
                  </div>
                  <div className="ml-auto text-2xl">🧑‍🔧</div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[["Response", "18 min"], ["Rating", "4.97 ★"], ["Jobs Done", "412+"]].map(([k, v], i) => (
                    <div key={i} className="text-center p-3 rounded-xl" style={{ background: "var(--bg-elevated)" }}>
                      <p className="text-xs mb-1" style={{ color: "var(--text-3)" }}>{k}</p>
                      <p className="font-black text-sm" style={{ color: "var(--text-1)" }}>{v}</p>
                    </div>
                  ))}
                </div>

                <Link to="/booking" className="btn-primary w-full justify-center">
                  Book a Service Like This →
                </Link>
              </div>
            </div>

            {/* Decorative floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 card px-5 py-3 shadow-xl hidden lg:flex items-center gap-3"
            >
              <span className="text-xl">🎉</span>
              <div>
                <p className="text-xs font-black" style={{ color: "var(--text-1)" }}>Job Completed!</p>
                <StarRow n={5} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════ */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="py-28 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={stagger} className="flex flex-col items-center text-center gap-5 mb-16">
            <motion.div variants={fadeUp}><Badge>Testimonials</Badge></motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-black">
              Loved by{" "}
              <span className="text-gradient">Real Customers</span>
            </motion.h2>
          </motion.div>

          {/* Review cards grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {REVIEWS.map((r, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                className="card p-7 flex flex-col gap-4"
              >
                <StarRow n={r.stars} />
                <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-2)" }}>
                  "{r.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "var(--bg-border)" }}>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-black text-sm shrink-0">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: "var(--text-1)" }}>{r.name}</p>
                    <p className="text-xs" style={{ color: "var(--text-3)" }}>{r.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════════════ */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="py-16 px-6 pb-28"
        style={{ background: "var(--bg-surface)" }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative overflow-hidden rounded-[2.5rem] p-12 md:p-20 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(249,115,22,0.12), rgba(124,58,237,0.08))",
              border: "1px solid rgba(249,115,22,0.2)",
            }}
          >
            {/* Glows */}
            <div className="glow-orb w-96 h-96 bg-orange-500 opacity-20" style={{ top: "-30%", left: "-10%" }} />
            <div className="glow-orb w-80 h-80 bg-violet-600 opacity-15" style={{ bottom: "-30%", right: "-5%" }} />

            {/* Content */}
            <div className="relative">
              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-5xl mb-6"
              >
                🔧
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-black mb-4" style={{ color: "var(--text-1)" }}>
                Ready to Get It{" "}
                <span className="text-gradient">Fixed Today?</span>
              </h2>
              <p className="mb-10 max-w-lg mx-auto text-lg" style={{ color: "var(--text-2)" }}>
                Join thousands of happy customers. Book your service in 2 minutes — no signup required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/booking" className="btn-primary text-lg px-12 py-5">
                  Book a Service Now →
                </Link>
                <Link to="/contact" className="btn-ghost text-lg px-10 py-5">
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;