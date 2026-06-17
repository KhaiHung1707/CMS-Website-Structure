'use client'

import { useState } from 'react'

interface FormState {
  name: string
  company: string
  email: string
  budget: string
  projectType: string
  about: string
}

const EMPTY: FormState = {
  name: '',
  company: '',
  email: '',
  budget: '',
  projectType: '',
  about: '',
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

/**
 * Contact form (markup/classes ported 1:1 from templates/contact.html .form-card).
 * The design ships no success/error states, so those are built minimally from DS
 * classes only. No backend yet — submit simulates an async POST.
 * TODO(design): finalize success/error states.
 */
export function ContactForm() {
  const [fields, setFields] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<Status>('idle')

  function update<K extends keyof FormState>(key: K, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }))
  }

  async function placeholderSubmit(data: FormState): Promise<void> {
    // No backend yet — simulate a network round-trip, then succeed.
    await new Promise((resolve) => setTimeout(resolve, 700))
    if (!data.name || !data.email || !data.about) {
      throw new Error('Missing required fields')
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    try {
      await placeholderSubmit(fields)
      setStatus('success')
      setFields(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="form-card">
        <p className="t-mono">// Sent</p>
        <h3>Thanks — your inquiry is in.</h3>
        <p>We reply within one business day. If it&apos;s urgent, email hello@structure.studio.</p>
        <button type="button" className="btn btn-dark btn-submit" onClick={() => setStatus('idle')}>
          Send another →
        </button>
      </div>
    )
  }

  return (
    <div className="form-card">
      <form onSubmit={handleSubmit}>
        <div className="frow">
          <div className="fld">
            <label htmlFor="cf-name">
              Full name <span className="req">*</span>
            </label>
            <input
              id="cf-name"
              className="inp"
              type="text"
              placeholder="Jane Doe"
              required
              value={fields.name}
              onChange={(e) => update('name', e.target.value)}
            />
          </div>
          <div className="fld">
            <label htmlFor="cf-company">Company</label>
            <input
              id="cf-company"
              className="inp"
              type="text"
              placeholder="Company name"
              value={fields.company}
              onChange={(e) => update('company', e.target.value)}
            />
          </div>
        </div>

        <div className="frow">
          <div className="fld">
            <label htmlFor="cf-email">
              Email <span className="req">*</span>
            </label>
            <input
              id="cf-email"
              className="inp"
              type="email"
              placeholder="you@company.com"
              required
              value={fields.email}
              onChange={(e) => update('email', e.target.value)}
            />
          </div>
          <div className="fld">
            <label htmlFor="cf-budget">Budget</label>
            <select
              id="cf-budget"
              className="sel"
              value={fields.budget}
              onChange={(e) => update('budget', e.target.value)}
            >
              <option value="" disabled>
                Select a budget…
              </option>
              <option>Under $10k</option>
              <option>$10k – $30k</option>
              <option>$30k – $60k</option>
              <option>$60k+</option>
            </select>
          </div>
        </div>

        <div className="fld">
          <label htmlFor="cf-type">Project type</label>
          <select
            id="cf-type"
            className="sel"
            value={fields.projectType}
            onChange={(e) => update('projectType', e.target.value)}
          >
            <option value="" disabled>
              Choose a service…
            </option>
            <option>Web Design</option>
            <option>Web Application</option>
            <option>SEO &amp; Core Web Vitals</option>
            <option>SaaS Platform</option>
            <option>Replatform / optimization</option>
          </select>
        </div>

        <div className="fld">
          <label htmlFor="cf-about">
            About the project <span className="req">*</span>
          </label>
          <textarea
            id="cf-about"
            className="ta"
            placeholder="What are you building? Goals and target timeline?"
            required
            value={fields.about}
            onChange={(e) => update('about', e.target.value)}
          />
        </div>

        {status === 'error' ? (
          <p className="form-error" role="alert">
            Something went wrong. Check the required fields and try again.
          </p>
        ) : null}

        <button type="submit" className="btn btn-dark btn-submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send inquiry →'}
        </button>
        <p className="form-note">Protected by SSO · structure.studio</p>
      </form>
    </div>
  )
}
