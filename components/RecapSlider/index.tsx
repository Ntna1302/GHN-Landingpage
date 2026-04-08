// 'use client'

// import { useState, useEffect, useRef } from 'react'
// import { AnimatePresence, motion } from 'framer-motion'

// // ─────────────────────────────────────────────────────────────────────────────
// // Constants
// // ─────────────────────────────────────────────────────────────────────────────

// const GHN_LOGO =
//   'https://res.cloudinary.com/dtjghirnn/image/upload/v1774863548/LOGO_CHUAN_onyfcy.png'
// const GHN_NANG_LOGO =
//   'https://theme.hstatic.net/200000962736/1001331282/14/logo.png?v=2578'

// // ─────────────────────────────────────────────────────────────────────────────
// // Slide transition variants
// // ─────────────────────────────────────────────────────────────────────────────

// const slideVariants = {
//   enter: (dir: number) => ({ x: dir > 0 ? '100vw' : '-100vw', opacity: 0 }),
//   center: {
//     x: 0,
//     opacity: 1,
//     transition: { duration: 0.5, ease: 'easeOut' },
//   },
//   exit: (dir: number) => ({
//     x: dir > 0 ? '-100vw' : '100vw',
//     opacity: 0,
//     transition: { duration: 0.35, ease: 'easeIn' },
//   }),
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // MarqueeBar
// // ─────────────────────────────────────────────────────────────────────────────

// const MARQUEE_ITEMS = ['EES 2026', 'Giaohangnhanh', 'Giaohangnang']

// function MarqueeBar() {
//   // 4 repetitions → animate -50% for seamless loop
//   const items = [...Array(4)].flatMap(() => MARQUEE_ITEMS)
//   return (
//     <div
//       className="fixed top-0 left-0 right-0 z-50 h-9 overflow-hidden"
//       style={{ backgroundColor: '#0A1F44' }}
//     >
//       <motion.div
//         className="flex items-center h-full gap-10 pl-4"
//         style={{ width: 'max-content' }}
//         animate={{ x: ['0%', '-50%'] }}
//         transition={{
//           duration: 20,
//           ease: 'linear',
//           repeat: Infinity,
//           repeatType: 'loop',
//         }}
//       >
//         {items.map((item, i) => (
//           <span key={i} className="flex items-center gap-2 shrink-0">
//             <span
//               className="inline-block rounded-full shrink-0"
//               style={{ width: 6, height: 6, backgroundColor: '#FF5200' }}
//             />
//             <span
//               className="font-bold uppercase whitespace-nowrap"
//               style={{
//                 fontSize: 10,
//                 letterSpacing: '2.5px',
//                 color: 'rgba(255,255,255,0.5)',
//               }}
//             >
//               {item}
//             </span>
//           </span>
//         ))}
//       </motion.div>
//     </div>
//   )
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // NavDots
// // ─────────────────────────────────────────────────────────────────────────────

// function NavDots({
//   total,
//   current,
//   onDotClick,
// }: {
//   total: number
//   current: number
//   onDotClick: (i: number) => void
// }) {
//   return (
//     <div
//       className="fixed left-0 right-0 z-40 flex justify-center items-center gap-2"
//       style={{ top: 36, height: 32 }}
//     >
//       {Array.from({ length: total }, (_, i) => (
//         <motion.button
//           key={i}
//           onClick={() => onDotClick(i)}
//           animate={{
//             width: i === current ? 26 : 8,
//             borderRadius: i === current ? 4 : 8,
//             backgroundColor: i === current ? '#FF5200' : '#D1D1D6',
//           }}
//           transition={{ duration: 0.3 }}
//           style={{ height: 8 }}
//           aria-label={`Slide ${i + 1}`}
//         />
//       ))}
//     </div>
//   )
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Shared helpers
// // ─────────────────────────────────────────────────────────────────────────────

