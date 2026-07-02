import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '@/layout/RootLayout';

// Code-splitting: cada rota vira um chunk separado.
const HomePage = lazy(() => import('@/pages/HomePage'));
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage'));
const CurriculoPage = lazy(() => import('@/pages/CurriculoPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/projetos/:slug', element: <ProjectDetailPage /> },
      { path: '/curriculo', element: <CurriculoPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
