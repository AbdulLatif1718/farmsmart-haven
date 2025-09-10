
import React, { useEffect, useState } from 'react';
import { NavBar } from './NavBar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { AIAssistant } from '@/components/ui/ai-assistant';
import { useAIAssistant } from '@/hooks/useAIAssistant';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isVisible, isListening, toggleListening, hideAssistant } = useAIAssistant();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className={cn(
        "fixed top-0 left-0 right-0 z-10 transition-all duration-300",
        !isOnline && "border-b-4 border-b-destructive"
      )}>
        <NavBar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        {!isOnline && (
          <div className="bg-destructive/10 p-2 text-center text-destructive text-sm font-medium">
            You are currently offline. Some features may be limited.
          </div>
        )}
      </div>
      
      <div className="flex flex-1 pt-16">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
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
