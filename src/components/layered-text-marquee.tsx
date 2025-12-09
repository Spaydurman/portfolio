import { motion, useAnimation } from 'framer-motion';
import { useIsInView } from '@/hooks/use-is-in-view';
import * as React from 'react';

type LayeredTextMarqueeProps = {
  text: string;
  className?: string;
};

function cx(...classes: Array<string | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export default function LayeredTextMarquee({ text, className }: LayeredTextMarqueeProps) {

  const seamlessLoop = React.useMemo(() => ({
    duration: 60,
    times: [0, 0.1, 1], // Fast for first 10%, slow for remaining 90%
    ease: 'easeOut' as const,
    repeat: Infinity,
    repeatType: 'loop' as const,
  }), [])

  const duplicatedText = `${text}     ${text}`;

  const { ref, isInView } = useIsInView<HTMLDivElement>(null, { inViewOnce: false, inViewMargin: '-200px' })

  const controls1 = useAnimation()
  const controls2 = useAnimation()
  const controls3 = useAnimation()

  React.useEffect(() => {
    if (isInView) {
      controls1.start({ x: ['0%', '-50%'], transition: seamlessLoop })
      controls2.start({ x: ['-50%', '0%'], transition: seamlessLoop })
      controls3.start({ x: ['0%', '-50%'], transition: seamlessLoop })
    } else {
      // stop animations to save CPU, and reset positions
      controls1.stop(); controls1.set({ x: '0%' })
      controls2.stop(); controls2.set({ x: '-50%' })
      controls3.stop(); controls3.set({ x: '0%' })
    }
  }, [isInView, controls1, controls2, controls3, seamlessLoop])

  return (
    <div ref={ref} className={cx('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
      <div className="absolute inset-0 grid grid-rows-3" aria-hidden="true">
        <div className="flex items-center justify-start w-full h-full overflow-hidden">
          <motion.div
            className="whitespace-nowrap font-black tracking-tight leading-none select-none bg-linear-to-br from-copy/8 via-copy/12 to-copy/8 bg-clip-text text-transparent opacity-100 filter-[blur(0.5px)] text-[clamp(2rem,12vh,16vh)]"
            animate={controls1}
          >
            {duplicatedText}
          </motion.div>
        </div>

        <div className="flex items-center justify-start w-full h-full overflow-hidden">
          <motion.div
            className="whitespace-nowrap font-black tracking-tight leading-none select-none text-transparent opacity-100 text-[clamp(2.2rem,13vh,17vh)] [-webkit-text-stroke:2px_var(--text)] [text-stroke:2px_var(--text)] filter-[drop-shadow(0_0_20px_var(--text))]"
            style={{ opacity: 0.15 }}
            animate={controls2}
          >
            {duplicatedText}
          </motion.div>
        </div>

        <div className="flex items-center justify-start w-full h-full overflow-hidden">
          <motion.div
            className="whitespace-nowrap font-black tracking-tight leading-none select-none text-[clamp(2rem,11vh,15vh)]"
            style={{
              background: 'linear-gradient(to bottom, var(--text), transparent)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              opacity: 0.06,
            }}
            animate={controls3}
          >
            {duplicatedText}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
