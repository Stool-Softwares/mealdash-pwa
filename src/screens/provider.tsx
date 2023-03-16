import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import supabase from "../supabase";

async function totalMeals() {
  const meals = await supabase.from("users").select("*");
  return meals;
}

async function totalMeals1() {
  const tm = await supabase
    .from("mealsStatus")
    .select("*")
    .eq("mealType", "SNA");
  return tm;
}

function Provider() {
  const [t, setT] = useState(0);
  const [tm, setTm] = useState(0);

  useEffect(() => {
    totalMeals().then((d) => {
      console.log(d);
      if (d.data) {
        setT(d.data.length);
      }
    });

    totalMeals1().then((d) => {
      console.log(d);
      if (d.data) {
        setTm(d.data.length);
      }
    });
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-start px-5 py-5">
      <Header />
      <div className="my-2 border w-full py-4 rounded-md flex items-center justify-center flex-col">
        <h2 className="text-base">Consumers</h2>
        <p className="text-5xl font-bold">
          {t - tm}/{t}
        </p>
      </div>

      <div className="my-2 border w-full py-4 rounded-md flex items-center justify-center flex-col">
        Register a user
      </div>
    </div>
  );
}

export { Provider };
