/** Simple SVG illustrations — no external image assets */

export function HeroIllustration({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 480 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Dashboard product illustration"
    >
      <rect width="480" height="360" rx="24" fill="#EEF2FF" />
      <rect x="28" y="28" width="424" height="304" rx="16" fill="white" />
      {/* Sidebar */}
      <rect x="44" y="44" width="88" height="272" rx="12" fill="#EEF2FF" />
      <rect x="58" y="62" width="60" height="10" rx="5" fill="#A5B4FC" />
      <rect x="58" y="90" width="48" height="8" rx="4" fill="#C7D2FE" />
      <rect x="58" y="112" width="56" height="8" rx="4" fill="#C7D2FE" />
      <rect x="58" y="134" width="40" height="8" rx="4" fill="#C7D2FE" />
      <rect x="58" y="280" width="60" height="20" rx="10" fill="#4F46E5" />
      {/* Main panel */}
      <rect x="152" y="44" width="280" height="48" rx="10" fill="#F8FAFC" />
      <rect x="168" y="60" width="100" height="16" rx="8" fill="#E0E7FF" />
      <circle cx="400" cy="68" r="12" fill="#C7D2FE" />
      {/* Stat cards */}
      <rect x="152" y="112" width="128" height="88" rx="12" fill="#EEF2FF" />
      <rect x="168" y="128" width="48" height="8" rx="4" fill="#A5B4FC" />
      <rect x="168" y="148" width="80" height="28" rx="6" fill="#4F46E5" />
      <rect x="296" y="112" width="136" height="88" rx="12" fill="#ECFDF5" />
      <rect x="312" y="128" width="48" height="8" rx="4" fill="#6EE7B7" />
      <rect x="312" y="148" width="72" height="28" rx="6" fill="#10B981" />
      {/* Chart */}
      <rect x="152" y="220" width="280" height="96" rx="12" fill="#F8FAFC" />
      <path
        d="M176 280 L212 252 L248 268 L284 236 L320 248 L356 220 L392 240"
        stroke="#4F46E5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="392" cy="240" r="5" fill="#4F46E5" />
    </svg>
  )
}

export function FeatureIcon({ name, className = '' }) {
  const icons = {
    flow: (
      <path
        d="M8 12h8M12 8v8M6 6l2 2M16 6l2 2M6 18l2-2M16 18l2-2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    ),
    sync: (
      <>
        <path
          d="M4 12a8 8 0 0 1 13.5-5.5M20 12a8 8 0 0 1-13.5 5.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M17 4v3h3M7 20v-3H4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    shield: (
      <path
        d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    ),
  }

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  )
}
