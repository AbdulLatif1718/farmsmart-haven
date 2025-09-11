import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AIAssistantProvider } from "@/hooks/useAIAssistant";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeTheme } from "./utils/themeUtils";
import ScrollToTop from '@/components/ui/scroll-to-top';
import { AuthProvider } from "@/hooks/useAuth";

// Import pages
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import Weather from "./pages/Weather"; 
import Crops from "./pages/Crops";
import Farm from "./pages/Farm";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Marketplace from "./pages/Marketplace";
import Transport from "./pages/Transport";
import Machinery from "./pages/Machinery";
import Storage from "./pages/Storage";
import Knowledge from "./pages/Knowledge";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // For now, all routes are public since we removed auth
  return <>{children}</>;
};

// Root route handler
const RootHandler = () => {
  // Always show landing page since we removed user auth
  return <LandingPage />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<RootHandler />} />
      <Route path="/landing" element={<LandingPage />} />
      
      {/* Main App Routes - Now public */}
      <Route path="/dashboard" element={<Index />} />
      <Route path="/farm/*" element={<Farm />} />
      <Route path="/crops" element={<Crops />} />
      <Route path="/machinery" element={<Machinery />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/storage" element={<Storage />} />
      <Route path="/transport" element={<Transport />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/knowledge" element={<Knowledge />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/settings" element={<Settings />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Catch all */}
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
        <AIAssistantProvider>
          <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <AppRoutes />
          </BrowserRouter>
          </TooltipProvider>
        </AIAssistantProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;