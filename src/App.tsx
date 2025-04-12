
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

// Import business pages
import Investments from "./pages/business/Investments";
import Properties from "./pages/business/Properties";
import Projects from "./pages/business/Projects";
import BusinessMarketplace from "./pages/business/Marketplace";
import Messages from "./pages/business/Messages";
import BusinessSettings from "./pages/business/Settings";

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
            
            {/* Farmer Platform Routes */}
            <Route path="/dashboard" element={<Index />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/crops" element={<Crops />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/machinery" element={<Machinery />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Business Platform Routes */}
            <Route path="/business" element={<BusinessDashboard />} />
            <Route path="/business/investments" element={<Investments />} />
            <Route path="/business/properties" element={<Properties />} />
            <Route path="/business/projects" element={<Projects />} />
            <Route path="/business/marketplace" element={<BusinessMarketplace />} />
            <Route path="/business/messages" element={<Messages />} />
            <Route path="/business/settings" element={<BusinessSettings />} />
            
            {/* Placeholder routes that will redirect to construction pages */}
            <Route path="/business/contracts" element={<Navigate to="/business/settings" replace />} />
            <Route path="/business/financials" element={<Navigate to="/business/settings" replace />} />
            <Route path="/business/partnerships" element={<Navigate to="/business/settings" replace />} />
            <Route path="/business/leases" element={<Navigate to="/business/settings" replace />} />
            <Route path="/business/land" element={<Navigate to="/business/settings" replace />} />
            <Route path="/business/orders" element={<Navigate to="/business/settings" replace />} />
            <Route path="/business/payments" element={<Navigate to="/business/settings" replace />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
