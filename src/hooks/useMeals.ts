import { useEffect, useState } from "react";
import { getMeals, toggleMealStatus } from "../apis";
import { Meal, MealType } from "../types";
import { useToast } from "./useToast";

const mealTime: Record<Lowercase<MealType>, string> = {
  breakfast: "8-9", // from 8AM to 9AM
  lunch: "12-14", // from 12PM to 2PM
  snacks: "17-18", // from 5PM to 6PM
  dinner: "20-22", // from 8PM to 10PM
} as const;

function sortMealsByPriority(meals: Meal) {
  const currentHour = 0; // new Date().getHours(); // 0-23
  for (const mealType of Object.keys(mealTime) as Lowercase<MealType>[]) {
    const [start] = mealTime[mealType].split("-").map((t) => parseInt(t));
    const diff = Math.abs(currentHour - start);

    console.log({ currentHour, start, diff });
  }
}

export function useMeals() {
  const [meals, setMeals] = useState<Meal>({} as Meal);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  sortMealsByPriority(meals);

  useEffect(() => {
    getMeals()
      .then((r) => {
        setMeals(r.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [localStorage.getItem("token")]);

  async function toggleMeal(mealType: MealType) {
    // Optimistically update the state
    const key = `${
      mealType.toLocaleLowerCase() as Lowercase<MealType>
    }Status` as const;

    setMeals((prev) => {
      return {
        ...prev,
        [key]: !prev[key],
      };
    });

    // now make the request
    const { data, error } = await toggleMealStatus(mealType);

    if (error && !data.success) {
      // revert the state
      setMeals((prev) => {
        return {
          ...prev,
          [key]: !prev[key],
        };
      });
      toast("Error while toggling meal status");
    }
  }

  return { meals, loading, toggleMeal };
}
