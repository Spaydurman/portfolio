'use client';

import { motion } from 'motion/react';
import { useIsInView } from '@/hooks/use-is-in-view';
import {
  ShareButton,
} from '@/components/animate-ui/components/community/share-button';

export default function Contact() {
  const { ref, isInView } = useIsInView<HTMLDivElement>(null, {
    inViewOnce: true,
    inViewMargin: '-100px',
  });

  const handleIconClick = (platform: 'github' | 'x' | 'facebook') => {
    console.log(`Clicked ${platform}`);
    // Add your share logic here
  };

  return (
    <section id="contact" className="container-px mx-auto max-w-6xl py-20 sm:py-24 border-copy/10">
      <div ref={ref} className="flex flex-col items-center justify-center text-center space-y-8 max-w-3xl mx-auto h-screen">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-copy leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Let's work together on your next project
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-copy/70 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Have an idea in mind? Let's collaborate and bring it to life.
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <ShareButton size="lg" onIconClick={handleIconClick}>
            Contact Me
          </ShareButton>
        </motion.div>
      </div>
    </section>
  )
}
