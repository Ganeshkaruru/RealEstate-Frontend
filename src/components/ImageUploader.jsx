import React, { useState } from "react";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import "../css/imageUploader.css";

const ImageUploader = ({ selectedFiles = [], onFilesSelected, onRemoveFile }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/")
      );
      onFilesSelected(files);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      onFilesSelected(files);
    }
  };

  return (
    <div className="uploader-container">
      <div
        className={`dropzone ${isDragging ? "active" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input").click()}
      >
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div className="uploader-icon">
          <FaCloudUploadAlt />
        </div>
        <div className="uploader-text">
          Drag & Drop property photos here or <span className="browse-btn">Browse</span>
        </div>
        <div className="uploader-subtext">Supports PNG, JPG, JPEG, WEBP (Multiple images allowed)</div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="preview-grid">
          {selectedFiles.map((fileObj, index) => {
            const previewUrl =
              fileObj instanceof File
                ? URL.createObjectURL(fileObj)
                : fileObj.url || fileObj;

            return (
              <div key={index} className="preview-item">
                <img src={previewUrl} alt={`preview-${index}`} />
                <button
                  type="button"
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFile(index);
                  }}
                >
                  <FaTimes size={12} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
