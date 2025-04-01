
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Video, FileText, Clock, Star, Download, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const Knowledge = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Knowledge Hub</h1>
        <p className="text-muted-foreground">
          Access farming guides, tutorials, and resources to improve your agricultural practices.
        </p>
      </div>
      
      <Tabs defaultValue="featured" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="guides">Farming Guides</TabsTrigger>
          <TabsTrigger value="saved">Saved Content</TabsTrigger>
        </TabsList>
        
        <TabsContent value="featured">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Featured Course</CardTitle>
                <CardDescription>
                  Learn modern farming techniques from experts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden mb-4 bg-muted h-48">
                  <div className="w-full h-full flex items-center justify-center">
                    Featured course video will be displayed here
                  </div>
                </div>
                <h3 className="text-lg font-medium mb-2">Sustainable Farming Practices</h3>
                <p className="text-sm text-muted-foreground">
                  Learn sustainable farming techniques that improve soil health, conserve water, and increase yields while reducing environmental impact.
                </p>
                <div className="flex items-center mt-4 text-sm">
                  <div className="flex items-center mr-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>12 lessons</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span>4.8 (120 reviews)</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Start Course
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Latest Resources</CardTitle>
              </CardHeader>
              <CardContent className="pb-0">
                <div className="space-y-4">
                  {[
                    {
                      title: "Climate-Smart Agriculture",
                      type: "Guide",
                      icon: FileText
                    },
                    {
                      title: "Pest Management Techniques",
                      type: "Video",
                      icon: Video
                    },
                    {
                      title: "Market Pricing Strategies",
                      type: "Guide",
                      icon: FileText
                    },
                  ].map((resource, index) => (
                    <div key={index} className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-leaf-100 dark:bg-leaf-800 flex items-center justify-center mr-3">
                        <resource.icon className="h-4 w-4 text-leaf-600 dark:text-leaf-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{resource.title}</h4>
                        <div className="flex items-center justify-between mt-1">
                          <Badge variant="outline" className="text-xs font-normal">
                            {resource.type}
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-7 px-2">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="link" size="sm">
                  View All Resources
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="courses">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Modern Irrigation Techniques",
                lessons: 8,
                duration: "3 hours",
                level: "Intermediate",
                image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
              },
              {
                title: "Organic Pest Control",
                lessons: 5,
                duration: "2 hours",
                level: "Beginner",
                image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
              },
              {
                title: "Advanced Crop Rotation",
                lessons: 10,
                duration: "4 hours",
                level: "Advanced",
                image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
              },
            ].map((course, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base font-medium">
                      {course.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      {course.lessons} lessons
                    </span>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total Duration: {course.duration}
                  </p>
                </CardContent>
                <CardFooter className="grid grid-cols-2 gap-3">
                  <Button variant="outline">
                    Preview
                  </Button>
                  <Button>
                    Enroll
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="guides">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Crop Rotation Planning",
                description: "Learn how to plan effective crop rotations to improve soil health and reduce pests",
                format: "PDF Guide"
              },
              {
                title: "Natural Fertilizers",
                description: "Create your own natural fertilizers using local materials",
                format: "Step-by-Step Guide"
              },
              {
                title: "Water Conservation",
                description: "Techniques for conserving water during dry seasons",
                format: "Illustrated Guide"
              },
              {
                title: "Pest Identification",
                description: "Visual guide to identifying common crop pests in Ghana",
                format: "Reference Guide"
              },
            ].map((guide, index) => (
              <Card key={index} className="flex flex-col md:flex-row">
                <div className="md:w-1/4 bg-leaf-50 dark:bg-leaf-900/20 flex items-center justify-center p-4 md:rounded-l-lg md:rounded-r-none rounded-t-lg md:rounded-t-none">
                  <BookOpen className="h-10 w-10 text-leaf-600 dark:text-leaf-400" />
                </div>
                <div className="flex-1 p-4">
                  <h3 className="font-medium">{guide.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {guide.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <Badge variant="outline">{guide.format}</Badge>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <CardTitle>Saved Content</CardTitle>
              <CardDescription>
                Access your saved guides and courses for offline viewing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    title: "Pest Management Basics",
                    type: "Course",
                    savedDate: "May 10, 2023",
                    progress: 60
                  },
                  {
                    title: "Soil Testing Guide",
                    type: "PDF",
                    savedDate: "April 28, 2023",
                    progress: 100
                  }
                ].map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <Badge variant="outline" className="mr-2">
                            {item.type}
                          </Badge>
                          Saved on {item.savedDate}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        {item.progress === 100 ? "View" : "Continue"}
                      </Button>
                    </div>
                    {item.progress < 100 && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{item.progress}%</span>
                        </div>
                        <Progress value={item.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Knowledge;
