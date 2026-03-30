'use client'

import { useState, useEffect } from 'react'

interface Particle {
  left: number
  width: number
  height: number
  duration: number
  delay: number
}

interface ParticleFieldProps {
  count?: number
}

export function ParticleField({ count = 14 }: ParticleFieldProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      width: 2 + Math.random() * 3,
      height: 2 + Math.random() * 3,
      duration: 7 + Math.random() * 8,
      delay: Math.random() * 8,
    }))
    setParticles(generated)
  }, [count])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p, i) => (
        <div
          key={i}
          className="animate-particleUp absolute bottom-0 rounded-full bg-ghn-o1/35"
          style={{
            left: `${p.left}%`,
            width: `${p.width}px`,
            height: `${p.height}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
