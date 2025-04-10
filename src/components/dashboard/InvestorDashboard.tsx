
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, DollarSign, Leaf, ChevronRight, AlertTriangle } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { InvestorProfile } from '@/types/user';
import { sampleProjects } from '@/data/mockData';

export const InvestorDashboard = () => {
  const { user } = useUser();
  const investorUser = user as InvestorProfile;
  
  // For demo purposes, we'll assume some investments
  const activeInvestments = sampleProjects.slice(0, 2);
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Investor Dashboard</h1>
          <p className="text-muted-foreground">Explore and manage your agricultural investments.</p>
        </div>
        <Button className="px-4 flex items-center">
          <Search className="mr-2 h-4 w-4" />
          Find Projects
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₵{investorUser?.totalInvested?.toLocaleString() || '0'}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12% from last quarter
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{investorUser?.activeInvestments || 0}</div>
            <p className="text-xs text-muted-foreground">
              Across {investorUser?.investmentPreferences?.length || 0} categories
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23.5%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +3.2% from last year
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₵12,500</div>
            <p className="text-xs text-muted-foreground">
              Next payout in 15 days
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>My Portfolio</CardTitle>
              <CardDescription>
                Track the performance of your agricultural investments
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeInvestments.length > 0 ? (
                <div className="space-y-4">
                  {activeInvestments.map((investment) => (
                    <div key={investment.id} className="flex items-start p-3 border rounded-lg">
                      <div className="h-12 w-12 rounded-md overflow-hidden mr-4">
                        <img
                          src={investment.images[0] || 'https://placehold.co/100x100?text=Project'}
                          alt={investment.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{investment.title}</h3>
                          <span className={`px-2 py-1 rounded text-xs ${
                            investment.status === 'funded' ? 'bg-green-100 text-green-800' :
                            investment.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {investment.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {investment.type.charAt(0).toUpperCase() + investment.type.slice(1)} | {investment.location}
                        </div>
                        <div className="flex justify-between mt-2">
                          <div className="text-sm">
                            <span className="font-medium">₵5,000</span>
                            <span className="text-muted-foreground"> invested</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">{investment.expectedRoi}%</span>
                            <span className="text-muted-foreground"> expected ROI</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6 bg-muted/30 rounded-lg">
                  <DollarSign className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <h3 className="font-medium mb-1">No investments yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Start investing in agricultural projects to grow your portfolio
                  </p>
                  <Button>Find Projects</Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recommended Projects</CardTitle>
                <CardDescription>
                  Based on your investment preferences
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleProjects.filter(p => p.status === 'open').map((project) => (
                  <div key={project.id} className="flex items-start p-3 border rounded-lg">
                    <div className="h-12 w-12 rounded-md overflow-hidden mr-4">
                      <img
                        src={project.images[0] || 'https://placehold.co/100x100?text=Project'}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{project.title}</h3>
                        <div className="text-xs text-muted-foreground">Match: 92%</div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        By {project.creator.fullName} | {project.location}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <div className="h-2 w-32 bg-gray-200 rounded-full">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{width: `${(project.fundingRaised / project.fundingGoal) * 100}%`}}
                            ></div>
                          </div>
                          <div className="text-xs mt-1">
                            <span className="font-medium">{Math.round((project.fundingRaised / project.fundingGoal) * 100)}%</span>
                            <span className="text-muted-foreground"> of ₵{project.fundingGoal.toLocaleString()}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="h-8">Details</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Investment Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-lg bg-amber-50">
                  <div className="flex items-center mb-2">
                    <Leaf className="h-4 w-4 text-amber-600 mr-2" />
                    <h4 className="text-sm font-medium">High-Yield Rice Farming</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Partnership with local farmers to expand rice production with modern methods.
                  </p>
                  <div className="flex justify-between text-xs">
                    <span>Expected ROI: <span className="font-medium">35%</span></span>
                    <span>Duration: <span className="font-medium">8 months</span></span>
                  </div>
                  <Button size="sm" className="w-full mt-3 h-8">View Details</Button>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                    <h4 className="text-sm font-medium">Limited Time Offer</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Early investor bonus for the upcoming cashew processing facility project. 10% bonus shares for investments made before December 1st.
                  </p>
                  <div className="flex items-center justify-end mt-2 text-xs text-primary">
                    Learn more <ChevronRight className="h-3 w-3 ml-1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Market Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium mb-1">Cocoa Futures on the Rise</h4>
                  <p className="text-muted-foreground text-xs mb-1">
                    Global cocoa prices have increased by 15% due to supply constraints in West Africa.
                  </p>
                  <div className="flex items-center text-xs text-primary">
                    Read analysis <ChevronRight className="h-3 w-3 ml-1" />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">Government Subsidies for Agribusiness</h4>
                  <p className="text-muted-foreground text-xs mb-1">
                    New government initiative announced to support agricultural investments.
                  </p>
                  <div className="flex items-center text-xs text-primary">
                    Read more <ChevronRight className="h-3 w-3 ml-1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
