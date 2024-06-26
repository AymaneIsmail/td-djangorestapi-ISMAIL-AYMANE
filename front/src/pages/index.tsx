import { useEffect } from 'react';
import { useAuth } from "@/context/auth/auth-provider";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only proceed with the redirection if the token is loaded (i.e., not null or undefined)
    if (isAuthenticated !== null && isAuthenticated !== undefined) {
      console.log("Token loaded:", isAuthenticated);
      console.log("User authentication status:", isAuthenticated);
      if (isAuthenticated) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } else {
      console.log("Waiting for token...");
    }
  }, [isAuthenticated, navigate]); // Add 'token' as a dependency

  // The component does nothing by itself as the redirection is handled in the useEffect
  return null;
}