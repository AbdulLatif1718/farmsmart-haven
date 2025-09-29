import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Target, 
  Search,
  Share2,
  TrendingUp
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { InvestmentDialog } from '@/components/projects/InvestmentDialog';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [investDialogOpen, setInvestDialogOpen] = useState(false);
  const { toast } = useToast();

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'crop', label: 'Crop Farming' },
    { id: 'livestock', label: 'Livestock' },
    { id: 'mixed', label: 'Mixed Farming' },
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      
      // Fetch approved funding applications with their share information
      const { data: fundingApps, error } = await supabase
        .from('funding_applications')
        .select(`
          *,
          project_shares (
            total_shares,
            available_shares,
            share_price,
            minimum_investment
          )
        `)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to include calculated fields
      const transformedProjects = (fundingApps || []).map((project) => {
        const shares = project.project_shares?.[0];
        const totalShares = shares?.total_shares || 0;
        const sharesSold = project.shares_sold || 0;
        const fundingProgress = totalShares > 0 ? (sharesSold / totalShares) * 100 : 0;

        return {
          ...project,
          share_price: shares?.share_price || 0,
          available_shares: shares?.available_shares || 0,
          minimum_investment: shares?.minimum_investment || 0,
          total_shares: totalShares,
          funding_progress: fundingProgress,
        };
      });

      setProjects(transformedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: 'Error',
        description: 'Failed to load projects',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInvestClick = (project: any) => {
    setSelectedProject(project);
    setInvestDialogOpen(true);
  };

  const handleInvestmentComplete = () => {
    fetchProjects();
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.project_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.project_description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = 
      selectedCategory === 'all' || 
      project.project_type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getRiskColor = (roi: number) => {
    if (roi >= 30) return 'destructive';
    if (roi >= 20) return 'default';
    return 'secondary';
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Investment Projects</h1>
            <p className="text-muted-foreground">
              Invest in agricultural projects and own shares in farming initiatives
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-24 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Projects State */}
        {!loading && filteredProjects.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground">
                {searchTerm || selectedCategory !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Check back soon for new investment opportunities'}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Featured Projects */}
        {!loading && filteredProjects.length > 0 && (
          <>
            <div>
              <h2 className="text-xl font-semibold mb-4">Featured Projects</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProjects.slice(0, 2).map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant={getRiskColor(project.expected_roi)}>
                          {project.expected_roi}% ROI
                        </Badge>
                        <Badge variant="outline">
                          {project.project_type}
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl">{project.project_title}</CardTitle>
                      <CardDescription className="text-base line-clamp-2">
                        {project.project_description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">Ghana</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Share Ownership</span>
                          <span className="font-semibold">
                            {project.funding_progress.toFixed(1)}%
                          </span>
                        </div>
                        <Progress value={project.funding_progress} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {project.available_shares.toLocaleString()} shares available
                          </span>
                          <span className="text-muted-foreground">
                            {project.shares_sold || 0} sold
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <DollarSign className="h-4 w-4" />
                            <span className="text-sm">Share Price</span>
                          </div>
                          <p className="text-lg font-semibold">
                            GH₵{project.share_price?.toLocaleString() || 0}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">Timeline</span>
                          </div>
                          <p className="text-lg font-semibold">{project.timeline}</p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Target className="h-4 w-4" />
                          <span className="text-sm">Minimum Investment</span>
                        </div>
                        <p className="text-base font-semibold">
                          GH₵{project.minimum_investment?.toLocaleString() || 0}
                        </p>
                      </div>

                      <div className="pt-4 border-t flex gap-2">
                        <Button variant="outline" className="flex-1">View Details</Button>
                        <Button 
                          className="flex-1 gap-2" 
                          onClick={() => handleInvestClick(project)}
                          disabled={project.available_shares === 0}
                        >
                          <Share2 className="h-4 w-4" />
                          {project.available_shares === 0 ? 'Fully Funded' : 'Invest Now'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* All Projects */}
            <div>
              <h2 className="text-xl font-semibold mb-4">All Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.slice(2).map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant={getRiskColor(project.expected_roi)}>
                          {project.expected_roi}% ROI
                        </Badge>
                        <Badge variant="outline">
                          {project.project_type}
                        </Badge>
                      </div>
                      <CardTitle>{project.project_title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {project.project_description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Shares</span>
                          <span className="font-semibold">
                            {project.funding_progress.toFixed(1)}% owned
                          </span>
                        </div>
                        <Progress value={project.funding_progress} className="h-2" />
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <DollarSign className="h-4 w-4" />
                          <span>GH₵{project.share_price?.toLocaleString() || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{project.timeline}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Details
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleInvestClick(project)}
                          disabled={project.available_shares === 0}
                        >
                          {project.available_shares === 0 ? 'Funded' : 'Invest'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Investment Dialog */}
        {selectedProject && (
          <InvestmentDialog
            open={investDialogOpen}
            onOpenChange={setInvestDialogOpen}
            project={selectedProject}
            onInvestmentComplete={handleInvestmentComplete}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Projects;
