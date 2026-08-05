import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaEnvelope, FaMapMarkerAlt, FaClock, FaReply, FaCheckDouble, FaTimesCircle } from "react-icons/fa";
import StatusBadge from "./StatusBadge";
import { getImageUrl } from "../services/api";
import "../css/modal.css";

const DEFAULT_BANNER = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80";

const EnquiryDetailsModal = ({
  isOpen,
  enquiry,
  onClose,
  onUpdateStatus,
}) => {
  if (!isOpen || !enquiry) return null;

  const property = enquiry.property || {};
  const buyer = enquiry.buyer || {};

  const coverUrl =
    property.media && property.media.length > 0
      ? getImageUrl(property.media[0].mediaUrl)
      : DEFAULT_BANNER;

  const formattedDate = enquiry.createdAt
    ? new Date(enquiry.createdAt).toLocaleString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Recently";

  return (
    <AnimatePresence>
      <div className="enquiry-modal-overlay" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="enquiry-modal-card"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Banner */}
          <div className="enquiry-modal-header">
            <img src={coverUrl} alt={property.title || "Property"} />
            <button className="modal-close-btn" onClick={onClose}>
              <FaTimes />
            </button>
          </div>

          {/* Modal Body */}
          <div className="enquiry-modal-body">
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <StatusBadge status={enquiry.status} />
                <span style={{ fontSize: "0.825rem", color: "#64748b", display: "flex", alignItems: "center", gap: 5 }}>
                  <FaClock /> {formattedDate}
                </span>
              </div>
              <h3 className="modal-prop-info-title">{property.title || "Property Details"}</h3>
              <p style={{ fontSize: "0.875rem", color: "#64748b", display: "flex", alignItems: "center", gap: 6 }}>
                <FaMapMarkerAlt color="#2563eb" /> {property.location || "Prime Location"}
              </p>
            </div>

            {/* Buyer Info Card */}
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8, display: "block" }}>
                Buyer Information
              </label>
              <div className="modal-buyer-card">
                <div className="buyer-avatar-circle" style={{ width: 48, height: 48, fontSize: "1.2rem" }}>
                  {buyer.userName ? buyer.userName.charAt(0).toUpperCase() : "B"}
                </div>
                <div>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>
                    {buyer.userName || "Interested Buyer"}
                  </h4>
                  <p style={{ fontSize: "0.875rem", color: "#64748b", display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                    <FaEnvelope color="#2563eb" /> {buyer.email || "buyer@example.com"}
                  </p>
                </div>
              </div>
            </div>

            {/* Enquiry Message */}
            <div>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8, display: "block" }}>
                Full Message
              </label>
              <div className="modal-message-box">
                "{enquiry.message || "No specific message attached with this enquiry."}"
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="enquiry-modal-footer">
            {enquiry.status === "NEW" && (
              <button
                className="action-btn-sm success"
                onClick={() => {
                  onUpdateStatus(enquiry.id, "READ");
                  onClose();
                }}
              >
                <FaCheckDouble /> Mark as Read
              </button>
            )}

            <a
              href={`mailto:${buyer.email}?subject=RE: Inquiry for ${property.title}`}
              className="action-btn-sm primary"
              onClick={() => {
                onUpdateStatus(enquiry.id, "REPLIED");
                onClose();
              }}
              style={{ textDecoration: "none" }}
            >
              <FaReply /> Reply via Email
            </a>

            {enquiry.status !== "CLOSED" && (
              <button
                className="action-btn-sm danger"
                onClick={() => {
                  onUpdateStatus(enquiry.id, "CLOSED");
                  onClose();
                }}
              >
                <FaTimesCircle /> Close Enquiry
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EnquiryDetailsModal;
