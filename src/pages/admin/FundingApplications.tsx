import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
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
import { Eye, Check, X, FileText } from 'lucide-react';

interface FundingApplication {
  id: string;
  project_title: string;
  funding_amount_requested: number;
  status: string;
  created_at: string;
  applicant_id: string;
  project_description: string;
  farm_location: string;
  crop_type: string;
  farm_size_acres?: number;
  farming_experience_years?: number;
  project_duration_months: number;
  expected_roi_percentage?: number;
  admin_notes?: string;
  profiles?: {
    full_name: string;
    email: string;
  };
}

const FundingApplicationsPage = () => {
  const { user, profile, loading } = useAuth();
  const [applications, setApplications] = useState<FundingApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<FundingApplication | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const { toast } = useToast();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user || profile?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('funding_applications')
        .select(`
          *,
          profiles!inner(full_name, email)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to load funding applications",
        variant: "destructive",
      });
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: 'approved' | 'rejected') => {
    setActionLoading(true);
    try {
      const { error } = await supabase
        .from('funding_applications')
        .update({ 
          status,
          admin_notes: adminNotes || null
        })
        .eq('id', applicationId);

      if (error) throw error;

      // If approved, create investment opportunity
      if (status === 'approved' && selectedApplication) {
        const { error: opportunityError } = await supabase
          .from('investment_opportunities')
          .insert({
            title: selectedApplication.project_title,
            description: selectedApplication.project_description,
            target_amount: selectedApplication.funding_amount_requested,
            farmer_id: selectedApplication.applicant_id,
            application_id: selectedApplication.id,
            location: selectedApplication.farm_location,
            crop_type: selectedApplication.crop_type,
            duration_months: selectedApplication.project_duration_months,
            roi_percentage: selectedApplication.expected_roi_percentage || 0,
            farm_size_acres: selectedApplication.farm_size_acres,
          });

        if (opportunityError) {
          console.error('Error creating investment opportunity:', opportunityError);
        }
      }

      await fetchApplications();
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
                        <p className="font-medium">{application.profiles?.full_name}</p>
                        <p className="text-sm text-muted-foreground">{application.profiles?.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{application.project_title}</TableCell>
                    <TableCell>${application.funding_amount_requested.toLocaleString()}</TableCell>
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
                              Application from {selectedApplication?.profiles?.full_name}
                            </DialogDescription>
                          </DialogHeader>
                          
                          {selectedApplication && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium">Applicant</Label>
                                  <p className="text-sm">{selectedApplication.profiles?.full_name}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Email</Label>
                                  <p className="text-sm">{selectedApplication.profiles?.email}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Amount Requested</Label>
                                  <p className="text-sm">${selectedApplication.funding_amount_requested.toLocaleString()}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Project Duration</Label>
                                  <p className="text-sm">{selectedApplication.project_duration_months} months</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Farm Location</Label>
                                  <p className="text-sm">{selectedApplication.farm_location}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Crop Type</Label>
                                  <p className="text-sm">{selectedApplication.crop_type}</p>
                                </div>
                                {selectedApplication.farm_size_acres && (
                                  <div>
                                    <Label className="text-sm font-medium">Farm Size</Label>
                                    <p className="text-sm">{selectedApplication.farm_size_acres} acres</p>
                                  </div>
                                )}
                                {selectedApplication.farming_experience_years && (
                                  <div>
                                    <Label className="text-sm font-medium">Experience</Label>
                                    <p className="text-sm">{selectedApplication.farming_experience_years} years</p>
                                  </div>
                                )}
                              </div>
                              
                              <div>
                                <Label className="text-sm font-medium">Project Description</Label>
                                <p className="text-sm mt-1 p-3 bg-muted rounded-md">
                                  {selectedApplication.project_description}
                                </p>
                              </div>

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
                                    Approve
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={() => updateApplicationStatus(selectedApplication.id, 'rejected')}
                                    disabled={actionLoading}
                                    className="flex-1"
                                  >
                                    <X className="h-4 w-4 mr-2" />
                                    Reject
                                  </Button>
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
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default FundingApplicationsPage;