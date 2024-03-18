import MainLayout from '@src/common/layout/MainLayout';
import MainPage from '@src/feature/main/page/MainPage';
import { createBrowserRouter } from 'react-router-dom';
import path from '@constants/index';
import DetailPage from '@src/feature/main/page/DetailPage';
import SearchPage from '@src/feature/search/SearchPage';

export const router = createBrowserRouter(
  [
    {
      path: `${path.router.main}`,
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <MainPage />,
        },
        {
          path: `${path.router.detail}/*`,
          element: <DetailPage />,
        },
      ],
    },
    {
      path: `${path.router.main}`,
      element: <MainLayout />,
      children: [
        {
          path: `${path.router.search}/*`,
          element: <SearchPage />,
        },
      ],
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);
