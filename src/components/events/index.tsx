import './events.scss';
import { useEvents } from 'hooks';
import { CustomCarousel } from 'components';
import { EventItem } from './item';
import { splitByChunks, type Event } from 'utils';

const windowWidth = window.innerWidth;

const ItemsSet = ({ chunk }: { chunk: Event[] }) => {
  return (
    <div className="event_item_set">
      {chunk.map((item) => (
        <EventItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export const EventsSection = () => {
  const { events } = useEvents();

  const chunks = splitByChunks(events, windowWidth < 1200 ? 2 : 3);

  return (
    <section className="events_section">
      <CustomCarousel autoPlay={true} animation="slide" timeout={700}>
        {chunks.map((chunk, i) => (
          <ItemsSet chunk={chunk} key={`slide_${i}`} />
        ))}
      </CustomCarousel>
    </section>
  );
};
