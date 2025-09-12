import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Phone, Mail, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  applicant_name: string;
  applicant_email: string;
}

// Mock data for demonstration
const mockFarmApplications: FarmApplication[] = [
  {
    id: '1',
    applicant_id: 'farmer-001',
    name: 'Green Valley Farm',
    location: 'Eastern Region, Ghana',
    size_acres: 12,
    size_unit: 'acres',
    farm_type: 'Mixed Crop',
    description: 'A sustainable mixed crop farm focusing on maize, beans, and vegetables using organic farming methods.',
    soil_type: 'Clay Loam',
    irrigation_type: 'Drip Irrigation',
    coordinates_lat: '6.2833',
    coordinates_lng: '-0.5667',
    status: 'pending',
    contact_phone: '+233241234567',
    contact_email: 'greenvalley@email.com',
    created_at: '2024-12-01T08:30:00Z',
    applicant_name: 'John Mensah',
    applicant_email: 'john.mensah@email.com'
  },
  {
    id: '2',
    applicant_id: 'farmer-002',
    name: 'Sunrise Poultry & Crops',
    location: 'Volta Region, Ghana',
    size_acres: 8,
    size_unit: 'acres',
    farm_type: 'Poultry & Crops',
    description: 'Integrated farming system combining poultry production with crop cultivation for maximum efficiency.',
    soil_type: 'Sandy Loam',
    irrigation_type: 'Sprinkler',
    status: 'approved',
    contact_phone: '+233207654321',
    contact_email: 'sunrise@email.com',
    created_at: '2024-11-28T10:15:00Z',
    admin_notes: 'Excellent business plan with good market analysis. Approved for integrated farming approach.',
    applicant_name: 'Sarah Adjei',
    applicant_email: 'sarah.adjei@email.com'
  }
];

const AdminFarmApplications = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<FarmApplication[]>(mockFarmApplications);
  const [selectedApplication, setSelectedApplication] = useState<FarmApplication | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewStatus, setReviewStatus] = useState<'approved' | 'rejected'>('approved');

  const handleReview = async (applicationId: string, status: 'approved' | 'rejected', notes: string) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setApplications(prevApplications => 
        prevApplications.map(app => 
          app.id === applicationId 
            ? { ...app, status, admin_notes: notes }
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
      toast({
        title: "Error",
        description: "Failed to update application",
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
                        <div className="font-medium">{application.applicant_name}</div>
                        <div className="text-sm text-muted-foreground">{application.applicant_email}</div>
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
                                     <p className="font-medium">{selectedApplication.applicant_name}</p>
                                   </div>
                                   <div>
                                     <Label>Email</Label>
                                     <p>{selectedApplication.applicant_email}</p>
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