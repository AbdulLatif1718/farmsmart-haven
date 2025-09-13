import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Eye, Check, X, FileText, Loader } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface FundingApplication {
  id: string;
  user_id: string | null;
  full_name: string;
  email: string;
  phone: string;
  project_title: string;
  project_description: string;
  funding_amount: number;
  purpose: string;
  timeline: string;
  expected_roi: number | null;
  collateral: string | null;
  business_plan: string | null;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

const FundingApplicationsPage = () => {
  const [applications, setApplications] = useState<FundingApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<FundingApplication | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('funding_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to fetch funding applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: 'approved' | 'rejected') => {
    setActionLoading(true);
    try {
      const { error } = await supabase
        .from('funding_applications')
        .update({ 
          status, 
          admin_notes: adminNotes || null,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', applicationId);

      if (error) throw error;
      
      setApplications(prevApplications => 
        prevApplications.map(app => 
          app.id === applicationId 
            ? { ...app, status, admin_notes: adminNotes || null }
            : app
        )
      );

      setSelectedApplication(null);
      setAdminNotes('');
      
      toast({
        title: "Success",
        description: `Application ${status} successfully`,
      });
    } catch (error) {
      console.error('Error updating application:', error);
      toast({
        title: "Error",
        description: "Failed to update application",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="text-green-600 border-green-600">Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-600">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Funding Applications</h1>
          <p className="text-muted-foreground">
            Review and manage funding applications from farmers
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              All Applications
            </CardTitle>
            <CardDescription>
              {applications.length} total applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No funding applications found</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Project Title</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{application.full_name}</p>
                          <p className="text-sm text-muted-foreground">{application.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{application.project_title}</TableCell>
                      <TableCell>GHS {application.funding_amount.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(application.status)}</TableCell>
                      <TableCell>{new Date(application.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedApplication(application);
                                setAdminNotes(application.admin_notes || '');
                              }}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{selectedApplication?.project_title}</DialogTitle>
                              <DialogDescription>
                                Application from {selectedApplication?.full_name}
                              </DialogDescription>
                            </DialogHeader>
                            
                            {selectedApplication && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Applicant</Label>
                                    <p className="text-sm">{selectedApplication.full_name}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Email</Label>
                                    <p className="text-sm">{selectedApplication.email}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Phone</Label>
                                    <p className="text-sm">{selectedApplication.phone}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Amount Requested</Label>
                                    <p className="text-sm">GHS {selectedApplication.funding_amount.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Timeline</Label>
                                    <p className="text-sm">{selectedApplication.timeline}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium">Expected ROI</Label>
                                    <p className="text-sm">{selectedApplication.expected_roi ? `${selectedApplication.expected_roi}%` : 'N/A'}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <Label className="text-sm font-medium">Project Description</Label>
                                  <p className="text-sm mt-1 p-3 bg-muted rounded-md">
                                    {selectedApplication.project_description}
                                  </p>
                                </div>

                                <div>
                                  <Label className="text-sm font-medium">Purpose</Label>
                                  <p className="text-sm mt-1 p-3 bg-muted rounded-md">
                                    {selectedApplication.purpose}
                                  </p>
                                </div>

                                {selectedApplication.collateral && (
                                  <div>
                                    <Label className="text-sm font-medium">Collateral</Label>
                                    <p className="text-sm mt-1 p-3 bg-muted rounded-md">
                                      {selectedApplication.collateral}
                                    </p>
                                  </div>
                                )}

                                {selectedApplication.business_plan && (
                                  <div>
                                    <Label className="text-sm font-medium">Business Plan</Label>
                                    <p className="text-sm mt-1 p-3 bg-muted rounded-md">
                                      {selectedApplication.business_plan}
                                    </p>
                                  </div>
                                )}

                                <div>
                                  <Label htmlFor="admin-notes">Admin Notes</Label>
                                  <Textarea
                                    id="admin-notes"
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    placeholder="Add notes about this application..."
                                    className="mt-1"
                                  />
                                </div>

                                {selectedApplication.status === 'pending' && (
                                  <div className="flex gap-2 pt-4">
                                    <Button
                                      onClick={() => updateApplicationStatus(selectedApplication.id, 'approved')}
                                      disabled={actionLoading}
                                      className="flex-1"
                                    >
                                      <Check className="h-4 w-4 mr-2" />
                                      {actionLoading ? 'Processing...' : 'Approve'}
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      onClick={() => updateApplicationStatus(selectedApplication.id, 'rejected')}
                                      disabled={actionLoading}
                                      className="flex-1"
                                    >
                                      <X className="h-4 w-4 mr-2" />
                                      {actionLoading ? 'Processing...' : 'Reject'}
                                    </Button>
                                  </div>
                                )}

                                {selectedApplication.admin_notes && selectedApplication.status !== 'pending' && (
                                  <div className="pt-4 border-t">
                                    <Label className="text-sm font-medium">Previous Admin Notes</Label>
                                    <p className="text-sm mt-1 p-3 bg-muted rounded-md">
                                      {selectedApplication.admin_notes}
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default FundingApplicationsPage;