export default function Contact() {
  return (
    <section id="contact" className="container-px mx-auto max-w-6xl py-20 sm:py-24 border-t border-copy/10">
      <h2 className="text-2xl font-semibold text-copy">Contact</h2>
      <p className="mt-4 max-w-2xl text-copy/80">Want to collaborate or have a project in mind? Reach out:</p>
      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
        <a href="mailto:you@example.com" className="rounded-md border border-copy/30 px-4 py-2 text-copy hover:bg-copy/5 focus-visible:focus-ring">you@example.com</a>
        <a href="#" className="rounded-md border border-copy/30 px-4 py-2 text-copy hover:bg-copy/5 focus-visible:focus-ring">LinkedIn</a>
        <a href="#" className="rounded-md border border-copy/30 px-4 py-2 text-copy hover:bg-copy/5 focus-visible:focus-ring">GitHub</a>
      </div>
    </section>
  )
}
