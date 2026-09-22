type ClassValue = string | false | null | undefined;

/** Une clases condicionales: cn("a", isActive && "b") → "a b" */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
