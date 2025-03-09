import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function avatarFallbackName(name: string) {
  return name
    ? name?.split(" ")?.length > 1
      ? name?.split(" ")?.[0]?.charAt(0) + name?.split(" ")?.[1]?.charAt(0)
      : name?.split(" ")?.[0]?.charAt(0) + name?.split(" ")?.[0]?.charAt(1)
    : "";
}
