import { useRoutes, useLocation, Navigate, RouteObject } from 'react-router-dom';
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
import { Language } from 'utils';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const routes: RouteObject[] = Object.values(Language).map((language) => ({
  path: `/${language}`,
  element: <Layout />,
  children: [
    { index: true, element: <HomePage /> },
    { path: 'events', element: <EventsPage /> },
    { path: 'events/:id', element: <EventItemPage /> },
    { path: 'news/:id', element: <NewsItemPage /> },
    { path: 'news', element: <NewsPage /> },
    { path: 'golden-beach/:type', element: <DescriptionPage /> },
    { path: 'gallery/:id', element: <GalleryPage /> },
    { path: 'gallery', element: <GalleryPage /> },
    { path: 'admin', element: <AdminPage /> },
    { path: 'golden-beach/restaurant/menu/:id', element: <DishPage /> },
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
    const languageFromUrl = pathSegments[1] as Language;
    if (Object.values(Language).includes(languageFromUrl)) {
      i18n.changeLanguage(languageFromUrl);
    } else {
      i18n.changeLanguage('it');
    }
  }, [pathname, i18n]);

  routes.push({
    path: '/',
    element: <Navigate to={`/${i18n.language}`} />,
  } as RouteObject);

  const element = useRoutes(routes);

  return <div>{element}</div>;
}
