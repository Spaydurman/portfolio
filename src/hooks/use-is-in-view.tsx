import * as React from 'react';
import { useInView, type UseInViewOptions } from 'motion/react';

interface UseIsInViewOptions {
  inView?: boolean;
  inViewOnce?: boolean;
  inViewMargin?: UseInViewOptions['margin'];
}

function useIsInView<T extends HTMLElement = HTMLElement>(
  ref: React.Ref<T>,
  options: UseIsInViewOptions = {},
) {
  const { inView, inViewOnce = false, inViewMargin = '0px' } = options;
  const localRef = React.useRef<T>(null);
  React.useImperativeHandle(ref, () => localRef.current as T);
  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  });
  // By default (when `inView` is undefined) use the actual observer result.
  // If caller passes `inView: false` we keep the previous behavior of treating it as always true.
  // If caller passes `inView: true` we require the observer result.
  const isInView = inView === undefined ? inViewResult : (inView ? inViewResult : true);
  return { ref: localRef, isInView };
}

export { useIsInView, type UseIsInViewOptions };
