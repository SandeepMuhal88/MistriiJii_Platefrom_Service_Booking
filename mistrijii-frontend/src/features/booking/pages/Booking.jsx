import { useState } from "react";
import SEOHead from "../../../shared/components/SEOHead.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { useBookings } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";

/* ── Service catalog with prices ────────────────────────── */
const SERVICES = [
  {
    id: "electrician",
    name: "Electrician",
    icon: "⚡",
    desc: "Wiring, fixtures & circuit repairs",
    color: "#f59e0b",
    price: "₹299 – ₹1,499",
  },
  {
    id: "ac",
    name: "AC Service",
    icon: "❄️",
    desc: "Deep cleaning, gas refill & repairs",
    color: "#06b6d4",
    price: "₹399 – ₹2,999",
  },
  {
    id: "plumber",
    name: "Plumber",
    icon: "🔧",
    desc: "Pipes, leaks & plumbing solutions",
    color: "#a78bfa",
    price: "₹199 – ₹1,199",
  },
  {
    id: "mechanic",
    name: "Mechanic",
    icon: "🚗",
    desc: "Car & bike doorstep service",
    color: "#10b981",
    price: "₹499 – ₹3,999",
  },
  {
    id: "appliance",
    name: "Appliance Repair",
    icon: "📺",
    desc: "Washing machines, fridges & more",
    color: "#fb923c",
    price: "₹299 – ₹1,999",
  },
  {
    id: "cleaning",
    name: "Deep Cleaning",
    icon: "🧹",
    desc: "Full home & office deep clean",
    color: "#818cf8",
    price: "₹799 – ₹4,999",
  },
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

/* ── Field wrapper ──────────────────────────────────────── */
const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label
      style={{
        fontSize: "0.7rem",
        fontWeight: 700,
        color: "var(--text-3)",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
      }}
    >
      {label}
    </label>
    {children}
  </div>
);

