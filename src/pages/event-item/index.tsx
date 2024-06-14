import './event-item.scss';
import { useParams } from 'react-router-dom';
import { EventItemSection } from 'components';
import { useEvents, useLanguage } from 'hooks';
import meta from 'src/meta';
import { Helmet } from 'react-helmet-async';

export const EventItemPage = () => {
  const params = useParams();
  const { events } = useEvents({ id: params.id });
  const { language } = useLanguage();

  const renderItem = () => {
    if (!events.length) return null;
    return <EventItemSection event={events[0]} />;
  };

  return (
    <div className="page">
      <Helmet>{meta[language].singleEvent}</Helmet>
      <div className="page_content">{renderItem()}</div>
    </div>
  );
};
