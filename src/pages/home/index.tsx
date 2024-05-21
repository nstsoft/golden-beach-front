import './home.scss';
import Video from 'assets/pages/home/benvenuto.mp4';
import { ShadowHeader, EventsSection, BeachClubRestaurant, PhotoGallery, NewsSection, Offer } from 'components';
import { isMobile } from 'react-device-detect';

export const HomePage = () => {
  return (
    <div className={`page ${isMobile ? 'mobile' : ''}`}>
      <div className="page_video">
        <div className="page_video_content">
          <video loop={true} className="clip" autoPlay muted>
            <source src={Video} type="video/mp4" />
          </video>
        </div>
      </div>
      <section className={`page_content ${isMobile ? 'mobile' : ''}`}>
        <ShadowHeader bigText="Upcoming" smallText="events" />
        <EventsSection />
        <ShadowHeader bigText="Discover" smallText="golden beach" />
        <BeachClubRestaurant />
        <ShadowHeader bigText="Service" smallText="offer" />
        <Offer />
        <ShadowHeader bigText="Gallery" smallText="photo" />
        <PhotoGallery />
        <ShadowHeader bigText="Interesting" smallText="news" />
        <NewsSection />
      </section>
    </div>
  );
};
