import { useState } from 'react';
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
  applicant_name: string;
  applicant_email: string;
}

// Mock data for demonstration
const mockApplications: FundingApplication[] = [
  {
    id: '1',
    project_title: 'Sustainable Tomato Farming Initiative',
    funding_amount_requested: 75000,
    status: 'pending',
    created_at: '2024-12-01T10:30:00Z',
    applicant_id: 'farmer-001',
    project_description: 'A comprehensive tomato farming project focused on sustainable practices including drip irrigation, organic fertilizers, and integrated pest management. The project aims to produce high-quality tomatoes for both local and export markets while maintaining environmental sustainability.',
    farm_location: 'Ashanti Region, Ghana',
    crop_type: 'Tomatoes',
    farm_size_acres: 15,
    farming_experience_years: 8,
    project_duration_months: 12,
    expected_roi_percentage: 25,
    applicant_name: 'Kwame Asante',
    applicant_email: 'kwame.asante@email.com'
  },
  {
    id: '2',
    project_title: 'Rice Production Expansion',
    funding_amount_requested: 120000,
    status: 'pending',
    created_at: '2024-11-28T14:15:00Z',
    applicant_id: 'farmer-002',
    project_description: 'Expanding rice production using modern irrigation techniques and improved seed varieties. The project includes land preparation, seed procurement, and machinery rental for efficient farming operations.',
    farm_location: 'Northern Region, Ghana',
    crop_type: 'Rice',
    farm_size_acres: 25,
    farming_experience_years: 12,
    project_duration_months: 18,
    expected_roi_percentage: 30,
    applicant_name: 'Fatima Mohammed',
    applicant_email: 'fatima.mohammed@email.com'
  },
  {
    id: '3',
    project_title: 'Cocoa Farm Rehabilitation',
    funding_amount_requested: 95000,
    status: 'approved',
    created_at: '2024-11-25T09:45:00Z',
    applicant_id: 'farmer-003',
    project_description: 'Rehabilitation of an existing cocoa farm including replanting with disease-resistant varieties, soil improvement, and implementation of proper shade management techniques.',
    farm_location: 'Western Region, Ghana',
    crop_type: 'Cocoa',
    farm_size_acres: 20,
    farming_experience_years: 15,
    project_duration_months: 24,
    expected_roi_percentage: 20,
    admin_notes: 'Approved due to strong business plan and experienced farmer. Project aligns with national cocoa improvement initiatives.',
    applicant_name: 'Emmanuel Osei',
    applicant_email: 'emmanuel.osei@email.com'
  }
];

const FundingApplicationsPage = () => {
  const [applications, setApplications] = useState<FundingApplication[]>(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState<FundingApplication | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const { toast } = useToast();

  const updateApplicationStatus = async (applicationId: string, status: 'approved' | 'rejected') => {
    setActionLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setApplications(prevApplications => 
        prevApplications.map(app => 
          app.id === applicationId 
            ? { ...app, status, admin_notes: adminNotes || undefined }
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
                        <p className="font-medium">{application.applicant_name}</p>
                        <p className="text-sm text-muted-foreground">{application.applicant_email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{application.project_title}</TableCell>
                    <TableCell>GHS {application.funding_amount_requested.toLocaleString()}</TableCell>
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
                              Application from {selectedApplication?.applicant_name}
                            </DialogDescription>
                          </DialogHeader>
                          
                          {selectedApplication && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium">Applicant</Label>
                                  <p className="text-sm">{selectedApplication.applicant_name}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Email</Label>
                                  <p className="text-sm">{selectedApplication.applicant_email}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Amount Requested</Label>
                                  <p className="text-sm">GHS {selectedApplication.funding_amount_requested.toLocaleString()}</p>
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