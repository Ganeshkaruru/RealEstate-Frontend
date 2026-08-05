import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaBuilding, FaArrowRight } from "react-icons/fa";
import { loginUser } from "../../services/authService";
import { useToast } from "../../components/Toast";
import "../../css/auth.css";

const Login = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      showToast("Please fill in all fields", "error");
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser(formData);
      showToast(`Welcome back, ${data.userName || "User"}!`, "success");
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid email or password";
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
              Find Your Dream Sanctuary Today.
            </h2>
            <p className="auth-illustration-subtitle">
              Sign in to unlock personalized property recommendations, save favorites, and connect directly with verified sellers.
            </p>
          </div>

          <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>
            © {new Date().getFullYear()} LuxeEstates Inc.
          </div>
        </div>

        <div className="auth-form-side">
          <div className="auth-header">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Please enter your details to sign in</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
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

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="auth-footer-link">
            Don't have an account? <Link to="/register">Create Account</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;