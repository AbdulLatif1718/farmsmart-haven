
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

// Youth pages
import YouthProjects from "./pages/youth/YouthProjects";
import YouthTraining from "./pages/youth/YouthTraining";
import YouthMentors from "./pages/youth/YouthMentors";
import YouthProgress from "./pages/youth/YouthProgress";

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
            
            {/* Youth Dashboard Routes */}
            <Route path="/youth" element={<PrivateRoute><YouthDashboard /></PrivateRoute>} />
            <Route path="/youth/projects" element={<PrivateRoute><YouthProjects /></PrivateRoute>} />
            <Route path="/youth/training" element={<PrivateRoute><YouthTraining /></PrivateRoute>} />
            <Route path="/youth/mentors" element={<PrivateRoute><YouthMentors /></PrivateRoute>} />
            <Route path="/youth/progress" element={<PrivateRoute><YouthProgress /></PrivateRoute>} />
            
            {/* Investor Dashboard Routes */}
            <Route path="/investor" element={<PrivateRoute><InvestorDashboard /></PrivateRoute>} />
            <Route path="/investor/projects" element={<PrivateRoute><InvestorProjects /></PrivateRoute>} />
            <Route path="/investor/investments" element={<PrivateRoute><InvestorInvestments /></PrivateRoute>} />
            <Route path="/investor/financials" element={<PrivateRoute><InvestorFinancials /></PrivateRoute>} />
            <Route path="/investor/portfolio" element={<PrivateRoute><InvestorPortfolio /></PrivateRoute>} />
            <Route path="/investor/contracts" element={<PrivateRoute><InvestorContracts /></PrivateRoute>} />
            <Route path="/investor/map" element={<PrivateRoute><InvestorMap /></PrivateRoute>} />
            <Route path="/investor/network" element={<PrivateRoute><InvestorNetwork /></PrivateRoute>} />
            <Route path="/investor/messages" element={<PrivateRoute><InvestorMessages /></PrivateRoute>} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
