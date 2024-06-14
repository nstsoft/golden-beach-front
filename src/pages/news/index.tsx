import './news.scss';
import { useEvents, useLanguage } from 'hooks';
import { EventItem } from 'components';
import { EventType } from 'utils';
import meta from 'src/meta';
import { Helmet } from 'react-helmet-async';

export const NewsPage = () => {
  const { events: news } = useEvents({ type: EventType.news });
  const { t, language } = useLanguage();

  return (
    <div className="news-page page events-page">
      <Helmet>{meta[language].news}</Helmet>
      <div className="page_content">
        <div className="new-header-container">
          <div className="news-header">
            <h1 className="white-header-text">{t('HomePage.Menu.news')}</h1>
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
