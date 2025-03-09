import { cn } from "@/lib/utils";

function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("site_container", className)}>{children}</section>
  );
}

export default Container;
