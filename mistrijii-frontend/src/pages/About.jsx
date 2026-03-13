import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { sectionReveal, stagger, fadeUp } from "../animations/motion.js";
import { SERVICES, STATS, TEAM } from "../constants/aboutData.js";

/* ── Service Card ─────────────────────────────────────────── */
const ServiceCard = ({ service }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="group relative rounded-3xl p-px bg-gradient-to-br from-white/10 to-transparent"
  >
    <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 h-full flex flex-col gap-4">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
        style={{ background: `${service.color}22`, border: `1px solid ${service.color}55` }}
      >
        {service.icon}
      </div>
      <h3 className="text-white font-semibold text-lg">{service.title}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed">{service.desc}</p>
    </div>
  </motion.div>
);

/* ── Mission / Vision Card ────────────────────────────────── */
const FeatureCard = ({ emoji, title, desc, accent }) => (
  <div
    className="bg-zinc-900 border rounded-3xl p-12 text-center"
    style={{ borderColor: `${accent}44` }}
  >
    <div className="text-5xl mb-4">{emoji}</div>
    <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
    <p className="text-zinc-400">{desc}</p>
  </div>
);

/* ── CTA Section ──────────────────────────────────────────── */
const CTASection = () => (
  <motion.section
    variants={sectionReveal}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    className="py-20 px-6"
  >
    <div className="max-w-5xl mx-auto">
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative bg-gradient-to-br from-orange-500/10 to-cyan-500/10 border border-orange-500/30 rounded-[40px] px-8 md:px-16 py-20 text-center overflow-hidden"
      >
        {/* glow */}
        <div className="absolute w-[500px] h-[500px] bg-orange-500/20 blur-[140px] left-1/2 -translate-x-1/2 -top-40 pointer-events-none" />
        <h2 className="text-3xl font-bold text-white mb-4 relative">
          Ready to Experience MistriJii?
        </h2>
        <p className="text-zinc-400 mb-8 relative">
          Book now &amp; get an expert at your doorstep within minutes.
        </p>
        <Link
          to="/booking"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-orange-500 text-white font-semibold shadow-lg hover:bg-orange-600 hover:shadow-orange-500/40 transition-all duration-200 relative"
        >
          Book Service →
        </Link>
      </motion.div>
    </div>
  </motion.section>
);

/* ── About Page ───────────────────────────────────────────── */
const About = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────── */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-24 px-6 relative"
      >
        {/* ambient glow */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-orange-500/15 blur-[160px] pointer-events-none" />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative">

          {/* Left */}
          <div className="flex flex-col gap-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-orange-500/10 text-orange-400 border border-orange-500/25 w-fit">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl font-black leading-tight">
              India's Fastest Growing{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                Home Service Platform
              </span>
            </h1>
            <p className="text-zinc-400 leading-relaxed text-lg">
              MistriJii was born after a real frustration of finding a reliable
              technician. Now we connect thousands of households with verified
              professionals within minutes.
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-orange-500 text-white font-semibold shadow-lg hover:bg-orange-600 transition-all duration-200 w-fit"
            >
              Book Service →
            </Link>
          </div>

          {/* Right — Stats Grid */}
          <motion.div variants={stagger} className="grid grid-cols-2 gap-5">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-zinc-900 border border-white/10 rounded-3xl p-8 text-center"
              >
                <div className="text-4xl font-black bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  {s.num.toLocaleString("en-IN")}{s.suffix ?? ""}
                </div>
                <div className="text-zinc-400 mt-2 text-sm font-semibold">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </motion.section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-3 text-center mb-14">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-orange-500/10 text-orange-400 border border-orange-500/25">
              Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">What We Provide</h2>
          </div>
          <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <ServiceCard key={i} service={s} />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── MISSION & VISION ─────────────────────────────── */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-20 px-6"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <FeatureCard
            emoji="🎯"
            title="Mission"
            desc="Affordable, reliable, fast services to every Indian household."
            accent="#f97316"
          />
          <FeatureCard
            emoji="🔭"
            title="Vision"
            desc="Become India's #1 trusted home services platform."
            accent="#06b6d4"
          />
        </div>
      </motion.section>

      {/* ── TEAM ─────────────────────────────────────────── */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-3 text-center mb-14">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-orange-500/10 text-orange-400 border border-orange-500/25">
              Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">People Behind MistriJii</h2>
          </div>
          <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((m, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -10, scale: 1.04 }}
                transition={{ type: "spring" }}
                className="bg-zinc-900 border border-white/10 rounded-3xl p-10 text-center"
              >
                <div className="text-4xl mb-4">{m.emoji}</div>
                <h3 className="text-white font-semibold">{m.name}</h3>
                <p className="text-sm text-zinc-400 mt-1">{m.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <CTASection />

    </div>
  );
};

export default About;