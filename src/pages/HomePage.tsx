import { useSeo } from '@/hooks/useSeo';
import { useLocale } from '@/hooks/useLocale';
import { getAbout, localizeAbout } from '@/services/content.service';
import { Hero } from '@/sections/Hero/Hero';
import { About } from '@/sections/About/About';
import { Skills } from '@/sections/Skills/Skills';
import { Projects } from '@/sections/Projects/Projects';
import { Architectures } from '@/sections/Architectures/Architectures';
import { Timeline } from '@/sections/Timeline/Timeline';
import { Terminal } from '@/sections/Terminal/Terminal';
import { Contact } from '@/sections/Contact/Contact';

export default function HomePage() {
  const { locale } = useLocale();
  const aboutRaw = getAbout();
  const about = aboutRaw ? localizeAbout(aboutRaw, locale) : undefined;
  useSeo({ path: '/', description: about?.subheadline });

  return (
    <>
      <Hero about={about} />
      <About about={about} />
      <Skills about={about} />
      <Projects />
      <Architectures />
      <Timeline />
      <Terminal />
      <Contact />
    </>
  );
}
