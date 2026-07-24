import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

export function ImageAsset({ src, alt, className = '', hover = {}, initial, animate, transition, style }) {
  const [failed, setFailed] = useState(false);
  const reduced = useReducedMotion();
  return (
    <div className={`image-shell ${className} ${failed ? 'is-failed' : ''}`}>
      <div className="image-fallback" aria-hidden="true"><i className="bi bi-flower1" /></div>
      {!failed && (
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          initial={reduced ? { opacity: 0 } : initial}
          animate={reduced ? { opacity: 1 } : animate}
          whileHover={reduced ? undefined : hover}
          transition={reduced ? { duration: 0.2, ease: 'linear' } : transition}
          style={style}
        />
      )}
    </div>
  );
}

export function Reveal({ children, className = '', delay = 0, direction = 'up' }) {
  const reduced = useReducedMotion();
  const offset = direction === 'left' ? { x: -28 } : direction === 'right' ? { x: 28 } : { y: 24 };
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, ...offset }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.22, margin: '0px 0px -8% 0px' }}
      transition={{ duration: reduced ? 0.2 : 0.56, delay: reduced ? 0 : delay, ease: reduced ? 'linear' : ease }}
    >
      {children}
    </motion.div>
  );
}

export function Action({ href, children, secondary = false, icon = 'bi bi-arrow-right' }) {
  const reduced = useReducedMotion();
  return (
    <motion.a
      className={`button ${secondary ? 'button-secondary' : 'button-primary'}`}
      href={href}
      whileHover={reduced ? undefined : { y: -3, scale: 1.03 }}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      transition={{ duration: reduced ? 0.15 : 0.24, ease }}
    >
      <span>{children}</span><i className={icon || 'bi bi-arrow-right'} />
    </motion.a>
  );
}

export function SectionHeading({ eyebrow, title, copy, action }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
      {action ? <a className="text-link" href={action.href}>{action.label}<i className="bi bi-arrow-right-circle" /></a> : null}
    </div>
  );
}
