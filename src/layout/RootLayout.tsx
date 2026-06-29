import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Loader } from '@/components/Loader/Loader';
import { ScrollToTop } from '@/components/ScrollToTop/ScrollToTop';
import { ScrollProgress } from '@/components/ScrollProgress/ScrollProgress';
import { BackToTop } from '@/components/BackToTop/BackToTop';
import { Navbar } from '@/layout/Navbar/Navbar';
import { Footer } from '@/layout/Footer/Footer';

/** Layout raiz compartilhado por todas as rotas. */
export function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <a href="#hero" className="sr-only">
        Pular para o conteúdo
      </a>

      <Navbar />

      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
