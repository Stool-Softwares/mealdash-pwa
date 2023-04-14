import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveMenu } from "../apis";
import { CreateMenuInput } from "../components/CreateMenuInput";
import { Header } from "../components/Header";
import { useToast } from "../hooks/useToast";
import { Day, MealType, Meals, WeekMenu } from "../types";
import { Flex } from "../ui/Flex";

function getNextDay(currentDay: Day) {
  switch (currentDay) {
    case "MON":
      return "TUE";
    case "TUE":
      return "WED";
    case "WED":
      return "THU";
    case "THU":
      return "FRI";
    case "FRI":
      return "SAT";
    case "SAT":
      return "SUN";
    case "SUN":
      return "MON";
  }
}

function getPrevDay(currentDay: Day) {
  switch (currentDay) {
    case "MON":
      return "SUN";
    case "TUE":
      return "MON";
    case "WED":
      return "TUE";
    case "THU":
      return "WED";
    case "FRI":
      return "THU";
    case "SAT":
      return "FRI";
    case "SUN":
      return "SAT";
  }
}

const initalMenuState = () => {
  const menu: WeekMenu = {} as WeekMenu;

  let day: Day = "SUN";

  for (let i = 0; i < 7; i++) {
    day = getNextDay(day) as Day;

    menu[day] = {
      breakfast: "a",
      lunch: "b",
      snacks: "c",
      dinner: "d",
      date: new Date().toDateString(),
    };
  }

  return menu;
};

function validateMenuForm(menu: WeekMenu) {
  let day: Day = "SUN";

  for (let i = 0; i < 7; i++) {
    day = getNextDay(day) as Day;

    for (let meal of Meals) {
      const mealKey = meal.toLowerCase() as Lowercase<MealType>;
      if (menu[day][mealKey] === "") {
        return { error: `Please enter ${meal} for ${day}` };
      }
    }
  }

  return { error: null };
}

export function CreateMenu() {
  const [menu, setMenu] = useState<WeekMenu>(initalMenuState());
  const [currentDay, setCurrentDay] = useState<Day>("MON");

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const navigate = useNavigate();

  const toast = useToast();

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.target;

    setMenu((m) => {
      const _m = { ...m };
      _m[currentDay][name as Lowercase<MealType>] = value;
      return _m;
    });
  }

  return (
    <Flex className="px-5 py-5 home-bg h-full flex-col justify-start relative">
      <Header />

      {!showMenu ? (
        <div>
          <h1 className="text-green-700 font-bold mb-5">
            Select Starting Date
          </h1>

          <input
            type="date"
            className="w-full border border-green-700 rounded-md px-3 py-2 mb-5"
            onChange={(e) => {
              const date = new Date(e.target.value);
              const dayNumber = date.getDay();
              if (dayNumber !== 1) {
                toast("Please select a Monday");
                return;
              }

              // revise menu dates
              let day: Day = "SUN";
              setMenu((m) => {
                const _m = { ...m };
                for (let i = 0; i < 7; i++) {
                  day = getNextDay(day) as Day;
                  _m[day].date = dayjs(date).add(i, "day").format("MM/DD/YYYY");
                }

                return _m;
              });

              setStartDate(new Date(e.target.value));
            }}
          />

          <button
            disabled={!startDate}
            type="submit"
            className="w-full font-bold rounded-md border border-green-600 bg-green-700 text-white py-2 disabled:bg-opacity-40"
            onClick={() => setShowMenu(true)}
          >
            Next
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-green-700 font-bold mb-5">
            Create Menu - {currentDay}
          </h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              console.log("Form Submit");
              const { error } = validateMenuForm(menu);
              if (error) {
                toast(error);
                return;
              }

              const { data, error: reqError } = await saveMenu(menu);

              if (reqError) {
                toast(reqError);
                return;
              } else {
                toast("Menu Created Successfully");
                navigate("/home");
                // setMenu(initalMenuState());
                // setCurrentDay("MON");
                // setShowMenu(false);
                // setStartDate(null);
              }
            }}
          >
            <div className="space-y-5">
              <CreateMenuInput
                label="Breakfast"
                name="breakfast"
                onChange={onChange}
                value={menu[currentDay].breakfast}
              />
              <CreateMenuInput
                label="Lunch"
                name="lunch"
                onChange={onChange}
                value={menu[currentDay].lunch}
              />
              <CreateMenuInput
                label="Snacks"
                name="snacks"
                onChange={onChange}
                value={menu[currentDay].snacks}
              />
              <CreateMenuInput
                label="Dinner"
                name="dinner"
                onChange={onChange}
                value={menu[currentDay].dinner}
              />
              <div
                className="w-full flex flex-col justify-center items-center gap-2 left-1/2 absolute bottom-5 px-5"
                style={{ transform: "translateX(-50%)" }}
              >
                <div className="flex items-center w-full gap-4">
                  <button
                    type="button"
                    className="w-full font-bold rounded-md border border-green-600 text-green-600 py-2"
                    onClick={() => {
                      setCurrentDay(getPrevDay(currentDay));
                    }}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="w-full font-bold rounded-md border border-green-600 text-green-600 py-2"
                    onClick={() => {
                      setCurrentDay(getNextDay(currentDay));
                    }}
                  >
                    Next
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full font-bold rounded-md border border-green-600 bg-green-700 text-white py-2"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </Flex>
  );
}
