import { cn } from '@/lib/utils/cn'

/** Mono `// label` eyebrow. Use `dark` on ink/dark sections. */
export function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={cn('t-mono', dark && 'dark')}>{children}</p>
}
