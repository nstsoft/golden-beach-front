import './photoGallery.scss';
import { CustomCarousel } from 'components';
import { GalleryItem, ViewMoreItem } from './galleryItem';
import { GalleryItemType, splitByChunks } from 'utils';
import { isMobile } from 'react-device-detect';
import { useGallery } from 'src/hooks/useGallery';
import { useMemo } from 'react';

const windowWidth = window.innerWidth;

const ItemsSet = ({ chunk, addViewMore }: { chunk: GalleryItemType[], addViewMore: boolean }) => {
  return (
    <div className="gallery_item_set">
      {[...chunk.map((item) => (
        <GalleryItem key={item.id} {...item} />
      )), addViewMore ? <ViewMoreItem /> : null]}
    </div>
  );
};

export const PhotoGallery = () => {
  const { galleryItems } = useGallery();

  const chunks = useMemo(() => splitByChunks(galleryItems, windowWidth < 1200 ? 6 : 6), [galleryItems]);

  return (
    <section className={`gallery_section ${isMobile ? 'mobile' : ''}`}>
      <CustomCarousel
        stopAutoPlayOnHover={true}
        swipe={true}
        className="carousel"
        autoPlay={true}
        animation="slide"
        timeout={700}
        interval={5000}
      >
        {chunks.map((chunk, i) => (
          <ItemsSet chunk={chunk} addViewMore={chunks.length - 1 === i} key={`slide_${i}`} />
        ))}


      </CustomCarousel>
      <div className="mobile_section" style={{ display: isMobile ? 'flex' : 'none' }}>
        {galleryItems.map((item) => (
          <GalleryItem key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};
