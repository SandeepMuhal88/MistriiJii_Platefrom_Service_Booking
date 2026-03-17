import { useState } from "react";
import { auth } from "../../../lib/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [tab, setTab] = useState("phone");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmObj, setConfirmObj] = useState(null);

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const navigate = useNavigate();

  const sendOtp = async () => {

    try {
      setLoading(true);
      setError("");

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );

      const result = await signInWithPhoneNumber(
        auth,
        "+91" + phone,
        window.recaptchaVerifier
      );

      setConfirmObj(result);

    } catch (err) {
      setError("Failed to send OTP");
    }

    setLoading(false);
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      await confirmObj.confirm(otp);
      navigate("/admin");
    } catch {
      setError("Invalid OTP");
    }
    setLoading(false);
  };

  const emailLogin = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth,email,password);
      navigate("/admin");
    } catch {
      setError("Invalid Credentials");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white w-[400px] p-8 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">
          MistriJii Login
        </h2>

        {/* Tabs */}
        <div className="flex mb-6">
          <button
            onClick={()=>setTab("phone")}
            className={`flex-1 p-2 rounded-lg ${tab==="phone" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Mobile OTP
          </button>

          <button
            onClick={()=>setTab("email")}
            className={`flex-1 p-2 rounded-lg ml-2 ${tab==="email" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Email
          </button>
        </div>

        {/* Phone Login */}
        {tab === "phone" && (
          <>
            <input
              className="w-full border p-3 rounded-lg mb-3"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
            />

            {confirmObj && (
              <input
                className="w-full border p-3 rounded-lg mb-3"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e)=>setOtp(e.target.value)}
              />
            )}

            {!confirmObj ? (
              <button
                onClick={sendOtp}
                disabled={loading}
                className="w-full bg-blue-500 text-white p-3 rounded-lg"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            ) : (
              <button
                onClick={verifyOtp}
                disabled={loading}
                className="w-full bg-green-500 text-white p-3 rounded-lg"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            )}
          </>
        )}

        {/* Email Login */}
        {tab === "email" && (
          <>
            <input
              className="w-full border p-3 rounded-lg mb-3"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

            <input
              type="password"
              className="w-full border p-3 rounded-lg mb-3"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            <button
              onClick={emailLogin}
              disabled={loading}
              className="w-full bg-blue-500 text-white p-3 rounded-lg"
            >
              {loading ? "Logging..." : "Login"}
            </button>
          </>
        )}

        {error && (
          <p className="text-red-500 text-center mt-3">
            {error}
          </p>
        )}

        <div id="recaptcha-container"></div>

      </div>

    </div>
  );
}