// function LogoRow() {
//   return (
//     <div className="flex items-center gap-3 mb-4">
//       <img
//         src={GHN_LOGO}
//         alt="GHN"
//         className="h-8 w-auto brightness-0 invert"
//         draggable={false}
//         onError={(e) => {
//           ;(e.target as HTMLImageElement).style.display = 'none'
//         }}
//       />
//       <div
//         className="w-px h-6 shrink-0"
//         style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
//       />
//       <img
//         src={GHN_NANG_LOGO}
//         alt="GHN Nặng"
//         className="h-7 w-auto brightness-0 invert"
//         draggable={false}
//         onError={(e) => {
//           ;(e.target as HTMLImageElement).style.display = 'none'
//         }}
//       />
//     </div>
//   )
// }

// function PulseDot({ color }: { color: string }) {
//   return (
//     <motion.span
//       className="inline-block rounded-full shrink-0"
//       style={{
//         width: 8,
//         height: 8,
//         backgroundColor: color,
//         boxShadow: '0 0 0 2px rgba(255,255,255,0.25)',
//       }}
//       animate={{ scale: [1, 1.5, 1] }}
//       transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
//     />
//   )
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Slide 1 — EES 2025 · Nhìn lại
// // ─────────────────────────────────────────────────────────────────────────────

// const S1_CARDS = [
//   {
//     num: '01',
//     icon: '📊',
//     title: 'Mức độ gắn kết tổng thể',
//     sub: 'Đo lường toàn công ty lần đầu tiên',
//   },
//   {
//     num: '02',
//     icon: '💬',
//     title: 'Cảm nhận về công việc',
//     sub: 'Từ góc nhìn trực tiếp của từng GHNer',
//   },
//   {
//     num: '03',
//     icon: '👥',
//     title: 'Hiệu quả quản lý trực tiếp',
//     sub: 'Đánh giá theo từng cấp quản lý',
//   },
//   {
//     num: '04',
//     icon: '🏢',
//     title: 'Môi trường làm việc',
//     sub: 'Văn hóa, điều kiện & sự gắn bó',
//   },
// ]

// function Slide1({ onNext }: { onNext: () => void }) {
//   return (
//     <div className="relative w-full h-full overflow-hidden">
//       {/* Gradient background */}
//       <div
//         className="absolute inset-0"
//         style={{
//           background:
//             'linear-gradient(135deg, #FF5200 0%, #FF8C00 50%, #FFB347 100%)',
//         }}
//       />

//       {/* Decorative circles */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div
//           className="absolute rounded-full"
//           style={{
//             width: 320,
//             height: 320,
//             right: -60,
//             top: -80,
//             backgroundColor: 'rgba(255,255,255,0.07)',
//             border: '1px solid rgba(255,255,255,0.10)',
//           }}
//         />
//         <div
//           className="absolute rounded-full"
//           style={{
//             width: 180,
//             height: 180,
//             right: 40,
//             top: 30,
//             backgroundColor: 'rgba(255,255,255,0.05)',
//           }}
//         />
//         <div
//           className="absolute rounded-full"
//           style={{
//             width: 100,
//             height: 100,
//             left: -20,
//             bottom: 40,
//             backgroundColor: 'rgba(0,0,0,0.06)',
//           }}
//         />
//       </div>

//       {/* Scrollable content */}
//       <div className="relative h-full overflow-y-auto">
//         <div className="flex flex-col px-5 sm:px-8 pt-[68px] pb-4 min-h-full">
//           <LogoRow />

//           {/* Eyebrow */}
//           <div className="mb-3">
//             <div
//               className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
//               style={{
//                 backgroundColor: 'rgba(255,255,255,0.18)',
//                 border: '1px solid rgba(255,255,255,0.30)',
//               }}
//             >
//               <PulseDot color="white" />
//               <span className="text-white text-xs font-semibold tracking-wide">
//                 EES 2025 · Nhìn lại
//               </span>
//             </div>
//           </div>

//           {/* Title */}
//           <div className="mb-2">
//             <p
//               className="font-bold text-white leading-tight text-[30px] sm:text-[40px]"
//               style={{ letterSpacing: '-1.5px', fontWeight: 800 }}
//             >
//               Hành trình
//             </p>
//             <p
//               className="font-bold leading-tight text-[30px] sm:text-[40px]"
//               style={{
//                 letterSpacing: '-1.5px',
//                 fontWeight: 800,
//                 color: 'rgba(255,255,255,0.75)',
//               }}
//             >
//               đầu tiên.
//             </p>
//           </div>

