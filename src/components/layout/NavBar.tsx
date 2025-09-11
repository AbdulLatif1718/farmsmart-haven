import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import { useAIAssistant } from '@/hooks/useAIAssistant';

const NavBar = () => {
  const { isVisible, toggle } = useAIAssistant();

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="text-xl font-bold text-primary">
            AgriVerse
          </Link>
          <Button
            variant={isVisible ? "default" : "outline"}
            size="sm"
            onClick={toggle}
          >
            <Bot className="h-4 w-4 mr-2" />
            AI Assistant
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;