'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const LOGO_URL =
  'https://res.cloudinary.com/dtjghirnn/image/upload/v1774863548/LOGO_CHUAN_onyfcy.png'

const EXIT_DURATION = 800

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

export function SplashScreen({ onDone }: { onDone?: () => void }) {
  const [exiting, setExiting] = useState(false)
  const [phase, setPhase] = useState(1)

  /* ── Auto-advance phases ──
       Phase 1 (0–2s):   logo fades in, centered
       Phase 2 (2–3.5s): logo moves up + greeting
       3.5s: fades out → onDone()
  ── */
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const handleCTA = () => {
      setExiting(true)
      setTimeout(() => {
        sessionStorage.setItem('ees_splash_seen', '1')
        document.body.style.overflow = ''
        onDone?.()
      }, EXIT_DURATION)
    }

    const t1 = setTimeout(() => setPhase(2), 2000)
    const t2 = setTimeout(handleCTA, 3500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      document.body.style.overflow = ''
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
              opacity: 1,
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


      </div>
    </motion.div>
  )
}
