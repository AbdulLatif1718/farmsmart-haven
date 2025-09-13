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
      admin_users: {
        Row: {
          created_at: string | null
          id: string
          password_hash: string
          updated_at: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          password_hash: string
          updated_at?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          id?: string
          password_hash?: string
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      farm_applications: {
        Row: {
          admin_notes: string | null
          applicant_name: string
          certification: string | null
          challenges: string | null
          created_at: string | null
          crops: string | null
          email: string
          equipment: string | null
          farm_name: string
          farm_size: number
          farm_type: string
          farming_experience: number | null
          goals: string | null
          id: string
          livestock: string | null
          location: string
          phone: string
          previous_yield: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          applicant_name: string
          certification?: string | null
          challenges?: string | null
          created_at?: string | null
          crops?: string | null
          email: string
          equipment?: string | null
          farm_name: string
          farm_size: number
          farm_type: string
          farming_experience?: number | null
          goals?: string | null
          id?: string
          livestock?: string | null
          location: string
          phone: string
          previous_yield?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          applicant_name?: string
          certification?: string | null
          challenges?: string | null
          created_at?: string | null
          crops?: string | null
          email?: string
          equipment?: string | null
          farm_name?: string
          farm_size?: number
          farm_type?: string
          farming_experience?: number | null
          goals?: string | null
          id?: string
          livestock?: string | null
          location?: string
          phone?: string
          previous_yield?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "farm_applications_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      funding_applications: {
        Row: {
          admin_notes: string | null
          business_plan: string | null
          collateral: string | null
          created_at: string | null
          email: string
          expected_roi: number | null
          full_name: string
          funding_amount: number
          id: string
          phone: string
          project_description: string
          project_title: string
          purpose: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          timeline: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          business_plan?: string | null
          collateral?: string | null
          created_at?: string | null
          email: string
          expected_roi?: number | null
          full_name: string
          funding_amount: number
          id?: string
          phone: string
          project_description: string
          project_title: string
          purpose: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          timeline: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          business_plan?: string | null
          collateral?: string | null
          created_at?: string | null
          email?: string
          expected_roi?: number | null
          full_name?: string
          funding_amount?: number
          id?: string
          phone?: string
          project_description?: string
          project_title?: string
          purpose?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          timeline?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "funding_applications_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_articles: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string | null
          featured_image: string | null
          id: string
          published: boolean | null
          summary: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          author: string
          category: string
          content: string
          created_at?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          summary?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          summary?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: []
      }
      machinery_rentals: {
        Row: {
          available: boolean | null
          brand: string | null
          condition: string | null
          created_at: string | null
          daily_rate: number | null
          description: string
          id: string
          images: string[] | null
          location: string
          model: string | null
          monthly_rate: number | null
          provider: string
          specifications: Json | null
          title: string
          type: string
          updated_at: string | null
          weekly_rate: number | null
          year: number | null
        }
        Insert: {
          available?: boolean | null
          brand?: string | null
          condition?: string | null
          created_at?: string | null
          daily_rate?: number | null
          description: string
          id?: string
          images?: string[] | null
          location: string
          model?: string | null
          monthly_rate?: number | null
          provider: string
          specifications?: Json | null
          title: string
          type: string
          updated_at?: string | null
          weekly_rate?: number | null
          year?: number | null
        }
        Update: {
          available?: boolean | null
          brand?: string | null
          condition?: string | null
          created_at?: string | null
          daily_rate?: number | null
          description?: string
          id?: string
          images?: string[] | null
          location?: string
          model?: string | null
          monthly_rate?: number | null
          provider?: string
          specifications?: Json | null
          title?: string
          type?: string
          updated_at?: string | null
          weekly_rate?: number | null
          year?: number | null
        }
        Relationships: []
      }
      market_listings: {
        Row: {
          category: string
          certified: boolean | null
          created_at: string | null
          description: string
          expiry_date: string | null
          harvest_date: string | null
          id: string
          images: string[] | null
          location: string
          organic: boolean | null
          price: number
          quality_grade: string | null
          quantity: number | null
          seller_contact: string
          seller_name: string
          status: string | null
          title: string
          unit: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category: string
          certified?: boolean | null
          created_at?: string | null
          description: string
          expiry_date?: string | null
          harvest_date?: string | null
          id?: string
          images?: string[] | null
          location: string
          organic?: boolean | null
          price: number
          quality_grade?: string | null
          quantity?: number | null
          seller_contact: string
          seller_name: string
          status?: string | null
          title: string
          unit: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string
          certified?: boolean | null
          created_at?: string | null
          description?: string
          expiry_date?: string | null
          harvest_date?: string | null
          id?: string
          images?: string[] | null
          location?: string
          organic?: boolean | null
          price?: number
          quality_grade?: string | null
          quantity?: number | null
          seller_contact?: string
          seller_name?: string
          status?: string | null
          title?: string
          unit?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          last_login: string | null
          location: string | null
          phone: string | null
          role: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          last_login?: string | null
          location?: string | null
          phone?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          last_login?: string | null
          location?: string | null
          phone?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      transport_logistics: {
        Row: {
          available: boolean | null
          capacity: string | null
          contact: string
          coverage_area: string | null
          created_at: string | null
          description: string
          id: string
          location: string
          price_range: string | null
          provider: string
          rating: number | null
          service_type: string
          title: string
          updated_at: string | null
          vehicle_type: string | null
        }
        Insert: {
          available?: boolean | null
          capacity?: string | null
          contact: string
          coverage_area?: string | null
          created_at?: string | null
          description: string
          id?: string
          location: string
          price_range?: string | null
          provider: string
          rating?: number | null
          service_type: string
          title: string
          updated_at?: string | null
          vehicle_type?: string | null
        }
        Update: {
          available?: boolean | null
          capacity?: string | null
          contact?: string
          coverage_area?: string | null
          created_at?: string | null
          description?: string
          id?: string
          location?: string
          price_range?: string | null
          provider?: string
          rating?: number | null
          service_type?: string
          title?: string
          updated_at?: string | null
          vehicle_type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
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
