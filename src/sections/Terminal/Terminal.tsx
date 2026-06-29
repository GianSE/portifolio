import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/Section/Section';
import { fadeInUp, viewportOnce } from '@/animations/variants';
import styles from './Terminal.module.css';

interface Line {
  type: 'cmd' | 'out' | 'blank';
  text: string;
}

const SCRIPT: Line[] = [
  { type: 'cmd',   text: 'whoami' },
  { type: 'out',   text: 'Gian Rodrigues' },
  { type: 'blank', text: '' },
  { type: 'cmd',   text: 'role' },
  { type: 'out',   text: 'Software & Data Engineer' },
  { type: 'blank', text: '' },
  { type: 'cmd',   text: 'stack' },
  { type: 'out',   text: 'React  Node.js  PostgreSQL  Docker  Data Engineering' },
  { type: 'blank', text: '' },
  { type: 'cmd',   text: 'focus' },
  { type: 'out',   text: 'Corporate Architecture + Data + Security' },
  { type: 'blank', text: '' },
  { type: 'cmd',   text: 'contact' },
  { type: 'out',   text: 'gianpedrodev@gmail.com' },
];

const DELAY_CMD  = 40;  // ms por caractere no comando
const DELAY_LINE = 300; // ms entre linhas

export function Terminal() {
  const [visible, setVisible] = useState<Line[]>([]);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // IntersectionObserver para iniciar quando entrar na viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setVisible(SCRIPT); return; }

    let timeout: ReturnType<typeof setTimeout>;
    let lineIdx = 0;

    const next = () => {
      if (lineIdx >= SCRIPT.length) return;
      const line = SCRIPT[lineIdx++];

      if (line.type !== 'cmd') {
        setVisible((v) => [...v, line]);
        timeout = setTimeout(next, DELAY_LINE);
        return;
      }

      // Digita o comando caractere a caractere
      let charIdx = 0;
      const typing = () => {
        charIdx++;
        setVisible((v) => {
          const last = v[v.length - 1];
          if (last?.type === 'cmd' && last.text !== line.text) {
            return [...v.slice(0, -1), { ...last, text: line.text.slice(0, charIdx) }];
          }
          return [...v, { type: 'cmd', text: line.text.slice(0, charIdx) }];
        });
        if (charIdx < line.text.length) {
          timeout = setTimeout(typing, DELAY_CMD);
        } else {
          timeout = setTimeout(next, DELAY_LINE);
        }
      };
      typing();
    };

    timeout = setTimeout(next, 400);
    return () => clearTimeout(timeout);
  }, [started]);

  return (
    <Section id="terminal" eyebrow="// terminal" title="">
      <motion.div
        ref={ref}
        className={styles.terminal}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {/* Top bar */}
        <div className={styles.topBar}>
          <div className={styles.dots}>
            <span className={styles.dot} style={{ background: '#ff5f56' }} />
            <span className={styles.dot} style={{ background: '#ffbd2e' }} />
            <span className={styles.dot} style={{ background: '#27c93f' }} />
          </div>
          <span className={styles.title}>gian@portfolio ~ bash</span>
        </div>

        {/* Output */}
        <div className={styles.body}>
          {visible.map((line, i) => (
            <div key={i} className={styles.line}>
              {line.type === 'cmd' && (
                <>
                  <span className={styles.prompt}>$</span>
                  <span className={styles.cmd}>{line.text}</span>
                  {i === visible.length - 1 && <span className={styles.cursor} aria-hidden="true" />}
                </>
              )}
              {line.type === 'out'   && <span className={styles.out}>{line.text}</span>}
              {line.type === 'blank' && <span>&nbsp;</span>}
            </div>
          ))}

          {/* Prompt final aguardando input */}
          {visible.length === SCRIPT.length && (
            <div className={styles.line}>
              <span className={styles.prompt}>$</span>
              <span className={styles.cursor} aria-hidden="true" />
            </div>
          )}
        </div>
      </motion.div>
    </Section>
  );
}
