import React from "react";
import { Link } from "react-router-dom";
import { FaBuilding, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "../css/footer.css";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-brand-col">
          <div className="footer-logo">
            <FaBuilding color="#2563eb" />
            <span>LuxeEstates</span>
          </div>
          <p className="footer-desc">
            Discover luxury residential apartments, villas, and commercial real estate. Designed for discerning buyers and sellers looking for exceptional living experiences.
          </p>
        </div>

        <div>
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search Properties</Link></li>
            <li><Link to="/login">Sign In</Link></li>
            <li><Link to="/register">Create Account</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Property Types</h4>
          <ul className="footer-links">
            <li><Link to="/search?propertyType=Apartment">Apartments</Link></li>
            <li><Link to="/search?propertyType=Villa">Luxury Villas</Link></li>
            <li><Link to="/search?propertyType=House">Houses</Link></li>
            <li><Link to="/search?propertyType=Commercial">Commercial</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Newsletter</h4>
          <p className="footer-desc">Subscribe to receive exclusive luxury property updates.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" className="newsletter-input" placeholder="Your email address..." />
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} LuxeEstates. All rights reserved.</p>
        <p>Built with React, Vite & Framer Motion</p>
      </div>
    </footer>
  );
};

export default Footer;
