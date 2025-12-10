"use client";

import { useState } from "react";
import { FormInput } from "./fruits-form.types";
// import { addFruits } from "../fruits.actions";

export const useFruitsForm = () => {
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: FormInput) => {
    const finalData = {
      ...data,
    };
    console.log("finalData", finalData);
    const response = await addFruits(finalData);
    // addFruits(data);
    setOpen(false);
  };

  return { onSubmit, open, setOpen };
};
