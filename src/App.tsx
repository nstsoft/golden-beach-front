import { type RouteObject, useRoutes } from 'react-router-dom';
import { Layout } from './Layout';
import { HomePage, EventsPage, NotFoundPage, Gallery, EventItem, AdminPage } from 'src/pages';
import { NewsPage } from './pages/news';
import { NewsItem } from './pages/news-item';

export default function App() {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: '/events', element: <EventsPage /> },
        { path: '/events/:id', element: <EventItem /> },
        { path: '/news', element: <NewsPage /> },
        { path: '/news/:id', element: <NewsItem /> },
        { path: '/gallery', element: <Gallery /> },
        { path: '/admin', element: <AdminPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ];

  const element = useRoutes(routes);

  return <div>{element}</div>;
}
