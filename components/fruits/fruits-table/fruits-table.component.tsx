"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import { Column, ColumnItem } from "@/components/common";
import { useFruitsStore } from "../fruits.store";
import { FruitsDataType } from "../fruits.types";
import { FruitsQuickSearch } from "@/components/fruits-quicksearch";
import { FruitsForm } from "../fruits-form";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export function FruitsTable<TValue>({
  columns,
}: DataTableProps<FruitsDataType, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const fruits = useFruitsStore((state) => state.fruits);

  const table = useReactTable({
    data: fruits,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      if (typeof value === "string") {
        return value.toLowerCase().includes(filterValue.toLowerCase());
      }
      if (Array.isArray(value)) {
        return value
          .map((v) => (typeof v === "string" ? v : JSON.stringify(v)))
          .join(" ")
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      }
      return String(value).toLowerCase().includes(filterValue.toLowerCase());
    },
  });

  return (
    <Column className="overflow-x-auto rounded-md border scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <ColumnItem className="flex flex-row justify-between items-center gap-4 m-10">
        <FruitsQuickSearch
          value={globalFilter}
          onChange={setGlobalFilter}
          className="w-full"
        />
        <FruitsForm />
      </ColumnItem>
      <ColumnItem className="m-5">
        <Table className="table-fixed w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ColumnItem>
    </Column>
  );
}
