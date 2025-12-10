"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { GenericInput } from "@/components/form/generic-input";
import { UseFormReturn } from "react-hook-form";
import { FormInputType } from "../fruits.types";

interface FruitsFormProps {
  form: UseFormReturn<FormInputType>;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormInputType) => Promise<void>;
  onOpenAdd: () => void;
}

export const FruitsForm = ({
  form,
  open,
  onClose,
  onSubmit,
  onOpenAdd,
}: FruitsFormProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      {/* REMOVE DialogTrigger */}
      <Button variant="outline" onClick={onOpenAdd}>
        Add Fruit
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fruits Form</DialogTitle>
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
              label="Type"
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
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