//           {/* Subtitle */}
//           <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
//             Khảo sát EES 2025 — lần đầu tiên đo lường mức độ gắn kết toàn công
//             ty GHN.
//           </p>

//           {/* 2×2 Card grid */}
//           <div className="grid grid-cols-2 gap-2.5 mb-4">
//             {S1_CARDS.map((c) => (
//               <div
//                 key={c.num}
//                 className="rounded-[20px] p-3 transition-colors duration-200 cursor-default"
//                 style={{
//                   backgroundColor: 'rgba(255,255,255,0.15)',
//                   border: '1px solid rgba(255,255,255,0.25)',
//                   borderTop: '2px solid rgba(255,255,255,0.5)',
//                 }}
//                 onMouseEnter={(e) => {
//                   ;(
//                     e.currentTarget as HTMLDivElement
//                   ).style.backgroundColor = 'rgba(255,255,255,0.22)'
//                 }}
//                 onMouseLeave={(e) => {
//                   ;(
//                     e.currentTarget as HTMLDivElement
//                   ).style.backgroundColor = 'rgba(255,255,255,0.15)'
//                 }}
//               >
//                 <span
//                   className="block text-[10px] font-semibold mb-1"
//                   style={{ color: 'rgba(255,255,255,0.5)' }}
//                 >
//                   {c.num}
//                 </span>
//                 <span className="text-2xl block mb-1">{c.icon}</span>
//                 <p className="text-white font-bold text-[11px] sm:text-xs leading-snug mb-0.5">
//                   {c.title}
//                 </p>
//                 <p
//                   className="text-[10px] leading-snug"
//                   style={{ color: 'rgba(255,255,255,0.65)' }}
//                 >
//                   {c.sub}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* Bottom row */}
//           <div className="mt-auto flex items-center justify-between pb-2">
//             <span
//               className="text-sm font-medium"
//               style={{ color: 'rgba(255,255,255,0.5)' }}
//             >
//               1 / 3
//             </span>
//             <button
//               onClick={onNext}
//               className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-colors duration-200"
//               style={{
//                 minHeight: 44,
//                 backgroundColor: 'rgba(255,255,255,0.18)',
//                 border: '1px solid rgba(255,255,255,0.30)',
//               }}
//               onMouseEnter={(e) => {
//                 ;(
//                   e.currentTarget as HTMLButtonElement
//                 ).style.backgroundColor = 'rgba(255,255,255,0.25)'
//               }}
//               onMouseLeave={(e) => {
//                 ;(
//                   e.currentTarget as HTMLButtonElement
//                 ).style.backgroundColor = 'rgba(255,255,255,0.18)'
//               }}
//             >
//               Tiếp theo →
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Slide 2 — Kết quả · 2025
// // ─────────────────────────────────────────────────────────────────────────────

// function Slide2({
//   onNext,
//   onPrev,
//   kpi,
// }: {
//   onNext: () => void
//   onPrev: () => void
//   kpi: { c1: number; c2: number; c3: number }
// }) {
//   const kpiCards = [
//     {
//       label: 'Employee Engagement Score',
//       value: `${kpi.c1}%`,
//       sub: 'Mức gắn kết toàn công ty',
//       badge: 'Vượt mục tiêu',
//       bg: 'linear-gradient(135deg, #FFF0EB, #FFE0CC)',
//       valueColor: '#CC3300',
//       badgeBg: 'rgba(255,82,0,0.12)',
//       badgeColor: '#C43B00',
//     },
//     {
//       label: 'Điểm trung bình',
//       value: kpi.c2.toFixed(2),
//       sub: 'Trên thang điểm 10',
//       badge: 'Mức TỐT',
//       bg: 'linear-gradient(135deg, #EBF5FF, #D0E8FF)',
//       valueColor: '#0A1F44',
//       badgeBg: 'rgba(10,31,68,0.10)',
//       badgeColor: '#0A1F44',
//     },
//     {
//       label: 'eNPS Score',
//       value: `+${kpi.c3.toFixed(2)}%`,
//       sub: 'Sẵn sàng giới thiệu',
//       badge: 'Vùng TỐT',
//       bg: 'linear-gradient(135deg, #EBFAF3, #C8F0DC)',
//       valueColor: '#1A6B3A',
//       badgeBg: 'rgba(26,122,69,0.12)',
//       badgeColor: '#1A6B3A',
//     },
//   ]

