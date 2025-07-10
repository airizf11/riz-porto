export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      contacts: {
        Row: {
          created_at: string
          email: string | null
          id: string
          message: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          name?: string | null
        }
        Relationships: []
      }
      content_items: {
        Row: {
          author_name: string | null
          content: string | null
          content_type: string | null
          cover_image_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          is_featured: boolean
          live_url: string | null
          order_index: number
          repo_url: string | null
          slug: string | null
          status: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          author_name?: string | null
          content?: string | null
          content_type?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_featured?: boolean
          live_url?: string | null
          order_index?: number
          repo_url?: string | null
          slug?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          author_name?: string | null
          content?: string | null
          content_type?: string | null
          cover_image_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_featured?: boolean
          live_url?: string | null
          order_index?: number
          repo_url?: string | null
          slug?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      content_tags: {
        Row: {
          content_item_id: string
          tag_id: string
        }
        Insert: {
          content_item_id?: string
          tag_id?: string
        }
        Update: {
          content_item_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_tags_content_item_id_fkey"
            columns: ["content_item_id"]
            isOneToOne: false
            referencedRelation: "content_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          category: string | null
          content: string | null
          cover_image_url: string | null
          created_at: string
          id: string
          slug: string
          tag: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          id?: string
          slug: string
          tag?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          id?: string
          slug?: string
          tag?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          case_study: string | null
          created_at: string
          description: string
          id: string
          image_url: string | null
          is_featured: boolean
          live_url: string | null
          name: string
          order_index: number | null
          repo_url: string | null
          slug: string | null
          stack: string | null
          updated_at: string | null
        }
        Insert: {
          case_study?: string | null
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          is_featured?: boolean
          live_url?: string | null
          name: string
          order_index?: number | null
          repo_url?: string | null
          slug?: string | null
          stack?: string | null
          updated_at?: string | null
        }
        Update: {
          case_study?: string | null
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean
          live_url?: string | null
          name?: string
          order_index?: number | null
          repo_url?: string | null
          slug?: string | null
          stack?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      quotes: {
        Row: {
          author: string | null
          created_at: string
          id: string
          is_active: boolean
          text: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          text: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          text?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          key: string | null
          value: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string | null
          value?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string | null
          value?: string | null
        }
        Relationships: []
      }
      social_links: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          icon_id: string | null
          id: string
          image_url: string | null
          name: string
          order_index: number
          url: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          icon_id?: string | null
          id?: string
          image_url?: string | null
          name: string
          order_index?: number
          url: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          icon_id?: string | null
          id?: string
          image_url?: string | null
          name?: string
          order_index?: number
          url?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          created_at: string
          icon_id: string | null
          id: string
          name: string
          slug: string
          tag_type: string
        }
        Insert: {
          created_at?: string
          icon_id?: string | null
          id?: string
          name: string
          slug: string
          tag_type?: string
        }
        Update: {
          created_at?: string
          icon_id?: string | null
          id?: string
          name?: string
          slug?: string
          tag_type?: string
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
      content_status: "draft" | "published"
      tag_type: "tech" | "topic"
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
    Enums: {
      content_status: ["draft", "published"],
      tag_type: ["tech", "topic"],
    },
  },
} as const
