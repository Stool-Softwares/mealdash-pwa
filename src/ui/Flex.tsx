export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Flex(props: FlexProps) {
  return (
    <div {...props} className={`flex ${props.className}`}>
      {props.children}
    </div>
  );
}
