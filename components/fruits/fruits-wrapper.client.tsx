"use client";

import { useEffect } from "react";
import { useFruitsStore } from "./fruits.store";
import { FruitsTable, columns } from "./fruits-table";
import { FruitsDataType } from "./fruits.types";
import { Spinner } from "../spinner";

const FruitsWrapperClient = ({
  initialFruits,
}: {
  initialFruits: FruitsDataType[];
}) => {
  const setFruits = useFruitsStore((state) => state.setFruits);
  const fruitsStore = useFruitsStore((state) => state.fruits);
  const hasHydrated = useFruitsStore((state) => state.hasHydrated);

  useEffect(() => {
    if (hasHydrated && initialFruits?.length) {
      setFruits(initialFruits);
    }
  }, [hasHydrated, initialFruits, setFruits]);

  if (!hasHydrated) {
    return <Spinner />;
  }

  return <FruitsTable columns={columns} />;
};

export default FruitsWrapperClient;
