import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ImageUploader from "../components/ImageUploader";
import { addProperty, uploadMedia } from "../services/propertyService";
import { useToast } from "../components/Toast";
import "../css/addProperty.css";

const AddProperty = () => {
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

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleFilesSelected = (newFiles) => {
    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.location) {
      showToast("Please fill in required fields (Title, Location, Price)", "error");
      return;
    }

    setSubmitting(true);
    try {
      // 1. Save property basic info
      const createdProp = await addProperty({
        title: formData.title,
        description: formData.description,
        location: formData.location,
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms, 10),
        propertyType: formData.propertyType,
        status: formData.status,
      });

      // 2. Upload media images if any selected
      if (selectedFiles.length > 0 && createdProp.id) {
        for (const file of selectedFiles) {
          try {
            await uploadMedia(createdProp.id, file);
          } catch (mErr) {
            console.error("Failed to upload image:", mErr);
          }
        }
      }

      showToast("Property created and published successfully!", "success");
      navigate("/my-properties");
    } catch (err) {
      console.error("Error adding property:", err);
      const msg = err.response?.data?.message || "Failed to create property";
      showToast(msg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <Navbar />

      <main className="form-page-container">
        <div className="form-header">
          <h1 className="form-header-title">List a New Luxury Property</h1>
          <p className="form-header-subtitle">
            Provide property details and upload high quality photos to showcase to buyers.
          </p>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          {/* Image Upload Section */}
          <div className="form-field">
            <label className="field-label">Property Photos</label>
            <ImageUploader
              selectedFiles={selectedFiles}
              onFilesSelected={handleFilesSelected}
              onRemoveFile={handleRemoveFile}
            />
          </div>

          <div className="form-field">
            <label className="field-label">Property Title *</label>
            <input
              type="text"
              className="field-input"
              placeholder="e.g. Modern Ocean View Villa in Bandra"
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
                placeholder="e.g. Bandra West, Mumbai"
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
                placeholder="e.g. 15000000"
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
              placeholder="Describe key features, furnishing, balcony view, proximity to schools/airports..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <button type="submit" className="submit-btn-large" disabled={submitting}>
            {submitting ? "Publishing Property..." : "Submit & Publish Listing"}
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default AddProperty;