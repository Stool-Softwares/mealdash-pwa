export type ConsumerType = "HOSTLER" | "DAYSCHOLAR";

export type RegisterConsumerInput = {
  name: string;
  email: string;
  password: string;
  type: ConsumerType;
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

export const Meals = ["BREAKFAST", "LUNCH", "SNACKS", "DINNER"] as const;
export type MealType = typeof Meals[number];
