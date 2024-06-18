import { useParams } from 'react-router-dom';
import { useEvents, useLanguage } from 'hooks';
import { NewsItemSection } from 'components';
import meta from 'src/meta';
import { Helmet } from 'react-helmet-async';
import { isMobile } from 'react-device-detect';

export const NewsItemPage = () => {
  const params = useParams();
  const { events } = useEvents({ id: params.id });
  const { language } = useLanguage();

  if (!events.length) return null;

  return (
    <div className={`news-page page events-page ${isMobile ? 'mobile' : ''}`}>
      {events[0] && <Helmet>{meta[language].singleNews(events[0].name)}</Helmet>}
      <div className="page_content">
        <NewsItemSection event={events[0]} />
      </div>
    </div>
  );
};
