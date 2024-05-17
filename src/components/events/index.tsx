import './events.scss';
import { CustomCarousel } from 'components';
import { isMobile } from 'react-device-detect';
import { splitByChunks } from 'utils';
import { Slide } from './slide';
import { useEvents } from 'hooks';

const windowWidth = window.innerWidth;
const chunksSize = windowWidth / 200;

export const EventsSection = () => {
  const { events } = useEvents();
  const chunks = splitByChunks(events, Math.min(+chunksSize.toFixed(), 6));

  return (
    <section className={`events_section ${isMobile ? 'mobile' : ''}`}>
      <CustomCarousel
        stopAutoPlayOnHover={true}
        swipe={true}
        className="carousel"
        autoPlay={true}
        animation="slide"
        timeout={0}
        interval={5000}
      >
        {chunks.map((chunk, i) => (
          <Slide key={'chunk' + i} images={chunk} index={i} />
        ))}
      </CustomCarousel>
    </section>
  );
};
