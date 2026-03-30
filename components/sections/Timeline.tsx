'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ScrollReveal'

const steps = [
  {
    step: 'Bước 1',
    title: 'Khảo sát ẩn danh',
    sub: '8-10 phút trên điện thoại',
    color: 'orange' as const,
  },
  {
    step: 'Bước 2',
    title: 'Phân tích dữ liệu',
    sub: 'EX Team tổng hợp & phân tích',
    color: 'orange' as const,
  },
  {
    step: 'Bước 3',
    title: 'Báo cáo C-Level',
    sub: 'Trình bày kết quả trực tiếp',
    color: 'blue' as const,
  },
  {
    step: 'Bước 4',
    title: 'Action Plan Q3',
    sub: 'Cam kết hành động cụ thể',
    color: 'blue' as const,
  },
]

const dotColors = {
  orange: {
    bg: 'bg-gradient-to-br from-ghn-o1 to-ghn-o2',
    glow: '0 0 0 6px rgba(255,82,0,0.15)',
    ring: 'ring-ghn-o1/25',
    label: 'text-ghn-o1 bg-ghn-o1/10',
    pingBg: 'bg-ghn-o1',
  },
  blue: {
    bg: 'bg-gradient-to-br from-ghn-b1 to-ghn-b2',
    glow: '0 0 0 6px rgba(0,155,224,0.15)',
    ring: 'ring-ghn-b2/25',
    label: 'text-ghn-b2 bg-ghn-b2/10',
    pingBg: 'bg-ghn-b2',
  },
}

const pingVariants = {
  rest: { scale: 1, opacity: 0 },
  hovered: {
    scale: [1, 2.6],
    opacity: [0.45, 0],
    transition: {
      duration: 0.75,
      ease: 'easeOut' as const,
      repeat: Infinity,
      repeatDelay: 0.2,
    },
  },
}

const dotVariants = {
  rest: { scale: 1 },
  hovered: {
    scale: 1.4,
    transition: { type: 'spring' as const, stiffness: 400, damping: 20 },
  },
}

export function Timeline() {
  return (
    <section className="overflow-hidden bg-surface-blue px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-16 text-center">
            <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[5px] text-ghn-b2">
              Quy trình 4 bước
            </p>
            <h2 className="font-heading text-[clamp(2rem,5vw,3rem)] font-black text-ghn-navy">
              Từ khảo sát đến{' '}
              <span className="text-gradient-blue">hành động</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line — sits at the vertical center of the dots (h-7 = 28px → center = 14px) */}
          <div className="absolute left-[calc(12.5%-14px)] right-[calc(12.5%-14px)] top-[14px] z-0 hidden h-[3px] bg-gradient-to-r from-ghn-o1 via-ghn-o3 to-ghn-b2 lg:block" />

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => {
              const colors = dotColors[step.color]
              return (
                <ScrollReveal key={i} delay={i * 0.12}>
                  <div className="flex flex-col items-center text-center">
                    {/* Dot wrapper — whileHover propagates to children via variants */}
                    <motion.div
                      initial="rest"
                      whileHover="hovered"
                      animate="rest"
                      className="relative z-10 mb-5 flex h-7 w-7 items-center justify-center"
                    >
                      {/* Radar ping ring */}
                      <motion.span
                        variants={pingVariants}
                        className={`absolute inset-0 rounded-full ${colors.pingBg}`}
                      />

                      {/* Dot */}
                      <motion.div
                        variants={dotVariants}
                        className={`relative flex h-7 w-7 items-center justify-center rounded-full ring-4 ${colors.bg} ${colors.ring}`}
                        style={{ boxShadow: colors.glow }}
                      >
                        <div className="h-2 w-2 rounded-full bg-white/80" />
                      </motion.div>
                    </motion.div>

                    {/* Step label */}
                    <span
                      className={`mb-2 rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest ${colors.label}`}
                    >
                      {step.step}
                    </span>

                    <h3 className="font-heading text-[15px] font-bold text-ghn-navy">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-400">{step.sub}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
