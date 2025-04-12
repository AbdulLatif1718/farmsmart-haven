
import React from 'react';
import { BusinessLayout } from '@/components/layout/BusinessLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Search, Phone, Video, MoreVertical, UserCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const Messages = () => {
  return (
    <BusinessLayout activeRole="investor">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Messages</h1>
        <p className="text-muted-foreground">
          Connect with farmers, landowners, and investors
        </p>
      </div>

      <Card className="h-[calc(100vh-13rem)]">
        <div className="grid h-full" style={{ gridTemplateColumns: '300px 1fr' }}>
          {/* Sidebar */}
          <div className="border-r">
            <div className="p-4">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search contacts..." className="pl-9" />
              </div>
              <Button className="w-full">New Message</Button>
            </div>
            <ScrollArea className="h-[calc(100vh-18rem)]">
              <div className="space-y-1 px-1">
                <ContactItem
                  name="John Doe"
                  avatar="JD"
                  message="When can I visit the farm?"
                  time="10:30 AM"
                  active={true}
                />
                <ContactItem
                  name="Sarah K."
                  avatar="SK"
                  message="I'd like to discuss the contract terms."
                  time="Yesterday"
                  active={false}
                />
                <ContactItem
                  name="Kwame B."
                  avatar="KB"
                  message="Thanks for your investment!"
                  time="Yesterday"
                  active={false}
                />
                <ContactItem
                  name="Ama Owusu"
                  avatar="AO"
                  message="The cocoa harvest will be next month."
                  time="Tuesday"
                  active={false}
                />
                <ContactItem
                  name="Ibrahim"
                  avatar="IM"
                  message="I've uploaded the land documents."
                  time="Monday"
                  active={false}
                />
              </div>
            </ScrollArea>
          </div>

          {/* Chat area */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback className="bg-blue-100 text-blue-800">JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">John Doe</h3>
                  <p className="text-xs text-muted-foreground">Farmer • Tamale</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                <ChatMessage
                  sent={false}
                  avatar="JD"
                  message="Hello, I'd like to show you around the farm next week if you're interested in investing."
                  time="10:15 AM"
                />
                <ChatMessage
                  sent={true}
                  avatar="ME"
                  message="That sounds good. What days are you available?"
                  time="10:20 AM"
                />
                <ChatMessage
                  sent={false}
                  avatar="JD"
                  message="I can do Tuesday or Thursday afternoon. The maize is growing well and I want to show you the irrigation system we've installed."
                  time="10:25 AM"
                />
                <ChatMessage
                  sent={true}
                  avatar="ME"
                  message="Thursday works for me. What time should I arrive?"
                  time="10:28 AM"
                />
                <ChatMessage
                  sent={false}
                  avatar="JD"
                  message="Let's say 2:00 PM. I'll send you the exact location via GPS pin."
                  time="10:30 AM"
                />
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </BusinessLayout>
  );
};

// Helper components
const ContactItem = ({ name, avatar, message, time, active }) => (
  <div className={`flex items-center p-3 rounded-md cursor-pointer ${active ? 'bg-slate-100 dark:bg-slate-800' : 'hover:bg-slate-50 dark:hover:bg-slate-900'}`}>
    <Avatar className="h-10 w-10 mr-3">
      <AvatarFallback className={`${active ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'}`}>{avatar}</AvatarFallback>
    </Avatar>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-baseline">
        <h4 className="font-medium truncate">{name}</h4>
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
      <p className="text-xs text-muted-foreground truncate">{message}</p>
    </div>
    {active && <div className="w-2 h-2 bg-blue-600 rounded-full mr-1"></div>}
  </div>
);

const ChatMessage = ({ sent, avatar, message, time }) => (
  <div className={`flex ${sent ? 'justify-end' : 'justify-start'}`}>
    <div className={`flex ${sent ? 'flex-row-reverse' : 'flex-row'} max-w-[80%]`}>
      <Avatar className={`h-8 w-8 ${sent ? 'ml-3' : 'mr-3'}`}>
        <AvatarFallback className={sent ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'}>{avatar}</AvatarFallback>
      </Avatar>
      <div>
        <div className={`p-3 rounded-lg ${sent ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
          <p className="text-sm">{message}</p>
        </div>
        <p className={`text-xs text-muted-foreground mt-1 ${sent ? 'text-right' : 'text-left'}`}>{time}</p>
      </div>
    </div>
  </div>
);

export default Messages;
