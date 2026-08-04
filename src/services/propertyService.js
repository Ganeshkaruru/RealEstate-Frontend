import axios from "axios";

const BASE_URL = "http://localhost:8081";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

// ==========================
// Get All Properties
// ==========================
export const getProperties = async (page = 0, size = 6) => {

    const response = await axios.get(
        `${BASE_URL}/properties?page=${page}&size=${size}`,
        getAuthHeader()
    );

    return response.data;
};

// ==========================
// Get My Properties
// ==========================
export const getMyProperties = async () => {

    const response = await axios.get(
        `${BASE_URL}/properties/my`,
        getAuthHeader()
    );

    return response.data;
};

// ==========================
// Get Property By Id
// ==========================
export const getPropertyById = async (id) => {

    const response = await axios.get(
        `${BASE_URL}/properties/${id}`,
        getAuthHeader()
    );

    return response.data;
};

// ==========================
// Add Property
// ==========================
export const addProperty = async (propertyData) => {

    const response = await axios.post(
        `${BASE_URL}/properties`,
        propertyData,
        getAuthHeader()
    );

    return response.data;
};

// ==========================
// Upload Media
// ==========================
export const uploadMedia = async (propertyId, file) => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await axios.post(
        `${BASE_URL}/properties/${propertyId}/media`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};

// ==========================
// Update Property
// ==========================
export const updateProperty = async (id, propertyData) => {

    const response = await axios.put(
        `${BASE_URL}/properties/${id}`,
        propertyData,
        getAuthHeader()
    );

    return response.data;
};

// ==========================
// Delete Property
// ==========================
export const deleteProperty = async (id) => {

    await axios.delete(
        `${BASE_URL}/properties/${id}`,
        getAuthHeader()
    );
};