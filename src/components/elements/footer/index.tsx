import './footer.scss';

import { isMobile } from 'react-device-detect';

import Logo from 'assets/logo.svg';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

export const Footer = () => {
  const handleClick = () => {};
  return (
    <div className={`page_footer ${isMobile ? 'mobile' : ''}`}>
      <div className="page_footer_content">
        <div className="item text">Siti web © 2023. Tutti i diritti riservati.</div>
        <div className="item logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="item social_media">
          <FacebookIcon onClick={handleClick} />
          <InstagramIcon onClick={handleClick} />
          <YouTubeIcon onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};
