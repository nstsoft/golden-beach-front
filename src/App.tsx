import { type RouteObject, useRoutes } from 'react-router-dom';
import { Layout } from './Layout';
import { HomePage, EventsPage, NotFoundPage, Gallery } from 'src/pages';

export default function App() {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: '/events', element: <EventsPage /> },
        { path: '/gallery', element: <Gallery /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ];

  const element = useRoutes(routes);

  return <div>{element}</div>;
}
