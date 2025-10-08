import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { InvestorLayout } from "@/components/layout/InvestorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp,
  Activity,
  Target,
  Leaf,
  Users,
  MapPin,
  Home,
  BarChart3,
  Bot
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { AIMarketAssistant } from "@/components/investor/AIMarketAssistant";

const InvestorDashboard = () => {
  const { profile } = useAuth();
  const [portfolioStats, setPortfolioStats] = useState({
    totalInvested: 0,
    currentValue: 0,
    activeInvestments: 0,
    successRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [showAI, setShowAI] = useState(false);

  useEffect(() => {
    if (profile?.id) {
      fetchPortfolioData();
    }
  }, [profile?.id]);

  const fetchPortfolioData = async () => {
    try {
      // Fetch user's investments
      const { data: investments } = await supabase
        .from('investments')
        .select('*')
        .eq('investor_id', profile?.id);

      if (investments && investments.length > 0) {
        const totalInvested = investments.reduce((sum, inv) => sum + Number(inv.amount_invested), 0);
        const totalExpectedReturn = investments.reduce((sum, inv) => sum + Number(inv.expected_return || 0), 0);
        const activeCount = investments.filter(inv => inv.status === 'active').length;
        
        setPortfolioStats({
          totalInvested,
          currentValue: totalExpectedReturn,
          activeInvestments: activeCount,
          successRate: 85 // Can be calculated from completed investments
        });
      }
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  const actionCards = [
    {
      title: "Fund a Project",
      description: "Browse approved agricultural projects",
      icon: Leaf,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
      link: "/investor/projects"
    },
    {
      title: "Find a Farmer",
      description: "Connect with verified experts",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      link: "/services?tab=experts"
    },
    {
      title: "Find Land",
      description: "Explore available land for agriculture",
      icon: MapPin,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      link: "/services?tab=land"
    },
    {
      title: "Buy/Rent Farm",
      description: "Browse farms available for lease",
      icon: Home,
      color: "text-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-950",
      link: "/services?tab=farms"
    },
    {
      title: "Track Investments",
      description: "Monitor your portfolio performance",
      icon: BarChart3,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-950",
      link: "/investor/investments"
    },
    {
      title: "AI Market Assistant",
      description: "Get insights and recommendations",
      icon: Bot,
      color: "text-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-950",
      link: "#",
      onClick: () => setShowAI(true)
    }
  ];

  return (
    <InvestorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Investment Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Track and grow your agricultural portfolio</p>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Invested</p>
                  <p className="text-2xl font-bold">
                    {loading ? "..." : `GH₵${portfolioStats.totalInvested.toLocaleString()}`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {portfolioStats.activeInvestments} active projects
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Expected Value</p>
                  <p className="text-2xl font-bold">
                    {loading ? "..." : `GH₵${portfolioStats.currentValue.toLocaleString()}`}
                  </p>
                  <div className="flex items-center">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <p className="text-xs text-green-600">Growth potential</p>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Investments</p>
                  <p className="text-2xl font-bold">
                    {loading ? "..." : portfolioStats.activeInvestments}
                  </p>
                  <p className="text-xs text-muted-foreground">Projects funded</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                  <p className="text-2xl font-bold">{portfolioStats.successRate}%</p>
                  <p className="text-xs text-muted-foreground">Portfolio performance</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                  <Target className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {actionCards.map((action) => (
              action.link === "#" ? (
                <Card 
                  key={action.title} 
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={action.onClick}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${action.bgColor}`}>
                        <action.icon className={`h-6 w-6 ${action.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-base">{action.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ) : (
                <Link key={action.title} to={action.link}>
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${action.bgColor}`}>
                          <action.icon className={`h-6 w-6 ${action.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-base">{action.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{action.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              )
            ))}
          </div>
        </div>
      </div>

      {/* AI Market Assistant Dialog */}
      <AIMarketAssistant open={showAI} onOpenChange={setShowAI} />
    </InvestorLayout>
  );
};

export default InvestorDashboard;
