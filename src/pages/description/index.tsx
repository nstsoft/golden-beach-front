import './description.scss';
import { AboutSection, ServiceSection, ShadowHeader, PhotoGallery, SpecialMenu } from 'components';
import { isMobile } from 'react-device-detect';
import { useParams } from 'react-router-dom';
import ClubPng from 'assets/description/club.png';
import BeachPng from 'assets/description/beach.png';
import RestaurantPng from 'assets/description/restaurant.png';
import { ServiceType } from 'utils';
import { useLanguage } from 'src/hooks';
import meta from 'src/meta';
import { Helmet } from 'react-helmet-async';

const images = {
  club: ClubPng,
  beach: BeachPng,
  restaurant: RestaurantPng,
};

export const DescriptionPage = () => {
  const params = useParams<{ type: ServiceType }>();
  const { t, language } = useLanguage();

  if (!params.type) return null;

  return (
    <div className={`page description-page ${isMobile ? 'mobile' : ''}`}>
      <Helmet>{meta[language][params.type]}</Helmet>
      <div className="page_video">
        <div className="page_video_content">
          <div className="big-title">{t(`descriptionPage.${params.type}.mainHeader`)}</div>
          <img src={images[params.type]} alt="" />
        </div>
      </div>
      <section className={`page_content ${isMobile ? 'mobile' : ''}`}>
        <AboutSection service={params.type} />
        <ShadowHeader
          bigText={t('Headers.providedServices.big')}
          smallText={t('Headers.providedServices.small')}
        />
        <ServiceSection service={params.type} />
        {params.type === 'restaurant' && (
          <div className="special-menu">
            <ShadowHeader bigText={t('Headers.menu.big')} smallText={t('Headers.menu.small')} />
            <SpecialMenu />
          </div>
        )}

        <ShadowHeader
          bigText={t('Headers.photoGallery.big')}
          smallText={t('Headers.photoGallery.small')}
        />
        <PhotoGallery type={params.type} />
      </section>
    </div>
  );
};
