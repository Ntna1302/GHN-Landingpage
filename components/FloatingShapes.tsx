'use client'

interface FloatingShapesProps {
  x: number
  y: number
}

export function FloatingShapes({ x, y }: FloatingShapesProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Blob 1 — large orange/coral */}
      <div
        className="animate-morphBlob animate-float absolute -top-20 -left-20 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-ghn-o1/20 to-ghn-o2/10 blur-3xl"
        style={{
          transform: `translate(${x * 18}px, ${y * 18}px)`,
          transition: 'transform 0.6s ease-out',
        }}
      />
      {/* Blob 2 — blue deep */}
      <div
        className="animate-morphBlob absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-gradient-to-bl from-ghn-b2/15 to-ghn-b3/10 blur-2xl"
        style={{
          animationDelay: '-6s',
          transform: `translate(${x * -14}px, ${y * 14}px)`,
          transition: 'transform 0.7s ease-out',
        }}
      />
      {/* Blob 3 — golden mid */}
      <div
        className="animate-morphBlob absolute -bottom-32 left-1/3 h-[360px] w-[360px] rounded-full bg-gradient-to-tr from-ghn-o3/12 to-ghn-o1/8 blur-3xl"
        style={{
          animationDelay: '-12s',
          transform: `translate(${x * 22}px, ${y * -10}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      />
      {/* Blob 4 — navy accent */}
      <div
        className="animate-morphBlob absolute top-1/2 left-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tl from-ghn-b1/10 to-ghn-navy-mid/8 blur-2xl"
        style={{
          animationDelay: '-9s',
          transform: `translate(calc(-50% + ${x * -8}px), calc(-50% + ${y * 8}px))`,
          transition: 'transform 0.8s ease-out',
        }}
      />

      {/* Ring 1 — large spinning outline */}
      <div
        className="animate-spinSlow absolute -top-24 -right-24 h-[600px] w-[600px] rounded-full border border-white/[0.06]"
        style={{
          transform: `translate(${x * -10}px, ${y * 10}px)`,
          transition: 'transform 0.9s ease-out',
        }}
      />
      {/* Ring 2 — medium counter-spin */}
      <div
        className="animate-spinSlowR absolute -bottom-16 -left-16 h-[440px] w-[440px] rounded-full border border-ghn-o1/[0.08]"
        style={{
          transform: `translate(${x * 12}px, ${y * -12}px)`,
          transition: 'transform 0.7s ease-out',
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)',
        }}
      />
    </div>
  )
}
