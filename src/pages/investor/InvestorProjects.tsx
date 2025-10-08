
import React, { useState, useEffect } from 'react';
import { InvestorLayout } from "@/components/layout/InvestorLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  MapPin, 
  Calendar, 
  DollarSign,
  Users,
  Filter,
  Search,
  Star,
  Clock,
  Leaf,
  Bird
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const InvestorProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [projects, setProjects] = useState<any[]>([]);
  const [investments, setInvestments] = useState<any[]>([]);
  const { profile } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('funding_applications')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) setProjects(data || []);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchInvestments = async () => {
      if (!profile?.id) return;
      const { data, error } = await supabase
        .from('funding_applications')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      if (!error) setInvestments(data || []);
    };
    fetchInvestments();
  }, [profile?.id]);

  const getRiskColor = (risk: string) => {
    const label = (risk || '').toLowerCase();
    switch(label) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return '';
    }
  };

  const filteredProjects = projects.filter((project) => {
    const title = (project.title || '').toLowerCase();
    const location = (project.location || '').toLowerCase();
    const crop = (project.crop_type || '').toLowerCase();
    const q = searchTerm.toLowerCase();
    const matchesSearch = title.includes(q) || location.includes(q) || crop.includes(q);
    const matchesFilter = filterType === 'all' || (filterType === 'crop');
    return matchesSearch && matchesFilter;
  });

  return (
    <InvestorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Browse Investment Projects</h1>
          <p className="text-muted-foreground">Discover approved agricultural investment opportunities</p>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects or farmers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={filterType === 'all' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterType('all')}
                >
                  All
                </Button>
                <Button 
                  variant={filterType === 'crop' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterType('crop')}
                >
                  Crops
                </Button>
                <Button 
                  variant={filterType === 'livestock' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterType('livestock')}
                >
                  Livestock
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {project.crop_type ? <Leaf className="h-5 w-5 text-green-600" /> : <Leaf className="h-5 w-5 text-green-600" />}
                          {project.title}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {project.location}
                          </span>
                          {project.crop_type && (
                            <span className="text-xs">Crop: {project.crop_type}</span>
                          )}
                        </CardDescription>
                      </div>
                      <Badge className={getRiskColor(project.risk_level)}>
                        {(project.risk_level || 'Medium')} Risk
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Funding Progress</span>
                        <span>₵{project.currentFunding.toLocaleString()} / ₵{project.fundingGoal.toLocaleString()}</span>
                      </div>
                      <Progress value={(project.currentFunding / project.fundingGoal) * 100} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Expected ROI</p>
                        <p className="font-medium text-green-600">{project.expectedROI}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-medium">{project.duration}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Farm Size</p>
                        <p className="font-medium">{project.farmSize}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Experience</p>
                        <p className="font-medium">{project.experience}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{project.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Deadline: {project.deadline}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                       View Details
                    </Button>
                    <Button size="sm" className="flex-1">
                      Invest Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </InvestorLayout>
    );
  };
  
  export default InvestorProjects;
