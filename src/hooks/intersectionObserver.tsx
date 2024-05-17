import { useState, useEffect, type SetStateAction, type Dispatch } from 'react';

type ReturnType = {
  isIntersecting: boolean;
  setElement: Dispatch<SetStateAction<Element | null>>;
  isObserved: boolean;
};

export const useIntersectionObserver = (
  init: Partial<IntersectionObserverInit> = { root: null, rootMargin: '0px', threshold: 0.4 },
): ReturnType => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
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
  }, [element, init]);

  return { isIntersecting, setElement, isObserved: !!element };
};
