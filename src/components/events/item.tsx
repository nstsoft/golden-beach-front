import { type Event, cutString } from 'utils';
import './item.scss';
import { isMobile } from 'react-device-detect';

export const EventItem = (event: Event) => {
  return (
    <div className="event_item">
      <div className="event_item_content">
        <div className="image_background">
          <img src={event.img} alt={event.name} />
        </div>
        <div className="content">
          <div className="body">
            <div className="date">
              <div className="month">{event.date.toLocaleString('default', { month: 'short' })}</div>
              <div className="day">{event.date.getDate()}</div>
            </div>
            <div className="text">
              <div className="title">{event.name}</div>
              <div className="description">{cutString(event.description, isMobile ? 90 : 110)}</div>
            </div>
          </div>
          <div className="footer">Read more</div>
        </div>
      </div>
    </div>
  );
};
