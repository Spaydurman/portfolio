import * as React from 'react';
import { motion } from 'motion/react';
import MeImage from '@/assets/images/Me.webp';
// import { useTheme } from '@/hooks/use-theme';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';

type ThreeDHoverImageProps = {
  src?: string;
  alt?: string;
  className?: string;
  /** Base pixel size (width) of the image */
  size?: number;
  /** Responsive sizing using clamp instead of fixed size */
  responsive?: boolean;
  /** Scale when hovered */
  hoverScale?: number;
  /** Max rotation (deg) on each axis */
  maxTilt?: number;
  /** Apply grayscale when dark mode */
  grayscaleInDark?: boolean;
};

// Utility to combine class names
function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export function ThreeDHoverImage({
  src = MeImage,
  alt = 'Profile image',
  className,
  size = 500,
  responsive = true,
  hoverScale = 1.06,
  maxTilt = 14,
  grayscaleInDark = true,
}: ThreeDHoverImageProps) {
  const [tilt, setTilt] = React.useState({ x: 0, y: 0, scale: 1 });
  const [isDark, setIsDark] = React.useState(false);
  const frameRef = React.useRef<number | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const imgRef = React.useRef<HTMLImageElement | null>(null);
  const [dynamicSize, setDynamicSize] = React.useState(size);
  // const { resolvedTheme } = useTheme();

  // Sync grayscale with current resolved theme
  // React.useEffect(() => {
  //   setIsDark(resolvedTheme === 'dark');
  // }, [resolvedTheme]);
  React.useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains('dark'));
    update();
    const obs = new MutationObserver(update);
    obs.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  // ResizeObserver to keep gradient matched to image width when responsive
  React.useEffect(() => {
    if (!imgRef.current || !responsive) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        setDynamicSize(Math.round(w));
      }
    });
    ro.observe(imgRef.current);
    return () => ro.disconnect();
  }, [responsive]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * maxTilt; // rotateX (invert vertical)
    const ry = ((x - cx) / cx) * maxTilt * -1; // rotateY
    // Throttle with rAF
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      setTilt({ x: rx, y: ry, scale: hoverScale });
    });
  };

  const reset = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setTilt({ x: 0, y: 0, scale: 1 });
  };

  return (
    <AnimatedThemeToggler asChild duration={700}>
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={reset}
        onPointerCancel={reset}
        className={cn(
          'relative inline-block select-none',
          'rounded-xl',
          'will-change-transform overflow-visible',
          className,
        )}
        style={{ perspective: 1200 }}
      >
        <motion.img
          ref={imgRef}
          src={src}
          alt={alt}
          draggable={false}
          animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: tilt.scale }}
          transition={{ type: 'spring', stiffness: 180, damping: 18 }}
          style={{
            transformStyle: 'preserve-3d',
            filter: grayscaleInDark && isDark ? 'grayscale(1)' : 'none',
            width: responsive ? 'clamp(240px, 55vw, 500px)' : size,
          }}
          className={cn(
          //   'rounded-xl shadow-md',
            'h-auto',
            'bg-transparent',
            'object-cover',
            'pointer-events-none',
          )}
        />
        {/* Expanded radial glow outside image bounds */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{ opacity: tilt.scale > 1 ? 0.4 : 0 }}
          transition={{ duration: 0.35 }}
          style={{
            width: responsive ? dynamicSize : size,
            height: responsive ? dynamicSize : size,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 50% 45%, var(--color-copy, rgba(255,255,255,0.85)) 0%, transparent 60%)',
            mixBlendMode: 'overlay',
          }}
        />
      </div>
    </AnimatedThemeToggler>
  );
}

export default ThreeDHoverImage;