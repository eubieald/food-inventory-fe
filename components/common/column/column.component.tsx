import { GenericProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Column = ({ className, children }: GenericProps) => {
  return (
    <div className={cn("column flex flex-col", className)}>{children}</div>
  );
};

export const ColumnItem = ({ className, children }: GenericProps) => {
  return (
    <div className={cn("column-item flex flex-col", className)}>{children}</div>
  );
};

export const ColumnItemLeft = ({ className, children }: GenericProps) => {
  return (
    <div className={cn("column-item-left flex flex-col", className)}>
      {children}
    </div>
  );
};

export const ColumnItemRight = ({ className, children }: GenericProps) => {
  return (
    <div className={cn("column-item-right flex flex-col", className)}>
      {children}
    </div>
  );
};
