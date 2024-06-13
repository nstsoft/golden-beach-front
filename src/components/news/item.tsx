import { type Event, cutString } from 'utils';
import './item.scss';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';
import { useLanguage } from 'src/hooks';

export const EventItem = (event: Event) => {
  const { t, language } = useLanguage();
  return (
    <Link key={event._id} className="unstyled-link" to={`news/${event._id}`}>
      <div className="news_item">
        <div className="news_item_content">
          <div className="image_background">
            <img src={event.thumb} alt={event.name} />
          </div>
          <div className="content">
            <div className="body">
              <div className="date">
                <div className="month">
                  {event.date.toLocaleString('default', { month: 'short' })}
                </div>
                <div className="day">{event.date.getDate()}</div>
              </div>
              <div className="text">
                <div className="title">{event.name}</div>
                <div className="description">
                  {cutString(
                    language === 'en' ? event.descriptionEng : event.descriptionIt,
                    isMobile ? 80 : 110,
                  )}
                </div>
              </div>
            </div>
            <div className="footer">{t('readMore')}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
