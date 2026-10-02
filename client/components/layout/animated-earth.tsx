export function AnimatedEarth({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 220"
      className={className}
      role="img"
      aria-label="Rotating digital Earth"
    >
      <defs>
        <radialGradient id="earth-ocean" cx="38%" cy="30%" r="72%">
          <stop offset="0%" stopColor="#1598ff" />
          <stop offset="48%" stopColor="#0862d8" />
          <stop offset="82%" stopColor="#063a94" />
          <stop offset="100%" stopColor="#031f59" />
        </radialGradient>
        <linearGradient id="earth-land" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#65dcff" />
          <stop offset="52%" stopColor="#2ca8ff" />
          <stop offset="100%" stopColor="#1471d6" />
        </linearGradient>
        <radialGradient id="earth-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2ea6ff" stopOpacity=".42" />
          <stop offset="72%" stopColor="#1274ff" stopOpacity=".13" />
          <stop offset="100%" stopColor="#1274ff" stopOpacity="0" />
        </radialGradient>
        <clipPath id="earth-sphere">
          <circle cx="110" cy="110" r="72" />
        </clipPath>
        <filter id="earth-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="110" cy="110" r="98" fill="url(#earth-glow)" />

      <g className="animated-earth__orbit" fill="none">
        <ellipse
          cx="110"
          cy="110"
          rx="98"
          ry="37"
          stroke="#2d8cff"
          strokeOpacity=".42"
          strokeWidth="1.2"
          transform="rotate(-16 110 110)"
        />
        <ellipse
          cx="110"
          cy="110"
          rx="98"
          ry="37"
          stroke="#76c9ff"
          strokeOpacity=".32"
          strokeWidth="1"
          transform="rotate(21 110 110)"
        />
        <circle cx="28" cy="84" r="3.2" fill="#ff8a29" filter="url(#earth-soft-glow)" />
        <circle cx="194" cy="132" r="2.8" fill="#69ddff" filter="url(#earth-soft-glow)" />
      </g>

      <circle
        cx="110"
        cy="110"
        r="74"
        fill="#0754bc"
        opacity=".52"
        filter="url(#earth-soft-glow)"
      />
      <circle cx="110" cy="110" r="72" fill="url(#earth-ocean)" />

      <g clipPath="url(#earth-sphere)">
        <g opacity=".3" fill="none" stroke="#9cd9ff" strokeWidth=".8">
          <ellipse cx="110" cy="110" rx="69" ry="22" />
          <ellipse cx="110" cy="110" rx="69" ry="43" />
          <ellipse cx="110" cy="110" rx="31" ry="70" />
          <ellipse cx="110" cy="110" rx="51" ry="70" />
        </g>

        <g className="animated-earth__land" fill="url(#earth-land)" opacity=".94">
          <g>
            <path d="M41 75c12-18 34-27 55-23l13 8 17-4 20 10 18 5 8 11-13 10-12 2-8 11-12-1-6 12-10-2-5-13-12-6-13 7-11-3-2-12-15-2-13-10Z" />
            <path d="M86 117l13 3 9 13-4 13-8 15-11-4-5-14 2-12-6-7 10-7Z" />
            <path d="M127 111l12 4 6 11-5 7-8-2-7-9 2-11Z" />
            <path d="M151 94l9-4 8 7-3 8-11 1-3-12Z" />
            <path d="M57 108l9 4 3 11-8 7-8-8 4-14Z" />
          </g>
          <g transform="translate(220 0)">
            <path d="M41 75c12-18 34-27 55-23l13 8 17-4 20 10 18 5 8 11-13 10-12 2-8 11-12-1-6 12-10-2-5-13-12-6-13 7-11-3-2-12-15-2-13-10Z" />
            <path d="M86 117l13 3 9 13-4 13-8 15-11-4-5-14 2-12-6-7 10-7Z" />
            <path d="M127 111l12 4 6 11-5 7-8-2-7-9 2-11Z" />
            <path d="M151 94l9-4 8 7-3 8-11 1-3-12Z" />
            <path d="M57 108l9 4 3 11-8 7-8-8 4-14Z" />
          </g>
        </g>

        <g className="animated-earth__land animated-earth__lights" fill="#ff9a32">
          <g>
            <circle cx="118" cy="91" r="2.1" />
            <circle cx="130" cy="102" r="1.5" />
            <circle cx="104" cy="109" r="1.8" />
            <circle cx="95" cy="87" r="1.4" />
            <circle cx="139" cy="119" r="1.3" />
            <circle cx="82" cy="124" r="1.2" />
          </g>
          <g transform="translate(220 0)">
            <circle cx="118" cy="91" r="2.1" />
            <circle cx="130" cy="102" r="1.5" />
            <circle cx="104" cy="109" r="1.8" />
            <circle cx="95" cy="87" r="1.4" />
            <circle cx="139" cy="119" r="1.3" />
            <circle cx="82" cy="124" r="1.2" />
          </g>
        </g>

        <path
          d="M53 79c20-31 76-46 112-11"
          fill="none"
          stroke="#bce9ff"
          strokeOpacity=".38"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>

      <circle
        cx="110"
        cy="110"
        r="72"
        fill="none"
        stroke="#62c7ff"
        strokeWidth="2"
        strokeOpacity=".78"
        filter="url(#earth-soft-glow)"
      />
      <path
        d="M74 55c19-17 50-24 76-12"
        fill="none"
        stroke="#d7f5ff"
        strokeOpacity=".72"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
