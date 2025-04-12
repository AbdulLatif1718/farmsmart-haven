
import React from 'react';
import { BusinessLayout } from '@/components/layout/BusinessLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Wallet, FileText, Clock } from 'lucide-react';

const Investments = () => {
  return (
    <BusinessLayout activeRole="investor">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">My Investments</h1>
        <p className="text-muted-foreground">
          Manage and track your agricultural investments
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-400 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Total Invested
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">₵24,500</div>
            <p className="text-xs text-blue-600/80 dark:text-blue-400/80 mt-1">
              Across 4 active projects
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-400 flex items-center">
              <Wallet className="h-4 w-4 mr-2" />
              Expected Returns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">₵31,850</div>
            <p className="text-xs text-green-600/80 dark:text-green-400/80 mt-1">
              +30% average ROI
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-400 flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Contracts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-800 dark:text-amber-200">7</div>
            <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-1">
              All verified and secured
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-400 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Next Payout
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">14 days</div>
            <p className="text-xs text-purple-600/80 dark:text-purple-400/80 mt-1">
              ₵4,200 from Maize Project
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Investment Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-center text-muted-foreground py-10">
              Your investment details and analytics will be displayed here
            </p>
          </div>
        </CardContent>
      </Card>
    </BusinessLayout>
  );
};

export default Investments;