//   return (
//     <div className="relative w-full h-full overflow-hidden bg-white">
//       {/* Decorative circles — top-right */}
//       <div className="absolute top-0 right-0 pointer-events-none" style={{ zIndex: 0 }}>
//         <div
//           className="absolute rounded-full"
//           style={{
//             width: 200,
//             height: 200,
//             right: -40,
//             top: -40,
//             backgroundColor: '#FFF0EB',
//             border: '1px solid #FFD0BB',
//           }}
//         />
//         <div
//           className="absolute rounded-full"
//           style={{
//             width: 100,
//             height: 100,
//             right: 20,
//             top: 20,
//             backgroundColor: '#FFF8F5',
//           }}
//         />
//       </div>

//       {/* Scrollable content */}
//       <div className="relative h-full overflow-y-auto" style={{ zIndex: 1 }}>
//         <div className="flex flex-col px-5 sm:px-8 pt-[68px] pb-4 min-h-full">
//           {/* Header */}
//           <div
//             className="pb-4 mb-3 shrink-0"
//             style={{ borderBottom: '1px solid #F0F0F0' }}
//           >
//             <div className="mb-2">
//               <div
//                 className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
//                 style={{
//                   backgroundColor: '#FFF0EB',
//                   border: '1px solid #FFD0BB',
//                 }}
//               >
//                 <PulseDot color="#FF5200" />
//                 <span
//                   className="text-xs font-semibold tracking-wide"
//                   style={{ color: '#C43B00' }}
//                 >
//                   Kết quả · 2025
//                 </span>
//               </div>
//             </div>
//             <h2
//               className="text-2xl sm:text-3xl font-bold leading-tight"
//               style={{ color: '#0A1F44' }}
//             >
//               Những con số{' '}
//               <span style={{ color: '#FF5200' }}>nói lên tất cả.</span>
//             </h2>
//           </div>

//           {/* KPI cards — 3 columns */}
//           <div className="grid grid-cols-3 gap-2 sm:gap-2.5 mb-3">
//             {kpiCards.map((card, i) => (
//               <div
//                 key={i}
//                 className="rounded-2xl p-2.5 sm:p-3 flex flex-col"
//                 style={{ background: card.bg }}
//               >
//                 <span
//                   className="text-[9px] sm:text-[10px] font-semibold mb-1.5 leading-tight"
//                   style={{ color: 'rgba(0,0,0,0.5)' }}
//                 >
//                   {card.label}
//                 </span>
//                 <span
//                   className="text-xl sm:text-2xl font-black leading-none mb-1.5 tabular-nums"
//                   style={{ color: card.valueColor }}
//                 >
//                   {card.value}
//                 </span>
//                 <span
//                   className="text-[9px] sm:text-[10px] mb-2 leading-tight"
//                   style={{ color: 'rgba(0,0,0,0.5)' }}
//                 >
//                   {card.sub}
//                 </span>
//                 <span
//                   className="inline-block self-start px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold mt-auto"
//                   style={{
//                     backgroundColor: card.badgeBg,
//                     color: card.badgeColor,
//                   }}
//                 >
//                   {card.badge}
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* Strength cards — 2 columns */}
//           <div className="grid grid-cols-2 gap-2.5 mb-4">
//             {[
//               { val: '> 8.6', label: 'Quản lý & Đồng nghiệp' },
//               { val: '> 8.4', label: 'Truyền thông Nội bộ' },
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="relative rounded-2xl p-3 sm:p-4"
//                 style={{
//                   background: 'linear-gradient(135deg, #FFF0EB, #FFE4D4)',
//                   border: '2px solid #FFB899',
//                 }}
//               >
//                 <span
//                   className="absolute top-2 right-3 select-none"
//                   style={{ fontSize: 20, color: 'rgba(255,82,0,0.4)' }}
//                 >
//                   ★
//                 </span>
//                 <p
//                   className="text-xl sm:text-2xl font-black mb-0.5"
//                   style={{ color: '#CC3300' }}
//                 >
//                   {item.val}
//                 </p>
//                 <p className="text-xs font-semibold" style={{ color: '#0A1F44' }}>
//                   {item.label}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* Bottom row */}
//           <div className="mt-auto flex items-center justify-between pb-2">
//             <button
//               onClick={onPrev}
//               className="px-4 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200"
//               style={{
//                 minHeight: 44,
//                 backgroundColor: '#F2F2F7',
//                 color: '#0A1F44',
//               }}
//               onMouseEnter={(e) => {
//                 ;(e.currentTarget as HTMLButtonElement).style.backgroundColor =
//                   '#E8E8ED'
//               }}
//               onMouseLeave={(e) => {
//                 ;(e.currentTarget as HTMLButtonElement).style.backgroundColor =
//                   '#F2F2F7'
//               }}
//             >
//               ← Quay lại
//             </button>
//             <span className="text-sm font-medium" style={{ color: '#8E8E93' }}>
//               2 / 3
//             </span>
//             <button
//               onClick={onNext}
//               className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-colors duration-200"
//               style={{ minHeight: 44, backgroundColor: '#0A1F44' }}
//               onMouseEnter={(e) => {
//                 ;(e.currentTarget as HTMLButtonElement).style.backgroundColor =
//                   '#0d2a5e'
//               }}
//               onMouseLeave={(e) => {
//                 ;(e.currentTarget as HTMLButtonElement).style.backgroundColor =
//                   '#0A1F44'
//               }}
//             >
//               Tiếp theo →
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // Slide 3 — EES 2026 · Tiếp nối
// // ─────────────────────────────────────────────────────────────────────────────

