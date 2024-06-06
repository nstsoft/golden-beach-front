import { type RouteObject, useRoutes, useLocation } from 'react-router-dom';
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
import { useEffect } from 'react';

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: '/events', element: <EventsPage /> },
        { path: '/events/:id', element: <EventItemPage /> },
        { path: '/news/:id', element: <NewsItemPage /> },
        { path: '/news', element: <NewsPage /> },
        { path: '/golden-beach/:type', element: <DescriptionPage /> },
        { path: '/gallery/:id', element: <GalleryPage /> },
        { path: '/gallery', element: <GalleryPage /> },
        { path: '/admin', element: <AdminPage /> },
        { path: '/golden-beach/restaurant/menu/:id', element: <DishPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ];

  const element = useRoutes(routes);

  return <div>{element}</div>;
}
