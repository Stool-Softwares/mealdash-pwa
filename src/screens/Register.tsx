import { Button } from "../ui/Button";
import { Center } from "../ui/Center";
import { Input } from "../ui/Input";
import { VStack } from "../ui/VStack";

export function Register() {
  return (
    <Center className="h-full">
      <div>
        <VStack className="items-center">
          <div className="text-center mb-5">
            <h1 className="text-lg font-bold">MealDash</h1>
            <p>Register</p>
          </div>

          <form onSubmit={() => {}}>
            <VStack className="gap-3">
              <Input className="w-72" type="email" placeholder="E-Mail" />
              <Input className="w-72" type="password" placeholder="Password" />
            </VStack>

            <Button type="submit">Register</Button>
          </form>
        </VStack>
      </div>
    </Center>
  );
}
