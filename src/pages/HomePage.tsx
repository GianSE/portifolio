import { useSeo } from '@/hooks/useSeo';
import { getAbout } from '@/services/content.service';
import { Hero } from '@/sections/Hero/Hero';
import { About } from '@/sections/About/About';
import { Skills } from '@/sections/Skills/Skills';
import { Projects } from '@/sections/Projects/Projects';
import { Architectures } from '@/sections/Architectures/Architectures';
import { Dashboards } from '@/sections/Dashboards/Dashboards';
import { Timeline } from '@/sections/Timeline/Timeline';
import { Terminal } from '@/sections/Terminal/Terminal';
import { Contact } from '@/sections/Contact/Contact';

export default function HomePage() {
  useSeo({ path: '/' });
  const about = getAbout();

  return (
    <>
      <Hero about={about} />
      <About about={about} />
      <Skills about={about} />
      <Projects />
      <Architectures />
      <Dashboards />
      <Timeline />
      <Terminal />
      <Contact />
    </>
  );
}
