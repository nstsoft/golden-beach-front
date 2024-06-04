import { ServiceType } from './app.types';

export type GalleryItemType = {
  _id: string;
  album: string;
  image: string;
  thumb: string;
  event?: string;
  type: ServiceType;
};
