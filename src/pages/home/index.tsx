import './home.scss';
import Video from 'assets/pages/home/benvenuto.mp4';
import {
  ShadowHeader,
  EventsSection,
  BeachClubRestaurant,
  PhotoGallery,
  NewsSection,
  Offer,
  ContactUs,
} from 'components';
import { isMobile } from 'react-device-detect';
import { useLanguage } from 'src/hooks';
import meta from 'src/meta';
import { Helmet } from 'react-helmet-async';

export const HomePage = () => {
  const { t, language } = useLanguage();
  return (
    <div className={`page ${isMobile ? 'mobile' : ''}`}>
      <Helmet>{meta[language].home}</Helmet>
      <div className="page_video">
        <div className="page_video_content">
          <video loop={true} className="clip" autoPlay muted>
            <source src={Video} type="video/mp4" />
          </video>
        </div>
      </div>
      <section className={`page_content ${isMobile ? 'mobile' : ''}`}>
        <ShadowHeader
          bigText={t('Headers.UpcomingEvents.big')}
          smallText={t('Headers.UpcomingEvents.small')}
        />
        <EventsSection />
        <ShadowHeader
          bigText={t('Headers.DiscoverGB.big')}
          smallText={t('Headers.DiscoverGB.small')}
        />
        <BeachClubRestaurant />
        <ShadowHeader
          bigText={t('Headers.ServiceOffers.big')}
          smallText={t('Headers.ServiceOffers.small')}
        />
        <Offer />
        <ShadowHeader
          bigText={t('Headers.photoGallery.big')}
          smallText={t('Headers.photoGallery.small')}
        />
        <PhotoGallery showVisitGallery={isMobile} />
        <ShadowHeader
          bigText={t('Headers.interestingNews.big')}
          smallText={t('Headers.interestingNews.small')}
        />
        <NewsSection />
        <ShadowHeader
          bigText={t('Headers.locations.big')}
          smallText={t('Headers.locations.small')}
        />
        <ContactUs />
      </section>
    </div>
  );
};
