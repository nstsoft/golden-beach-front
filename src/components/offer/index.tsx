import './offer.scss';
import Image from 'assets/pages/home/offer.jpeg';
import { useTranslation } from 'react-i18next';
export const Offer = () => {
  const { t } = useTranslation();
  return (
    <section className="offer">
      <div className="offer_content">
        <div className="offer_text">
          <div className="item">
            <div className="white-header-text"> {t('serviceOffers.1.title')}</div>
            <div className="description shadowed-text">{t('serviceOffers.1.text')}</div>
          </div>
          <div className="item">
            <div className="white-header-text"> {t('serviceOffers.2.title')}</div>
            <div className="description shadowed-text">{t('serviceOffers.1.text')}</div>
          </div>
          <div className="item">
            <div className="white-header-text"> {t('serviceOffers.3.title')}</div>
            <div className="description shadowed-text">{t('serviceOffers.1.text')}</div>
          </div>
        </div>
        <div className="offer_image">
          <img src={Image} alt="offer" />
        </div>
      </div>
    </section>
  );
};
