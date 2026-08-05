import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaBuilding } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { getMyProperties, deleteProperty } from "../services/propertyService";
import { useToast } from "../components/Toast";
import "../css/myProperties.css";

const MyProperties = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadMyProperties();
  }, []);

  const loadMyProperties = async () => {
    try {
      setLoading(true);
      const res = await getMyProperties();
      setProperties(Array.isArray(res) ? res : res.content || []);
    } catch (err) {
      console.error("Failed to fetch seller properties:", err);
      showToast("Unable to load your properties", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (property) => {
    setSelectedProperty(property);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProperty) return;
    try {
      setDeleting(true);
      await deleteProperty(selectedProperty.id);
      showToast("Property deleted successfully", "success");
      setProperties((prev) => prev.filter((p) => p.id !== selectedProperty.id));
      setIsDeleteModalOpen(false);
      setSelectedProperty(null);
    } catch (err) {
      showToast("Failed to delete property", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="page-container">
      <Navbar />

      <main className="my-properties-container">
        <div className="my-properties-header">
          <div>
            <h1 className="my-properties-title">My Properties</h1>
            <p style={{ color: "#64748b", marginTop: 4 }}>Manage and track your active property listings.</p>
          </div>
          <Link to="/add-property" className="add-new-btn">
            <FaPlus /> Add New Property
          </Link>
        </div>

        {loading ? (
          <LoadingSkeleton count={6} />
        ) : properties.length > 0 ? (
          <div className="properties-grid">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                showActions={true}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <FaBuilding size={48} color="#cbd5e1" style={{ marginBottom: 16 }} />
            <h3>You Haven't Added Any Properties Yet</h3>
            <p>List your luxury apartment, house, or commercial space in seconds!</p>
            <button
              className="auth-btn-primary"
              onClick={() => navigate("/add-property")}
              style={{ marginTop: 20 }}
            >
              Add Property Now
            </button>
          </div>
        )}
      </main>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        title={selectedProperty?.title || ""}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={deleting}
      />

      <Footer />
    </div>
  );
};

export default MyProperties;