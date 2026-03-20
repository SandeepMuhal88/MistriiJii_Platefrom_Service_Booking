import { useState } from "react";
import SEOHead from "../../../shared/components/SEOHead.jsx";
import { motion } from "framer-motion";
import { sectionReveal, stagger, fadeUp, slideLeft, slideRight } from "../../../animations/motion";

const CONTACT_INFO = [
  { icon: "📍", title: "Headquarters",    lines: ["Rajasthan, India"] },
  { icon: "✉️", title: "Email Us",        lines: ["support@mistrijii.in", "partners@mistrijii.in"] },
  { icon: "📱", title: "Call Us",         lines: ["+91 95115 82964", "Mon–Sat · 9AM – 8PM"] },
];

const inputCls =
  "w-full px-4 py-3.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition text-sm";

const Contact = () => {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      <SEOHead
        title="Contact Us"
        description="Get in touch with MistriJii customer support."
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        animate="show"
        className="relative pt-36 pb-20 px-6 text-center overflow-hidden"
      >
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-500/10 blur-[120px] pointer-events-none" />
        <motion.div variants={stagger} className="max-w-2xl mx-auto relative">
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-orange-500/10 text-orange-400 border border-orange-500/25 mb-6"
          >
            Contact Us
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-6xl font-black mb-5 leading-tight"
          >
            Let's{" "}
            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Talk
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-zinc-400 text-lg">
            Our expert support team is ready to help. Reach out anytime — we respond within 2 hours.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* ── MAIN GRID ────────────────────────────────────── */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-12 px-6 pb-28"
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_380px] gap-8">

          {/* ── Form ───────────────────────────────── */}
          <motion.div
            variants={slideLeft}
            className="bg-zinc-900 border border-white/8 rounded-3xl p-8 md:p-12"
          >
            {!sent ? (
              <>
                <h2 className="text-2xl font-black mb-7">Send a Message</h2>
                <form
                  className="space-y-5"
                  onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5">First Name</label>
                      <input required type="text" className={inputCls} placeholder="Sandeep" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Last Name</label>
                      <input required type="text" className={inputCls} placeholder="Muhal" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Email Address</label>
                    <input required type="email" className={inputCls} placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Subject</label>
                    <input type="text" className={inputCls} placeholder="How can we help?" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Message</label>
                    <textarea required className={`${inputCls} resize-none h-32`} placeholder="Tell us more..." />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/25 hover:bg-orange-600 transition text-base"
                  >
                    Send Message →
                  </motion.button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-500/20 border border-green-500/40 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                  ✓
                </div>
                <h3 className="text-2xl font-black mb-2">Message Sent!</h3>
                <p className="text-zinc-400">We'll get back to you within 2 hours.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-8 px-6 py-3 border border-zinc-700 text-zinc-300 rounded-xl hover:bg-zinc-800 transition text-sm font-semibold"
                >
                  Send Another
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* ── Info Panel ──────────────────────────── */}
          <motion.div variants={slideRight} className="flex flex-col gap-5">

            {/* Orange info card */}
            <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <h3 className="text-xl font-black mb-7 relative">Contact Information</h3>
              <div className="space-y-6 relative">
                {CONTACT_INFO.map((c, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-lg shrink-0">
                      {c.icon}
                    </div>
                    <div>
                      <p className="font-bold text-sm mb-0.5">{c.title}</p>
                      {c.lines.map((l, j) => (
                        <p key={j} className="text-white/75 text-sm">{l}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business hours */}
            <div className="bg-zinc-900 border border-white/8 rounded-3xl p-7">
              <h4 className="font-black text-sm mb-5 text-zinc-300 uppercase tracking-widest">Business Hours</h4>
              <div className="space-y-2 text-sm">
                {[
                  ["Mon – Fri", "9:00 AM – 8:00 PM"],
                  ["Saturday",  "9:00 AM – 6:00 PM"],
                  ["Sunday",    "10:00 AM – 4:00 PM"],
                ].map(([day, time], i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-zinc-500">{day}</span>
                    <span className="text-white font-semibold">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="bg-zinc-900 border border-white/8 rounded-3xl p-7">
              <h4 className="font-black text-sm mb-5 text-zinc-300 uppercase tracking-widest">Follow Us</h4>
              <div className="flex gap-3">
                {[
                  { icon: "📸", label: "Instagram", color: "hover:border-pink-500 hover:text-pink-400" },
                  { icon: "🐦", label: "Twitter",   color: "hover:border-sky-500 hover:text-sky-400"  },
                  { icon: "💼", label: "LinkedIn",  color: "hover:border-blue-500 hover:text-blue-400" },
                ].map((s, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title={s.label}
                    className={`w-12 h-12 bg-zinc-800 border border-zinc-700 rounded-xl flex items-center justify-center text-xl transition-all ${s.color}`}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;