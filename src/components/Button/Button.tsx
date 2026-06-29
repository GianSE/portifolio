import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };
type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

/** Botão polimórfico (button | a) com variantes de marca. */
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', children, className, ...rest } = props;
  const cls = [styles.btn, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ');

  if (props.as === 'a') {
    const { as: _as, ...anchorRest } = rest as ButtonAsAnchor;
    void _as;
    return (
      <a className={cls} {...anchorRest}>
        {children}
      </a>
    );
  }

  const { as: _as, ...buttonRest } = rest as ButtonAsButton;
  void _as;
  return (
    <button className={cls} {...buttonRest}>
      {children}
    </button>
  );
}
