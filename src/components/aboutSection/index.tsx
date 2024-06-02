import './about.scss';
import { ServiceType } from 'utils';
import { FC } from 'react';
import { descriptions } from './descriptions';
import { useTranslation } from 'react-i18next';
import ClubImg from 'assets/description/d_club.png';
import BeachImg from 'assets/description/d_beach.png';
import RestaurantImg from 'assets/description/d_restaurant.png';

const images: Record<ServiceType, string> = {
  club: ClubImg,
  beach: BeachImg,
  restaurant: RestaurantImg,
};

type Props = {
  service: ServiceType;
};

type Languages = 'en' | 'it';

export const AboutSection: FC<Props> = ({ service }) => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language as Languages;
  console.log(currentLanguage);
  const description = descriptions[currentLanguage][service];

  return (
    <section className="about-section">
      <h2>About {service}</h2>
      <p>{description}</p>
      <div className="image">
        <img src={images[service]} alt="" />
      </div>
    </section>
  );
};
