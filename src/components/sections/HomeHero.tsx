import Link from 'next/link'

interface CarouselCard {
  meta: string
  name: string
  art: React.ReactNode
}

/** The five hero carousel cards (ported 1:1 from Structure Homepage.html). */
const CARDS: CarouselCard[] = [
  {
    meta: 'E-commerce · 2026',
    name: 'Luma Atelier',
    art: (
      <svg viewBox="0 0 300 440" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="hc1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A7282B" />
            <stop offset="100%" stopColor="#6F1A1C" />
          </linearGradient>
        </defs>
        <rect width="300" height="440" fill="url(#hc1)" />
        <g opacity="0.26" fill="#3E0A0B">
          <rect x="22" y="44" width="200" height="22" rx="4" />
          <rect x="22" y="74" width="160" height="22" rx="4" />
          <rect x="22" y="160" width="256" height="180" rx="12" />
        </g>
      </svg>
    ),
  },
  {
    meta: 'SaaS · Dashboard',
    name: 'Quartz Analytics',
    art: (
      <svg viewBox="0 0 300 440" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="hc2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1C1C22" />
            <stop offset="100%" stopColor="#3A3A44" />
          </linearGradient>
        </defs>
        <rect width="300" height="440" fill="url(#hc2)" />
        <g opacity="0.22" fill="#fff">
          <rect x="22" y="60" width="100" height="24" rx="4" />
          <rect x="22" y="100" width="76" height="76" rx="8" />
          <rect x="112" y="100" width="76" height="76" rx="8" />
          <rect x="202" y="100" width="76" height="76" rx="8" />
          <rect x="22" y="194" width="256" height="180" rx="8" />
        </g>
        <circle cx="262" cy="80" r="32" fill="#A7282B" opacity="0.9" />
      </svg>
    ),
  },
  {
    meta: 'Fintech · App',
    name: 'Nordic Pay',
    art: (
      <svg viewBox="0 0 300 440" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="hc3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#232329" />
            <stop offset="100%" stopColor="#15151A" />
          </linearGradient>
        </defs>
        <rect width="300" height="440" fill="url(#hc3)" />
        <g opacity="0.2" fill="#fff">
          <circle cx="150" cy="170" r="74" />
          <rect x="40" y="280" width="220" height="12" rx="3" />
          <rect x="80" y="304" width="140" height="12" rx="3" />
          <rect x="100" y="350" width="100" height="38" rx="19" />
        </g>
      </svg>
    ),
  },
  {
    meta: 'Marketplace',
    name: 'Petal Art',
    art: (
      <svg viewBox="0 0 300 440" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="hc4" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8B1F22" />
            <stop offset="100%" stopColor="#5A1416" />
          </linearGradient>
        </defs>
        <rect width="300" height="440" fill="url(#hc4)" />
        <g opacity="0.24" fill="#fff">
          <rect x="22" y="44" width="124" height="170" rx="10" />
          <rect x="156" y="44" width="122" height="80" rx="10" />
          <rect x="156" y="134" width="122" height="80" rx="10" />
          <rect x="22" y="232" width="256" height="80" rx="10" />
        </g>
      </svg>
    ),
  },
  {
    meta: 'Portfolio · Studio',
    name: 'Atlas Architects',
    art: (
      <svg viewBox="0 0 300 440" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="hc5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1F1F1F" />
            <stop offset="100%" stopColor="#3A3A3A" />
          </linearGradient>
        </defs>
        <rect width="300" height="440" fill="url(#hc5)" />
        <g opacity="0.32" stroke="#fff" strokeWidth="1" fill="none">
          <path d="M 0 270 Q 75 230 150 270 T 300 270" />
          <path d="M 0 305 Q 75 270 150 305 T 300 305" />
          <path d="M 0 340 Q 75 305 150 340 T 300 340" />
        </g>
        <circle cx="150" cy="140" r="50" fill="#A7282B" opacity="0.85" />
      </svg>
    ),
  },
]

function Ccard({ card, idx }: { card: CarouselCard; idx: number }) {
  return (
    <div className="ccard" key={idx}>
      {card.art}
      <div className="card-label">
        <div className="info">
          <span className="meta">{card.meta}</span>
          <span className="name">{card.name}</span>
        </div>
        <div className="pin">↗</div>
      </div>
    </div>
  )
}

/** Home hero — static markup + CSS-only seamless carousel (cards duplicated for the loop). */
export function HomeHero() {
  return (
    <header className="hero" id="top">
      <div className="strx-container inner">
        <Link href="#cases" className="pill-announce">
          <span className="tag">New</span>
          Luma case study — +212% mobile revenue
          <span className="arr">→</span>
        </Link>
        <h1>
          We build the web with <span className="accent">structure.</span>
        </h1>
        <p className="lead">
          A design and engineering studio for e-commerce, SaaS, and brands who care how products are
          built. Strategy, design, and code — in one team.
        </p>
        <div className="hero-actions">
          <Link href="/contact" className="btn btn-dark">
            Start a project →
          </Link>
          <Link href="/work" className="btn btn-ghost">
            View work
          </Link>
        </div>

        <div className="fan-stage">
          <div className="carousel-track">
            {CARDS.map((c, i) => (
              <Ccard card={c} idx={i} key={`a-${i}`} />
            ))}
            {/* duplicate set for a seamless loop (the template clones via JS) */}
            {CARDS.map((c, i) => (
              <Ccard card={c} idx={i} key={`b-${i}`} />
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
