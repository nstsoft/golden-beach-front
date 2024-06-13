import './about.scss';
import { ServiceType } from 'utils';
import { FC } from 'react';
import ClubImg from 'assets/description/d_club.png';
import BeachImg from 'assets/description/d_beach.png';
import RestaurantImg from 'assets/description/d_restaurant.png';
import { useLanguage } from 'hooks';

const images: Record<ServiceType, string> = {
  club: ClubImg,
  beach: BeachImg,
  restaurant: RestaurantImg,
};

type Props = { service: ServiceType };

export const AboutSection: FC<Props> = ({ service }) => {
  const { t } = useLanguage();

  return (
    <section className="about-section">
      <h2>{t(`descriptionPage.${service}.aboutTitle`)}</h2>
      <p>{t(`descriptionPage.${service}.aboutDescription`)}</p>
      <div className="image">
        <img src={images[service]} alt="" />
      </div>
    </section>
  );
};
