
import React from 'react';
import { InvestorLayout } from "@/components/layout/InvestorLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, 
  Send, 
  Search,
  Clock,
  User
} from 'lucide-react';

const InvestorMessages = () => {
  const conversations = [
    {
      id: 1,
      name: "Kwame Asante",
      role: "Farmer",
      lastMessage: "Thank you for the investment! The maize is growing well.",
      timestamp: "2 hours ago",
      unread: 2,
      avatar: "KA"
    },
    {
      id: 2,
      name: "AgriTech Support",
      role: "Support Team",
      lastMessage: "Your investment report is ready for download.",
      timestamp: "1 day ago",
      unread: 0,
      avatar: "AS"
    }
  ];

  return (
    <InvestorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Communicate with farmers and support team</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search conversations..." className="pl-10" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {conversations.map((conversation) => (
                  <div key={conversation.id} className="p-3 border rounded cursor-pointer hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-100 text-blue-700">
                          {conversation.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className="font-medium truncate">{conversation.name}</p>
                          {conversation.unread > 0 && (
                            <Badge className="bg-blue-600">{conversation.unread}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{conversation.role}</p>
                        <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                        <p className="text-xs text-muted-foreground">{conversation.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="h-96">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Kwame Asante
                </CardTitle>
                <CardDescription>Farmer Partner • Northern Region</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                <div className="flex-1 space-y-4 mb-4">
                  <div className="bg-muted p-3 rounded-lg max-w-xs">
                    <p className="text-sm">Hello! I wanted to update you on the maize farm progress.</p>
                    <p className="text-xs text-muted-foreground mt-1">10:30 AM</p>
                  </div>
                  <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs ml-auto">
                    <p className="text-sm">Great to hear! How is the growth looking?</p>
                    <p className="text-xs opacity-75 mt-1">10:35 AM</p>
                  </div>
                  <div className="bg-muted p-3 rounded-lg max-w-xs">
                    <p className="text-sm">The crops are thriving! We expect harvest in 2 months.</p>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Input placeholder="Type your message..." className="flex-1" />
                  <Button>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </InvestorLayout>
  );
};

export default InvestorMessages;
