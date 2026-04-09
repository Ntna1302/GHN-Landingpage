'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bike,
  Truck,
  PackageCheck,
  ShieldCheck,
  LaptopMinimal,
  UserCog,
  Lock,
  ArrowLeft,
  ChevronRight,
} from 'lucide-react'

const LOGO_URL =
  'https://res.cloudinary.com/dtjghirnn/image/upload/v1774863548/LOGO_CHUAN_onyfcy.png'

const EXIT_DURATION = 650
const GROUP_PASSWORDS: Record<string, string> = {
  '3A': '3A@GHN',
  '3B': '3B@GHN',
}

type GroupId = '1A' | '1B' | '2A' | '2B' | '3A' | '3B'

interface GroupCard {
  id: GroupId
  icon: React.ElementType
  title: string
  subtitle: string
  badge: string
  accent: 'orange' | 'blue'
  requiresPassword: boolean
}

const GROUP_CARDS: GroupCard[] = [
  {
    id: '1A',
    icon: Bike,
    title: 'Shipper / Giao Nhận',
    subtitle: 'NVPTTT Tuyến, NVGN Giao Hàng Nặng (Freight)',
    badge: 'Nhóm 1A',
    accent: 'orange',
    requiresPassword: false,
  },
  {
    id: '1B',
    icon: Truck,
    title: 'Tài xế Vận tải',
    subtitle: 'Tài xế xe tải chạy tuyến GXT & TXXT',
    badge: 'Nhóm 1B',
    accent: 'orange',
    requiresPassword: false,
  },
  {
    id: '2A',
    icon: PackageCheck,
    title: 'Vận hành Kho & Bưu cục',
    subtitle: 'NV Xử lý (Vùng), NV Phân Hàng, Admin Kho',
    badge: 'Nhóm 2A',
    accent: 'orange',
    requiresPassword: false,
  },
  {
    id: '2B',
    icon: ShieldCheck,
    title: 'Quản lý Tuyến đầu',
    subtitle: 'AM/OM, Supervisor, TBC, Ops Team Leader',
    badge: 'Nhóm 2B',
    accent: 'orange',
    requiresPassword: false,
  },
  {
    id: '3A',
    icon: LaptopMinimal,
    title: 'Nhân viên Văn phòng',
    subtitle: 'Chuyên viên, nhân viên khối Indirect HO',
    badge: 'Nhóm 3A',
    accent: 'blue',
    requiresPassword: true,
  },
  {
    id: '3B',
    icon: UserCog,
    title: 'Cấp Quản trị (Mid/Senior)',
    subtitle: 'Manager & Director tại HO',
    badge: 'Nhóm 3B',
    accent: 'blue',
    requiresPassword: true,
  },
]

/* ── Slide variants (direction-aware) ──────────────────── */
const slideVariants = {
  enter: (dir: 'forward' | 'back') => ({
    x: dir === 'forward' ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: 'forward' | 'back') => ({
    x: dir === 'forward' ? -60 : 60,
    opacity: 0,
  }),
}

const slideTransition = {
  duration: 0.32,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
}

/* ── Group card item ────────────────────────────────────── */
function GroupCardItem({
  card,
  onSelect,
  index,
}: {
  card: GroupCard
  onSelect: () => void
  index: number
}) {
  const isOrange = card.accent === 'orange'
  const Icon = card.icon

  const glowShadow = isOrange
    ? '0 8px 36px rgba(255,82,0,0.28)'
    : '0 8px 36px rgba(0,85,244,0.28)'
  const iconBg = isOrange ? 'rgba(255,82,0,0.15)' : 'rgba(0,85,244,0.15)'
  const iconColor = isOrange ? '#FF5200' : '#0055F4'
  const badgeBg = isOrange ? 'rgba(255,82,0,0.12)' : 'rgba(0,85,244,0.12)'
  const badgeColor = isOrange ? '#FF5200' : '#009BE0'

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={onSelect}
      whileHover={{ scale: 1.02, y: -4, boxShadow: glowShadow }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex flex-col items-center rounded-[20px] border border-white/10 bg-white/[0.05] p-6 text-center backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.09]"
    >
      {/* Lock icon for password-required groups */}
      {card.requiresPassword && (
        <div className="absolute right-3 top-3">
          <Lock className="h-3.5 w-3.5 text-blue-400/60" />
        </div>
      )}

      {/* Icon */}
      <div
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-[16px] transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: iconBg }}
      >
        <Icon className="h-7 w-7" style={{ color: iconColor }} />
      </div>

      {/* Title */}
      <h3 className="mb-2 font-heading text-[14px] font-bold leading-snug text-white">
        {card.title}
      </h3>

      {/* Subtitle */}
      <p className="mb-5 text-[11px] leading-relaxed text-white/45">{card.subtitle}</p>

      {/* Badge */}
      <div
        className="mt-auto rounded-full px-3 py-1 text-[11px] font-bold"
        style={{ backgroundColor: badgeBg, color: badgeColor }}
      >
        {card.badge}
      </div>

      {/* Arrow hint */}
      <ChevronRight className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/0 transition-colors duration-200 group-hover:text-white/30" />
    </motion.button>
  )
}

