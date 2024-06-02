import { type RouteObject, useRoutes } from 'react-router-dom';
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
} from 'src/pages';
import { NewsPage } from './pages/news';

export default function App() {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: '/events', element: <EventsPage /> },
        { path: '/events/:id', element: <EventItemPage /> },
        { path: '/news', element: <NewsPage /> },
        { path: '/golden-beach/:type', element: <DescriptionPage /> },
        { path: '/gallery', element: <GalleryPage /> },
        { path: '/admin', element: <AdminPage /> },
        { path: '/dish/:id', element: <DishPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ];

  const element = useRoutes(routes);

  return <div>{element}</div>;
}
