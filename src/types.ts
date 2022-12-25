import { Database } from "./supabase.types";

export enum UserType {
  STUDENT = "STUDENT",
  FACULTY = "FACULTY",
  VISITOR = "VISITOR",
}

export type Tables = Database["public"]["Tables"];
export type GetRowType<T extends keyof Tables> = Tables[T]["Row"];

export type Meal = GetRowType<"meals">;
export type User = GetRowType<"users">;
