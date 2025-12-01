import Navbar from './components/navbar'
import Hero from './sections/hero'
import About from './sections/about'
import Projects from './sections/projects'
import Contact from './sections/contact'
import { TechStack } from './sections/tech-stack'

function App() {
  return (
    <div className="min-h-full">
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Contact />
      </main>
      <footer className="mt-24 border-t border-copy/20">
        <div className="container-px mx-auto max-w-6xl py-8 text-sm text-copy/70">
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default App
