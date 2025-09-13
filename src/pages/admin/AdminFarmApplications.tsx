import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Phone, Mail, CheckCircle, XCircle, Clock, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface FarmApplication {
  id: string;
  user_id: string | null;
  applicant_name: string;
  email: string;
  phone: string;
  farm_name: string;
  location: string;
  farm_size: number;
  farm_type: string;
  crops: string | null;
  livestock: string | null;
  farming_experience: number | null;
  equipment: string | null;
  certification: string | null;
  previous_yield: string | null;
  challenges: string | null;
  goals: string | null;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

const AdminFarmApplications = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<FarmApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<FarmApplication | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewStatus, setReviewStatus] = useState<'approved' | 'rejected'>('approved');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('farm_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching farm applications:', error);
      toast({
        title: "Error",
        description: "Failed to fetch farm applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (applicationId: string, status: 'approved' | 'rejected', notes: string) => {
    setActionLoading(true);
    try {
      const { error } = await supabase
        .from('farm_applications')
        .update({ 
          status, 
          admin_notes: notes || null,
          reviewed_at: new Date().toISOString()
        })
        .eq('id', applicationId);

      if (error) throw error;

      setApplications(prevApplications => 
        prevApplications.map(app => 
          app.id === applicationId 
            ? { ...app, status, admin_notes: notes || null }
            : app
        )
      );

      toast({
        title: `Application ${status}`,
        description: `Farm application has been ${status}.`,
      });

      setSelectedApplication(null);
      setReviewNotes('');
    } catch (error: any) {
      console.error('Error updating farm application:', error);
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
            {applications.length === 0 ? (
              <div className="text-center py-8">
                <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No farm applications found</p>
              </div>
            ) : (
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
                          <div className="font-medium">{application.applicant_name}</div>
                          <div className="text-sm text-muted-foreground">{application.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{application.farm_name}</TableCell>
                      <TableCell>{application.location}</TableCell>
                      <TableCell>{application.farm_size} acres</TableCell>
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
                                onClick={() => {
                                  setSelectedApplication(application);
                                  setReviewNotes(application.admin_notes || '');
                                }}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Review Farm Application</DialogTitle>
                              </DialogHeader>
                              {selectedApplication && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                     <div>
                                       <Label>Applicant</Label>
                                       <p className="font-medium">{selectedApplication.applicant_name}</p>
                                     </div>
                                     <div>
                                       <Label>Email</Label>
                                       <p>{selectedApplication.email}</p>
                                     </div>
                                     <div>
                                       <Label>Phone</Label>
                                       <p>{selectedApplication.phone}</p>
                                     </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Farm Name</Label>
                                      <p className="font-medium">{selectedApplication.farm_name}</p>
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
                                      <p>{selectedApplication.farm_size} acres</p>
                                    </div>
                                  </div>

                                  {selectedApplication.crops && (
                                    <div>
                                      <Label>Crops</Label>
                                      <p className="text-sm">{selectedApplication.crops}</p>
                                    </div>
                                  )}

                                  {selectedApplication.livestock && (
                                    <div>
                                      <Label>Livestock</Label>
                                      <p className="text-sm">{selectedApplication.livestock}</p>
                                    </div>
                                  )}

                                  {selectedApplication.farming_experience && (
                                    <div>
                                      <Label>Farming Experience</Label>
                                      <p className="text-sm">{selectedApplication.farming_experience} years</p>
                                    </div>
                                  )}

                                  {selectedApplication.equipment && (
                                    <div>
                                      <Label>Equipment</Label>
                                      <p className="text-sm">{selectedApplication.equipment}</p>
                                    </div>
                                  )}

                                  {selectedApplication.challenges && (
                                    <div>
                                      <Label>Challenges</Label>
                                      <p className="text-sm">{selectedApplication.challenges}</p>
                                    </div>
                                  )}

                                  {selectedApplication.goals && (
                                    <div>
                                      <Label>Goals</Label>
                                      <p className="text-sm">{selectedApplication.goals}</p>
                                    </div>
                                  )}

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
                                          disabled={actionLoading}
                                          className="flex items-center gap-2"
                                        >
                                          {actionLoading ? (
                                            <Loader className="w-4 h-4 animate-spin" />
                                          ) : reviewStatus === 'approved' ? (
                                            <CheckCircle className="w-4 h-4" />
                                          ) : (
                                            <XCircle className="w-4 h-4" />
                                          )}
                                          {actionLoading ? 'Processing...' : `${reviewStatus === 'approved' ? 'Approve' : 'Reject'} Application`}
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
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminFarmApplications;