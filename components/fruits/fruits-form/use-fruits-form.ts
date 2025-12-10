"use client";

import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fruitsFormSchema } from "./fruits-from.schema";
import { FormInputType, FruitsDataType } from "../fruits.types";
import { useFruitsStore } from "../fruits.store";
import { getFruitsList, addFruits, updateFruits } from "../fruits.actions";
import { da } from "zod/locales";

export const useFruitsForm = () => {
  const [open, setOpen] = useState(false);
  const [editingFruit, setEditingFruit] = useState<FruitsDataType | null>(null);
  const setFruits = useFruitsStore((state) => state.setFruits);

  // React Hook Form
  const form: UseFormReturn<FormInputType> = useForm<FormInputType>({
    resolver: zodResolver(fruitsFormSchema),
    defaultValues: {
      name: "",
      type: "",
      stock: "",
      price: "",
    },
  });

  // Open modal for adding new fruit
  const onOpenAdd = () => {
    setEditingFruit(null);
    form.reset({ name: "", type: "", stock: "", price: "" });
    setOpen(true);
  };

  // Open modal for editing fruit
  const onOpenEdit = (fruit: FruitsDataType) => {
    setEditingFruit(fruit);
    form.reset({
      name: fruit.name,
      type: fruit.type,
      stock: fruit.stock.toString(),
      price: fruit.price.toString(),
    });
    setOpen(true);
  };

  const onClose = () => {
    setEditingFruit(null);
    setOpen(false);
  };

  const onSubmit = async (data: FormInputType) => {
    try {
      const payload = {
        name: data.name,
        type: data.type,
        stock: data.stock,
        price: data.price,
      };

      if (editingFruit) {
        // Update existing fruit
        await updateFruits(editingFruit.id, payload);
      } else {
        // Add new fruit
        await addFruits(payload);
      }

      const updatedFruits = await getFruitsList();
      setFruits(updatedFruits);

      onClose();
    } catch (error) {
      console.error("Failed to save fruit:", error);
    }
  };

  return {
    form,
    open,
    onClose,
    onOpenAdd,
    onOpenEdit,
    editingFruit,
    onSubmit,
  };
};
