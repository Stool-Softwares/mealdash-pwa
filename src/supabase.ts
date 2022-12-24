import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase.types";

const supabaseUrl = "https://bmswcxlmrulfxnwdxmbn.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
