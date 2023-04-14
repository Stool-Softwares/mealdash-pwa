import { useEffect, useState } from "react";
import { socket } from "../App";
import { getEstimatedNumberOfConsumers } from "../apis";

export function useEstimatedCount() {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function A() {
      const data = (await getEstimatedNumberOfConsumers()) as any;

      setCount(data.data.estimatedUsers);
      setTotal(data.data.total);
    }

    setLoading(true);
    A().finally(() => setLoading(false));

    socket.on("update-meal-status", () => {
      A();
    });

    return () => {
      setCount(0);
      setTotal(0);
      setLoading(false);
    };
  }, []);

  return { count, total, loading };
}
