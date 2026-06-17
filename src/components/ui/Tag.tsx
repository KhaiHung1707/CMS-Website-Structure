/** Pill chip. Renders the DS `.tag` with an optional accent dot. */
export function Tag({ children, dot }: { children: React.ReactNode; dot?: boolean }) {
  return (
    <span className="tag">
      {dot ? <span className="dot" /> : null}
      {children}
    </span>
  )
}
