import { useState } from 'react';
import Image1 from 'assets/hardcode/gallery/1.png';
import Image2 from 'assets/hardcode/gallery/2.png';
import Image3 from 'assets/hardcode/gallery/3.png';
import Image4 from 'assets/hardcode/gallery/4.png';
import Image5 from 'assets/hardcode/gallery/5.png';
import Image6 from 'assets/hardcode/gallery/6.png';
import Image7 from 'assets/hardcode/gallery/7.png';
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
  {
    id: '6',
    name: 'Lorem',
    img: Image6,
  },
  {
    id: '7',
    name: 'Lorem',
    img: Image7,
  },
  {
    id: '8',
    name: 'Lorem',
    img: Image1,
  },
  {
    id: '9',
    name: 'Lorem',
    img: Image2,
  },
  {
    id: '10',
    name: 'Lorem',
    img: Image3,
  },
  {
    id: '11',
    name: 'Lorem',
    img: Image4,
  },
];

export const useGallery = (): { galleryItems: GalleryItemType[] } => {
  const [galleryItems] = useState<GalleryItemType[]>(data);

  return { galleryItems };
};
