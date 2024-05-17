import { useState } from 'react';

import Poster1 from 'assets/hardcode/poster1.png';
import Poster2 from 'assets/hardcode/poster2.png';
import Poster3 from 'assets/hardcode/poster3.png';
const images = [
  Poster1,
  Poster2,
  Poster3,
  Poster1,
  Poster2,
  Poster3,
  Poster1,
  Poster2,
  Poster3,
  Poster1,
  Poster2,
  Poster3,
  Poster1,
  Poster2,
  Poster3,
  Poster1,
  Poster2,
  Poster3,
  Poster1,
  Poster2,
  Poster3,
  Poster1,
  Poster2,
  Poster3,
  Poster1,
  Poster2,
  Poster3,
];

export const useEvents = (): { events: string[] } => {
  const [events] = useState<string[]>(images);

  return { events };
};
