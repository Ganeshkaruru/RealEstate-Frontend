import React from "react";
import "../css/loadingSkeleton.css";

const LoadingSkeleton = ({ count = 6 }) => {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-image" />
          <div className="skeleton-content">
            <div className="skeleton-line title" />
            <div className="skeleton-line short" />
            <div className="skeleton-line price" />
            <div className="skeleton-line" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
