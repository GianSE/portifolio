import { useState } from 'react';
import styles from './Avatar.module.css';

interface AvatarProps {
  src?: string;
  alt: string;
  /** iniciais exibidas no fallback */
  initials?: string;
}

/**
 * Avatar com anel gradiente. Se `src` faltar ou falhar ao carregar,
 * exibe um monograma — evita imagem quebrada antes do upload no CMS.
 */
export function Avatar({ src, alt, initials = 'GR' }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <div className={styles.ring}>
      <div className={styles.inner}>
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className={styles.img}
            loading="eager"
            decoding="async"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className={styles.initials} aria-label={alt}>
            {initials}
          </span>
        )}
      </div>
    </div>
  );
}
