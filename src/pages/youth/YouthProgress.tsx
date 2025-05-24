
import React from 'react';
import { YouthLayout } from "@/components/layout/YouthLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Award, 
  Target, 
  TrendingUp, 
  BookOpen,
  Users,
  Star,
  Calendar,
  BarChart3
} from 'lucide-react';

const YouthProgress = () => {
  const skillProgress = [
    { skill: "Crop Management", progress: 85, level: "Advanced" },
    { skill: "Livestock Care", progress: 72, level: "Intermediate" },
    { skill: "Business Planning", progress: 68, level: "Intermediate" },
    { skill: "Financial Management", progress: 79, level: "Advanced" },
    { skill: "Technology Integration", progress: 45, level: "Beginner" },
    { skill: "Sustainable Practices", progress: 91, level: "Expert" }
  ];

  const achievements = [
    {
      id: 1,
      title: "Organic Farming Certified",
      description: "Completed comprehensive organic farming certification",
      date: "May 2025",
      type: "certification",
      icon: Award
    },
    {
      id: 2,
      title: "First Project Success",
      description: "Achieved 150% ROI target on first agricultural project",
      date: "April 2025",
      type: "milestone",
      icon: Target
    },
    {
      id: 3,
      title: "Community Leader",
      description: "Mentored 5+ youth farmers in sustainable practices",
      date: "March 2025",
      type: "leadership",
      icon: Users
    },
    {
      id: 4,
      title: "Top Performer",
      description: "Ranked in top 10% of program participants",
      date: "February 2025",
      type: "performance",
      icon: Star
    }
  ];

  const learningStats = {
    totalHours: 48,
    coursesCompleted: 8,
    certifications: 3,
    mentorSessions: 12,
    projectsCompleted: 2,
    currentStreak: 15
  };

  const getSkillColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 60) return "bg-blue-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getLevelBadge = (level: string) => {
    const colors = {
      "Beginner": "bg-gray-100 text-gray-800",
      "Intermediate": "bg-blue-100 text-blue-800",
      "Advanced": "bg-green-100 text-green-800",
      "Expert": "bg-purple-100 text-purple-800"
    };
    return colors[level] || colors["Beginner"];
  };

  const getAchievementColor = (type: string) => {
    const colors = {
      "certification": "bg-blue-100 text-blue-600",
      "milestone": "bg-green-100 text-green-600",
      "leadership": "bg-purple-100 text-purple-600",
      "performance": "bg-yellow-100 text-yellow-600"
    };
    return colors[type] || colors["milestone"];
  };

  return (
    <YouthLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Progress & Development</h1>
          <p className="text-muted-foreground">Track your learning journey and celebrate achievements</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <p className="text-2xl font-bold">{learningStats.totalHours}</p>
              <p className="text-sm text-muted-foreground">Training Hours</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <p className="text-2xl font-bold">{learningStats.certifications}</p>
              <p className="text-sm text-muted-foreground">Certifications</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto text-purple-600 mb-2" />
              <p className="text-2xl font-bold">{learningStats.mentorSessions}</p>
              <p className="text-sm text-muted-foreground">Mentor Sessions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 mx-auto text-amber-600 mb-2" />
              <p className="text-2xl font-bold">{learningStats.projectsCompleted}</p>
              <p className="text-sm text-muted-foreground">Projects Done</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto text-red-600 mb-2" />
              <p className="text-2xl font-bold">{learningStats.coursesCompleted}</p>
              <p className="text-sm text-muted-foreground">Courses</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 mx-auto text-indigo-600 mb-2" />
              <p className="text-2xl font-bold">{learningStats.currentStreak}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skill Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Skill Development</CardTitle>
              <CardDescription>Track your progress across different agricultural domains</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {skillProgress.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.skill}</span>
                    <div className="flex items-center gap-2">
                      <Badge className={getLevelBadge(skill.level)} variant="outline">
                        {skill.level}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{skill.progress}%</span>
                    </div>
                  </div>
                  <div className="relative">
                    <Progress value={skill.progress} className="h-3" />
                    <div 
                      className={`absolute top-0 left-0 h-3 rounded-full transition-all ${getSkillColor(skill.progress)}`}
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements & Milestones</CardTitle>
              <CardDescription>Your accomplishments and earned credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement) => {
                const IconComponent = achievement.icon;
                return (
                  <div key={achievement.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${getAchievementColor(achievement.type)}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground mb-1">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground">{achievement.date}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Performance Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Performance Analytics
            </CardTitle>
            <CardDescription>Monthly progress and performance trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center mb-6">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Performance Charts</p>
                <p className="text-sm text-muted-foreground">Interactive analytics will be displayed here</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-medium text-green-600">Learning Velocity</h4>
                <p className="text-2xl font-bold mt-1">+23%</p>
                <p className="text-sm text-muted-foreground">vs last month</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-medium text-blue-600">Skill Acquisition</h4>
                <p className="text-2xl font-bold mt-1">4.2/5</p>
                <p className="text-sm text-muted-foreground">average rating</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-medium text-purple-600">Goal Achievement</h4>
                <p className="text-2xl font-bold mt-1">89%</p>
                <p className="text-sm text-muted-foreground">completion rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </YouthLayout>
  );
};

export default YouthProgress;
