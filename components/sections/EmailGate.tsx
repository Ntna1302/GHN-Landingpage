'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const LOGO_URL =
  'https://res.cloudinary.com/dtjghirnn/image/upload/v1774863548/LOGO_CHUAN_onyfcy.png'

export function EmailGate() {
  const [show, setShow] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('ees_verified_email')) {
      setShow(true)
      document.body.style.overflow = 'hidden'
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.toLowerCase().includes('@ghn')) {
      setError('Email không hợp lệ. Vui lòng sử dụng email GHN.')
      return
    }
    setError('')
    setSuccess(true)
    sessionStorage.setItem('ees_verified_email', email.toLowerCase())
    setTimeout(() => {
      setExiting(true)
      setTimeout(() => {
        document.body.style.overflow = ''
        setShow(false)
      }, 650)
    }, 1000)
  }

  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={exiting ? { opacity: 0, scale: 1.02 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.65, ease: 'easeInOut' }}
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0A1F44' }}
    >
      {/* Grid overlay */}
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

      {/* Radial gradient mesh */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 12% 18%, rgba(255,82,0,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 55% 50% at 88% 78%, rgba(0,155,224,0.08) 0%, transparent 55%)
          `,
        }}
      />

      {/* Morphing blobs */}
      <div
        className="animate-morphBlob pointer-events-none absolute -right-28 -top-28 h-[380px] w-[380px] rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(255,82,0,0.06)' }}
      />
      <div
        className="animate-morphBlob pointer-events-none absolute -bottom-28 -left-28 h-[320px] w-[320px] rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(0,155,224,0.06)', animationDelay: '-9s' }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm px-4">
        <div className="rounded-[24px] bg-white/[0.06] p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">

          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <div className="rounded-2xl bg-white p-3 shadow-lg">
              <img src={LOGO_URL} alt="GHN" className="h-10 w-auto" draggable={false} />
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-1 text-center font-heading text-xl font-black text-white">
            Xác minh nhân viên GHN
          </h1>
          <p className="mb-6 text-center text-sm text-white/50">
            Vui lòng nhập email công ty để tiếp tục
          </p>

          {success ? (
            /* Success state */
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
            /* Form */
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
      </div>
    </motion.div>
  )
}
