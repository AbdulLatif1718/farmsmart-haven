import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { adminAuth } from '@/utils/adminAuth';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import {
  FileText,
  Truck,
  Store,
  Wrench,
  BookOpen,
  Users,
  TrendingUp,
  DollarSign
} from 'lucide-react';

const AdminDashboard = () => {
  const isAuthenticated = adminAuth.isAuthenticated();
  const [stats, setStats] = useState({
    pendingApplications: 0,
    activeUsers: 0,
    totalInvestments: 0,
    farmApplications: 0
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch pending funding applications
      const { data: pendingFunding } = await supabase
        .from('funding_applications')
        .select('id')
        .eq('status', 'pending');

      // Fetch pending farm applications
      const { data: pendingFarms } = await supabase
        .from('farm_applications')
        .select('id')
        .eq('status', 'pending');

      // Fetch pending land applications
      const { data: pendingLand } = await supabase
        .from('land_applications')
        .select('id')
        .eq('status', 'pending');

      // Fetch pending expert applications
      const { data: pendingExperts } = await supabase
        .from('expert_applications')
        .select('id')
        .eq('status', 'pending');

      // Fetch total users
      const { data: users } = await supabase
        .from('profiles')
        .select('id');

      // Fetch approved funding applications for total investments
      const { data: approvedFunding } = await supabase
        .from('funding_applications')
        .select('funding_amount')
        .eq('status', 'approved');

      // Fetch recent funding applications for activity
      const { data: recentFundingApps } = await supabase
        .from('funding_applications')
        .select('full_name, project_title, funding_amount, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      // Fetch recent farm applications for activity
      const { data: recentFarmApps } = await supabase
        .from('farm_applications')
        .select('applicant_name, farm_name, created_at')
        .order('created_at', { ascending: false })
        .limit(2);

      const totalInvestments = approvedFunding?.reduce((sum, app) => sum + Number(app.funding_amount), 0) || 0;

      setStats({
        pendingApplications: (pendingFunding?.length || 0) + (pendingFarms?.length || 0) + (pendingLand?.length || 0) + (pendingExperts?.length || 0),
        activeUsers: users?.length || 0,
        totalInvestments,
        farmApplications: pendingFarms?.length || 0
      });

      // Combine recent activities
      const activities = [
        ...(recentFundingApps || []).map(app => ({
          type: 'funding',
          title: 'New funding application submitted',
          description: `${app.full_name} applied for $${Number(app.funding_amount).toLocaleString()} for ${app.project_title}`,
          time: app.created_at,
          icon: FileText,
          color: 'green'
        })),
        ...(recentFarmApps || []).map(app => ({
          type: 'farm',
          title: 'New farm application submitted',
          description: `${app.applicant_name} registered ${app.farm_name}`,
          time: app.created_at,
          icon: Users,
          color: 'blue'
        }))
      ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5);

      setRecentActivity(activities);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hour${Math.floor(diffInMinutes / 60) > 1 ? 's' : ''} ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} day${Math.floor(diffInMinutes / 1440) > 1 ? 's' : ''} ago`;
    }
  };

  const statsCards = [
    {
      title: 'Pending Applications',
      value: loading ? '...' : stats.pendingApplications.toString(),
      description: 'Farm and funding applications awaiting review',
      icon: FileText,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950'
    },
    {
      title: 'Active Users',
      value: loading ? '...' : stats.activeUsers.toLocaleString(),
      description: 'Registered farmers and investors',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950'
    },
    {
      title: 'Total Investments',
      value: loading ? '...' : `$${(stats.totalInvestments / 1000).toFixed(1)}K`,
      description: 'Total funding approved',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950'
    },
    {
      title: 'Farm Applications',
      value: loading ? '...' : stats.farmApplications.toString(),
      description: 'Pending farm registrations',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950'
    }
  ];

  const quickActions = [
    {
      title: 'Review Farm Applications',
      description: 'Approve or reject farm applications',
      icon: FileText,
      href: '/admin/farm-applications',
      badge: loading ? null : `${stats.farmApplications} pending`
    },
    {
      title: 'Review Funding Applications',
      description: 'Approve or reject pending applications',
      icon: FileText,
      href: '/admin/funding-applications',
      badge: loading ? null : `${stats.pendingApplications - stats.farmApplications} pending`
    },
    {
      title: 'Manage Transport',
      description: 'Add new transport and logistics options',
      icon: Truck,
      href: '/admin/transport',
      badge: null
    },
    {
      title: 'Update Marketplace',
      description: 'Manage marketplace listings and categories',
      icon: Store,
      href: '/admin/marketplace',
      badge: null
    },
    {
      title: 'Machinery Rentals',
      description: 'Add and manage machinery rental options',
      icon: Wrench,
      href: '/admin/machinery',
      badge: null
    },
    {
      title: 'Knowledge Hub',
      description: 'Create and manage educational content',
      icon: BookOpen,
      href: '/admin/knowledge',
      badge: null
    },
    {
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      icon: Users,
      href: '/admin/users',
      badge: null
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening on your platform.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statsCards.map((card) => (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <card.icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action) => (
              <Link key={action.title} to={action.href}>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <action.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{action.title}</CardTitle>
                        </div>
                      </div>
                      {action.badge && (
                        <Badge variant="secondary">{action.badge}</Badge>
                      )}
                    </div>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">Loading recent activity...</p>
                </div>
              ) : recentActivity.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No recent activity</p>
                </div>
              ) : (
                recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className={`p-1 rounded ${
                      activity.color === 'green' 
                        ? 'bg-green-100 dark:bg-green-900' 
                        : 'bg-blue-100 dark:bg-blue-900'
                    }`}>
                      <activity.icon className={`h-4 w-4 ${
                        activity.color === 'green' 
                          ? 'text-green-600' 
                          : 'text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(activity.time)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;