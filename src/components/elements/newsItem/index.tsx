import './newsItem.scss';
import { FC } from 'react';
import { type Event, cutString } from 'utils';
import { CalendarSvg } from 'assets/svg';
import moment from 'moment';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';
import { CustomButton } from '../button';

type Props = {
  newsItem: Event;
};

export const NewsItem: FC<Props> = ({ newsItem }) => {
  return (
    <Link className="unstyled-link" to={`/news/${newsItem._id}`}>
      <section className={`news-item news ${isMobile ? 'mobile' : ''}`}>
        <div className="image">
          <img src={newsItem.image} width={380} />
        </div>
        <div className="text">
          <div className="date">
            <CalendarSvg /> <a>{moment(newsItem.date).format('MMM DD | HH:mma')}</a>
          </div>
          <div className="title white-header-text">{newsItem.name}</div>
          <div className="description shadowed-text">
            {cutString(newsItem.descriptionEng, isMobile ? 230 : 400)}
          </div>
          <div className={isMobile ? '' : 'news-item-button-container'}>
            <CustomButton>Read more</CustomButton>
          </div>
        </div>
      </section>
    </Link>
  );
};
