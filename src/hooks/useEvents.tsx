import { useState } from 'react';
import { type Event, EventType } from 'utils';
import moment from 'moment';
import Poster2 from 'assets/hardcode/poster2.png';
import Poster3 from 'assets/hardcode/poster3.png';

const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const hardcoded = [
  {
    image: Poster2,
    thumb: Poster2,
    type: EventType.event,
    description,
    name: 'Sonic architects',
    id: 'id_1',
    date: new Date('2024-04-01'),
  },
  {
    image: Poster3,
    description,
    name: 'Sonic architects 2',
    id: 'id_2',
    date: new Date('2024-05-05'),
    thumb: Poster2,
    type: EventType.event,
  },
  {
    image: Poster2,
    description,
    name: 'Sonic architects 3',
    id: 'id_3',
    date: new Date('2024-05-07'),
    thumb: Poster2,
    type: EventType.event,
  },
  {
    image: Poster2,
    description,
    name: 'Sonic architects 4',
    id: 'id_4',
    date: new Date('2024-05-07'),
    thumb: Poster2,
    type: EventType.event,
  },
  {
    image: Poster3,
    description,
    name: 'Sonic architects 5',
    id: 'id_5',
    date: new Date('2024-05-08'),
    thumb: Poster2,
    type: EventType.event,
  },
  {
    image: Poster3,
    description,
    name: 'Sonic architects 6',
    id: 'id_6',
    date: new Date('2024-05-08'),
    thumb: Poster2,
    type: EventType.event,
  },
  {
    image: Poster3,
    description,
    name: 'Sonic architects 7',
    id: 'id_7',
    date: new Date('2024-05-08'),
    thumb: Poster2,
    type: EventType.event,
  },
  {
    image: Poster3,
    description,
    name: 'Sonic architects 8',
    id: 'id_8',
    date: new Date('2024-05-08'),
    thumb: Poster3,
    type: EventType.event,
  },
].sort((i, o) => (moment(o.date).isAfter(moment(i.date)) ? 1 : -1));

type Props = {
  name?: string;
  date?: Date;
};

export const useEvents = (props: Props): { events: Event[] } => {
  const [events] = useState<Event[]>(hardcoded);

  let filtered = events.filter((el) =>
    el.name.toLowerCase().includes(props?.name?.toLowerCase() || ''),
  );

  if (props.date) {
    filtered = filtered.filter((el) => moment(el.date).isSame(props.date, 'day'));
  }

  return { events: filtered };
};
