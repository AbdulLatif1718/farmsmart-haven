
import React from 'react';
import { InvestorLayout } from "@/components/layout/InvestorLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  PieChart,
  Download,
  Calendar
} from 'lucide-react';

const InvestorFinancials = () => {
  const financialData = [
    {
      title: "Total Portfolio Value",
      value: "₵45,600",
      change: "+12.5%",
      trend: "up"
    },
    {
      title: "Monthly Returns",
      value: "₵3,200",
      change: "+8.2%",
      trend: "up"
    },
    {
      title: "Total Invested",
      value: "₵38,000",
      change: "0%",
      trend: "neutral"
    },
    {
      title: "Available Balance",
      value: "₵12,400",
      change: "-5.1%",
      trend: "down"
    }
  ];

  return (
    <InvestorLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Financial Overview</h1>
            <p className="text-muted-foreground">Track your investment performance and financial metrics</p>
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {financialData.map((item, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {item.trend === 'up' && <TrendingUp className="h-3 w-3 mr-1 text-green-600" />}
                  {item.trend === 'down' && <TrendingDown className="h-3 w-3 mr-1 text-red-600" />}
                  <span className={item.trend === 'up' ? 'text-green-600' : item.trend === 'down' ? 'text-red-600' : ''}>{item.change}</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest investment activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">Investment in Rice Farm</p>
                    <p className="text-sm text-muted-foreground">May 20, 2025</p>
                  </div>
                  <Badge variant="outline" className="text-red-600">-₵5,000</Badge>
                </div>
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">Return from Maize Project</p>
                    <p className="text-sm text-muted-foreground">May 18, 2025</p>
                  </div>
                  <Badge variant="outline" className="text-green-600">+₵1,200</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio Allocation</CardTitle>
              <CardDescription>Investment distribution by sector</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Crops</span>
                  <span>65%</span>
                </div>
                <div className="flex justify-between">
                  <span>Livestock</span>
                  <span>25%</span>
                </div>
                <div className="flex justify-between">
                  <span>Technology</span>
                  <span>10%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </InvestorLayout>
  );
};

export default InvestorFinancials;
