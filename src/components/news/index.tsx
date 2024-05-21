import './events.scss';
import { useNews } from 'hooks';
import { EventItem } from './item';
import { isMobile } from 'react-device-detect';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1100 }, items: 3 },
  desktop: { breakpoint: { max: 1099, min: 760 }, items: 2 },
  tablet: { breakpoint: { max: 759, min: 0 }, items: 1 },
};

export const NewsSection = () => {
  const { news } = useNews();

  return (
    <section className={`news_section ${isMobile ? 'mobile' : ''}`}>
      <Carousel
        rewindWithAnimation={true}
        draggable={true}
        swipeable={true}
        removeArrowOnDeviceType="mobile"
        responsive={responsive}
        itemClass={'news_carousel_item'}
        arrows={!isMobile}
      >
        {news.map((item) => (
          <EventItem key={item.id} {...item} />
        ))}
      </Carousel>
    </section>
  );
};
