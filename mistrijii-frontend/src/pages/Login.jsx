import { useState } from "react";
import { auth } from "../authentication/firebase.js";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function PhoneLogin() {

  const [phone,setPhone] = useState("");
  const [otp,setOtp] = useState("");
  const [confirmObj,setConfirmObj] = useState(null);

  const sendOtp = async () => {

    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );

    const appVerifier = window.recaptchaVerifier;

    const result = await signInWithPhoneNumber(
      auth,
      "+91" + phone,
      appVerifier
    );

    setConfirmObj(result);
    alert("OTP Sent");
  };

  const verifyOtp = async () => {
    await confirmObj.confirm(otp);
    alert("Login Success");
  };

  return (
    <div>

      <input
        placeholder="Phone"
        onChange={(e)=>setPhone(e.target.value)}
      />

      <button onClick={sendOtp}>Send OTP</button>

      <input
        placeholder="OTP"
        onChange={(e)=>setOtp(e.target.value)}
      />

      <button onClick={verifyOtp}>Verify</button>

      <div id="recaptcha-container"></div>

    </div>
  );
}