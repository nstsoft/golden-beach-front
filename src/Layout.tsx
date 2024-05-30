import './index.scss';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from 'components';

export const Layout = () => {
  return (
    <div>
      <Header />
      <div className="app-wrapper">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
