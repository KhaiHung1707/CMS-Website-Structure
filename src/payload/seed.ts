/**
 * Seed the four services defined in templates/services.html.
 * All four now carry full single-page content, ported verbatim from their
 * single templates: service-web-design.html, service-web-app.html,
 * service-seo.html, and service-saas.html.
 *
 * Run once after the dev server has pushed the schema:
 *   npm run seed
 * Idempotent: upserts by slug, so re-running updates instead of duplicating.
 */
import { writeFileSync } from 'fs'
import path from 'path'
import { getPayload, type Payload } from 'payload'
import config from './payload.config'
import type { Industry, Service, SiteSetting } from './payload-types'

type ServiceSeed = Omit<Service, 'id' | 'updatedAt' | 'createdAt' | 'sizes'>
type SettingsSeed = Omit<SiteSetting, 'id' | 'updatedAt' | 'createdAt'>
type IndustrySeed = Omit<Industry, 'id' | 'updatedAt' | 'createdAt' | 'sizes'>

export const SERVICES: ServiceSeed[] = [
  {
    number: '01',
    title: 'Web Design',
    slug: 'web-design',
    lead:
      'High-fidelity interface design and interactive prototypes — built on a design system, not static mockups. Code-ready handoff so devs never have to guess.',
    tags: [
      { label: 'Design system' },
      { label: 'Prototype Figma' },
      { label: 'UI/UX' },
      { label: 'Component library' },
    ],
    metric_value: '100%',
    metric_label: 'Reusable components',
    // --- single page ---
    headings: {
      hero: 'Interface design that’s *code-ready.*',
      story_eyebrow: '// From idea to handoff',
      story_heading: 'Four steps, *structured.*',
      story_lead:
        'Scroll to see how an interface takes shape — from skeleton to files a dev can build right away.',
      capabilities_eyebrow: '// Capabilities',
      capabilities_heading: 'Three pillars *of good design.*',
      process_eyebrow: '// Process',
      process_heading: 'How we *design.*',
      process_lead: 'Transparent at every stage, with clear weekly deliverables.',
      faq_eyebrow: '// FAQ',
      faq_heading: 'Design questions.',
    },
    manifesto:
      'Beautiful isn’t enough. Good design has to be buildable, scalable, and handed off without losing the original intent.',
    hero_metrics: [
      { value: '100%', label: 'Reusable components' },
      { value: '×2', label: 'Dev build speed' },
    ],
    scrolly: [
      {
        num: '01',
        cap: 'Structure & wireframe',
        title: 'Skeleton first, decoration later.',
        desc:
          'Sitemap, user flow, and wireframes define content and hierarchy before we touch color. The right structure makes everything else easy.',
        tags: [{ label: 'Sitemap' }, { label: 'User flow' }, { label: 'Wireframe' }],
      },
      {
        num: '02',
        cap: 'Design system',
        title: 'One language, reused everywhere.',
        desc:
          'Color, type, spacing, and components defined as tokens. A consistent interface, and a team that ships new features far faster.',
        tags: [{ label: 'Tokens' }, { label: 'Component' }, { label: 'Consistency' }],
      },
      {
        num: '03',
        cap: 'Hi-fi & prototype',
        title: 'Looks real, clicks real.',
        desc:
          'High-fidelity design and a fully interactive prototype — so you feel the product before a line of code is written.',
        tags: [{ label: 'Hi-fi UI' }, { label: 'Prototype' }, { label: 'Micro-interaction' }],
      },
      {
        num: '04',
        cap: 'Dev handoff',
        title: 'Devs never have to guess.',
        desc:
          'Specs, tokens, and components handed off cleanly. Engineers build exactly what was designed — no drift, no debate.',
        tags: [{ label: 'Specs' }, { label: 'Code-ready' }, { label: 'Tokens' }],
      },
    ],
    capabilities: [
      {
        label: 'UX & flows',
        desc:
          'User research, information architecture, and task flows. A clear, usable experience aimed at the goal.',
      },
      {
        label: 'Design system',
        desc:
          'Tokens, a component library, and documentation. The foundation for a consistent, sustainably scalable product.',
      },
      {
        label: 'Interactive prototypes',
        desc:
          'Clickable, animated prototypes — to validate ideas and convince stakeholders before building.',
      },
    ],
    process: [
      { step: 'Week 1', title: 'Discovery', desc: 'Goals, audience, constraints. We map the full scope.' },
      { step: 'Week 2', title: 'Wireframe', desc: 'Sitemap, flows, and the skeleton of the key screens.' },
      { step: 'Weeks 3–4', title: 'Hi-fi design', desc: 'A design system and a complete high-fidelity interface.' },
      { step: 'Week 5', title: 'Handoff', desc: 'Prototype, specs, and tokens handed to the devs.' },
    ],
    results: [
      { value: '100', unit: '%', label: 'Reusable components' },
      { value: '×2', label: 'Dev build speed' },
      { value: 'AA', label: 'Accessibility standard met' },
      { value: '0', label: 'Times devs had to “guess”' },
    ],
    faqs: [
      {
        q: 'What tools do you use?',
        a: 'Figma for design and prototyping. We hand off design tokens so devs build precisely.',
      },
      {
        q: 'Do you build a dedicated design system?',
        a: 'Yes. Every project is built on a design system for consistency and easy future scaling.',
      },
      {
        q: 'Do you also build after designing?',
        a: 'We can. We do both design and engineering, so you can continue to build with the same team.',
      },
      {
        q: 'Are revisions included?',
        a: 'Each stage includes review and revision rounds. We work with you, not apart from you.',
      },
    ],
  },
  {
    number: '02',
    title: 'Web Application',
    slug: 'web-app',
    lead:
      'Stateful web apps, typed end-to-end. Next.js, TypeScript, production-ready infrastructure — weekly staging and zero-downtime deploys.',
    tags: [
      { label: 'Next.js' },
      { label: 'TypeScript' },
      { label: 'Supabase' },
      { label: 'Stripe' },
      { label: 'CMS' },
    ],
    metric_value: '0',
    metric_label: 'Downtime at go-live',
    // --- single page ---
    headings: {
      hero: 'Web apps *typed end-to-end.*',
      story_eyebrow: '// From architecture to production',
      story_heading: 'Four layers, *built carefully.*',
      story_lead:
        'Scroll to see a web app take shape — from system diagram to a zero-downtime deploy.',
      capabilities_eyebrow: '// Capabilities',
      capabilities_heading: 'Three pillars *of solid engineering.*',
      process_eyebrow: '// Process',
      process_heading: 'How we *build.*',
      process_lead: 'Transparent at every stage, with weekly staging for you to follow.',
      faq_eyebrow: '// FAQ',
      faq_heading: 'Engineering questions.',
    },
    manifesto:
      'Code isn’t only for today. We write it typed, structured, and maintainable — so the product scales without breaking.',
    hero_metrics: [
      { value: '99.9%', label: 'Uptime' },
      { value: '0', label: 'Downtime at go-live' },
    ],
    scrolly: [
      {
        num: '01',
        cap: 'Architecture',
        title: 'The foundation decides everything.',
        desc:
          'We design the system architecture first — data flow, APIs, storage model — so the product scales without a rewrite.',
        tags: [{ label: 'System design' }, { label: 'Data model' }, { label: 'API' }],
      },
      {
        num: '02',
        cap: 'Typed build',
        title: 'TypeScript from end to end.',
        desc:
          'Typed end-to-end means errors are caught while writing code, not when users hit them. Fewer bugs, easier refactors, more confident shipping.',
        tags: [{ label: 'Next.js' }, { label: 'TypeScript' }, { label: 'Strict' }],
      },
      {
        num: '03',
        cap: 'Integrations',
        title: 'Connect the right tools.',
        desc:
          'Auth, database, payments, CMS, email — integrating proven services instead of rebuilding them. Fast, stable, standards-compliant.',
        tags: [{ label: 'Supabase' }, { label: 'Stripe' }, { label: 'CMS' }],
      },
      {
        num: '04',
        cap: 'Deploy',
        title: 'Zero-downtime go-live.',
        desc:
          'CI/CD with automated tests and weekly staging. You see real progress every week, and reach production without service interruption.',
        tags: [{ label: 'CI/CD' }, { label: 'Staging' }, { label: '0 downtime' }],
      },
    ],
    capabilities: [
      {
        label: 'Frontend typed',
        desc:
          'Next.js, React, TypeScript. Fast, accessible interfaces, typed end-to-end and faithful to the design system.',
      },
      {
        label: 'Backend & data',
        desc:
          'APIs, databases, authentication, and authorization. Secure, testable, scalable infrastructure.',
      },
      {
        label: 'DevOps & deploy',
        desc:
          'CI/CD, monitoring, staging, and rollback. Ship steadily and safely, no praying on every deploy.',
      },
    ],
    process: [
      { step: 'Week 1', title: 'Architecture', desc: 'System design, data model, and stack selection.' },
      { step: 'Weeks 2–5', title: 'Build', desc: 'Typed development, weekly staging for review.' },
      { step: 'Week 6', title: 'Integrate', desc: 'Service integration, testing, and full QA.' },
      { step: 'Week 7', title: 'Launch', desc: 'Zero-downtime production deploy, documentation handoff.' },
    ],
    results: [
      { value: '99.9', unit: '%', label: 'Average uptime' },
      { value: '0', label: 'Downtime at go-live' },
      { value: 'E2E', label: 'Entire codebase typed' },
      { value: '1', unit: '/week', label: 'Staging for your review' },
    ],
    faqs: [
      {
        q: 'What is the tech stack?',
        a: 'Next.js, TypeScript, Tailwind. Supabase, Stripe, and CMS integrations depending on the problem.',
      },
      {
        q: 'Do you hand over the source code?',
        a: 'Yes. You own the entire codebase, with documentation so your team can take over easily.',
      },
      {
        q: 'Do you support after launch?',
        a: 'Yes. A two-week retainer sprint for maintenance, optimization, and new feature work.',
      },
      {
        q: 'How long does a project take?',
        a: 'A typical app is 6–10 weeks from architecture to launch, depending on complexity.',
      },
    ],
  },
  {
    number: '03',
    title: 'SEO & Core Web Vitals',
    slug: 'seo',
    lead:
      'Technical SEO and Core Web Vitals engineered in from the first commit — not bolted on later. Structured data, schema, and performance in the "good" range on every device.',
    tags: [
      { label: 'Technical SEO' },
      { label: 'Structured data' },
      { label: 'CWV' },
      { label: 'WCAG AA' },
    ],
    metric_value: '0.9s',
    metric_label: 'Median LCP',
    // --- single page ---
    headings: {
      hero: 'SEO that drives *revenue,* not just rankings.',
      story_eyebrow: '// What we optimize for',
      story_heading: 'The listing buyers *actually see.*',
      story_lead:
        'Not just the keyword. The result. Title, meta, structured data, the question that brought them here, and what their eye lands on around your listing. We design the SERP listing before we design the page.',
      capabilities_eyebrow: '// Capabilities',
      capabilities_heading: 'Three pillars *of sustainable SEO.*',
      process_eyebrow: '// Process',
      process_heading: 'How we *deliver.*',
      process_lead: 'Transparent at every stage, clear deliverables, no empty promises.',
      faq_eyebrow: '// FAQ',
      faq_heading: 'SEO questions.',
    },
    manifesto:
      'A high ranking on a slow page is worthless. We tie SEO to performance and experience — so every click becomes a real customer.',
    hero_metrics: [
      { value: '0.9s', label: 'Median LCP' },
      { value: '95/100', label: 'Lighthouse SEO' },
    ],
    scrolly: [
      {
        num: '01',
        cap: 'Title',
        title: 'The first line decides the click.',
        desc:
          'A title that holds the right keyword and promises a concrete result. It’s the first thing the eye stops on — and decides whether to click or scroll past.',
        tags: [{ label: 'Primary keyword' }, { label: 'Clear promise' }, { label: '< 60 chars' }],
      },
      {
        num: '02',
        cap: 'Meta & URL',
        title: 'Context that convinces the click.',
        desc:
          'A clean URL, a clear brand name, and a meta description that answers the real need. No keyword stuffing — written for humans, so Google pulls the right snippet.',
        tags: [{ label: 'Meta description' }, { label: 'Clean URL' }, { label: 'Brand' }],
      },
      {
        num: '03',
        cap: 'Structured data',
        title: 'Take up more real estate.',
        desc:
          'Schema.org creates star ratings, prices, and sitelinks — your listing stands out and reads as more trustworthy than the plain results around it.',
        tags: [{ label: 'Rating' }, { label: 'Sitelinks' }, { label: 'JSON-LD' }],
      },
      {
        num: '04',
        cap: 'The question that brings them',
        title: 'Answer the real search intent.',
        desc:
          '“People also ask” reveals the real intent behind the keyword. We design content that answers exactly those questions — and claim those spots too.',
        tags: [{ label: 'Search intent' }, { label: 'People also ask' }, { label: 'FAQ' }],
      },
      {
        num: '05',
        cap: 'The surrounding context',
        title: 'You don’t appear alone.',
        desc:
          'The eye scans the whole page. We design the listing to win the head-to-head comparison with competitors right on the results page — before they even visit.',
        tags: [{ label: 'Competitors' }, { label: 'CTR' }, { label: 'Differentiation' }],
      },
    ],
    capabilities: [
      {
        label: 'Technical SEO',
        desc:
          'Crawlability, indexing, sitemaps, canonicals, performance. The foundation for Google to read and rank pages correctly.',
      },
      {
        label: 'Content & intent',
        desc:
          'Intent-based keyword research, content structure, internal links. The right person, the right question, the right moment.',
      },
      {
        label: 'Authority & local',
        desc:
          'Domain authority building, local SEO, Google Business. Strong visibility in the regions and fields you serve.',
      },
    ],
    process: [
      { step: 'Week 1', title: 'Audit', desc: 'Technical, content, and competitor review. Find quick wins and long-term opportunities.' },
      { step: 'Weeks 2–3', title: 'Fix the foundation', desc: 'Fix technical issues, optimize CWV, build structured data.' },
      { step: 'Weeks 4–8', title: 'Content', desc: 'Optimize existing pages, build intent-driven content.' },
      { step: 'Monthly', title: 'Measure & iterate', desc: 'Reporting, rank tracking, continuous optimization.' },
    ],
    results: [
      { value: '186', unit: '%', label: 'Average organic traffic' },
      { value: '0.9', unit: 's', label: 'Median LCP' },
      { value: '95', unit: '/100', label: 'Lighthouse SEO' },
      { value: '×3', label: 'Keywords in top 3' },
    ],
    faqs: [
      {
        q: 'How soon do SEO results show?',
        a: 'Technical and CWV improvements show within a few weeks. Organic ranking growth is usually clear after 3–6 months.',
      },
      {
        q: 'Is SEO tied to web performance?',
        a: 'Tightly. Core Web Vitals is a ranking factor, so we optimize speed and SEO together — never separately.',
      },
      {
        q: 'Do you do local SEO?',
        a: 'Yes. Google Business optimization, local schema, and regional content for strong visibility in your market.',
      },
      {
        q: 'How do you report?',
        a: 'Monthly reports: keyword rankings, traffic, CWV, and conversions — with analysis and next steps.',
      },
    ],
  },
  {
    number: '04',
    title: 'SaaS Platform',
    slug: 'saas',
    lead:
      'Multi-tenant SaaS platforms: auth, RBAC, billing, real-time dashboards, and a design system that scales with the product.',
    tags: [
      { label: 'Multi-tenant' },
      { label: 'Auth & RBAC' },
      { label: 'Billing' },
      { label: 'Dashboard' },
    ],
    metric_value: '99.9%',
    metric_label: 'Uptime',
    // --- single page ---
    headings: {
      hero: 'SaaS platforms *ready to scale.*',
      story_eyebrow: '// From foundation to scale',
      story_heading: 'Four systems, *one platform.*',
      story_lead:
        'Scroll to see a SaaS take shape — from multi-tenant auth to serving thousands of accounts.',
      capabilities_eyebrow: '// Capabilities',
      capabilities_heading: 'Three pillars *of a SaaS.*',
      process_eyebrow: '// Process',
      process_heading: 'How we *build SaaS.*',
      process_lead: 'Transparent at every stage, with weekly staging for you to follow.',
      faq_eyebrow: '// FAQ',
      faq_heading: 'SaaS questions.',
    },
    manifesto:
      'SaaS isn’t a website. It’s a living product — it needs auth, billing, dashboards, and scalability from the foundation up.',
    hero_metrics: [
      { value: '99.9%', label: 'Uptime' },
      { value: '×3.2', label: 'Feature ship speed' },
    ],
    scrolly: [
      {
        num: '01',
        cap: 'Auth & tenancy',
        title: 'Multi-tenant, with the right permissions.',
        desc:
          'Login, SSO, RBAC, and a multi-tenant model from day one. Each organization gets its own space, secure and isolated.',
        tags: [{ label: 'SSO' }, { label: 'RBAC' }, { label: 'Multi-tenant' }],
      },
      {
        num: '02',
        cap: 'Dashboard',
        title: 'Clear data, in real time.',
        desc:
          'Dashboards show exactly the metrics that matter, updated live. Users understand what the product is doing for them.',
        tags: [{ label: 'Realtime' }, { label: 'Data viz' }, { label: 'Analytics' }],
      },
      {
        num: '03',
        cap: 'Billing',
        title: 'Revenue, automated.',
        desc:
          'Plans, upgrades/downgrades, invoices, and trials — full Stripe integration. Collect revenue without lifting a finger each month.',
        tags: [{ label: 'Stripe' }, { label: 'Subscription' }, { label: 'Invoice' }],
      },
      {
        num: '04',
        cap: 'Scale',
        title: 'Ready for thousands of accounts.',
        desc:
          'Infrastructure and design system that scale with the product. Add features, add customers — no platform rewrite.',
        tags: [{ label: 'Scale-ready' }, { label: 'Design system' }, { label: '99.9% uptime' }],
      },
    ],
    capabilities: [
      {
        label: 'Auth & RBAC',
        desc:
          'Authentication, SSO, role-based permissions, and multi-tenancy. A secure foundation for every organization.',
      },
      {
        label: 'Dashboard & data',
        desc: 'Dashboards, real-time charts, and reports. Data becomes value users can feel.',
      },
      {
        label: 'Billing & subscription',
        desc:
          'Plans, recurring payments, invoices, and seat management. Revenue that runs automatically and transparently.',
      },
    ],
    process: [
      { step: 'Weeks 1–2', title: 'Foundation', desc: 'Multi-tenant architecture, auth, and data model.' },
      { step: 'Weeks 3–7', title: 'Core build', desc: 'Dashboard, core features, weekly staging.' },
      { step: 'Week 8', title: 'Billing', desc: 'Plan, payment, and invoice integration.' },
      { step: 'Weeks 9+', title: 'Scale', desc: 'Performance tuning, launch, and ongoing growth.' },
    ],
    results: [
      { value: '99.9', unit: '%', label: 'Average uptime' },
      { value: '×3.2', label: 'Feature ship speed' },
      { value: '+54', unit: '%', label: 'Trial → paid' },
      { value: '∞', label: 'Multi-tenant, scale-ready' },
    ],
    faqs: [
      {
        q: 'Do you build both the landing page and the app?',
        a: 'Yes. A converting marketing site and a working app, built on the same design system.',
      },
      {
        q: 'Which payment integrations?',
        a: 'Stripe for subscriptions and international billing; we can add local gateways if needed.',
      },
      {
        q: 'What does multi-tenant mean?',
        a: 'Each customer organization gets its own data space and permissions, isolated and secure on shared infrastructure.',
      },
      {
        q: 'What happens after the MVP?',
        a: 'A retainer lets you continuously add features, optimize, and scale along the roadmap.',
      },
    ],
  },
]

