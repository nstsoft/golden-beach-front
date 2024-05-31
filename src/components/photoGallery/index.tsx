import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import './photoGallery.scss';
import { isMobile } from 'react-device-detect';
import { useGallery } from 'src/hooks/useGallery';
import { type GalleryItemType, type ImageTypeEnum } from 'utils';
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { FC } from 'react';
import { CustomButton } from 'components';
import CircularProgress from '@mui/material/CircularProgress';

const documentWidth = window.innerWidth;

const GalleryItem = (item: GalleryItemType) => {
  return (
    <div itemID={item._id} key={item._id} className="gallery-item" data-src={item.image}>
      <a href={item.thumb} data-lg-size="3000-3000" data-poster={item.thumb} data-src={item.thumb}>
        <img src={item.image} />
      </a>
    </div>
  );
};

type Props = {
  skip?: number;
  limit?: number;
  type?: ImageTypeEnum | null;
  showLoadMore?: boolean;
  page?: number;
  search?: string;
};

export const PhotoGallery: FC<Props> = (props) => {
  const limit = documentWidth > 799 ? 12 : 9;
  const skip = props?.page ? props.page * limit : props.skip ?? 0;

  const { galleryItems, loadMore, isLoading } = useGallery({
    ...props,
    limit,
    skip,
    concatPages: true,
    search: props.search ?? '',
  });

  const onInit = () => {};

  if (isLoading) {
    return <CircularProgress />;
  }
  if (!galleryItems.length) {
    return null;
  }

  return (
    <section className={`gallery-container gallery_section ${isMobile ? 'mobile' : ''}`}>
      <div className="gallery-items">
        <LightGallery
          licenseKey="0372F2F1-8E27-430B-B17C-F19454A8CE90"
          onInit={onInit}
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
        >
          {galleryItems.map(GalleryItem)}
        </LightGallery>
      </div>
      {props.showLoadMore && (
        <div className="load-more" onClick={loadMore}>
          <CustomButton onClick={loadMore}>Show more</CustomButton>
        </div>
      )}
    </section>
  );
};
