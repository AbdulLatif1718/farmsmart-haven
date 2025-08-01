
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingLayout from '@/components/landing/LandingLayout';
import HeroSection from '@/components/landing/HeroSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import ImpactSection from '@/components/landing/ImpactSection';
import WhyJoinSection from '@/components/landing/WhyJoinSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FinalCTASection from '@/components/landing/FinalCTASection';
import AuthSection from '@/components/landing/AuthSection';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      const userRole = localStorage.getItem('userRole') || 'farmer';
      
      // Redirect based on role
      if (userRole === 'farmer') {
        navigate('/dashboard');
      } else if (userRole === 'youth') {
        navigate('/youth');
      } else if (userRole === 'investor') {
        navigate('/investor');
      }
    }
  }, [navigate]);

  return (
    <LandingLayout>
      <HeroSection />
      <HowItWorksSection />
      <ImpactSection />
      <WhyJoinSection />
      <TestimonialsSection />
      <FinalCTASection />
      <AuthSection />
    </LandingLayout>
  );
};

export default LandingPage;