/** Baseline site settings (nav, mega copy, footer, contact channels). */
export const INDUSTRIES: IndustrySeed[] = [
  {
    number: '05',
    title: 'Legal Operating Layer',
    slug: 'legal-operating-layer',
    lead:
      'A connected automation engine built on top of the software your firm already uses — it routes inquiries, generates documents, tracks deadlines, and runs on its own.',
    tags: [{ label: 'Automation' }, { label: 'Legal ops' }, { label: 'Done-for-you' }],
    stat_value: '9',
    stat_label: 'connected steps, one system',
    eyebrow: '// For 2–30 person law firms',
    hero_heading: 'The layer that runs your firm — built *around what you already use.*',
    hero_lead:
      "We build a connected automation engine on top of the software you already use — it routes inquiries, generates documents, tracks deadlines, and acts on its own. Built once. Yours to keep.",
    hero_metrics: [
      { value: '9', label: 'connected steps, one system' },
      { value: '0', label: 'new tools to learn' },
      { value: '1', label: 'fixed price you own' },
    ],
    manifesto:
      'Every hour your team spends re-typing, chasing, and remembering is an hour not billed. We automate that work — so the firm runs on a *system, not on you.*',
    story: {
      eyebrow: '// The automation engine',
      title: 'Nine automations that run your firm *while you practice.*',
      lead:
        'Not a form-builder. A connected automation engine that routes, generates, tracks, and acts on its own — on top of the software you already run. Scroll to see each one work.',
      steps: [
        { num: '01', cap: 'auto-triage', title: 'Sorts and routes every inquiry', desc: "The intake form's own answers tag, score, and route each inquiry to the right person — and fire an instant reply, 24/7." },
        { num: '02', cap: 'sequences', title: 'Follow-ups that fire on behaviour', desc: 'No-show, stalled documents, an unconverted lead — each triggers its own sequence automatically. Nothing depends on someone remembering.' },
        { num: '03', cap: 'workflow engine', title: '"When this happens, do that"', desc: 'Build multi-step, conditional rules across the whole firm. One event sets off a chain of tasks, emails, and updates on its own.' },
        { num: '04', cap: 'blueprints', title: 'A whole matter, spun up in one click', desc: 'Pick a matter type and the full task list, deadlines, documents, and assignments generate themselves — no rebuilding from scratch.' },
        { num: '05', cap: 'deadlines', title: 'Critical dates calculated for you', desc: 'The engine works out every deadline by matter type and jurisdiction, sets reminders, and escalates before anything is missed.' },
        { num: '06', cap: 'document automation', title: 'Documents that write themselves', desc: 'Letters, agreements, and government forms generate from matter data in seconds. Every field filled, nothing retyped.' },
        { num: '07', cap: 'document intake', title: 'Every upload checked and filed', desc: "Each file is matched to the matter's required list, filed automatically, and anything still missing is chased for you." },
        { num: '08', cap: 'integrations', title: 'Every tool kept in sync, two ways', desc: 'Your PMS, accounting, calendar, e-sign, and payments stay in lockstep. Data flows once and lands everywhere it belongs.' },
        { num: '09', cap: 'analytics', title: 'It spots the bottleneck before you do', desc: 'Live dashboards surface where matters stall, your realization rate, and which channels actually bring signed clients.' },
      ],
    },
    library: {
      eyebrow: '// The full library',
      heading: 'Every module — *assembled to your practice.*',
      lead:
        "Your firm doesn't need all of this. It needs the right set. Here's the full library; we build the bundle your practice area actually uses — and connect it to the software you already run.",
      legend: [
        { tag: 'core', label: 'to software you already have' },
        { tag: 'set', label: 'what your tools never turned on' },
        { tag: 'edge', label: 'the part that wins the work' },
      ],
      groups: [
        {
          num: '// 01',
          title: 'Bring clients in',
          subtitle: 'front of the funnel',
          modules: [
            { title: 'Catch every inquiry', tag: 'set', desc: 'One tracked list from web, phone, Google & referrals.' },
            { title: 'Smart intake', tag: 'set', desc: 'Right questions per matter, auto follow-up on gaps.' },
            { title: 'Conflict check', tag: 'edge', desc: 'Clears automatically before you take the matter.' },
            { title: 'Online booking', tag: 'set', desc: 'Clients book themselves; reminders cut no-shows.' },
            { title: 'Sign & pay in one link', tag: 'edge', desc: 'Engagement letter signed, retainer paid, matter opened.' },
            { title: 'Lead nurture', tag: 'set', desc: 'Sequences that warm up unconverted leads on their own.' },
          ],
        },
        {
          num: '// 02',
          title: 'Run the work',
          subtitle: 'the automation engine',
          modules: [
            { title: 'Workflow engine', tag: 'edge', desc: '"When this happens, do that" — across the whole firm.' },
            { title: 'Matter blueprints', tag: 'edge', desc: 'A whole matter — tasks, dates, docs — in one click.' },
            { title: 'Tasks & deadlines', tag: 'core', desc: 'Assigned, tracked, and reminded.' },
            { title: 'Never miss a filing date', tag: 'edge', desc: 'Deadlines computed by matter type + jurisdiction.' },
            { title: 'Document automation', tag: 'edge', desc: 'Letters & agreements write themselves from the file.' },
            { title: 'Court / gov form auto-fill', tag: 'edge', desc: 'Official forms filled from the matter, not retyped.' },
          ],
        },
        {
          num: '// 03',
          title: 'Keep clients informed',
          subtitle: 'client experience',
          modules: [
            { title: 'Client portal', tag: 'core', desc: 'Status, messages, and documents in one place.' },
            { title: 'Document upload & checklist', tag: 'set', desc: 'One link, auto-filed, missing items chased.' },
            { title: 'Status updates', tag: 'set', desc: 'Auto "we filed / next step / decision in."' },
            { title: 'Multilingual', tag: 'edge', desc: "Intake and updates in the client's language." },
            { title: 'After-hours auto-reply', tag: 'set', desc: '24/7 acknowledgement with the next step.' },
          ],
        },
        {
          num: '// 04',
          title: 'Get paid',
          subtitle: 'billing & money',
          modules: [
            { title: 'Billing & invoicing', tag: 'core', desc: 'Time entries and invoices in your software.' },
            { title: 'Trust accounting', tag: 'core', desc: 'Trust ledger and reconciliation stay put.' },
            { title: 'Retainer top-ups', tag: 'set', desc: 'Alerts and auto-invoice before the balance runs low.' },
            { title: 'Pay online + reminders', tag: 'set', desc: 'Trust-compliant payments, reminders on their own.' },
            { title: 'Collections', tag: 'set', desc: 'Overdue sequences — without the awkward call.' },
          ],
        },
        {
          num: '// 05',
          title: 'See & control',
          subtitle: 'intelligence',
          modules: [
            { title: 'Live dashboard', tag: 'edge', desc: 'The whole firm at a glance, by stage.' },
            { title: 'Bottleneck detection', tag: 'edge', desc: 'Flags matters stuck too long at a stage.' },
            { title: 'Where clients come from', tag: 'edge', desc: 'Channel ROI and cost per signed client.' },
            { title: 'Productivity reporting', tag: 'set', desc: 'Workload, time captured, throughput per person.' },
          ],
        },
        {
          num: '// 06',
          title: 'Connect & comply',
          subtitle: 'the connective tissue',
          modules: [
            { title: 'Integration & sync', tag: 'edge', desc: 'Every tool kept in lockstep, two ways.' },
            { title: 'Compliance & audit', tag: 'edge', desc: 'Audit trails, rules mapped to your jurisdiction.' },
            { title: 'Retention & security', tag: 'set', desc: 'Access control and data residency, done right.' },
          ],
        },
      ],
      packs_num: '// 07',
      packs_title: 'Built to your practice area',
      packs_lead:
        'Each practice area gets its own form library and automation pack on top of the modules above. We assemble the bundle that fits how your firm actually works.',
      packs: [
        { name: 'Immigration', sub: 'IRCC / USCIS' },
        { name: 'Personal Injury', sub: 'demands · liens' },
        { name: 'Family', sub: 'disclosures' },
        { name: 'Real Estate', sub: 'closings' },
        { name: 'Estate & Wills', sub: 'assembly' },
        { name: 'Corporate', sub: 'formation' },
      ],
      callout: {
        icon: '🗂️',
        title: 'Your practice software stays exactly as it is.',
        text: 'Anything tagged "Connects" already lives in the tools you pay for. We never rebuild it — we wire the rest around it.',
      },
    },
    process: [
      { step: 'Week 1', title: 'Audit', desc: 'We map how inquiries, intake, and billing flow today — and where clients and hours are leaking.', future: false },
      { step: 'Weeks 2–3', title: 'Build & connect', desc: 'We set up your layer and wire it onto your existing software. Your team touches none of the setup.', future: false },
      { step: 'Week 4', title: 'Train', desc: 'A gentle rollout — each person learns only the small part of the system they actually use.', future: true },
      { step: 'Ongoing', title: 'Launch & care', desc: 'It goes live and runs in the background. We stay on to keep it smooth as you grow.', future: true },
    ],
    stats: [
      { value: '9', label: 'steps connected into one journey' },
      { value: '1', label: 'view, instead of five open tabs' },
      { value: '0', label: 'new tools your team has to learn' },
      { value: '1', label: 'fixed price — you own what we build' },
    ],
    faq_heading: 'The questions firms *ask first.*',
    cta: {
      eyebrow: '// Get started',
      heading: 'Ready to stop *holding every piece?*',
      text: 'A free audit to map where clients and billable hours are leaking — and a fixed price to fix it.',
      primary_label: 'Book a free audit →',
      primary_href: 'mailto:hello@structure.studio',
      secondary_label: 'View work',
      secondary_href: '/work',
    },
    faqs: [
      { q: 'I already pay for practice software. Why do I need this?', a: "Keep it. Your software is great at holding cases, files, and billing. What it usually doesn't do well is catch every inquiry, run intake on its own, and keep clients informed automatically. That's the layer we build around it — so the tools you already pay for finally work together." },
      { q: "What if I don't have practice software yet?", a: 'We help you choose one and set it up as part of the build, then build the layer around it. You don’t have to figure it out alone.' },
      { q: 'How do you keep client information confidential?', a: 'Only everyday, non-sensitive steps are automated — reminders, scheduling, collecting intake details. Confidential legal work always stays with you, and nothing sensitive goes to outside tools that aren’t safe. We document the whole approach for your records.' },
      { q: "I'm not a tech person. Is it hard to use?", a: "It's built to be quiet. We set everything up, connect it, and train each person on the small part they use. Most of it runs in the background without anyone touching it." },
      { q: 'How long does it take?', a: 'Usually a few weeks, depending on your firm size and what needs connecting. We confirm a timeline after the free audit.' },
    ],
  },
]

