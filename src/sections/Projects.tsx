import { motion } from 'motion/react'
import { useIsInView } from '@/hooks/use-is-in-view'
import ProjectCard from '../components/project-card'

const projects = [
  {
    title: 'Minimal Portfolio',
    description: 'A minimalist portfolio built with React, TypeScript, and Tailwind.',
    href: '#'
  },
  {
    title: 'Design System Tokens',
    description: 'Color tokens and components with light/dark themes.',
    href: '#'
  },
  {
    title: 'Landing Page',
    description: 'Clean, responsive landing page focused on clarity and speed.',
    href: '#'
  }
]

export default function Projects() {
  const { ref, isInView } = useIsInView<HTMLDivElement>(null, {
    inViewOnce: true,
    inViewMargin: '-100px'
  })

  return (
    <section id="projects" className="container-px mx-auto max-w-7xl py-32 sm:py-40 min-h-screen flex flex-col justify-center">
      <div className="space-y-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-4 mb-8">
            <motion.div
              className="h-px bg-linear-to-r from-transparent via-copy/20 to-transparent flex-1"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <h2 className="text-sm uppercase tracking-[0.3em] font-medium text-copy/60">Featured Project</h2>
            <motion.div
              className="h-px bg-linear-to-r from-transparent via-copy/20 to-transparent flex-1"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          
          <div className="flex items-end justify-between gap-4">
            <motion.p
              className="text-lg text-copy/70 max-w-2xl"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              A curated collection of projects that showcase creativity, technical skill, and attention to detail.
            </motion.p>
            <motion.a
              href="#contact"
              className="text-sm text-copy/60 hover:text-copy transition-colors whitespace-nowrap border-b border-copy/20 hover:border-copy/60 pb-0.5"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Let's collaborate →
            </motion.a>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div ref={ref} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
              transition={{
                duration: 0.7,
                delay: 0.5 + index * 0.2,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>

        {/* Bottom Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex justify-center pt-8"
        >
          <div className="h-16 w-px bg-linear-to-b from-copy/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
