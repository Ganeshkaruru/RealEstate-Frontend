import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaShieldAlt, FaHandshake, FaHeadset, FaBuilding } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import SearchBar from "../components/SearchBar";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { getProperties } from "../services/propertyService";
import "../css/home.css";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const res = await getProperties(0, 12);
      if (res && res.content) {
        setProperties(res.content);
      } else if (Array.isArray(res)) {
        setProperties(res);
      }
    } catch (err) {
      console.error("Failed to load properties:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hero-title"
        >
          Discover Luxury Living Designed For Extraordinary Moments
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="hero-subtitle"
        >
          Explore thousands of handpicked villas, apartments, and commercial spaces across top prime locations.
        </motion.p>

        <SearchBar />
      </section>

      {/* Main Container */}
      <main className="home-content-container">
        {/* Stats Banner */}
        <div className="stats-banner">
          <div>
            <div className="stat-number">12,500+</div>
            <div className="stat-label">Verified Listings</div>
          </div>
          <div>
            <div className="stat-number">8,400+</div>
            <div className="stat-label">Happy Families</div>
          </div>
          <div>
            <div className="stat-number">150+</div>
            <div className="stat-label">Prime Cities</div>
          </div>
          <div>
            <div className="stat-number">0%</div>
            <div className="stat-label">Brokerage Fee Option</div>
          </div>
        </div>

        {/* Featured Properties */}
        <div className="section-header">
          <div className="section-title-box">
            <span className="section-tag">Handpicked Selection</span>
            <h2 className="section-title">Featured Luxury Properties</h2>
          </div>
          <Link to="/search" className="view-all-link">
            Explore All Properties <FaArrowRight />
          </Link>
        </div>

        {loading ? (
          <LoadingSkeleton count={6} />
        ) : properties.length > 0 ? (
          <div className="properties-grid">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <FaBuilding size={40} color="#cbd5e1" style={{ marginBottom: 12 }} />
            <h3>No Properties Found</h3>
            <p>Check back soon or add your first property listing!</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;