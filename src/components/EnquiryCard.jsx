import React from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaEye,
  FaCheckDouble,
  FaReply,
  FaTimesCircle,
} from "react-icons/fa";
import StatusBadge from "./StatusBadge";
import { getImageUrl } from "../services/api";
import "../css/enquiryCard.css";

const DEFAULT_THUMB = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=300&q=80";

const EnquiryCard = ({
  enquiry,
  onViewDetails,
  onUpdateStatus,
}) => {
  const property = enquiry.property || {};
  const buyer = enquiry.buyer || {};

  const thumbUrl =
    property.media && property.media.length > 0
      ? getImageUrl(property.media[0].mediaUrl)
      : DEFAULT_THUMB;

  const formattedDate = enquiry.createdAt
    ? new Date(enquiry.createdAt).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Recently";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="enquiry-card-wrapper"
    >
      {/* Top Property Info Header */}
      <div className="enquiry-card-header">
        <div className="property-thumb-box">
          <img src={thumbUrl} alt={property.title || "Property"} />
        </div>
        <div className="property-meta-info">
          <h4 className="enquiry-prop-title">{property.title || "Luxury Property"}</h4>
          <div className="enquiry-prop-location">
            <FaMapMarkerAlt color="#2563eb" size={12} />
            <span>{property.location || "Prime Location"}</span>
          </div>
        </div>
        <StatusBadge status={enquiry.status} />
      </div>

      {/* Buyer Info Strip */}
      <div className="buyer-info-box">
        <div className="buyer-avatar-circle">
          {buyer.userName ? buyer.userName.charAt(0).toUpperCase() : "B"}
        </div>
        <div className="buyer-details-column">
          <span className="buyer-name-text">{buyer.userName || "Interested Buyer"}</span>
          <div className="buyer-contact-row">
            <span>
              <FaEnvelope size={11} color="#64748b" /> {buyer.email || "buyer@example.com"}
            </span>
          </div>
        </div>
      </div>

      {/* Message Snippet */}
      <div className="message-snippet-box">
        "{enquiry.message || "I am interested in this property. Please share details."}"
      </div>

      {/* Card Footer Actions */}
      <div className="enquiry-card-footer">
        <div className="enquiry-timestamp">
          <FaClock size={12} />
          <span>{formattedDate}</span>
        </div>

        <div className="card-action-btn-group">
          <button
            className="action-btn-sm secondary"
            onClick={() => onViewDetails(enquiry)}
          >
            <FaEye /> View Details
          </button>

          {enquiry.status === "NEW" && (
            <button
              className="action-btn-sm success"
              onClick={() => onUpdateStatus(enquiry.id, "READ")}
              title="Mark as Read"
            >
              <FaCheckDouble /> Mark Read
            </button>
          )}

          <a
            href={`mailto:${buyer.email}?subject=RE: Inquiry for ${property.title}`}
            className="action-btn-sm primary"
            onClick={() => onUpdateStatus(enquiry.id, "REPLIED")}
            style={{ textDecoration: "none" }}
          >
            <FaReply /> Reply
          </a>

          {enquiry.status !== "CLOSED" && (
            <button
              className="action-btn-sm danger"
              onClick={() => onUpdateStatus(enquiry.id, "CLOSED")}
              title="Close Enquiry"
            >
              <FaTimesCircle /> Close
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EnquiryCard;
