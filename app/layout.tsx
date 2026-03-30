import type { Metadata } from 'next'
import { Be_Vietnam_Pro, Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const beVietnam = Be_Vietnam_Pro({
  subsets: ['vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-be-vietnam',
  display: 'swap',
})

const inter = Inter({
  subsets: ['vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'EES RACE 2026 — GHN Employee Engagement Survey',
  description:
    'Nói lên — Để GHN lắng nghe — Để GHN thay đổi. Tham gia khảo sát mức độ gắn kết nhân viên năm 2026.',
  keywords: ['GHN', 'EES', 'RACE 2026', 'khảo sát nhân viên', 'employee engagement'],
  icons: {
    icon: 'https://play-lh.googleusercontent.com/N9dXtItNr-JRoijGhWwGzr-Nt9S31QEnF2dKUjRzTp-TYOlA8NYbGTkFnNpyyzQgsotFp046XZmm2M39Xrw-Ng=w240-h480-rw',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={cn(beVietnam.variable, inter.variable, 'antialiased')}
    >
      <body className="font-body bg-white">
        <div className="noise" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
