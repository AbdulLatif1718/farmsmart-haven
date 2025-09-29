import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, TrendingUp, Calendar, DollarSign, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface InvestmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: {
    id: string;
    project_title: string;
    project_type: string;
    expected_roi: number;
    timeline: string;
    share_price: number;
    available_shares: number;
    minimum_investment: number;
    investment_deadline: string;
  };
  onInvestmentComplete: () => void;
}

export function InvestmentDialog({ open, onOpenChange, project, onInvestmentComplete }: InvestmentDialogProps) {
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const calculateShares = () => {
    const investmentAmount = parseFloat(amount) || 0;
    return Math.floor(investmentAmount / project.share_price);
  };

  const shares = calculateShares();
  const totalCost = shares * project.share_price;
  const expectedReturn = totalCost * (project.expected_roi / 100);

  const isValidInvestment = () => {
    const investmentAmount = parseFloat(amount) || 0;
    return (
      investmentAmount >= project.minimum_investment &&
      shares <= project.available_shares &&
      shares > 0
    );
  };

  const handleInvest = async () => {
    if (!isValidInvestment()) return;

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to invest",
          variant: "destructive",
        });
        return;
      }

      // Get user profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (!profile) {
        toast({
          title: "Profile Not Found",
          description: "Please complete your profile first",
          variant: "destructive",
        });
        return;
      }

      // Create investment
      const { data: investment, error: investmentError } = await supabase
        .from("investments")
        .insert({
          investor_id: profile.id,
          project_id: project.id,
          amount_invested: totalCost,
          shares_owned: shares,
          expected_return: expectedReturn,
          status: "active",
        })
        .select()
        .single();

      if (investmentError) throw investmentError;

      // Create transaction record
      const { error: transactionError } = await supabase
        .from("investment_transactions")
        .insert({
          investment_id: investment.id,
          transaction_type: "purchase",
          amount: totalCost,
          shares: shares,
          status: "completed",
          notes: `Investment in ${project.project_title}`,
        });

      if (transactionError) throw transactionError;

      // Update project shares
      const { error: sharesError } = await supabase
        .from("project_shares")
        .update({
          available_shares: project.available_shares - shares,
        })
        .eq("project_id", project.id);

      if (sharesError) throw sharesError;

      // Update funding application totals
      const { error: updateError } = await supabase
        .from("funding_applications")
        .update({
          shares_sold: (project.available_shares - shares),
          total_invested: totalCost,
        })
        .eq("id", project.id);

      if (updateError) throw updateError;

      toast({
        title: "Investment Successful!",
        description: `You've invested GH₵${totalCost.toLocaleString()} and own ${shares} shares`,
      });

      onInvestmentComplete();
      onOpenChange(false);
      setAmount("");
    } catch (error) {
      console.error("Investment error:", error);
      toast({
        title: "Investment Failed",
        description: "There was an error processing your investment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Invest in {project.project_title}</DialogTitle>
          <DialogDescription>
            Review the investment details and enter your investment amount
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Project Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Project Type</p>
              <Badge variant="secondary">{project.project_type}</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Expected ROI</p>
              <p className="text-lg font-semibold flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-primary" />
                {project.expected_roi}%
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Timeline</p>
              <p className="text-lg font-semibold flex items-center gap-1">
                <Calendar className="h-4 w-4 text-primary" />
                {project.timeline}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Share Price</p>
              <p className="text-lg font-semibold flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-primary" />
                GH₵{project.share_price.toLocaleString()}
              </p>
            </div>
          </div>

          <Separator />

          {/* Investment Calculator */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Investment Calculator</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Investment Amount (GH₵)</Label>
              <Input
                id="amount"
                type="number"
                placeholder={`Minimum: GH₵${project.minimum_investment.toLocaleString()}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={project.minimum_investment}
              />
              <p className="text-xs text-muted-foreground">
                Minimum investment: GH₵{project.minimum_investment.toLocaleString()} • 
                Available shares: {project.available_shares.toLocaleString()}
              </p>
            </div>

            {amount && (
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Shares you'll own</span>
                  <span className="font-semibold">{shares.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total cost</span>
                  <span className="font-semibold">GH₵{totalCost.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Expected return</span>
                  <span className="font-semibold text-primary">
                    GH₵{expectedReturn.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Validation Alerts */}
          {amount && !isValidInvestment() && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {parseFloat(amount) < project.minimum_investment
                  ? `Minimum investment is GH₵${project.minimum_investment.toLocaleString()}`
                  : shares > project.available_shares
                  ? `Only ${project.available_shares} shares available`
                  : "Please enter a valid investment amount"}
              </AlertDescription>
            </Alert>
          )}

          {/* Deadline Warning */}
          {project.investment_deadline && (
            <Alert>
              <Calendar className="h-4 w-4" />
              <AlertDescription>
                Investment deadline: {new Date(project.investment_deadline).toLocaleDateString()}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={handleInvest} 
            disabled={!isValidInvestment() || loading}
          >
            {loading ? "Processing..." : `Invest GH₵${totalCost.toLocaleString()}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
