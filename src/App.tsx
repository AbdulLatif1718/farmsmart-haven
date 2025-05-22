
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { initializeTheme } from "./utils/themeUtils";
import ScrollToTop from '@/components/ui/scroll-to-top';
import PrivateRoute from "./components/auth/PrivateRoute";

// Import pages
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import YouthDashboard from "./pages/YouthDashboard";
import InvestorDashboard from "./pages/InvestorDashboard";
import Weather from "./pages/Weather"; 
import Crops from "./pages/Crops";
import Marketplace from "./pages/Marketplace";
import Transport from "./pages/Transport";
import Machinery from "./pages/Machinery";
import Storage from "./pages/Storage";
import Knowledge from "./pages/Knowledge";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initializeTheme();
  }, []);

  const userRole = localStorage.getItem('userRole') || 'farmer';

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/" 
              element={
                localStorage.getItem('isLoggedIn') === 'true' 
                  ? <Navigate to={
                      userRole === 'youth' 
                        ? "/youth" 
                        : userRole === 'investor' 
                          ? "/investor" 
                          : "/dashboard"
                    } replace /> 
                  : <LandingPage />
              } 
            />
            <Route path="/landing" element={<LandingPage />} />
            
            {/* Protected Farmer Platform Routes */}
            <Route path="/dashboard" element={<PrivateRoute><Index /></PrivateRoute>} />
            <Route path="/weather" element={<PrivateRoute><Weather /></PrivateRoute>} />
            <Route path="/crops" element={<PrivateRoute><Crops /></PrivateRoute>} />
            <Route path="/marketplace" element={<PrivateRoute><Marketplace /></PrivateRoute>} />
            <Route path="/transport" element={<PrivateRoute><Transport /></PrivateRoute>} />
            <Route path="/machinery" element={<PrivateRoute><Machinery /></PrivateRoute>} />
            <Route path="/storage" element={<PrivateRoute><Storage /></PrivateRoute>} />
            <Route path="/knowledge" element={<PrivateRoute><Knowledge /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
            
            {/* New Youth and Investor Dashboards */}
            <Route path="/youth" element={<PrivateRoute><YouthDashboard /></PrivateRoute>} />
            <Route path="/investor" element={<PrivateRoute><InvestorDashboard /></PrivateRoute>} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
