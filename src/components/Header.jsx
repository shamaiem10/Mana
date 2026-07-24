import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { links } from '../data.js';

const nav = [
  ['Shop', '#collections'],
  ['New Arrivals', '#new-arrivals'],
  ['Best Sellers', '#best-sellers'],
  ['Hair', 'https://manabeautyspirit.com/collections/hair'],
  ['Face', 'https://manabeautyspirit.com/collections/face'],
  ['Makeup', 'https://manabeautyspirit.com/collections/makeup'],
  ['Body', 'https://manabeautyspirit.com/collections/body'],
  ['Bundles', '#bundles'],
  ['Sale', links.sale],
  ['Ingredients', '#ingredients'],
  ['Skin Consultation', '#consultation']
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  return (
    <motion.header className="site-header" initial={{ opacity: 0, y: reduced ? 0 : -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0.2 : 0.55, delay: reduced ? 0 : 0.08 }}>
      <div className="header-main container-wide">
        <a className="brand" href="#top" aria-label="Mana home"><i className="bi bi-flower1" /><span>Mana</span><small>Beauty Spirit</small></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.slice(0, 8).map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <a href={links.shop} aria-label="Search products"><i className="bi bi-search" /></a>
          <a href={links.shop} aria-label="Shopping bag"><i className="bi bi-bag-heart" /></a>
          <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle menu"><i className={open ? 'bi bi-x-lg' : 'bi bi-list'} /></button>
        </div>
      </div>
      <div className="category-nav container-wide">
        {nav.slice(8).map(([label, href]) => <a key={label} href={href}>{label}</a>)}
      </div>
      <AnimatePresence>
        {open ? (
          <motion.nav className="mobile-nav" initial={{ opacity: 0, y: reduced ? 0 : -8, scale: reduced ? 1 : 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: reduced ? 0 : -6, scale: reduced ? 1 : 0.985 }} transition={{ duration: reduced ? 0.15 : 0.28 }}>
            {nav.map(([label, href], index) => <motion.a key={label} href={href} onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : index * 0.035 }}>{label}<i className="bi bi-arrow-up-right" /></motion.a>)}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
