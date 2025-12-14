type Props = {
  title: string
  description: string
  href?: string
  tags?: string[]
}

export default function ProjectCard({ title, description, href, tags }: Props) {
  const Wrapper = href ? 'a' : 'div'
  return (
    <Wrapper
      {...(href ? { href, target: '_blank', rel: 'noreferrer noopener' } : {})}
      className="group block rounded-lg border border-copy/20 p-5 hover:bg-copy/5 focus-visible:focus-ring"
    >
      <h3 className="text-base font-semibold text-copy group-hover:opacity-90">{title}</h3>
      <p className="mt-2 text-sm text-copy/70 leading-relaxed">{description}</p>
      {tags && tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-copy/10 px-2 py-1 text-xs font-medium text-copy/70"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Wrapper>
  )
}
