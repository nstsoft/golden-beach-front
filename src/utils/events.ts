export enum EventType {
  news = 'news',
  event = 'event',
}

export type Event = {
  image: string;
  thumb: string;
  date: Date;
  name: string;
  description: string;
  id: string;
  type: EventType;
};
