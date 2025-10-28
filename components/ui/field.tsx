"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

type FieldContextValue = {
  id: string;
  descriptionId: string;
  messageId: string;
  error?: string;
};

const FieldContext = React.createContext<FieldContextValue | null>(null);

const useFieldContext = () => {
  const context = React.useContext(FieldContext);

  if (!context) {
    throw new Error("Field components must be used within <Field>");
  }

  return context;
};

type FieldProps = React.ComponentProps<"div"> & {
  error?: string;
};

const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, error, ...props }, ref) => {
    const id = React.useId();

    return (
      <FieldContext.Provider
        value={{
          id,
          descriptionId: `${id}-description`,
          messageId: `${id}-message`,
          error,
        }}
      >
        <div
          ref={ref}
          data-slot="field"
          className={cn("grid gap-2", className)}
          {...props}
        />
      </FieldContext.Provider>
    );
  }
);
Field.displayName = "Field";

const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.ComponentProps<typeof Label>
>(({ className, ...props }, ref) => {
  const { id, error } = useFieldContext();

  return (
    <Label
      ref={ref}
      data-slot="field-label"
      data-error={Boolean(error)}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={id}
      {...props}
    />
  );
});
FieldLabel.displayName = "FieldLabel";

const FieldControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentProps<typeof Slot>
>(({ className, ...props }, ref) => {
  const { id, descriptionId, messageId, error } = useFieldContext();

  return (
    <Slot
      ref={ref}
      id={id}
      data-slot="field-control"
      className={className}
      aria-describedby={
        error ? `${descriptionId} ${messageId}`.trim() : descriptionId
      }
      aria-invalid={Boolean(error)}
      {...props}
    />
  );
});
FieldControl.displayName = "FieldControl";

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(({ className, ...props }, ref) => {
  const { descriptionId } = useFieldContext();

  return (
    <p
      ref={ref}
      id={descriptionId}
      data-slot="field-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
});
FieldDescription.displayName = "FieldDescription";

const FieldMessage = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(({ className, children, ...props }, ref) => {
  const { messageId, error } = useFieldContext();
  const body = error ?? children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={messageId}
      data-slot="field-message"
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FieldMessage.displayName = "FieldMessage";

const Fieldset = React.forwardRef<
  HTMLFieldSetElement,
  React.ComponentProps<"fieldset">
>(({ className, ...props }, ref) => {
  return (
    <fieldset
      ref={ref}
      data-slot="fieldset"
      className={cn("grid gap-6", className)}
      {...props}
    />
  );
});
Fieldset.displayName = "Fieldset";

const Legend = React.forwardRef<
  HTMLLegendElement,
  React.ComponentProps<"legend">
>(({ className, ...props }, ref) => {
  return (
    <legend
      ref={ref}
      data-slot="legend"
      className={cn(
        "text-sm font-medium leading-none text-foreground",
        className
      )}
      {...props}
    />
  );
});
Legend.displayName = "Legend";

export {
  Field,
  FieldLabel,
  FieldControl,
  FieldDescription,
  FieldMessage,
  Fieldset,
  Legend,
};
