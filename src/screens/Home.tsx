import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";
import { Meal } from "../types";
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
  const [meals, setMeals] = useState<Array<Meal>>([]);

  useEffect(() => {
    async function getMeals() {
      const mealsRes = await supabase
        .from("meals")
        .select()
        .gte("mealDate", "2022-12-25")
        .lte("mealDate", "2022-12-26");

      setMeals(mealsRes.data || []);
    }

    getMeals();
  }, []);

  return (
    <VStack className="px-5 py-5">
      <Header />

      <VStack className="mb-5">
        <h1 className="font-bold">Your Meals</h1>
      </VStack>
      <VStack>
        {meals.map((item, i) => (
          <div
            key={i}
            className="w-full border border-zinc-400 rounded-md px-3 py-3 mb-5"
          >
            <h1 className="text-sm font-bold">{item.mealType}</h1>
            <p className="text-sm">{item.mealContent}</p>
            <p className="text-sm">Time: 1:00PM - 3:00PM</p>
            <Button className="w-full mt-3">Cancel Meal</Button>
          </div>
        ))}
      </VStack>
    </VStack>
  );
}
