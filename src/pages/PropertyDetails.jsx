import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaPhoneAlt,
  FaEnvelope,
  FaPen,
  FaTrashAlt,
  FaWifi,
  FaParking,
  FaSwimmingPool,
  FaDumbbell,
  FaShieldAlt,
  FaSnowflake,
  FaTree,
  FaBolt,
  FaPaperPlane,
  FaTimes,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyGallery from "../components/PropertyGallery";
import StatusBadge from "../components/StatusBadge";
import PropertyTypeBadge from "../components/PropertyTypeBadge";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { getPropertyDetails, deleteProperty } from "../services/propertyService";
import { createEnquiry } from "../services/enquiryService";
import { getCurrentUser } from "../services/authService";
import { useToast } from "../components/Toast";
import "../css/propertyDetails.css";
import "../css/modal.css";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const currentUser = getCurrentUser();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Contact Seller / Enquiry Modal state
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [sendingInquiry, setSendingInquiry] = useState(false);

  useEffect(() => {
    loadDetails();
  }, [id]);

  const loadDetails = async () => {
    try {
      setLoading(true);
      const res = await getPropertyDetails(id);
      setDetails(res);
      const pTitle = res.property?.title || res.title || "this property";
      setInquiryMessage(`Hi, I am interested in ${pTitle}. Please share more details and arrange a visit.`);
    } catch (err) {
      console.error("Error loading property details:", err);
      showToast("Unable to load property details", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true);
      await deleteProperty(id);
      showToast("Property deleted successfully", "success");
      setIsDeleteModalOpen(false);
      navigate("/my-properties");
    } catch (err) {
      showToast("Failed to delete property", "error");
    } finally {
      setDeleting(false);
    }
  };

  const handleOpenInquiryModal = () => {
    if (!currentUser) {
      showToast("Please sign in to send an enquiry", "info");
      navigate("/login");
      return;
    }
    setIsInquiryModalOpen(true);
  };

  const handleSendInquirySubmit = async (e) => {
    e.preventDefault();
    if (!inquiryMessage.trim()) {
      showToast("Please enter an enquiry message", "error");
      return;
    }

    setSendingInquiry(true);
    try {
      await createEnquiry(id, inquiryMessage);
      showToast("Enquiry sent successfully! The seller has received your message in their inbox.", "success");
      setIsInquiryModalOpen(false);
    } catch (err) {
      console.error("Failed to send enquiry:", err);
      const msg = err.response?.data?.message || "Failed to send enquiry to seller";
      showToast(msg, "error");
    } finally {
      setSendingInquiry(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <Navbar />
        <div className="details-page-wrapper">
          <LoadingSkeleton count={3} />
        </div>
        <Footer />
      </div>
    );
  }

  if (!details) {
    return (
      <div className="page-container">
        <Navbar />
        <div className="details-page-wrapper" style={{ textAlign: "center", padding: "100px 20px" }}>
          <h2>Property Not Found</h2>
          <button className="auth-btn-primary" onClick={() => navigate("/")} style={{ marginTop: 20 }}>
            Back to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const property = details.property || details;
  const mediaList = details.mediaList || details.media || [];
  const seller = details.seller || property.seller;

  const isOwner =
    currentUser &&
    currentUser.role === "SELLER" &&
    seller &&
    (seller.email === currentUser.email || seller.id == currentUser.id);

  const amenities = [
    { name: "High-Speed WiFi", icon: <FaWifi /> },
    { name: "Reserved Parking", icon: <FaParking /> },
    { name: "Swimming Pool", icon: <FaSwimmingPool /> },
    { name: "Fitness Gym", icon: <FaDumbbell /> },
    { name: "24/7 Security", icon: <FaShieldAlt /> },
    { name: "Air Conditioning", icon: <FaSnowflake /> },
    { name: "Private Garden", icon: <FaTree /> },
    { name: "Power Backup", icon: <FaBolt /> },
  ];

  return (
    <div className="page-container">
      <Navbar />

      <main className="details-page-wrapper">
        {/* Top Header */}
        <div className="details-header-row">
          <div className="details-title-box">
            <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <PropertyTypeBadge type={property.propertyType} />
              <StatusBadge status={property.status} />
            </div>
            <h1>{property.title}</h1>
            <div className="details-location-tag">
              <FaMapMarkerAlt color="#2563eb" />
              <span>{property.location}</span>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div className="details-price-badge">
              ₹ {property.price ? Number(property.price).toLocaleString("en-IN") : "0"}
            </div>
            {isOwner && (
              <div style={{ display: "flex", gap: 10, marginTop: 12, justifyContent: "flex-end" }}>
                <button
                  className="circle-action-btn edit"
                  title="Edit Property"
                  onClick={() => navigate(`/edit-property/${property.id}`)}
                >
                  <FaPen />
                </button>
                <button
                  className="circle-action-btn delete"
                  title="Delete Property"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Gallery */}
        <PropertyGallery mediaList={mediaList} />

        {/* Main Grid */}
        <div className="details-layout">
          <div>
            {/* Overview Specs */}
            <div className="details-section-card">
              <h3 className="details-section-title">Property Highlights</h3>
              <div className="specs-grid">
                <div className="spec-card-item">
                  <div className="spec-icon-circle"><FaBed /></div>
                  <div>
                    <div className="spec-info-label">Bedrooms</div>
                    <div className="spec-info-value">{property.bedrooms || 0} Beds</div>
                  </div>
                </div>

                <div className="spec-card-item">
                  <div className="spec-icon-circle"><FaBath /></div>
                  <div>
                    <div className="spec-info-label">Bathrooms</div>
                    <div className="spec-info-value">{Math.max(1, Math.round((property.bedrooms || 1) * 0.75))} Baths</div>
                  </div>
                </div>

                <div className="spec-card-item">
                  <div className="spec-icon-circle"><FaRulerCombined /></div>
                  <div>
                    <div className="spec-info-label">Total Area</div>
                    <div className="spec-info-value">{(property.bedrooms || 2) * 450} sqft</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="details-section-card">
              <h3 className="details-section-title">Property Description</h3>
              <p style={{ lineHeight: 1.7, color: "#475569", fontSize: "0.98rem" }}>
                {property.description || "No description provided for this luxury listing."}
              </p>
            </div>

            {/* Amenities */}
            <div className="details-section-card">
              <h3 className="details-section-title">Features & Amenities</h3>
              <div className="amenities-grid">
                {amenities.map((item, idx) => (
                  <div key={idx} className="amenity-chip">
                    <span style={{ color: "#2563eb" }}>{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Sticky Contact Card */}
          <aside className="sticky-contact-card">
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: 20, color: "#0f172a" }}>
              Interested in this Property?
            </h3>

            <div className="seller-avatar-row">
              <div className="seller-lg-avatar">
                {seller?.userName ? seller.userName.charAt(0).toUpperCase() : "S"}
              </div>
              <div>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>
                  {seller?.userName || "Property Host"}
                </h4>
                <p style={{ fontSize: "0.85rem", color: "#64748b" }}>Verified Seller</p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.9rem", color: "#475569" }}>
                <FaEnvelope color="#2563eb" /> <span>{seller?.email || "seller@luxeestates.com"}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.9rem", color: "#475569" }}>
                <FaPhoneAlt color="#2563eb" /> <span>+91 98765 43210</span>
              </div>
            </div>

            {!isOwner && (
              <button
                className="contact-seller-btn"
                onClick={handleOpenInquiryModal}
              >
                <FaEnvelope /> Contact Seller
              </button>
            )}
          </aside>
        </div>
      </main>

      {/* Send Enquiry Modal */}
      <AnimatePresence>
        {isInquiryModalOpen && (
          <div className="enquiry-modal-overlay" onClick={() => setIsInquiryModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="enquiry-modal-card"
              style={{ maxWidth: 520 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ padding: "24px 28px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f172a" }}>Send Enquiry to Seller</h3>
                <button className="modal-close-btn" style={{ position: "relative", top: 0, right: 0 }} onClick={() => setIsInquiryModalOpen(false)}>
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSendInquirySubmit} style={{ padding: "28px" }}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: 6 }}>
                    Target Property
                  </label>
                  <input
                    type="text"
                    disabled
                    value={property.title}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1px solid #cbd5e1", background: "#f8fafc", fontWeight: 600 }}
                  />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: 700, color: "#334155", display: "block", marginBottom: 6 }}>
                    Your Message to Seller *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="Type your message or questions about this property..."
                    style={{ width: "100%", padding: "12px 14px", borderRadius: 14, border: "1px solid #cbd5e1", fontSize: "0.95rem", resize: "vertical", outline: "none" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sendingInquiry}
                  className="contact-seller-btn"
                  style={{ width: "100%", borderRadius: 14, padding: 14 }}
                >
                  <FaPaperPlane /> {sendingInquiry ? "Sending Enquiry..." : "Send Enquiry Now"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        title={property.title}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        loading={deleting}
      />

      <Footer />
    </div>
  );
};

export default PropertyDetails;