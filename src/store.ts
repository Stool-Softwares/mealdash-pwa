import create from "zustand";

interface AppState {
  user: any;
  setUser: (user: any | null) => void;
}

export const useStore = create<AppState>((s) => ({
  user: null,
  setUser: (user) => s((ps) => ({ ...ps, auth: { ...ps, user } })),
}));
