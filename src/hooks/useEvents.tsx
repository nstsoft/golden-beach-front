import { useState } from 'react';
import { type Event } from 'utils';
import Image from 'assets/hardcode/removeme.jpg';

const data = [
  {
    name: 'Sonic architects',
    id: '1',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, ipsum? Sed unde, sequi nam laborum aliquid architecto illo autem explicabo dolore',
    date: new Date('2022-01-01'),
    img: Image,
  },
  {
    name: 'Sonic architects',
    id: '2',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, ipsum? Sed unde, sequi nam laborum aliquid architecto illo autem explicabo dolore',
    date: new Date(),
    img: Image,
  },
  {
    name: 'Sonic architects',
    id: '3',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, ipsum? Sed unde, sequi nam laborum aliquid architecto illo autem explicabo dolore',
    date: new Date(),
    img: Image,
  },
  {
    name: 'Sonic architects',
    id: '4',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, ipsum? Sed unde, sequi nam laborum aliquid architecto illo autem explicabo dolore',
    date: new Date(),
    img: Image,
  },
  {
    name: 'Sonic architects',
    id: '5',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, ipsum? Sed unde, sequi nam laborum aliquid architecto illo autem explicabo dolore',
    date: new Date(),
    img: Image,
  },
  {
    name: 'Sonic architects',
    id: '6',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, ipsum? Sed unde, sequi nam laborum aliquid architecto illo autem explicabo dolore',
    date: new Date(),
    img: Image,
  },
  {
    name: 'Sonic architects',
    id: '7',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, ipsum? Sed unde, sequi nam laborum aliquid architecto illo autem explicabo dolore',
    date: new Date(),
    img: Image,
  },
  {
    name: 'Sonic architects',
    id: '8',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, ipsum? Sed unde, sequi nam laborum aliquid architecto illo autem explicabo dolore',
    date: new Date(),
    img: Image,
  },
];

export const useEvents = (): { events: Event[] } => {
  const [events] = useState<Event[]>(data);

  return { events };
};
