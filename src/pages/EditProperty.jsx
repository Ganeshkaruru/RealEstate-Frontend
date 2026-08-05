import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ImageUploader from "../components/ImageUploader";
import LoadingSkeleton from "../components/LoadingSkeleton";
import {
  getPropertyById,
  getPropertyMedia,
  updateProperty,
  uploadMedia,
} from "../services/propertyService";
import { getImageUrl } from "../services/api";
import { useToast } from "../components/Toast";
import "../css/addProperty.css";
import "../css/editProperty.css";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    bedrooms: "2",
    propertyType: "Apartment",
    status: "Available",
  });

  const [existingMedia, setExistingMedia] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadPropertyData();
  }, [id]);

  const loadPropertyData = async () => {
    try {
      setLoading(true);
      const prop = await getPropertyById(id);
      setFormData({
        title: prop.title || "",
        description: prop.description || "",
        location: prop.location || "",
        price: prop.price || "",
        bedrooms: prop.bedrooms || "2",
        propertyType: prop.propertyType || "Apartment",
        status: prop.status || "Available",
      });

      const media = await getPropertyMedia(id);
      setExistingMedia(Array.isArray(media) ? media : []);
    } catch (err) {
      console.error("Error loading property:", err);
      showToast("Unable to load property data", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleNewFilesSelected = (files) => {
    setNewFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveNewFile = (index) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.location) {
      showToast("Please fill in required fields", "error");
      return;
    }

    setUpdating(true);
    try {
      // 1. Update text fields
      await updateProperty(id, {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms, 10),
        propertyType: formData.propertyType,
        status: formData.status,
      });

      // 2. Upload any newly selected images
      if (newFiles.length > 0) {
        for (const file of newFiles) {
          try {
            await uploadMedia(id, file);
          } catch (mErr) {
            console.error("Failed to upload image:", mErr);
          }
        }
      }

      showToast("Property updated successfully!", "success");
      navigate("/my-properties");
    } catch (err) {
      console.error("Failed to update property:", err);
      const msg = err.response?.data?.message || "Failed to update property";
      showToast(msg, "error");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <Navbar />
        <div className="form-page-container">
          <LoadingSkeleton count={3} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-container">
      <Navbar />

      <main className="form-page-container">
        <div className="form-header">
          <h1 className="form-header-title">Edit Property Listing</h1>
          <p className="form-header-subtitle">
            Update pricing, property specifications, or add new high-resolution photos.
          </p>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          {/* Uploaded Gallery */}
          {existingMedia.length > 0 && (
            <div className="form-field">
              <label className="field-label">Current Property Photos</label>
              <div className="existing-gallery-grid">
                {existingMedia.map((m, idx) => (
                  <div key={idx} className="existing-gallery-item">
                    <img src={getImageUrl(m.mediaUrl)} alt={`media-${idx}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload More Images */}
          <div className="form-field">
            <label className="field-label">+ Upload More Images</label>
            <ImageUploader
              selectedFiles={newFiles}
              onFilesSelected={handleNewFilesSelected}
              onRemoveFile={handleRemoveNewFile}
            />
          </div>

          <div className="form-field">
            <label className="field-label">Property Title *</label>
            <input
              type="text"
              className="field-input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="form-grid-2">
            <div className="form-field">
              <label className="field-label">Location / Address *</label>
              <input
                type="text"
                className="field-input"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            <div className="form-field">
              <label className="field-label">Price (₹) *</label>
              <input
                type="number"
                className="field-input"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-field">
              <label className="field-label">Property Type</label>
              <select
                className="field-select"
                value={formData.propertyType}
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
              >
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
                <option value="Commercial">Commercial</option>
                <option value="Land">Land</option>
              </select>
            </div>

            <div className="form-field">
              <label className="field-label">Status</label>
              <select
                className="field-select"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Available">Available</option>
                <option value="Pending">Pending</option>
                <option value="Sold">Sold</option>
              </select>
            </div>
          </div>

          <div className="form-field">
            <label className="field-label">Bedrooms</label>
            <select
              className="field-select"
              value={formData.bedrooms}
              onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
            >
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4 BHK</option>
              <option value="5">5+ BHK</option>
            </select>
          </div>

          <div className="form-field">
            <label className="field-label">Description</label>
            <textarea
              className="field-textarea"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <button type="submit" className="submit-btn-large" disabled={updating}>
            {updating ? "Saving Changes..." : "Update Property"}
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default EditProperty;