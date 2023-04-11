import { API } from "../consts";
import { useStore } from "../store";
import { MealType, RegisterConsumerInput } from "../types";

export function getToken() {
  return localStorage.getItem("token");
}

export async function register(user: RegisterConsumerInput) {
  const res = await fetch(`${API}/consumer/register`, {
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
  const res = await fetch(`${API}/consumer/login`, {
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

  const res = await fetch(`${API}/consumer/details`, {
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
    user: data.consumer,
  });

  return { data, error: null };
}

export async function logout() {
  localStorage.removeItem("token");
}

export async function getMeals() {
  const res = await fetch(`${API}/consumer/menu`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    return { data: null, error: data.error };
  }

  return { data: data.menu, error: null };
}

export async function toggleMealStatus(mealType: MealType) {
  const res = await fetch(`${API}/consumer/toggle-meal`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ mealType }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { data: null, error: data.error };
  }

  return { data, error: null };
}
