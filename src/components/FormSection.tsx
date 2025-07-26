// src/components/FormSection.tsx

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils"; // optional: for conditional class merging

interface FormSectionProps {
  name: string;
  label: string;
  placeholder?: string;
  minLength?: number;
  required?: boolean;
  rows?: number;
  className?: string;
}

export function FormSection({
  name,
  label,
  placeholder,
  rows = 4,
  minLength = 3,
  required = true,
  className,
}: FormSectionProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className={cn("space-y-2", className)}>
      <Label
        htmlFor={name}
        className="block text-sm font-medium text-gray-800 dark:text-gray-200 tracking-wide"
      >
        {label}
      </Label>

      <Textarea
        id={name}
        {...register(name, { required, minLength })}
        rows={rows}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        className={cn(
          "w-full px-4 py-3 rounded-md text-sm transition-colors",
          "bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100",
          "border border-gray-300 dark:border-zinc-700",
          "focus:outline-none focus:ring-1 focus:ring-offset-1",
          "focus:ring-blue-500 dark:focus:ring-blue-400",
          error && "border-red-500 ring-red-500 focus:ring-red-500"
        )}
        aria-invalid={!!error}
      />

      {error && (
        <p className="text-sm text-red-500 mt-1 italic">
          {label} must be at least {minLength} characters.
        </p>
      )}
    </div>
  );
}
