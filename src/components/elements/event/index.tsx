import './eventItem.scss';
import { FC } from 'react';
import { type Event, cutString } from 'utils';
import { CalendarSvg } from 'assets/svg';
import moment from 'moment';
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';

type Props = {
  event: Event;
  type: 'news' | 'event';
};

export const EventItem: FC<Props> = ({ event, type }) => {
  const navigate = useNavigate();
  return (
    <section
      onClick={() => navigate(`/${type === 'event' ? 'events' : 'news'}/${event._id}`)}
      className={`event-item ${type === 'event' ? 'event' : 'news'} ${isMobile ? 'mobile' : ''}`}
    >
      <div className="date" style={{ display: type === 'event' && !isMobile ? 'flex' : 'none' }}>
        <div className="month">{event.date.toLocaleString('default', { month: 'short' })}</div>
        <div className="day">{event.date.getDate()}</div>
      </div>
      <div className="image">
        <img src={event.thumb} />
      </div>
      <div className="text">
        <div className="date">
          <CalendarSvg /> <a>{moment(event.date).format('MMM DD | HH:mma')}</a>
        </div>
        <div className="title white-header-text">{event.name}</div>
        <div className="description shadowed-text">
          {cutString(event.descriptionEng, isMobile ? 230 : 400)}
        </div>
      </div>
    </section>
  );
};
