import Grow from '@mui/material/Grow';
import { useIntersectionObserver } from 'hooks';
import { FC, useRef } from 'react';

type Props = { images: string[]; index: number };

export const Slide: FC<Props> = ({ images, index }) => {
  const componentRef = useRef(null);
  const { isIntersecting } = useIntersectionObserver(componentRef);

  return (
    <div className="slide" ref={componentRef}>
      {images.map((image, i) => (
        <Grow key={i * 400} timeout={1500 + i * 400} in={isIntersecting}>
          <div className="image" key={image + index + i}>
            <img src={image} />
          </div>
        </Grow>
      ))}
    </div>
  );
};
