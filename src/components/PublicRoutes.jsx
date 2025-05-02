import { useAuth } from "../context/authContext";
import { Navigate, Outlet } from "react-router"

export const PublicRoutes = () => {
  const { currentUser } = useAuth();

  //   if (loading) return null;

  return !currentUser ? <Outlet /> : <Navigate to="/" />;
};
