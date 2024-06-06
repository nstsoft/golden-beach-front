import './sideMenu.scss';
import { FC } from 'react';
import logo from 'assets/logo.svg';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { ArrowRightSvg } from 'assets/svg/header';

type Props = {
  toggleDrawer: (newOpen?: boolean) => void;
};

export const SideMenu: FC<Props> = ({ toggleDrawer }) => {
  const { t } = useTranslation();
  const handleClick = () => {
    toggleDrawer();
  };
  return (
    <div className={`side-menu  ${isMobile ? 'mobile' : ''}`}>
      <div className="close" onClick={handleClick}>
        <ArrowRightSvg />
      </div>
      <div className="side-menu_content">
        <div className="logo">
          <img src={logo} alt="Golden beach logo" />
        </div>
        <div className="menu">
          <div className="menu_items">
            <Link onClick={handleClick} className="link" to="/">
              {t('HomePage.Menu.home')}
            </Link>

            <Link onClick={handleClick} className="link" to="golden-beach/club">
              {t('HomePage.Menu.club')}
            </Link>
            <Link onClick={handleClick} className="link" to="golden-beach/beach">
              {t('HomePage.Menu.beach')}
            </Link>
            <Link onClick={handleClick} className="link" to="golden-beach/restaurant">
              {t('HomePage.Menu.restaurant')}
            </Link>
            <Link onClick={handleClick} className="link" to="events">
              {t('HomePage.Menu.events')}
            </Link>
            <Link onClick={handleClick} className="link" to="news">
              {t('HomePage.Menu.news')}
            </Link>
            <Link onClick={handleClick} className="link" to="gallery">
              {t('HomePage.Menu.gallery')}
            </Link>
          </div>
          <div className="social_media">
            <a href=" https://www.facebook.com/goldenbeachalbisola">
              <FacebookIcon onClick={handleClick} />
            </a>
            <a href="https://www.instagram.com/goldenbeach_albisola/?hl=it">
              <InstagramIcon onClick={handleClick} />
            </a>
            <a href="https://www.youtube.com/@discotecaGoldenBeach">
              <YouTubeIcon onClick={handleClick} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
