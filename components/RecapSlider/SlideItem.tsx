// 'use client'

// import { motion } from 'framer-motion'
// import type { Slide } from './slideData'

// type Props = {
//   slide: Slide
// }

// const containerVariants = {
//   hidden: {},
//   visible: {
//     transition: { staggerChildren: 0.15 },
//   },
// }

// const childVariants = {
//   hidden: { y: 24, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: { duration: 0.5, ease: 'easeOut' },
//   },
// }

// export function SlideItem({ slide }: Props) {
//   return (
//     <div
//       className="w-screen h-screen flex items-center justify-center"
//       style={{ backgroundColor: slide.accentColor }}
//     >
//       <motion.div
//         className="flex flex-col items-center text-center text-white max-w-2xl px-8"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <motion.div variants={childVariants} className="text-7xl mb-6">
//           {slide.icon}
//         </motion.div>
//         <motion.h2
//           variants={childVariants}
//           className="text-4xl md:text-5xl font-bold mb-4"
//         >
//           {slide.heading}
//         </motion.h2>
//         <motion.p
//           variants={childVariants}
//           className="text-xl opacity-80 mb-4"
//         >
//           {slide.subheading}
//         </motion.p>
//         <motion.p
//           variants={childVariants}
//           className="text-base opacity-70 leading-relaxed"
//         >
//           {slide.body}
//         </motion.p>
//       </motion.div>
//     </div>
//   )
// }
