// import { useEffect, useState } from 'react'

import ThemeTogglerButton from '@/components/animate-ui/components/buttons/theme-toggler'
// import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
// function ThemeToggle() {
//   const [isDark, setIsDark] = useState<boolean>(() => {
//     if (typeof window === 'undefined') return false
//     const stored = localStorage.getItem('theme')
//     if (stored) return stored === 'dark'
//     return window.matchMedia('(prefers-color-scheme: dark)').matches
//   })

//   useEffect(() => {
//     const root = document.documentElement
//     if (isDark) {
//       root.classList.add('dark')
//       localStorage.setItem('theme', 'dark')
//     } else {
//       root.classList.remove('dark')
//       localStorage.setItem('theme', 'light')
//     }
//   }, [isDark])

//   return (
//     <button
//       type="button"
//       className="inline-flex items-center gap-2 rounded-md border border-copy/20 px-3 py-1.5 text-sm text-copy hover:bg-copy/5 focus-visible:focus-ring"
//       onClick={() => setIsDark((v) => !v)}
//       aria-pressed={isDark}
//       aria-label="Toggle dark mode"
//       title="Toggle theme"
//     >
//       <span className="sr-only">Toggle theme</span>
//       {isDark ? (
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
//           <path d="M21.64 13.02A9 9 0 0 1 11 2.36a1 1 0 0 0-1.37 1.13A7 7 0 0 0 12 21a7 7 0 0 0 9.51-6.49 1 1 0 0 0-.87-.99Z" />
//         </svg>
//       ) : (
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
//           <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 0 1-1v-1a1 1 0 1 0-2 0v1a1 1 0 0 0 1 1Zm0-18a1 1 0 0 0 1-1V2a1 1 0 1 0-2 0v1a1 1 0 0 0 1 1Zm10 7h-1a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2ZM3 12H2a1 1 0 1 0 0 2h1a1 1 0 1 0 0-2Zm16.95 6.36-0.7-0.7a1 1 0 1 0-1.42 1.42l0.7 0.7a1 1 0 0 0 1.42-1.42ZM5.17 5.17l-0.7-0.7A1 1 0 0 0 3.05 5.9l0.7 0.7A1 1 0 0 0 5.17 5.17ZM18.83 5.17l0.7-0.7A1 1 0 0 0 18.11 3.05l-0.7 0.7a1 1 0 1 0 1.42 1.42ZM5.17 18.83l-0.7 0.7A1 1 0 1 0 5.9 20.95l0.7-0.7a1 1 0 1 0-1.42-1.42Z" />
//         </svg>
//       )}
//       <span className="hidden sm:inline">{isDark ? 'Dark' : 'Light'}</span>
//     </button>
//   )
// }

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur">
      <div className="container-px mx-auto flex max-w-6xl items-center justify-between py-4">
        <a href="#home" className="text-base font-semibold text-copy">Your Name</a>
        <nav className="flex items-center gap-4 text-sm">
          <a className="text-copy/80 hover:text-copy" href="#about">About</a>
          <a className="text-copy/80 hover:text-copy" href="#projects">Projects</a>
          <a className="text-copy/80 hover:text-copy" href="#contact">Contact</a>
          {/* <ThemeToggle /> */}
          <ThemeTogglerButton />
          {/* <AnimatedThemeToggler /> */}
        </nav>
      </div>
    </header>
  )
}
