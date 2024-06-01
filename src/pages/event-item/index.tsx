import './event-item.scss';
import { useParams } from 'react-router-dom';
import { EventItemSection } from 'components';
import { useEvents } from 'hooks';

export const EventItemPage = () => {
  const params = useParams();
  const { events } = useEvents({ id: params.id });

  const renderItem = () => {
    if (!events.length) return null;
    return <EventItemSection event={events[0]} />;
  };

  return (
    <div className="page">
      <div className="page_content">{renderItem()}</div>
    </div>
  );
};
