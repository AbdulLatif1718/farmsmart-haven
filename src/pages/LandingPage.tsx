
import React from 'react';
import LandingLayout from '@/components/landing/LandingLayout';
import HeroSection from '@/components/landing/HeroSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import ImpactSection from '@/components/landing/ImpactSection';
import WhyJoinSection from '@/components/landing/WhyJoinSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import FinalCTASection from '@/components/landing/FinalCTASection';
import AuthSection from '@/components/landing/AuthSection';

const LandingPage = () => {

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
