'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ClipboardList } from 'lucide-react'
import { FloatingShapes } from '@/components/FloatingShapes'
import { ParticleField } from '@/components/ParticleField'
import { useMouseParallax } from '@/hooks/useMouseParallax'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const easing = [0.16, 1, 0.3, 1] as [number, number, number, number]

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easing },
  },
}

function scrollToSurvey() {
  document.getElementById('survey-portal')?.scrollIntoView({ behavior: 'smooth' })
}

export function Hero() {
  const { x: mouseX, y: mouseY } = useMouseParallax()

  return (
    <section className="relative mt-[72px] flex min-h-[calc(100dvh-72px)] items-center justify-center overflow-hidden bg-ghn-navy lg:mt-[90px] lg:min-h-[calc(100dvh-90px)]">
      {/* Background: radial gradient mesh */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 15% 20%, rgba(255,82,0,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 85% 75%, rgba(0,155,224,0.12) 0%, transparent 55%),
            radial-gradient(ellipse 50% 60% at 50% 50%, rgba(19,46,99,0.6) 0%, transparent 70%)
          `,
        }}
      />

      {/* Floating shapes + grid */}
      <FloatingShapes x={mouseX} y={mouseY} />

      {/* Particles */}
      <ParticleField count={14} />

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-[880px] text-center"
        >
          {/* Badge */}
          <motion.div variants={slideUp} className="mb-6 flex justify-center">
            <Badge
              variant="outline"
              className="gap-2 rounded-full border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/90 backdrop-blur-sm"
            >
              <span className="animate-pulse-dot h-2 w-2 rounded-full bg-ghn-o1 shadow-[0_0_6px_#FF5200]" />
              Chiến dịch nội bộ quan trọng nhất 2026
            </Badge>
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            variants={slideUp}
            className="mb-4 font-body text-xs font-semibold tracking-[6px] text-white/50 uppercase"
          >
            Employee Engagement Survey
          </motion.p>

          {/* Title */}
          <motion.h1
            variants={slideUp}
            className="font-heading text-[clamp(2.4rem,9vw,6.5rem)] font-black leading-[1.0] tracking-tight"
          >
            <span className="text-white">EES RACE </span>
            <span className="text-gradient-orange">2026</span>
          </motion.h1>

          {/* Slogan */}
          <motion.p
            variants={slideUp}
            className="mx-auto mt-6 max-w-[600px] font-body text-[clamp(1rem,2.5vw,1.2rem)] leading-relaxed text-white/70"
          >
            <strong className="relative text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:bg-ghn-o1/60 after:rounded-full">
              Nói lên
            </strong>{' '}
            — Để GHN{' '}
            <strong className="relative text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:bg-ghn-b2/60 after:rounded-full">
              lắng nghe
            </strong>{' '}
            — Để GHN{' '}
            <strong className="relative text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:bg-ghn-o3/60 after:rounded-full">
              thay đổi
            </strong>
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={slideUp}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              onClick={scrollToSurvey}
              size="lg"
              className="animate-ripple relative w-full rounded-full bg-gradient-to-r from-ghn-o1 to-ghn-o2 px-8 py-3 font-heading text-base font-bold text-white shadow-xl shadow-ghn-o1/30 transition-all hover:brightness-110 hover:shadow-ghn-o1/50 sm:w-auto sm:min-w-[200px]"
            >
              Bắt Đầu Khảo Sát →
            </Button>
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<a href="https://lookerstudio.google.com/" target="_blank" rel="noopener noreferrer" />}
              className="w-full rounded-full border-white/25 bg-white/8 px-8 py-3 font-heading text-base font-semibold text-white backdrop-blur-sm hover:bg-white/15 hover:border-white/40 sm:w-auto sm:min-w-[200px]"
            >
              <ClipboardList className="mr-2 h-4 w-4" />
              Xem Tiến Độ HR
            </Button>
          </motion.div>

          {/* Stats preview */}
          <motion.div
            variants={slideUp}
            className="mt-12 flex flex-wrap items-center justify-center gap-6"
          >
            {[
              { val: '20,000+', label: 'Nhân viên' },
              { val: '25', label: 'Câu hỏi' },
              { val: '100%', label: 'Ẩn danh' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-heading text-2xl font-black text-ghn-o1">{s.val}</div>
                <div className="text-xs text-white/40">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <div className="h-10 w-[1.5px] animate-bounce bg-gradient-to-b from-white/0 via-white/40 to-white/0 rounded-full" />
        <span className="text-[10px] tracking-[4px] uppercase text-white/35">Cuộn xuống</span>
      </motion.div>
    </section>
  )
}
