"use server";

import { genericRequest } from "@/lib/generic-actions";
import { FruitsDataType } from "./fruits.types";

type FruitsListProps = {
  searchParams?: string;
};

// export const getCountriesList = async () => {
//   const path = `https://countries.trevorblades.com`;
//   const response = await genericRequest({
//     overridePath: true,
//     path: path,
//     method: "POST",
//     options: {
//       body: JSON.stringify({ query: COUNTRIES_LIST_QUERY }),
//     },
//   });

export const getFruitsList = async ({ searchParams }: FruitsListProps) => {
  const path = `fruits?${searchParams}`;
  const response = await genericRequest({
    path: path,
    method: "GET",
  });

  const data: FruitsDataType[] = await response.json();
  return data;
};

export const addFruits = async (data: FruitsDataType) => {
  const path = `fruits`;
  const response = await genericRequest({
    path: path,
    method: "POST",
    options: {
      body: JSON.stringify(data),
    },
  });
};