/* ── RoleGate ──────────────────────────────────────────── */
export function RoleGate({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false)
  const [step, setStep] = useState<'cards' | 'password'>('cards')
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [selectedCard, setSelectedCard] = useState<GroupCard | null>(null)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const exitTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const successTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      clearTimeout(exitTimerRef.current)
      clearTimeout(successTimerRef.current)
    }
  }, [])

  const handleExit = (groupId: GroupId) => {
    sessionStorage.setItem('ees_role_group', groupId)
    window.dispatchEvent(new Event('ees_role_selected'))
    setExiting(true)
    exitTimerRef.current = setTimeout(() => {
      onDone()
    }, EXIT_DURATION)
  }

  const handleCardSelect = (card: GroupCard) => {
    if (!card.requiresPassword) {
      handleExit(card.id)
    } else {
      setSelectedCard(card)
      setDirection('forward')
      setStep('password')
    }
  }

  const handleBack = () => {
    setDirection('back')
    setStep('cards')
    setPassword('')
    setError('')
    setSuccess(false)
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const correctPassword = selectedCard ? GROUP_PASSWORDS[selectedCard.id] : undefined
    if (!correctPassword || password !== correctPassword) {
      setError('Mã xác minh không đúng. Vui lòng thử lại.')
      return
    }
    setError('')
    setSuccess(true)
    successTimerRef.current = setTimeout(() => handleExit(selectedCard!.id), 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={exiting ? { opacity: 0, scale: 1.02 } : { opacity: 1, scale: 1 }}
      transition={{ duration: EXIT_DURATION / 1000, ease: 'easeInOut' }}
      className="fixed inset-0 z-[90] overflow-y-auto"
      style={{ backgroundColor: '#0A1F44' }}
    >
      {/* ── Background layers ── */}
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
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 12% 18%, rgba(255,82,0,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 55% 50% at 88% 78%, rgba(0,155,224,0.08) 0%, transparent 55%)
          `,
        }}
      />
      <div
        className="animate-morphBlob pointer-events-none absolute -right-28 -top-28 h-[380px] w-[380px] rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(255,82,0,0.06)' }}
      />
      <div
        className="animate-morphBlob pointer-events-none absolute -bottom-28 -left-28 h-[320px] w-[320px] rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(0,155,224,0.06)', animationDelay: '-9s' }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 flex min-h-full flex-col items-center justify-center px-4 py-12">
        <AnimatePresence mode="wait" custom={direction}>
          {step === 'cards' ? (
            /* ─── Step 1: 6 group cards ─── */
            <motion.div
              key="cards"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="w-full max-w-5xl"
            >
              {/* Logo */}
              <div className="mb-8 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 20 }}
                  className="rounded-2xl bg-white p-3 shadow-lg"
                >
                  <img src={LOGO_URL} alt="GHN" className="h-10 w-auto" draggable={false} />
                </motion.div>
              </div>

              {/* Header */}
              <div className="mb-8 text-center">
                <h1 className="font-heading text-[clamp(1.5rem,4vw,2.25rem)] font-black text-white">
                  Chọn nhóm khảo sát của bạn
                </h1>
                <p className="mt-2 text-sm text-white/50">
                  Vui lòng chọn đúng vị trí công việc hiện tại
                </p>
              </div>

              {/* 6 cards: 2 cols on mobile, 3 cols on desktop */}
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                {GROUP_CARDS.map((card, i) => (
                  <GroupCardItem
                    key={card.id}
                    card={card}
                    onSelect={() => handleCardSelect(card)}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            /* ─── Step 2: Password verification (3A / 3B only) ─── */
            <motion.div
              key="password"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="w-full max-w-sm"
            >
              {/* Back button */}
              <button
                onClick={handleBack}
                className="mb-6 flex items-center gap-1.5 text-sm font-medium text-white/50 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Chọn lại
              </button>

              {/* Card */}
              <div className="rounded-[24px] bg-white/[0.06] p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
                {/* Logo */}
                <div className="mb-5 flex justify-center">
                  <div className="rounded-2xl bg-white p-2.5 shadow-lg">
                    <img src={LOGO_URL} alt="GHN" className="h-9 w-auto" draggable={false} />
                  </div>
                </div>

                {/* Selected group indicator */}
                {selectedCard && (
                  <div className="mb-4 flex justify-center">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/60">
                      {selectedCard.badge} — {selectedCard.title}
                    </span>
                  </div>
                )}

                <h2 className="mb-1 text-center font-heading text-xl font-black text-white">
                  Xác minh quyền truy cập
                </h2>
                <p className="mb-6 text-center text-sm text-white/50">
                  Nhập mã xác minh để tiếp tục
                </p>

                {success ? (
                  <div className="flex flex-col items-center gap-3 py-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/30"
                    >
                      <svg
                        className="h-7 w-7 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <p className="text-sm font-medium text-white/70">Xác minh thành công!</p>
                  </div>
                ) : (
                  <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-3">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        setError('')
                      }}
                      placeholder="Nhập mã xác minh"
                      autoFocus
                      className="h-12 w-full rounded-xl border border-white/15 bg-white/[0.08] px-4 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-ghn-o1/60 focus:ring-2 focus:ring-ghn-o1/20"
                    />
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-400"
                      >
                        {error}
                      </motion.p>
                    )}
                    <button
                      type="submit"
                      className="h-12 w-full rounded-xl bg-gradient-to-r from-ghn-o1 to-ghn-o2 font-heading text-sm font-bold text-white shadow-lg shadow-ghn-o1/25 transition-all hover:brightness-110 active:scale-[0.98]"
                    >
                      Xác minh →
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
