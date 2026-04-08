// 'use client'

// import { motion } from 'framer-motion'

// type Props = {
//   onDone: () => void
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

// export function FinalSlide({ onDone }: Props) {
//   return (
//     <div className="w-screen h-screen flex items-center justify-center bg-[#FF6B00]">
//       <motion.div
//         className="flex flex-col items-center text-center text-white max-w-2xl px-8"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <motion.h2
//           variants={childVariants}
//           className="text-4xl md:text-6xl font-bold text-center mb-6"
//         >
//           Bạn đã sẵn sàng tiến tới EES 2026 chưa?
//         </motion.h2>
//         <motion.p
//           variants={childVariants}
//           className="text-lg opacity-80 text-center mb-10"
//         >
//           {/* TODO: replace with real content */}
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//         </motion.p>
//         <motion.button
//           variants={childVariants}
//           onClick={onDone}
//           className="bg-white text-orange-600 font-bold px-10 py-4 rounded-full text-lg hover:scale-105 transition-transform shadow-xl"
//         >
//           Tôi đã sẵn sàng! 🚀
//         </motion.button>
//       </motion.div>
//     </div>
//   )
// }
