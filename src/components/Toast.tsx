import ReactDOM from "react-dom";

interface ToastProps {
  open: boolean;
  message: string;
}

export function Toast(props: ToastProps) {
  if (!props.open) return null;
  return ReactDOM.createPortal(
    <div
      className="absolute bg-zinc-400/30 border-zinc-400 border px-4 py-2 rounded-md left-1/2 top-3 w-fit"
      style={{ transform: "translateX(-50%)", zIndex: 1000 }}
    >
      <p>{props.message}</p>
    </div>,
    document.getElementById("toast") as HTMLElement
  );
}
