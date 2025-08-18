export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      funding_applications: {
        Row: {
          admin_notes: string | null
          applicant_id: string
          business_plan_url: string | null
          created_at: string
          crop_type: string
          expected_roi_percentage: number | null
          farm_location: string
          farm_size_acres: number | null
          farming_experience_years: number | null
          funding_amount_requested: number
          id: string
          interview_date: string | null
          project_description: string
          project_duration_months: number
          project_title: string
          status: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          applicant_id: string
          business_plan_url?: string | null
          created_at?: string
          crop_type: string
          expected_roi_percentage?: number | null
          farm_location: string
          farm_size_acres?: number | null
          farming_experience_years?: number | null
          funding_amount_requested: number
          id?: string
          interview_date?: string | null
          project_description: string
          project_duration_months: number
          project_title: string
          status?: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          applicant_id?: string
          business_plan_url?: string | null
          created_at?: string
          crop_type?: string
          expected_roi_percentage?: number | null
          farm_location?: string
          farm_size_acres?: number | null
          farming_experience_years?: number | null
          funding_amount_requested?: number
          id?: string
          interview_date?: string | null
          project_description?: string
          project_duration_months?: number
          project_title?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "funding_applications_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      investment_opportunities: {
        Row: {
          application_id: string
          created_at: string
          crop_type: string
          current_amount: number
          description: string
          duration_months: number
          end_date: string | null
          farm_size_acres: number | null
          farmer_id: string
          id: string
          location: string
          risk_level: string | null
          roi_percentage: number
          start_date: string | null
          status: string
          target_amount: number
          title: string
          updated_at: string
        }
        Insert: {
          application_id: string
          created_at?: string
          crop_type: string
          current_amount?: number
          description: string
          duration_months: number
          end_date?: string | null
          farm_size_acres?: number | null
          farmer_id: string
          id?: string
          location: string
          risk_level?: string | null
          roi_percentage: number
          start_date?: string | null
          status?: string
          target_amount: number
          title: string
          updated_at?: string
        }
        Update: {
          application_id?: string
          created_at?: string
          crop_type?: string
          current_amount?: number
          description?: string
          duration_months?: number
          end_date?: string | null
          farm_size_acres?: number | null
          farmer_id?: string
          id?: string
          location?: string
          risk_level?: string | null
          roi_percentage?: number
          start_date?: string | null
          status?: string
          target_amount?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "investment_opportunities_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "funding_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investment_opportunities_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      investments: {
        Row: {
          amount: number
          created_at: string
          id: string
          investment_date: string
          investor_id: string
          opportunity_id: string
          returns_earned: number | null
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          investment_date?: string
          investor_id: string
          opportunity_id: string
          returns_earned?: number | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          investment_date?: string
          investor_id?: string
          opportunity_id?: string
          returns_earned?: number | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "investments_investor_id_fkey"
            columns: ["investor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investments_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "investment_opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_articles: {
        Row: {
          author_name: string
          category: string
          content: string
          created_at: string
          featured: boolean
          id: string
          image_url: string | null
          reading_time_minutes: number | null
          status: string
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author_name: string
          category: string
          content: string
          created_at?: string
          featured?: boolean
          id?: string
          image_url?: string | null
          reading_time_minutes?: number | null
          status?: string
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string
          category?: string
          content?: string
          created_at?: string
          featured?: boolean
          id?: string
          image_url?: string | null
          reading_time_minutes?: number | null
          status?: string
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      machinery_rentals: {
        Row: {
          availability_status: string
          contact_info: string | null
          created_at: string
          daily_rate: number | null
          description: string
          hourly_rate: number | null
          id: string
          image_url: string | null
          location: string
          machine_type: string
          provider_name: string
          title: string
          updated_at: string
        }
        Insert: {
          availability_status?: string
          contact_info?: string | null
          created_at?: string
          daily_rate?: number | null
          description: string
          hourly_rate?: number | null
          id?: string
          image_url?: string | null
          location: string
          machine_type: string
          provider_name: string
          title: string
          updated_at?: string
        }
        Update: {
          availability_status?: string
          contact_info?: string | null
          created_at?: string
          daily_rate?: number | null
          description?: string
          hourly_rate?: number | null
          id?: string
          image_url?: string | null
          location?: string
          machine_type?: string
          provider_name?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      market_listings: {
        Row: {
          contact_info: string | null
          created_at: string
          description: string
          harvest_date: string | null
          id: string
          image_url: string | null
          location: string
          price: number
          product_type: string
          quality_grade: string | null
          quantity_available: number | null
          seller_name: string
          status: string
          title: string
          unit: string
          updated_at: string
        }
        Insert: {
          contact_info?: string | null
          created_at?: string
          description: string
          harvest_date?: string | null
          id?: string
          image_url?: string | null
          location: string
          price: number
          product_type: string
          quality_grade?: string | null
          quantity_available?: number | null
          seller_name: string
          status?: string
          title: string
          unit: string
          updated_at?: string
        }
        Update: {
          contact_info?: string | null
          created_at?: string
          description?: string
          harvest_date?: string | null
          id?: string
          image_url?: string | null
          location?: string
          price?: number
          product_type?: string
          quality_grade?: string | null
          quantity_available?: number | null
          seller_name?: string
          status?: string
          title?: string
          unit?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          location: string | null
          phone: string | null
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          location?: string | null
          phone?: string | null
          role: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          location?: string | null
          phone?: string | null
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      transport_logistics: {
        Row: {
          availability_status: string
          contact_info: string | null
          created_at: string
          description: string
          id: string
          location: string
          price_range: string | null
          provider_name: string
          service_type: string
          title: string
          updated_at: string
        }
        Insert: {
          availability_status?: string
          contact_info?: string | null
          created_at?: string
          description: string
          id?: string
          location: string
          price_range?: string | null
          provider_name: string
          service_type: string
          title: string
          updated_at?: string
        }
        Update: {
          availability_status?: string
          contact_info?: string | null
          created_at?: string
          description?: string
          id?: string
          location?: string
          price_range?: string | null
          provider_name?: string
          service_type?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
