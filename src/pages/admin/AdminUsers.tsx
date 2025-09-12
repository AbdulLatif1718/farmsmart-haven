import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Users, Search, UserCheck, UserX, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  full_name: string;
  email: string;
  role: 'farmer' | 'investor' | 'admin';
  status: 'active' | 'suspended' | 'pending';
  created_at: string;
  phone?: string;
  location?: string;
  last_login?: string;
}

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    full_name: 'Kwame Asante',
    email: 'kwame.asante@email.com',
    role: 'farmer',
    status: 'active',
    created_at: '2024-10-15T10:00:00Z',
    phone: '+233241234567',
    location: 'Ashanti Region',
    last_login: '2024-12-01T08:30:00Z'
  },
  {
    id: '2',
    full_name: 'Sarah Johnson',
    email: 'sarah.j@investor.com',
    role: 'investor',
    status: 'active',
    created_at: '2024-09-20T14:30:00Z',
    phone: '+233207654321',
    location: 'Greater Accra',
    last_login: '2024-11-30T16:45:00Z'
  },
  {
    id: '3',
    full_name: 'Emmanuel Osei',
    email: 'emmanuel.osei@farm.gh',
    role: 'farmer',
    status: 'pending',
    created_at: '2024-11-28T09:15:00Z',
    phone: '+233244987654',
    location: 'Western Region',
    last_login: null
  },
  {
    id: '4',
    full_name: 'Fatima Mohammed',
    email: 'fatima@gmail.com',
    role: 'farmer',
    status: 'suspended',
    created_at: '2024-08-10T11:20:00Z',
    phone: '+233201122334',
    location: 'Northern Region',
    last_login: '2024-11-20T12:00:00Z'
  }
];

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { toast } = useToast();

  const filteredUsers = users.filter(user =>
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateUserStatus = (userId: string, newStatus: 'active' | 'suspended') => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    
    toast({
      title: "Success",
      description: `User status updated to ${newStatus}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'farmer':
        return <Badge variant="outline" className="text-green-600 border-green-600">Farmer</Badge>;
      case 'investor':
        return <Badge variant="outline" className="text-blue-600 border-blue-600">Investor</Badge>;
      case 'admin':
        return <Badge variant="outline" className="text-purple-600 border-purple-600">Admin</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const getUserStats = () => {
    const total = users.length;
    const active = users.filter(u => u.status === 'active').length;
    const pending = users.filter(u => u.status === 'pending').length;
    const farmers = users.filter(u => u.role === 'farmer').length;
    const investors = users.filter(u => u.role === 'investor').length;

    return { total, active, pending, farmers, investors };
  };

  const stats = getUserStats();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage user accounts, permissions, and status
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <UserX className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Farmers</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.farmers}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Investors</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.investors}</div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Users</CardTitle>
                <CardDescription>
                  Manage and monitor all platform users
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{user.full_name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{user.location || 'N/A'}</TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedUser(user)}
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>User Details</DialogTitle>
                            <DialogDescription>
                              Manage user account and permissions
                            </DialogDescription>
                          </DialogHeader>
                          
                          {selectedUser && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium">Full Name</p>
                                  <p className="text-sm">{selectedUser.full_name}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Email</p>
                                  <p className="text-sm flex items-center gap-1">
                                    <Mail className="h-3 w-3" />
                                    {selectedUser.email}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Phone</p>
                                  <p className="text-sm flex items-center gap-1">
                                    <Phone className="h-3 w-3" />
                                    {selectedUser.phone || 'Not provided'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Role</p>
                                  <p className="text-sm">{getRoleBadge(selectedUser.role)}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Status</p>
                                  <p className="text-sm">{getStatusBadge(selectedUser.status)}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Location</p>
                                  <p className="text-sm">{selectedUser.location || 'Not provided'}</p>
                                </div>
                              </div>

                              <div className="border-t pt-4">
                                <p className="text-sm font-medium mb-2">Account Actions</p>
                                <div className="flex gap-2">
                                  {selectedUser.status === 'active' ? (
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => updateUserStatus(selectedUser.id, 'suspended')}
                                    >
                                      Suspend User
                                    </Button>
                                  ) : (
                                    <Button
                                      size="sm"
                                      onClick={() => updateUserStatus(selectedUser.id, 'active')}
                                    >
                                      Activate User
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;