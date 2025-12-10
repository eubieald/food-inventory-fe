"use client";

import { useState } from "react";
import { FormInput } from "./fruits-form.types";
import { addFruits, getFruitsList } from "../fruits.actions";
import { useFruitsStore } from "../fruits.store";

export const useFruitsForm = () => {
  const [open, setOpen] = useState(false);
  const setFruits = useFruitsStore((state) => state.setFruits);

  const onSubmit = async (data: FormInput) => {
    try {
      await addFruits(data);

      const updatedFruits = await getFruitsList({});
      setFruits(updatedFruits); // Update Zustand store

      setOpen(false);
    } catch (error) {
      console.error("Failed to add fruit:", error);
    }
  };

  return { onSubmit, open, setOpen };
};
