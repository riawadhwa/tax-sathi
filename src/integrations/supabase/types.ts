export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Enums: {
      user_tax_type: 'individual' | 'business' | 'startup'
    },
    Tables: {
      documents: {
        Row: {
          created_at: string | null
          document_type: string
          extraction_data: Json | null
          file_name: string
          file_path: string
          financial_year: string | null
          id: string
          processed: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          document_type: string
          extraction_data?: Json | null
          file_name: string
          file_path: string
          financial_year?: string | null
          id?: string
          processed?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          document_type?: string
          extraction_data?: Json | null
          file_name?: string
          file_path?: string
          financial_year?: string | null
          id?: string
          processed?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      due_dates: {
        Row: {
          applies_to: string[] | null
          category: string
          created_at: string | null
          description: string | null
          due_date: string
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          applies_to?: string[] | null
          category: string
          created_at?: string | null
          description?: string | null
          due_date: string
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          applies_to?: string[] | null
          category?: string
          created_at?: string | null
          description?: string | null
          due_date?: string
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      e_verifications: {
        Row: {
          created_at: string | null
          filing_id: string
          id: string
          status: string
          updated_at: string | null
          user_id: string
          verification_date: string | null
          verification_method: string
          verification_reference: string | null
        }
        Insert: {
          created_at?: string | null
          filing_id: string
          id?: string
          status?: string
          updated_at?: string | null
          user_id: string
          verification_date?: string | null
          verification_method: string
          verification_reference?: string | null
        }
        Update: {
          created_at?: string | null
          filing_id?: string
          id?: string
          status?: string
          updated_at?: string | null
          user_id?: string
          verification_date?: string | null
          verification_method?: string
          verification_reference?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "e_verifications_filing_id_fkey"
            columns: ["filing_id"]
            isOneToOne: false
            referencedRelation: "tax_filings"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          aadhaar_number: string | null
          address: string | null
          created_at: string | null
          date_of_birth: string | null
          full_name: string | null
          id: string
          pan_number: string | null
          phone_number: string | null
          updated_at: string | null
          user_type: string
        }
        Insert: {
          aadhaar_number?: string | null
          address?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          full_name?: string | null
          id: string
          pan_number?: string | null
          phone_number?: string | null
          updated_at?: string | null
          user_type?: string
        }
        Update: {
          aadhaar_number?: string | null
          address?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          full_name?: string | null
          id?: string
          pan_number?: string | null
          phone_number?: string | null
          updated_at?: string | null
          user_type?: string
        }
        Relationships: []
      }
      tax_calculations: {
        Row: {
          advance_tax_paid: number | null
          assessment_year: string
          business_income: number | null
          capital_gains: number | null
          cess: number | null
          created_at: string | null
          deductions_80c: number | null
          deductions_80d: number | null
          deductions_hra: number | null
          deductions_other: number | null
          final_tax: number | null
          id: string
          net_tax_payable: number | null
          other_income: number | null
          refund_due: number | null
          salary_income: number | null
          selected_regime: string | null
          surcharge: number | null
          tax_new_regime: number | null
          tax_old_regime: number | null
          tax_payable: number | null
          taxable_income: number | null
          tds_deducted: number | null
          total_deductions: number | null
          total_income: number | null
          updated_at: string | null
          user_id: string
          rental_income: number | null;
          section_80G: number | null;
          section_80E: number | null;
          section_24: number | null;
          business_expenses: number | null;
          depreciation: number | null;
          esop_value: number | null;
        }
        Insert: {
          advance_tax_paid?: number | null
          assessment_year: string
          business_income?: number | null
          capital_gains?: number | null
          cess?: number | null
          created_at?: string | null
          deductions_80c?: number | null
          deductions_80d?: number | null
          deductions_hra?: number | null
          deductions_other?: number | null
          final_tax?: number | null
          id?: string
          net_tax_payable?: number | null
          other_income?: number | null
          refund_due?: number | null
          salary_income?: number | null
          selected_regime?: string | null
          surcharge?: number | null
          tax_new_regime?: number | null
          tax_old_regime?: number | null
          tax_payable?: number | null
          taxable_income?: number | null
          tds_deducted?: number | null
          total_deductions?: number | null
          total_income?: number | null
          updated_at?: string | null
          user_id: string
          rental_income?: number | null;
          section_80G?: number | null;
          section_80E?: number | null;
          section_24?: number | null;
          business_expenses?: number | null;
          depreciation?: number | null;
          esop_value?: number | null;
        }
        Update: {
          advance_tax_paid?: number | null
          assessment_year?: string
          business_income?: number | null
          capital_gains?: number | null
          cess?: number | null
          created_at?: string | null
          deductions_80c?: number | null
          deductions_80d?: number | null
          deductions_hra?: number | null
          deductions_other?: number | null
          final_tax?: number | null
          id?: string
          net_tax_payable?: number | null
          other_income?: number | null
          refund_due?: number | null
          salary_income?: number | null
          selected_regime?: string | null
          surcharge?: number | null
          tax_new_regime?: number | null
          tax_old_regime?: number | null
          tax_payable?: number | null
          taxable_income?: number | null
          tds_deducted?: number | null
          total_deductions?: number | null
          total_income?: number | null
          updated_at?: string | null
          user_id?: string
          rental_income?: number | null;
          section_80G?: number | null;
          section_80E?: number | null;
          section_24?: number | null;
          business_expenses?: number | null;
          depreciation?: number | null;
          esop_value?: number | null;
        }
        Relationships: []
      }
      tax_filings: {
        Row: {
          acknowledgement_file_path: string | null
          acknowledgement_number: string | null
          assessment_year: string
          created_at: string | null
          filing_date: string | null
          filing_type: string
          id: string
          json_file_path: string | null
          refund_amount: number | null
          status: string
          tax_paid: number | null
          tax_payable: number | null
          taxable_income: number | null
          total_income: number | null
          updated_at: string | null
          user_id: string
          xml_file_path: string | null
        }
        Insert: {
          acknowledgement_file_path?: string | null
          acknowledgement_number?: string | null
          assessment_year: string
          created_at?: string | null
          filing_date?: string | null
          filing_type: string
          id?: string
          json_file_path?: string | null
          refund_amount?: number | null
          status?: string
          tax_paid?: number | null
          tax_payable?: number | null
          taxable_income?: number | null
          total_income?: number | null
          updated_at?: string | null
          user_id: string
          xml_file_path?: string | null
        }
        Update: {
          acknowledgement_file_path?: string | null
          acknowledgement_number?: string | null
          assessment_year?: string
          created_at?: string | null
          filing_date?: string | null
          filing_type?: string
          id?: string
          json_file_path?: string | null
          refund_amount?: number | null
          status?: string
          tax_paid?: number | null
          tax_payable?: number | null
          taxable_income?: number | null
          total_income?: number | null
          updated_at?: string | null
          user_id?: string
          xml_file_path?: string | null
        }
        Relationships: []
      }
      tax_knowledge: {
        Row: {
          category: string
          content: string
          created_at: string | null
          for_user_type: string[] | null
          id: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          content: string
          created_at?: string | null
          for_user_type?: string[] | null
          id?: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          content?: string
          created_at?: string | null
          for_user_type?: string[] | null
          id?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tax_payments: {
        Row: {
          amount: number
          assessment_year: string
          challan_file_path: string | null
          challan_number: string | null
          created_at: string | null
          id: string
          payment_date: string
          payment_type: string
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          assessment_year: string
          challan_file_path?: string | null
          challan_number?: string | null
          created_at?: string | null
          id?: string
          payment_date: string
          payment_type: string
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          assessment_year?: string
          challan_file_path?: string | null
          challan_number?: string | null
          created_at?: string | null
          id?: string
          payment_date?: string
          payment_type?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
