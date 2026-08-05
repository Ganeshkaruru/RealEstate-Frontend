import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaBed, FaPen, FaTrashAlt, FaBath, FaRulerCombined } from "react-icons/fa";
import StatusBadge from "./StatusBadge";
import PropertyTypeBadge from "./PropertyTypeBadge";
import { getImageUrl } from "../services/api";
import "../css/propertyCard.css";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80";

const PropertyCard = ({ property, showActions = false, onDelete }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  const imageSrc =
    property.media && property.media.length > 0
      ? getImageUrl(property.media[0].mediaUrl)
      : DEFAULT_IMAGE;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="property-card-wrapper"
      onClick={handleCardClick}
    >
      <div className="card-image-box">
        <img src={imageSrc} alt={property.title} loading="lazy" />
        <div className="card-badges-overlay">
          <PropertyTypeBadge type={property.propertyType} />
          <StatusBadge status={property.status} />
        </div>
      </div>

      <div className="card-content">
        <div className="card-title-row">
          <h3 className="card-title">{property.title}</h3>

          {showActions && (
            <div className="card-action-btns" onClick={(e) => e.stopPropagation()}>
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
                onClick={() => onDelete && onDelete(property)}
              >
                <FaTrashAlt />
              </button>
            </div>
          )}
        </div>

        <div className="card-location">
          <FaMapMarkerAlt color="#2563eb" size={13} />
          <span>{property.location || "Prime Location"}</span>
        </div>

        <div className="card-price">
          ₹ {property.price ? Number(property.price).toLocaleString("en-IN") : "0"}
        </div>

        <div className="card-footer-specs">
          <div className="spec-item">
            <FaBed color="#64748b" />
            <span>{property.bedrooms || 0} Beds</span>
          </div>
          <div className="spec-item">
            <FaBath color="#64748b" />
            <span>{Math.max(1, Math.round((property.bedrooms || 1) * 0.75))} Baths</span>
          </div>
          <div className="spec-item">
            <FaRulerCombined color="#64748b" />
            <span>{(property.bedrooms || 2) * 450} sqft</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;