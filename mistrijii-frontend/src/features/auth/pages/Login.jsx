import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SEOHead from "../../../shared/components/SEOHead.jsx";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const { login } = useAuth();
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (tab === "login") {
        const res = await fetch("http://localhost:8000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email, password: form.password }),
        });
        if (!res.ok) throw new Error("Invalid Credentials");
        const data = await res.json();
        login(data.access_token);
        navigate("/admin");
      } else {
        const res = await fetch("http://localhost:8000/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Registration Failed. Email might be already used.");
        
        setTab("login");
        setError("Registration successful! Please log in.");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full px-4 py-3.5 rounded-xl bg-zinc-800/50 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition text-sm";
  const labelCls = "block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 px-1";

  const formVariants = {
    hidden: { opacity: 0, x: tab === 'login' ? -20 : 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: tab === 'login' ? 20 : -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center relative overflow-hidden p-4">
      <SEOHead title={tab === 'login' ? 'Login - MistriJii' : 'Register - MistriJii'} />
      
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Subtle gradient border highlight at the top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-yellow-400" />
          
          <div className="text-center mb-8 pt-2">
            <h2 className="text-3xl font-black tracking-tight mb-2">
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                MistriJii
              </span> Portal
            </h2>
            <p className="text-zinc-500 text-sm">Access your service dashboard</p>
          </div>

          {/* Toggle */}
          <div className="flex bg-zinc-950/50 rounded-xl p-1 mb-8 border border-white/5">
            <button
              type="button"
              onClick={() => { setTab("login"); setError(""); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                tab === "login" 
                  ? "bg-zinc-800 text-white shadow-lg" 
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => { setTab("register"); setError(""); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                tab === "register" 
                  ? "bg-zinc-800 text-white shadow-lg" 
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-4"
              >
                {tab === "register" && (
                  <>
                    <div>
                      <label className={labelCls}>Full Name</label>
                      <input required className={inputCls} placeholder="John Doe" 
                        value={form.name} onChange={(e) => set("name", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelCls}>Phone Number</label>
                      <input required type="tel" className={inputCls} placeholder="+91 98765 43210" 
                        value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                    </div>
                  </>
                )}

                <div>
                  <label className={labelCls}>Email Address</label>
                  <input required type="email" className={inputCls} placeholder="you@example.com" 
                    value={form.email} onChange={(e) => set("email", e.target.value)} />
                </div>

                <div>
                  <label className={labelCls}>Password</label>
                  <input required type="password" className={inputCls} placeholder="••••••••" 
                    value={form.password} onChange={(e) => set("password", e.target.value)} />
                </div>
              </motion.div>
            </AnimatePresence>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`mt-6 p-4 rounded-xl text-sm font-medium border text-center ${
                  error.includes('successful') 
                    ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                }`}
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="w-full mt-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black rounded-xl shadow-lg shadow-orange-500/20 hover:from-orange-400 hover:to-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                tab === "login" ? "Sign In →" : "Create Account →"
              )}
            </motion.button>
          </form>
        </div>
        
        <p className="text-center text-zinc-600 mt-6 text-xs">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}