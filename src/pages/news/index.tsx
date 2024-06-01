import './news.scss';
import { useEvents } from 'hooks';
import { EventItem } from 'components';
import { EventType } from 'utils';

export const NewsPage = () => {
  const { events: news } = useEvents({ type: EventType.news });

  return (
    <div className="news-page page events-page">
      <div className="page_content">
        <div className="new-header-container">
          <div className="news-header">
            <h1>NEWS</h1>
          </div>
        </div>
        <div className="news-list">
          {news.map((newsItem) => (
            <EventItem key={newsItem._id} event={newsItem} type="news" />
          ))}
        </div>
      </div>
    </div>
  );
};
