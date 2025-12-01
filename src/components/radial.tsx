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

interface ComponentProps {
  orbitItems: OrbitItem[];
  stageSize?: number;
  imageSize?: number;
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

function RadialIntro({
  orbitItems,
  stageSize = 320,
  imageSize = 60,
}: ComponentProps) {
  // console.log(orbitItems);
    const total = orbitItems.length;
    const outerCount = Math.max(1, Math.ceil((total * 2) / 3));
    const innerCount = Math.max(0, total - outerCount);
    const outerStep = 360 / outerCount;
    const innerStep = innerCount > 0 ? 360 / innerCount : 0;
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    const root = scope.current;
    if (!root) return;

    // get arm and image elements per ring
    const outerArms = qsa(root, '[data-arm][data-ring="outer"]');
    const innerArms = qsa(root, '[data-arm][data-ring="inner"]');
    const outerImgs = qsa(root, '[data-arm-image][data-ring="outer"]');
    const innerImgs = qsa(root, '[data-arm-image][data-ring="inner"]');
    const stops: Array<() => void> = [];

    // image lift-in: outer to top:0, inner to smaller radius
    const innerTop = Math.round(stageSize * 0.18);
    delay(() => {
      animate(outerImgs, { top: 0 }, transition);
      if (innerImgs.length) animate(innerImgs, { top: innerTop }, transition);
    }, 250);

    // build sequence for orbit placement
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

    // play placement sequence
    delay(() => animate(orbitPlacementSequence), 700);

    // start continuous spin for arms and images
    delay(() => {
      // outer arms spin clockwise
      outerArms.forEach((el) => {
        const angle = angleOf(el);
        const ctrl = animate(el, { rotate: [angle, angle + 360] }, spinConfig);
        stops.push(() => ctrl.cancel());
      });
      // inner arms spin counter-clockwise
      innerArms.forEach((el) => {
        const angle = angleOf(el);
        const ctrl = animate(el, { rotate: [angle, angle - 360] }, spinConfig);
        stops.push(() => ctrl.cancel());
      });

      // images counter-spin to stay upright
      outerImgs.forEach((img) => {
        const arm = armOfImg(img);
        const angle = arm ? angleOf(arm) : 0;
        const ctrl = animate(
          img,
          { rotate: [-angle, -angle - 360] },
          spinConfig,
        );
        stops.push(() => ctrl.cancel());
      });
      // inner images spin opposite of inner arms
      innerImgs.forEach((img) => {
        const arm = armOfImg(img);
        const angle = arm ? angleOf(arm) : 0;
        const ctrl = animate(
          img,
          { rotate: [-angle, -angle + 360] },
          spinConfig,
        );
        stops.push(() => ctrl.cancel());
      });
    }, 1300);

    return () => stops.forEach((stop) => stop());
  }, [animate, scope, stageSize]);

  return (
    <LayoutGroup>
      <motion.div
        ref={scope}
        className="relative overflow-visible"
        style={{ width: stageSize, height: stageSize }}
        initial={false}
      >
        {orbitItems.slice(0, outerCount).map((item, i) => (
          <motion.div
            key={item.id}
            data-arm
            data-ring="outer"
            className="will-change-transform absolute inset-0"
            style={{ zIndex: orbitItems.length - i }}
            data-angle={i * outerStep}
            layoutId={`arm-${item.id}`}
          >
            <motion.img
              data-arm-image
              data-ring="outer"
              className="rounded-full object-fill absolute left-1/2 top-1/2 aspect-square translate -translate-x-1/2"
              style={{
                width: imageSize,
                height: imageSize,
                opacity: i === 0 ? 1 : 0,
              }}
              src={item.src}
              alt={item.name}
              draggable={false}
              layoutId={`arm-img-${item.id}`}
            />
          </motion.div>
        ))}
        {innerCount > 0 &&
          orbitItems.slice(outerCount).map((item, j) => (
            <motion.div
              key={item.id}
              data-arm
              data-ring="inner"
              className="will-change-transform absolute inset-0"
              style={{ zIndex: orbitItems.length - (outerCount + j) }}
              data-angle={j * innerStep}
              layoutId={`arm-${item.id}`}
            >
              <motion.img
                data-arm-image
                data-ring="inner"
                className="rounded-full object-fill absolute left-1/2 top-1/2 aspect-square translate -translate-x-1/2"
                style={{
                  width: imageSize,
                  height: imageSize,
                  opacity: j === 0 ? 1 : 0,
                }}
                src={item.src}
                alt={item.name}
                draggable={false}
                layoutId={`arm-img-${item.id}`}
              />
            </motion.div>
          ))}
      </motion.div>
    </LayoutGroup>
  );
}

export { RadialIntro };