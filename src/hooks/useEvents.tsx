import { useState } from 'react';
import { type Event } from 'utils';

import Poster2 from 'assets/hardcode/poster2.png';
import Poster3 from 'assets/hardcode/poster3.png';
const images = [
  Poster2,
  Poster3,
  Poster2,
  Poster3,
  Poster2,
  Poster3,
  Poster2,
  Poster3,
  Poster2,
  Poster3,
  Poster2,
  Poster3,
  Poster2,
];

export const useEvents = (): { events: Event[] } => {
  const [events] = useState<Event[]>(images.map((image) => ({ date: new Date(), image })));

  return { events };
};
