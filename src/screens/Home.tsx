import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { HStack } from "../ui/HStack";
import { VStack } from "../ui/VStack";

function Header() {
  const navigate = useNavigate();
  return (
    <HStack className="justify-between mb-5">
      <VStack>
        <h1 className="font-bold">Hi, Aditya</h1>
        <p className="text-sm">you have saved 4 meals so far</p>
      </VStack>

      <div
        onClick={() => navigate("/profile")}
        className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center"
      ></div>
    </HStack>
  );
}

export function Home() {
  const dummyData = [
    { type: "BRE", content: "whatever", date: "29-08-2022" },
    { type: "LUN", content: "whatever", date: "29-08-2022" },
    { type: "SNA", content: "whatever", date: "29-08-2022" },
    { type: "DIN", content: "whatever", date: "29-08-2022" },
  ];
  return (
    <VStack className="px-5 py-5">
      <Header />

      <VStack className="mb-5">
        <h1 className="font-bold">Your Meals</h1>
      </VStack>
      <VStack>
        {dummyData.map((item, i) => (
          <div
            key={i}
            className="w-full border border-zinc-400 rounded-md px-3 py-3 mb-5"
          >
            <h1 className="text-sm font-bold">{item.type}</h1>
            <p className="text-sm">{item.content}</p>
            <p className="text-sm">Time: 1:00PM - 3:00PM</p>
            <Button className="w-full mt-3">Cancel Meal</Button>
          </div>
        ))}
      </VStack>
    </VStack>
  );
}
