import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [tab, setTab] = useState("login");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid Credentials");
      }

      const data = await res.json();
      login(data.access_token);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      if (!res.ok) {
        throw new Error("Registration Failed. Email might be already used.");
      }

      setTab("login");
      setError("Registration successful! Please log in.");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-[400px] p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          MistriJii Portal
        </h2>

        {/* Tabs */}
        <div className="flex mb-6">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 p-2 rounded-lg ${
              tab === "login" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setTab("register")}
            className={`flex-1 p-2 rounded-lg ml-2 ${
              tab === "register" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Register
          </button>
        </div>

        {/* Login */}
        {tab === "login" && (
          <>
            <input
              className="w-full border p-3 rounded-lg mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full border p-3 rounded-lg mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </>
        )}

        {/* Register */}
        {tab === "register" && (
          <>
            <input
              className="w-full border p-3 rounded-lg mb-3"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full border p-3 rounded-lg mb-3"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="w-full border p-3 rounded-lg mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full border p-3 rounded-lg mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </>
        )}

        {error && (
          <p className={`text-center mt-4 ${error.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}