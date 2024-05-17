import Grow from '@mui/material/Grow';
import { useIntersectionObserver } from 'hooks';
import { FC, useRef, useEffect } from 'react';

type Props = { images: string[]; index: number };

export const Slide: FC<Props> = ({ images, index }) => {
  const componentRef = useRef(null);
  const { isIntersecting, isObserved, setElement } = useIntersectionObserver();

  useEffect(() => {
    if (!isObserved && componentRef.current) {
      setElement(componentRef.current);
    }
  }, [isObserved, componentRef, setElement]);

  return (
    <div className="slide" ref={componentRef}>
      {images.map((image, i) => (
        <Grow timeout={1500 + i * 400} in={isIntersecting}>
          <div className="image" key={image + index + i}>
            <img src={image} />;
          </div>
        </Grow>
      ))}
    </div>
  );
};
