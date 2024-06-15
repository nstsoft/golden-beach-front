import './events.scss';
import { isMobile } from 'react-device-detect';
import { useEvents, useLanguage } from 'hooks';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';
import { EventType } from 'utils';
import days from 'dayjs';

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1200 }, items: 6 },
  desktop: { breakpoint: { max: 1199, min: 990 }, items: 5 },
  tablet: { breakpoint: { max: 989, min: 580 }, items: 3 },
  mobile: { breakpoint: { max: 579, min: 0 }, items: 2 },
};

export const EventsSection = () => {
  const { events } = useEvents({ type: EventType.event, date: new Date() });
  const navigate = useNavigate();
  const { language } = useLanguage();

  if (!events.length) {
    return <section className="upcoming-soon white-header-text">Upcoming soon</section>;
  }

  const maxItemsForCentring = isMobile ? 2 : 6;

  return (
    <section
      className={`events_section ${isMobile ? 'mobile' : ''}  ${events.length < maxItemsForCentring ? 'center' : ''}`}
    >
      <Carousel responsive={responsive}>
        {events.reverse().map((event) => (
          <div
            key={event._id}
            className="image"
            onClick={() => navigate(`/${language === 'it' ? '' : 'en/'}events/${event._id}`)}
          >
            <div className="date">
              <div className="month">{days(event.date).format('MMM')}</div>
              <div className="day">{event.date.getDate()}</div>
            </div>
            <img src={event.thumb} />
          </div>
        ))}
      </Carousel>
    </section>
  );
};
