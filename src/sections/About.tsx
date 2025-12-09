import { motion } from 'motion/react'
import { useIsInView } from '@/hooks/use-is-in-view'
import HighlightPhrase from '@/components/highlight-phrase'

export default function About() {
  const { ref, isInView } = useIsInView<HTMLDivElement>(null, {
    inViewOnce: true,
    inViewMargin: '-100px'
  })

  return (
    <section id="about" className="container-px mx-auto max-w-7xl py-32 sm:py-40 min-h-screen flex flex-col justify-center">
      <div className="space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-2"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className="h-px bg-linear-to-r from-transparent via-copy/20 to-transparent flex-1"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <h2 className="text-sm uppercase tracking-[0.3em] font-medium text-copy/60">About</h2>
            <motion.div
              className="h-px bg-linear-to-r from-transparent via-copy/20 to-transparent flex-1"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        </motion.div>

        <div ref={ref} className="max-w-6xl mx-auto">
          <motion.p 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-copy leading-tight tracking-tight text-center"
            style={{ lineHeight: 1.35 }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Full-stack developer who{' '}
            <HighlightPhrase delay={0.6} duration={1} active={isInView}>
              turns ideas into real and scalable products
            </HighlightPhrase>
            . Create intuitive interfaces, build reliable backend systems, and deliver solutions that{' '}
            <HighlightPhrase delay={1.5} duration={1} active={isInView}>
              improve user experience and help businesses grow
            </HighlightPhrase>
            .
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="flex justify-center"
        >
          <div className="h-16 w-px bg-linear-to-b from-copy/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
