
import React, { ReactNode, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { AIAssistant } from '@/components/ui/ai-assistant';
import { useAIAssistant } from '@/hooks/useAIAssistant';

interface LandingLayoutProps {
  children: ReactNode;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  const { isVisible, isListening, toggleListening, hideAssistant } = useAIAssistant();
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
      
      {/* Global AI Assistant */}
      {isVisible && (
        <AIAssistant
          isListening={isListening}
          onToggleListening={toggleListening}
          onClose={hideAssistant}
        />
      )}
    </div>
  );
};

export default LandingLayout;
