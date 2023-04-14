import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../apis";
import { Header } from "../components/Header";
import { useEstimatedCount } from "../hooks/useEstimatedCount";
import { useUser } from "../hooks/useUser";
import { MealType } from "../types";
import { Flex } from "../ui/Flex";
import { Spinner } from "./Loading";

function getCurrentMealType(): MealType {
  const hour = new Date().getHours();
  if (hour >= 0 && hour <= 8) {
    return "BREAKFAST";
  } else if (hour >= 9 && hour <= 12) {
    return "LUNCH";
  } else if (hour >= 17 && hour <= 18) {
    return "SNACKS";
  } else {
    return "DINNER";
  }
}

export function Home() {
  const navigate = useNavigate();
  const user = useUser();
  const { count, total, loading } = useEstimatedCount();

  console.log(count, loading);

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    // navigate("/login");
  }

  return (
    <Flex className="px-5 py-5 home-bg h-full flex-col justify-start relative">
      <Header />

      {loading && (
        <div className="w-full flex justify-center mb-5">
          <Spinner />
        </div>
      )}

      <div className="border border-green-600 w-full py-5 rounded-md flex flex-col items-start justify-center mb-5">
        <p className="px-5">Estimated User Count: {getCurrentMealType()}</p>
        <p className="font-bold text-6xl text-green-700 m-auto my-3">
          {count}/{total}
        </p>
      </div>

      <div className="border border-green-600 w-full py-5 rounded-md flex flex-col items-start justify-center mb-5">
        <p className="px-5">Last week's Performance</p>
        <div className="m-auto">"""A GRAPH GOES HERE"""</div>
      </div>

      <div
        className="w-full left-1/2 absolute bottom-5 px-5"
        style={{ transform: "translateX(-50%)" }}
      >
        <button
          className="w-full font-bold rounded-md border border-green-600 bg-green-700 text-white py-2"
          onClick={() => navigate("/create-menu")}
        >
          Create Menu
        </button>
      </div>
    </Flex>
  );
}
