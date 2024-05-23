import './eventItem.scss';
import { FC } from 'react';
import { type Event } from 'utils';
import { CalendarSvg } from 'assets/svg';
import moment from 'moment';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';

type Props = {
  event: Event;
  type: 'news' | 'event';
};

export const EventItem: FC<Props> = ({ event, type }) => {
  return (
    <Link className="unstyled-link" to={`/events/${event.id}`}>
      <section className="event-item">
        <div className="date" style={{ display: type === 'event' && !isMobile ? 'flex' : 'none' }}>
          <div className="month">{event.date.toLocaleString('default', { month: 'short' })}</div>
          <div className="day">{event.date.getDate()}</div>
        </div>
        <div className="image">
          <img src={event.image} />
        </div>
        <div className="text">
          <div className="date">
            <CalendarSvg /> <a>{moment(event.date).format('MMM DD | HH:mma')}</a>
          </div>
          <div className="title white-header-text">{event.name}</div>
          <div className="description shadowed-text">{event.description}</div>
        </div>
      </section>
    </Link>
  );
};
