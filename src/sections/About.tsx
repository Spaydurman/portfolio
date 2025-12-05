import { motion } from 'motion/react'
import { useIsInView } from '@/hooks/use-is-in-view'
import HighlightPhrase from '@/components/highlight-phrase'

export default function About() {
  const { ref, isInView } = useIsInView<HTMLDivElement>(null, {
    inViewOnce: true,
    inViewMargin: '-100px'
  })
  console.log(isInView);
  return (
    <section id="about" className="container-px mx-auto max-w-6xl py-20 sm:py-24 h-screen">
      <motion.h2 
        className="text-2xl font-semibold text-copy mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        About
      </motion.h2>
      <div ref={ref} className="mt-4 max-w-full leading-relaxed">
        <motion.p 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-copy text-justify"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Full-stack developer who{' '}
          <HighlightPhrase delay={0.5} duration={0.8} active={isInView}>
            turns ideas into real and scalable products
          </HighlightPhrase>
          . Create intuitive interfaces, build reliable backend systems, and deliver solutions that{' '}
          <HighlightPhrase delay={1.3} duration={0.8} active={isInView}>
            improve user experience and help businesses grow
          </HighlightPhrase>
          .
        </motion.p>
      </div>
    </section>
  )
}
