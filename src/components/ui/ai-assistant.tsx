import React, { useState, useRef, useEffect } from 'react';
import { X, Mic, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIAssistantProps {
  isListening?: boolean;
  onToggleListening?: () => void;
  onClose?: () => void;
  className?: string;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  isListening = false,
  onToggleListening,
  onClose,
  className
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const assistantRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!assistantRef.current) return;
    
    const rect = assistantRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!assistantRef.current || e.touches.length !== 1) return;
    
    const rect = assistantRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // Keep within viewport bounds
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 120;
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const newX = touch.clientX - dragOffset.x;
    const newY = touch.clientY - dragOffset.y;
    
    // Keep within viewport bounds
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 120;
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={assistantRef}
      className={cn(
        "fixed z-50 select-none transition-transform duration-200",
        isDragging ? "cursor-grabbing scale-110" : "cursor-grab",
        className
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.3))'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Outer Glow Ring */}
      <div
        className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-r from-ai-primary to-ai-secondary opacity-30 blur-md animate-ai-glow",
          "w-24 h-24 -m-2"
        )}
      />
      
      {/* Animated Ring */}
      <div
        className={cn(
          "absolute inset-0 rounded-full border-2 border-ai-secondary/60 animate-ai-ring",
          "w-20 h-20"
        )}
        style={{
          background: 'conic-gradient(from 0deg, transparent, hsl(var(--ai-secondary) / 0.8), transparent)'
        }}
      />
      
      {/* Main Assistant Circle */}
      <div
        className={cn(
          "relative w-20 h-20 rounded-full bg-ai-background border border-ai-primary/50",
          "flex items-center justify-center group transition-all duration-300",
          "hover:border-ai-primary hover:bg-ai-background/90",
          isListening && "animate-ai-pulse"
        )}
        style={{
          background: 'radial-gradient(circle at 30% 30%, hsl(var(--ai-primary) / 0.1), hsl(var(--ai-background)))',
          boxShadow: isListening 
            ? '0 0 30px hsl(var(--ai-glow) / 0.6), inset 0 2px 10px hsl(var(--ai-primary) / 0.2)'
            : '0 0 20px hsl(var(--ai-glow) / 0.4), inset 0 2px 10px hsl(var(--ai-primary) / 0.1)'
        }}
        onClick={onToggleListening}
      >
        {/* Center Icon */}
        <div className="relative flex items-center justify-center">
          {isListening ? (
            <Activity 
              className="w-6 h-6 text-ai-secondary animate-ai-pulse" 
              strokeWidth={2}
            />
          ) : (
            <Mic 
              className="w-6 h-6 text-ai-primary group-hover:text-ai-secondary transition-colors duration-200" 
              strokeWidth={2}
            />
          )}
          
          {/* Pulsing dot when listening */}
          {isListening && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-ai-secondary rounded-full animate-ai-pulse opacity-80" />
          )}
        </div>
        
        {/* Inner glow */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-ai-primary/10 to-transparent pointer-events-none" />
      </div>
      
      {/* Close Button */}
      {onClose && (
        <button
          className={cn(
            "absolute -top-2 -right-2 w-6 h-6 rounded-full bg-ai-background border border-ai-primary/50",
            "flex items-center justify-center text-ai-primary hover:text-ai-secondary",
            "hover:bg-ai-primary/10 transition-all duration-200 group"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          style={{
            boxShadow: '0 2px 10px hsl(var(--ai-glow) / 0.3)'
          }}
        >
          <X className="w-3 h-3" strokeWidth={2.5} />
        </button>
      )}
      
      {/* Ripple effect when active */}
      {isListening && (
        <div className="absolute inset-0 rounded-full border-2 border-ai-secondary/30 animate-ping" />
      )}
    </div>
  );
};
