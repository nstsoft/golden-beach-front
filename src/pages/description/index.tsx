import './description.scss';
import { AboutSection, ServiceSection, ShadowHeader, PhotoGallery, SpecialMenu } from 'components';
import { isMobile } from 'react-device-detect';
import { useLocation } from 'react-router-dom';
import ClubPng from 'assets/description/club.png';
import BeachPng from 'assets/description/beach.png';
import RestaurantPng from 'assets/description/restaurant.png';
import { ServiceType } from 'utils';
import { useLanguage } from 'hooks';
import meta from 'src/meta';
import { Helmet } from 'react-helmet-async';

const images = {
  club: ClubPng,
  beach: BeachPng,
  restaurant: RestaurantPng,
};

export const DescriptionPage = () => {
  const { t, language } = useLanguage();
  const { pathname } = useLocation();

  let type = ServiceType.restaurant;

  if (pathname.includes(ServiceType.beach)) {
    type = ServiceType.beach;
  }
  if (pathname.includes(ServiceType.club)) {
    type = ServiceType.club;
  }

  console.log(type, pathname);

  return (
    <div className={`page description-page ${isMobile ? 'mobile' : ''}`}>
      <Helmet>{meta[language][type]}</Helmet>
      <div className="page_video">
        <div className="page_video_content">
          <div className="big-title">{t(`descriptionPage.${type}.mainHeader`)}</div>
          <img src={images[type]} alt="" />
        </div>
      </div>
      <section className={`page_content ${isMobile ? 'mobile' : ''}`}>
        <AboutSection service={type} />
        <ShadowHeader
          bigText={t('Headers.providedServices.big')}
          smallText={t('Headers.providedServices.small')}
        />
        <ServiceSection service={type} />
        {type === 'restaurant' && (
          <div className="special-menu">
            <ShadowHeader bigText={t('Headers.menu.big')} smallText={t('Headers.menu.small')} />
            <SpecialMenu />
          </div>
        )}

        <ShadowHeader
          bigText={t('Headers.photoGallery.big')}
          smallText={t('Headers.photoGallery.small')}
        />
        <PhotoGallery type={type} />
      </section>
    </div>
  );
};
