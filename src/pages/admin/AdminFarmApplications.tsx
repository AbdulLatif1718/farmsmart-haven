import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Phone, Mail, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface FarmApplication {
  id: string;
  applicant_id: string;
  name: string;
  location: string;
  size_acres: number;
  size_unit: string;
  farm_type: string;
  description?: string;
  soil_type?: string;
  irrigation_type?: string;
  coordinates_lat?: string;
  coordinates_lng?: string;
  status: string;
  admin_notes?: string;
  contact_phone?: string;
  contact_email?: string;
  created_at: string;
  profiles?: {
    full_name: string;
    email: string;
  };
}

const AdminFarmApplications = () => {
  const { toast } = useToast();
  const { profile } = useAuth();
  const [applications, setApplications] = useState<FarmApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<FarmApplication | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewStatus, setReviewStatus] = useState<'approved' | 'rejected'>('approved');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('farm_applications')
        .select(`
          *,
          profiles:applicant_id (
            full_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications((data as any) || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (applicationId: string, status: 'approved' | 'rejected', notes: string) => {
    try {
      const updateData: any = {
        status,
        admin_notes: notes,
        reviewed_at: new Date().toISOString(),
        reviewed_by: profile?.id
      };

      const { error } = await supabase
        .from('farm_applications')
        .update(updateData)
        .eq('id', applicationId);

      if (error) throw error;

      // If approved, create the actual farm
      if (status === 'approved') {
        const application = applications.find(app => app.id === applicationId);
        if (application) {
          const farmData = {
            farmer_id: application.applicant_id,
            name: application.name,
            location: application.location,
            size_acres: application.size_acres,
            description: application.description,
            soil_type: application.soil_type,
            irrigation_type: application.irrigation_type,
            crop_types: [application.farm_type].filter(Boolean),
            status: 'active'
          };

          const { error: farmError } = await supabase
            .from('farms')
            .insert(farmData);

          if (farmError) throw farmError;
        }
      }

      toast({
        title: `Application ${status}`,
        description: `Farm application has been ${status}.`,
      });

      fetchApplications();
      setSelectedApplication(null);
      setReviewNotes('');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">Loading applications...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Farm Applications</h1>
          <p className="text-muted-foreground">
            Review and manage farm applications from users
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Applications ({applications.length})</CardTitle>
            <CardDescription>
              Review submitted farm applications and approve or reject them
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Farm Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{application.profiles?.full_name}</div>
                        <div className="text-sm text-muted-foreground">{application.profiles?.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{application.name}</TableCell>
                    <TableCell>{application.location}</TableCell>
                    <TableCell>{application.size_acres} {application.size_unit}</TableCell>
                    <TableCell>{application.farm_type}</TableCell>
                    <TableCell>{getStatusBadge(application.status)}</TableCell>
                    <TableCell>{new Date(application.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedApplication(application)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Review Farm Application</DialogTitle>
                            </DialogHeader>
                            {selectedApplication && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Applicant</Label>
                                    <p className="font-medium">{selectedApplication.profiles?.full_name}</p>
                                  </div>
                                  <div>
                                    <Label>Email</Label>
                                    <p>{selectedApplication.profiles?.email}</p>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Farm Name</Label>
                                    <p className="font-medium">{selectedApplication.name}</p>
                                  </div>
                                  <div>
                                    <Label>Farm Type</Label>
                                    <p>{selectedApplication.farm_type}</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Location</Label>
                                    <p>{selectedApplication.location}</p>
                                  </div>
                                  <div>
                                    <Label>Size</Label>
                                    <p>{selectedApplication.size_acres} {selectedApplication.size_unit}</p>
                                  </div>
                                </div>

                                {selectedApplication.description && (
                                  <div>
                                    <Label>Description</Label>
                                    <p className="text-sm">{selectedApplication.description}</p>
                                  </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Contact Phone</Label>
                                    <div className="flex items-center gap-2">
                                      <Phone className="w-4 h-4" />
                                      <p>{selectedApplication.contact_phone || 'Not provided'}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <Label>Contact Email</Label>
                                    <div className="flex items-center gap-2">
                                      <Mail className="w-4 h-4" />
                                      <p>{selectedApplication.contact_email || 'Not provided'}</p>
                                    </div>
                                  </div>
                                </div>

                                {selectedApplication.status === 'pending' && (
                                  <div className="space-y-4 pt-4 border-t">
                                    <div>
                                      <Label htmlFor="reviewStatus">Decision</Label>
                                      <Select value={reviewStatus} onValueChange={(value: 'approved' | 'rejected') => setReviewStatus(value)}>
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="approved">Approve</SelectItem>
                                          <SelectItem value="rejected">Reject</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    
                                    <div>
                                      <Label htmlFor="reviewNotes">Notes</Label>
                                      <Textarea
                                        id="reviewNotes"
                                        placeholder="Add notes about your decision..."
                                        value={reviewNotes}
                                        onChange={(e) => setReviewNotes(e.target.value)}
                                        rows={3}
                                      />
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                      <Button 
                                        onClick={() => handleReview(selectedApplication.id, reviewStatus, reviewNotes)}
                                        className="flex items-center gap-2"
                                      >
                                        {reviewStatus === 'approved' ? (
                                          <><CheckCircle className="w-4 h-4" />Approve Application</>
                                        ) : (
                                          <><XCircle className="w-4 h-4" />Reject Application</>
                                        )}
                                      </Button>
                                    </div>
                                  </div>
                                )}

                                {selectedApplication.admin_notes && (
                                  <div className="pt-4 border-t">
                                    <Label>Admin Notes</Label>
                                    <p className="text-sm bg-muted p-2 rounded">{selectedApplication.admin_notes}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
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

export default AdminFarmApplications;