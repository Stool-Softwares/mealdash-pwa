import { Flex, FlexProps } from "./Flex";

interface HStackProps extends FlexProps {}

export function HStack(props: HStackProps) {
  return (
    <Flex {...props} className={`flex-row items-center ${props.className}`}>
      {props.children}
    </Flex>
  );
}
