import './description.scss';
import { AboutSection, ServiceSection, ShadowHeader } from 'components';
import { isMobile } from 'react-device-detect';
import { useParams } from 'react-router-dom';
import ClubPng from 'assets/description/club.png';
import BeachPng from 'assets/description/beach.png';
import RestaurantPng from 'assets/description/restaurant.png';
import { ServiceType } from 'utils';

const images = {
  club: ClubPng,
  beach: BeachPng,
  restaurant: RestaurantPng,
};

export const DescriptionPage = () => {
  const params = useParams<{ type: ServiceType }>();

  if (!params.type) return null;

  return (
    <div className={`page description-page ${isMobile ? 'mobile' : ''}`}>
      <div className="page_video">
        <div className="page_video_content">
          <div className="big-title">{params.type}</div>
          <img src={images[params.type]} alt="" />
          {/* <video loop={true} className="clip" autoPlay muted>
            <source src={Video} type="video/mp4" />
          </video> */}
        </div>
      </div>
      <section className={`page_content ${isMobile ? 'mobile' : ''}`}>
        <AboutSection service={params.type} />
        <ShadowHeader bigText="Provide" smallText="service" />
        <ServiceSection service={params.type} />
      </section>
    </div>
  );
};
