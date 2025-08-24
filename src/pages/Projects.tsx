import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Target, 
  Filter,
  Search,
  Plus,
  Star,
  Clock
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'crops', label: 'Crop Production' },
    { id: 'livestock', label: 'Livestock' },
    { id: 'technology', label: 'AgriTech' },
    { id: 'processing', label: 'Food Processing' },
    { id: 'sustainable', label: 'Sustainable Farming' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Organic Cocoa Expansion Project',
      description: 'Expanding organic cocoa production across 500 acres in Ashanti Region with fair trade certification.',
      location: 'Kumasi, Ashanti Region',
      category: 'crops',
      fundingGoal: 250000,
      currentFunding: 180000,
      participants: 24,
      duration: '18 months',
      organizer: {
        name: 'Kwame Asante',
        avatar: '/placeholder-avatar.jpg',
        rating: 4.8
      },
      tags: ['Organic', 'Fair Trade', 'Export', 'High ROI'],
      status: 'active',
      featured: true
    },
    {
      id: 2,
      title: 'Smart Irrigation System Initiative',
      description: 'Implementing IoT-based irrigation systems to optimize water usage across multiple smallholder farms.',
      location: 'Tamale, Northern Region',
      category: 'technology',
      fundingGoal: 100000,
      currentFunding: 45000,
      participants: 12,
      duration: '12 months',
      organizer: {
        name: 'Fatima Ibrahim',
        avatar: '/placeholder-avatar.jpg',
        rating: 4.9
      },
      tags: ['IoT', 'Water Conservation', 'Tech Innovation'],
      status: 'active',
      featured: false
    },
    {
      id: 3,
      title: 'Community Poultry Farming Collective',
      description: 'Building a cooperative poultry farming network to supply fresh eggs and meat to local markets.',
      location: 'Cape Coast, Central Region',
      category: 'livestock',
      fundingGoal: 75000,
      currentFunding: 75000,
      participants: 45,
      duration: '24 months',
      organizer: {
        name: 'Emmanuel Mensah',
        avatar: '/placeholder-avatar.jpg',
        rating: 4.7
      },
      tags: ['Community', 'Livestock', 'Local Markets'],
      status: 'funded',
      featured: false
    },
    {
      id: 4,
      title: 'Cassava Processing Plant Setup',
      description: 'Establishing a modern cassava processing facility to produce high-quality garri and cassava flour.',
      location: 'Techiman, Brong-Ahafo',
      category: 'processing',
      fundingGoal: 300000,
      currentFunding: 90000,
      participants: 8,
      duration: '30 months',
      organizer: {
        name: 'Akosua Darko',
        avatar: '/placeholder-avatar.jpg',
        rating: 4.6
      },
      tags: ['Processing', 'Value Addition', 'Industrial'],
      status: 'active',
      featured: true
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'funded': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Agricultural Projects</h1>
            <p className="text-muted-foreground">
              Join collaborative farming projects and grow together with the community
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Project
          </Button>
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
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects
              .filter(project => project.featured)
              .map((project) => (
                <Card key={project.id} className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getStatusColor(project.status)}>
                            {project.status === 'active' ? 'Seeking Funding' : 'Fully Funded'}
                          </Badge>
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        </div>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <CardDescription className="mt-2">{project.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Project Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {project.location}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {project.duration}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            {project.participants} participants
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <DollarSign className="h-4 w-4" />
                            ${project.currentFunding.toLocaleString()} / ${project.fundingGoal.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Funding Progress */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Funding Progress</span>
                          <span className="text-sm text-muted-foreground">
                            {Math.round((project.currentFunding / project.fundingGoal) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${(project.currentFunding / project.fundingGoal) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Organizer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={project.organizer.avatar} />
                            <AvatarFallback>{project.organizer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{project.organizer.name}</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-muted-foreground">{project.organizer.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm">
                          {project.status === 'active' ? 'Join Project' : 'View Details'}
                        </Button>
                      </div>
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
            {filteredProjects
              .filter(project => !project.featured)
              .map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge className={getStatusColor(project.status)}>
                        {project.status === 'active' ? 'Active' : 'Funded'}
                      </Badge>
                    </div>
                    <CardTitle className="text-base">{project.title}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {project.location}
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{project.participants}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{project.duration}</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-muted-foreground">Funding</span>
                          <span className="text-xs text-muted-foreground">
                            {Math.round((project.currentFunding / project.fundingGoal) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                          <div 
                            className="bg-primary h-1.5 rounded-full transition-all duration-300" 
                            style={{ width: `${(project.currentFunding / project.fundingGoal) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {project.organizer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{project.organizer.name}</span>
                        </div>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Projects;