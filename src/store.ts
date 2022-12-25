import { Session, User } from "@supabase/supabase-js";
import create from "zustand";

interface AppState {
  auth: {
    session: Session | null;
    user: User | null;
    setAuth: (session: Session | null, user: User | null) => void;
  };
}

export const useStore = create<AppState>((s) => ({
  auth: {
    session: null,
    user: null,
    setAuth: (session, user) =>
      s((ps) => ({ ...ps, auth: { ...ps.auth, session, user } })),
  },
}));
