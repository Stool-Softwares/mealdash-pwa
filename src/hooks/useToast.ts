import { useContext } from "react";
import { ToastContext } from "../App";

export function useToast() {
  const toast = useContext(ToastContext);
  if (!toast) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return toast.trueFn;
}