// const S3_ITEMS = [
//   {
//     num: 1,
//     title: 'Cải thiện điểm yếu theo từng Khối chức năng',
//     sub: 'Phát hiện và xử lý vấn đề đặc thù từng bộ phận',
//     tag: 'Ưu tiên cao',
//   },
//   {
//     num: 2,
//     title: 'Nâng cao trải nghiệm từng nhóm nhân sự',
//     sub: 'Shipper, kho vận, văn phòng — mỗi nhóm một giải pháp',
//     tag: 'Đang triển khai',
//   },
//   {
//     num: 3,
//     title: 'Chuyển hóa insight thành hành động 2026',
//     sub: 'Từ dữ liệu EES 2025 → kế hoạch cải thiện có đo lường',
//     tag: 'Mục tiêu 2026',
//   },
// ]

// function Slide3({
//   onPrev,
//   onDone,
// }: {
//   onPrev: () => void
//   onDone: () => void
// }) {
//   return (
//     <div className="relative w-full h-full overflow-hidden">
//       {/* Gradient background */}
//       <div
//         className="absolute inset-0"
//         style={{
//           background:
//             'linear-gradient(145deg, #0D3B6E 0%, #1B6CA8 55%, #2589D3 100%)',
//         }}
//       />

//       {/* Decorative circles — bottom-right */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div
//           className="absolute rounded-full"
//           style={{
//             width: 300,
//             height: 300,
//             right: -80,
//             bottom: 40,
//             backgroundColor: 'rgba(255,255,255,0.04)',
//             border: '1px solid rgba(255,255,255,0.08)',
//           }}
//         />
//         <div
//           className="absolute rounded-full"
//           style={{
//             width: 160,
//             height: 160,
//             right: 40,
//             bottom: 120,
//             backgroundColor: 'rgba(255,255,255,0.03)',
//           }}
//         />
//       </div>

//       {/* Scrollable content */}
//       <div className="relative h-full overflow-y-auto">
//         <div className="flex flex-col px-5 sm:px-8 pt-[68px] pb-4 min-h-full">
//           <LogoRow />

//           {/* Eyebrow */}
//           <div className="mb-3">
//             <div
//               className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
//               style={{
//                 backgroundColor: 'rgba(255,255,255,0.15)',
//                 border: '1px solid rgba(255,255,255,0.25)',
//               }}
//             >
//               <PulseDot color="white" />
//               <span className="text-white text-xs font-semibold tracking-wide">
//                 EES 2026 · Tiếp nối
//               </span>
//             </div>
//           </div>

