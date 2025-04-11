
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, ShieldAlert, ShieldCheck, Upload } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export type VerificationLevel = 'none' | 'pending' | 'basic' | 'full';

interface VerificationStatusProps {
  level: VerificationLevel;
  onVerify: () => void;
}

export const VerificationStatus = ({ level, onVerify }: VerificationStatusProps) => {
  let progress = 0;
  let statusText = '';
  let statusIcon = <Shield className="h-5 w-5" />;
  let buttonText = 'Start Verification';
  
  switch (level) {
    case 'none':
      progress = 0;
      statusText = 'Not Verified';
      statusIcon = <ShieldAlert className="h-5 w-5 text-destructive" />;
      buttonText = 'Start Verification';
      break;
    case 'pending':
      progress = 33;
      statusText = 'Verification Pending';
      statusIcon = <Shield className="h-5 w-5 text-amber-500" />;
      buttonText = 'Check Status';
      break;
    case 'basic':
      progress = 66;
      statusText = 'Basic Verification Complete';
      statusIcon = <ShieldCheck className="h-5 w-5 text-amber-500" />;
      buttonText = 'Complete Full Verification';
      break;
    case 'full':
      progress = 100;
      statusText = 'Fully Verified';
      statusIcon = <ShieldCheck className="h-5 w-5 text-green-500" />;
      buttonText = 'View Verification';
      break;
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          {statusIcon}
          Verification Status
        </CardTitle>
        <CardDescription>
          Complete verification to unlock all features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between mb-1 text-sm">
            <span>{statusText}</span>
            <span>{progress}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${progress >= 33 ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'}`}>
              {progress >= 33 ? '✓' : '1'}
            </div>
            <span>Identity Verification</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${progress >= 66 ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'}`}>
              {progress >= 66 ? '✓' : '2'}
            </div>
            <span>Document Submission</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${progress >= 100 ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'}`}>
              {progress >= 100 ? '✓' : '3'}
            </div>
            <span>Bank Account Connection</span>
          </div>
        </div>
        
        <Button className="w-full mt-4" onClick={onVerify}>
          {level !== 'full' && <Upload className="h-4 w-4 mr-2" />}
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VerificationStatus;
