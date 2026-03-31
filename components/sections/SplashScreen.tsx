'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

/* ── Constants ───────────────────────────────────────────── */
const FULL_TEXT = 'Xin chào, GHNers!'
const ORANGE_SPLIT = 10          // "Xin chào, " = 10 chars → rest is orange
const TYPEWRITER_DELAY = 1400    // ms before typing starts
const TYPEWRITER_SPEED = 72      // ms per character
const EXIT_DURATION = 650        // ms for fade-out

const PARTICLES = [
  { left: '8%',  top: '18%', delay: '0s',   dur: '9s',  size: 3 },
  { left: '88%', top: '12%', delay: '-3.5s', dur: '11s', size: 2 },
  { left: '70%', top: '72%', delay: '-6s',   dur: '8s',  size: 3.5 },
  { left: '25%', top: '82%', delay: '-2s',   dur: '13s', size: 2 },
  { left: '55%', top: '38%', delay: '-5s',   dur: '10s', size: 1.5 },
  { left: '78%', top: '52%', delay: '-8s',   dur: '7s',  size: 2.5 },
  { left: '15%', top: '58%', delay: '-4s',   dur: '12s', size: 2 },
  { left: '42%', top: '92%', delay: '-1s',   dur: '14s', size: 1.5 },
  { left: '92%', top: '45%', delay: '-7s',   dur: '9s',  size: 2 },
]

const STATS = [
  { val: '100%', label: 'Ẩn danh' },
  { val: "8-10'", label: 'Hoàn thành' },
  { val: '25', label: 'Câu hỏi' },
]

