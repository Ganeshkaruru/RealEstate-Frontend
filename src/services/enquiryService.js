import api from "./api";

// Fetch enquiries received for logged-in seller's properties
export const getSellerEnquiries = async () => {
  const response = await api.get("/enquiries/seller");
  return response.data;
};

// Fetch enquiries sent by logged-in buyer
export const getBuyerEnquiries = async () => {
  const response = await api.get("/enquiries/buyer");
  return response.data;
};

// Send a new enquiry for a property
export const createEnquiry = async (propertyId, message) => {
  const response = await api.post(
    `/enquiries/${propertyId}?message=${encodeURIComponent(message)}`,
    { message }
  );
  return response.data;
};

// Update enquiry status (NEW, READ, REPLIED, CLOSED)
export const updateEnquiryStatus = async (enquiryId, status) => {
  const response = await api.put(
    `/enquiries/${enquiryId}/status?status=${encodeURIComponent(status)}`,
    { status }
  );
  return response.data;
};
