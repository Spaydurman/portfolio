import Navbar from './components/navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
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
          © {new Date().getFullYear()} Clark Velasco. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default App
