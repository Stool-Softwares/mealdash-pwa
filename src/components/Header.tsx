import { useNavigate } from "react-router-dom";
import { HStack } from "../ui/HStack";
import { VStack } from "../ui/VStack";

export function Header(props: { savedMeals: number }) {
  const navigate = useNavigate();

  return (
    <HStack className="justify-between mb-5 w-full">
      <VStack>
        <h1 className="font-bold">Hi, {"Namish"}</h1>
        {props.savedMeals === -1 ? null : (
          <p className="text-sm">
            you have saved {`${props.savedMeals}`} meals so far
          </p>
        )}
      </VStack>

      <div
        onClick={() => navigate("/profile")}
        className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center overflow-hidden"
      >
        <img
          src="https://robohash.org/mail@ashallendesign.co.uk"
          alt="avatar"
        />
      </div>
    </HStack>
  );
}
