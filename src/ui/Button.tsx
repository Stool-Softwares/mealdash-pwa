import { PropsWithChildren } from "react";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  type?: "submit" | "reset" | "button";
}

export function Button(props: PropsWithChildren<ButtonProps>) {
  const { variant = "primary", children, className, ...rest } = props;
  return (
    <button
      {...rest}
      className={`bg-zinc-700 rounded-md px-2 py-1 border border-zinc-500 outline-none focus:outline-zinc-300 ${className}`}
    >
      {props.children}
    </button>
  );
}
