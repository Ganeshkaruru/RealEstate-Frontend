import api from "./api";

// Get All Properties (Paginated)
export const getProperties = async (page = 0, size = 12) => {
  const response = await api.get(`/properties?page=${page}&size=${size}`);
  return response.data;
};

// Search & Filter Properties
export const searchProperties = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.location) params.append("location", filters.location);
  if (filters.propertyType) params.append("propertyType", filters.propertyType);
  if (filters.minPrice) params.append("minPrice", filters.minPrice);
  if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
  if (filters.bedrooms) params.append("bedrooms", filters.bedrooms);

  const response = await api.get(`/properties/search?${params.toString()}`);
  return response.data;
};

// Get My Properties (Seller)
export const getMyProperties = async () => {
  const response = await api.get("/properties/my");
  return response.data;
};

// Get Single Property By ID
export const getPropertyById = async (id) => {
  const response = await api.get(`/properties/${id}`);
  return response.data;
};

// Get Detailed Property Info (Includes media list & seller info)
export const getPropertyDetails = async (id) => {
  const response = await api.get(`/properties/${id}/details`);
  return response.data;
};

// Add New Property
export const addProperty = async (propertyData) => {
  const response = await api.post("/properties", propertyData);
  return response.data;
};

// Upload Media for Property
export const uploadMedia = async (propertyId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(`/properties/${propertyId}/media`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Get Media List for Property
export const getPropertyMedia = async (propertyId) => {
  const response = await api.get(`/properties/${propertyId}/media`);
  return response.data;
};

// Update Property Details
export const updateProperty = async (id, propertyData) => {
  const response = await api.put(`/properties/${id}`, propertyData);
  return response.data;
};

// Delete Property
export const deleteProperty = async (id) => {
  const response = await api.delete(`/properties/${id}`);
  return response.data;
};