import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock articles data
const mockArticles = [
  {
    id: '1',
    title: 'Sustainable Farming Practices in Ghana',
    content: 'Comprehensive guide to sustainable farming methods including crop rotation, organic fertilizers, and water conservation techniques.',
    summary: 'Learn essential sustainable farming practices for better yields and environmental protection.',
    category: 'crop-management',
    author_name: 'Dr. Kwame Nkrumah',
    featured: true,
    reading_time_minutes: 8,
    status: 'published',
    created_at: '2024-11-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Integrated Pest Management for Cocoa',
    content: 'Detailed guide on managing cocoa pests using integrated approaches that combine biological, cultural, and minimal chemical methods.',
    summary: 'Effective pest control strategies for cocoa farmers to maintain healthy crops.',
    category: 'pest-control',
    author_name: 'Prof. Ama Asante',
    featured: false,
    reading_time_minutes: 12,
    status: 'published',
    created_at: '2024-11-10T14:30:00Z'
  }
];

const AdminKnowledge = () => {
  const { toast } = useToast();
  const [articles, setArticles] = useState<any[]>(mockArticles);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    category: '',
    author_name: 'Admin',
    featured: false,
    reading_time_minutes: 5
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newArticle = {
        id: String(Date.now()),
        ...formData,
        status: 'published',
        created_at: new Date().toISOString()
      };

      setArticles(prev => [newArticle, ...prev]);

      toast({
        title: "Success",
        description: "Knowledge article created successfully",
      });
      
      setShowForm(false);
      setFormData({
        title: '',
        content: '',
        summary: '',
        category: '',
        author_name: 'Admin',
        featured: false,
        reading_time_minutes: 5
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to create article",
        variant: "destructive",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Knowledge Hub Management</h1>
            <p className="text-muted-foreground">Create and manage educational content</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Article
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Article</CardTitle>
              <CardDescription>Add educational content for farmers</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({...prev, category: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="crop-management">Crop Management</SelectItem>
                        <SelectItem value="pest-control">Pest Control</SelectItem>
                        <SelectItem value="soil-health">Soil Health</SelectItem>
                        <SelectItem value="irrigation">Irrigation</SelectItem>
                        <SelectItem value="market-trends">Market Trends</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary">Summary</Label>
                  <Textarea
                    id="summary"
                    placeholder="Brief summary of the article"
                    value={formData.summary}
                    onChange={(e) => setFormData(prev => ({...prev, summary: e.target.value}))}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    placeholder="Article content in markdown format"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({...prev, content: e.target.value}))}
                    rows={8}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reading_time">Reading Time (minutes)</Label>
                    <Input
                      id="reading_time"
                      type="number"
                      min="1"
                      max="60"
                      value={formData.reading_time_minutes}
                      onChange={(e) => setFormData(prev => ({...prev, reading_time_minutes: parseInt(e.target.value) || 5}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="featured">Featured Article</Label>
                    <Select value={formData.featured.toString()} onValueChange={(value) => setFormData(prev => ({...prev, featured: value === 'true'}))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="false">No</SelectItem>
                        <SelectItem value="true">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit">Create Article</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Published Articles</CardTitle>
            <CardDescription>Manage existing knowledge base content</CardDescription>
          </CardHeader>
          <CardContent>
            {articles.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No articles yet</p>
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Article
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {articles.map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{article.title}</h3>
                        {article.featured && (
                          <Badge variant="secondary">Featured</Badge>
                        )}
                        <Badge variant="outline">{article.category}</Badge>
                        <Badge variant="outline">{article.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{article.summary}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>By {article.author_name}</span>
                        <span>{article.reading_time_minutes} min read</span>
                        <span>{new Date(article.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminKnowledge;