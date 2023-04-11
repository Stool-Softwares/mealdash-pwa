interface Dropdownprops extends React.HTMLProps<HTMLSelectElement> {
  options: string[];
}

export function Dropdown(props: Dropdownprops) {
  return (
    <div>
      <select
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        className={`bg-zinc-700 rounded-md px-2 py-1 border border-zinc-500 ${props.className} outline-none focus:outline-zinc-300`}
      >
        {props.options.map((op) => {
          console.log(op);
          return <option value={op}>{op}</option>;
        })}
      </select>
    </div>
  );
}
