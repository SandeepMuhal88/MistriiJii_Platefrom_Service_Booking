import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SEOHead from "../../../shared/components/SEOHead.jsx";
import { motion, AnimatePresence } from "framer-motion";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

/* ── Reusable input style ─────────────────────────────────── */
const inputStyle = {
  width: "100%",
  padding: "0.875rem 1rem",
  borderRadius: "0.875rem",
  background: "var(--bg-elevated)",
  border: "1px solid var(--bg-border)",
  color: "var(--text-1)",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const Label = ({ children }) => (
  <label
    style={{
      display: "block",
      fontSize: "0.7rem",
      fontWeight: 700,
      color: "var(--text-3)",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      marginBottom: "0.5rem",
    }}
  >
    {children}
  </label>
);

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // "email" | "phone"
  const [authMethod, setAuthMethod] = useState("email");
  // "login" | "register" — for email auth
  const [tab, setTab] = useState("login");

  const [form, setForm] = useState({
    name: "", phone: "", email: "", password: "",
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpDemo, setOtpDemo] = useState(""); // shows OTP in demo mode
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // type: "error"|"success"

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const msg = (text, type = "error") => setMessage({ text, type });

  const focusProps = {
    onFocus: (e) => {
      e.target.style.borderColor = "#f97316";
      e.target.style.boxShadow = "0 0 0 3px rgba(249,115,22,0.15)";
    },
    onBlur: (e) => {
      e.target.style.borderColor = "var(--bg-border)";
      e.target.style.boxShadow = "none";
    },
  };

  /* ── Email Auth ─────────────────────────────────────────── */
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    msg("", "");
    try {
      if (tab === "login") {
        const res = await fetch(`${API}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email, password: form.password }),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.detail || "Invalid credentials");
        }
        const data = await res.json();
        login(data.access_token);
        navigate("/admin");
      } else {
        const res = await fetch(`${API}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.detail || "Registration failed");
        }
        msg("Account created! Please log in.", "success");
        setTab("login");
      }
    } catch (err) {
      msg(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Phone OTP — Send ───────────────────────────────────── */
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!form.phone.trim()) return msg("Please enter your phone number.");
    setLoading(true);
    msg("", "");
    try {
      const res = await fetch(`${API}/auth/phone/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: form.phone }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Failed to send OTP");
      }
      const data = await res.json();
      setOtpSent(true);
      if (data.otp_demo) {
        setOtpDemo(data.otp_demo); // demo mode only
        msg(`Demo OTP: ${data.otp_demo}`, "success");
      } else {
        msg("OTP sent to your phone!", "success");
      }
    } catch (err) {
      msg(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ── Phone OTP — Verify ─────────────────────────────────── */
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) return msg("Please enter the OTP.");
    setLoading(true);
    msg("", "");
    try {
      const res = await fetch(`${API}/auth/phone/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: form.phone, otp }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Invalid or expired OTP");
      }
      const data = await res.json();
      login(data.access_token);
      navigate("/admin");
    } catch (err) {
      msg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-base)",
        color: "var(--text-1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <SEOHead
        title={
          authMethod === "phone"
            ? "Phone Login — MistriJii"
            : tab === "login"
            ? "Admin Login — MistriJii"
            : "Register — MistriJii"
        }
      />

      {/* Ambient orbs */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "20%",
          width: "28rem",
          height: "28rem",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.12), transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          right: "15%",
          width: "24rem",
          height: "24rem",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.1), transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{ width: "100%", maxWidth: "26rem", position: "relative", zIndex: 10 }}
      >
        {/* Card */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--bg-border)",
            borderRadius: "1.75rem",
            padding: "2.25rem",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 25px 50px rgba(0,0,0,0.35)",
          }}
        >
          {/* Top gradient line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "linear-gradient(90deg, #f97316, #fbbf24)",
            }}
          />

          {/* Brand */}
          <div style={{ textAlign: "center", marginBottom: "1.75rem", paddingTop: "0.5rem" }}>
            <h1
              style={{
                fontSize: "1.75rem",
                fontWeight: 900,
                marginBottom: "0.35rem",
                letterSpacing: "-0.02em",
              }}
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #f97316, #fbbf24)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                MistriJii
              </span>{" "}
              Portal
            </h1>
            <p style={{ color: "var(--text-3)", fontSize: "0.875rem" }}>
              Access your admin dashboard securely
            </p>
          </div>

          {/* Auth Method Toggle */}
          <div
            style={{
              display: "flex",
              background: "var(--bg-elevated)",
              borderRadius: "0.875rem",
              padding: "4px",
              marginBottom: "1.5rem",
              border: "1px solid var(--bg-border)",
            }}
          >
            {[
              { id: "email", label: "📧 Email" },
              { id: "phone", label: "📱 Phone OTP" },
            ].map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setAuthMethod(id);
                  msg("", "");
                  setOtpSent(false);
                  setOtpDemo("");
                  setOtp("");
                }}
                style={{
                  flex: 1,
                  padding: "0.625rem",
                  borderRadius: "0.625rem",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: authMethod === id ? "var(--bg-card)" : "transparent",
                  color: authMethod === id ? "var(--text-1)" : "var(--text-3)",
                  boxShadow: authMethod === id ? "0 1px 4px rgba(0,0,0,0.2)" : "none",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* ── EMAIL AUTH ── */}
            {authMethod === "email" && (
              <motion.div
                key="email-auth"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.25 }}
              >
                {/* Login / Register sub-tabs */}
                <div
                  style={{
                    display: "flex",
                    background: "var(--bg-elevated)",
                    borderRadius: "0.75rem",
                    padding: "3px",
                    marginBottom: "1.5rem",
                    border: "1px solid var(--bg-border)",
                    gap: "2px",
                  }}
                >
                  {[
                    { id: "login", label: "Log In" },
                    { id: "register", label: "Sign Up" },
                  ].map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => { setTab(id); msg("", ""); }}
                      style={{
                        flex: 1,
                        padding: "0.5rem",
                        borderRadius: "0.625rem",
                        fontSize: "0.875rem",
                        fontWeight: 700,
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        background: tab === id ? "var(--bg-card)" : "transparent",
                        color: tab === id ? "var(--text-1)" : "var(--text-3)",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={tab}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                    >
                      {tab === "register" && (
                        <>
                          <div>
                            <Label>Full Name</Label>
                            <input
                              required
                              style={inputStyle}
                              placeholder="Sandeep Muhal"
                              value={form.name}
                              onChange={(e) => set("name", e.target.value)}
                              {...focusProps}
                            />
                          </div>
                          <div>
                            <Label>Phone Number</Label>
                            <input
                              required
                              type="tel"
                              style={inputStyle}
                              placeholder="+91 98765 43210"
                              value={form.phone}
                              onChange={(e) => set("phone", e.target.value)}
                              {...focusProps}
                            />
                          </div>
                        </>
                      )}

                      <div>
                        <Label>Email Address</Label>
                        <input
                          required
                          type="email"
                          style={inputStyle}
                          placeholder="admin@mistrijii.in"
                          value={form.email}
                          onChange={(e) => set("email", e.target.value)}
                          {...focusProps}
                        />
                      </div>

                      <div>
                        <Label>Password</Label>
                        <input
                          required
                          type="password"
                          style={inputStyle}
                          placeholder="••••••••"
                          value={form.password}
                          onChange={(e) => set("password", e.target.value)}
                          {...focusProps}
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {message.text && <MessageBox message={message} />}

                  <SubmitBtn loading={loading} label={tab === "login" ? "Sign In →" : "Create Account →"} />
                </form>
              </motion.div>
            )}

            {/* ── PHONE OTP AUTH ── */}
            {authMethod === "phone" && (
              <motion.div
                key="phone-auth"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                      <Label>Mobile Number</Label>
                      <input
                        required
                        type="tel"
                        style={inputStyle}
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        {...focusProps}
                      />
                    </div>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-3)" }}>
                      We'll send a 6-digit OTP to verify your number.
                    </p>

                    {message.text && <MessageBox message={message} />}

                    <SubmitBtn loading={loading} label="Send OTP →" />
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div
                      style={{
                        padding: "0.75rem",
                        borderRadius: "0.75rem",
                        background: "rgba(249,115,22,0.08)",
                        border: "1px solid rgba(249,115,22,0.2)",
                        fontSize: "0.875rem",
                        color: "var(--text-2)",
                        textAlign: "center",
                      }}
                    >
                      OTP sent to{" "}
                      <strong style={{ color: "#fb923c" }}>{form.phone}</strong>
                    </div>

                    <div>
                      <Label>Enter 6-digit OTP</Label>
                      <input
                        required
                        type="text"
                        maxLength={6}
                        style={{
                          ...inputStyle,
                          fontSize: "1.5rem",
                          letterSpacing: "0.5rem",
                          textAlign: "center",
                          fontWeight: 700,
                        }}
                        placeholder="● ● ● ● ● ●"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        {...focusProps}
                      />
                    </div>

                    {message.text && <MessageBox message={message} />}

                    <SubmitBtn loading={loading} label="Verify & Login →" />

                    <button
                      type="button"
                      onClick={() => { setOtpSent(false); setOtp(""); msg("", ""); }}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--text-3)",
                        fontSize: "0.8rem",
                        cursor: "pointer",
                        textAlign: "center",
                        marginTop: "-0.25rem",
                      }}
                    >
                      ← Change number
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p style={{ textAlign: "center", color: "var(--text-4)", marginTop: "1.25rem", fontSize: "0.75rem" }}>
          By continuing, you agree to MistriJii's Terms of Service & Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}

