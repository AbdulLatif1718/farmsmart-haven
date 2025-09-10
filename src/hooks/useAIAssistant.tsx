import React, { createContext, useContext, useState } from 'react';

interface AIAssistantContextType {
  isVisible: boolean;
  isListening: boolean;
  toggleVisibility: () => void;
  toggleListening: () => void;
  hideAssistant: () => void;
}

const AIAssistantContext = createContext<AIAssistantContextType | undefined>(undefined);

export const AIAssistantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    
    // Auto-stop listening after 3 seconds
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
      }, 3000);
    }
  };

  const hideAssistant = () => {
    setIsVisible(false);
    setIsListening(false);
  };

  return (
    <AIAssistantContext.Provider
      value={{
        isVisible,
        isListening,
        toggleVisibility,
        toggleListening,
        hideAssistant,
      }}
    >
      {children}
    </AIAssistantContext.Provider>
  );
};

export const useAIAssistant = () => {
  const context = useContext(AIAssistantContext);
  if (context === undefined) {
    throw new Error('useAIAssistant must be used within an AIAssistantProvider');
  }
  return context;
};