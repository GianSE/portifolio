import { Link } from 'react-router-dom';
import { useSeo } from '@/hooks/useSeo';
import { useLocale } from '@/hooks/useLocale';
import { STRINGS } from '@/i18n/strings';
import { SITE } from '@/data/site';
import { formatMonthYear } from '@/utils/format';
import {
  getAbout,
  getExperiences,
  localizeAbout,
  localizeExperience,
} from '@/services/content.service';
import type { Experience } from '@/types/content';
import { Icon, type IconName } from '@/components/Icon/Icon';
import styles from './CurriculoPage.module.css';

interface EntryProps { exp: Experience; locale: 'pt' | 'en'; current: string; }

function Entry({ exp, locale, current }: EntryProps) {
  return (
    <div className={styles.entry}>
      <div className={styles.entryHead}>
        <span className={styles.entryTitle}>
          {exp.role}
          <span className={styles.entryOrg}> — {exp.organization}</span>
        </span>
        <span className={styles.entryDate}>
          {formatMonthYear(exp.startDate, locale)} – {exp.current ? current : formatMonthYear(exp.endDate, locale)}
        </span>
      </div>
      {exp.description && <p className={styles.entryDesc}>{exp.description}</p>}
      {exp.highlights.length > 0 && (
        <ul className={styles.entryHighlights}>
          {exp.highlights.map((h) => <li key={h}>{h}</li>)}
        </ul>
      )}
    </div>
  );
}

interface ContactItemProps { icon: IconName; href: string; label: string; external?: boolean; }

function ContactItem({ icon, href, label, external }: ContactItemProps) {
  return (
    <li className={styles.contactItem}>
      <Icon name={icon} size={14} className={styles.contactIcon} />
      <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
        {label}
      </a>
    </li>
  );
}

export default function CurriculoPage() {
  const { locale } = useLocale();
  const t = STRINGS[locale];
  useSeo({ title: t.cv.seoTitle, path: '/curriculo' });

  const aboutRaw = getAbout();
  const about = aboutRaw ? localizeAbout(aboutRaw, locale) : undefined;

  // Filtra pelo campo em pt (estável independente do idioma) antes de localizar.
  const allExperiences = getExperiences();
  const education = allExperiences
    .filter((e) => e.area === 'Formação')
    .map((e) => localizeExperience(e, locale));
  const workExperience = allExperiences
    .filter((e) => e.area !== 'Formação')
    .map((e) => localizeExperience(e, locale));

  return (
    <div className={`container ${styles.page}`}>
      <div className={`${styles.toolbar} no-print`}>
        <Link to="/" className={styles.backLink}>{t.cv.backToPortfolio}</Link>
        <button type="button" className={styles.printBtn} onClick={() => window.print()}>
          <Icon name="download" size={16} />
          {t.cv.downloadPdf}
        </button>
      </div>

      <article className={styles.sheet}>
        <header className={styles.header}>
          <h1 className={styles.name}>{SITE.name}</h1>
          {about?.headline && <p className={styles.tagline}>{about.headline}</p>}
          <ul className={styles.contacts}>
            <ContactItem icon="mail" href={`mailto:${SITE.email}`} label={SITE.email} />
            <ContactItem icon="phone" href={`tel:${SITE.phone.replace(/[^\d+]/g, '')}`} label={SITE.phone} />
            <ContactItem icon="github" href={SITE.githubUrl} label="github.com/GianSE" external />
            <ContactItem icon="linkedin" href={SITE.linkedinUrl} label="linkedin.com/in/gian-pedro-rodrigues" external />
          </ul>
        </header>

        {about?.cvSummary && (
          <section className={styles.section}>
            <h2>{t.cv.summary}</h2>
            <p className={styles.text}>{about.cvSummary}</p>
          </section>
        )}

        {about?.cvObjective && (
          <section className={styles.section}>
            <h2>{t.cv.objective}</h2>
            <p className={styles.text}>{about.cvObjective}</p>
          </section>
        )}

        {education.length > 0 && (
          <section className={styles.section}>
            <h2>{t.cv.education}</h2>
            {education.map((e) => <Entry key={e.slug} exp={e} locale={locale} current={t.timeline.current} />)}
          </section>
        )}

        {workExperience.length > 0 && (
          <section className={styles.section}>
            <h2>{t.cv.experience}</h2>
            {workExperience.map((e) => <Entry key={e.slug} exp={e} locale={locale} current={t.timeline.current} />)}
          </section>
        )}

        {about?.skills && about.skills.length > 0 && (
          <section className={styles.section}>
            <h2>{t.cv.skills}</h2>
            <div className={styles.skillGroups}>
              {about.skills.map((cat) => (
                <div key={cat.name} className={styles.skillGroup}>
                  <span className={styles.skillGroupLabel}>{cat.name}</span>
                  <div className={styles.chips}>
                    {cat.items.map((i) => <span key={i.name} className={styles.chip}>{i.name}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {about?.languages && about.languages.length > 0 && (
          <section className={styles.section}>
            <h2>{t.cv.languages}</h2>
            <ul className={styles.plainList}>
              {about.languages.map((l) => (
                <li key={l.name}><strong>{l.name}:</strong> {l.level}</li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </div>
  );
}
