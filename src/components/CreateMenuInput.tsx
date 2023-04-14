interface CreateMenuInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function CreateMenuInput(props: CreateMenuInputProps) {
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <textarea
        id={props.name}
        className="border border-green-600 w-full rounded-md px-2 py-1"
        value={props.value}
        name={props.name}
        onChange={props.onChange}
      />
    </div>
  );
}
