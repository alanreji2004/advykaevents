import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, admin = false }) => {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";
  const isAdminAuthenticated = sessionStorage.getItem("isAdminAuthenticated") === "true";

  if (admin) {
    return isAdminAuthenticated ? children : <Navigate to="/adminlogin" />;
  } else {
    return isAuthenticated ? children : <Navigate to="/organizerlogin" />;
  }
};

export default ProtectedRoute;
