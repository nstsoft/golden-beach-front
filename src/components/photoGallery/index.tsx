import './photoGallery.scss';
import { GalleryItem, ViewMoreItem } from './galleryItem';
import { GalleryItemType } from 'utils';
import { isMobile } from 'react-device-detect';
import { useGallery } from 'src/hooks/useGallery';
import { CustomCarousel } from '../elements';
import Slide, { type SlideProps } from '@mui/material/Slide';
import { useRef } from 'react';
import { useIntersectionObserver } from 'hooks';

const slideDirections: SlideProps['direction'][][] = [
  ['right', 'down', 'left', 'right', 'up', 'left'],
  ['right', 'left', 'right', 'left', 'right', 'left'],
];

const directionSet = window.innerWidth > 970 ? slideDirections[0] : slideDirections[1];

const ItemsSet = ({ chunk, addViewMore }: { chunk: GalleryItemType[]; addViewMore: boolean }) => {
  const componentRef = useRef(null);
  const { isIntersecting } = useIntersectionObserver(componentRef);

  const items = [
    ...chunk.map((item) => <GalleryItem key={item.id} {...item} />),
    addViewMore ? <ViewMoreItem key="vewMore" /> : null,
  ];

  return (
    <div ref={componentRef} className="gallery_item_set">
      {items.map((item, i) => (
        <Slide
          key={i}
          timeout={(items.length - i) * 200}
          container={componentRef.current}
          in={isIntersecting}
          direction={directionSet[i]}
        >
          <div>{item}</div>
        </Slide>
      ))}
    </div>
  );
};

export const PhotoGallery = () => {
  const { galleryItems } = useGallery();

  return (
    <section className={`gallery_section ${isMobile ? 'mobile' : ''}`}>
      <ItemsSet chunk={galleryItems} addViewMore={true} />
      <div className="mobile_section" style={{ display: isMobile ? 'flex' : 'none' }}>
        <CustomCarousel
          stopAutoPlayOnHover={true}
          swipe={true}
          className="carousel"
          autoPlay={true}
          animation="slide"
          timeout={700}
          interval={5000}
        >
          {galleryItems.map((item) => (
            <GalleryItem key={item.id} {...item} />
          ))}
        </CustomCarousel>
      </div>
    </section>
  );
};
