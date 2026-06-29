import type { ReactNode } from 'react';
import styles from './Tag.module.css';

interface TagProps {
  children: ReactNode;
  variant?: 'default' | 'accent';
}

export function Tag({ children, variant = 'default' }: TagProps) {
  return (
    <span className={[styles.tag, styles[variant]].join(' ')}>
      {children}
    </span>
  );
}
