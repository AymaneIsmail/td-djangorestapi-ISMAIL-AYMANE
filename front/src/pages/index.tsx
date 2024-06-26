import { useAuth } from "@/context/auth/auth-provider";
import { Navigate } from "react-router-dom";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
}