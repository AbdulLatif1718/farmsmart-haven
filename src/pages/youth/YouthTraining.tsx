
import React, { useState } from 'react';
import { YouthLayout } from "@/components/layout/YouthLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Clock, 
  Users, 
  MapPin,
  Video,
  Calendar,
  Award,
  Star,
  Filter,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const YouthTraining = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const trainings = [
    {
      id: 1,
      title: "Modern Irrigation Techniques",
      instructor: "Dr. Kwame Asante",
      date: "2025-05-26",
      time: "10:00 AM",
      duration: "3 hours",
      level: "Intermediate",
      enrolled: 45,
      maxCapacity: 50,
      type: "In-person",
      location: "Agricultural Training Center, Kumasi",
      price: "Free",
      rating: 4.8,
      category: "Technology"
    },
    {
      id: 2,
      title: "Business Planning for Young Farmers",
      instructor: "Sarah Osei, MBA",
      date: "2025-05-28",
      time: "2:00 PM",
      duration: "4 hours",
      level: "Beginner",
      enrolled: 32,
      maxCapacity: 40,
      type: "Online",
      location: "Virtual Classroom",
      price: "₵50",
      rating: 4.9,
      category: "Business"
    },
    {
      id: 3,
      title: "Sustainable Pest Management",
      instructor: "Prof. Agnes Mensah",
      date: "2025-06-02",
      time: "9:00 AM",
      duration: "5 hours",
      level: "Advanced",
      enrolled: 28,
      maxCapacity: 35,
      type: "Hybrid",
      location: "University of Ghana, Legon",
      price: "₵100",
      rating: 4.7,
      category: "Crop Management"
    },
    {
      id: 4,
      title: "Organic Farming Certification",
      instructor: "Emmanuel Nkrumah",
      date: "2025-06-05",
      time: "8:00 AM",
      duration: "2 days",
      level: "Advanced",
      enrolled: 20,
      maxCapacity: 25,
      type: "In-person",
      location: "Organic Farm Institute, Kumasi",
      price: "₵300",
      rating: 4.9,
      category: "Certification"
    }
  ];

  const myEnrollments = [
    {
      id: 1,
      title: "Modern Irrigation Techniques",
      progress: 75,
      nextSession: "May 26, 10:00 AM",
      status: "In Progress"
    },
    {
      id: 2,
      title: "Organic Farming Basics",
      progress: 100,
      completedDate: "May 15, 2025",
      status: "Completed",
      certificate: true
    }
  ];

  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || training.type.toLowerCase() === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <YouthLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Training & Development</h1>
          <p className="text-muted-foreground">Enhance your agricultural skills with expert-led training programs</p>
        </div>

        <Tabs defaultValue="available" className="space-y-6">
          <TabsList>
            <TabsTrigger value="available">Available Training</TabsTrigger>
            <TabsTrigger value="enrolled">My Enrollments</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-6">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search training programs..."
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
                  variant={filterType === 'online' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterType('online')}
                >
                  Online
                </Button>
                <Button 
                  variant={filterType === 'in-person' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterType('in-person')}
                >
                  In-person
                </Button>
                <Button 
                  variant={filterType === 'hybrid' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterType('hybrid')}
                >
                  Hybrid
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTrainings.map((training) => (
                <Card key={training.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{training.title}</CardTitle>
                        <CardDescription>by {training.instructor}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={training.type === 'Online' ? 'secondary' : training.type === 'In-person' ? 'default' : 'outline'}>
                          {training.type}
                        </Badge>
                        <Badge variant="outline">{training.level}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{training.date}</p>
                          <p className="text-muted-foreground">{training.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{training.duration}</p>
                          <p className="text-muted-foreground">Duration</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <p>{training.location}</p>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{training.enrolled}/{training.maxCapacity} enrolled</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{training.rating}</span>
                      </div>
                    </div>

                    <Progress value={(training.enrolled / training.maxCapacity) * 100} className="h-2" />

                    <div className="flex justify-between items-center">
                      <Badge variant="outline">{training.category}</Badge>
                      <p className="font-medium text-lg">{training.price}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      disabled={training.enrolled >= training.maxCapacity}
                    >
                      {training.enrolled >= training.maxCapacity ? 'Fully Booked' : 'Enroll Now'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="enrolled" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {myEnrollments.map((enrollment) => (
                <Card key={enrollment.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{enrollment.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge variant={enrollment.status === 'Completed' ? 'default' : 'secondary'}>
                        {enrollment.status}
                      </Badge>
                      {enrollment.certificate && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <Award className="h-3 w-3 mr-1" />
                          Certified
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span className="font-medium">{enrollment.progress}%</span>
                      </div>
                      <Progress value={enrollment.progress} className="h-2" />
                    </div>
                    
                    {enrollment.status === 'In Progress' && (
                      <div>
                        <p className="text-sm text-muted-foreground">Next Session</p>
                        <p className="font-medium">{enrollment.nextSession}</p>
                      </div>
                    )}

                    {enrollment.status === 'Completed' && (
                      <div>
                        <p className="text-sm text-muted-foreground">Completed on</p>
                        <p className="font-medium">{enrollment.completedDate}</p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    {enrollment.status === 'In Progress' ? (
                      <Button className="w-full">Continue Learning</Button>
                    ) : (
                      <>
                        <Button variant="outline" className="flex-1">View Certificate</Button>
                        <Button className="flex-1">Download PDF</Button>
                      </>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            <div className="text-center py-12">
              <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Your Certificates</h3>
              <p className="text-muted-foreground mb-4">Complete training programs to earn certificates</p>
              <Button>Browse Training Programs</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </YouthLayout>
  );
};

export default YouthTraining;
