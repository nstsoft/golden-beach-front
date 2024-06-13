import './service.scss';
import { ServiceType } from 'utils';
import { FC } from 'react';
import ClubImg from 'assets/service/club.png';
import BeachImg from 'assets/service/beach.png';
import RestaurantImg from 'assets/service/restaurant.png';
import { isMobile } from 'react-device-detect';
import { useLanguage } from 'hooks';

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
  const { t } = useLanguage();

  const services = t(`descriptionPage.${service}.services`, {
    returnObjects: true,
  }) as unknown as string[];

  return (
    <section className={`service-section  ${isMobile ? 'mobile' : ''}`}>
      <div className="image">
        <img src={images[service]} alt="" />
      </div>
      <div className="service-list">{services?.map(renderServiceItem)}</div>
    </section>
  );
};
