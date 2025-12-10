"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FruitsDataType } from "../fruits.types";

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
      const price = parseFloat(row.original.price); // or Number(row.original.price)
      const formatted = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(price);

      return <span>{formatted}</span>;
    },
  },
];
