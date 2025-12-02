import { motion } from 'framer-motion';

type LayeredTextMarqueeProps = {
  text: string;
  className?: string;
};

function cx(...classes: Array<string | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export default function LayeredTextMarquee({ text, className }: LayeredTextMarqueeProps) {

  const seamlessLoop = {
    duration: 60,
    times: [0, 0.1, 1], // Fast for first 10%, slow for remaining 90%
    ease: 'easeOut' as const,
    repeat: Infinity,
    repeatType: 'loop' as const,
  };

  const duplicatedText = `${text}     ${text}`;

  return (
    <div className={cx('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
      <div className="absolute inset-0 grid grid-rows-3" aria-hidden="true">
        <div className="flex items-center justify-start w-full h-full overflow-hidden">
          <motion.div
            className="whitespace-nowrap font-extrabold tracking-tight leading-none select-none text-transparent opacity-15 [text-shadow:0_2px_20px_rgba(0,0,0,0.1)] text-[clamp(2rem,12vh,16vh)] [-webkit-text-stroke:4px_var(--text)]"
            animate={{ x: ['0%', '-50%'] }}
            transition={seamlessLoop}
          >
            {duplicatedText}
          </motion.div>
        </div>

        <div className="flex items-center justify-start w-full h-full overflow-hidden">
          <motion.div
            className="whitespace-nowrap font-extrabold tracking-tight leading-none select-none text-transparent opacity-25 text-[clamp(2.2rem,13vh,17vh)] [-webkit-text-stroke:4px_var(--text)]"
            animate={{ x: ['-50%', '0%'] }}
            transition={seamlessLoop}
          >
            {duplicatedText}
          </motion.div>
        </div>

        <div className="flex items-center justify-start w-full h-full overflow-hidden">
          <motion.div
            className="whitespace-nowrap font-extrabold tracking-tight leading-none select-none text-transparent [-webkit-text-stroke:3px_var(--text)] text-[clamp(2rem,11vh,15vh)] mask-[linear-gradient(to_top,transparent_0%,black_0%)] [-webkit-mask-image:linear-gradient(to_top,transparent_0%,black_100%)]"
            animate={{ x: ['0%', '-50%'] }}
            transition={seamlessLoop}
          >
            {duplicatedText}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
