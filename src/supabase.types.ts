export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      meals: {
        Row: {
          createdAt: string | null
          mealContent: string | null
          mealType: string
          mealDate: string
        }
        Insert: {
          createdAt?: string | null
          mealContent?: string | null
          mealType: string
          mealDate: string
        }
        Update: {
          createdAt?: string | null
          mealContent?: string | null
          mealType?: string
          mealDate?: string
        }
      }
      mealsStatus: {
        Row: {
          id: string
          createdAt: string | null
          userId: string
          mealType: string
          mealDate: string
        }
        Insert: {
          id?: string
          createdAt?: string | null
          userId: string
          mealType: string
          mealDate: string
        }
        Update: {
          id?: string
          createdAt?: string | null
          userId?: string
          mealType?: string
          mealDate?: string
        }
      }
      users: {
        Row: {
          createdAt: string
          name: string | null
          profileImageUrl: string | null
          type: string
          id: string
        }
        Insert: {
          createdAt?: string
          name?: string | null
          profileImageUrl?: string | null
          type: string
          id: string
        }
        Update: {
          createdAt?: string
          name?: string | null
          profileImageUrl?: string | null
          type?: string
          id?: string
        }
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
  }
}
