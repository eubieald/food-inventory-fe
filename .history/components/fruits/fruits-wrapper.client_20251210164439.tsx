"use client";

import { useEffect } from "react";
import { useFruitsStore } from "./fruits.store";
import { FruitsTable, columns } from "./fruits-table";
import { FruitsDataType } from "./fruits.types";

const FruitsWrapperClient = ({
  initialFruits,
}: {
  initialFruits: FruitsDataType[];
}) => {
  const setFruits = useFruitsStore((state) => state.setFruits);
  const fruitsStore = useFruitsStore((state) => state.fruits);
  const hasHydrated = useFruitsStore((state) => state.hasHydrated);

  console.log("STORE FRUITS:", fruitsStore);
  console.log("INITIAL FRUITS:", initialFruits);

  useEffect(() => {
    if (hasHydrated && initialFruits?.length) {
      setFruits(initialFruits);
    }
  }, [hasHydrated, initialFruits, setFruits]);

  if (!hasHydrated) {
    return <div>Loading...</div>;
  }

  return <FruitsTable columns={columns} />;
};

export default FruitsWrapperClient;
