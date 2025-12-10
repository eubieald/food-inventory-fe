"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FruitsDataType } from "../fruits.types";
import { Button } from "@/components/ui/button";
import { useFruitsStore } from "../fruits.store";
import { useFruitsForm } from "../fruits-form";

export const columns: ColumnDef<FruitsDataType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="whitespace-pre-line">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <span className="whitespace-pre-line">{row.original.type}</span>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => row.original.stock,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.original.price.toString()); // or Number(row.original.price.toString())
      const formatted = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(price);

      return <span>{formatted}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const fruit = row.original;
      const { onOpenEdit } = useFruitsForm();

      return (
        <Button variant="outline" size="sm" onClick={() => onOpenEdit(fruit)}>
          Edit
        </Button>
      );
    },
  },
];
