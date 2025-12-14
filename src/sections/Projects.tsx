import { motion } from 'motion/react'
import { useIsInView } from '@/hooks/use-is-in-view'
import ProjectCard from '../components/project-card'

const projects = [
  {
    title: 'Order Process API',
    description: 'A system to manage, allocate and track customer orders efficiently.',
    href: '#',
    tags: ['Php', 'Laravel', 'Microsoft SQL']
  },
  {
    title: 'Payroll Management System',
    description: 'A website that handle employee time-in and time-out, salary, benefits, bonuses, and deductions.',
    href: '#',
    tags: ['Php', 'Laravel', 'Bootstrap', 'MySQL', 'Nginx']
  },
  {
    title: 'Partner Web Service',
    description: 'A web service for partner to view the onboarded and opportunity licenses.',
    href: '#',
    tags: ['Php', 'Laravel', 'Vue', 'Figma', 'Microsoft Sql']
  },
  {
    title: 'Marketplace',
    description: 'An e-commerce website for buying and selling products online.',
    href: '#',
    tags: ['C#', '.Net', 'Bootstrap', 'Figma']
  },
  {
    title: 'QR and Barcode Generator API',
    description: 'An API to generate QR codes and barcodes for various applications.',
    href: '#',
    tags: ['Php', 'Laravel', 'Microsoft Sql']
  },
  {
    title: 'Deal Registration Portal',
    description: 'A portal for partners to register deals and track their status.',
    href: '#',
    tags: ['Php', 'Laravel', 'Vue', 'Figma', 'Microsoft Sql']
  },
  {
    title: 'Event Registration',
    description: 'A web application to manage event details, registrations, attendees, and schedules.',
    href: '#',
    tags: ['Php', 'Laravel', 'React', 'Tailwind', 'Three js', 'Figma', 'MySql', 'Railway']
  },
  {
    title: 'QR Claim System',
    description: 'A web application that allows users to claim rewards using QR codes, create claim records, and manage redemptions.',
    href: '#',
    tags: ['Php', 'Laravel', 'React', 'Tailwind', 'Figma', 'Microsoft Sql', 'Python']
  },
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
