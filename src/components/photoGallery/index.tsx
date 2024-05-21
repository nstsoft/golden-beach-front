import './photoGallery.scss';
import { isMobile } from 'react-device-detect';
import { useGallery } from 'src/hooks/useGallery';
import { ImageList, ImageListItem } from '@mui/material';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

export const PhotoGallery = () => {
  const { galleryItems } = useGallery();

  return (
    <section className={`gallery_section ${isMobile ? 'mobile' : ''}`}>
      <ImageList sx={{ width: '100%', height: '100%' }} variant="quilted" cols={isMobile ? 4 : 6} rowHeight={'auto'}>
        {galleryItems.map((item, i) => (
          <ImageListItem key={item.img + i} cols={item.cols || 1} rows={item.rows || 1}>
            <img {...srcset(item.img, 121, item.rows, item.cols)} alt={item.name} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    </section>
  );
};
