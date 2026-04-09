// 'use client'

// import { useEffect, useState } from 'react'
// import { Navbar } from '@/components/layout/Navbar'
// import { Footer } from '@/components/layout/Footer'
// import { Hero } from '@/components/sections/Hero'
// import { MarqueeStrip } from '@/components/sections/MarqueeStrip'
// import { TrustStrip } from '@/components/sections/TrustStrip'
// import { Stats } from '@/components/sections/Stats'
// import { SurveyPortal } from '@/components/sections/SurveyPortal'
// import { Timeline } from '@/components/sections/Timeline'
// import { Support } from '@/components/sections/Support'
// import { SplashScreen } from '@/components/sections/SplashScreen'
// import { RoleGate } from '@/components/sections/RoleGate'
// import { useHistoryStep } from '@/hooks/useHistoryStep'

// // export default function Home() {
// //   const [step, setStep] = useHistoryStep()
// //   const [mounted, setMounted] = useState(false)

// //   // useEffect(() => {
// //   //   const seen = sessionStorage.getItem('ees_splash_seen')
// //   //   const role = sessionStorage.getItem('ees_role_group')
// //   //   if (seen && role) setStep('main')
// //   //   else if (seen) setStep('gate')
// //   //   setMounted(true)
// //   // }, [setStep])
// // // useEffect(() => {
// // //   const seen = sessionStorage.getItem('ees_splash_seen')
// // //   const role = sessionStorage.getItem('ees_role_group')

// // //   const current = history.state?.step

// // //   // 🚨 Only set step if history has no state (FIRST LOAD ONLY)
// // //   if (!current) {
// // //     if (seen && role) setStep('main')
// // //     else if (seen) setStep('gate')
// // //   }

// // //   setMounted(true)
// // // }, [setStep])
// // useEffect(() => {
// //   const current = history.state?.step

// //   if (!current) {
// //     const seen = sessionStorage.getItem('ees_splash_seen')
// //     const role = sessionStorage.getItem('ees_role_group')

// //     if (seen && role) setStep('main')
// //     else if (seen) setStep('gate')
// //   }

// //   setMounted(true)
// // }, [setStep])
// //   if (!mounted) {
// //     return <div className="fixed inset-0" style={{ backgroundColor: '#0A1F44' }} />
// //   }

// //   if (step === 'splash') {
// //     return <SplashScreen onDone={() => setStep('gate')} />
// //   }

// //   if (step === 'gate') {
// //     return <RoleGate onDone={() => setStep('main')} />
// //   }

// //   return (
// //     <main className="min-h-screen overflow-x-hidden">
// //       <Navbar />
// //       <Hero />
// //       <MarqueeStrip />
// //       <TrustStrip />
// //       <Stats />
// //       <SurveyPortal />
// //       <Timeline />
// //       <Support />
// //       <Footer />
// //     </main>
// //   )
// // }
// export default function Home() {
//   const initialStep = (() => {
//     if (typeof window === 'undefined') return 'splash'

//     const seen = sessionStorage.getItem('ees_splash_seen')
//     const role = sessionStorage.getItem('ees_role_group')

//     if (seen && role) return 'main'
//     if (seen) return 'gate'
//     return 'splash'
//   })()

//   const [step, setStep] = useHistoryStep(initialStep)

//   if (step === 'splash') {
//     return <SplashScreen onDone={() => setStep('gate')} />
//   }

//   if (step === 'gate') {
//     return <RoleGate onDone={() => setStep('main')} />
//   }

//   return (
//     <main className="min-h-screen overflow-x-hidden">
//       <Navbar />
//       <Hero />
//       <MarqueeStrip />
//       <TrustStrip />
//       <Stats />
//       <SurveyPortal />
//       <Timeline />
//       <Support />
//       <Footer />
//     </main>
//   )
// }
'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { MarqueeStrip } from '@/components/sections/MarqueeStrip'
import { TrustStrip } from '@/components/sections/TrustStrip'
import { Stats } from '@/components/sections/Stats'
import { SurveyPortal } from '@/components/sections/SurveyPortal'
import { Timeline } from '@/components/sections/Timeline'
import { Support } from '@/components/sections/Support'
import { SplashScreen } from '@/components/sections/SplashScreen'
import { RoleGate } from '@/components/sections/RoleGate'
import { useRef, useEffect } from 'react'
import { useHistoryStep } from '@/hooks/useHistoryStep'

export default function Home() {
  const [step, setStep, ready] = useHistoryStep()

  // Increment each time step becomes 'splash' to force a full remount,
  // so all animations and timers restart from scratch on back-navigation.
  const splashKey = useRef(0)
  useEffect(() => {
    if (step === 'splash') splashKey.current += 1
  }, [step])

  // Show a seamless placeholder until the hook determines the real step.
  // Both server and client render this on first pass — no hydration mismatch.
  if (!ready) {
    return <div className="fixed inset-0" style={{ backgroundColor: '#0A1F44' }} />
  }

  if (step === 'splash') {
    return <SplashScreen key={splashKey.current} onDone={() => setStep('gate')} />
  }

  if (step === 'gate') {
    return <RoleGate onDone={() => setStep('main')} />
  }

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <MarqueeStrip />
      <TrustStrip />
      <Stats />
      <SurveyPortal />
      <Timeline />
      <Support />
      <Footer />
    </main>
  )
} 