import './index.scss';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from 'components';
import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';

export const Layout = () => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://golden-beach-public-assets.s3.eu-west-1.amazonaws.com/public.js';
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return (
    <div className={`layout ${isMobile ? 'mobile' : ''}`}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