export const SETTINGS: SettingsSeed = {
  brandWord: 'Structure',
  nav: [
    { label: 'Services', href: '/services' },
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Industries', href: '/industries' },
  ],
  mega: {
    eyebrow: '// Services',
    heading: 'Four capabilities, one team.',
    blurb:
      'Strategy, design, and engineering under one roof — together from the first commit to launch and beyond.',
    ctaLabel: 'View all services',
    promo: {
      eyebrow: '// Featured',
      title: 'Luma Atelier — +212% mobile revenue',
      linkLabel: 'Read case study →',
      linkHref: '/work',
    },
  },
  footerColumns: [
    {
      heading: 'Services',
      links: [
        { label: 'Web Design', href: '/services/web-design' },
        { label: 'Web Application', href: '/services/web-app' },
        { label: 'SEO', href: '/services/seo' },
        { label: 'SaaS Platform', href: '/services/saas' },
      ],
    },
    {
      heading: 'Studio',
      links: [
        { label: 'Work', href: '/work' },
        { label: 'About', href: '/about' },
        { label: 'Services overview', href: '/services' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      heading: 'Industries',
      links: [
        { label: 'E-commerce', href: '/industries' },
        { label: 'SaaS', href: '/industries' },
        { label: 'Fintech', href: '/industries' },
        { label: 'Healthcare', href: '/industries' },
      ],
    },
  ],
  footerTagline:
    'A web design and development studio. Strategy, design, and engineering for teams who care how products are built.',
  footerBottom: {
    left: '© 2026 STRUCTURE STUDIO',
    right: 'WE BUILD THE WEB WITH STRUCTURE.',
  },
  contact: {
    email: 'hello@structure.studio',
    channels: [
      { platform: 'Email', handle: 'hello@structure.studio', href: 'mailto:hello@structure.studio' },
      { platform: 'Telegram', handle: '@structurestudio', href: 'https://t.me/structurestudio' },
      { platform: 'LinkedIn', handle: '/structure', href: 'https://www.linkedin.com/company/structure' },
    ],
  },
}

export interface SeedReport {
  created: string[]
  updated: string[]
  failed: { slug: string; error: string }[]
  globalOk: boolean
  globalError: string | null
}

/**
 * Pure seed logic — upserts the four services by slug and writes the global.
 * Takes an already-initialised Payload instance, so it runs equally well from
 * the CLI (below) and from a Next route handler (src/app/(frontend)/dev-seed),
 * the latter being the reliable path when `payload run`/tsx breaks on Node 24.
 * Idempotent; never throws — collects per-record errors into the report.
 */
export async function runSeed(payload: Payload): Promise<SeedReport> {
  const created: string[] = []
  const updated: string[] = []
  const failed: { slug: string; error: string }[] = []

  for (const data of SERVICES) {
    const slug = data.slug ?? '(no slug)'
    try {
      const existing = await payload.find({
        collection: 'services',
        where: { slug: { equals: data.slug } },
        limit: 1,
        depth: 0,
      })

      if (existing.docs.length > 0) {
        await payload.update({ collection: 'services', id: existing.docs[0].id, data })
        updated.push(slug)
      } else {
        await payload.create({ collection: 'services', data })
        created.push(slug)
      }
    } catch (err) {
      failed.push({ slug, error: err instanceof Error ? err.message : String(err) })
    }
  }

  for (const data of INDUSTRIES) {
    const slug = `industry:${data.slug ?? '(no slug)'}`
    try {
      const existing = await payload.find({
        collection: 'industries',
        where: { slug: { equals: data.slug } },
        limit: 1,
        depth: 0,
      })

      if (existing.docs.length > 0) {
        await payload.update({ collection: 'industries', id: existing.docs[0].id, data })
        updated.push(slug)
      } else {
        await payload.create({ collection: 'industries', data })
        created.push(slug)
      }
    } catch (err) {
      failed.push({ slug, error: err instanceof Error ? err.message : String(err) })
    }
  }

  let globalOk = true
  let globalError: string | null = null
  try {
    await payload.updateGlobal({ slug: 'site_settings', data: SETTINGS })
  } catch (err) {
    globalOk = false
    globalError = err instanceof Error ? err.message : String(err)
  }

  return { created, updated, failed, globalOk, globalError }
}

/**
 * CLI entry. Only runs when invoked via `npm run seed` (which sets
 * PAYLOAD_SEED_CLI=1), so importing this module from the Next runtime is
 * side-effect-free. Mirrors progress to seed-result.txt because `payload run`
 * can swallow stdout. NOTE: on Node 24 `payload run` may fail inside tsx — use
 * the /dev-seed route instead (see the README note in package.json scripts).
 */
async function runCli() {
  const lines: string[] = []
  const report = (line: string) => {
    lines.push(line)
    console.log(line)
  }
  const flush = () => {
    try {
      writeFileSync(path.resolve(process.cwd(), 'seed-result.txt'), lines.join('\n') + '\n')
    } catch {
      /* best-effort */
    }
  }
  process.on('exit', (code) => {
    lines.push(`— process exit (code ${code}) —`)
    flush()
  })
  process.on('unhandledRejection', (reason) => {
    lines.push(`✗ UNHANDLED REJECTION: ${reason instanceof Error ? reason.stack || reason.message : String(reason)}`)
    flush()
  })

  report(`— seed started ${new Date().toISOString()} —`)
  flush()
  report('… connecting to database (getPayload)…')
  flush()
  const payload = await getPayload({ config })
  report('✓ connected to database')
  flush()

  const r = await runSeed(payload)
  r.created.forEach((s) => report(`＋ created service: ${s}`))
  r.updated.forEach((s) => report(`↻ updated service: ${s}`))
  r.failed.forEach((f) => report(`✗ FAILED service: ${f.slug} → ${f.error}`))
  report(r.globalOk ? '↻ updated global: site_settings' : `✗ FAILED global site_settings → ${r.globalError}`)
  report(`✓ Service seed complete. ${r.created.length + r.updated.length} ok, ${r.failed.length} failed.`)
  flush()
  process.exit(r.failed.length > 0 ? 1 : 0)
}

if (process.env.PAYLOAD_SEED_CLI === '1') {
  try {
    await runCli()
  } catch (err) {
    writeFileSync(
      path.resolve(process.cwd(), 'seed-result.txt'),
      `✗ FATAL: ${err instanceof Error ? err.stack || err.message : String(err)}\n`,
    )
    process.exit(1)
  }
}
