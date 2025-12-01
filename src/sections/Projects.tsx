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
  return (
    <section id="projects" className="container-px mx-auto max-w-6xl py-20 sm:py-24 border-t border-copy/10">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl font-semibold text-copy">Projects</h2>
        <a href="#contact" className="text-sm text-copy/80 hover:text-copy">Need something built?</a>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.title} {...p} />)
        )}
      </div>
    </section>
  )
}
