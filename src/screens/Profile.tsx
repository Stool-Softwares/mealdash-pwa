import { useNavigate } from "react-router-dom";
import { logout } from "../apis";
import { useUser } from "../hooks/useUser";
import { Button } from "../ui/Button";
import { Flex } from "../ui/Flex";
import { HStack } from "../ui/HStack";

export function Profile() {
  const navigate = useNavigate();
  const user = useUser();

  return (
    <Flex className="flex-col items-center p-5 relative h-full">
      <HStack className="mb-5">
        <div className="bg-gray-200 rounded-full w-24 h-24 flex items-center justify-center"></div>
      </HStack>

      <p className="font-bold mb-3">{user?.email}</p>

      <Button>Edit Profile</Button>

      <Flex className="w-full my-5">
        <div className="border border-green-500 w-full px-3 py-2 rounded-md mb-2">
          <button>View Complete Menu</button>
        </div>
      </Flex>

      <HStack className="absolute bottom-5">
        <div className="w-screen px-5">
          <button
            className="border border-red-400 w-full text-red-500 rounded-md py-2"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </HStack>
    </Flex>
  );
}
