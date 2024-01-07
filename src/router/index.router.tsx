import MainLayout from '@src/common/layout/MainLayout';
import MainPage from '@src/feature/main/page/MainPage';
import { createBrowserRouter } from 'react-router-dom';
import path from '@constants/index';
import DetailPage from '@src/feature/main/page/DetailPage';

export const router = createBrowserRouter(
  [
    {
      path: `${path.router.main}*`,
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
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);
