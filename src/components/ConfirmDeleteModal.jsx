import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";
import "../css/confirmDeleteModal.css";

const ConfirmDeleteModal = ({ isOpen, title, onClose, onConfirm, loading }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-icon">
            <FaTrashAlt size={26} />
          </div>
          <h3 className="modal-title">Delete Property?</h3>
          <p className="modal-description">
            Are you sure you want to delete <strong>"{title}"</strong>? This action cannot be undone.
          </p>
          <div className="modal-actions">
            <button className="modal-btn cancel" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button className="modal-btn delete" onClick={onConfirm} disabled={loading}>
              {loading ? "Deleting..." : "Delete Property"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmDeleteModal;
