
import React from 'react';
import { InvestorLayout } from "@/components/layout/InvestorLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Eye,
  Calendar,
  User
} from 'lucide-react';

const InvestorContracts = () => {
  const contracts = [
    {
      id: 1,
      title: "Maize Cultivation Agreement",
      farmer: "Kwame Asante",
      type: "Investment Contract",
      status: "Active",
      signedDate: "2025-01-15",
      expiryDate: "2025-07-15",
      value: "₵15,000"
    },
    {
      id: 2,
      title: "Poultry Farm Partnership",
      farmer: "Akosua Mensah", 
      type: "Partnership Agreement",
      status: "Pending",
      signedDate: "2025-03-01",
      expiryDate: "2025-09-01",
      value: "₵12,000"
    }
  ];

  return (
    <InvestorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Contracts & Agreements</h1>
          <p className="text-muted-foreground">Manage your investment contracts and legal documents</p>
        </div>

        <div className="space-y-4">
          {contracts.map((contract) => (
            <Card key={contract.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {contract.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {contract.farmer}
                      </span>
                      <span>{contract.type}</span>
                    </CardDescription>
                  </div>
                  <Badge variant={contract.status === 'Active' ? 'default' : 'secondary'}>
                    {contract.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Contract Value</p>
                    <p className="font-medium">{contract.value}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Signed Date</p>
                    <p className="font-medium">{contract.signedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Expiry Date</p>
                    <p className="font-medium">{contract.expiryDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">6 months</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Contract
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Schedule Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </InvestorLayout>
  );
};

export default InvestorContracts;
