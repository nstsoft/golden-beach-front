import './home.scss';
import Video from 'assets/pages/home/benvenuto.mp4';
import { ShadowHeader, EventsSection } from 'components';
import { isMobile } from 'react-device-detect';

export const HomePage = () => {
  return (
    <div className={`page ${isMobile ? 'mobile' : ''}`}>
      <div className="page_video">
        <video loop={true} className="clip" autoPlay muted>
          <source src={Video} type="video/mp4" />
        </video>
      </div>
      <section className={`page_content ${isMobile ? 'mobile' : ''}`}>
        <ShadowHeader bigText="Upcoming" smallText="events" />
        <EventsSection />
        <ShadowHeader bigText="Discover" smallText="goleden beach" />
      </section>
    </div>
  );
};
