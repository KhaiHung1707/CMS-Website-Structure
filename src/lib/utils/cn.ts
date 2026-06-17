/** Join truthy class names. Tiny — avoids a dependency for the rare conditional class. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
