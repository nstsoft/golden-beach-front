import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import './photoGallery.scss';
import { isMobile } from 'react-device-detect';
import { useGallery } from 'src/hooks/useGallery';
import { type GalleryItemType } from 'utils';
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

const documentWidth = window.innerWidth;

const GalleryItem = (item: GalleryItemType) => {
  return (
    <div className="gallery-item" data-src={item.img}>
      <a href={item.img} data-lg-size="3000-3000" data-poster={item.img} data-src={item.img}>
        <img src={item.img} alt={item.name} />
      </a>
    </div>
  );
};

export const PhotoGallery = () => {
  const { galleryItems } = useGallery(documentWidth > 799 ? 12 : 9);

  const onInit = () => {
    console.log('lightGallery has been initialized');
  };

  return (
    <section className={`gallery-container gallery_section ${isMobile ? 'mobile' : ''}`}>
      <LightGallery
        licenseKey="0372F2F1-8E27-430B-B17C-F19454A8CE90"
        onInit={onInit}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
      >
        {galleryItems.map(GalleryItem)}
      </LightGallery>
    </section>
  );
};
