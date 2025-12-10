"use client";

import { useEffect } from "react";
import { useFruitsStore } from "./fruits.store";
import { FruitsTable, columns } from "./fruits-table";

const FruitsWrapperClient = ({ initialFruits }) => {
  const setFruits = useFruitsStore((s) => s.setFruits);
  const fruits = useFruitsStore((s) => s.fruits);
  const hasHydrated = useFruitsStore((s) => s.hasHydrated);

  useEffect(() => {
    if (hasHydrated) {
      setFruits(initialFruits); // ALWAYS sync from SSR on first load
    }
  }, [hasHydrated, initialFruits, setFruits]);

  if (!hasHydrated) return <div>Loading...</div>;

  return <FruitsTable data={fruits} columns={columns} />;
};

export default FruitsWrapperClient;
