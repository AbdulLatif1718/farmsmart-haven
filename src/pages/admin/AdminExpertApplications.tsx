import { useEffect, useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { MapPin, CheckCircle, XCircle, Clock, Mail, Phone, Star } from 'lucide-react';

const AdminExpertApplications = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, [filter]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('expert_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setApplications(data || []);
    } catch (error: any) {
      console.error('Error fetching expert applications:', error);
      toast({
        title: "Error",
        description: "Failed to load applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId: string, newStatus: 'approved' | 'rejected') => {
    try {
      setProcessing(true);
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase
        .from('expert_applications')
        .update({
          status: newStatus,
          reviewed_by: user?.id,
          reviewed_at: new Date().toISOString(),
          admin_notes: adminNotes || null
        })
        .eq('id', applicationId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Application ${newStatus} successfully`,
      });

      setSelectedApp(null);
      setAdminNotes('');
      fetchApplications();
    } catch (error: any) {
      console.error('Error updating application:', error);
      toast({
        title: "Error",
        description: "Failed to update application",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Expert Applications</h1>
          <p className="text-muted-foreground">Review and verify agricultural expert applications</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            onClick={() => setFilter('pending')}
          >
            Pending
          </Button>
          <Button
            variant={filter === 'approved' ? 'default' : 'outline'}
            onClick={() => setFilter('approved')}
          >
            Approved
          </Button>
          <Button
            variant={filter === 'rejected' ? 'default' : 'outline'}
            onClick={() => setFilter('rejected')}
          >
            Rejected
          </Button>
        </div>

        {/* Applications List */}
        <div className="grid gap-4">
          {loading ? (
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">Loading applications...</p>
              </CardContent>
            </Card>
          ) : applications.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">No applications found</p>
              </CardContent>
            </Card>
          ) : (
            applications.map((app) => (
              <Card key={app.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle>{app.full_name}</CardTitle>
                      <CardDescription>{app.title}</CardDescription>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {app.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {app.experience_years}+ years
                        </span>
                      </div>
                    </div>
                    {getStatusBadge(app.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Specialization:</span>
                        <p className="font-medium capitalize">{app.specialization.replace('-', ' ')}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Hourly Rate:</span>
                        <p className="font-medium">GH₵ {app.hourly_rate || 'Not specified'}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Contact:</span>
                        <div className="flex gap-4 mt-1">
                          <span className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3" />
                            {app.email}
                          </span>
                          <span className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3" />
                            {app.phone}
                          </span>
                        </div>
                      </div>
                    </div>

                    {app.certifications && app.certifications.length > 0 && (
                      <div>
                        <span className="text-sm text-muted-foreground">Certifications:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {app.certifications.map((cert: string, idx: number) => (
                            <Badge key={idx} variant="outline">{cert}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {app.services_offered && app.services_offered.length > 0 && (
                      <div>
                        <span className="text-sm text-muted-foreground">Services Offered:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {app.services_offered.map((service: string, idx: number) => (
                            <Badge key={idx} variant="secondary">{service}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <span className="text-sm text-muted-foreground">Bio:</span>
                      <p className="text-sm mt-1 line-clamp-3">{app.bio}</p>
                    </div>

                    {app.status === 'pending' && (
                      <div className="flex gap-2 pt-4">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => {
                            setSelectedApp(app);
                            setAdminNotes(app.admin_notes || '');
                          }}
                        >
                          Review Application
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Review Dialog */}
        {selectedApp && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
              <CardHeader>
                <CardTitle>Review Expert Application</CardTitle>
                <CardDescription>{selectedApp.full_name} - {selectedApp.title}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="font-medium">Full Bio:</span>
                    <p className="mt-1">{selectedApp.bio}</p>
                  </div>
                  {selectedApp.education && (
                    <div>
                      <span className="font-medium">Education:</span>
                      <p className="mt-1">{selectedApp.education}</p>
                    </div>
                  )}
                  {selectedApp.languages && (
                    <div>
                      <span className="font-medium">Languages:</span>
                      <p className="mt-1">{selectedApp.languages.join(', ')}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Admin Notes</label>
                  <Textarea
                    placeholder="Add notes about this application..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => handleStatusUpdate(selectedApp.id, 'approved')}
                    disabled={processing}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleStatusUpdate(selectedApp.id, 'rejected')}
                    disabled={processing}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedApp(null);
                      setAdminNotes('');
                    }}
                    disabled={processing}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminExpertApplications;