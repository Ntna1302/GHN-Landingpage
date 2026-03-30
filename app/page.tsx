import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { MarqueeStrip } from '@/components/sections/MarqueeStrip'
import { TrustStrip } from '@/components/sections/TrustStrip'
import { Stats } from '@/components/sections/Stats'
import { SurveyPortal } from '@/components/sections/SurveyPortal'
import { Timeline } from '@/components/sections/Timeline'
import { Support } from '@/components/sections/Support'

export default function Home() {
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
