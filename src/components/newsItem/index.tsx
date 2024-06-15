import { type Event, EventType } from 'utils';
import { FC } from 'react';
import './newsItemSections.scss';
import { isMobile } from 'react-device-detect';
import { CalendarSvg } from 'assets/svg';
import { useEvents, useLanguage } from 'hooks';
import days from 'dayjs';
import { useNavigate } from 'react-router-dom';

type Props = { event: Event };

export const NewsItemSection: FC<Props> = ({ event }) => {
  const { events } = useEvents({ type: EventType.news });
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const renderRecentPost = (item: Event) => {
    return (
      <div
        className="recent-post"
        key={item._id}
        onClick={() => navigate(`/${language === 'it' ? '' : 'en/'}news/${event._id}`)}
      >
        <div className="image">
          {' '}
          <img src={item.image} />{' '}
        </div>
        <div className="text">
          <div className="name">{item.name}</div>
          <div className="date shadowed-text" style={{ textTransform: 'capitalize' }}>
            {days(item.date).format('MMM DD | HH:mm')}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className={`news-item-section ${isMobile ? 'mobile' : ''}`}>
      <div className="head-content">
        <div className="white-header-text">{event.name}</div>
        <div className="date">
          <CalendarSvg />{' '}
          <a style={{ textTransform: 'capitalize' }}>{days(event.date).format('MMM DD | HH:mm')}</a>
        </div>
      </div>
      <div className="image">
        <img src={event.image} />
      </div>
      <div className="content">
        <div className="description shadowed-text">
          {language === 'en' ? event.descriptionEng : event.descriptionIt}
        </div>
        <div className="recent-events">
          <div className="title recent-header-content">
            <div className="head">{t('recentPost')}</div>
            <div className="line"></div>
          </div>
          <div className="recent-posts">{events.slice(0, 3).map(renderRecentPost)}</div>
        </div>
      </div>
    </section>
  );
};
