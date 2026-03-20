import { useState } from "react";
import SEOHead from "../../../shared/components/SEOHead.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { useBookings } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";
import { sectionReveal, stagger, fadeUp, scaleIn } from "../../../animations/motion.js";

const SERVICES = [
  { id: "electrician", name: "Electrician",     icon: "⚡", desc: "Wiring, fixtures, repairs",          color: "#f59e0b" },
  { id: "ac",          name: "AC Service",      icon: "❄️", desc: "Installation & gas refill",          color: "#06b6d4" },
  { id: "plumber",     name: "Plumber",         icon: "🔧", desc: "Pipes, leaks, fittings",             color: "#a78bfa" },
  { id: "mechanic",    name: "Mechanic",        icon: "🚗", desc: "Car & bike services",                color: "#10b981" },
  { id: "appliance",   name: "Appliance Repair",icon: "📺", desc: "Washing machines, fridges",          color: "#fb923c" },
  { id: "cleaning",    name: "Deep Cleaning",   icon: "🧹", desc: "Home & office cleaning",             color: "#818cf8" },
];

const TIME_SLOTS = [
  "Morning  (9AM – 12PM)",
  "Afternoon (12PM – 3PM)",
  "Evening  (3PM – 6PM)",
];

const stepVariants = {
  enter:  { opacity: 0, x: 40,  scale: 0.97 },
  center: { opacity: 1, x: 0,   scale: 1    },
  exit:   { opacity: 0, x: -40, scale: 0.97 },
};

/* ── Input helper ─────────────────────────────────────────── */
const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{label}</label>
    {children}
  </div>
);

const inputCls =
  "w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition text-sm";

