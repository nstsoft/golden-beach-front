import './events.scss';
import { isMobile } from 'react-device-detect';
import { useEvents } from 'hooks';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1200 }, items: 6 },
  desktop: { breakpoint: { max: 1199, min: 990 }, items: 5 },
  tablet: { breakpoint: { max: 989, min: 580 }, items: 3 },
  mobile: { breakpoint: { max: 579, min: 0 }, items: 2 },
};

export const EventsSection = () => {
  const { events } = useEvents({});

  return (
    <section className={`events_section ${isMobile ? 'mobile' : ''}`}>
      <Carousel responsive={responsive}>
        {events.map((event, i) => (
          <Link key={event.image + i} className="link" to="/events">
            <div className="image">
              <div className="date">
                <div className="month">
                  {event.date.toLocaleString('default', { month: 'short' })}
                </div>
                <div className="day">{event.date.getDate()}</div>
              </div>
              <img src={event.image} />;
            </div>
          </Link>
        ))}
      </Carousel>
    </section>
  );
};