/* ── Component ───────────────────────────────────────────── */
export function SplashScreen() {
  const [show, setShow] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [typedCount, setTypedCount] = useState(0)

  /* Show only once per browser session */
  useEffect(() => {
    if (!sessionStorage.getItem('ees_splash_seen')) {
      setShow(true)
      document.body.style.overflow = 'hidden'
    }
  }, [])

  /* Typewriter */
  useEffect(() => {
    if (!show) return
    let timer: ReturnType<typeof setTimeout>
    let interval: ReturnType<typeof setInterval>
    let i = 0

    timer = setTimeout(() => {
      interval = setInterval(() => {
        i++
        setTypedCount(i)
        if (i >= FULL_TEXT.length) clearInterval(interval)
      }, TYPEWRITER_SPEED)
    }, TYPEWRITER_DELAY)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [show])

  const handleCTA = () => {
    setExiting(true)
    setTimeout(() => {
      sessionStorage.setItem('ees_splash_seen', '1')
      document.body.style.overflow = ''
      setShow(false)
    }, EXIT_DURATION)
  }

  if (!show) return null

  const plainPart = FULL_TEXT.slice(0, Math.min(typedCount, ORANGE_SPLIT))
  const orangePart = typedCount > ORANGE_SPLIT ? FULL_TEXT.slice(ORANGE_SPLIT, typedCount) : ''
  const isTyping = typedCount < FULL_TEXT.length

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={exiting ? { opacity: 0, scale: 1.02 } : { opacity: 1, scale: 1 }}
      transition={{ duration: EXIT_DURATION / 1000, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0A1F44' }}
    >

      {/* ── Background: grid overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
        }}
      />

      {/* ── Background: radial gradient mesh ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 12% 18%, rgba(255,82,0,0.14) 0%, transparent 60%),
            radial-gradient(ellipse 55% 50% at 88% 78%, rgba(0,155,224,0.10) 0%, transparent 55%),
            radial-gradient(ellipse 45% 55% at 50% 50%, rgba(19,46,99,0.55) 0%, transparent 70%)
          `,
        }}
      />

      {/* ── Background: morphing blobs ── */}
      <div
        className="animate-morphBlob pointer-events-none absolute -right-28 -top-28 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(255,82,0,0.07)' }}
      />
      <div
        className="animate-morphBlob pointer-events-none absolute -bottom-28 -left-28 h-[360px] w-[360px] rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(0,155,224,0.07)', animationDelay: '-9s' }}
      />

      {/* ── Background: spinning rings ── */}
      <div className="animate-spinSlow pointer-events-none absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03]" />
      <div className="animate-spinSlowR pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />
      <div
        className="animate-spinSlow pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{ borderColor: 'rgba(255,82,0,0.08)' }}
      />

      {/* ── Background: floating particles ── */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="animate-particleUp pointer-events-none absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: 'rgba(255,82,0,0.5)',
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        />
      ))}

      {/* ════════════════════════════════════════════════════ */}
      {/* ── Main content ── */}
      {/* ════════════════════════════════════════════════════ */}
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center px-6 text-center">

        {/* 1. GHN Logo — scalePop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.45 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.65,
            type: 'spring',
            stiffness: 240,
            damping: 18,
          }}
          className="mb-8"
        >
          <div className="rounded-2xl bg-white p-3 shadow-lg">
            <img
              src="https://res.cloudinary.com/dtjghirnn/image/upload/v1774863548/LOGO_CHUAN_onyfcy.png"
              alt="GHN"
              className="h-12 w-auto sm:h-14"
              draggable={false}
            />
          </div>
        </motion.div>

        {/* 2 + 3. Wave emoji + typewriter heading */}
        <div className="mb-5 flex items-center justify-center gap-3">

          {/* 2. Wave hand — wiggle */}
          <motion.span
            initial={{ opacity: 0, rotate: -15 }}
            animate={{
              opacity: 1,
              rotate: [0, 22, -12, 18, -8, 12, 0],
            }}
            transition={{
              opacity: { delay: 0.9, duration: 0.35 },
              rotate: {
                delay: 0.92,
                duration: 0.9,
                ease: 'easeInOut',
              },
            }}
            className="text-3xl select-none sm:text-4xl"
            role="img"
            aria-label="Chào"
          >
            👋
          </motion.span>

          {/* 3. Typewriter heading */}
          <h1 className="min-h-[1.2em] font-heading text-[1.75rem] font-black leading-tight text-white sm:text-4xl">
            {plainPart}
            {orangePart && (
              <span style={{ color: '#FF5200' }}>{orangePart}</span>
            )}
            {/* Blinking cursor while typing */}
            {isTyping && typedCount > 0 && (
              <span
                className="ml-px inline-block w-[2px] align-middle"
                style={{
                  height: '0.85em',
                  backgroundColor: '#FF5200',
                  animation: 'pulse 0.8s ease-in-out infinite',
                  verticalAlign: 'middle',
                }}
              />
            )}
          </h1>
        </div>

        {/* 4. Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-3 max-w-[380px] font-body text-[15px] leading-relaxed text-white/60 sm:text-base"
        >
          Tiếng nói của bạn,{' '}
          <span className="font-semibold" style={{ color: '#FF5200' }}>
            sức mạnh
          </span>{' '}
          của GHN
        </motion.p>

        {/* 4b. Signature quote */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7 flex items-start gap-2 max-w-[360px]"
        >
          <span
            className="mt-0.5 select-none font-heading text-2xl leading-none"
            style={{ color: 'rgba(255,82,0,0.35)' }}
          >
            "
          </span>
          <p className="font-body text-sm italic leading-relaxed text-white/[0.68] sm:text-[13px]">
            Bạn có ý kiến. Bạn có giá trị.{' '}
            <span className="whitespace-nowrap">Đừng giữ nó cho riêng mình.</span>
          </p>
          <span
            className="mt-auto select-none font-heading text-2xl leading-none"
            style={{ color: 'rgba(255,82,0,0.35)' }}
          >
            "
          </span>
        </motion.div>

        {/* 5. Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 4.2,
            duration: 0.5,
            type: 'spring',
            stiffness: 300,
            damping: 22,
          }}
          className="mb-8 flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.08] px-5 py-2 backdrop-blur-sm"
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: '#FF5200',
              boxShadow: '0 0 6px #FF5200',
              animation: 'pulse-dot 2s ease-in-out infinite',
            }}
          />
          <span className="font-heading text-xs font-bold uppercase tracking-[3.5px] text-white sm:text-sm">
            EES RACE 2026
          </span>
        </motion.div>

        {/* 6. CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-9"
        >
          <button
            onClick={handleCTA}
            className="animate-glowPulse group relative overflow-hidden rounded-full px-10 py-4 font-heading text-base font-bold text-white transition-all duration-200 hover:brightness-110 active:scale-95 sm:text-lg sm:px-12"
            style={{
              background: 'linear-gradient(to right, #FF5200, #F67700)',
              boxShadow: '0 8px 32px rgba(255,82,0,0.35)',
            }}
          >
            {/* Shimmer sweep */}
            <span className="pointer-events-none absolute inset-0 overflow-hidden">
              <span className="animate-shimmer absolute inset-y-0 w-[40%] -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            </span>
            <span className="relative flex items-center gap-2">
              Bắt đầu trải nghiệm
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </span>
          </button>
        </motion.div>

        {/* 7. Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.0, duration: 0.7 }}
          className="flex items-center gap-3 sm:gap-5"
        >
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-3 sm:gap-5">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                <span className="font-heading font-black text-white/70">{s.val}</span>
                <span className="text-white/35">{s.label}</span>
              </div>
              {i < STATS.length - 1 && (
                <span className="text-white/20 select-none">|</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* 8. Progress bar — fills over 4.5s */}
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/[0.08]">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 4.5, ease: 'linear' }}
          style={{ transformOrigin: 'left' }}
          className="h-full bg-gradient-to-r from-ghn-o1 via-ghn-o2 to-ghn-o3"
        />
      </div>
    </motion.div>
  )
}
