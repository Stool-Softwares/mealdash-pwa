import { Flex, FlexProps } from "./Flex";

interface VStackProps extends FlexProps {}

export function VStack(props: VStackProps) {
  return (
    <Flex {...props} className={`flex-col justify-center ${props.className}`}>
      {props.children}
    </Flex>
  );
}
