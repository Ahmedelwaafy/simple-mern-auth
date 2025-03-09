import { cn } from "@/lib/utils";

function FieldError({
  error,
  className,
}: {
  error?: string;
  className?: string;
}) {
  if (!error) return;
  return <h6 className={cn("pt-2 text-xs text-error", className)}>{error}</h6>;
}

export default FieldError;
