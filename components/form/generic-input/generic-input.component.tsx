"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import Image from "next/image";
import Eye from "@/public/icons/eye.svg";
import EyeSlash from "@/public/icons/eye-slash.svg";
import IconSearch from "@/public/icons/search.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type GenericInputProps<T extends FieldValues> = {
  formHook: UseFormReturn<T>;
  inputProps: {
    name: Path<T>;
    type?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
  };
  formItemProps?: {
    className?: string;
  };
  label: string;
  icon?: React.ReactNode;
  isRequired?: boolean;
  notes?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
};

export const GenericInput = <T extends FieldValues>({
  formHook,
  label,
  inputProps,
  formItemProps,
  icon,
  notes = "",
}: // TODO: uncomment once this will be implemented
// onChange,
// onBlur,
GenericInputProps<T>) => {
  const {
    name: inputName,
    type: inputType,
    placeholder,
    className: inputClassName,
    disabled,
  } = inputProps;

  return (
    <FormField
      control={formHook.control}
      name={inputName}
      render={({ field }) => {
        return (
          <FormItem className={cn("", formItemProps?.className)}>
            <FormLabel>{label}</FormLabel>
            <div className="relative w-full">
              <FormControl>
                <Input
                  {...field}
                  placeholder={placeholder}
                  type={inputType}
                  className={cn(
                    "h-[2.9375rem]",
                    inputClassName,
                    disabled && "border border-neutral-400 bg-neutral-300"
                  )}
                  disabled={disabled}
                />
              </FormControl>
              {icon}
            </div>
            {notes?.trim() && (
              <p className="text-xs text-neutral-400">{notes}</p>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export const GenericInputPassword = <T extends FieldValues>(
  props: GenericInputProps<T>
) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <GenericInput
      {...props}
      inputProps={{
        ...props.inputProps,
        type: showPassword ? "text" : "password",
      }}
      icon={
        <Button
          asChild
          variant="ghost"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-[1rem] -translate-y-1/2 transform cursor-pointer p-0 hover:bg-transparent"
        >
          <Image
            alt="password toggle"
            src={showPassword ? Eye : EyeSlash}
            className="size-4 border-0"
          />
        </Button>
      }
    />
  );
};

export const GenericInputSearch = <T extends FieldValues>(
  props: GenericInputProps<T>
) => {
  return (
    <GenericInput
      {...props}
      inputProps={{
        ...props.inputProps,
      }}
      icon={
        <div className="absolute top-1/2 right-[1.5rem] -translate-y-1/2 transform p-0">
          <Image alt="search" src={IconSearch.src} width={16} height={16} />
        </div>
      }
    />
  );
};
