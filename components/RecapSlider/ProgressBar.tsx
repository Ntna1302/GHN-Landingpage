// 'use client'

// import { motion } from 'framer-motion'

// type Props = {
//   current: number
//   total: number
//   color?: string
// }

// export function ProgressBar({ current, total, color }: Props) {
//   const pct = ((current + 1) / total) * 100

//   return (
//     <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-white/20">
//       <motion.div
//         className="h-full"
//         style={{ backgroundColor: color ?? 'white' }}
//         animate={{ width: `${pct}%` }}
//         transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//       />
//     </div>
//   )
// }
