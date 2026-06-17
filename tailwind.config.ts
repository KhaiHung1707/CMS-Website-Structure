import type { Config } from 'tailwindcss'

/**
 * Tailwind ONLY re-maps the CSS variables defined in assets/tokens-brick.css.
 * It NEVER defines new color/spacing/font values. Single source of truth = tokens-brick.css.
 * Most layout is driven by the design-system classes (.strx, .btn, .card, page <style> blocks),
 * so Tailwind is a thin escape hatch — keep usage minimal.
 */
const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-cream': 'var(--bg-cream)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        'ink-elevated': 'var(--ink-elevated)',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        'text-faint': 'var(--text-faint)',
        'text-on-dark': 'var(--text-on-dark)',
        'text-on-dark-muted': 'var(--text-on-dark-muted)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-ink': 'var(--accent-ink)',
        'accent-soft': 'var(--accent-soft)',
        'accent-soft-ink': 'var(--accent-soft-ink)',
        'accent-on-dark': 'var(--accent-on-dark)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        mono: 'var(--font-mono)',
        numeric: 'var(--font-numeric)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        pill: 'var(--radius-pill)',
      },
      maxWidth: {
        container: 'var(--maxw)',
      },
    },
  },
  plugins: [],
}

export default config
