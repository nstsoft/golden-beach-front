import './events.scss';
import { useNews } from 'hooks';
import { CustomCarousel } from 'components';
import { EventItem } from './item';
import { splitByChunks, type Event } from 'utils';
import { isMobile } from 'react-device-detect';

const windowWidth = window.innerWidth;

const ItemsSet = ({ chunk }: { chunk: Event[] }) => {
  return (
    <div className="news_item_set">
      {chunk.map((item) => (
        <EventItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export const NewsSection = () => {
  const { news } = useNews();
  const chunks = splitByChunks(news, windowWidth < 1200 ? 2 : 3);

  return (
    <section className={`news_section ${isMobile ? 'mobile' : ''}`}>
      <CustomCarousel
        stopAutoPlayOnHover={true}
        swipe={true}
        className="carousel"
        autoPlay={true}
        animation="slide"
        timeout={400}
        interval={5000}
      >
        {chunks.map((chunk, i) => (
          <ItemsSet chunk={chunk} key={`slide_${i}`} />
        ))}
      </CustomCarousel>
      <div className="mobile_section" style={{ display: isMobile ? 'flex' : 'none' }}>
        {news.map((item) => (
          <EventItem key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};
