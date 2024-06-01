import './index.scss';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from 'components';
import { useEffect } from 'react';

export const Layout = () => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://golden-beach-public-assets.s3.eu-west-1.amazonaws.com/public.js';
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
