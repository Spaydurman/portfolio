'use client';

import * as React from 'react';
import {
  LayoutGroup,
  motion,
  useAnimate,
  delay,
  type Transition,
  type AnimationSequence,
} from 'motion/react';
import { useIsInView } from '../hooks/use-is-in-view';
import {
  Tooltip,
  TooltipTrigger,
  TooltipPanel,
  type TooltipPanelProps,
} from '@/components/animate-ui/components/base/tooltip';

interface ComponentProps {
  orbitItems: OrbitItem[];
  stageSize?: number;
  imageSize?: number;
  tooltipSide?: TooltipPanelProps['side'];
  tooltipSideOffset?: TooltipPanelProps['sideOffset'];
  tooltipAlign?: TooltipPanelProps['align'];
  tooltipAlignOffset?: TooltipPanelProps['alignOffset'];
  tooltipFollowCursor?: boolean | 'x' | 'y';
}

type OrbitItem = {
  id: number;
  name: string;
  src: string;
};

const transition: Transition = {
  delay: 0,
  stiffness: 300,
  damping: 35,
  type: 'spring',
  restSpeed: 0.01,
  restDelta: 0.01,
};

const spinConfig = {
  duration: 30,
  ease: 'linear' as const,
  repeat: Infinity,
};

const qsa = (root: Element, sel: string) =>
  Array.from(root.querySelectorAll(sel));

const angleOf = (el: Element) => Number((el as HTMLElement).dataset.angle || 0);

const armOfImg = (img: Element) =>
  (img as HTMLElement).closest('[data-arm]') as HTMLElement | null;

