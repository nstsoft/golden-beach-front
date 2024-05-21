import './photoGallery.scss';
import { isMobile } from 'react-device-detect';
import { useGallery } from 'src/hooks/useGallery';
import { ImageList, ImageListItem } from '@mui/material';
import { CustomButton } from 'components';
import { useState, type MouseEvent } from 'react';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

export const PhotoGallery = () => {
  const { galleryItems } = useGallery();
  const [ref, setRef] = useState<HTMLLIElement | null>(null);

  const handleClick = ({ target }: MouseEvent) => {
    const elem = target as HTMLLIElement;
    if (ref) {
      ref.classList.toggle('active');

      return setRef(null);
    }

    elem.classList.toggle('active');

    return setRef(elem);
  };

  return (
    <section className={`gallery_section ${isMobile ? 'mobile' : ''}`}>
      <ImageList
        className="gallery"
        sx={{ width: '100%', height: '100%' }}
        variant="quilted"
        cols={isMobile ? 4 : 6}
        rowHeight={'auto'}
      >
        {galleryItems.map((item, i) => (
          <ImageListItem
            onClick={handleClick}
            className="gallery_item"
            key={item.img + i}
            cols={item.cols || 1}
            rows={item.rows || 1}
          >
            <img {...srcset(item.img, 121, item.rows, item.cols)} alt={item.name} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
      <div className="buttons_section">
        <CustomButton to="/gallery">Show more</CustomButton>
      </div>
    </section>
  );
};
