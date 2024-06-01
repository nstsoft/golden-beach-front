import './service.scss';
import { ServiceType } from 'utils';
import { FC } from 'react';
import { services } from './services';
import { useTranslation } from 'react-i18next';
import ClubImg from 'assets/service/club.png';
import BeachImg from 'assets/service/beach.png';
import RestaurantImg from 'assets/service/restaurant.png';

const images: Record<ServiceType, string> = {
  club: ClubImg,
  beach: BeachImg,
  restaurant: RestaurantImg,
};

type Props = { service: ServiceType };

type Languages = 'en' | 'it';

const renderServiceItem = (item: string, index: number) => {
  let numberItem = '' + (index + 1);
  if (numberItem.length < 2) {
    numberItem = '0' + numberItem;
  }

  return (
    <div className="item" key={index}>
      <div className="number">{numberItem}</div>
      <div className="text">{item}</div>
    </div>
  );
};

export const ServiceSection: FC<Props> = ({ service }) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language as Languages;
  const serviceList: string[] = services[currentLanguage][service];

  return (
    <section className="service-section">
      <div className="image">
        <img src={images[service]} alt="" />
      </div>
      <div className="service-list">{serviceList.map(renderServiceItem)}</div>
    </section>
  );
};
