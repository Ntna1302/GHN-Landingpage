'use client'

import { PieChart, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/lib/utils'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

function scrollToSurvey() {
  document.getElementById('survey-portal')?.scrollIntoView({ behavior: 'smooth' })
}

/* ── Aurora rotating-border link ────────────────────────── */
function AuroraLink() {
  return (
    <a
      href="https://lookerstudio.google.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex overflow-hidden rounded-full p-[2px] opacity-60 transition-opacity duration-300 hover:opacity-100"
    >
      {/* Spinning conic-gradient layer */}
      <div
        className="animate-spinBorder absolute rounded-full"
        style={{
          inset: '-50%',
          background:
            'conic-gradient(from 0deg, #FF5200, #F8B200, #009BE0, #0055F4, #FF5200)',
        }}
      />
      {/* White inner pill */}
      <div className="relative flex items-center gap-2 rounded-full bg-white px-4 py-[7px] text-sm font-medium text-gray-600 transition-colors group-hover:text-ghn-navy">
        {/* Live green dot */}
        <span className="h-[6px] w-[6px] animate-pulse rounded-full bg-emerald-400 shadow-[0_0_4px_#4ade80]" />
        <PieChart className="h-3.5 w-3.5" />
        Bảng Tiến Độ (HR)
      </div>
    </a>
  )
}

/* ── Orbit particle configs ──────────────────────────────── */
const orbitParticles = [
  { duration: '4s',   delay: '0s' },
  { duration: '5.5s', delay: '-1.83s' },
  { duration: '7s',   delay: '-4.67s' },
]

/* ── Magnetic CTA button ─────────────────────────────────── */
function MagneticCTA({ onClick }: { onClick: () => void }) {
  const zoneRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoneRef.current) return
    const rect = zoneRef.current.getBoundingClientRect()
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.15,
      y: (e.clientY - rect.top - rect.height / 2) * 0.15,
    })
  }

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    /* Invisible magnetic zone: -m-10 creates the 40px capture radius */
    <div
      ref={zoneRef}
      className="relative -m-8 p-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
    >
      {/* Spring-animated inner — carries both particles + button */}
      <motion.div
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="relative inline-flex"
      >
        {/* Orbit particles */}
        {orbitParticles.map((p, i) => (
          <div
            key={i}
            className="animate-orbit pointer-events-none absolute left-1/2 top-1/2 -ml-[2px] -mt-[2px] h-1 w-1 rounded-full bg-ghn-o1/60"
            style={{ animationDuration: p.duration, animationDelay: p.delay }}
          />
        ))}

        {/* Button */}
        <motion.button
          onClick={onClick}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="animate-glowPulse relative cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-ghn-o1 to-ghn-o2 px-5 py-[7px] text-sm font-bold text-white"
        >
          {/* Shimmer sweep */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="animate-shimmer absolute inset-y-0 w-[40%] -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* Label + arrow */}
          <span className="relative flex items-center gap-1.5">
            Khảo Sát Ngay
            <motion.span
              animate={{ x: hovered ? 5 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              →
            </motion.span>
          </span>
        </motion.button>
      </motion.div>
    </div>
  )
}

/* ── Navbar ──────────────────────────────────────────────── */
export function Navbar() {
  const scrolled = useScrolled(10)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [displayLabel, setDisplayLabel] = useState<string | null>(null)

  const syncLabel = () => {
    const role = sessionStorage.getItem('ees_role')
    if (!role) return
    setDisplayLabel(role === 'delivery' ? 'Khối Giao Nhận' : sessionStorage.getItem('ees_verified_email'))
  }

  useEffect(() => {
    syncLabel()
    window.addEventListener('ees_role_selected', syncLabel)
    return () => window.removeEventListener('ees_role_selected', syncLabel)
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem('ees_verified_email')
    sessionStorage.removeItem('ees_splash_seen')
    sessionStorage.removeItem('ees_role')
    sessionStorage.removeItem('ees_role_groups')
    window.location.reload()
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        'bg-white/88 backdrop-blur-xl saturate-[180%]',
        scrolled
          ? 'border-b border-gray-100/80 shadow-[0_1px_24px_0_rgba(10,31,68,0.10)]'
          : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[90px] lg:px-8">
        {/* Logo + Brand */}
        <a href="/" className="group flex items-center gap-0">
          <img
            src="https://res.cloudinary.com/dtjghirnn/image/upload/v1774863548/LOGO_CHUAN_onyfcy.png"
            alt="GHN Logo"
            className="h-12 w-auto object-contain sm:h-14 lg:h-16"
          />
          <div className="mx-3.5 hidden h-9 w-[2px] rounded-full bg-gray-200 sm:block" />
          <div className="hidden flex-col justify-center leading-tight sm:flex">
            <span className="font-heading text-sm font-extrabold uppercase tracking-wide text-ghn-navy">
              Chiến Dịch
            </span>
            <span className="font-heading text-[13px] font-bold uppercase tracking-[2.5px] text-ghn-o1">
              EES Survey 2026
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-3 md:flex">
          {displayLabel && (
            <div className="flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5">
              <span className="h-[6px] w-[6px] rounded-full bg-green-400" />
              <span className="max-w-[160px] truncate text-xs text-gray-400">{displayLabel}</span>
              <button
                onClick={handleLogout}
                className="text-xs font-medium text-ghn-o1 transition-opacity hover:opacity-70"
              >
                Đăng xuất
              </button>
            </div>
          )}
          <AuroraLink />
          <MagneticCTA onClick={scrollToSurvey} />
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" className="rounded-xl text-ghn-navy" />}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Mở menu</span>
            </SheetTrigger>

            <SheetContent side="right" className="w-[280px] p-0">
              <SheetHeader className="border-b border-gray-100 px-5 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src="https://res.cloudinary.com/dtjghirnn/image/upload/v1774863548/LOGO_CHUAN_onyfcy.png"
                    alt="GHN Logo"
                    className="h-9 w-auto max-w-[100px] object-contain"
                  />
                  <div className="h-7 w-[2px] rounded-full bg-gray-200" />
                  <div className="flex flex-col leading-tight">
                    <SheetTitle className="font-heading text-xs font-extrabold uppercase tracking-wide text-ghn-navy">
                      Chiến Dịch
                    </SheetTitle>
                    <span className="text-[11px] font-bold uppercase tracking-[2px] text-ghn-o1">
                      EES Survey 2026
                    </span>
                  </div>
                </div>
              </SheetHeader>

              <nav className="flex flex-col gap-1 p-4">
                <a
                  href="https://lookerstudio.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSheetOpen(false)}
                  className="flex items-center gap-3 rounded-[12px] px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-ghn-navy"
                >
                  <span className="h-[5px] w-[5px] rounded-full bg-emerald-400" />
                  <PieChart className="h-4 w-4 text-gray-400" />
                  Bảng Tiến Độ (HR)
                </a>

                <div className="mt-3 border-t border-gray-100 pt-3">
                  <Button
                    onClick={() => {
                      setSheetOpen(false)
                      setTimeout(scrollToSurvey, 300)
                    }}
                    className="w-full rounded-[12px] bg-gradient-to-r from-ghn-o1 to-ghn-o2 font-bold text-white shadow-md"
                  >
                    Khảo Sát Ngay →
                  </Button>
                </div>

                {displayLabel && (
                  <div className="mt-3 border-t border-gray-100 pt-3">
                    <div className="flex items-center justify-between rounded-[12px] bg-gray-50 px-4 py-2.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="h-[6px] w-[6px] flex-shrink-0 rounded-full bg-green-400" />
                        <span className="truncate text-xs text-gray-400">{displayLabel}</span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="ml-2 flex-shrink-0 text-xs font-medium text-ghn-o1 hover:opacity-70"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
