import { useParams } from 'react-router-dom';
import { useEvents } from 'hooks';
import { NewsItemSection } from 'components';

export const NewsItemPage = () => {
  const params = useParams();
  const { events } = useEvents({ id: params.id });

  if (!events.length) return null;

  return (
    <div className="news-page page events-page">
      <div className="page_content">
        <NewsItemSection event={events[0]} />
      </div>
    </div>
  );
};
