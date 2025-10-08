
import React, { useState, useEffect } from 'react';
import { InvestorLayout } from "@/components/layout/InvestorLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  PieChart, 
  BarChart3, 
  TrendingUp,
  DollarSign,
  Activity
} from 'lucide-react';

const InvestorPortfolio = () => {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [portfolioItems, setPortfolioItems] = useState<any[]>([
    {
      id: 1,
      name: "Sustainable Maize Farm",
      sector: "Crops",
      invested: 10000,
      currentValue: 11500,
      performance: 15,
      risk: "Medium",
      duration: "6 months"
    },
    {
      id: 2,
      name: "Organic Poultry Operation",
      sector: "Livestock", 
      invested: 8000,
      currentValue: 9200,
      performance: 15,
      risk: "Low",
      duration: "4 months"
    }
  ]);

  useEffect(() => {
    if (profile?.id) {
      fetchPortfolioData();
    }
  }, [profile?.id]);

  const fetchPortfolioData = async () => {
    try {
      const { data, error } = await supabase
        .from('investments')
        .select(`
          *,
          funding_applications:project_id (
            project_title,
            project_type
          )
        `)
        .eq('investor_id', profile?.id);

      if (error) throw error;

      if (data && data.length > 0) {
        const mappedItems = data.map(inv => ({
          id: inv.id,
          name: inv.funding_applications?.project_title || 'Unknown Project',
          sector: inv.funding_applications?.project_type || 'Unknown',
          invested: Number(inv.amount_invested),
          currentValue: Number(inv.amount_invested) * 1.15,
          performance: 15,
          risk: 'Medium',
          duration: '6 months'
        }));
        setPortfolioItems(mappedItems);
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <InvestorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Investment Portfolio</h1>
          <p className="text-muted-foreground">Detailed view of your investment holdings and performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₵20,700</div>
              <p className="text-xs text-muted-foreground">+15% from investments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Across different sectors</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15%</div>
              <p className="text-xs text-muted-foreground">Return on investment</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Portfolio Holdings</h2>
          {portfolioItems.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>{item.sector} • {item.duration}</CardDescription>
                  </div>
                  <Badge variant="outline">{item.risk} Risk</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Invested</p>
                    <p className="font-medium">₵{item.invested.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Value</p>
                    <p className="font-medium">₵{item.currentValue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Performance</p>
                    <p className="font-medium text-green-600">+{item.performance}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Progress</p>
                    <Progress value={75} className="h-2 mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </InvestorLayout>
  );
};

export default InvestorPortfolio;
