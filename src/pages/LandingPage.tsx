
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingLayout from '@/components/landing/LandingLayout';
import HeroSection from '@/components/landing/HeroSection';
import FeatureSection from '@/components/landing/FeatureSection';
import BenefitsSection from '@/components/landing/BenefitsSection';
import TransportSection from '@/components/landing/TransportSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
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
      <FeatureSection />
      <BenefitsSection />
      <TransportSection />
      <TestimonialsSection />
      <AuthSection />
    </LandingLayout>
  );
};

export default LandingPage;
