import './eventItem.scss';
import { FC } from 'react';
import { type Event, cutString } from 'utils';
import { CalendarSvg } from 'assets/svg';
import days from 'dayjs';
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from 'hooks';

type Props = {
  event: Event;
  type: 'news' | 'event';
};

export const EventItem: FC<Props> = ({ event, type }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  return (
    <section
      onClick={() =>
        navigate(
          `/${language === 'it' ? '' : 'en/'}${type === 'event' ? 'events' : 'news'}/${event._id}`,
        )
      }
      className={`event-item ${type === 'event' ? 'event' : 'news'} ${isMobile ? 'mobile' : ''}`}
    >
      <div className="date" style={{ display: type === 'event' && !isMobile ? 'flex' : 'none' }}>
        <div className="month" style={{ textTransform: 'capitalize' }}>
          {days(event.date).format('MMM')}
        </div>
        <div className="day">{event.date.getDate()}</div>
      </div>
      <div className="image">
        <img src={event.thumb} />
      </div>
      <div className="text">
        <div className="date">
          <CalendarSvg />
          <a style={{ textTransform: 'capitalize' }}>{days(event.date).format('MMM DD | HH:mm')}</a>
        </div>
        <div className="title white-header-text">{event.name}</div>
        <div className="description shadowed-text">
          {cutString(
            language === 'en' ? event.descriptionEng : event.descriptionIt,
            isMobile ? 230 : 400,
          )}
        </div>
      </div>
    </section>
  );
};
