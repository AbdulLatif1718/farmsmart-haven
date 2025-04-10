
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, TrendingUp, FileText, Users, AlertCircle } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { FarmerProfile } from '@/types/user';
import { sampleProjects } from '@/data/mockData';

export const FarmerDashboard = () => {
  const { user } = useUser();
  const farmerUser = user as FarmerProfile;
  
  // Filter projects created by this farmer
  const myProjects = sampleProjects.filter(project => project.creator.id === user?.id);
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Farmer Dashboard</h1>
          <p className="text-muted-foreground">Manage your farming projects, partnerships, and investments.</p>
        </div>
        <Button className="px-4 flex items-center">
          <Leaf className="mr-2 h-4 w-4" />
          Create New Project
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myProjects.length}</div>
            <p className="text-xs text-muted-foreground">
              {myProjects.filter(p => p.status === 'funded').length} funded
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Funding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₵{myProjects.reduce((sum, project) => sum + project.fundingRaised, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +15% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Investor Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              <Users className="h-3 w-3 inline mr-1" />
              2 active collaborations
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{farmerUser?.successRate || 0}%</div>
            <p className="text-xs text-muted-foreground">
              Based on {farmerUser?.previousProjects || 0} projects
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>My Projects</CardTitle>
              <CardDescription>
                Track and manage all your agricultural projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              {myProjects.length > 0 ? (
                <div className="space-y-4">
                  {myProjects.map((project) => (
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
                          <span className={`px-2 py-1 rounded text-xs ${
                            project.status === 'funded' ? 'bg-green-100 text-green-800' :
                            project.status === 'open' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {project.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {project.type.charAt(0).toUpperCase() + project.type.slice(1)} | {project.location}
                        </div>
                        <div className="flex justify-between mt-2">
                          <div className="text-sm">
                            <span className="font-medium">₵{project.fundingRaised.toLocaleString()}</span>
                            <span className="text-muted-foreground"> of ₵{project.fundingGoal.toLocaleString()}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">{project.duration}</span>
                            <span className="text-muted-foreground"> months</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-6 bg-muted/30 rounded-lg">
                  <Leaf className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <h3 className="font-medium mb-1">No projects yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create your first farming project to attract investors and partners
                  </p>
                  <Button>Create Project</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="rounded-full h-8 w-8 flex items-center justify-center bg-amber-100 text-amber-600 mr-3">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Update harvest report</h4>
                    <p className="text-xs text-muted-foreground">Due in 2 days</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="rounded-full h-8 w-8 flex items-center justify-center bg-green-100 text-green-600 mr-3">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Investor meeting</h4>
                    <p className="text-xs text-muted-foreground">Tomorrow, 2:00 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Market Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between mb-1">
                    <h4 className="text-sm font-medium">Maize Prices</h4>
                    <span className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +5.3%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Current price: ₵450 per 100kg
                  </p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between mb-1">
                    <h4 className="text-sm font-medium">Cassava Market</h4>
                    <span className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +2.1%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    High demand for processed cassava products
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
