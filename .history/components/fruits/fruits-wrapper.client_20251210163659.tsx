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
  // const setFruits = useFruitsStore((state) => state.setFruits);
  // const fruitsStore = useFruitsStore((state) => state.fruits);
  // const hasHydrated = useFruitsStore((state) => state.hasHydrated);

  // useEffect(() => {
  //   if (hasHydrated && initialFruits?.length && fruitsStore?.length === 0) {
  //     setFruits(initialFruits);
  //   }
  // }, [hasHydrated, initialFruits, fruitsStore?.length, setFruits]);

  if (!hasHydrated) {
    return <div>Loading...</div>;
  }

  return <FruitsTable columns={columns} />;
};

export default FruitsWrapperClient;
