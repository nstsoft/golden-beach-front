import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import './photoGallery.scss';
import { isMobile } from 'react-device-detect';
import { useGallery } from 'hooks';
import { type GalleryItemType, type ServiceType } from 'utils';
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { FC, useEffect, useRef } from 'react';
import { CustomButton } from 'components';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const documentWidth = window.innerWidth;

type Props = {
  skip?: number;
  limit?: number;
  type?: ServiceType | null;
  showLoadMore?: boolean;
  page?: number;
  search?: string;
  album?: string;
  event?: string;
  showVisitGallery?: boolean;
  infinityScroll?: boolean;
};

export const PhotoGallery: FC<Props> = (props) => {
  const limit = documentWidth > 799 ? 12 : 9;
  const skip = props?.page ? props.page * limit : props.skip ?? 0;
  const galleryRef = useRef(null);
  const initiatedRef = useRef(false);
  const navigate = useNavigate();
  // const [grows, setGrows] = useState<{ [key: string]: boolean }>({});

  const { galleryItems, loadMore, isLoading } = useGallery({
    ...props,
    limit: props.infinityScroll ? 999999 : props.limit ?? limit,
    skip,
    concatPages: true,
    album: props.album?.length ? props.album : undefined,
  });

  useEffect(() => {
    if (galleryItems.length > 0 && !initiatedRef.current && props.infinityScroll) {
      initiatedRef.current = true;
      // setGrows(
      //   galleryItems.reduce((acc, { _id }, index) => ({ [_id]: index < limit, ...acc }), {}),
      // );
    }
  }, [galleryItems, isLoading, props.infinityScroll, limit]);

  const GalleryItem = (item: GalleryItemType, total: number) => {
    if (props.infinityScroll) {
      return (
        // <Grow in={grows[item._id as string]} key={item._id}>
        <div
          itemID={item._id}
          id={item._id}
          key={item._id}
          className={`gallery-item ${total < 4 ? 'small' : ''}`}
          data-src={item.image}
        >
          <a
            href={item.image}
            data-lg-size="3000-3000"
            data-poster={item.thumb}
            data-src={item.thumb}
          >
            <img src={item.thumb} />
          </a>
        </div>
        // </Grow>
      );
    }
    return (
      <div
        itemID={item._id}
        id={item._id}
        key={item._id}
        className={`gallery-item ${total < 4 ? 'small' : ''}`}
        data-src={item.image}
      >
        <a
          href={item.image}
          data-lg-size="3000-3000"
          data-poster={item.thumb}
          data-src={item.thumb}
        >
          <img src={item.thumb} />
        </a>
      </div>
    );
  };

  const onInit = () => {};

  // const boxes = document.querySelectorAll('.gallery-item');

  // const isInViewport = (element: Element) => {
  //   const rect = element.getBoundingClientRect();
  //   return (
  //     rect.top >= 0 &&
  //     rect.left >= 0 &&
  //     rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
  //     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  //   );
  // };

  // if (props.infinityScroll) {
  //   const checkVisibility = () => {
  //     boxes.forEach((box) => {
  //       if (isInViewport(box)) {
  //         setGrows((prev) => ({ ...prev, [box.id]: true }));
  //       }
  //     });
  //   };

  //   window.addEventListener('scroll', checkVisibility);
  //   // window.addEventListener('resize', checkVisibility);
  // }

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <section className={`gallery-container gallery_section ${isMobile ? 'mobile' : ''}`}>
      <div className="gallery-items" ref={galleryRef}>
        <LightGallery
          mode="lg-fade"
          licenseKey="0372F2F1-8E27-430B-B17C-F19454A8CE90"
          onInit={onInit}
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
        >
          {galleryItems.map((item) => GalleryItem(item, galleryItems.length))}
        </LightGallery>
      </div>
      {props.showLoadMore && !props.infinityScroll && (
        <div className="load-more">
          <CustomButton onClick={loadMore}>Show more</CustomButton>
        </div>
      )}
      {props.showVisitGallery && (
        <div className="visit-gallery">
          <CustomButton
            onClick={() => {
              navigate('/gallery');
            }}
          >
            Visit gallery
          </CustomButton>
        </div>
      )}
    </section>
  );
};
