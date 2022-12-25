import { useStore } from "../store";

export const useSession = () => useStore((s) => s.auth.session);
