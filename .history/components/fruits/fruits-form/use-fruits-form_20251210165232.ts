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
      // 1️⃣ Add fruit to backend
      await addFruits(data);

      // 2️⃣ Fetch updated list from backend
      const updatedFruits = await getFruitsList({});
      setFruits(updatedFruits); // Update Zustand store

      // 3️⃣ Close modal
      setOpen(false);
    } catch (error) {
      console.error("Failed to add fruit:", error);
    }
  };

  return { onSubmit, open, setOpen };
};
