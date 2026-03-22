import { motion } from 'framer-motion'

export function HeroSection({ theme }) {
  return (
    <header
      className="relative w-full overflow-hidden py-8 md:py-10 border-b transition-colors duration-700"
      style={{
        backgroundColor: 'var(--theme-surface)',
        borderColor: 'var(--theme-border)',
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          className="absolute -top-[20%] -right-[10%] w-[50%] h-[70%] rounded-full blur-[100px] transition-colors duration-700"
          style={{ backgroundColor: 'var(--theme-blur1)' }}
        ></div>
        <div
          className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full blur-[100px] transition-colors duration-700"
          style={{ backgroundColor: 'var(--theme-blur2)' }}
        ></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          key={theme.name}
          className="h-4"
        />
      </div>
    </header>
  )
}
