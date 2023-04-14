import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { HStack } from "../ui/HStack";
import { VStack } from "../ui/VStack";

export function Header() {
  const navigate = useNavigate();
  const user = useUser();

  console.log(user);

  return (
    <HStack className="justify-between mb-5 w-full">
      <VStack>
        <h1 className="font-bold">Hi, {user && user.name}</h1>
        <p className="text-sm text-white bg-zinc-500 px-2 py-0.5 rounded-md">
          Mess Manager
        </p>
      </VStack>

      <div
        onClick={() => navigate("/profile")}
        className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center overflow-hidden"
      >
        {/* <img src="" alt="avatar" /> */}
      </div>
    </HStack>
  );
}
