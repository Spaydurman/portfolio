import * as React from 'react'
import { motion } from 'motion/react'

type HighlightPhraseProps = {
  children: React.ReactNode
  delay?: number
  duration?: number
  active?: boolean
  anchorLine?: number // 0 = first line, 1 = second line, etc.
  verticalOffset?: number // positive moves down, negative moves up
}

export function HighlightPhrase({ children, delay = 0.5, duration = 0.7, active = false, anchorLine = 0, verticalOffset = 3 }: HighlightPhraseProps) {
  const wrapperRef = React.useRef<HTMLSpanElement>(null)
  const containerRef = React.useRef<HTMLSpanElement>(null)
  const [rects, setRects] = React.useState<Array<{ top: number; left: number; width: number; height: number; barHeight?: number }>>([])
  console.log(active);
  React.useLayoutEffect(() => {
    const el = containerRef.current
    const wrapper = wrapperRef.current
    if (!el || !wrapper) return

    let mounted = true

    const measure = () => {
      if (!mounted) return
      const range = document.createRange()
      range.selectNodeContents(el)
      const clientRects = Array.from(range.getClientRects())
      const parent = wrapper.getBoundingClientRect()
      const anchor = clientRects[Math.min(anchorLine, clientRects.length - 1)] || parent
      const anchorTop = anchor.top ?? parent.top
      const anchorLeft = anchor.left ?? parent.left
      const nextRects = clientRects.map(r => {
        const height = r.height
        const barHeight = Math.max(height - 18, height * 0.8)
        return ({
          top: r.top - anchorTop,
          left: r.left - anchorLeft,
          width: r.width,
          height,
          barHeight,
        })
      })
      setRects(nextRects)
    }

    // Debounced measure to avoid excessive recalculations during resize/DOM churn
    let raf = 0
    const scheduleMeasure = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => measure())
    }

    // initial measure
    measure()

    const ro = new ResizeObserver(() => scheduleMeasure())
    ro.observe(wrapper)

    // watch for DOM mutations inside the text (words changing, spacing)
    const mo = new MutationObserver(() => scheduleMeasure())
    mo.observe(el, { characterData: true, childList: true, subtree: true })

    // also re-measure on window resize and font load
    const onResize = () => scheduleMeasure()
    window.addEventListener('resize', onResize)
    const docWithFonts = document as Document & { fonts?: { ready?: Promise<void> } }
    if (docWithFonts.fonts?.ready && typeof docWithFonts.fonts.ready.then === 'function') {
      docWithFonts.fonts.ready.then(() => scheduleMeasure()).catch(() => {})
    }

    // cleanup
    return () => {
      mounted = false
      ro.disconnect()
      mo.disconnect()
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
    }
  }, [anchorLine])

  return (
    <span ref={wrapperRef} className="relative inline align-baseline">
      {/* Bars behind text for each line */}
      <span className="absolute inset-0 pointer-events-none z-0" aria-hidden>
        {rects.map((r, i) => {
          const baseTop = r.top + ((r.height - (r.barHeight ?? r.height)) / 2) + verticalOffset
          const baseStyle = { top: baseTop, left: r.left, height: r.barHeight ?? r.height, width: r.width, transformOrigin: 'left' } as React.CSSProperties
          return (
            <React.Fragment key={i}>
              <span aria-hidden className="absolute bg-highlight" style={{ ...baseStyle, opacity: 0.12, zIndex: 0 }} />
              <motion.span
                className="absolute bg-highlight"
                style={{ ...baseStyle, zIndex: 1 }}
                initial={{ scaleX: 0 }}
                animate={active ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration, delay: delay + i * (duration * 0.6), ease: 'easeInOut' }}
              />
            </React.Fragment>
          )
        })}
      </span>
      {/* Actual text */}
      <motion.span
        ref={containerRef}
        className="relative z-10"
        initial={{ color: 'var(--color-copy)' }}
        animate={{ color: active ? 'var(--color-highlight-text)' : 'var(--color-copy)' }}
        transition={{ duration: 0.3, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default HighlightPhrase
