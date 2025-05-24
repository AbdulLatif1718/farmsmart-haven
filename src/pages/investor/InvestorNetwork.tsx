
import React from 'react';
import { InvestorLayout } from "@/components/layout/InvestorLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  MessageSquare, 
  UserPlus,
  Star,
  MapPin
} from 'lucide-react';

const InvestorNetwork = () => {
  const network = [
    {
      id: 1,
      name: "Kwame Asante",
      role: "Farmer Partner",
      location: "Northern Region",
      expertise: "Maize Cultivation",
      rating: 4.8,
      projects: 3,
      avatar: "KA"
    },
    {
      id: 2,
      name: "Dr. Sarah Adjei",
      role: "Agricultural Advisor",
      location: "Accra",
      expertise: "Crop Technology",
      rating: 4.9,
      projects: 12,
      avatar: "SA"
    },
    {
      id: 3,
      name: "Michael Oppong",
      role: "Fellow Investor",
      location: "London, UK",
      expertise: "Agricultural Finance",
      rating: 4.7,
      projects: 8,
      avatar: "MO"
    }
  ];

  return (
    <InvestorLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Professional Network</h1>
            <p className="text-muted-foreground">Connect with farmers, advisors, and fellow investors</p>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Find Connections
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {network.map((person) => (
            <Card key={person.id}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {person.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{person.name}</CardTitle>
                    <CardDescription>{person.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{person.location}</span>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Expertise</p>
                  <p className="font-medium">{person.expertise}</p>
                </div>

                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-muted-foreground">Rating</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{person.rating}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Projects</p>
                    <p className="font-medium">{person.projects}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  <Button size="sm" className="flex-1">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Network Statistics
            </CardTitle>
            <CardDescription>Your network growth and engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Total Connections</p>
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Active Farmers</p>
              </div>
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Fellow Investors</p>
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Advisors</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </InvestorLayout>
  );
};

export default InvestorNetwork;
