export default function Hero() {
  return (
    <section id="home" className="container-px mx-auto max-w-6xl py-24 sm:py-28">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-copy">Hi, I’m Your Name.</h1>
      <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-copy/80">
        I build clean, minimal web experiences. This portfolio showcases selected work and a bit about me.
      </p>
      <div className="mt-8 flex gap-3">
        <a href="#projects" className="rounded-md border border-copy/20 bg-copy px-4 py-2 text-sm font-medium text-surface hover:opacity-90 focus-visible:focus-ring">View Projects</a>
        <a href="#contact" className="rounded-md border border-copy/30 px-4 py-2 text-sm font-medium text-copy hover:bg-copy/5 focus-visible:focus-ring">Contact Me</a>
      </div>
    </section>
  )
}
