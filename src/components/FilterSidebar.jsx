import React from "react";
import { FaFilter, FaUndo } from "react-icons/fa";
import "../css/filterSidebar.css";

const FilterSidebar = ({ filters, onChange, onReset }) => {
  const handleChange = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <h3 className="filter-title">
          <FaFilter color="#2563eb" size={16} /> Filters
        </h3>
        <button className="reset-filter-btn" onClick={onReset}>
          Reset All
        </button>
      </div>

      {/* Location */}
      <div className="filter-group">
        <label className="filter-label">Location</label>
        <input
          type="text"
          className="filter-input-control"
          placeholder="e.g. Mumbai, Bangalore"
          value={filters.location || ""}
          onChange={(e) => handleChange("location", e.target.value)}
        />
      </div>

      {/* Property Type */}
      <div className="filter-group">
        <label className="filter-label">Property Type</label>
        <select
          className="filter-input-control"
          value={filters.propertyType || ""}
          onChange={(e) => handleChange("propertyType", e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Villa">Villa</option>
          <option value="Commercial">Commercial</option>
          <option value="Land">Land</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="filter-group">
        <label className="filter-label">Price Range (₹)</label>
        <div className="price-range-group">
          <input
            type="number"
            className="filter-input-control"
            placeholder="Min Price"
            value={filters.minPrice || ""}
            onChange={(e) => handleChange("minPrice", e.target.value)}
          />
          <input
            type="number"
            className="filter-input-control"
            placeholder="Max Price"
            value={filters.maxPrice || ""}
            onChange={(e) => handleChange("maxPrice", e.target.value)}
          />
        </div>
      </div>

      {/* Bedrooms */}
      <div className="filter-group">
        <label className="filter-label">Bedrooms</label>
        <select
          className="filter-input-control"
          value={filters.bedrooms || ""}
          onChange={(e) => handleChange("bedrooms", e.target.value)}
        >
          <option value="">Any Bedrooms</option>
          <option value="1">1 BHK</option>
          <option value="2">2 BHK</option>
          <option value="3">3 BHK</option>
          <option value="4">4+ BHK</option>
        </select>
      </div>

      {/* Status */}
      <div className="filter-group">
        <label className="filter-label">Status</label>
        <select
          className="filter-input-control"
          value={filters.status || ""}
          onChange={(e) => handleChange("status", e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Available">Available</option>
          <option value="Pending">Pending</option>
          <option value="Sold">Sold</option>
        </select>
      </div>
    </aside>
  );
};

export default FilterSidebar;
