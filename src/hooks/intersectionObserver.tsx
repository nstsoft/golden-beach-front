import { useState, useEffect, type MutableRefObject } from 'react';

type ReturnType = {
  isIntersecting: boolean;
};

export const useIntersectionObserver = <T extends Element | null>(
  ref: MutableRefObject<T>,
  init: Partial<IntersectionObserverInit> = { root: null, rootMargin: '0px', threshold: 0.4 },
): ReturnType => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return () => {};
    }

    const observer = new IntersectionObserver(([entrie]) => {
      setIsIntersecting(entrie.isIntersecting);
    }, init);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, init]);

  return { isIntersecting };
};
