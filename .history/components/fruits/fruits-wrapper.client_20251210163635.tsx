"use client";

import { useEffect, useState } from "react";
import { FruitsTable, columns } from "./fruits-table";
import { FruitsDataType } from "./fruits.types";

const FruitsWrapperClient = () => {
  const [fruits, setFruits] = useState<FruitsDataType[]>([]);
  const [loading, setLoading] = useState(true);



  if (loading) return <div>Loading...</div>;

  return <FruitsTable data={fruits} columns={columns} />;
};

export default FruitsWrapperClient;
