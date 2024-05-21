import { GalleryItemType } from 'src/utils';
import './galleryItem.scss';
import ViewMoreImage from 'assets/hardcode/gallery/view_more.png';

export const GalleryItem = ({ img, name }: GalleryItemType) => {
  return (
    <div className="gallery_item">
      <img src={img} alt={name} height={306} width={306} />
    </div>
  );
};

export const ViewMoreItem = () => {
  return (
    <div key="gallery_view_more" className="gallery_view_more">
      <img src={ViewMoreImage} alt={'View more'} />
    </div>
  );
};