//           {/* Title */}
//           <div className="mb-2">
//             <p
//               className="font-bold text-white leading-tight text-[28px] sm:text-[38px]"
//               style={{ letterSpacing: '-1.5px', fontWeight: 800 }}
//             >
//               Khoảng trống
//             </p>
//             <p
//               className="font-bold leading-tight text-[28px] sm:text-[38px]"
//               style={{
//                 letterSpacing: '-1.5px',
//                 fontWeight: 800,
//                 color: 'rgba(255,255,255,0.65)',
//               }}
//             >
//               cần lấp đầy.
//             </p>
//           </div>

//           {/* Subtitle */}
//           <p
//             className="text-sm mb-4"
//             style={{ color: 'rgba(255,255,255,0.72)' }}
//           >
//             Dựa trên kết quả EES 2025, đây là những ưu tiên định hướng cho năm
//             2026.
//           </p>

//           {/* Roadmap timeline */}
//           <div className="relative flex flex-col gap-3 mb-4">
//             {/* Vertical connector line */}
//             <div
//               className="absolute"
//               style={{
//                 left: 15,
//                 top: 16,
//                 bottom: 16,
//                 width: 2,
//                 backgroundColor: 'rgba(255,255,255,0.12)',
//               }}
//             />

//             {S3_ITEMS.map((item) => (
//               <div key={item.num} className="flex items-start gap-3 sm:gap-4">
//                 {/* Circle node */}
//                 <div
//                   className="shrink-0 flex items-center justify-center rounded-full font-bold text-white text-sm z-10"
//                   style={{
//                     width: 32,
//                     height: 32,
//                     backgroundColor: 'rgba(255,255,255,0.15)',
//                     border: '1px solid rgba(255,255,255,0.35)',
//                   }}
//                 >
//                   {item.num}
//                 </div>

//                 {/* Card */}
//                 <div
//                   className="flex-1 rounded-2xl p-3 transition-colors duration-200 cursor-default"
//                   style={{
//                     backgroundColor: 'rgba(255,255,255,0.10)',
//                     border: '1px solid rgba(255,255,255,0.18)',
//                   }}
//                   onMouseEnter={(e) => {
//                     ;(
//                       e.currentTarget as HTMLDivElement
//                     ).style.backgroundColor = 'rgba(255,255,255,0.16)'
//                   }}
//                   onMouseLeave={(e) => {
//                     ;(
//                       e.currentTarget as HTMLDivElement
//                     ).style.backgroundColor = 'rgba(255,255,255,0.10)'
//                   }}
//                 >
//                   <p className="text-white font-bold text-xs sm:text-sm leading-snug mb-1">
//                     {item.title}
//                   </p>
//                   <p
//                     className="text-[10px] sm:text-xs leading-snug mb-2"
//                     style={{ color: 'rgba(255,255,255,0.6)' }}
//                   >
//                     {item.sub}
//                   </p>
//                   <span
//                     className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold"
//                     style={{
//                       backgroundColor: 'rgba(255,255,255,0.15)',
//                       color: 'rgba(255,255,255,0.8)',
//                     }}
//                   >
//                     {item.tag}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Bottom row */}
//           <div className="mt-auto flex items-center justify-between pb-2">
//             <button
//               onClick={onPrev}
//               className="px-4 py-2.5 rounded-full text-sm font-semibold text-white transition-colors duration-200"
//               style={{
//                 minHeight: 44,
//                 backgroundColor: 'rgba(255,255,255,0.15)',
//                 border: '1px solid rgba(255,255,255,0.25)',
//               }}
//               onMouseEnter={(e) => {
//                 ;(e.currentTarget as HTMLButtonElement).style.backgroundColor =
//                   'rgba(255,255,255,0.22)'
//               }}
//               onMouseLeave={(e) => {
//                 ;(e.currentTarget as HTMLButtonElement).style.backgroundColor =
//                   'rgba(255,255,255,0.15)'
//               }}
//             >
//               ← Quay lại
//             </button>
//             <span
//               className="text-sm font-medium"
//               style={{ color: 'rgba(255,255,255,0.5)' }}
//             >
//               3 / 3
//             </span>
//             <button
//               onClick={onDone}
//               className="px-5 py-2.5 rounded-full text-sm hover:scale-105 transition-transform duration-200"
//               style={{
//                 minHeight: 44,
//                 fontWeight: 800,
//                 backgroundColor: '#fff',
//                 color: '#0D3B6E',
//               }}
//             >
//               Tôi đã sẵn sàng 🚀
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // RecapSlider — main export
// // ─────────────────────────────────────────────────────────────────────────────

