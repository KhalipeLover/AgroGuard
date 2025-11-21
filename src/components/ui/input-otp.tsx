"use client";

/**
 * Input OTP Component (Stub Version)
 * 
 * This is a stub version that doesn't use input-otp to avoid WebAssembly issues.
 * If you need OTP functionality, consider using regular input fields with maxLength
 * or build a custom OTP component.
 */

import * as React from "react";
import { MinusIcon } from "lucide-react";

import { cn } from "./utils";

const InputOTP = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    maxLength?: number;
    value?: string;
    onValueChange?: (value: string) => void;
  }
>(({ className, maxLength = 6, value, onValueChange, ...props }, ref) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <input
        ref={ref}
        type="text"
        maxLength={maxLength}
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      />
    </div>
  );
});
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { index: number }
>(({ index, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        className,
      )}
      {...props}
    />
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <MinusIcon />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
