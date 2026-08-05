import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt, FaHome, FaBed, FaDollarSign } from "react-icons/fa";
import "../css/searchBar.css";

const SearchBar = ({ initialFilters = {} }) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(initialFilters.location || "");
  const [propertyType, setPropertyType] = useState(initialFilters.propertyType || "");
  const [bedrooms, setBedrooms] = useState(initialFilters.bedrooms || "");
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice || "");

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append("location", location);
    if (propertyType) params.append("propertyType", propertyType);
    if (bedrooms) params.append("bedrooms", bedrooms);
    if (maxPrice) params.append("maxPrice", maxPrice);

    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="search-bar-wrapper">
      <form className="search-bar-form" onSubmit={handleSearch}>
        <div className="search-field">
          <label className="search-label">
            <FaMapMarkerAlt color="#2563eb" /> Location
          </label>
          <input
            type="text"
            className="search-input"
            placeholder="City, State, or Landmark..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="search-field">
          <label className="search-label">
            <FaHome color="#2563eb" /> Property Type
          </label>
          <select
            className="search-input"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Commercial">Commercial</option>
            <option value="Land">Land</option>
          </select>
        </div>

        <div className="search-field">
          <label className="search-label">
            <FaBed color="#2563eb" /> Bedrooms
          </label>
          <select
            className="search-input"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          >
            <option value="">Any Beds</option>
            <option value="1">1+ BHK</option>
            <option value="2">2+ BHK</option>
            <option value="3">3+ BHK</option>
            <option value="4">4+ BHK</option>
          </select>
        </div>

        <div className="search-field">
          <label className="search-label">
            <FaDollarSign color="#2563eb" /> Max Price
          </label>
          <select
            className="search-input"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          >
            <option value="">Any Budget</option>
            <option value="5000000">Up to ₹50 Lakhs</option>
            <option value="10000000">Up to ₹1 Crore</option>
            <option value="25000000">Up to ₹2.5 Crores</option>
            <option value="50000000">Up to ₹5 Crores</option>
          </select>
        </div>

        <button type="submit" className="search-submit-btn">
          <FaSearch /> Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
