import { useState } from 'react';
import Image1 from 'assets/hardcode/gallery/1.png';
import Image2 from 'assets/hardcode/gallery/2.png';
import Image3 from 'assets/hardcode/gallery/3.png';
import Image4 from 'assets/hardcode/gallery/4.png';
import Image5 from 'assets/hardcode/gallery/5.png';
import { GalleryItemType } from 'src/utils';
import { isMobile } from 'react-device-detect';

const arrayLength = isMobile ? 11 : 15;

const data = [
  {
    id: '1',
    name: 'Lorem1',
    img: Image1,
  },
  {
    id: '2',
    name: 'Lorem2',
    img: Image2,
  },
  {
    id: '3',
    name: 'Lorem3',
    img: Image3,
  },
  {
    id: '4',
    name: 'Lorem4',
    img: Image4,
  },
  {
    id: '5',
    name: 'Lorem5',
    img: Image5,
  },
  {
    id: '6',
    name: 'Lorem6',
    img: Image1,
  },
  {
    id: '7',
    name: 'Lorem7',
    img: Image2,
  },
  {
    id: '8',
    name: 'Lorem8',
    img: Image3,
  },
  {
    id: '9',
    name: 'Lorem9',
    img: Image1,
  },
  {
    id: '10',
    name: 'Lorem10',
    img: Image1,
  },
  {
    id: '11',
    name: 'Lorem11',
    img: Image1,
  },
  {
    id: '12',
    name: 'Lorem12',
    img: Image1,
  },
  {
    id: '13',
    name: 'Lorem13',
    img: Image1,
  },
  {
    id: '14',
    name: 'Lorem14',
    img: Image1,
  },
  {
    id: '15',
    name: 'Lorem15',
    img: Image1,
  },
];

export const useGallery = (take?: number): { galleryItems: GalleryItemType[] } => {
  const [galleryItems] = useState<GalleryItemType[]>(data.slice(0, take ?? arrayLength));

  return { galleryItems };
};