/* ── Helper Components ──────────────────────────────────── */

function MessageBox({ message }) {
  const isSuccess = message.type === "success";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        padding: "0.75rem 1rem",
        borderRadius: "0.75rem",
        fontSize: "0.875rem",
        fontWeight: 500,
        textAlign: "center",
        background: isSuccess ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
        color: isSuccess ? "#4ade80" : "#f87171",
        border: `1px solid ${isSuccess ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"}`,
      }}
    >
      {isSuccess ? "✅" : "⚠️"} {message.text}
    </motion.div>
  );
}

function SubmitBtn({ loading, label }) {
  return (
    <motion.button
      whileHover={{ scale: loading ? 1 : 1.02 }}
      whileTap={{ scale: loading ? 1 : 0.98 }}
      disabled={loading}
      type="submit"
      style={{
        width: "100%",
        padding: "0.9375rem",
        background: "linear-gradient(135deg, #f97316, #ea580c)",
        color: "#fff",
        fontWeight: 800,
        fontSize: "1rem",
        borderRadius: "0.875rem",
        border: "none",
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.7 : 1,
        boxShadow: "0 0 30px rgba(249,115,22,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        transition: "opacity 0.2s",
        marginTop: "0.25rem",
      }}
    >
      {loading ? (
        <>
          <span
            style={{
              width: "1.1rem",
              height: "1.1rem",
              border: "2px solid rgba(255,255,255,0.3)",
              borderTopColor: "#fff",
              borderRadius: "50%",
              display: "inline-block",
              animation: "spin 0.7s linear infinite",
            }}
          />
          Processing...
        </>
      ) : (
        label
      )}
    </motion.button>
  );
}