import dayjs from "dayjs";
import { API } from "../consts";
import { useStore } from "../store";
import { MealType, RegisterProviderInput, WeekMenu } from "../types";

export function getToken() {
  return localStorage.getItem("token");
}

export async function register(user: RegisterProviderInput) {
  const res = await fetch(`${API}/provider/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await res.json();

  if (!res.ok) {
    return { data: null, error: data.error };
  }

  localStorage.setItem("token", data.token);

  return { data, error: null };
}

export async function login(email: string, password: string) {
  console.log("okok");

  const res = await fetch(`${API}/provider/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { data: null, error: data.error };
  }

  localStorage.setItem("token", data.token);

  return { data, error: null };
}

export async function getUser() {
  const store = useStore;
  const token = getToken();
  if (!token) return { data: null, error: "No token" };

  const res = await fetch(`${API}/provider/details`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    return { data: null, error: "Something went wrong" };
  }
  const data = await res.json();

  store.setState({
    user: data.provider,
  });

  return { data, error: null };
}

export async function logout() {
  localStorage.removeItem("token");
}

export async function getEstimatedNumberOfConsumers() {
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

  const currentMeal = getCurrentMealType();

  const res = await fetch(`${API}/provider/estimated-users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      date: dayjs().format("MM/DD/YYYY"),
      mealType: currentMeal,
    }),
  });

  const data = await res.json();

  console.log({ data });
  if (!res.ok) {
    return { data: null, error: data.error };
  }

  return { data, error: null };
}

export async function saveMenu(menu: WeekMenu) {
  const res = await fetch(`${API}/provider/menu-bulk`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(menu),
  });

  if (!res.ok) {
    return { data: null, error: "Something went wrong" };
  }
  const data = await res.json();

  return { data, error: null };
}
