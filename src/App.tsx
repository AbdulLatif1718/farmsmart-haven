import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { initializeTheme } from "./utils/themeUtils";
import ScrollToTop from '@/components/ui/scroll-to-top';
import { AuthProvider, useAuth } from "@/hooks/useAuth";

// Import pages
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
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

// Investor pages
import InvestorProjects from "./pages/investor/InvestorProjects";
import InvestorInvestments from "./pages/investor/InvestorInvestments";
import InvestorFinancials from "./pages/investor/InvestorFinancials";
import InvestorPortfolio from "./pages/investor/InvestorPortfolio";
import InvestorContracts from "./pages/investor/InvestorContracts";
import InvestorMap from "./pages/investor/InvestorMap";
import InvestorNetwork from "./pages/investor/InvestorNetwork";
import InvestorMessages from "./pages/investor/InvestorMessages";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

// Root route handler
const RootHandler = () => {
  const { user, profile, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <LandingPage />;
  }
  
  // Redirect based on user role
  if (profile?.role === 'investor') {
    return <Navigate to="/investor" replace />;
  } else {
    return <Navigate to="/dashboard" replace />;
  }
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<RootHandler />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/auth" element={<Auth />} />
      
      {/* Protected Farmer Platform Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/weather" element={<ProtectedRoute><Weather /></ProtectedRoute>} />
      <Route path="/crops" element={<ProtectedRoute><Crops /></ProtectedRoute>} />
      <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
      <Route path="/transport" element={<ProtectedRoute><Transport /></ProtectedRoute>} />
      <Route path="/machinery" element={<ProtectedRoute><Machinery /></ProtectedRoute>} />
      <Route path="/storage" element={<ProtectedRoute><Storage /></ProtectedRoute>} />
      <Route path="/knowledge" element={<ProtectedRoute><Knowledge /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      
      {/* Investor Dashboard Routes */}
      <Route path="/investor" element={<ProtectedRoute><InvestorDashboard /></ProtectedRoute>} />
      <Route path="/investor/projects" element={<ProtectedRoute><InvestorProjects /></ProtectedRoute>} />
      <Route path="/investor/investments" element={<ProtectedRoute><InvestorInvestments /></ProtectedRoute>} />
      <Route path="/investor/financials" element={<ProtectedRoute><InvestorFinancials /></ProtectedRoute>} />
      <Route path="/investor/portfolio" element={<ProtectedRoute><InvestorPortfolio /></ProtectedRoute>} />
      <Route path="/investor/contracts" element={<ProtectedRoute><InvestorContracts /></ProtectedRoute>} />
      <Route path="/investor/map" element={<ProtectedRoute><InvestorMap /></ProtectedRoute>} />
      <Route path="/investor/network" element={<ProtectedRoute><InvestorNetwork /></ProtectedRoute>} />
      <Route path="/investor/messages" element={<ProtectedRoute><InvestorMessages /></ProtectedRoute>} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;