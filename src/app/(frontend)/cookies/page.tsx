import type { Metadata } from 'next'
import { LegalPage } from '@/components/sections/LegalPage'

export const metadata: Metadata = { title: 'Cookie Policy — Structure' }

export default function CookiesPage() {
  return <LegalPage slug="cookies" title="Cookie Policy" />
}
