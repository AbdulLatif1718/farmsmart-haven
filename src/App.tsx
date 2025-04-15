
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { initializeTheme } from "./utils/themeUtils";
import PrivateRoute from "./components/auth/PrivateRoute";

// Import pages
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
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/" 
              element={
                localStorage.getItem('isLoggedIn') === 'true' 
                  ? <Navigate to={userRole === 'farmer' ? "/dashboard" : "/business"} replace /> 
                  : <Navigate to="/landing" replace />
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
            
            {/* Protected Business Platform Routes */}
            <Route path="/business" element={<PrivateRoute><BusinessDashboard /></PrivateRoute>} />
            <Route path="/business/investments" element={<PrivateRoute><Investments /></PrivateRoute>} />
            <Route path="/business/properties" element={<PrivateRoute><Properties /></PrivateRoute>} />
            <Route path="/business/projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
            <Route path="/business/marketplace" element={<PrivateRoute><BusinessMarketplace /></PrivateRoute>} />
            <Route path="/business/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
            <Route path="/business/settings" element={<PrivateRoute><BusinessSettings /></PrivateRoute>} />
            
            {/* Placeholder routes that will redirect to settings */}
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
