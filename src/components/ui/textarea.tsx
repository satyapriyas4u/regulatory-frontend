// src/components/ui/textarea.tsx

import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, onInput, ...props }, ref) => {
  const internalRef = React.useRef<HTMLTextAreaElement>(null);

  React.useImperativeHandle(ref, () => internalRef.current as HTMLTextAreaElement);

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = "auto"; // reset
    el.style.height = `${el.scrollHeight}px`; // grow
    if (onInput) onInput(e); // preserve passed handler
  };

  React.useEffect(() => {
    const el = internalRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  }, []);

  return (
    <textarea
      ref={internalRef}
      onInput={handleInput}
      data-slot="textarea"
      rows={1}
      className={cn(
        "overflow-hidden resize-none",
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "dark:bg-input/30 flex field-sizing-content min-h-5 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs",
        "transition-[color,box-shadow] outline-none focus-visible:ring-[1px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
export { Textarea };
