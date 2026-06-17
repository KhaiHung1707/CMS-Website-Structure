import type { Metadata } from 'next'
import { LegalPage } from '@/components/sections/LegalPage'

export const metadata: Metadata = { title: 'Privacy Policy — Structure' }

export default function PrivacyPage() {
  return <LegalPage slug="privacy" title="Privacy Policy" />
}
