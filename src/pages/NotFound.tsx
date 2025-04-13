
import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    // Log attempted access to non-existent route
    console.error("404 Error: Redirecting user to landing page");
  }, []);

  // Instead of showing a 404 page, redirect to the landing page
  if (!isLoggedIn) {
    return <Navigate to="/landing" replace />;
  }

  // If logged in, redirect to the dashboard
  const userRole = localStorage.getItem('userRole') || 'farmer';
  const redirectPath = userRole === 'farmer' ? '/dashboard' : '/business';
  
  return <Navigate to={redirectPath} replace />;
};

export default NotFound;

