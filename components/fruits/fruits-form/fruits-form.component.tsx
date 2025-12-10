"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { GenericProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { fruitsFormSchema } from "./fruits-from.schema";
import { useForm } from "react-hook-form";
import { FormInput } from "./fruits-form.types";
import { GenericInput } from "@/components/form/generic-input";
import { useFruitsForm } from "./use-fruits-form";

export const FruitsForm = ({ className }: GenericProps) => {
  const form = useForm<FormInput>({
    mode: "onBlur",
    resolver: zodResolver(fruitsFormSchema),
    defaultValues: {
      name: "",
      type: "",
      stock: "",
      price: "",
    },
  });

  const { onSubmit, open, setOpen } = useFruitsForm();

  return (
    <div className={cn("", className)}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add New Fruit</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Fruits Creation</DialogTitle>
            <DialogDescription>Add a new fruit to the list.</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <GenericInput
                formHook={form}
                inputProps={{ name: "name" }}
                label="Name"
              />

              <GenericInput
                formHook={form}
                inputProps={{ name: "type" }}
                label="type"
              />
              <GenericInput
                formHook={form}
                inputProps={{ name: "stock" }}
                label="Stock"
              />
              <GenericInput
                formHook={form}
                inputProps={{ name: "price" }}
                label="Price"
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
