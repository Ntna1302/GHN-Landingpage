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
}

export function SurveyCard({ group, onSelect, index = 0 }: SurveyCardProps) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [hovered, setHovered] = useState(false)

  const isOrange = group.theme === 'orange'
  const IconComp = iconMap[group.icon as keyof typeof iconMap]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          y: hovered ? -10 : 0,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        style={{ perspective: 700, transformStyle: 'preserve-3d' }}
        className="group relative h-full"
      >
        {/* Animated top gradient bar */}
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-0 rounded-t-[16px] transition-all duration-300 group-hover:h-[4px] ${
            isOrange
              ? 'bg-gradient-to-r from-ghn-o1 via-ghn-o2 to-ghn-o3'
              : 'bg-gradient-to-r from-ghn-b1 via-ghn-b2 to-ghn-b3'
          }`}
        />

        <Card
          className={`relative h-full overflow-hidden rounded-[16px] border transition-all duration-300 ${
            hovered
              ? isOrange
                ? 'border-ghn-o1/30 shadow-2xl shadow-ghn-o1/15'
                : 'border-ghn-b2/30 shadow-2xl shadow-ghn-b2/15'
              : 'border-gray-100 shadow-md'
          } bg-white`}
        >
          {/* Inner glow on hover */}
          {hovered && (
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
                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[14px] transition-transform duration-300 group-hover:-rotate-[4deg] group-hover:scale-110 group-hover:-translate-y-1 ${
                  isOrange
                    ? 'bg-gradient-to-br from-ghn-o1/15 to-ghn-o2/10'
                    : 'bg-gradient-to-br from-ghn-b1/15 to-ghn-b2/10'
                }`}
              >
                {IconComp && (
                  <IconComp
                    className={`h-6 w-6 ${isOrange ? 'text-ghn-o1' : 'text-ghn-b2'}`}
                  />
                )}
              </div>

              {/* Badge */}
              <Badge
                variant="outline"
                className={`rounded-full border px-3 py-0.5 text-xs font-bold tracking-wide ${
                  isOrange
                    ? 'border-ghn-o1/30 bg-ghn-o1/8 text-ghn-o1'
                    : 'border-ghn-b2/30 bg-ghn-b2/8 text-ghn-b2'
                }`}
              >
                {group.badge}
              </Badge>
            </div>

            <h3 className="mt-4 font-heading text-[17px] font-bold leading-snug text-ghn-navy">
              {group.title}
            </h3>
          </CardHeader>

          <CardContent className="pt-0">
            <p className="text-sm leading-relaxed text-gray-500">{group.description}</p>
          </CardContent>

          <CardFooter className="pt-2 pb-5">
            <Button
              onClick={() => onSelect(group)}
              variant="outline"
              className={`group/btn relative w-full overflow-hidden rounded-[12px] border font-semibold transition-all duration-300 ${
                isOrange
                  ? 'border-ghn-o1/30 text-ghn-o1 hover:border-transparent hover:text-white hover:shadow-lg hover:shadow-ghn-o1/30'
                  : 'border-ghn-b2/30 text-ghn-b2 hover:border-transparent hover:text-white hover:shadow-lg hover:shadow-ghn-b2/30'
              }`}
            >
              {/* Hover fill gradient */}
              <span
                className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100 ${
                  isOrange
                    ? 'bg-gradient-to-r from-ghn-o1 to-ghn-o2'
                    : 'bg-gradient-to-r from-ghn-b1 to-ghn-b2'
                }`}
              />
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
