
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';

// Import our business components
import RoleSelector, { BusinessRole } from '@/components/business/RoleSelector';
import InvestorDashboard from '@/components/business/dashboards/InvestorDashboard';
import LandownerDashboard from '@/components/business/dashboards/LandownerDashboard';
import FarmerDashboard from '@/components/business/dashboards/FarmerDashboard';
import BuyerDashboard from '@/components/business/dashboards/BuyerDashboard';
import BusinessNavigation, { BusinessSection } from '@/components/business/BusinessNavigation';
import VerificationStatus, { VerificationLevel } from '@/components/business/VerificationStatus';
import { BusinessLayout } from '@/components/layout/BusinessLayout';

const BusinessDashboard = () => {
  const [activeRole, setActiveRole] = useState<BusinessRole>('investor');
  const [activeSection, setActiveSection] = useState<BusinessSection>('dashboard');
  const [verificationLevel, setVerificationLevel] = useState<VerificationLevel>('basic');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (!isLoggedIn || userRole !== 'business') {
      navigate('/landing');
    }
  }, [navigate]);

  // Handle section changes
  useEffect(() => {
    if (activeSection !== 'dashboard') {
      // Navigate to the corresponding page
      navigate(`/business/${activeSection}`);
    }
  }, [activeSection, navigate]);

  const handleVerify = () => {
    if (verificationLevel === 'none') {
      setVerificationLevel('pending');
      toast({
        title: "Verification started",
        description: "Your verification is now being processed. This may take 24-48 hours.",
      });
    } else if (verificationLevel === 'basic') {
      setVerificationLevel('full');
      toast({
        title: "Fully verified!",
        description: "Congratulations! You now have full access to all platform features.",
      });
    } else {
      toast({
        title: "Verification in progress",
        description: "Your verification is still being processed. Please check back later.",
      });
    }
  };

  const renderDashboard = () => {
    switch (activeRole) {
      case 'investor':
        return <InvestorDashboard />;
      case 'landowner':
        return <LandownerDashboard />;
      case 'farmer':
        return <FarmerDashboard />;
      case 'buyer':
        return <BuyerDashboard />;
      default:
        return <InvestorDashboard />;
    }
  };

  return (
    <BusinessLayout activeRole={activeRole}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Business Platform</h1>
        <p className="text-muted-foreground">
          Connect with farmers and landowners to invest in agricultural projects
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <BusinessNavigation 
            activeSection={activeSection} 
            onSectionChange={setActiveSection}
            activeRole={activeRole}
          />
          
          <RoleSelector 
            activeRole={activeRole} 
            onRoleChange={setActiveRole} 
          />
          
          {renderDashboard()}
        </div>
        
        <div className="lg:col-span-1">
          <VerificationStatus 
            level={verificationLevel} 
            onVerify={handleVerify} 
          />
        </div>
      </div>
    </BusinessLayout>
  );
};

export default BusinessDashboard;
