import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaUserTag, FaBuilding } from "react-icons/fa";
import { registerUser } from "../../services/authService";
import { useToast } from "../../components/Toast";
import "../../css/auth.css";

const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "BUYER",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    setLoading(true);
    try {
      await registerUser({
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      showToast("Account created successfully! Please sign in.", "success");
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="auth-card-container"
      >
        <div className="auth-illustration-side">
          <div className="auth-illustration-brand">
            <FaBuilding size={24} />
            <span>LuxeEstates</span>
          </div>

          <div className="auth-illustration-content">
            <h2 className="auth-illustration-title">
              Join The Premier Real Estate Network.
            </h2>
            <p className="auth-illustration-subtitle">
              Register as a Buyer to discover luxury properties or as a Seller to list and showcase your real estate portfolio to millions.
            </p>
          </div>

          <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>
            © {new Date().getFullYear()} LuxeEstates Inc.
          </div>
        </div>

        <div className="auth-form-side">
          <div className="auth-header">
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Sign up in just a few simple steps</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name / Username</label>
              <div className="input-icon-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  className="form-input"
                  placeholder="John Doe"
                  value={formData.userName}
                  onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-icon-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  className="form-input"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">I want to register as</label>
              <div className="input-icon-wrapper">
                <FaUserTag className="input-icon" />
                <select
                  className="form-input form-select"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="BUYER">Buyer (Looking for Property)</option>
                  <option value="SELLER">Seller (List & Sell Property)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-icon-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="input-icon-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="auth-footer-link">
            Already have an account? <Link to="/login">Sign In</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;