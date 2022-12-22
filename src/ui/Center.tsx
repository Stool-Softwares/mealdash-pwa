import { Flex, FlexProps } from "./Flex";

interface CenterProps extends FlexProps {}

export function Center(props: CenterProps) {
  return (
    <Flex
      {...props}
      className={`flex-row justify-center items-center ${props.className}`}
    >
      {props.children}
    </Flex>
  );
}
