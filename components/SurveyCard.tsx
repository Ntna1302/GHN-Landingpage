'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Bike, Truck, PackageCheck, ShieldCheck, LaptopMinimal, UserCog } from 'lucide-react'
import { SurveyGroup } from '@/lib/survey-data'
import { ScrollReveal } from './ScrollReveal'

const iconMap = {
  Bike,
  Truck,
  PackageCheck,
  ShieldCheck,
  LaptopMinimal,
  UserCog,
}

interface SurveyCardProps {
  group: SurveyGroup
  onSelect: (group: SurveyGroup) => void
  index?: number
  isHighlighted?: boolean
  isMuted?: boolean
}

export function SurveyCard({
  group,
  onSelect,
  index = 0,
  isHighlighted = false,
  isMuted = false,
}: SurveyCardProps) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [hovered, setHovered] = useState(false)

  const isOrange = group.theme === 'orange'
  const IconComp = iconMap[group.icon as keyof typeof iconMap]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMuted) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ rotateX: y * -12, rotateY: x * 12 })
  }

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 })
    setHovered(false)
  }

  return (
    <ScrollReveal delay={index * 0.08}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => { if (!isMuted) setHovered(true) }}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: isMuted ? 0 : tilt.rotateX,
          rotateY: isMuted ? 0 : tilt.rotateY,
          y: (!isMuted && hovered) ? -8 : 0,
          scale: isMuted ? 0.97 : 1,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        style={{ perspective: 700, transformStyle: 'preserve-3d' }}
        className={`group relative h-full ${isMuted ? 'pointer-events-none cursor-default opacity-40' : 'cursor-pointer'}`}
      >
        {/* "Nhóm của bạn" floating badge */}
        {isHighlighted && (
          <div
            className="absolute -top-3 right-3 z-20 flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold shadow-md"
            style={{
              background: isOrange
                ? 'linear-gradient(to right,#FF5200,#F67700)'
                : 'linear-gradient(to right,#0055F4,#009BE0)',
              color: '#fff',
            }}
          >
            <span className="h-[5px] w-[5px] animate-pulse rounded-full bg-white/80" />
            Nhóm của bạn
          </div>
        )}

        {/* Animated top gradient bar */}
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 z-10 rounded-t-[16px] transition-all duration-300 ${
            isMuted
              ? 'h-0'
              : isHighlighted
                ? 'h-[4px]'
                : 'h-0 group-hover:h-[4px]'
          } ${
            isOrange
              ? 'bg-gradient-to-r from-ghn-o1 via-ghn-o2 to-ghn-o3'
              : 'bg-gradient-to-r from-ghn-b1 via-ghn-b2 to-ghn-b3'
          }`}
        />

        <Card
          className={`relative h-full overflow-hidden rounded-[16px] border transition-all duration-300 ${
            isMuted
              ? 'border-gray-100 shadow-sm'
              : isHighlighted
                ? isOrange
                  ? 'border-ghn-o1/40 shadow-xl shadow-ghn-o1/15 ring-1 ring-ghn-o1/30'
                  : 'border-ghn-b2/40 shadow-xl shadow-ghn-b2/15 ring-1 ring-ghn-b2/30'
                : hovered
                  ? isOrange
                    ? 'border-ghn-o1/30 shadow-2xl shadow-ghn-o1/15'
                    : 'border-ghn-b2/30 shadow-2xl shadow-ghn-b2/15'
                  : 'border-gray-100 shadow-md'
          } bg-white`}
        >
          {/* Inner glow on hover */}
          {hovered && !isMuted && (
            <div
              className={`pointer-events-none absolute inset-0 rounded-[16px] ${
                isOrange
                  ? 'bg-gradient-to-br from-ghn-o1/[0.04] to-transparent'
                  : 'bg-gradient-to-br from-ghn-b2/[0.04] to-transparent'
              }`}
            />
          )}

          <CardHeader className="pb-3 pt-6">
            <div className="flex items-start justify-between gap-3">
              {/* Icon */}
              <div
                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[14px] transition-transform duration-300 ${
                  isMuted
                    ? 'bg-gray-100'
                    : isOrange
                      ? 'bg-gradient-to-br from-ghn-o1/15 to-ghn-o2/10 group-hover:-rotate-[4deg] group-hover:scale-110 group-hover:-translate-y-1'
                      : 'bg-gradient-to-br from-ghn-b1/15 to-ghn-b2/10 group-hover:-rotate-[4deg] group-hover:scale-110 group-hover:-translate-y-1'
                }`}
              >
                {IconComp && (
                  <IconComp
                    className={`h-6 w-6 ${
                      isMuted
                        ? 'text-gray-400'
                        : isOrange
                          ? 'text-ghn-o1'
                          : 'text-ghn-b2'
                    }`}
                  />
                )}
              </div>

              {/* Badge */}
              <Badge
                variant="outline"
                className={`rounded-full border px-3 py-0.5 text-xs font-bold tracking-wide ${
                  isMuted
                    ? 'border-gray-200 bg-gray-50 text-gray-400'
                    : isOrange
                      ? 'border-ghn-o1/30 bg-ghn-o1/8 text-ghn-o1'
                      : 'border-ghn-b2/30 bg-ghn-b2/8 text-ghn-b2'
                }`}
              >
                {group.badge}
              </Badge>
            </div>

            <h3
              className={`mt-4 font-heading text-[17px] font-bold leading-snug ${
                isMuted ? 'text-gray-400' : 'text-ghn-navy'
              }`}
            >
              {group.title}
            </h3>
          </CardHeader>

          <CardContent className="pt-0">
            <p className={`text-sm leading-relaxed ${isMuted ? 'text-gray-300' : 'text-gray-500'}`}>
              {group.description}
            </p>
          </CardContent>

          <CardFooter className="pb-5 pt-2">
            <Button
              onClick={() => onSelect(group)}
              variant="outline"
              className={`group/btn relative w-full overflow-hidden rounded-[12px] border font-semibold transition-all duration-300 ${
                isMuted
                  ? 'border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-500'
                  : isOrange
                    ? 'border-ghn-o1/30 text-ghn-o1 hover:border-transparent hover:text-white hover:shadow-lg hover:shadow-ghn-o1/30'
                    : 'border-ghn-b2/30 text-ghn-b2 hover:border-transparent hover:text-white hover:shadow-lg hover:shadow-ghn-b2/30'
              }`}
            >
              {/* Hover fill gradient — only for non-muted */}
              {!isMuted && (
                <span
                  className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100 ${
                    isOrange
                      ? 'bg-gradient-to-r from-ghn-o1 to-ghn-o2'
                      : 'bg-gradient-to-r from-ghn-b1 to-ghn-b2'
                  }`}
                />
              )}
              <span className="relative flex items-center justify-center gap-2">
                Chọn nhóm này
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </span>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </ScrollReveal>
  )
}
