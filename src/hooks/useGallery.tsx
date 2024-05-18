import { useState } from 'react';
import Image1 from 'assets/hardcode/gallery/1.png';
import Image2 from 'assets/hardcode/gallery/2.png';
import Image3 from 'assets/hardcode/gallery/3.png';
import Image4 from 'assets/hardcode/gallery/4.png';
import Image5 from 'assets/hardcode/gallery/5.png';
import { GalleryItemType } from 'src/utils';

const data = [
  {
    id: '1',
    name: 'Lorem',
    img: Image1,
  },
  {
    id: '2',
    name: 'Lorem',
    img: Image2,
  },
  {
    id: '3',
    name: 'Lorem',
    img: Image3,
  },
  {
    id: '4',
    name: 'Lorem',
    img: Image4,
  },
  {
    id: '5',
    name: 'Lorem',
    img: Image5,
  },
];

export const useGallery = (): { galleryItems: GalleryItemType[] } => {
  const [galleryItems] = useState<GalleryItemType[]>(data);

  return { galleryItems };
};
