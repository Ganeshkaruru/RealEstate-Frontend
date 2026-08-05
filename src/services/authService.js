import api from "./api";

export const registerUser = async (userData) => {
  const response = await api.post("/register", userData);
  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await api.post("/login", loginData);
  if (response.data && response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userId", response.data.id);
    localStorage.setItem("userName", response.data.userName);
    localStorage.setItem("email", response.data.email);
    localStorage.setItem("role", response.data.role);
  }
  return response.data;
};

export const logoutUser = () => {
  localStorage.clear();
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  return {
    id: localStorage.getItem("userId"),
    userName: localStorage.getItem("userName"),
    email: localStorage.getItem("email"),
    role: localStorage.getItem("role"),
    token: token
  };
};