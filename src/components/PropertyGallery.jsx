import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes, FaExpand } from "react-icons/fa";
import { getImageUrl } from "../services/api";
import "../css/propertyGallery.css";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80";

const PropertyGallery = ({ mediaList = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const images = mediaList.length > 0
    ? mediaList.map((m) => getImageUrl(m.mediaUrl))
    : [DEFAULT_IMAGE];

  const handlePrev = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="gallery-container">
      {/* Airbnb style layout */}
      <div className="airbnb-grid" onClick={() => setIsLightboxOpen(true)}>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <img
            src={images[selectedIndex] || DEFAULT_IMAGE}
            alt="Property Main"
            className="main-feature-img"
          />
        </div>

        {images.length > 1 && (
          <div className="sub-grid">
            {images.slice(1, 5).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Property preview ${idx + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(idx + 1);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="thumbnail-strip">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`thumb-item ${selectedIndex === idx ? "active" : ""}`}
              onClick={() => setSelectedIndex(idx)}
            >
              <img src={img} alt={`Thumb ${idx}`} />
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="lightbox-modal">
          <button className="lightbox-close" onClick={() => setIsLightboxOpen(false)}>
            <FaTimes />
          </button>

          {images.length > 1 && (
            <>
              <button className="lightbox-nav prev" onClick={handlePrev}>
                <FaChevronLeft />
              </button>
              <button className="lightbox-nav next" onClick={handleNext}>
                <FaChevronRight />
              </button>
            </>
          )}

          <div className="lightbox-image-container">
            <img src={images[selectedIndex]} alt="Fullscreen Property" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyGallery;
