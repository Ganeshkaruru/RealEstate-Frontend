import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBuilding, FaSignOutAlt } from "react-icons/fa";
import { getCurrentUser, logoutUser } from "../services/authService";
import { getSellerEnquiries } from "../services/enquiryService";
import { useToast } from "./Toast";
import "../css/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const user = getCurrentUser();

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user && user.role === "SELLER") {
      fetchUnreadEnquiries();
    }
  }, [user?.role, location.pathname]);

  const fetchUnreadEnquiries = async () => {
    try {
      const enquiries = await getSellerEnquiries();
      if (Array.isArray(enquiries)) {
        const unread = enquiries.filter(
          (e) => e.status && e.status.toUpperCase() === "NEW"
        ).length;
        setUnreadCount(unread);
      }
    } catch (err) {
      // Silent error for navbar badge polling
    }
  };

  const handleLogout = () => {
    logoutUser();
    showToast("Logged out successfully", "info");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar-wrapper">
      <div className="navbar-container">
        <Link to="/" className="brand-logo">
          <div className="logo-icon">
            <FaBuilding size={20} />
          </div>
          <span>LuxeEstates</span>
        </Link>

        <nav>
          <ul className="nav-links-desktop">
            <li>
              <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/search" className={`nav-link ${isActive("/search") ? "active" : ""}`}>
                Search
              </Link>
            </li>
            {user && user.role === "SELLER" && (
              <>
                <li>
                  <Link
                    to="/seller-inbox"
                    className={`nav-link ${isActive("/seller-inbox") ? "active" : ""}`}
                  >
                    <span>Inbox</span>
                    {unreadCount > 0 && (
                      <span className="nav-badge-pill">{unreadCount}</span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/add-property"
                    className={`nav-link ${isActive("/add-property") ? "active" : ""}`}
                  >
                    Add Property
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-properties"
                    className={`nav-link ${isActive("/my-properties") ? "active" : ""}`}
                  >
                    My Properties
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <div className="user-profile-actions">
          {user ? (
            <>
              <div className="user-badge">
                <div className="avatar-circle">
                  {user.userName ? user.userName.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="user-info">
                  <span className="user-name-text">{user.userName}</span>
                  <span className="user-role-text">{user.role}</span>
                </div>
              </div>
              <button
                className="logout-icon-btn"
                onClick={handleLogout}
                title="Logout"
              >
                <FaSignOutAlt size={16} />
              </button>
            </>
          ) : (
            <Link to="/login" className="auth-btn-primary">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;