'use client'

import { useEffect } from 'react'
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
// import { RecapSlider } from '@/components/RecapSlider'
import { useHistoryStep } from '@/hooks/useHistoryStep'

type AppStep = 'splash' | 'recap' | 'main'

export default function Home() {
  const [step, setStep] = useHistoryStep()

  // Skip splash + recap on return visits
  useEffect(() => {
    if (sessionStorage.getItem('ees_splash_seen')) {
      setStep('main')
    }
  }, [setStep])

  if (step === 'splash') {
    return <SplashScreen onDone={() => setStep('recap')} />
  }

  // if (step === 'recap') {
  //   return (
  //     <RecapSlider
  //       onDone={() => setStep('main')}
  //       onBack={() => setStep('splash')}
  //     />
  //   )
  // }

  return (
    <>
      <RoleGate />
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
    </>
  )
}
