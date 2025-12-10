"use server";

import { genericRequest } from "@/lib/generic-actions";
import { FormInputType, FruitsDataType } from "./fruits.types";

export const getFruitsList = async () => {
  const response = await genericRequest({ path: "fruits", method: "GET" });
  const data: FruitsDataType[] = await response.json();
  return data;
};

export const addFruits = async (data: FormInputType) => {
  await genericRequest({
    path: "fruits",
    method: "POST",
    options: { body: JSON.stringify(data) },
  });
};

export const updateFruits = async (id: number, data: FormInputType) => {
  await genericRequest({
    path: `fruits/${id}`,
    method: "PUT",
    options: { body: JSON.stringify(data) },
  });
};

export const deleteFruits = async (id: number) => {
  await genericRequest({ path: `fruits/${id}`, method: "DELETE" });
};
