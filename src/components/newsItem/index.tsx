import { type Event, EventType } from 'utils';
import { FC } from 'react';
import './newsItemSections.scss';
import { isMobile } from 'react-device-detect';
import moment from 'moment';
import { CalendarSvg } from 'assets/svg';
import { useEvents } from 'hooks';

type Props = { event: Event };

const renderRecentPost = (event: Event) => {
  return (
    <div className="recent-post">
      <div className="image">
        {' '}
        <img src={event.image} />{' '}
      </div>
      <div className="text">
        <div className="name">{event.name}</div>
        <div className="date shadowed-text">{moment(event.date).format('MMM DD | HH:mma')}</div>
      </div>
    </div>
  );
};

export const NewsItemSection: FC<Props> = ({ event }) => {
  const { events } = useEvents({ type: EventType.news });
  console.log(events);
  return (
    <section className={`news-item-section ${isMobile ? 'mobile' : ''}`}>
      <div className="head-content">
        <div className="white-header-text">{event.name}</div>
        <div className="date">
          <CalendarSvg /> <a>{moment(event.date).format('MMM DD | HH:mma')}</a>
        </div>
      </div>
      <div className="image">
        <img src={event.image} />
      </div>
      <div className="content">
        <div className="description shadowed-text">{event.descriptionEng}</div>
        <div className="recent-events">
          <div className="title recent-header-content">
            <div className="head">RECENT POST</div>
            <div className="line"></div>
          </div>
          <div className="recent-posts">{events.slice(0, 3).map(renderRecentPost)}</div>
        </div>
      </div>
    </section>
  );
};
