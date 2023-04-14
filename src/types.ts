export type RegisterProviderInput = {
  name: string;
  email: string;
  password: string;
};

export type Meal = {
  date: string;
  breakfast: string;
  lunch: string;
  snacks: string;
  dinner: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  breakfastStatus: boolean;
  lunchStatus: boolean;
  snacksStatus: boolean;
  dinnerStatus: boolean;
};

export type Menu = Pick<
  Meal,
  "breakfast" | "lunch" | "snacks" | "dinner" | "date"
>;

export const Meals = ["BREAKFAST", "LUNCH", "SNACKS", "DINNER"] as const;
export type MealType = typeof Meals[number];

export const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;
export type Day = typeof DAYS[number];
export type WeekMenu = Record<Day, Menu>;
