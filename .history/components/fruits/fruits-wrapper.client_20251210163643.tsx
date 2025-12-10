"use client";

import { useEffect, useState } from "react";
import { FruitsTable, columns } from "./fruits-table";
import { FruitsDataType } from "./fruits.types";

const FruitsWrapperClient = () => {
  const [fruits, setFruits] = useState<FruitsDataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/fruits`);
        const data = await res.json();
        setFruits(data);
      } catch (err) {
        console.error("Failed to fetch fruits", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFruits();
  }, []);

  if (loading) return <div>Loading...</div>;

  return <FruitsTable data={fruits} columns={columns} />;
};

export default FruitsWrapperClient;
