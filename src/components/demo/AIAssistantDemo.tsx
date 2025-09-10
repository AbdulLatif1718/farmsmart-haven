import React, { useState } from 'react';
import { AIAssistant } from '@/components/ui/ai-assistant';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const AIAssistantDemo: React.FC = () => {
  const [showAssistant, setShowAssistant] = useState(true);
  const [isListening, setIsListening] = useState(false);

  const handleToggleListening = () => {
    setIsListening(!isListening);
    
    // Simulate voice interaction feedback
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
      }, 3000);
    }
  };

  const handleCloseAssistant = () => {
    setShowAssistant(false);
  };

  return (
    <div className="space-y-4">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">AI Assistant Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Interact with the floating AI assistant. It features:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Draggable positioning</li>
            <li>Smooth glowing animations</li>
            <li>Voice interaction feedback</li>
            <li>Elegant close button</li>
            <li>Responsive hover effects</li>
          </ul>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowAssistant(true)} 
              disabled={showAssistant}
              size="sm"
            >
              Show Assistant
            </Button>
            <Button 
              onClick={handleToggleListening} 
              variant="outline"
              size="sm"
              disabled={!showAssistant}
            >
              Toggle Listening
            </Button>
          </div>
        </CardContent>
      </Card>

      {showAssistant && (
        <AIAssistant
          isListening={isListening}
          onToggleListening={handleToggleListening}
          onClose={handleCloseAssistant}
        />
      )}
    </div>
  );
};