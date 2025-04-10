
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { RoleSelector } from '@/components/dashboard/RoleSelector';
import { FarmerDashboard } from '@/components/dashboard/FarmerDashboard';
import { InvestorDashboard } from '@/components/dashboard/InvestorDashboard';
import { LandownerDashboard } from '@/components/dashboard/LandownerDashboard';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  
  // Check if user is logged in
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/landing');
    } else {
      // Simulate data loading
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, user, navigate]);
  
  // Render dashboard based on user role
  const renderDashboard = () => {
    if (!user?.role) {
      return <RoleSelector />;
    }
    
    switch (user.role) {
      case 'farmer':
        return <FarmerDashboard />;
      case 'investor':
        return <InvestorDashboard />;
      case 'landowner':
        return <LandownerDashboard />;
      default:
        return <RoleSelector />;
    }
  };
  
  if (isLoading || loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[70vh]">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      {renderDashboard()}
    </MainLayout>
  );
};

export default Index;
