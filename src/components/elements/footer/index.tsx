import './footer.scss';

import { isMobile } from 'react-device-detect';

import Logo from 'assets/logo.svg';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
  const handleClick = () => {};
  const navigate = useNavigate();
  return (
    <div className={`page_footer ${isMobile ? 'mobile' : ''}`}>
      <div className="page_footer_content">
        <div className="item text">Siti web © 2023. Tutti i diritti riservati.</div>
        <div className="item logo">
          <img onClick={() => navigate('/')} src={Logo} alt="logo" />
        </div>
        <div className="item social_media">
          <a className="unstyled-link" href=" https://www.facebook.com/goldenbeachalbisola">
            <FacebookIcon onClick={handleClick} />
          </a>
          <a className="unstyled-link" href="https://www.instagram.com/goldenbeach_albisola/?hl=it">
            <InstagramIcon onClick={handleClick} />
          </a>
          <a className="unstyled-link" href="https://www.youtube.com/@discotecaGoldenBeach">
            <YouTubeIcon onClick={handleClick} />
          </a>
        </div>
      </div>
    </div>
  );
};
