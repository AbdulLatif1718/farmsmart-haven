import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, Download, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FarmAnalytics = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const handleAskAI = () => {
    setLoading(true);
    setAiResponse(null);

    // Simulated AI response (mocked for demo)
    setTimeout(() => {
      setAiResponse(`
🌱 Optimal planting window for maize starts next week. 
💧 Reduce irrigation by 15% this month due to expected rainfall increase. 
📈 Cassava prices projected to rise 12% in the next 4 weeks. 
🦠 Risk alert: Tomato blight reported in a nearby district — apply preventive spray. 
      `);
      setLoading(false);
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/farm')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Farms
          </Button>

          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold">AgriSense AI (Demo)</h1>
          <p className="text-muted-foreground">
            This is a simulated preview of how our AI assistant will generate real-time insights 
            for your farm. After this demo, the actual AI will be integrated.
          </p>
        </div>

        {/* AI Assistant Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              Ask AgriSense AI
            </CardTitle>
            <CardDescription>
              Click the button to simulate an AI-powered farming insight.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleAskAI} 
              disabled={loading}
              className="mb-4 flex items-center gap-2"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {loading ? "Thinking..." : "Ask AI for Farm Insights"}
            </Button>

            {aiResponse && (
              <div className="p-4 rounded-lg bg-muted/50 whitespace-pre-line">
                {aiResponse}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Future Plan Section */}
        <Card>
          <CardHeader>
            <CardTitle>Coming Soon 🚀</CardTitle>
            <CardDescription>
              Features to be integrated with real AI models
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <ul className="list-disc pl-6 space-y-1">
              <li>Real-time crop disease detection</li>
              <li>Weather-based irrigation alerts</li>
              <li>Market price forecasting & selling advice</li>
              <li>Livestock disease outbreak predictions</li>
              <li>Personalized long-term farm planning</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default FarmAnalytics;
