import './photoGallery.scss';
import { isMobile } from 'react-device-detect';
import { useGallery } from 'src/hooks/useGallery';
import { ImageList, ImageListItem } from '@mui/material';
import { CustomButton, FullScreenDialog } from 'components';
import { useState } from 'react';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

export const PhotoGallery = () => {
  const { galleryItems } = useGallery();
  const [isOpen, setIsOpen] = useState(false);
  const [src, setSrc] = useState('');

  const handleClick = (source: string) => {
    setSrc(source);
    setIsOpen(true);
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
          <ImageListItem className="gallery_item" key={item.img + i} cols={item.cols || 1} rows={item.rows || 1}>
            <img
              {...srcset(item.img, 121, item.rows, item.cols)}
              onClick={() => handleClick(item.img)}
              alt={item.name}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <div className="buttons_section">
        <CustomButton to="/gallery">Show more</CustomButton>
      </div>
      <FullScreenDialog className="gallery_dialog" onClose={() => setIsOpen(false)} isOpen={isOpen} name="Gallery">
        <div className="gallery_dialog_content">
          <img className="dialog_image" src={src} loading="lazy" />
        </div>
      </FullScreenDialog>
    </section>
  );
};
