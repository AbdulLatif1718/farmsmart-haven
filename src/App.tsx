
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
            
            {/* Farmer Platform Routes - Redirect to landing if not logged in */}
            <Route 
              path="/dashboard" 
              element={isLoggedIn ? <Index /> : <Navigate to="/landing#auth-section" replace />} 
            />
            <Route 
              path="/weather" 
              element={isLoggedIn ? <Weather /> : <Navigate to="/landing#auth-section" replace />} 
            />
            <Route 
              path="/crops" 
              element={isLoggedIn ? <Crops /> : <Navigate to="/landing#auth-section" replace />} 
            />
            <Route 
              path="/marketplace" 
              element={isLoggedIn ? <Marketplace /> : <Navigate to="/landing#auth-section" replace />} 
            />
            <Route 
              path="/transport" 
              element={isLoggedIn ? <Transport /> : <Navigate to="/landing#auth-section" replace />} 
            />
            <Route 
              path="/machinery" 
              element={isLoggedIn ? <Machinery /> : <Navigate to="/landing#auth-section" replace />} 
            />
            <Route 
              path="/storage" 
              element={isLoggedIn ? <Storage /> : <Navigate to="/landing#auth-section" replace />} 
            />
            <Route 
              path="/knowledge" 
              element={isLoggedIn ? <Knowledge /> : <Navigate to="/landing#auth-section" replace />} 
            />
            <Route 
              path="/settings" 
              element={isLoggedIn ? <Settings /> : <Navigate to="/landing#auth-section" replace />} 
            />
            
            {/* Business Platform Routes - Redirect to landing if not logged in */}
            <Route 
              path="/business" 
              element={isLoggedIn ? <BusinessDashboard /> : <Navigate to="/landing#auth-section" replace />} 
            />
            <Route 
              path="/business/investments" 
              element={isLoggedIn ? <Investments /> : <Navigate to="/landing#auth-section" replace />} 
            />
            <Route 
              path="/business/properties" 
              element={isLoggedIn ? <Properties /> : <Navigate to="/landing#auth-section" replace />} 
            />
            <Route 
              path="/business/projects" 
              element={isLoggedIn ? <Projects /> : <Navigate to="/landing#auth-section" replace />} 
            />
            <Route 
              path="/business/marketplace" 
              element={isLoggedIn ? <BusinessMarketplace /> : <Navigate to="/landing#auth-section" replace />} 
            />
            <Route 
              path="/business/messages" 
              element={isLoggedIn ? <Messages /> : <Navigate to="/landing#auth-section" replace />} 
            />
            <Route 
              path="/business/settings" 
              element={isLoggedIn ? <BusinessSettings /> : <Navigate to="/landing#auth-section" replace />} 
            />
            
            {/* Redirect all business placeholder routes to auth section if not logged in */}
            <Route 
              path="/business/contracts" 
              element={isLoggedIn ? <Navigate to="/business/settings" replace /> : <Navigate to="/landing#auth-section" replace />} 
            />
            <Route 
              path="/business/financials" 
              element={isLoggedIn ? <Navigate to="/business/settings" replace /> : <Navigate to="/landing#auth-section" replace />} 
            />
            <Route 
              path="/business/partnerships" 
              element={isLoggedIn ? <Navigate to="/business/settings" replace /> : <Navigate to="/landing#auth-section" replace />} 
            />
            <Route 
              path="/business/leases" 
              element={isLoggedIn ? <Navigate to="/business/settings" replace /> : <Navigate to="/landing#auth-section" replace />} 
            />
            <Route 
              path="/business/land" 
              element={isLoggedIn ? <Navigate to="/business/settings" replace /> : <Navigate to="/landing#auth-section" replace />} 
            />
            <Route 
              path="/business/orders" 
              element={isLoggedIn ? <Navigate to="/business/settings" replace /> : <Navigate to="/landing#auth-section" replace />} 
            />
            <Route 
              path="/business/payments" 
              element={isLoggedIn ? <Navigate to="/business/settings" replace /> : <Navigate to="/landing#auth-section" replace />} 
            />
            
            {/* Catch-all route - redirect to landing page instead of showing 404 */}
            <Route path="*" element={<Navigate to="/landing" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

