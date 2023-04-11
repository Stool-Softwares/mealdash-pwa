interface InputProps extends React.HTMLProps<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <div>
      <input
        {...props}
        className={`bg-zinc-200 rounded-md px-2 py-1 border border-zinc-500 ${props.className} outline-none focus:outline-zinc-300`}
      />
    </div>
  );
}
