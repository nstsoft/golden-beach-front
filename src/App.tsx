import { useRoutes, useLocation, RouteObject } from 'react-router-dom';
import { Layout } from './Layout';
import {
  HomePage,
  EventsPage,
  NotFoundPage,
  GalleryPage,
  EventItemPage,
  AdminPage,
  DishPage,
  DescriptionPage,
  NewsItemPage,
  NewsPage,
} from 'src/pages';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const routes: RouteObject[] = ['', 'en'].map((language) => ({
  path: `/${language}`,
  element: <Layout />,
  children: [
    { index: true, element: <HomePage /> },
    { path: 'events', element: <EventsPage /> },
    { path: 'events/:id', element: <EventItemPage /> },
    { path: 'news/:id', element: <NewsItemPage /> },
    { path: 'news', element: <NewsPage /> },
    { path: 'beach', element: <DescriptionPage /> },
    { path: 'club', element: <DescriptionPage /> },
    { path: 'restaurant', element: <DescriptionPage /> },
    { path: 'gallery/:id', element: <GalleryPage /> },
    { path: 'gallery', element: <GalleryPage /> },
    { path: 'admin', element: <AdminPage /> },
    { path: 'restaurant/menu/:id', element: <DishPage /> },
    { path: '*', element: <NotFoundPage /> },
  ],
}));

export default function App() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const pathSegments = pathname.split('/');

    if (pathSegments[1] === 'en') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('it');
    }
  }, [pathname, i18n]);

  const element = useRoutes(routes);

  return <div>{element}</div>;
}
