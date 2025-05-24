
import React, { useState } from 'react';
import { YouthLayout } from "@/components/layout/YouthLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  MessageSquare, 
  Calendar, 
  Users, 
  Clock,
  Search,
  MapPin,
  Award,
  Video,
  Phone
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const YouthMentors = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mentors = [
    {
      id: 1,
      name: "Emmanuel Nkrumah",
      expertise: "Organic Farming & Certification",
      experience: "15 years",
      rating: 4.9,
      students: 23,
      nextAvailable: "Tomorrow, 2:00 PM",
      image: "EN",
      location: "Ashanti Region",
      hourlyRate: "₵50",
      specialties: ["Organic Certification", "Crop Rotation", "Soil Management"],
      languages: ["English", "Twi"],
      completedSessions: 156,
      bio: "Expert in organic farming with over 15 years of experience helping young farmers transition to sustainable practices."
    },
    {
      id: 2,
      name: "Akosua Dadzie",
      expertise: "Livestock Management",
      experience: "12 years",
      rating: 4.8,
      students: 31,
      nextAvailable: "May 26, 10:00 AM",
      image: "AD",
      location: "Northern Region",
      hourlyRate: "₵45",
      specialties: ["Poultry Management", "Animal Health", "Feed Optimization"],
      languages: ["English", "Dagbani"],
      completedSessions: 203,
      bio: "Livestock specialist focusing on sustainable animal husbandry and modern farming techniques."
    },
    {
      id: 3,
      name: "Joseph Mensah",
      expertise: "Agricultural Finance",
      experience: "8 years",
      rating: 4.7,
      students: 18,
      nextAvailable: "May 27, 4:00 PM",
      image: "JM",
      location: "Greater Accra",
      hourlyRate: "₵60",
      specialties: ["Business Planning", "Loan Applications", "Financial Literacy"],
      languages: ["English", "Ga"],
      completedSessions: 89,
      bio: "Financial expert helping young farmers access funding and manage agricultural investments effectively."
    },
    {
      id: 4,
      name: "Sarah Adjei",
      expertise: "Modern Technology Integration",
      experience: "6 years",
      rating: 4.9,
      students: 27,
      nextAvailable: "May 28, 1:00 PM",
      image: "SA",
      location: "Western Region",
      hourlyRate: "₵55",
      specialties: ["Smart Irrigation", "IoT Sensors", "Precision Agriculture"],
      languages: ["English", "Fante"],
      completedSessions: 134,
      bio: "Technology integration specialist helping farmers adopt modern agricultural technologies."
    }
  ];

  const mySessions = [
    {
      id: 1,
      mentorName: "Emmanuel Nkrumah",
      date: "May 25, 2025",
      time: "2:00 PM",
      duration: "1 hour",
      topic: "Organic Certification Process",
      status: "Upcoming",
      type: "Video Call"
    },
    {
      id: 2,
      mentorName: "Joseph Mensah",
      date: "May 20, 2025",
      time: "4:00 PM",
      duration: "1.5 hours",
      topic: "Business Plan Review",
      status: "Completed",
      type: "In-person",
      rating: 5
    }
  ];

  const filteredMentors = mentors.filter(mentor =>
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.expertise.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <YouthLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Mentor Network</h1>
          <p className="text-muted-foreground">Connect with experienced agricultural professionals for guidance and support</p>
        </div>

        <Tabs defaultValue="find" className="space-y-6">
          <TabsList>
            <TabsTrigger value="find">Find Mentors</TabsTrigger>
            <TabsTrigger value="sessions">My Sessions</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="find" className="space-y-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search mentors by name or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredMentors.map((mentor) => (
                <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-green-100 text-green-700 text-lg">
                          {mentor.image}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{mentor.name}</CardTitle>
                        <CardDescription className="text-sm">{mentor.expertise}</CardDescription>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{mentor.rating}</span>
                            <span className="text-muted-foreground">({mentor.completedSessions} sessions)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{mentor.students} students</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{mentor.bio}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Experience</p>
                        <p className="font-medium">{mentor.experience}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Hourly Rate</p>
                        <p className="font-medium">{mentor.hourlyRate}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Specialties</p>
                      <div className="flex flex-wrap gap-1">
                        {mentor.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{mentor.location}</span>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Next Available</p>
                      <p className="text-sm font-medium text-green-600">{mentor.nextAvailable}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      Book Session
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <div className="space-y-4">
              {mySessions.map((session) => (
                <Card key={session.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{session.topic}</CardTitle>
                        <CardDescription>with {session.mentorName}</CardDescription>
                      </div>
                      <Badge variant={session.status === 'Upcoming' ? 'default' : 'secondary'}>
                        {session.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{session.date}</p>
                          <p className="text-muted-foreground">{session.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{session.duration}</p>
                          <p className="text-muted-foreground">Duration</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {session.type === 'Video Call' ? (
                          <Video className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Users className="h-4 w-4 text-muted-foreground" />
                        )}
                        <div>
                          <p className="font-medium">{session.type}</p>
                          <p className="text-muted-foreground">Type</p>
                        </div>
                      </div>
                      {session.rating && (
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <div>
                            <p className="font-medium">{session.rating}/5</p>
                            <p className="text-muted-foreground">Rating</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    {session.status === 'Upcoming' ? (
                      <>
                        <Button variant="outline" size="sm">Reschedule</Button>
                        <Button size="sm">Join Session</Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" size="sm">View Notes</Button>
                        <Button size="sm">Book Follow-up</Button>
                      </>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <div className="text-center py-12">
              <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Favorite Mentors Yet</h3>
              <p className="text-muted-foreground mb-4">Save mentors you'd like to work with again</p>
              <Button>Find Mentors</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </YouthLayout>
  );
};

export default YouthMentors;
