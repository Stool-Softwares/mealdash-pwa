import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useUser } from "../hooks/useUser";
import supabase from "../supabase";
import { ComposeObject, Meal, MealStatus } from "../types";
import { Button } from "../ui/Button";
import { VStack } from "../ui/VStack";

type MealWithStatus = ComposeObject<Meal, { isAttending: boolean }>;

function convertToState(
  meals: Array<Meal>,
  mealStatus: Array<MealStatus>
): Array<MealWithStatus> {
  function isAttending(meal: Meal): boolean {
    return mealStatus.some(
      (m) => m.mealType === meal.mealType && m.mealDate === meal.mealDate
    );
  }
  return sortTheMealsInOrder(meals).map((m) => ({
    ...m,
    isAttending: isAttending(m),
  }));
}

function sortTheMealsInOrder(meals: Array<Meal>): Array<Meal> {
  const breakfast = meals.filter((m) => m.mealType === "BRE");
  const lunch = meals.filter((m) => m.mealType === "LUN");
  const snacks = meals.filter((m) => m.mealType === "SNA");
  const dinner = meals.filter((m) => m.mealType === "DIN");
  return [...breakfast, ...lunch, ...snacks, ...dinner];
}

async function fetchTodaysMeals() {
  const mealsRes = await supabase
    .from("meals")
    .select()
    .gte("mealDate", "2022-12-25")
    .lte("mealDate", "2022-12-26");

  return mealsRes;
}

async function toggleMealStatus(
  userId: string,
  mealType: string,
  mealDate: string
) {
  try {
    const mealStatus = await supabase
      .from("mealsStatus")
      .select("*")
      .eq("userId", userId)
      .eq("mealType", mealType)
      .eq("mealDate", mealDate);

    if (mealStatus.data?.length === 0) {
      await supabase.from("mealsStatus").insert({ userId, mealDate, mealType });
    } else {
      await supabase
        .from("mealsStatus")
        .delete()
        .eq("userId", userId)
        .eq("mealType", mealType)
        .eq("mealDate", mealDate);
    }

    return { success: true };
  } catch (error: any) {
    console.log(error.message);
    return { success: false };
  }
}

async function getUserMealStatus(userId: string) {
  const mealStatus = await supabase
    .from("mealsStatus")
    .select("*")
    .eq("userId", userId)
    .gte("mealDate", "2022-12-25")
    .lte("mealDate", "2022-12-26");

  return mealStatus.data || [];
}

export function Home() {
  const [meals, setMeals] = useState<Array<MealWithStatus>>([]);
  const user = useUser();

  useEffect(() => {
    async function getMeals() {
      if (!user) return;
      const mealsRes = await fetchTodaysMeals();
      const mealStatus = await getUserMealStatus(user.id);
      const stateVariant = convertToState(mealsRes.data || [], mealStatus);

      console.log("exec");

      setMeals(stateVariant);
    }

    getMeals();
  }, [user]);

  if (!user) return null;

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
            <Button
              className="w-full mt-3"
              onClick={async () => {
                setMeals((m) => {
                  const newMeals = [...m];
                  newMeals[i].isAttending = !newMeals[i].isAttending;
                  return newMeals;
                });

                const { success } = await toggleMealStatus(
                  user.id,
                  item.mealType,
                  item.mealDate
                );

                if (!success) {
                  setMeals((m) => {
                    const newMeals = [...m];
                    newMeals[i].isAttending = !newMeals[i].isAttending;
                    return newMeals;
                  });
                }
              }}
            >
              {item.isAttending ? "Cancel Meal" : "Attend Meal"}
            </Button>
          </div>
        ))}
      </VStack>
    </VStack>
  );
}
