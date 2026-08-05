import React from "react";

const StatusBadge = ({ status }) => {
  const getBadgeStyle = (statusVal) => {
    const s = statusVal ? statusVal.toUpperCase() : "NEW";
    switch (s) {
      // Enquiry Statuses
      case "NEW":
        return { bg: "#EFF6FF", text: "#2563EB", label: "New" };
      case "READ":
        return { bg: "#FFEDD5", text: "#C2410C", label: "Read" };
      case "REPLIED":
        return { bg: "#DCFCE7", text: "#15803D", label: "Replied" };
      case "CLOSED":
        return { bg: "#F1F5F9", text: "#64748B", label: "Closed" };

      // Property Statuses
      case "AVAILABLE":
        return { bg: "#DCFCE7", text: "#15803D", label: "Available" };
      case "SOLD":
        return { bg: "#FEE2E2", text: "#B91C1C", label: "Sold" };
      case "PENDING":
        return { bg: "#FEF3C7", text: "#B45309", label: "Pending" };

      default:
        return { bg: "#EFF6FF", text: "#2563EB", label: statusVal };
    }
  };

  const style = getBadgeStyle(status);

  return (
    <span
      style={{
        backgroundColor: style.bg,
        color: style.text,
        padding: "4px 12px",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: "700",
        letterSpacing: "0.03em",
        textTransform: "uppercase",
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: style.text,
        }}
      />
      {style.label}
    </span>
  );
};

export default StatusBadge;
