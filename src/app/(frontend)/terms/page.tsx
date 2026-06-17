import type { Metadata } from 'next'
import { LegalPage } from '@/components/sections/LegalPage'

export const metadata: Metadata = { title: 'Terms of Service — Structure' }

export default function TermsPage() {
  return <LegalPage slug="terms" title="Terms of Service" />
}
