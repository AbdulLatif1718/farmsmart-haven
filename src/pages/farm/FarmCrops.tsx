import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Sprout, 
  Calendar, 
  MapPin, 
  Droplets, 
  Thermometer,
  Plus,
  Search,
  Filter,
  ArrowLeft,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FarmCrops = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');

  const crops = [
    {
      id: 1,
      name: 'Maize (Yellow Corn)',
      variety: 'Hybrid Variety 621',
      plantingDate: '2024-03-15',
      expectedHarvest: '2024-07-20',
      currentStage: 'Flowering',
      area: '5.2 acres',
      estimatedYield: '450 kg/acre',
      status: 'healthy',
      progress: 65,
      location: 'North Field',
      waterRequirement: 'High',
      temperature: '26-30°C',
      marketPrice: 'GHS 2.80/kg',
      notes: 'Plants showing excellent growth. Regular pest monitoring needed.',
      alerts: []
    },
    {
      id: 2,
      name: 'Tomatoes',
      variety: 'Roma VF',
      plantingDate: '2024-02-20',
      expectedHarvest: '2024-06-15',
      currentStage: 'Fruiting',
      area: '2.8 acres',
      estimatedYield: '12 tons/acre',
      status: 'attention',
      progress: 80,
      location: 'Greenhouse Section',
      waterRequirement: 'Medium',
      temperature: '20-26°C',
      marketPrice: 'GHS 4.50/kg',
      notes: 'Some signs of blight on lower leaves. Treatment applied.',
      alerts: ['Pest Alert: Early blight detected']
    },
    {
      id: 3,
      name: 'Sweet Peppers',
      variety: 'California Wonder',
      plantingDate: '2024-01-10',
      expectedHarvest: '2024-05-25',
      currentStage: 'Harvesting',
      area: '1.5 acres',
      estimatedYield: '8 tons/acre',
      status: 'excellent',
      progress: 95,
      location: 'South Field',
      waterRequirement: 'Medium',
      temperature: '18-24°C',
      marketPrice: 'GHS 6.20/kg',
      notes: 'Peak harvest season. Quality is excellent.',
      alerts: []
    },
    {
      id: 4,
      name: 'Onions',
      variety: 'Red Creole',
      plantingDate: '2024-04-01',
      expectedHarvest: '2024-08-30',
      currentStage: 'Bulb Development',
      area: '3.0 acres',
      estimatedYield: '15 tons/acre',
      status: 'healthy',
      progress: 45,
      location: 'East Field',
      waterRequirement: 'Low',
      temperature: '15-25°C',
      marketPrice: 'GHS 3.80/kg',
      notes: 'Bulbs forming well. Reduce watering frequency.',
      alerts: []
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'healthy': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'attention': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <TrendingUp className="h-4 w-4" />;
      case 'healthy': return <Sprout className="h-4 w-4" />;
      case 'attention': return <AlertTriangle className="h-4 w-4" />;
      default: return <Sprout className="h-4 w-4" />;
    }
  };

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crop.variety.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || crop.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/farm')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Farms
            </Button>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Plant New Crop
          </Button>
        </div>

        <div>
          <h1 className="text-3xl font-bold">Crop Planning & Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage all your crops from planting to harvest
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search crops by name or variety..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="healthy">Healthy</SelectItem>
                <SelectItem value="attention">Needs Attention</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSeason} onValueChange={setSelectedSeason}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Seasons" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Seasons</SelectItem>
                <SelectItem value="current">Current Season</SelectItem>
                <SelectItem value="next">Next Season</SelectItem>
                <SelectItem value="previous">Previous Season</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Crop Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Crops</p>
                  <p className="text-2xl font-bold">{crops.length}</p>
                </div>
                <Sprout className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Area</p>
                  <p className="text-2xl font-bold">12.5</p>
                  <p className="text-xs text-muted-foreground">acres</p>
                </div>
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Expected Yield</p>
                  <p className="text-2xl font-bold">485</p>
                  <p className="text-xs text-muted-foreground">tons</p>
                </div>
                <TrendingUp className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Est. Revenue</p>
                  <p className="text-2xl font-bold">GHS</p>
                  <p className="text-lg font-semibold">58,400</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Crops List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCrops.map((crop) => (
            <Card key={crop.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {crop.name}
                      <Badge className={getStatusColor(crop.status)}>
                        {getStatusIcon(crop.status)}
                        <span className="ml-1 capitalize">{crop.status}</span>
                      </Badge>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {crop.variety} • {crop.area} • {crop.location}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Growth Progress</span>
                    <span className="text-sm text-muted-foreground">{crop.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${crop.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{crop.currentStage}</div>
                </div>

                {/* Crop Details Grid */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Planted</div>
                        <div className="text-muted-foreground">
                          {new Date(crop.plantingDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <div>
                        <div className="font-medium">Water Need</div>
                        <div className="text-muted-foreground">{crop.waterRequirement}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Harvest</div>
                        <div className="text-muted-foreground">
                          {new Date(crop.expectedHarvest).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-orange-500" />
                      <div>
                        <div className="font-medium">Temp Range</div>
                        <div className="text-muted-foreground">{crop.temperature}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expected Yield & Market Info */}
                <div className="grid grid-cols-2 gap-4 p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium">Expected Yield</div>
                    <div className="text-lg font-bold text-green-600">{crop.estimatedYield}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Market Price</div>
                    <div className="text-lg font-bold text-blue-600">{crop.marketPrice}</div>
                  </div>
                </div>

                {/* Alerts */}
                {crop.alerts.length > 0 && (
                  <div className="space-y-2">
                    {crop.alerts.map((alert, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm text-yellow-800 dark:text-yellow-200">{alert}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Notes */}
                <div className="text-sm text-muted-foreground italic border-l-2 border-muted pl-3">
                  {crop.notes}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Update Status
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default FarmCrops;