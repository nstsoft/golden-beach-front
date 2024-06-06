import './beachClubRestaurant.scss';
import { isMobile } from 'react-device-detect';
import ClubImg from 'assets/hardcode/club.jpeg';
import RestaurantImg from 'assets/hardcode/restaurant.jpeg';
import BeachImg from 'assets/hardcode/beach.jpeg';
import { ArrowRightSvg } from 'assets/svg/header';
import { useRef, useState, useEffect } from 'react';
import Grow from '@mui/material/Grow';
import { useIntersectionObserver } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const BeachClubRestaurant = () => {
  const { t } = useTranslation();

  const componentRef = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const navigate = useNavigate();

  const { isIntersecting } = useIntersectionObserver(componentRef, { threshold: 0.1 });

  useEffect(() => {
    if (isIntersecting && !isAnimated) {
      setIsAnimated(true);
    }
  }, [isIntersecting, isAnimated]);

  return (
    <section className={`beach-club-restaurant ${isMobile ? 'mobile' : ''}`}>
      <div ref={componentRef} className="content">
        <Grow in={isIntersecting || isAnimated}>
          <div className="item" onClick={() => navigate('/golden-beach/club')}>
            <div className="image">
              <img src={ClubImg} />
            </div>
            <div className="text">
              <div className="title white-header-text">{t('discover.club.title')}</div>
              <div className="decsription shadowed-text">{t('discover.club.description')}</div>
              <div className="footer">
                <div className="details">{t('discover.more')}</div> <ArrowRightSvg />
              </div>
            </div>
          </div>
        </Grow>
        <Grow timeout={500} in={isIntersecting || isAnimated}>
          <div className="item" onClick={() => navigate('/golden-beach/restaurant')}>
            <div className="image">
              <img src={RestaurantImg} />
            </div>
            <div className="text">
              <div className="title white-header-text">{t('discover.restaurant.title')}</div>
              <div className="decsription shadowed-text">
                {t('discover.restaurant.description')}
              </div>
              <div className="footer">
                <div className="details">{t('discover.more')}</div> <ArrowRightSvg />
              </div>
            </div>
          </div>
        </Grow>
        <Grow in={isIntersecting || isAnimated} timeout={1000}>
          <div className="item" onClick={() => navigate('/golden-beach/beach')}>
            <div className="image">
              <img src={BeachImg} />
            </div>
            <div className="text text-last">
              <div className="title white-header-text">{t('discover.beach.title')}</div>
              <div className="decsription shadowed-text">{t('discover.beach.description')}</div>
              <div className="footer">
                <div className="details">{t('discover.more')}</div> <ArrowRightSvg />
              </div>
            </div>
          </div>
        </Grow>
      </div>
    </section>
  );
};
