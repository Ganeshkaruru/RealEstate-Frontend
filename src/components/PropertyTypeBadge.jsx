import React from "react";
import { FaBuilding, FaHome, FaLandmark, FaStore } from "react-icons/fa";

const PropertyTypeBadge = ({ type }) => {
  const getIcon = (t) => {
    switch (t ? t.toUpperCase() : "") {
      case "APARTMENT":
        return <FaBuilding size={11} />;
      case "HOUSE":
      case "VILLA":
        return <FaHome size={11} />;
      case "COMMERCIAL":
        return <FaStore size={11} />;
      case "LAND":
        return <FaLandmark size={11} />;
      default:
        return <FaBuilding size={11} />;
    }
  };

  return (
    <span
      style={{
        backgroundColor: "#F1F5F9",
        color: "#475569",
        padding: "4px 10px",
        borderRadius: "8px",
        fontSize: "0.75rem",
        fontWeight: "600",
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      {getIcon(type)}
      {type || "Property"}
    </span>
  );
};

export default PropertyTypeBadge;
