import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@router/index.router';
import { RecoilRoot } from 'recoil';

createRoot(document.getElementById('root') as any).render(
  <RecoilRoot>
    <RouterProvider router={router} />
  </RecoilRoot>
);
