export enum EventType {
  news = 'news',
  event = 'event',
}

export type Event = {
  image: string;
  thumb: string;
  date: Date;
  name: string;
  descriptionEng: string;
  descriptionIt: string;
  _id: string;
  type: EventType;
};
