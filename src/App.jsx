import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PropertyDetails from "./pages/PropertyDetails";
import AddProperty from "./pages/AddProperty";
import MyProperties from "./pages/MyProperties";
import EditProperty from "./pages/EditProperty";
import SellerInbox from "./pages/SellerInbox";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastProvider } from "./components/Toast";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/property/:id" element={<PropertyDetails />} />

          {/* Protected Seller Routes */}
          <Route
            path="/seller-inbox"
            element={
              <ProtectedRoute requiredRole="SELLER">
                <SellerInbox />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-property"
            element={
              <ProtectedRoute requiredRole="SELLER">
                <AddProperty />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-properties"
            element={
              <ProtectedRoute requiredRole="SELLER">
                <MyProperties />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-property/:id"
            element={
              <ProtectedRoute requiredRole="SELLER">
                <EditProperty />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;