/* ── Booking Page ─────────────────────────────────────────── */
const Booking = () => {
  const { addBooking } = useBookings();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    service: "",
    name: "", phone: "", address: "", date: "", time: "", notes: "",
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    addBooking(form);
    setStep(3);
  };

  const STEP_LABELS = ["Choose Service", "Your Details", "Confirmation"];

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <SEOHead
        title="Book a Service"
        description="Easily book home services including electricians, plumbers, and mechanics with MistriJii."
      />

      {/* Progress bar */}
      <div className="fixed top-[72px] left-0 right-0 z-40 h-0.5 bg-zinc-800">
        <motion.div
          className="h-full bg-gradient-to-r from-orange-500 to-yellow-400"
          initial={{ width: "0%" }}
          animate={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex flex-1 pt-[72px]">
        {/* ── Sidebar ──────────────────────────────────────── */}
        <div className="hidden lg:flex w-[320px] shrink-0 bg-zinc-900 border-r border-white/5 flex-col p-10 sticky top-[72px] h-[calc(100vh-72px)]">
          {/* Glow */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-orange-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="mb-10">
            <h2 className="text-2xl font-black mb-2">
              You're in{" "}
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Good Hands
              </span>
            </h2>
            <p className="text-zinc-500 text-sm">Verified experts · Fast response · Guaranteed quality</p>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-4 flex-1">
            {STEP_LABELS.map((label, i) => {
              const num = i + 1;
              const done = step > num;
              const active = step === num;
              return (
                <div key={i} className="flex items-center gap-4">
                  <motion.div
                    animate={done ? { scale: [1, 1.2, 1] } : {}}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black border transition-all ${
                      done   ? "bg-orange-500 border-orange-500 text-white" :
                      active ? "bg-orange-500/20 border-orange-500 text-orange-400" :
                               "bg-zinc-800 border-zinc-700 text-zinc-600"
                    }`}
                  >
                    {done ? "✓" : num}
                  </motion.div>
                  <span className={`text-sm font-semibold transition ${active ? "text-white" : done ? "text-orange-400" : "text-zinc-600"}`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Trust bullets */}
          <div className="space-y-3 pt-8 border-t border-white/5">
            {["Verified experts only", "Service guarantee", "Easy cancellation", "Transparent pricing"].map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-zinc-500">
                <span className="text-orange-500">✓</span> {t}
              </div>
            ))}
          </div>
        </div>

        {/* ── Form Area ────────────────────────────────────── */}
        <div className="flex-1 flex items-start justify-center p-6 md:p-12">
          <div className="w-full max-w-2xl">

            {/* Mobile step indicator */}
            <div className="lg:hidden flex gap-2 mb-8">
              {STEP_LABELS.map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-1 rounded-full transition ${step > i ? "bg-orange-500" : "bg-zinc-700"}`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* ── STEP 1 ── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35 }}
                >
                  <h2 className="text-3xl font-black mb-2">What do you need?</h2>
                  <p className="text-zinc-400 text-sm mb-8">Select a service to get started.</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {SERVICES.map((s) => (
                      <motion.button
                        key={s.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => set("service", s.name)}
                        className={`p-5 rounded-2xl border text-left transition-all ${
                          form.service === s.name
                            ? "border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/10"
                            : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
                        }`}
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3"
                          style={{ background: `${s.color}22`, border: `1px solid ${s.color}44` }}
                        >
                          {s.icon}
                        </div>
                        <h4 className="text-white font-bold text-sm mb-1">{s.name}</h4>
                        <p className="text-zinc-500 text-xs">{s.desc}</p>
                      </motion.button>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(2)}
                      disabled={!form.service}
                      className="px-8 py-3.5 bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/25 hover:bg-orange-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Continue →
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 2 ── */}
              {step === 2 && (
                <motion.form
                  key="step2"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35 }}
                  onSubmit={handleSubmit}
                >
                  <h2 className="text-3xl font-black mb-2">When & Where?</h2>
                  <p className="text-zinc-400 text-sm mb-8">
                    Service:{" "}
                    <span className="text-orange-400 font-bold">{form.service}</span>
                  </p>

                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Full Name">
                        <input required className={inputCls} placeholder="Sandeep Muhal"
                          value={form.name} onChange={(e) => set("name", e.target.value)} />
                      </Field>
                      <Field label="Phone Number">
                        <input required type="tel" className={inputCls} placeholder="+91 95115 82964"
                          value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                      </Field>
                    </div>
                    <Field label="Service Address">
                      <textarea required className={`${inputCls} resize-none h-24`}
                        placeholder="House no., street, landmark, city..."
                        value={form.address} onChange={(e) => set("address", e.target.value)} />
                    </Field>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Preferred Date">
                        <input required type="date" className={`${inputCls} [color-scheme:dark]`}
                          value={form.date} onChange={(e) => set("date", e.target.value)} />
                      </Field>
                      <Field label="Time Slot">
                        <select required className={`${inputCls} cursor-pointer`}
                          value={form.time} onChange={(e) => set("time", e.target.value)}>
                          <option value="">Select time</option>
                          {TIME_SLOTS.map((t, i) => <option key={i} value={t}>{t}</option>)}
                        </select>
                      </Field>
                    </div>
                    <Field label="Additional Notes (optional)">
                      <textarea className={`${inputCls} resize-none h-20`}
                        placeholder="Any specific instructions..."
                        value={form.notes} onChange={(e) => set("notes", e.target.value)} />
                    </Field>
                  </div>

                  <div className="mt-8 flex justify-between items-center">
                    <button type="button" onClick={() => setStep(1)}
                      className="text-zinc-400 hover:text-white text-sm font-semibold transition">
                      ← Back
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="px-8 py-3.5 bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/25 hover:bg-orange-600 transition"
                    >
                      Confirm Booking ✓
                    </motion.button>
                  </div>
                </motion.form>
              )}

              {/* ── STEP 3 SUCCESS ── */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="w-24 h-24 bg-green-500/20 border border-green-500/40 text-green-400 rounded-full flex items-center justify-center text-4xl mx-auto mb-6"
                  >
                    ✓
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-black mb-3"
                  >
                    Booking Confirmed! 🎉
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-zinc-400 mb-2"
                  >
                    Thank you, <span className="text-white font-semibold">{form.name}</span>.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-zinc-500 text-sm mb-10 max-w-sm mx-auto"
                  >
                    Your <span className="text-orange-400 font-semibold">{form.service}</span> request has been received. Our expert will call you soon to confirm.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row justify-center gap-4"
                  >
                    <button
                      onClick={() => navigate("/")}
                      className="px-6 py-3 border border-zinc-700 text-zinc-300 font-semibold rounded-xl hover:bg-zinc-800 transition"
                    >
                      Back to Home
                    </button>
                    <button
                      onClick={() => { setForm({ service: "", name: "", phone: "", address: "", date: "", time: "", notes: "" }); setStep(1); }}
                      className="px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition"
                    >
                      Book Another
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
