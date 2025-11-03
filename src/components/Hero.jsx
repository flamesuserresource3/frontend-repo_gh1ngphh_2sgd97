import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-80">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-white/40 to-transparent dark:from-neutral-950 dark:via-neutral-950/40 dark:to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-28">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 dark:bg-neutral-900/60 backdrop-blur px-3 py-1 text-xs border border-white/20 dark:border-neutral-800/60 shadow-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500" />
            Live 3D fintech experience
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            Track spending with style
          </h1>
          <p className="mt-5 text-neutral-700 dark:text-neutral-300 max-w-xl">
            A modern, animated expense dashboard with smooth interactions, charts, and a beautiful glassmorphism aesthetic.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#dashboard" className="pointer-events-auto inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 px-5 py-3 text-white shadow-xl">
              Get Started
            </motion.a>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#analytics" className="pointer-events-auto inline-flex items-center justify-center rounded-2xl bg-white/80 dark:bg-neutral-900/60 px-5 py-3 text-neutral-800 dark:text-neutral-100 border border-white/30 dark:border-neutral-800/60 backdrop-blur">
              View Analytics
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
