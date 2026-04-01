'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const LOGO_URL =
  'https://res.cloudinary.com/dtjghirnn/image/upload/v1774863548/LOGO_CHUAN_onyfcy.png'

const EXIT_DURATION = 800

const STATS = [
  { val: '100%', label: 'Ẩn danh' },
  { val: "8-10'", label: 'Hoàn thành' },
  { val: '25', label: 'Câu hỏi' },
]

/* All phase blocks are always in the DOM — we only toggle CSS opacity.
   This avoids mount/unmount overhead and keeps gradient text pre-rasterized
   on the GPU. CSS transitions run fully on the compositor thread (no JS per frame). */
function phaseStyle(active: boolean): React.CSSProperties {
  return {
    opacity: active ? 1 : 0,
    transition: 'opacity 0.55s ease-in-out',
    pointerEvents: active ? 'auto' : 'none',
  }
}

export function SplashScreen() {
  const [show, setShow] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [phase, setPhase] = useState(1)

  /* ── Show once per session / bfcache restore ── */
  useEffect(() => {
    const showSplash = () => {
      setShow(true)
      setExiting(false)
      setPhase(1)
      document.body.style.overflow = 'hidden'
    }

    if (!sessionStorage.getItem('ees_splash_seen')) {
      showSplash()
    }

    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) showSplash()
    }

    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [])

  /* ── Auto-advance phases ──
       Phase 1 (0–2s):   logo fades in, centered
       Phase 2 (2–3.5s): logo moves up + greeting
       Phase 3 (3.5–5s): subtitle
       Phase 4 (5–6.5s): quote
       Phase 5 (6.5s+):  CTA
  ── */
  useEffect(() => {
    if (!show) return
    const timers = [
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 3500),
      setTimeout(() => setPhase(4), 5000),
      setTimeout(() => setPhase(5), 6500),
    ]
    return () => timers.forEach(clearTimeout)
  }, [show])

  const handleCTA = () => {
    setExiting(true)
    setTimeout(() => {
      sessionStorage.setItem('ees_splash_seen', '1')
      if (sessionStorage.getItem('ees_role')) {
        document.body.style.overflow = ''
      }
      setShow(false)
    }, EXIT_DURATION)
  }

  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={exiting ? { opacity: 0, scale: 1.02 } : { opacity: 1, scale: 1 }}
      transition={{ duration: EXIT_DURATION / 1000, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{ backgroundColor: '#0A1F44' }}
    >
      {/* Single subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.022) 0%, transparent 70%)',
        }}
      />

      {/* ── Stage ── */}
      <div className="absolute inset-0 flex items-center justify-center">

        {/* ── Logo ──
            Centering wrapper is static. Only the inner motion.div moves,
            so the GPU layer is stable and the transform is cheap.
        */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            style={{ willChange: 'transform, opacity' }}
            initial={{ opacity: 0, y: 0, scale: 1 }}
            animate={{
              opacity: phase >= 3 ? 0 : 1,
              y:       phase === 1 ? 0 : -220,
              scale:   phase === 1 ? 1 : 0.65,
            }}
            transition={{
              duration: 1.3,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
          >
            <img
              src={LOGO_URL}
              alt="GHN"
              className="h-16 w-auto sm:h-20"
              draggable={false}
            />
          </motion.div>
        </div>

        {/* ── Phase 2: Greeting ── */}
        <div
          className="absolute flex flex-col items-center text-center"
          style={phaseStyle(phase === 2)}
        >
          <span className="font-heading text-5xl font-extralight leading-tight text-white sm:text-7xl">
            Xin chào,
          </span>
          <span
            className="font-heading text-5xl font-black leading-tight sm:text-7xl"
            style={{
              background: 'linear-gradient(90deg, #FF5200, #F8B200)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            GHNers.
          </span>
        </div>

        {/* ── Phase 3: Subtitle ── */}
        <div
          className="absolute flex flex-col items-center gap-5 text-center"
          style={phaseStyle(phase === 3)}
        >
          <span className="font-heading text-3xl font-light text-white sm:text-5xl">
            Tiếng nói của bạn
          </span>
          <div
            className="h-[2px] w-14 rounded-full"
            style={{ background: 'linear-gradient(90deg, #FF5200, #F8B200)' }}
          />
          <span className="font-heading text-3xl font-bold text-white sm:text-5xl">
            sức mạnh của GHN
          </span>
        </div>

        {/* ── Phase 4: Quote ── */}
        <div
          className="absolute flex max-w-md flex-col items-center gap-2 px-8 text-center"
          style={phaseStyle(phase === 4)}
        >
          <p className="font-body text-xl italic leading-relaxed text-white/55 sm:text-2xl">
            Bạn có ý kiến. Bạn có giá trị.
          </p>
          <p className="font-body text-xl italic leading-relaxed text-white/55 sm:text-2xl">
            Đừng giữ nó cho riêng mình.
          </p>
        </div>

        {/* ── Phase 5: CTA ── */}
        <div
          className="absolute flex flex-col items-center gap-8"
          style={phaseStyle(phase === 5)}
        >
          {/* Badge */}
          <div className="flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.06] px-6 py-2.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: '#FF5200',
                boxShadow: '0 0 8px #FF5200',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }}
            />
            <span className="font-heading text-sm font-bold uppercase tracking-[4px] text-white">
              EES RACE 2026
            </span>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleCTA}
            className="relative overflow-hidden rounded-full px-14 py-4 font-heading text-lg font-bold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.97] sm:px-16 sm:text-xl"
            style={{
              background: 'linear-gradient(to right, #FF5200, #F67700)',
              boxShadow: '0 8px 32px rgba(255,82,0,0.28)',
            }}
          >
            <span className="flex items-center gap-3">
              Bắt đầu trải nghiệm
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </span>
          </button>

          {/* Stats row */}
          <div className="flex items-center gap-4 sm:gap-6">
            {STATS.map((s, i) => (
              <div key={s.label} className="flex items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2 text-sm sm:text-base">
                  <span className="font-heading text-base font-black text-white/70 sm:text-lg">
                    {s.val}
                  </span>
                  <span className="text-white/35">{s.label}</span>
                </div>
                {i < STATS.length - 1 && (
                  <span className="select-none text-white/20">|</span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  )
}
