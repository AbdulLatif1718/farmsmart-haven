
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { initializeTheme } from "./utils/themeUtils";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import BusinessDashboard from "./pages/BusinessDashboard";
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
  // Initialize theme on app load
  useEffect(() => {
    initializeTheme();
  }, []);

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('userRole') || 'farmer';

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                isLoggedIn 
                  ? <Navigate to={userRole === 'farmer' ? "/dashboard" : "/business"} replace /> 
                  : <Navigate to="/landing" replace />
              } 
            />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/dashboard" element={<Index />} />
            <Route path="/business" element={<BusinessDashboard />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/crops" element={<Crops />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/machinery" element={<Machinery />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
