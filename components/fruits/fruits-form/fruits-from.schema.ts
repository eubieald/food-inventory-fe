"use client";

import { z } from "zod";

export const fruitsFormSchema = z.object({
  name: z.string().min(2, {
    message: "Fruit name must be at least 2 characters.",
  }),
  type: z.string().min(1, "Type is required"),
  price: z.string().min(1, "Price is required"),
  stock: z.string().min(1, "Stock is required"),
});
