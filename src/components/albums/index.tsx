import './album.scss';
import { isMobile } from 'react-device-detect';
import { FC, useEffect } from 'react';
import { useAlbum } from 'hooks';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ImageSvg } from 'assets/svg';
import { ServiceType } from 'utils';

type Props = {
  onAlbumSelect?: (album: string) => void;
  name?: string;
  type?: ServiceType | null;
};

export const Albums: FC<Props> = ({ onAlbumSelect, name, type }) => {
  const { albums, execute } = useAlbum({ name, type });

  useEffect(() => {
    execute({ name, type });
  }, [name, type]);

  return (
    <section className={`albums_section ${isMobile ? 'mobile' : ''}`}>
      <ImageList variant="quilted" sx={{ width: '100%', height: '100%' }} cols={isMobile ? 2 : 3}>
        {albums.map((item) => (
          <ImageListItem
            className="album-item"
            key={item._id}
            onClick={() => onAlbumSelect?.(item._id)}
          >
            <div className="album-data">
              <div className="name">{item._id === '' ? 'All' : item._id}</div>
              <div className="count">
                {item._id === '' ? '' : item.count} <ImageSvg />{' '}
              </div>
            </div>
            <img
              srcSet={`${item.image.thumb}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.image.thumb}?w=164&h=164&fit=crop&auto=format`}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </section>
  );
};
