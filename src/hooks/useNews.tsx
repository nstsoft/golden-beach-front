import { useState } from 'react';
import { type Event, EventType } from 'utils';
import Image from 'assets/hardcode/removeme.jpg';

const data = [
  {
    name: 'Sonic architects',
    id: '1',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, ipsum? Sed unde, sequi nam laborum aliquid architecto illo autem explicabo dolore',
    date: new Date('2022-01-01'),
    image: Image,
    thumb: Image,
    type: EventType.news,
  },
  {
    name: 'Sonic architects',
    id: '2',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, ipsum? Sed unde, sequi nam laborum aliquid architecto illo autem explicabo dolore',
    date: new Date(),
    image: Image,
    thumb: Image,
    type: EventType.news,
  },
  {
    name: 'Sonic architects',
    id: '3',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, ipsum? Sed unde, sequi nam laborum aliquid architecto illo autem explicabo dolore',
    date: new Date(),
    image: Image,
    thumb: Image,
    type: EventType.news,
  },
  {
    name: 'Sonic architects',
    id: '4',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, ipsum? Sed unde, sequi nam laborum aliquid architecto illo autem explicabo dolore',
    date: new Date(),
    image: Image,
    thumb: Image,
    type: EventType.news,
  },
  {
    name: 'Sonic architects',
    id: '5',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, ipsum? Sed unde, sequi nam laborum aliquid architecto illo autem explicabo dolore',
    date: new Date(),
    image: Image,
    thumb: Image,
    type: EventType.news,
  },
  {
    name: 'Sonic architects',
    id: '6',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, ipsum? Sed unde, sequi nam laborum aliquid architecto illo autem explicabo dolore',
    date: new Date(),
    image: Image,
    thumb: Image,
    type: EventType.news,
  },
  {
    name: 'Sonic architects',
    id: '7',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, ipsum? Sed unde, sequi nam laborum aliquid architecto illo autem explicabo dolore',
    date: new Date(),
    image: Image,
    thumb: Image,
    type: EventType.news,
  },
  {
    name: 'Sonic architects',
    id: '8',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, ipsum? Sed unde, sequi nam laborum aliquid architecto illo autem explicabo dolore',
    date: new Date(),
    image: Image,
    thumb: Image,
    type: EventType.news,
  },
];

export const useNews = (): { news: Event[] } => {
  const [news] = useState<Event[]>(data);

  return { news };
};