// export function RecapSlider({
//   onDone,
//   onBack,
// }: {
//   onDone: () => void
//   onBack: () => void
// }) {
//   const [current, setCurrent] = useState(0)
//   const [dir, setDir] = useState(1)
//   const [kpi, setKpi] = useState({ c1: 0, c2: 0, c3: 0 })
//   const kpiRan = useRef(false)

//   // KPI counter animation — runs once when slide 2 first becomes active
//   useEffect(() => {
//     if (current !== 1 || kpiRan.current) return
//     kpiRan.current = true
//     const duration = 1500
//     const start = performance.now()
//     const tick = (now: number) => {
//       const t = Math.min((now - start) / duration, 1)
//       const e = 1 - Math.pow(1 - t, 3) // cubic ease-out
//       setKpi({
//         c1: Math.round(e * 76),
//         c2: parseFloat((e * 8.02).toFixed(2)),
//         c3: parseFloat((e * 33.61).toFixed(2)),
//       })
//       if (t < 1) requestAnimationFrame(tick)
//     }
//     requestAnimationFrame(tick)
//   }, [current])

//   const goNext = () => {
//     if (current < 2) {
//       setDir(1)
//       setCurrent((c) => c + 1)
//     }
//   }

//   const goPrev = () => {
//     if (current > 0) {
//       setDir(-1)
//       setCurrent((c) => c - 1)
//     } else {
//       onBack()
//     }
//   }

//   // Keyboard: ArrowRight → next slide
//   // Re-register on current change so closure captures fresh goNext
//   useEffect(() => {
//     const handler = (e: KeyboardEvent) => {
//       if (e.key === 'ArrowRight') goNext()
//     }
//     window.addEventListener('keydown', handler)
//     return () => window.removeEventListener('keydown', handler)
//   }, [current]) // eslint-disable-line react-hooks/exhaustive-deps

//   // Touch swipe left → next slide
//   useEffect(() => {
//     let sx = 0
//     const onStart = (e: TouchEvent) => {
//       sx = e.touches[0].clientX
//     }
//     const onEnd = (e: TouchEvent) => {
//       if (sx - e.changedTouches[0].clientX > 50) goNext()
//     }
//     window.addEventListener('touchstart', onStart, { passive: true })
//     window.addEventListener('touchend', onEnd, { passive: true })
//     return () => {
//       window.removeEventListener('touchstart', onStart)
//       window.removeEventListener('touchend', onEnd)
//     }
//   }, [current]) // eslint-disable-line react-hooks/exhaustive-deps

//   // Browser back: if popping to splash or null → call onBack
//   useEffect(() => {
//     const handler = (e: PopStateEvent) => {
//       if (e.state?.step === 'splash' || !e.state) onBack()
//     }
//     window.addEventListener('popstate', handler)
//     return () => window.removeEventListener('popstate', handler)
//   }, [onBack])

//   const handleDotClick = (i: number) => {
//     if (i === current) return
//     setDir(i > current ? 1 : -1)
//     setCurrent(i)
//   }

//   const slides = [
//     <Slide1 key={0} onNext={goNext} />,
//     <Slide2 key={1} onNext={goNext} onPrev={goPrev} kpi={kpi} />,
//     <Slide3 key={2} onPrev={goPrev} onDone={onDone} />,
//   ]

//   return (
//     <div
//       className="relative w-screen h-screen overflow-hidden"
//       style={{ backgroundColor: '#F2F2F7' }}
//     >
//       <MarqueeBar />
//       <NavDots total={3} current={current} onDotClick={handleDotClick} />

//       <AnimatePresence mode="wait" custom={dir}>
//         <motion.div
//           key={current}
//           custom={dir}
//           variants={slideVariants}
//           initial="enter"
//           animate="center"
//           exit="exit"
//           className="absolute inset-0"
//         >
//           {slides[current]}
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   )
// }