const inputStyle = {
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: "0.75rem",
  background: "var(--bg-elevated)",
  border: "1px solid var(--bg-border)",
  color: "var(--text-1)",
  fontSize: "0.875rem",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

/* ── Booking Page ─────────────────────────────────────── */
const Booking = () => {
  const { addBooking } = useBookings();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({
    service: "",
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    notes: "",
  });

  const selectedService = SERVICES.find((s) => s.name === form.service);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      await addBooking(form);
      setStep(3);
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const STEP_LABELS = ["Choose Service", "Your Details", "Confirmed"];

  const inputFocusProps = {
    onFocus: (e) => {
      e.target.style.borderColor = "var(--orange)";
      e.target.style.boxShadow = "0 0 0 3px rgba(249,115,22,0.15)";
    },
    onBlur: (e) => {
      e.target.style.borderColor = "var(--bg-border)";
      e.target.style.boxShadow = "none";
    },
  };

  return (
    <div
      style={{ background: "var(--bg-base)", color: "var(--text-1)", minHeight: "100vh" }}
      className="flex flex-col"
    >
      <SEOHead
        title="Book a Service – MistriJii"
        description="Book verified home service professionals — electricians, plumbers, AC technicians & more at your doorstep."
      />

      {/* Progress bar */}
      <div
        style={{
          position: "fixed",
          top: "72px",
          left: 0,
          right: 0,
          zIndex: 40,
          height: "3px",
          background: "var(--bg-border)",
        }}
      >
        <motion.div
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #f97316, #fbbf24)",
          }}
          initial={{ width: "0%" }}
          animate={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex flex-1 pt-[72px]">
        {/* ── SIDEBAR ────────────────────────────────────── */}
        <div
          className="hidden lg:flex w-[300px] shrink-0 flex-col p-10 sticky h-[calc(100vh-72px)]"
          style={{
            top: "72px",
            background: "var(--bg-surface)",
            borderRight: "1px solid var(--bg-border)",
          }}
        >
          {/* Glow */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              background: "rgba(249,115,22,0.08)",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />

          <div style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 900,
                marginBottom: "0.5rem",
                color: "var(--text-1)",
              }}
            >
              You're in{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #f97316, #fbbf24)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Good Hands
              </span>
            </h2>
            <p style={{ color: "var(--text-3)", fontSize: "0.875rem" }}>
              Verified experts · Fast response · Guaranteed quality
            </p>
          </div>

          {/* Steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>
            {STEP_LABELS.map((label, i) => {
              const num = i + 1;
              const done = step > num;
              const active = step === num;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <motion.div
                    animate={done ? { scale: [1, 1.2, 1] } : {}}
                    style={{
                      width: "2.25rem",
                      height: "2.25rem",
                      borderRadius: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.875rem",
                      fontWeight: 900,
                      border: `1px solid ${
                        done ? "#f97316" : active ? "#f97316" : "var(--bg-border)"
                      }`,
                      background: done
                        ? "#f97316"
                        : active
                        ? "rgba(249,115,22,0.15)"
                        : "var(--bg-elevated)",
                      color: done ? "#fff" : active ? "#f97316" : "var(--text-3)",
                      transition: "all 0.3s",
                    }}
                  >
                    {done ? "✓" : num}
                  </motion.div>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: active
                        ? "var(--text-1)"
                        : done
                        ? "#fb923c"
                        : "var(--text-4)",
                      transition: "color 0.3s",
                    }}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Service price preview */}
          {selectedService && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: "1.5rem",
                padding: "1rem",
                borderRadius: "1rem",
                background: `${selectedService.color}15`,
                border: `1px solid ${selectedService.color}30`,
              }}
            >
              <p style={{ fontSize: "0.75rem", color: "var(--text-3)", marginBottom: "0.25rem" }}>
                Selected
              </p>
              <p style={{ fontWeight: 700, color: "var(--text-1)" }}>
                {selectedService.icon} {selectedService.name}
              </p>
              <p style={{ fontSize: "0.875rem", color: selectedService.color, fontWeight: 700 }}>
                {selectedService.price}
              </p>
            </motion.div>
          )}

          {/* Trust bullets */}
          <div
            style={{
              paddingTop: "1.5rem",
              marginTop: "1.5rem",
              borderTop: "1px solid var(--bg-border)",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {[
              "Verified & background-checked experts",
              "Service guarantee — free re-service",
              "Transparent pricing — no hidden fees",
              "Easy cancellation anytime",
            ].map((t, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-3)" }}
              >
                <span style={{ color: "#f97316" }}>✓</span> {t}
              </div>
            ))}
          </div>
        </div>

        {/* ── FORM AREA ──────────────────────────────────── */}
        <div
          style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "2rem 1.5rem" }}
        >
          <div style={{ width: "100%", maxWidth: "640px" }}>
            {/* Mobile step dots */}
            <div
              className="lg:hidden"
              style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}
            >
              {STEP_LABELS.map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: "4px",
                    borderRadius: "9999px",
                    background: step > i ? "#f97316" : "var(--bg-elevated)",
                    transition: "background 0.3s",
                  }}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* ── STEP 1 — Choose Service ── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35 }}
                >
                  <h2
                    style={{
                      fontSize: "1.875rem",
                      fontWeight: 900,
                      marginBottom: "0.5rem",
                      color: "var(--text-1)",
                    }}
                  >
                    What do you need?
                  </h2>
                  <p style={{ color: "var(--text-3)", fontSize: "0.875rem", marginBottom: "2rem" }}>
                    Select a service to get started. Prices are transparent — what you see is what you pay.
                  </p>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                      gap: "1rem",
                    }}
                  >
                    {SERVICES.map((s) => {
                      const selected = form.service === s.name;
                      return (
                        <motion.button
                          key={s.id}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => set("service", s.name)}
                          style={{
                            padding: "1.25rem",
                            borderRadius: "1.25rem",
                            border: selected
                              ? `2px solid ${s.color}`
                              : "1px solid var(--bg-border)",
                            background: selected ? `${s.color}12` : "var(--bg-card)",
                            textAlign: "left",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            boxShadow: selected ? `0 0 20px ${s.color}25` : "none",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              width: "3rem",
                              height: "3rem",
                              borderRadius: "0.875rem",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "1.5rem",
                              marginBottom: "0.75rem",
                              background: `${s.color}18`,
                              border: `1px solid ${s.color}35`,
                            }}
                          >
                            {s.icon}
                          </div>
                          <h4
                            style={{
                              fontWeight: 700,
                              fontSize: "0.9375rem",
                              marginBottom: "0.25rem",
                              color: "var(--text-1)",
                            }}
                          >
                            {s.name}
                          </h4>
                          <p style={{ color: "var(--text-3)", fontSize: "0.8rem", marginBottom: "0.5rem" }}>
                            {s.desc}
                          </p>
                          <p
                            style={{
                              color: s.color,
                              fontSize: "0.875rem",
                              fontWeight: 700,
                            }}
                          >
                            {s.price}
                          </p>
                        </motion.button>
                      );
                    })}
                  </div>

                  <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(2)}
                      disabled={!form.service}
                      style={{
                        padding: "0.875rem 2rem",
                        background: form.service ? "#f97316" : "var(--bg-elevated)",
                        color: form.service ? "#fff" : "var(--text-4)",
                        fontWeight: 700,
                        borderRadius: "0.875rem",
                        border: "none",
                        cursor: form.service ? "pointer" : "not-allowed",
                        boxShadow: form.service ? "0 0 30px rgba(249,115,22,0.35)" : "none",
                        transition: "all 0.2s",
                      }}
                    >
                      Continue →
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 2 — Details ── */}
              {step === 2 && (
                <motion.form
                  key="step2"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35 }}
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
                >
                  <div>
                    <h2
                      style={{
                        fontSize: "1.875rem",
                        fontWeight: 900,
                        marginBottom: "0.5rem",
                        color: "var(--text-1)",
                      }}
                    >
                      When & Where?
                    </h2>
                    <p style={{ color: "var(--text-3)", fontSize: "0.875rem" }}>
                      Booking:{" "}
                      <span style={{ color: "#fb923c", fontWeight: 700 }}>{form.service}</span>
                      {selectedService && (
                        <span style={{ color: "var(--text-4)", marginLeft: "0.5rem" }}>
                          · {selectedService.price}
                        </span>
                      )}
                    </p>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <Field label="Full Name">
                      <input
                        required
                        style={{ ...inputStyle, colorScheme: "dark" }}
                        placeholder="Sandeep Muhal"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        {...inputFocusProps}
                      />
                    </Field>
                    <Field label="Phone Number">
                      <input
                        required
                        type="tel"
                        style={inputStyle}
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        {...inputFocusProps}
                      />
                    </Field>
                  </div>

                  <Field label="Service Address">
                    <textarea
                      required
                      style={{ ...inputStyle, resize: "none", height: "6rem" }}
                      placeholder="House no., street, landmark, city..."
                      value={form.address}
                      onChange={(e) => set("address", e.target.value)}
                      {...inputFocusProps}
                    />
                  </Field>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <Field label="Preferred Date">
                      <input
                        required
                        type="date"
                        style={{ ...inputStyle, colorScheme: "dark" }}
                        min={new Date().toISOString().split("T")[0]}
                        value={form.date}
                        onChange={(e) => set("date", e.target.value)}
                        {...inputFocusProps}
                      />
                    </Field>
                    <Field label="Time Slot">
                      <select
                        required
                        style={{ ...inputStyle, cursor: "pointer" }}
                        value={form.time}
                        onChange={(e) => set("time", e.target.value)}
                        {...inputFocusProps}
                      >
                        <option value="">Select time slot</option>
                        {TIME_SLOTS.map((t, i) => (
                          <option key={i} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="Additional Notes (optional)">
                    <textarea
                      style={{ ...inputStyle, resize: "none", height: "5rem" }}
                      placeholder="Any specific instructions or details..."
                      value={form.notes}
                      onChange={(e) => set("notes", e.target.value)}
                    />
                  </Field>

                  {/* Error message */}
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        padding: "0.875rem 1rem",
                        borderRadius: "0.75rem",
                        background: "rgba(239,68,68,0.1)",
                        border: "1px solid rgba(239,68,68,0.25)",
                        color: "#f87171",
                        fontSize: "0.875rem",
                      }}
                    >
                      ⚠️ {submitError}
                    </motion.div>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--text-3)",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        cursor: "pointer",
                        padding: "0.5rem",
                      }}
                    >
                      ← Back
                    </button>
                    <motion.button
                      whileHover={{ scale: submitting ? 1 : 1.02 }}
                      whileTap={{ scale: submitting ? 1 : 0.98 }}
                      type="submit"
                      disabled={submitting}
                      style={{
                        padding: "0.875rem 2rem",
                        background: "#f97316",
                        color: "#fff",
                        fontWeight: 700,
                        borderRadius: "0.875rem",
                        border: "none",
                        cursor: submitting ? "not-allowed" : "pointer",
                        opacity: submitting ? 0.7 : 1,
                        boxShadow: "0 0 30px rgba(249,115,22,0.35)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      {submitting ? (
                        <>
                          <span
                            style={{
                              width: "1rem",
                              height: "1rem",
                              border: "2px solid rgba(255,255,255,0.3)",
                              borderTopColor: "#fff",
                              borderRadius: "50%",
                              display: "inline-block",
                              animation: "spin 0.7s linear infinite",
                            }}
                          />
                          Confirming...
                        </>
                      ) : (
                        "Confirm Booking ✓"
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}

              {/* ── STEP 3 — Success ── */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  style={{ textAlign: "center", paddingTop: "3rem" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    style={{
                      width: "6rem",
                      height: "6rem",
                      background: "rgba(34,197,94,0.15)",
                      border: "1px solid rgba(34,197,94,0.35)",
                      color: "#4ade80",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2.5rem",
                      margin: "0 auto 1.5rem",
                    }}
                  >
                    ✓
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "0.75rem", color: "var(--text-1)" }}
                  >
                    Booking Confirmed! 🎉
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{ color: "var(--text-2)", marginBottom: "0.5rem" }}
                  >
                    Thank you,{" "}
                    <strong style={{ color: "var(--text-1)" }}>{form.name}</strong>.
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{
                      color: "var(--text-3)",
                      fontSize: "0.9rem",
                      maxWidth: "28rem",
                      margin: "0 auto 1rem",
                    }}
                  >
                    Your{" "}
                    <span style={{ color: "#fb923c", fontWeight: 700 }}>{form.service}</span>{" "}
                    request has been received. Our expert will call you on{" "}
                    <strong style={{ color: "var(--text-2)" }}>{form.phone}</strong> soon to confirm.
                  </motion.p>

                  {selectedService && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                      style={{
                        display: "inline-block",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.75rem",
                        background: `${selectedService.color}15`,
                        border: `1px solid ${selectedService.color}30`,
                        color: selectedService.color,
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        marginBottom: "2.5rem",
                      }}
                    >
                      Estimated: {selectedService.price}
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65 }}
                    style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "center" }}
                  >
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
                      <button
                        onClick={() => navigate("/")}
                        style={{
                          padding: "0.75rem 1.5rem",
                          border: "1px solid var(--bg-border)",
                          color: "var(--text-2)",
                          borderRadius: "0.875rem",
                          background: "var(--bg-elevated)",
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        ← Back to Home
                      </button>
                      <button
                        onClick={() => {
                          setForm({ service: "", name: "", phone: "", address: "", date: "", time: "", notes: "" });
                          setStep(1);
                        }}
                        style={{
                          padding: "0.75rem 1.5rem",
                          background: "#f97316",
                          color: "#fff",
                          borderRadius: "0.875rem",
                          border: "none",
                          fontWeight: 700,
                          cursor: "pointer",
                          boxShadow: "0 0 20px rgba(249,115,22,0.3)",
                          transition: "all 0.2s",
                        }}
                      >
                        Book Another Service
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        select option { background: var(--bg-elevated); color: var(--text-1); }
      `}</style>
    </div>
  );
};

export default Booking;
