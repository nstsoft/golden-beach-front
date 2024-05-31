export enum ImageTypeEnum {
  beach = 'beach',
  restaurant = 'restaurant',
  club = 'club',
}
export type GalleryItemType = {
  _id: string;
  label: string;
  image: string;
  thumb: string;
  type: ImageTypeEnum;
};
