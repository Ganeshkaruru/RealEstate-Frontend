import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaInbox, FaExclamationTriangle, FaFilter, FaSortAmountDown } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EnquiryCard from "../components/EnquiryCard";
import EnquiryDetailsModal from "../components/EnquiryDetailsModal";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { getSellerEnquiries, updateEnquiryStatus } from "../services/enquiryService";
import { useToast } from "../components/Toast";
import "../css/sellerInbox.css";

const SellerInbox = () => {
  const { showToast } = useToast();

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("NEWEST");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadEnquiries();
  }, []);

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await getSellerEnquiries();
      setEnquiries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load seller enquiries:", err);
      setError(true);
      showToast("Failed to fetch seller inbox enquiries", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (enquiryId, newStatus) => {
    try {
      const updated = await updateEnquiryStatus(enquiryId, newStatus);
      setEnquiries((prev) =>
        prev.map((e) => (e.id === enquiryId ? { ...e, status: newStatus } : e))
      );
      showToast(`Enquiry status updated to ${newStatus}`, "success");
    } catch (err) {
      console.error("Failed to update status:", err);
      showToast("Unable to update enquiry status", "error");
    }
  };

  const handleOpenDetails = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsModalOpen(true);
    // Mark as READ automatically if currently NEW
    if (enquiry.status === "NEW") {
      handleUpdateStatus(enquiry.id, "READ");
    }
  };

  // Filter & Search Logic
  const filteredEnquiries = enquiries
    .filter((item) => {
      const query = searchQuery.toLowerCase();
      const buyerName = item.buyer?.userName?.toLowerCase() || "";
      const propTitle = item.property?.title?.toLowerCase() || "";
      const propLoc = item.property?.location?.toLowerCase() || "";

      const matchesSearch =
        buyerName.includes(query) || propTitle.includes(query) || propLoc.includes(query);

      const matchesStatus =
        statusFilter === "ALL" ||
        (item.status && item.status.toUpperCase() === statusFilter.toUpperCase());

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return sortOrder === "NEWEST" ? dateB - dateA : dateA - dateB;
    });

  const counts = {
    ALL: enquiries.length,
    NEW: enquiries.filter((e) => e.status === "NEW").length,
    READ: enquiries.filter((e) => e.status === "READ").length,
    REPLIED: enquiries.filter((e) => e.status === "REPLIED").length,
    CLOSED: enquiries.filter((e) => e.status === "CLOSED").length,
  };

  return (
    <div className="page-container">
      <Navbar />

      <main className="inbox-page-wrapper">
        {/* Header */}
        <div className="inbox-header-section">
          <h1 className="inbox-title">Seller Inbox</h1>
          <p className="inbox-subtitle">
            Manage enquiries received for your listed properties.
          </p>
        </div>

        {/* Status Quick Filter Tabs */}
        <div className="status-tabs-row">
          {["ALL", "NEW", "READ", "REPLIED", "CLOSED"].map((st) => (
            <button
              key={st}
              className={`status-tab-btn ${statusFilter === st ? "active" : ""}`}
              onClick={() => setStatusFilter(st)}
            >
              {st === "ALL" ? "All Enquiries" : st} ({counts[st] || 0})
            </button>
          ))}
        </div>

        {/* Search & Sorting Control Bar */}
        <div className="inbox-controls-bar">
          <div className="inbox-search-box">
            <FaSearch color="#94a3b8" />
            <input
              type="text"
              className="inbox-search-input"
              placeholder="Search by buyer name, property title, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="inbox-filter-group">
            <select
              className="inbox-select-control"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="NEWEST">Newest First</option>
              <option value="OLDEST">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Body Content */}
        {loading ? (
          <LoadingSkeleton count={6} />
        ) : error ? (
          <div className="inbox-error-card">
            <FaExclamationTriangle size={36} style={{ marginBottom: 12 }} />
            <h3>Unable to Load Enquiries</h3>
            <p>Please check your backend connection or try refreshing.</p>
            <button className="retry-btn" onClick={loadEnquiries}>
              Retry Loading
            </button>
          </div>
        ) : filteredEnquiries.length > 0 ? (
          <div className="enquiries-cards-grid">
            {filteredEnquiries.map((enquiry) => (
              <EnquiryCard
                key={enquiry.id}
                enquiry={enquiry}
                onViewDetails={handleOpenDetails}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </div>
        ) : (
          <div className="inbox-empty-card">
            <FaInbox size={56} color="#cbd5e1" />
            <h3>No enquiries received yet.</h3>
            <p>
              When interested buyers inquire about your properties, their messages will appear here.
            </p>
          </div>
        )}
      </main>

      {/* Details Modal */}
      <EnquiryDetailsModal
        isOpen={isModalOpen}
        enquiry={selectedEnquiry}
        onClose={() => setIsModalOpen(false)}
        onUpdateStatus={handleUpdateStatus}
      />

      <Footer />
    </div>
  );
};

export default SellerInbox;
