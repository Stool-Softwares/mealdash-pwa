import ReactDOM from "react-dom";

interface ToastProps {
  open: boolean;
  message: string;
}

export function Toast(props: ToastProps) {
  if (!props.open) return null;
  return ReactDOM.createPortal(
    <div
      className="absolute drop-in bg-red-300 text-black border-red-600 border px-4 py-2 rounded-md left-1/2 top-[30px] w-11/12"
      style={{ transform: "translateX(-50%)", zIndex: 1000 }}
    >
      <p>{props.message}</p>
    </div>,
    document.getElementById("toast") as HTMLElement
  );
}
