import type { Metadata } from 'next'
import './contact.css'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ContactForm } from '@/components/forms/ContactForm'
import { ContactFaq } from '@/components/sections/ContactFaq'

export const metadata: Metadata = {
  title: 'Contact — Structure',
  description: 'Fill in the form, or email us directly. We reply within one business day.',
}

const DISCOVERY: { n: string; h: string; p: string }[] = [
  {
    n: 'Before the call',
    h: 'You send a few lines about the project',
    p: 'Goals, target timeline, and any materials you already have. We read closely before we meet.',
  },
  {
    n: 'On the call',
    h: 'We get straight to the problem',
    p: 'Scope, approach, and a rough estimate. No pitch deck, no sales pitch.',
  },
  {
    n: 'After the call',
    h: 'A clear proposal & quote',
    p: 'A concrete scope, weekly deliverables, and a fixed quote staged by phase.',
  },
  {
    n: 'If it fits',
    h: 'Kick-off in 1–2 weeks',
    p: 'We start the discovery workshop and the 12-week roadmap to launch.',
  },
]

export default function ContactPage() {
  return (
    <>
      <header className="contact-hero">
        <div className="strx-container">
          <div className="ch-grid">
            <div className="ch-text">
              <Eyebrow>// Contact</Eyebrow>
              <h1>
                Let&apos;s talk about
                <br />
                <span className="accent">your project.</span>
              </h1>
              <p className="lead">
                Fill in the form, or email us directly. We reply within one business day.
              </p>
              <ul className="ch-points">
                <li>
                  <span className="ck">✓</span>Reply within 24 business hours
                </li>
                <li>
                  <span className="ck">✓</span>Free 30-minute call, no commitment
                </li>
                <li>
                  <span className="ck">✓</span>Fixed quote staged by phase
                </li>
              </ul>
            </div>

            <ContactForm />
          </div>
        </div>
      </header>

      <section className="sec cream" id="discovery">
        <div className="strx-container">
          <div className="sec-head">
            <Eyebrow>// Book a discovery call</Eyebrow>
            <h2>
              A 30-minute <span className="accent">discovery call.</span>
            </h2>
            <p>Free. No commitment. To see your problem and whether we’re a fit.</p>
          </div>
          <div className="disc-grid">
            {DISCOVERY.map((d) => (
              <div className="disc-card" key={d.n}>
                <span className="dc-n">{d.n}</span>
                <h3>{d.h}</h3>
                <p>{d.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec on-dark" id="channels">
        <div className="strx-container">
          <div className="sec-head">
            <Eyebrow dark>// Other channels</Eyebrow>
            <h2>
              Reach us <span className="accent">your way.</span>
            </h2>
            <p>We’re on several channels. Email gets the fastest reply.</p>
          </div>
          <div className="chan-grid">
            <a href="mailto:hello@structure.studio" className="chan">
              <span className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 5L2 7" />
                </svg>
              </span>
              <span className="ct">
                <span className="k">Email</span>
                <span className="v">hello@structure.studio</span>
              </span>
            </a>
            <a href="#" className="chan">
              <span className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </span>
              <span className="ct">
                <span className="k">Telegram</span>
                <span className="v">@structurestudio</span>
              </span>
            </a>
            <a href="#" className="chan">
              <span className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </span>
              <span className="ct">
                <span className="k">LinkedIn</span>
                <span className="v">/structure</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <ContactFaq />
    </>
  )
}
