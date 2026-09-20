import { useMemo } from 'react';

export default function SolarSystem() {
  const stars = useMemo(
    () =>
      Array.from({ length: 220 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 2.2 + 0.4,
        d: Math.random() * 5,
        o: 0.25 + Math.random() * 0.75,
        dur: 2 + Math.random() * 3.5,
      })),
    []
  );

  const shootingStars = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        id: i,
        top: 10 + Math.random() * 35,
        delay: i * 6 + Math.random() * 3,
      })),
    []
  );

  const asteroids = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        r: 35 + Math.random() * 5,        // orbit radius %
        s: 1.5 + Math.random() * 2.5,     // size px
        a: Math.random() * 360,           // start angle
        dur: 22 + Math.random() * 14,     // orbit period
        dir: i % 2 === 0 ? 1 : -1,
      })),
    []
  );

  return (
    <div className="relative h-full w-full">
      {/* Outer colorful aura */}
      <div
        className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] blur-3xl"
        style={{
          background:
            'conic-gradient(from 180deg at 50% 50%, rgba(255,107,0,0.22), rgba(56,189,248,0.22), rgba(168,85,247,0.22), rgba(255,107,0,0.22))',
          opacity: 0.65,
        }}
      />

      {/* ============== PHONE-LIKE ORB CONTAINER ============== */}
      <div
        className="relative h-full min-h-[560px] w-full overflow-hidden rounded-[2.5rem] border-[6px] border-white shadow-2xl shadow-indigo-950/40 lg:min-h-[620px]"
        style={{
          background:
            'radial-gradient(120% 100% at 50% 55%, #15213f 0%, #0b1327 35%, #050a19 70%, #020617 100%)',
        }}
      >
        {/* ============================================================== */}
        {/* LAYER 1 :: PARALLAX STARS                                     */}
        {/* ============================================================== */}
        <div className="absolute inset-0">
          {stars.map((st) => (
            <span
              key={st.id}
              className="absolute block rounded-full bg-white"
              style={{
                left: `${st.x}%`,
                top: `${st.y}%`,
                width: `${st.s}px`,
                height: `${st.s}px`,
                opacity: st.o,
                boxShadow: st.s > 1.5 ? `0 0 ${st.s * 3}px rgba(255,255,255,0.7)` : undefined,
                animation: `twinkle ${st.dur}s ease-in-out ${st.d}s infinite alternate`,
              }}
            />
          ))}
        </div>

        {/* Shooting stars (comet streaks) */}
        {shootingStars.map((ss) => (
          <div
            key={`ss-${ss.id}`}
            className="pointer-events-none absolute overflow-hidden"
            style={{
              top: `${ss.top}%`,
              left: 0,
              width: '100%',
              height: '2px',
              animation: `shootStar 14s linear ${ss.delay}s infinite`,
            }}
          >
            <div
              className="h-full w-28 rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)',
                boxShadow: '0 0 10px rgba(255,255,255,0.6)',
              }}
            />
          </div>
        ))}

        {/* Nebula washes */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(45% 45% at 18% 22%, rgba(255,107,0,0.22), transparent 65%),' +
              ' radial-gradient(45% 45% at 82% 78%, rgba(56,189,248,0.22), transparent 65%),' +
              ' radial-gradient(40% 40% at 70% 20%, rgba(168,85,247,0.18), transparent 65%)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(85% 65% at 50% 50%, transparent 55%, rgba(0,0,0,0.6) 100%)',
          }}
        />

        {/* ============================================================== */}
        {/* LAYER 2 :: THE ORB (concentric circle stack)                   */}
        {/* ============================================================== */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-[94%] w-[94%]">
            {/* Decorative glow rings (the "orb" look) */}
            {[
              { s: '96%', c: 'rgba(255,160,100,0.08)' },
              { s: '90%', c: 'rgba(255,160,100,0.10)' },
              { s: '82%', c: 'rgba(120,180,255,0.08)' },
            ].map((g, i) => (
              <div
                key={`glow-${i}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: g.s,
                  height: g.s,
                  background: `radial-gradient(circle, ${g.c}, transparent 70%)`,
                  filter: 'blur(6px)',
                }}
              />
            ))}

            {/* ------------ Orbit rings (visible dashed + solid) ----------- */}
            {[
              { r: 11, dash: true,  alpha: 0.18, dur: 60 },
              { r: 17, dash: false, alpha: 0.12, dur: 90 },
              { r: 23, dash: true,  alpha: 0.18, dur: 120 },
              { r: 30, dash: false, alpha: 0.12, dur: 150 },
              { r: 40, dash: true,  alpha: 0.18, dur: 200 },
              { r: 50, dash: false, alpha: 0.12, dur: 260 },
            ].map((o, i) => (
              <div
                key={`ring-${i}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: `${o.r * 2}%`,
                  height: `${o.r * 2}%`,
                  border: o.dash
                    ? `1.5px dashed rgba(255,255,255,${o.alpha})`
                    : `1px solid rgba(255,255,255,${o.alpha})`,
                  boxShadow: 'inset 0 0 18px rgba(255,255,255,0.03)',
                  animation: o.dash
                    ? `spin ${o.dur}s linear infinite`
                    : undefined,
                }}
              />
            ))}

            {/* Extra decorative faint rings */}
            {[62, 72, 82, 92].map((r) => (
              <div
                key={`fr-${r}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: `${r}%`,
                  height: `${r}%`,
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              />
            ))}

            {/* ASTEROID BELT divs (between Mars & Jupiter ~ orbit 35%) */}
            {asteroids.map((a) => (
              <div
                key={`ast-${a.id}`}
                className="absolute left-1/2 top-1/2"
                style={{
                  // translate by CSS custom rotation + radial position
                  width: `${a.r * 2}%`,
                  height: `${a.r * 2}%`,
                  marginLeft: `-${a.r}%`,
                  marginTop: `-${a.r}%`,
                  animation: `spin ${a.dur}s linear ${a.id * 0.1}s infinite`,
                  animationDirection: a.dir === 1 ? 'normal' : 'reverse',
                }}
              >
                <span
                  className="absolute block rounded-full bg-slate-300/80"
                  style={{
                    left: '100%',
                    top: '50%',
                    width: `${a.s}px`,
                    height: `${a.s}px`,
                    transform: 'translate(-50%, -50%)',
                    background:
                      'radial-gradient(circle at 30% 30%, #cbd5e1, #64748b 80%)',
                    boxShadow: '0 0 4px rgba(255,255,255,0.3)',
                    opacity: 0.55 + ((a.id * 13) % 40) / 100,
                  }}
                />
              </div>
            ))}

            {/* ================================================================ */}
            {/* SUN (CENTER OF THE ORB)                                         */}
            {/* ================================================================ */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {/* Outermost corona */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: '400px',
                  height: '400px',
                  background:
                    'radial-gradient(circle, rgba(255,150,60,0.38) 0%, rgba(255,107,0,0.16) 30%, rgba(255,107,0,0.04) 55%, transparent 80%)',
                  filter: 'blur(12px)',
                  animation: 'pulseCorona 5.5s ease-in-out infinite',
                }}
              />
              {/* Mid corona */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: '180px',
                  height: '180px',
                  background:
                    'radial-gradient(circle, rgba(255,225,160,0.85) 0%, rgba(255,170,60,0.55) 45%, transparent 75%)',
                  filter: 'blur(5px)',
                }}
              />
              {/* Sun body */}
              <div
                className="absolute left-1/2 top-1/2 rounded-full"
                style={{
                  width: '78px',
                  height: '78px',
                  transform: 'translate(-50%, -50%)',
                  background:
                    'radial-gradient(circle at 32% 30%, #FFF4C8 0%, #FFCB5E 32%, #FF8A1F 65%, #FF6B00 100%)',
                  boxShadow:
                    '0 0 32px rgba(255,205,110,0.9), 0 0 64px rgba(255,138,31,0.7), 0 0 110px rgba(255,107,0,0.5)',
                  animation: 'sunBreath 4.5s ease-in-out infinite',
                }}
              >
                {/* Sun surface texture (freckles divs) */}
                <span className="absolute left-[18%] top-[28%] h-2 w-2 rounded-full bg-white/60 blur-[1px]" />
                <span className="absolute left-[55%] top-[42%] h-1.5 w-1.5 rounded-full bg-white/50 blur-[1px]" />
                <span className="absolute left-[38%] top-[62%] h-1 w-1 rounded-full bg-white/40 blur-[1px]" />
              </div>
            </div>

            {/* ================================================================ */}
            {/* PLANETS :: each is one orbit-div (spins) + planet at edge      */}
            {/* ================================================================ */}

            {/* MERCURY orbit 11% */}
            <OrbitDiv radiusPct={11} duration={5}>
              <PlanetDot size={10} name="Mercury" color="#BFA98E" />
            </OrbitDiv>

            {/* VENUS orbit 17% */}
            <OrbitDiv radiusPct={17} duration={8.2}>
              <PlanetDot size={14} name="Venus" color="#F4C27F" />
            </OrbitDiv>

            {/* EARTH orbit 23% — WITH MOON */}
            <OrbitDiv radiusPct={23} duration={12}>
              <div className="relative" style={{ width: 18, height: 18 }}>
                <PlanetDot size={18} name="Earth" color="#4A90E2" glow="#60A5FA" />
                <div
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: '36px',
                    height: '36px',
                    transform: 'translate(-50%, -50%)',
                    animation: 'spin 2.2s linear infinite',
                  }}
                >
                  <span
                    className="absolute left-full top-1/2 block rounded-full"
                    style={{
                      width: '5px',
                      height: '5px',
                      transform: 'translate(-50%, -50%)',
                      background:
                        'radial-gradient(circle at 30% 30%, #f5f5f5, #9aa3af 80%)',
                      boxShadow: '0 0 4px rgba(255,255,255,0.6)',
                    }}
                  />
                </div>
              </div>
            </OrbitDiv>

            {/* MARS orbit 30% */}
            <OrbitDiv radiusPct={30} duration={16.5}>
              <PlanetDot size={13} name="Mars" color="#E27B58" />
            </OrbitDiv>

            {/* JUPITER orbit 40% — with red spot */}
            <OrbitDiv radiusPct={40} duration={26}>
              <div className="relative">
                <div
                  className="rounded-full"
                  title="Jupiter"
                  style={{
                    width: '32px',
                    height: '32px',
                    background:
                      'radial-gradient(circle at 30% 30%, #EBD4B5, #D9B38C 45%, #A07956 100%)',
                    boxShadow:
                      '0 0 14px rgba(245,158,11,0.55), inset -6px -6px 14px rgba(0,0,0,0.35)',
                    position: 'relative',
                  }}
                >
                  <span
                    className="absolute left-[22%] top-[55%] block rounded-full bg-red-500/80"
                    style={{ width: '7px', height: '4px', filter: 'blur(0.4px)' }}
                  />
                  <span className="absolute left-[10%] top-[22%] block h-[3px] w-[80%] rounded-full bg-amber-900/35" />
                  <span className="absolute left-[10%] top-[42%] block h-[2px] w-[75%] rounded-full bg-amber-800/25" />
                </div>
              </div>
            </OrbitDiv>

            {/* SATURN orbit 50% — WITH TILTED RING */}
            <OrbitDiv radiusPct={50} duration={36}>
              <div className="relative">
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: '74px',
                    height: '22px',
                    transform: 'translate(-50%, -50%) rotate(-18deg)',
                    borderRadius: '50%',
                    border: '3px solid rgba(232,213,163,0.92)',
                    borderTopColor: 'rgba(255,245,210,0.9)',
                    boxShadow:
                      '0 4px 10px rgba(0,0,0,0.45), inset 0 0 10px rgba(232,213,163,0.3)',
                  }}
                />
                <PlanetDot size={26} name="Saturn" color="#E8D5A3" ring />
              </div>
            </OrbitDiv>

            {/* ================================================================ */}
            {/* PLANET TRAIL GLOW (divs that follow planets visually)          */}
            {/* ================================================================ */}
            {[
              { r: 23, d: 12, c: 'rgba(96,165,250,0.7)' },   // Earth
              { r: 40, d: 26, c: 'rgba(245,158,11,0.7)' },   // Jupiter
              { r: 50, d: 36, c: 'rgba(232,213,163,0.7)' },  // Saturn
            ].map((t, i) => (
              <div
                key={`trail-${i}`}
                className="pointer-events-none absolute left-1/2 top-1/2"
                style={{
                  width: `${t.r * 2}%`,
                  height: `${t.r * 2}%`,
                  marginLeft: `-${t.r}%`,
                  marginTop: `-${t.r}%`,
                  animation: `spin ${t.d}s linear infinite`,
                }}
              >
                <div
                  className="absolute left-full top-1/2 -translate-y-1/2"
                  style={{
                    width: '70px',
                    height: '3px',
                    transform: 'translate(-100%, -50%)',
                    background: `linear-gradient(90deg, transparent, ${t.c})`,
                    filter: 'blur(2px)',
                    borderRadius: '999px',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* LAYER 3 :: BADGES + LABELS (kept from reference layout)      */}
        {/* ============================================================== */}

        <div className="absolute right-6 top-5 text-right" style={{ fontFamily: 'cursive' }}>
          <p className="text-2xl font-bold leading-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.65)] md:text-3xl">
            Young Minds
          </p>
          <p className="-mt-1 text-xl font-bold leading-tight text-brand-orangeLight drop-shadow-[0_2px_6px_rgba(0,0,0,0.65)] md:text-2xl">
            Bigger Tomorrows
          </p>
          <svg className="ml-auto mt-1" width="110" height="14" viewBox="0 0 110 14" fill="none">
            <path d="M4 7 Q 40 -6 106 7" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>

        <div className="absolute left-5 top-20">
          <FloatingBadge delay={0} emoji="🚀">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 leading-none">SPACE</p>
              <p className="mt-0.5 text-base font-bold text-slate-900 leading-none">STEM</p>
            </div>
          </FloatingBadge>
        </div>

        <div className="absolute right-5 top-[38%]">
          <FloatingBadge delay={0.6} emoji="🤖">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 leading-none">AI</p>
              <p className="mt-0.5 text-base font-bold text-slate-900 leading-none">Enabled</p>
            </div>
          </FloatingBadge>
        </div>

        <div className="absolute bottom-28 left-5">
          <FloatingBadge delay={1.2} emoji="🧪">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 leading-none">ROBOTICS</p>
              <p className="mt-0.5 text-base font-bold text-slate-900 leading-none">Hands-on</p>
            </div>
          </FloatingBadge>
        </div>

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-wrap items-center justify-center gap-1.5 px-4">
          {[
            { k: 'EXPLORE',  c: 'bg-sky-500',     s: '#0EA5E9' },
            { k: 'BUILD',    c: 'bg-emerald-500', s: '#10B981' },
            { k: 'LEARN',    c: 'bg-violet-500',  s: '#8B5CF6' },
            { k: 'INNOVATE', c: 'bg-fuchsia-500', s: '#D946EF' },
            { k: 'IGNITE',   c: 'bg-brand-orange',s: '#FF6B00' },
          ].map((b) => (
            <span
              key={b.k}
              className={`rounded-full px-3 py-1.5 text-[11px] font-bold tracking-wider text-white shadow-lg ${b.c}`}
              style={{ boxShadow: `0 6px 14px ${b.s}55` }}
            >
              {b.k}
            </span>
          ))}
        </div>

        {/* ============================================================== */}
        {/* PURE CSS KEYFRAMES                                            */}
        {/* ============================================================== */}
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg);  }
            to   { transform: rotate(360deg);}
          }
          @keyframes twinkle {
            0%   { opacity: 0.2; transform: scale(0.85); }
            100% { opacity: 1;   transform: scale(1.2);  }
          }
          @keyframes pulseCorona {
            0%, 100% { transform: translate(-50%, -50%) scale(1);    opacity: 0.9; }
            50%      { transform: translate(-50%, -50%) scale(1.12); opacity: 1;   }
          }
          @keyframes sunBreath {
            0%, 100% { transform: translate(-50%, -50%) scale(1);    filter: brightness(1); }
            50%      { transform: translate(-50%, -50%) scale(1.06); filter: brightness(1.12); }
          }
          @keyframes shootStar {
            0%   { transform: translateX(-30%) translateY(0)   rotate(18deg); opacity: 0; }
            5%   { opacity: 1; }
            60%  { opacity: 1; }
            100% { transform: translateX(130%) translateY(40vh) rotate(18deg); opacity: 0; }
          }
          @keyframes floatBadge {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(-6px); }
          }
        `}</style>
      </div>
    </div>
  );
}

/* ======================================================================= */
/* Helper components (all pure div / span)                                 */
/* ======================================================================= */

function OrbitDiv({
  radiusPct,
  duration,
  reverse,
  children,
}: {
  radiusPct: number;
  duration: number;
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2"
      style={{
        width: `${radiusPct * 2}%`,
        height: `${radiusPct * 2}%`,
        marginLeft: `-${radiusPct}%`,
        marginTop: `-${radiusPct}%`,
        animation: `spin ${duration}s linear infinite`,
        animationDirection: reverse ? 'reverse' : 'normal',
      }}
    >
      <div
        className="absolute left-full top-1/2 pointer-events-auto"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        {children}
      </div>
    </div>
  );
}

function PlanetDot({
  size,
  color,
  name,
  glow,
  ring,
}: {
  size: number;
  color: string;
  name: string;
  glow?: string;
  ring?: boolean;
}) {
  return (
    <div
      title={name}
      className="rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(circle at 30% 30%, ${shade(color, 30)}, ${color} 55%, ${shade(color, -30)} 100%)`,
        boxShadow: glow
          ? `0 0 ${size / 2}px ${glow}aa, inset -${size / 5}px -${size / 6}px ${size / 2}px rgba(0,0,0,0.4)`
          : ring
          ? `inset -${size / 5}px -${size / 6}px ${size / 2}px rgba(0,0,0,0.4)`
          : `inset -${size / 5}px -${size / 6}px ${size / 2}px rgba(0,0,0,0.4), 0 0 6px rgba(255,255,255,0.08)`,
      }}
    />
  );
}

function FloatingBadge({
  children,
  emoji,
  delay = 0,
}: {
  children: React.ReactNode;
  emoji: string;
  delay?: number;
}) {
  return (
    <div
      className="flex items-center gap-2.5 rounded-2xl border border-white/30 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur"
      style={{ animation: `floatBadge 4s ease-in-out ${delay}s infinite` }}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-xl">
        {emoji}
      </div>
      {children}
    </div>
  );
}

function shade(hex: string, percent: number) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + Math.round((255 * percent) / 100)));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + Math.round((255 * percent) / 100)));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + Math.round((255 * percent) / 100)));
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}
