import './photoGallery.scss';
import { GalleryItem, ViewMoreItem } from './galleryItem';
import { isMobile } from 'react-device-detect';
import { useGallery } from 'src/hooks/useGallery';
import { CustomCarousel } from '../elements';
import { ImageList, ImageListItem } from '@mui/material';
// import { type SlideProps } from '@mui/material/Slide';

// const slideDirections: SlideProps['direction'][][] = [
//   ['right', 'down', 'left', 'right', 'up', 'left'],
//   ['right', 'left', 'right', 'left', 'right', 'left'],
// ];

// const directionSet = window.innerWidth > 970 ? slideDirections[0] : slideDirections[1];

// const ItemsSet = ({ chunk, addViewMore }: { chunk: GalleryItemType[]; addViewMore: boolean }) => {
//   const componentRef = useRef(null);
//   const { isIntersecting } = useIntersectionObserver(componentRef);

//   const items = [
//     ...chunk.map((item) => <GalleryItem key={item.id} {...item} />),
//     addViewMore ? <ViewMoreItem key="vewMore" /> : null,
//   ];

//   return (
//     <div ref={componentRef} className="gallery_item_set">
//       {items.map((item, i) => (
//         <Slide
//           key={i}
//           timeout={(items.length - i) * 200}
//           container={componentRef.current}
//           in={isIntersecting}
//           direction={directionSet[i]}
//         >
//           <div>{item}</div>
//         </Slide>
//       ))}
//     </div>
//   );
// };

export const PhotoGallery = () => {
  const { galleryItems } = useGallery();

  return (
    <section className={`gallery_section ${isMobile ? 'mobile' : ''}`}>
      {/* <ItemsSet chunk={galleryItems} addViewMore={true} /> */}
      <ImageList cols={3} gap={16} className='gallery_image_list'>
        {[...galleryItems.map((item) => (
          <ImageListItem key={item.img} className='gallery_item'>
            <img
              srcSet={`${item.img}?w=306&h=306&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=306&h=306&fit=crop&auto=format`}
              alt={item.name}
              loading="lazy"
            />
          </ImageListItem>
        )), <ViewMoreItem />]}
      </ImageList>
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
