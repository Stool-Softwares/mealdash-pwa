import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../apis";
import { Header } from "../components/Header";
import { useMeals } from "../hooks/useMeals";
import { useUser } from "../hooks/useUser";
import { MealType, Meals } from "../types";
import { Button } from "../ui/Button";
import { Flex } from "../ui/Flex";
import { VStack } from "../ui/VStack";

export function Home() {
  const navigate = useNavigate();
  const user = useUser();
  const { meals, loading, toggleMeal } = useMeals();
  console.log(user, meals);

  useEffect(() => {
    getUser();
  }, []);

  function getMealData(m: MealType) {
    const key = m.toLocaleLowerCase() as Lowercase<MealType>;
    return { meal: meals[key], status: meals[`${key}Status` as const] };
  }

  return (
    <Flex className="px-5 py-5 home-bg h-full flex-col justify-start">
      <Header />
      <VStack className="mb-5" onClick={() => navigate("/provider")}>
        <h1 className="font-bold">Your Meals</h1>
      </VStack>
      {loading && <p>Loading...</p>}
      {!loading && (
        <VStack>
          {Meals.map((m, i) => (
            <div
              key={i}
              className="w-full border border-zinc-400 rounded-md px-3 py-3 mb-5"
            >
              <h1 className="text-sm font-bold">{m}</h1>
              <p className="text-sm">{getMealData(m).meal}</p>
              <p className="text-sm">Time: 1:00PM - 3:00PM</p>
              <Button
                className="w-full mt-3"
                onClick={async () => {
                  await toggleMeal(m);
                }}
              >
                {getMealData(m).status ? "Cancel Meal" : "Attend Meal"}
              </Button>
            </div>
          ))}
        </VStack>
      )}
    </Flex>
  );
}
