import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { sendResetPasswordOtpAsync, verifyResetPasswordOtpAsync } from "../authSlice";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const [otpSent, setOtpSent] = useState(false);
  const [user, setUser] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSendOtp = async (email, otp, newPassword) => {
    console.log("sending otp");
    try {
      if (otpSent) {
        dispatch(verifyResetPasswordOtpAsync({ email, otp, newPassword }));
      } else {
        dispatch(sendResetPasswordOtpAsync({ email }));
        setOtpSent(true);
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Reset Password
        </h1>
        <p className="text-sm text-center text-gray-500 mt-2">
          {otpSent
            ? "Enter OTP and new password to continue"
            : "Enter your email to receive a reset OTP"}
        </p>

        {/* Form */}
        <form className="mt-6 space-y-4" >
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* OTP + Password (visible only after OTP sent) */}
          {otpSent && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  value={user.otp}
                  onChange={handleChange}
                  maxLength="6"
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-4 py-2 text-center tracking-widest text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  New password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={user.newPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          {/* Action button */}
          <button
            type="button"
            onClick={() =>
              handleSendOtp(user.email, user.otp, user.newPassword)
            }
            className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            {otpSent ? "Reset Password" : "Send OTP"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Back to{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