const isSvgUrl = (url: string) => /\.svg(\?.*)?$/i.test(url);
const isInlineSvg = (src: string) => src.trim().startsWith('<svg');
const inlineSvgToDataUrl = (svg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const replaceFill = (svg: string, color: string) => {
  svg = svg.replace(/(fill\s*=\s*["'])(#0{3,6}|black)(["'])/gi, (_m, p1, _p2, p3) => `${p1}${color}${p3}`);
  svg = svg.replace(/(style\s*=\s*["'][^"']*?)fill:\s*(#0{3,6}|black)([^"']*["'])/gi, (_m, p1, _p2, p3) => `${p1}fill:${color}${p3}`);
  return svg;
};

const resolveAssetUrl = (path: string) => {
  if (/^(https?:)?\/\//i.test(path) || path.startsWith('/')) return path;
  try {
    return new URL(path, import.meta.url).href;
  } catch {
    return path;
  }
};

const svgAssets: Record<string, string> = (() => {
  const modules = import.meta.glob('../assets/images/**/*.svg', {
    eager: true,
    query: '?url',
    import: 'default',
  }) as Record<string, string>;
  const map: Record<string, string> = {};
  for (const fullPath in modules) {
    const url = modules[fullPath];
    const base = fullPath.split('/').pop() || fullPath;
    map[base.toLowerCase()] = url;
    map[fullPath.toLowerCase()] = url;
  }
  return map;
})();

const resolveSvgMaybeByName = (src: string) => {
  const key = src.toLowerCase();
  if (svgAssets[key]) return svgAssets[key];
  const justName = key.split('?')[0];
  const hit = svgAssets[justName];
  if (hit) return hit;
  const basename = justName.split('/').pop();
  if (basename && svgAssets[basename]) return svgAssets[basename];
  return src;
};

// interface BaseTooltipDemoProps {
//   side: TooltipPanelProps['side'];
//   sideOffset: TooltipPanelProps['sideOffset'];
//   align: TooltipPanelProps['align'];
//   alignOffset: TooltipPanelProps['alignOffset'];
//   followCursor?: boolean | 'x' | 'y';
// }

function RadialIntro({
  orbitItems,
  stageSize = 320,
  imageSize = 60,
  tooltipSide = 'top',
  tooltipSideOffset = 8,
  tooltipAlign = 'center',
  tooltipAlignOffset = 0,
  tooltipFollowCursor = 'x',
}: ComponentProps) {
    const total = orbitItems.length;
    const outerCount = Math.max(1, Math.ceil((total * 2) / 3));
    const innerCount = Math.max(0, total - outerCount);
    const outerStep = 360 / outerCount;
    const innerStep = innerCount > 0 ? 360 / innerCount : 0;
  const imagePadding = Math.round(imageSize * 0.20);
  const [scope, animate] = useAnimate();
  const { ref: inViewRef, isInView } = useIsInView(scope, { inViewOnce: false, inViewMargin: '-10% 0px' });

  const controllersRef = React.useRef({
    outerArms: [] as unknown[],
    innerArms: [] as unknown[],
    outerImgs: [] as unknown[],
    innerImgs: [] as unknown[],
  });

  React.useEffect(() => {
    const root = document.documentElement;
    const el = scope.current;
    if (!el) return;

    if (!document.getElementById('radial-dark-style')) {
      const style = document.createElement('style');
      style.id = 'radial-dark-style';
      style.textContent = `
        [data-radial-root] [data-arm-image] { transition: filter 300ms ease, opacity 300ms ease; }
        /* Dark mode: default grayscale, hover to original color */
        [data-radial-root][data-radial-dark="1"] [data-arm-image] { filter: grayscale(100%); }
        [data-radial-root][data-radial-dark="1"] [data-arm-image]:hover { filter: none; }
        /* Light mode: default color, hover to grayscale for images we did NOT process
           (processed images are swapped via JS to a blue hover src, so exclude them) */
        [data-radial-root][data-radial-dark="0"] [data-arm-image]:not([data-radial-processed="1"]):hover { filter: grayscale(100%); }
      `;
      document.head.appendChild(style);
    }

    (el as Element).setAttribute('data-radial-root', '');

    const apply = () => {
      const dark = root.classList.contains('dark');
      (el as Element).setAttribute('data-radial-dark', dark ? '1' : '0');
    };

    apply();
    const obs = new MutationObserver(apply);
    obs.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, [scope]);

  React.useEffect(() => {
    const root = scope.current;
    if (!root) return;

    const outerArms = qsa(root, '[data-arm][data-ring="outer"]');
    const innerArms = qsa(root, '[data-arm][data-ring="inner"]');
    const outerImgs = qsa(root, '[data-arm-image][data-ring="outer"]') as HTMLElement[];
    const innerImgs = qsa(root, '[data-arm-image][data-ring="inner"]') as HTMLElement[];

    controllersRef.current.outerArms = [];
    controllersRef.current.innerArms = [];
    controllersRef.current.outerImgs = [];
    controllersRef.current.innerImgs = [];

    type CtrlLike = { pause?: () => void; play?: () => void; start?: () => void; cancel?: () => void };
    const tryPause = (ctrl: unknown) => {
      try {
        const c = ctrl as CtrlLike;
        if (c && typeof c.pause === 'function') return c.pause();
        if (c && typeof c.cancel === 'function') return c.cancel();
      } catch (err) {
        console.debug('pause error', err);
      }
    };
    const tryPlay = (ctrl: unknown) => {
      try {
        const c = ctrl as CtrlLike;
        if (c && typeof c.play === 'function') return c.play();
        if (c && typeof c.start === 'function') return c.start();
      } catch (err) {
        console.debug('play error', err);
      }
    };

    if (!isInView) {
      [...controllersRef.current.outerArms, ...controllersRef.current.innerArms, ...controllersRef.current.outerImgs, ...controllersRef.current.innerImgs].forEach(tryPause);
      return;
    }

    const stops: Array<() => void> = [];

    const innerTop = Math.round(stageSize * 0.18);
    delay(() => {
      animate(outerImgs, { top: 0 }, transition);
      if (innerImgs.length) animate(innerImgs, { top: innerTop }, transition);
    }, 250);

    const orbitPlacementSequence: AnimationSequence = [
      ...outerArms.map(
        (el): [Element, Record<string, unknown>, Record<string, unknown>] => [
          el,
          { rotate: angleOf(el) },
          { ...transition, at: 0 },
        ],
      ),
      ...innerArms.map(
        (el): [Element, Record<string, unknown>, Record<string, unknown>] => [
          el,
          { rotate: angleOf(el) },
          { ...transition, at: 0 },
        ],
      ),
      ...outerImgs.map(
        (img): [Element, Record<string, unknown>, Record<string, unknown>] => [
          img,
          { rotate: -angleOf(armOfImg(img)!), opacity: 1 },
          { ...transition, at: 0 },
        ],
      ),
      ...innerImgs.map(
        (img): [Element, Record<string, unknown>, Record<string, unknown>] => [
          img,
          { rotate: -angleOf(armOfImg(img)!), opacity: 1 },
          { ...transition, at: 0 },
        ],
      ),
    ];

    delay(() => animate(orbitPlacementSequence), 700);

    delay(() => {
      const durationMs = (spinConfig.duration || 30) * 1000;
      const easing = (spinConfig.ease as string) || 'linear';
      const outerHovered = outerImgs.some((img) => img.matches(':hover'));
      const innerHovered = innerImgs.some((img) => img.matches(':hover'));

      outerArms.forEach((el) => {
        const angle = angleOf(el);
        const node = el as Element as HTMLElement;
        const anim = node.animate(
          [
            { transform: `rotate(${angle}deg)` },
            { transform: `rotate(${angle + 360}deg)` },
          ],
          { duration: durationMs, iterations: Infinity, easing },
        );
        controllersRef.current.outerArms.push(anim as unknown);
        if (outerHovered) tryPause(anim as unknown);
        stops.push(() => { tryPause(anim as unknown); if (typeof anim.cancel === 'function') (anim as Animation).cancel(); });
      });

      innerArms.forEach((el) => {
        const angle = angleOf(el);
        const node = el as Element as HTMLElement;
        const anim = node.animate(
          [
            { transform: `rotate(${angle}deg)` },
            { transform: `rotate(${angle - 360}deg)` },
          ],
          { duration: durationMs, iterations: Infinity, easing },
        );
        controllersRef.current.innerArms.push(anim as unknown);
        if (innerHovered) tryPause(anim as unknown);
        stops.push(() => { tryPause(anim as unknown); if (typeof anim.cancel === 'function') (anim as Animation).cancel(); });
      });

      outerImgs.forEach((img) => {
        const arm = armOfImg(img);
        const angle = arm ? angleOf(arm) : 0;
        const node = img as HTMLElement;
        const anim = node.animate(
          [
            { transform: `rotate(${-angle}deg)` },
            { transform: `rotate(${-angle - 360}deg)` },
          ],
          { duration: durationMs, iterations: Infinity, easing },
        );
        controllersRef.current.outerImgs.push(anim as unknown);
        if (outerHovered) tryPause(anim as unknown);
        stops.push(() => { tryPause(anim as unknown); if (typeof anim.cancel === 'function') (anim as Animation).cancel(); });
      });

      innerImgs.forEach((img) => {
        const arm = armOfImg(img);
        const angle = arm ? angleOf(arm) : 0;
        const node = img as HTMLElement;
        const anim = node.animate(
          [
            { transform: `rotate(${-angle}deg)` },
            { transform: `rotate(${-angle + 360}deg)` },
          ],
          { duration: durationMs, iterations: Infinity, easing },
        );
        controllersRef.current.innerImgs.push(anim as unknown);
        if (innerHovered) tryPause(anim as unknown);
        stops.push(() => { tryPause(anim as unknown); if (typeof anim.cancel === 'function') (anim as Animation).cancel(); });
      });
    }, 1300);

    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const ring = (el.getAttribute('data-ring') || 'outer') as 'outer' | 'inner';
      const ctrlsArms = controllersRef.current[ring === 'outer' ? 'outerArms' : 'innerArms'];
      const ctrlsImgs = controllersRef.current[ring === 'outer' ? 'outerImgs' : 'innerImgs'];
      [...ctrlsArms, ...ctrlsImgs].forEach(tryPause);
    };
    const onLeave = (e: Event) => {
      if (!isInView) return;
      const el = e.currentTarget as HTMLElement;
      const ring = (el.getAttribute('data-ring') || 'outer') as 'outer' | 'inner';
      const ctrlsArms = controllersRef.current[ring === 'outer' ? 'outerArms' : 'innerArms'];
      const ctrlsImgs = controllersRef.current[ring === 'outer' ? 'outerImgs' : 'innerImgs'];
      [...ctrlsArms, ...ctrlsImgs].forEach(tryPlay);
    };

    outerImgs.forEach((img) => {
      img.addEventListener('mouseenter', onEnter);
      img.addEventListener('mouseleave', onLeave);
    });
    innerImgs.forEach((img) => {
      img.addEventListener('mouseenter', onEnter);
      img.addEventListener('mouseleave', onLeave);
    });

    const outerArmsCpy = controllersRef.current.outerArms.slice();
    const innerArmsCpy = controllersRef.current.innerArms.slice();
    const outerImgsCpy = controllersRef.current.outerImgs.slice();
    const innerImgsCpy = controllersRef.current.innerImgs.slice();

    return () => {
      stops.forEach((stop) => stop());
      outerImgs.forEach((img) => {
        img.removeEventListener('mouseenter', onEnter);
        img.removeEventListener('mouseleave', onLeave);
      });
      innerImgs.forEach((img) => {
        img.removeEventListener('mouseenter', onEnter);
        img.removeEventListener('mouseleave', onLeave);
      });
      [...outerArmsCpy, ...innerArmsCpy, ...outerImgsCpy, ...innerImgsCpy].forEach(tryPause);
    };
  }, [animate, scope, stageSize, isInView]);

  React.useEffect(() => {
    const root = scope.current;
    if (!root) return;

    const imgs = qsa(root, '[data-arm-image]') as HTMLElement[];
    type RadialNode = HTMLElement & {
      __radial_listeners?: { onEnter: EventListenerOrEventListenerObject; onLeave: EventListenerOrEventListenerObject };
    };
    const sources = new Map<HTMLElement, {
      defaultLight: string;
      defaultDark: string;
      hoverLight: string;
      hoverDark: string;
    }>();

    let cancelled = false;

    const processImg = async (img: HTMLElement) => {
      const srcAttr = img.getAttribute('data-src') || '';
      if (!srcAttr) return;
      if (!isInlineSvg(srcAttr) && !isSvgUrl(srcAttr)) return;

      let svgText = '';
      if (isInlineSvg(srcAttr)) {
        svgText = srcAttr;
      } else {
        const resolved = resolveAssetUrl(resolveSvgMaybeByName(srcAttr));
        try {
          const r = await fetch(resolved);
          if (!r.ok) throw new Error('fetch failed');
          svgText = await r.text();
        } catch {
          return;
        }
      }

      if (cancelled) return;

      const defaultLight = inlineSvgToDataUrl(svgText);
      const defaultDark = inlineSvgToDataUrl(replaceFill(svgText, '#ffffff'));
      const hoverLight = inlineSvgToDataUrl(replaceFill(svgText, '#0000ff'));
      const hoverDark = inlineSvgToDataUrl(replaceFill(svgText, '#ff0000'));

      sources.set(img, { defaultLight, defaultDark, hoverLight, hoverDark });

      const darkNow = document.documentElement.classList.contains('dark');
      (img as HTMLImageElement).src = darkNow ? defaultDark : defaultLight;

      const onEnter = () => {
        const s = sources.get(img);
        if (!s) return;
        const dark = document.documentElement.classList.contains('dark');
        (img as HTMLImageElement).src = dark ? s.hoverDark : s.hoverLight;
      };
      const onLeave = () => {
        const s = sources.get(img);
        if (!s) return;
        const dark = document.documentElement.classList.contains('dark');
        (img as HTMLImageElement).src = dark ? s.defaultDark : s.defaultLight;
      };

      img.addEventListener('mouseenter', onEnter);
      img.addEventListener('mouseleave', onLeave);

      (img as RadialNode).__radial_listeners = { onEnter, onLeave };
    };

    imgs.forEach((img) => void processImg(img));

    const rootDoc = document.documentElement;
    const onThemeChange = () => {
      const dark = rootDoc.classList.contains('dark');
      for (const [img, s] of sources.entries()) {
        (img as HTMLImageElement).src = dark ? s.defaultDark : s.defaultLight;
      }
    };
    const obs = new MutationObserver(onThemeChange);
    obs.observe(rootDoc, { attributes: true, attributeFilter: ['class'] });

    return () => {
      cancelled = true;
      obs.disconnect();
      imgs.forEach((img) => {
        const node = img as RadialNode;
        const l = node.__radial_listeners;
        if (l) {
          img.removeEventListener('mouseenter', l.onEnter);
          img.removeEventListener('mouseleave', l.onLeave);
          delete node.__radial_listeners;
        }
      });
      sources.clear();
    };
  }, [scope]);

  return (
    <LayoutGroup>
      <motion.div
        ref={inViewRef}
        className="relative overflow-visible"
        style={{ width: stageSize, height: stageSize }}
        initial={false}
      >
        {orbitItems.slice(0, outerCount).map((item, i) => (
          <motion.div
            key={item.id}
            data-arm
            data-ring="outer"
            className="will-change-transform absolute inset-0 pointer-events-none"
            style={{ zIndex: orbitItems.length - i }}
            data-angle={i * outerStep}
            layoutId={`arm-${item.id}`}
          >
            {(() => {
              const src = isInlineSvg(item.src)
                ? inlineSvgToDataUrl(item.src)
                : isSvgUrl(item.src)
                ? resolveAssetUrl(resolveSvgMaybeByName(item.src))
                : item.src;
              return (
                <Tooltip followCursor={tooltipFollowCursor}>
                  <TooltipTrigger
                    render={
                      <motion.img
                        data-arm-image
                        data-src={item.src}
                        data-ring="outer"
                        className={`absolute left-1/2 top-1/2 aspect-square translate -translate-x-1/2 pointer-events-auto ${isInlineSvg(item.src) || isSvgUrl(item.src) ? 'object-contain' : 'object-cover'}`}
                        style={{
                          width: imageSize + imagePadding * 2,
                          height: imageSize + imagePadding * 2,
                          padding: imagePadding,
                          boxSizing: 'border-box',
                          opacity: i === 0 ? 1 : 0,
                        }}
                        src={src}
                        alt={item.name}
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                        layoutId={`arm-img-${item.id}`}
                      />
                    }
                  />
                  <TooltipPanel
                    side={tooltipSide}
                    sideOffset={tooltipSideOffset}
                    align={tooltipAlign}
                    alignOffset={tooltipAlignOffset}
                  >
                    <p>{item.name}</p>
                  </TooltipPanel>
                </Tooltip>
              );
            })()}
          </motion.div>
        ))}
        {innerCount > 0 &&
          orbitItems.slice(outerCount).map((item, j) => (
            <motion.div
              key={item.id}
              data-arm
              data-ring="inner"
              className="will-change-transform absolute inset-0 pointer-events-none"
              style={{ zIndex: orbitItems.length - (outerCount + j) }}
              data-angle={j * innerStep}
              layoutId={`arm-${item.id}`}
            >
              <Tooltip followCursor={tooltipFollowCursor}>
                <TooltipTrigger
                  render={
                    <motion.img
                      data-arm-image
                      data-src={item.src}
                      data-ring="inner"
                      className={`absolute left-1/2 top-1/2 aspect-square translate -translate-x-1/2 pointer-events-auto ${isSvgUrl(item.src) ? 'object-contain' : 'object-cover'}`}
                      style={{
                        width: imageSize + imagePadding * 2,
                        height: imageSize + imagePadding * 2,
                        padding: imagePadding,
                        boxSizing: 'border-box',
                        opacity: j === 0 ? 1 : 0,
                      }}
                      src={isInlineSvg(item.src)
                        ? inlineSvgToDataUrl(item.src)
                        : isSvgUrl(item.src)
                        ? resolveAssetUrl(resolveSvgMaybeByName(item.src))
                        : item.src}
                      alt={item.name}
                      draggable={false}
                      loading="lazy"
                      decoding="async"
                      layoutId={`arm-img-${item.id}`}
                    />
                  }
                />
                <TooltipPanel
                  side={tooltipSide}
                  sideOffset={tooltipSideOffset}
                  align={tooltipAlign}
                  alignOffset={tooltipAlignOffset}
                >
                  <p>{item.name}</p>
                </TooltipPanel>
              </Tooltip>
            </motion.div>
          ))}
      </motion.div>
    </LayoutGroup>
  );
}

export { RadialIntro };