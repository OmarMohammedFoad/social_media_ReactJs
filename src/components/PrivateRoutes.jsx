import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/authContext";
export const PrivateRoutes = () => {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};
