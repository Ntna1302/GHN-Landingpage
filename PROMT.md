# Vibe Code Prompt — EES RACE 2026 Landing Page
## Tech Stack: Next.js 14 + React + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion

---

## 🛠 PROJECT SETUP

Run these commands first:
```bash
npx create-next-app@latest ees-race-2026 --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd ees-race-2026
pnpm add framer-motion
pnpm dlx shadcn@latest init
```

Install these shadcn/ui components:
```bash
pnpm dlx shadcn@latest add button card badge dialog separator tooltip sheet
```

Also install:
```bash
pnpm add lucide-react
pnpm add @fontsource/inter
```

Google Fonts (add to `app/layout.tsx`):
```typescript
import { Be_Vietnam_Pro, Inter } from 'next/font/google'

const beVietnam = Be_Vietnam_Pro({
  subsets: ['vietnamese'],
  weight: ['300','400','500','600','700','800','900'],
  variable: '--font-heading',
})

const inter = Inter({
  subsets: ['vietnamese'],
  weight: ['300','400','500','600','700'],
  variable: '--font-body',
})
```

---

## 🎯 PROJECT OVERVIEW

Build a **premium, high-energy internal landing page** for GHN (Giao Hàng Nhanh — Vietnam's largest logistics company). This is for their 2026 Employee Engagement Survey called **"EES RACE 2026"**.

- **Purpose**: Direct employees to the correct anonymous survey form based on their job group
- **Audience**: ~20,000+ employees across Vietnam, from delivery riders to C-level
- **Primary CTA**: Select the correct survey group and start the survey
- **Tone**: Empowering, trustworthy, modern — like a product launch, NOT a boring HR page
- **Slogan**: "Nói lên — Để GHN lắng nghe — Để GHN thay đổi"

---

## 🎨 DESIGN SYSTEM (Tailwind Config)

Extend `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      ghn: {
        o1: '#FF5200',    // Primary Orange
        o2: '#F67700',    // Orange Mid
        o3: '#F8B200',    // Golden
        b1: '#006FAD',    // Blue Deep
        b2: '#009BE0',    // Blue Mid
        b3: '#0055F4',    // Blue Accent
        navy: '#0A1F44',  // Primary Dark
        'navy-mid': '#132E63',
      },
      surface: {
        DEFAULT: '#F5F7FA',
        warm: '#FFF8F3',
        blue: '#F0F7FF',
      },
    },
    fontFamily: {
      heading: ['var(--font-heading)', 'sans-serif'],
      body: ['var(--font-body)', 'sans-serif'],
    },
    borderRadius: {
      'sm': '12px',
      'md': '16px',
      'lg': '24px',
      'xl': '32px',
    },
    keyframes: {
      marquee: {
        '0%': { transform: 'translateX(0)' },
        '100%': { transform: 'translateX(-50%)' },
      },
      morphBlob: {
        '0%, 100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
        '25%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
        '50%': { borderRadius: '50% 60% 30% 60%/30% 60% 70% 40%' },
        '75%': { borderRadius: '60% 30% 60% 40%/60% 40% 30% 70%' },
      },
      gradientFlow: {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
      },
      shimmer: {
        '0%': { left: '-100%' },
        '100%': { left: '200%' },
      },
      ripple: {
        '0%': { boxShadow: '0 0 0 0 rgba(255,82,0,0.3)' },
        '100%': { boxShadow: '0 0 0 18px rgba(255,82,0,0)' },
      },
      float: {
        '0%, 100%': { transform: 'translate(0,0) rotate(0deg)' },
        '50%': { transform: 'translate(25px,-35px) rotate(6deg)' },
      },
      particleUp: {
        '0%': { transform: 'translateY(0) scale(1)', opacity: '0.5' },
        '100%': { transform: 'translateY(-100vh) scale(0)', opacity: '0' },
      },
    },
    animation: {
      marquee: 'marquee 22s linear infinite',
      morphBlob: 'morphBlob 18s ease-in-out infinite',
      gradientFlow: 'gradientFlow 5s ease infinite',
      shimmer: 'shimmer 3s ease-in-out infinite',
      ripple: 'ripple 2s ease-out infinite',
      float: 'float 14s ease-in-out infinite',
      particleUp: 'particleUp 10s linear infinite',
    },
  },
},
```

---

## 📁 FILE STRUCTURE

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts + metadata
│   ├── page.tsx            # Main page composing all sections
│   └── globals.css         # Tailwind + custom CSS (noise overlay, scrollbar, selections)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky glass nav
│   │   └── Footer.tsx      # Navy footer
│   ├── sections/
│   │   ├── Hero.tsx        # Dark navy hero with particles + floating shapes
│   │   ├── Marquee.tsx     # Infinite scrolling gradient strip
│   │   ├── TrustStrip.tsx  # 3 overlapping trust cards
│   │   ├── Stats.tsx       # 4 animated counter cards
│   │   ├── SurveyPortal.tsx # Main CTA — 6 survey group cards
│   │   ├── Timeline.tsx    # 4-step roadmap
│   │   └── Support.tsx     # Help/contact section
│   ├── ui/                 # shadcn/ui components (auto-generated)
│   ├── SurveyCard.tsx      # Reusable survey card with 3D tilt
│   ├── SurveyModal.tsx     # Dialog for survey redirect
│   ├── AnimatedCounter.tsx # Number count-up component
│   ├── ScrollReveal.tsx    # Framer Motion scroll-triggered wrapper
│   ├── FloatingShapes.tsx  # Animated background blobs
│   └── ParticleField.tsx   # Floating particle effect
├── lib/
│   ├── utils.ts            # shadcn cn() utility
│   └── survey-data.ts      # Survey groups data + links
└── hooks/
    ├── useMouseParallax.ts # Mouse position tracking for parallax
    └── useScrolled.ts      # Detect scroll position for nav shadow
```

---

## 📐 COMPONENT SPECIFICATIONS

### `Navbar.tsx`
- Use shadcn `Button` for the CTA pill
- Use shadcn `Sheet` for mobile hamburger menu
- **Desktop**: Logo + brand text | nav link + orange pill button
- **Mobile**: Logo + brand text (shortened) | Sheet trigger (hamburger icon)
- Sticky with `backdrop-blur-xl saturate-[180%] bg-white/88`
- Add shadow on scroll via `useScrolled()` hook
- Logo: `https://res.cloudinary.com/dtjghirnn/image/upload/v1774863548/LOGO_CHUAN_onyfcy.png`
- Nav link: "Bảng Tiến Độ (HR)" with `PieChart` icon from lucide-react → `https://lookerstudio.google.com/`
- CTA: "Khảo Sát Ngay →" scrolls to `#survey-portal`

### `Hero.tsx`
- Full viewport dark section (`bg-ghn-navy min-h-[92vh]`)
- **Background layers** (use absolute positioned divs):
  - Radial gradient mesh (3 overlapping radial gradients)
  - 64px grid pattern with radial mask fade
  - `<FloatingShapes />` — 4 blobs + 2 spinning rings, parallax on mouse via `useMouseParallax()`
  - `<ParticleField count={14} />` — small orange dots floating upward
- **Content** (centered, `max-w-[880px]`):
  - `Badge` (shadcn) with live pulsing dot: "Chiến dịch nội bộ quan trọng nhất 2026"
  - Eyebrow text: "EMPLOYEE ENGAGEMENT SURVEY"
  - Title: `EES RACE` white + `2026` with animated gradient text
  - Subtitle with `<strong>` words having orange underline
  - Two `Button` (shadcn): accent CTA + outline/ghost CTA
- **Framer Motion**: Staggered `motion.div` for each element with `slideUp` variants (y: 50→0, opacity: 0→1, staggerChildren: 0.12s)
- **Scroll cue**: Animated line + "Cuộn xuống" — hide on mobile

### `Marquee.tsx`
- Full-width strip with animated gradient background (`bg-gradient-to-r from-ghn-o1 via-ghn-o3 to-ghn-b3` + `animate-gradientFlow bg-[length:200%_100%]`)
- Double the items array for seamless CSS animation loop
- Items: `['Ẩn danh 100%', '25 câu hỏi', '8-10 phút', '6 luồng khảo sát', 'Action Plan Q3', 'Cam kết từ C-Level', 'Nói lên · Lắng nghe · Thay đổi', 'EES RACE 2026']`
- Each item: uppercase, font-heading, `text-[13px] font-extrabold tracking-[3px]` with dot separator
- `hidden md:block` — hide on mobile

### `TrustStrip.tsx`
- Use shadcn `Card` — wrapped in a container with `-mt-[52px] relative z-20`
- 3-column grid on desktop → 1 column on mobile
- Use shadcn `Separator` between items (vertical on desktop, horizontal on mobile)
- Data:
```typescript
const trustItems = [
  { icon: 'UserRoundSearch', color: 'orange', title: 'Ẩn Danh Tuyệt Đối', desc: 'Không định danh, không lưu vết. Thông tin bảo mật hoàn toàn 100%.' },
  { icon: 'Zap', color: 'blue', title: 'Nhanh & Tối Ưu', desc: 'Bộ câu hỏi thiết kế riêng cho từng nhóm. Chỉ mất 8-10 phút trên điện thoại.' },
  { icon: 'Handshake', color: 'green', title: 'Cam Kết Hành Động', desc: 'Kết quả trình bày trực tiếp với C-Level để đưa ra Action Plan trong Q3.' },
]
```
- Icon containers: rounded-[18px], gradient tinted backgrounds, hover: `scale-110 -rotate-[4deg] -translate-y-1`
- Wrap with `<ScrollReveal>`

### `Stats.tsx`
- 4-column grid → 2 on mobile
- Each stat uses `<AnimatedCounter>` component
- `<AnimatedCounter>`: Uses `useInView` from framer-motion. When in view, animates from 0 to target over 1.2s with easing. Use `useMotionValue` + `useTransform` + `animate` from framer-motion.
- Data:
```typescript
const stats = [
  { value: 25, suffix: '', label: 'Câu hỏi / Bài KS', accent: true },
  { value: 6, suffix: '', label: 'Luồng khảo sát', accent: false },
  { value: 8, suffix: '-10 phút', label: 'Thời gian hoàn thành', accent: true },
  { value: 100, suffix: '%', label: 'Ẩn danh tuyệt đối', accent: false },
]
```
- Cards: shadcn `Card` with hover lift + shadow transition

### `SurveyPortal.tsx`
- Section header with tag + title + description
- Two groups separated by a labeled divider line
- Maps through survey data and renders `<SurveyCard>` for each
- Uses `<SurveyModal>` (shadcn `Dialog`) for redirect confirmation

### `survey-data.ts`
```typescript
export type SurveyGroup = {
  id: string
  badge: string
  icon: string // lucide-react icon name
  title: string
  description: string
  theme: 'orange' | 'blue'
  category: 'operations' | 'office'
  link: string
}

export const surveyGroups: SurveyGroup[] = [
  { id: '1A', badge: 'Nhóm 1A', icon: 'Bike', title: 'Shipper / Giao Nhận', description: 'Dành cho NVPTTT Tuyến, NVGN Giao Hàng Nặng (Freight).', theme: 'orange', category: 'operations', link: 'https://forms.google.com/example-1A' },
  { id: '1B', badge: 'Nhóm 1B', icon: 'Truck', title: 'Tài xế Vận tải', description: 'Dành riêng cho Tài xế xe tải chạy tuyến GXT & TXXT.', theme: 'orange', category: 'operations', link: 'https://forms.google.com/example-1B' },
  { id: '2A', badge: 'Nhóm 2A', icon: 'PackageCheck', title: 'Vận hành Kho & Bưu cục', description: 'Dành cho NV Xử lý (Vùng), NV Phân Hàng, Admin Kho.', theme: 'orange', category: 'operations', link: 'https://forms.google.com/example-2A' },
  { id: '2B', badge: 'Nhóm 2B', icon: 'ShieldCheck', title: 'Quản lý Tuyến đầu', description: 'AM/OM, Supervisor, TBC, Ops Team Leader.', theme: 'blue', category: 'office', link: 'https://forms.google.com/example-2B' },
  { id: '3A', badge: 'Nhóm 3A', icon: 'LaptopMinimal', title: 'Nhân viên Văn phòng', description: 'Dành cho chuyên viên, nhân viên khối Indirect HO.', theme: 'blue', category: 'office', link: 'https://forms.google.com/example-3A' },
  { id: '3B', badge: 'Nhóm 3B', icon: 'UserCog', title: 'Cấp Quản trị (Mid/Senior)', description: 'Dành cho cấp Manager & Director tại HO.', theme: 'blue', category: 'office', link: 'https://forms.google.com/example-3B' },
]
```

### `SurveyCard.tsx`
- Props: `SurveyGroup` + `onSelect: (group: SurveyGroup) => void`
- Use shadcn `Card`, `CardHeader`, `CardContent`, `CardFooter`
- Use shadcn `Badge` for group label
- Use shadcn `Button` for CTA
- **Animated gradient top border**: `before:` pseudo-element, height 0→4px on hover. Orange gradient for operations, blue for office.
- **3D tilt on hover** (desktop only): Track mouse position relative to card, apply `perspective(700px) rotateY(Xdeg) rotateX(Ydeg)` via `onMouseMove`. Reset on `onMouseLeave`. Use `motion.div` with spring transition.
- **Hover state**: translateY(-10px), elevated shadow, colored inner glow
- **Button**: Full width. Default: outlined/ghost. Hover: fills with gradient, white text, glow shadow. Arrow icon slides right via `group-hover:translate-x-1`.
- Wrap with `<ScrollReveal>` with stagger delay based on index

### `SurveyModal.tsx`
- Use shadcn `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`
- Props: `open: boolean`, `onOpenChange`, `group: SurveyGroup | null`
- Content:
  - Icon: `Send` from lucide-react in orange gradient circle
  - Title: "Chuyển hướng khảo sát"
  - Message: "Hệ thống chuẩn bị chuyển hướng bạn đến form khảo sát ẩn danh dành cho **Nhóm {id}**."
  - Button: "Đã hiểu" — orange gradient, on click opens survey link in new tab + closes dialog
- Overlay: blur backdrop

### `Timeline.tsx`
- 4-column grid → 2 on tablet → 1 on mobile
- Connecting gradient line (absolute positioned, `h-[3px]`) behind dots — hide below `lg:`
- Each step: label, dot (colored circle with glow ring), title, subtitle
- Dots: `w-7 h-7 rounded-full` with matching color box-shadow glow. Hover: `scale-[1.35]` with `motion.div`
- Data:
```typescript
const steps = [
  { step: 'Bước 1', title: 'Khảo sát ẩn danh', sub: '8-10 phút trên điện thoại', color: 'orange' },
  { step: 'Bước 2', title: 'Phân tích dữ liệu', sub: 'EX Team tổng hợp & phân tích', color: 'orange' },
  { step: 'Bước 3', title: 'Báo cáo C-Level', sub: 'Trình bày kết quả trực tiếp', color: 'blue' },
  { step: 'Bước 4', title: 'Action Plan Q3', sub: 'Cam kết hành động cụ thể', color: 'blue' },
]
```

### `Support.tsx`
- Warm gradient background container with `rounded-xl`
- Decorative morphing blob (absolute, low opacity)
- Title + description + two `Button` (shadcn): Telegram + Email
- Buttons: white/outline pill style, hover lift + shadow
- Mobile: stack buttons vertically

### `Footer.tsx`
- `bg-ghn-navy` with `border-t-[5px] border-ghn-o1`
- Flex row: logo (in white rounded container) + copyright text
- Animated gradient bar at bottom (`h-1 animate-gradientFlow`)
- Footer logo: `https://res.cloudinary.com/dtjghirnn/image/upload/f_auto,q_auto/LOGO_CHUAN_o0mrgb`

### `ScrollReveal.tsx`
```typescript
// Wrapper component using framer-motion
// Props: children, delay?: number, className?: string
// Uses motion.div with:
//   initial={{ opacity: 0, y: 45 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   viewport={{ once: true, margin: '-25px' }}
//   transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
```

### `FloatingShapes.tsx`
- Multiple absolute-positioned divs with blob animations
- Accepts `mouseX`, `mouseY` from `useMouseParallax` for parallax transform
- 4 blobs (morphing border-radius, floating, gradient fills at very low opacity)
- 2 spinning ring outlines (border-only circles, slow rotation 35s+)

### `ParticleField.tsx`
- Generates `count` small dots with random positions, sizes, durations, delays
- Each particle: absolute positioned, `bg-ghn-o1/35`, `rounded-full`, `animate-particleUp`
- Randomize: left position (0-100%), size (2-5px), duration (7-15s), delay (0-8s)

---

## 🌐 globals.css ADDITIONS

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Noise overlay */
.noise {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.015;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 5px }
::-webkit-scrollbar-track { background: transparent }
::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px }
::-webkit-scrollbar-thumb:hover { background: #FF5200 }

/* Selection */
::selection { background: #FF5200; color: white }

/* Gradient text utility */
.text-gradient-orange {
  @apply bg-gradient-to-br from-ghn-o1 via-ghn-o2 to-ghn-o3 bg-clip-text text-transparent;
  background-size: 200% 200%;
  animation: gradientFlow 4s ease infinite;
}
```

---

## 📱 RESPONSIVE STRATEGY

Use Tailwind breakpoints consistently:
- **Mobile first** (default): Single column, simplified layout
- **`md:` (768px)**: Two columns for stats/timeline, show marquee
- **`lg:` (1024px)**: Full grid layouts, 3-column trust strip, timeline connecting line
- **`xl:` (1280px)**: Max-width containers kick in

Key responsive rules:
- Hero buttons: `flex-col md:flex-row`
- Trust strip: `grid-cols-1 lg:grid-cols-3`
- Stats: `grid-cols-2 lg:grid-cols-4`
- Survey cards: `grid-cols-1 md:grid-cols-2 xl:grid-cols-3`
- Timeline: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- Marquee: `hidden md:block`
- Scroll cue: `hidden md:flex`
- Nav link: `hidden md:flex`
- Mobile Sheet menu: `md:hidden`

---

## 🏁 QUALITY CHECKLIST

- [ ] `pnpm dev` runs without errors
- [ ] All shadcn/ui components render correctly
- [ ] Framer Motion animations are smooth (60fps)
- [ ] Hero stagger animation plays on load
- [ ] Marquee loops seamlessly with no gap
- [ ] Trust strip overlaps marquee cleanly with negative margin
- [ ] All 6 survey cards have 3D tilt (desktop) + hover effects
- [ ] Counter numbers animate when scrolled into view
- [ ] Dialog opens/closes with animation
- [ ] "Đã hiểu" button opens correct survey link in new tab
- [ ] Timeline gradient line connects dots on desktop
- [ ] Every section has scroll-reveal animation
- [ ] Mobile Sheet menu works with all navigation links
- [ ] Fully responsive: test at 375px, 768px, 1024px, 1440px
- [ ] No horizontal overflow at any breakpoint
- [ ] Vietnamese text renders correctly (Be Vietnam Pro font)
- [ ] All external links open in new tab (`target="_blank" rel="noopener"`)
- [ ] Smooth scroll to `#survey-portal` works from nav + hero buttons
- [ ] No hydration mismatches (client-only animations handled properly)
- [ ] Lighthouse performance score > 90
