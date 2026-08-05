import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterSidebar from "../components/FilterSidebar";
import PropertyCard from "../components/PropertyCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { searchProperties } from "../services/propertyService";
import "../css/search.css";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    propertyType: searchParams.get("propertyType") || "",
    bedrooms: searchParams.get("bedrooms") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    status: searchParams.get("status") || "",
  });

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFilteredProperties();
  }, [filters]);

  const fetchFilteredProperties = async () => {
    try {
      setLoading(true);
      const res = await searchProperties(filters);
      let list = Array.isArray(res) ? res : res.content || [];

      // Additional client-side status filter if API doesn't support status param directly
      if (filters.status) {
        list = list.filter(
          (p) => p.status && p.status.toLowerCase() === filters.status.toLowerCase()
        );
      }

      setProperties(list);
    } catch (err) {
      console.error("Failed to search properties:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      location: "",
      propertyType: "",
      bedrooms: "",
      minPrice: "",
      maxPrice: "",
      status: "",
    });
  };

  return (
    <div className="page-container">
      <Navbar />

      <main className="search-page-container">
        <div className="search-page-header">
          <h1 className="search-page-title">Explore Real Estate Properties</h1>
          <p className="search-page-subtitle">
            Filter by location, price, property type, and bedroom requirements.
          </p>
        </div>

        <div className="search-layout">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
          />

          <div>
            <div className="search-results-bar">
              <div className="results-count">
                Showing {properties.length} {properties.length === 1 ? "Property" : "Properties"}
              </div>
            </div>

            {loading ? (
              <LoadingSkeleton count={6} />
            ) : properties.length > 0 ? (
              <div className="properties-grid">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>No Matching Properties Found</h3>
                <p>Try broadening your filters or searching a different city location.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Search;
