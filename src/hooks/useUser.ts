import { useStore } from "../store";

export const useUser = () => useStore((s) => s.auth.user);
