"use client";

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const inputBase =
  "w-full rounded-2xl border border-midnight-900/10 bg-ivory-100 px-4 py-3.5 text-sm text-midnight-900 placeholder:text-midnight-500 transition-all focus:border-gold-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold-500/12 aria-[invalid=true]:border-red-400 aria-[invalid=true]:bg-red-50/50";

export function FieldWrapper({
  label,
  htmlFor,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-midnight-700">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export const TextInput = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<"input">>(
  function TextInput({ className, ...props }, ref) {
    return <input ref={ref} className={cn(inputBase, className)} {...props} />;
  }
);

export const SelectInput = forwardRef<HTMLSelectElement, ComponentPropsWithoutRef<"select">>(
  function SelectInput({ className, children, ...props }, ref) {
    return (
      <select ref={ref} className={cn(inputBase, "cursor-pointer appearance-none", className)} {...props}>
        {children}
      </select>
    );
  }
);

export const TextareaInput = forwardRef<HTMLTextAreaElement, ComponentPropsWithoutRef<"textarea">>(
  function TextareaInput({ className, ...props }, ref) {
    return <textarea ref={ref} className={cn(inputBase, "min-h-28 resize-y", className)} {...props} />;
  }
);

export const CheckboxInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input"> & { label: ReactNode; error?: string }
>(function CheckboxInput({ label, error, id, className, ...props }, ref) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer items-start gap-3 rounded-2xl bg-ivory-100 p-4 transition-colors hover:bg-ivory-200/60",
          className
        )}
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className="mt-0.5 h-4.5 w-4.5 shrink-0 cursor-pointer rounded accent-[#00c48c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          {...props}
        />
        <span className="text-xs leading-relaxed text-midnight-600">{label}</span>
      </label>
      {error && (
        <p role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});
