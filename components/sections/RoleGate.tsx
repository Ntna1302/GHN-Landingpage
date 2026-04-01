'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Truck, PackageCheck, UserCog, ArrowLeft, ChevronRight } from 'lucide-react'

const LOGO_URL =
  'https://res.cloudinary.com/dtjghirnn/image/upload/v1774863548/LOGO_CHUAN_onyfcy.png'

const EXIT_DURATION = 650

type RoleId = 'delivery' | 'warehouse' | 'office'

interface RoleOption {
  id: RoleId
  icon: React.ElementType
  title: string
  subtitle: string
  badge: string
  groups: string
  accent: 'orange' | 'blue'
  requiresEmail: boolean
}

const ROLES: RoleOption[] = [
  {
    id: 'delivery',
    icon: Truck,
    title: 'Khối Giao Nhận & Vận Tải',
    subtitle: 'Shipper, Giao Nhận, Tài Xế xe tải GXT/TXXT',
    badge: 'Nhóm 1A · 1B',
    groups: '1A,1B',
    accent: 'orange',
    requiresEmail: false,
  },
  {
    id: 'warehouse',
    icon: PackageCheck,
    title: 'Khối Kho Bãi & Quản Lý Tuyến Đầu',
    subtitle: 'NV Kho, Bưu cục, AM/OM, Supervisor',
    badge: 'Nhóm 2A · 2B',
    groups: '2A,2B',
    accent: 'orange',
    requiresEmail: true,
  },
  {
    id: 'office',
    icon: UserCog,
    title: 'Khối Văn Phòng & Quản Trị',
    subtitle: 'Nhân viên HO, Manager, Director, C-Level',
    badge: 'Nhóm 3A · 3B',
    groups: '3A,3B',
    accent: 'blue',
    requiresEmail: true,
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

const slideTransition = { duration: 0.32, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }

/* ── Role card ─────────────────────────────────────────── */
function RoleCard({ role, onSelect }: { role: RoleOption; onSelect: () => void }) {
  const isOrange = role.accent === 'orange'
  const Icon = role.icon

  const glowShadow = isOrange
    ? '0 8px 36px rgba(255,82,0,0.28)'
    : '0 8px 36px rgba(0,85,244,0.28)'
  const iconBg = isOrange ? 'rgba(255,82,0,0.15)' : 'rgba(0,85,244,0.15)'
  const iconColor = isOrange ? '#FF5200' : '#0055F4'
  const badgeBg = isOrange ? 'rgba(255,82,0,0.12)' : 'rgba(0,85,244,0.12)'
  const badgeColor = isOrange ? '#FF5200' : '#009BE0'

  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.03, y: -5, boxShadow: glowShadow }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="group relative flex flex-col items-center rounded-[20px] border border-white/10 bg-white/[0.05] p-6 text-center backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.09]"
    >
      {/* Icon */}
      <div
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-[16px] transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: iconBg }}
      >
        <Icon className="h-7 w-7" style={{ color: iconColor }} />
      </div>

      {/* Title */}
      <h3 className="mb-2 font-heading text-[15px] font-bold leading-snug text-white">
        {role.title}
      </h3>

      {/* Subtitle */}
      <p className="mb-5 text-xs leading-relaxed text-white/45">{role.subtitle}</p>

      {/* Badge */}
      <div
        className="mt-auto rounded-full px-3 py-1 text-[11px] font-bold"
        style={{ backgroundColor: badgeBg, color: badgeColor }}
      >
        {role.badge}
      </div>

      {/* Arrow hint */}
      <ChevronRight className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/0 transition-colors duration-200 group-hover:text-white/30" />
    </motion.button>
  )
}

/* ── RoleGate ──────────────────────────────────────────── */
export function RoleGate() {
  const [show, setShow] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [step, setStep] = useState<'role' | 'email'>('role')
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [selectedRole, setSelectedRole] = useState<RoleOption | null>(null)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const gateExited = useRef(false)

  useEffect(() => {
    if (!sessionStorage.getItem('ees_role')) {
      setShow(true)
      document.body.style.overflow = 'hidden'
    }
  }, [])

  // Back button: re-show gate when user presses back after dismissing it
  useEffect(() => {
    const handlePopState = () => {
      if (!gateExited.current) return
      gateExited.current = false
      sessionStorage.removeItem('ees_role')
      sessionStorage.removeItem('ees_role_groups')
      sessionStorage.removeItem('ees_verified_email')
      setShow(true)
      setExiting(false)
      setStep('role')
      setSelectedRole(null)
      setEmail('')
      setError('')
      setSuccess(false)
      document.body.style.overflow = 'hidden'
      // Re-push so the next back press is also caught
      history.pushState(null, '')
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleExit = () => {
    gateExited.current = true
    history.pushState(null, '') // give the back button somewhere to land
    window.dispatchEvent(new Event('ees_role_selected'))
    setExiting(true)
    setTimeout(() => {
      window.scrollTo(0, 0)
      document.body.style.overflow = ''
      setShow(false)
    }, EXIT_DURATION)
  }

  const handleRoleSelect = (role: RoleOption) => {
    if (!role.requiresEmail) {
      sessionStorage.setItem('ees_role', role.id)
      sessionStorage.setItem('ees_role_groups', role.groups)
      handleExit()
    } else {
      setSelectedRole(role)
      setDirection('forward')
      setStep('email')
    }
  }

  const handleBack = () => {
    setDirection('back')
    setStep('role')
    setEmail('')
    setError('')
    setSuccess(false)
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.toLowerCase().includes('@ghn')) {
      setError('Email không hợp lệ. Vui lòng sử dụng email GHN.')
      return
    }
    setError('')
    setSuccess(true)
    sessionStorage.setItem('ees_role', selectedRole!.id)
    sessionStorage.setItem('ees_role_groups', selectedRole!.groups)
    sessionStorage.setItem('ees_verified_email', email.toLowerCase())
    setTimeout(handleExit, 1000)
  }

  if (!show) return null

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
          {step === 'role' ? (
            /* ─── Step 1: Role selection ─── */
            <motion.div
              key="role"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="w-full max-w-4xl"
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
                  Bạn thuộc nhóm nào?
                </h1>
                <p className="mt-2 text-sm text-white/50">
                  Chọn đúng nhóm để trải nghiệm khảo sát phù hợp nhất
                </p>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {ROLES.map((role) => (
                  <RoleCard
                    key={role.id}
                    role={role}
                    onSelect={() => handleRoleSelect(role)}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            /* ─── Step 2: Email verification ─── */
            <motion.div
              key="email"
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

                {/* Selected role indicator */}
                {selectedRole && (
                  <div className="mb-4 flex justify-center">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/60">
                      {selectedRole.title}
                    </span>
                  </div>
                )}

                <h2 className="mb-1 text-center font-heading text-xl font-black text-white">
                  Xác minh nhân viên GHN
                </h2>
                <p className="mb-6 text-center text-sm text-white/50">
                  Vui lòng nhập email công ty để tiếp tục
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
                  <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setError('')
                      }}
                      placeholder="name@ghn.vn"
                      autoComplete="email"
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
