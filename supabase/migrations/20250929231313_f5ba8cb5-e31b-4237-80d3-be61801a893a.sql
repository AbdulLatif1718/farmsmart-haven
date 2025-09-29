-- Add new columns to funding_applications table
ALTER TABLE public.funding_applications
ADD COLUMN IF NOT EXISTS total_shares integer,
ADD COLUMN IF NOT EXISTS share_price numeric(10,2),
ADD COLUMN IF NOT EXISTS shares_sold integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_invested numeric(12,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS investor_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS investment_deadline date,
ADD COLUMN IF NOT EXISTS minimum_investment numeric(10,2),
ADD COLUMN IF NOT EXISTS project_type text CHECK (project_type IN ('crop', 'livestock', 'mixed'));

-- Create project_shares table
CREATE TABLE IF NOT EXISTS public.project_shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.funding_applications(id) ON DELETE CASCADE NOT NULL,
  total_shares integer NOT NULL,
  available_shares integer NOT NULL,
  share_price numeric(10,2) NOT NULL,
  minimum_investment numeric(10,2) NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(project_id)
);

-- Create investments table
CREATE TABLE IF NOT EXISTS public.investments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  project_id uuid REFERENCES public.funding_applications(id) ON DELETE CASCADE NOT NULL,
  amount_invested numeric(12,2) NOT NULL,
  shares_owned integer NOT NULL,
  investment_date timestamp with time zone DEFAULT now(),
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'withdrawn')),
  expected_return numeric(12,2),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create investment_transactions table
CREATE TABLE IF NOT EXISTS public.investment_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  investment_id uuid REFERENCES public.investments(id) ON DELETE CASCADE NOT NULL,
  transaction_type text NOT NULL CHECK (transaction_type IN ('purchase', 'dividend', 'withdrawal', 'return')),
  amount numeric(12,2) NOT NULL,
  shares integer,
  transaction_date timestamp with time zone DEFAULT now(),
  status text DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  notes text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.project_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for project_shares
CREATE POLICY "Anyone can view project shares"
  ON public.project_shares FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage project shares"
  ON public.project_shares FOR ALL
  USING (is_admin());

-- RLS Policies for investments
CREATE POLICY "Users can view own investments"
  ON public.investments FOR SELECT
  USING (auth.uid() = investor_id);

CREATE POLICY "Users can create own investments"
  ON public.investments FOR INSERT
  WITH CHECK (auth.uid() = investor_id);

CREATE POLICY "Admins can view all investments"
  ON public.investments FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can manage all investments"
  ON public.investments FOR ALL
  USING (is_admin());

-- RLS Policies for investment_transactions
CREATE POLICY "Users can view own transactions"
  ON public.investment_transactions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.investments
      WHERE investments.id = investment_transactions.investment_id
      AND investments.investor_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all transactions"
  ON public.investment_transactions FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can manage all transactions"
  ON public.investment_transactions FOR ALL
  USING (is_admin());

-- Create triggers for updated_at
CREATE TRIGGER update_project_shares_updated_at
  BEFORE UPDATE ON public.project_shares
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_investments_updated_at
  BEFORE UPDATE ON public.investments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_investments_investor_id ON public.investments(investor_id);
CREATE INDEX idx_investments_project_id ON public.investments(project_id);
CREATE INDEX idx_investment_transactions_investment_id ON public.investment_transactions(investment_id);
CREATE INDEX idx_project_shares_project_id ON public.project_shares(project_id);