import './events.scss';
import { useEvents } from 'hooks';
import { CustomCarousel } from 'components';
import { EventItem } from './item';
import { splitByChunks, type Event } from 'utils';
import { isMobile } from 'react-device-detect';

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
    <section className={`events_section ${isMobile ? 'mobile' : ''}`}>
      <CustomCarousel
        stopAutoPlayOnHover={true}
        swipe={true}
        className="carousel"
        autoPlay={true}
        animation="slide"
        timeout={700}
      >
        {chunks.map((chunk, i) => (
          <ItemsSet chunk={chunk} key={`slide_${i}`} />
        ))}
      </CustomCarousel>
      <div className="mobile_section" style={{ display: isMobile ? 'flex' : 'none' }}>
        {events.map((item) => (
          <EventItem key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};
