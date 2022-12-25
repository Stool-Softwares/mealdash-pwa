export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      meals: {
        Row: {
          createdAt: string | null;
          mealContent: string | null;
          mealType: string;
          mealDate: string;
        };
        Insert: {
          createdAt?: string | null;
          mealContent?: string | null;
          mealType: string;
          mealDate: string;
        };
        Update: {
          createdAt?: string | null;
          mealContent?: string | null;
          mealType?: string;
          mealDate?: string;
        };
      };
      users: {
        Row: {
          id: string;
          createdAt: string;
          name: string;
          profileImageUrl: string | null;
          type: string;
          userId: string;
        };
        Insert: {
          id?: string;
          createdAt?: string;
          name: string;
          profileImageUrl?: string | null;
          type: string;
          userId: string;
        };
        Update: {
          id?: string;
          createdAt?: string;
          name?: string;
          profileImageUrl?: string | null;
          type?: string;
          userId?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
