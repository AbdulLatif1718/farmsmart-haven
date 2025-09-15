import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle, TrendingUp, Sprout, Loader2, Send, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { WeatherCard } from '@/components/dashboard/WeatherCard';
import LongTermForecast from '@/components/dashboard/LongTermForecast';
import { useLocationSettings } from '@/hooks/useLocationSettings';
import { useWeather } from '@/hooks/useWeather';
import { supabase } from '@/integrations/supabase/client';

const dummyInsights = {
  daily: [
    {
      icon: <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />,
      message: "Delay irrigation for maize. 75% chance of rainfall tomorrow.",
    },
    {
      icon: <TrendingUp className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />,
      message: "Tomato prices expected to rise by 15% next week. Consider timing your harvest.",
    },
    {
      icon: <Sprout className="h-5 w-5 text-leaf-600 shrink-0 mt-0.5" />,
      message: "Pest Alert: Early signs of Fall Armyworm nearby. Inspect fields within 48 hours.",
    },
  ],
  risks: {
    disease: { level: "Moderate", color: "yellow", value: 45 },
    weather: { level: "Low", color: "green", value: 20 },
    market: { level: "Stable", color: "leaf", value: 30 },
  },
  market: [
    { item: "Tomatoes", trend: "↗️ Trending Up", change: "+15%", period: "Next week", color: "green" },
    { item: "Maize", trend: "➡️ Stable", change: "+2%", period: "This month", color: "leaf" },
    { item: "Fertilizer", trend: "↘️ Decreasing", change: "-8%", period: "Next month", color: "red" },
  ],
  news: [
    {
      title: "Satellite Analysis Complete",
      desc: "New crop health data shows optimal maize growth patterns.",
      color: "green",
      time: "2 hours ago",
    },
    {
      title: "Weather Model Update",
      desc: "Seasonal rainfall predictions refined for your region.",
      color: "blue",
      time: "5 hours ago",
    },
    {
      title: "Market Intelligence",
      desc: "Emerging trends: tomato opportunities in nearby markets.",
      color: "yellow",
      time: "12 hours ago",
    },
    {
      title: "Knowledge Base Updated",
      desc: "New techniques added from 500+ successful farms.",
      color: "purple",
      time: "1 day ago",
    },
  ],
};

const FarmGPTComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { location } = useLocationSettings();
  const { weather, loading: weatherLoading } = useWeather(location?.lat, location?.lon);
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI farming assistant. How can I help you today?' }
  ]);

  // Dynamic insights based on real data
  const [insights, setInsights] = useState({
    daily: [],
    risks: {
      pest: { level: "Low", color: "green", value: 25 },
      weather: { level: "Medium", color: "yellow", value: 45 },
      market: { level: "High", color: "red", value: 70 }
    },
    market: [],
    news: []
  });

  useEffect(() => {
    const generateInsights = async () => {
      // Generate daily insights based on weather and season
      const dailyInsights = [];
      
      if (weather?.description?.toLowerCase().includes('rain')) {
        dailyInsights.push({
          icon: <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />,
          message: "Current rainfall detected. Monitor soil moisture levels for optimal planting."
        });
      }
      
      if (weather?.temperature && weather.temperature > 30) {
        dailyInsights.push({
          icon: <TrendingUp className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />,
          message: "High temperature alert. Consider additional irrigation for heat-sensitive crops."
        });
      }
      
      // Add general farming insights
      dailyInsights.push({
        icon: <Clock className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />,
        message: "Optimal time for morning harvesting. Temperature is cool and humidity is low."
      });

      // Fetch market data for insights
      const { data: marketData } = await supabase
        .from('market_listings')
        .select('title, price, category')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(5);

      const marketInsights = marketData?.slice(0, 3).map(item => ({
        item: item.title,
        price: `₵${Number(item.price).toLocaleString()}`,
        trend: Math.random() > 0.5 ? "↗️ Trending Up" : "↘️ Declining",
        change: Math.random() > 0.5 ? `+${Math.floor(Math.random() * 20)}%` : `-${Math.floor(Math.random() * 15)}%`,
        period: "This week",
        color: Math.random() > 0.5 ? "green" : "red"
      })) || [];

      // Generate farming news
      const farmingNews = [
        {
          title: "New drought-resistant maize varieties available",
          desc: "Research shows 30% better yield in dry conditions",
          color: "green",
          time: "2 hours ago"
        },
        {
          title: "Market demand surge for organic vegetables", 
          desc: "Prices up 25% this quarter for certified organic produce",
          color: "blue",
          time: "5 hours ago"
        }
      ];

      setInsights({
        daily: dailyInsights,
        risks: {
          pest: { level: "Low", color: "green", value: 25 },
          weather: weather?.description?.toLowerCase().includes('storm') ? 
            { level: "High", color: "red", value: 85 } : { level: "Low", color: "green", value: 20 },
          market: { level: "Medium", color: "yellow", value: 45 }
        },
        market: marketInsights,
        news: farmingNews
      });
    };

    generateInsights();
    
    // Fake loading for demo
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [weather]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    setChatHistory(prev => [...prev, { role: 'user', content: message }]);
    
    // Simulate AI response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: 'I understand you\'re asking about ' + message + '. Let me analyze that and provide a detailed response shortly.'
      }]);
    }, 1000);

    setMessage('');
  };

  if (loading) {
    return (
      <Card className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-leaf-600" />
        <span className="ml-2 text-sm text-muted-foreground">AI is analyzing farm data...</span>
      </Card>
    );
  }

  return (
    <Card className="relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-leaf-500 via-sky-500 to-leaf-500"></div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🌱</span> FarmGPT AI
            </CardTitle>
            <CardDescription>
              Your intelligent farming companion powered by decision-intelligence
            </CardDescription>
          </div>
          <Badge variant="outline" className="px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-green-500 inline-block mr-2"></span>
            Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Weather Card */}
        <div className="bg-gradient-to-r from-sky-50/50 via-leaf-50/50 to-sky-50/50 dark:from-sky-900/20 dark:via-leaf-900/20 dark:to-sky-900/20 rounded-xl p-4">
          <WeatherCard 
            weather={weather} 
            isLoading={weatherLoading} 
            className="border-none shadow-none bg-transparent" 
          />
        </div>

        {/* Two Column Layout for Actions and Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Quick Actions Column */}
          <div className="md:col-span-1">
            <LongTermForecast />
          </div>

          {/* Daily Insights Column */}
          <Card className="md:col-span-2 border-2 border-leaf-100 dark:border-leaf-900">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Today's AI Insights</CardTitle>
                <Badge variant="secondary" className="font-normal">Real-time</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-leaf-50/50 to-sky-50/50 dark:from-leaf-900/20 dark:to-sky-900/20 rounded-lg p-4">
                <ul className="space-y-3">
                  {insights.daily.map((insight, i) => (
                    <li key={i} className="flex items-start gap-2 bg-background/80 rounded-lg p-3 shadow-sm">
                      {insight.icon}
                      <p className="text-sm">{insight.message}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk + Market Analysis Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-2 border-yellow-100 dark:border-yellow-900/30">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Risk Monitor</CardTitle>
                <Badge variant="secondary" className="font-normal">Live</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(insights.risks).map(([key, risk]) => (
                  <div key={key} className="bg-muted/50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium capitalize">{key} Risk</span>
                      <span className={`text-sm font-medium text-${risk.color}-600 flex items-center gap-1`}>
                        <span className={`h-1.5 w-1.5 rounded-full bg-${risk.color}-500`}></span>
                        {risk.level}
                      </span>
                    </div>
                    <div className="w-full bg-background h-2 rounded-full shadow-sm">
                      <div
                        className={`bg-${risk.color}-500 h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${risk.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-sky-100 dark:border-sky-900/30">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Market Pulse</CardTitle>
                <Badge variant="secondary" className="font-normal">Real-time</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {insights.market.map((m, i) => (
                  <div key={i} className="bg-muted/50 rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{m.item}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <span className={`h-1.5 w-1.5 rounded-full bg-${m.color}-500`}></span>
                        {m.trend}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium text-${m.color}-600`}>{m.change}</p>
                      <p className="text-xs text-muted-foreground">{m.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI News Feed */}
        <Card className="border-2 border-purple-100 dark:border-purple-900/30">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  AI Updates
                  <Badge variant="outline" className="text-xs">
                    {insights.news.length} New
                  </Badge>
                </CardTitle>
                <CardDescription>Latest insights and analyses</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">
                View All →
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {insights.news.map((n, i) => (
                <div
                  key={i}
                  className={`p-3 bg-muted/50 rounded-lg border-l-4 border-${n.color}-500 hover:bg-muted transition-colors cursor-pointer`}
                >
                  <h4 className="font-medium mb-1 flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full bg-${n.color}-500`}></span>
                    {n.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{n.desc}</p>
                  <p className="text-xs text-muted-foreground mt-2">{n.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Chat Interface */}
        <Card className="border-2 border-leaf-100 dark:border-leaf-900">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Send className="h-4 w-4" /> Chat with FarmGPT
                </CardTitle>
                <CardDescription>Get instant answers and farming advice</CardDescription>
              </div>
              <Badge variant="secondary" className="font-normal">AI Powered</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="h-[240px] overflow-y-auto space-y-4 mb-4 p-2">
                {chatHistory.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`rounded-lg p-3 max-w-[80%] ${
                        msg.role === 'user'
                          ? 'bg-leaf-600 text-white shadow-sm'
                          : 'bg-muted border border-border'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  placeholder="Ask about crop planning, weather insights, market trends..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" className="bg-leaf-600 hover:bg-leaf-700">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default FarmGPTComponent;
