import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { bestSellers, collections, galleryImages, ingredients, links } from '../data.js';
import { Action, ImageAsset, Reveal, SectionHeading } from './UI.jsx';

const ease = [0.16, 1, 0.3, 1];
const heroImage = 'https://manabeautyspirit.com/cdn/shop/files/Banners_New_-_Edited.jpg?v=1783594288&width=5000';
const ritualImage = 'https://manabeautyspirit.com/cdn/shop/files/Ecom-01_0a9f8070-522e-4bdc-8b3a-143dc44ff0a0.jpg?v=1779529562&width=1080';

export function Hero() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 0.8], [0, reduced ? 0 : 42]);
  const imageScale = useTransform(scrollYProgress, [0, 0.8], [1, reduced ? 1 : 1.035]);
  const chipsY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -96]);
  const words = ['Beauty', 'with', 'spirit,', 'made', 'for', 'your', 'ritual.'];
  return (
    <section className="hero" id="top">
      <motion.div className="hero-media" style={{ y: imageY, scale: imageScale }}>
        <ImageAsset src={heroImage} alt="Mana Beauty Spirit collection" className="hero-image" initial={{ opacity: 0, scale: reduced ? 1 : 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reduced ? 0.2 : 1.2, ease }} />
      </motion.div>
      <div className="hero-overlay" />
      <motion.div className="hero-blob" animate={reduced ? undefined : { x: [-12, 18, -12], y: [8, -14, 8], rotate: [0, 8, 0], scale: [1, 1.08, 1] }} transition={{ duration: 20, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }} />
      <div className="hero-inner container-wide">
        <div className="hero-copy">
          <motion.div className="hero-kicker" initial={{ opacity: 0, y: reduced ? 0 : 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 0.25, duration: reduced ? 0.2 : 0.68 }}><i className="bi bi-flower1" /> Ingredient-led beauty</motion.div>
          <h1 aria-label="Beauty with spirit, made for your ritual.">{words.map((word, index) => <span className="word-mask" key={word + index}><motion.span initial={{ opacity: 0, y: reduced ? 0 : '110%', rotate: reduced ? 0 : 1 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: reduced ? 0.2 : 0.72, delay: reduced ? 0 : 0.25 + index * 0.07, ease }}>{word}</motion.span></span>)}</h1>
          <motion.p initial={{ opacity: 0, y: reduced ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0.2 : 0.56, delay: reduced ? 0 : 0.52, ease }}>Discover face, hair, makeup and body care shaped around thoughtful ingredients.</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0.2 : 0.4, delay: reduced ? 0 : 0.7, ease }}>
            <Action href="#ritual" icon="bi bi-flower1">Shop Rituals</Action>
            <Action href="#best-sellers" secondary icon="bi bi-bag-heart">See Best Sellers</Action>
          </motion.div>
        </div>
        <motion.aside className="ritual-rail" style={{ y: chipsY }} aria-label="Ritual steps">
          {['Cleanse', 'Treat', 'Moisturize'].map((step, index) => <motion.a href="#ritual" key={step} initial={{ opacity: 0, x: reduced ? 0 : 24, scale: reduced ? 1 : 0.98 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: reduced ? 0 : 0.62 + index * 0.09, duration: reduced ? 0.2 : 0.58, ease }} whileHover={reduced ? undefined : { x: -6, scale: 1.025 }}><span>{String(index + 1).padStart(2, '0')}</span>{step}<i className="bi bi-arrow-down-left" /></motion.a>)}
        </motion.aside>
      </div>
    </section>
  );
}

const ritualSteps = [
  { name: 'Cleanse', title: 'Purifying Vitamin E Face wash', copy: 'A clear first step for your face ritual.', icon: 'bi bi-droplet', price: '1,125.00 PKR' },
  { name: 'Treat', title: 'Anti Blemish Face Serum', copy: 'Niacinamide 10% + 1% Zinc.', icon: 'bi bi-stars', price: 'From 630.00 PKR' },
  { name: 'Moisturize', title: 'Hydra Calm - Daily Moisturizing Lotion', copy: 'Daily care with an intense hydration formula.', icon: 'bi bi-heart', price: '1,020.00 PKR' }
];

export function Ritual() {
  const [active, setActive] = useState(0);
  const [added, setAdded] = useState(false);
  const reduced = useReducedMotion();
  const item = ritualSteps[active];
  return (
    <section className="ritual section-pad-xl" id="ritual">
      <div className="container ritual-grid">
        <Reveal className="ritual-stepper" direction="left">
          <SectionHeading eyebrow="Build your ritual" title="Cleanse. Treat. Moisturize." copy="A guided route through your daily care." />
          <div className="step-tabs" role="tablist">
            {ritualSteps.map((step, index) => <motion.button key={step.name} type="button" role="tab" aria-selected={active === index} className={active === index ? 'active' : ''} onClick={() => { setActive(index); setAdded(false); }} whileHover={reduced ? undefined : { x: 4 }}><motion.span animate={{ scale: active === index && !reduced ? 1 : 0.96 }}>{String(index + 1).padStart(2, '0')}</motion.span><i className={step.icon || 'bi bi-droplet'} />{step.name}</motion.button>)}
          </div>
        </Reveal>
        <div className="ritual-pane-wrap">
          <AnimatePresence mode="wait">
            <motion.article className="ritual-product" key={item.name} initial={{ opacity: 0, y: reduced ? 0 : 8, scale: reduced ? 1 : 1.04 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0.15 : 0.48, ease }} whileHover={reduced ? undefined : { y: -5, scale: 1.018 }}>
              <ImageAsset src={ritualImage} alt={item.title} className="ritual-product-image" initial={{ opacity: 0, scale: reduced ? 1 : 1.04, y: reduced ? 0 : 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} hover={{ scale: 1.06, filter: 'saturate(1.06)' }} transition={{ duration: reduced ? 0.2 : 0.48, ease }} />
              <div className="ritual-product-copy"><span className="product-type"><i className={item.icon || 'bi bi-droplet'} />{item.name}</span><h3>{item.title}</h3><p>{item.copy}</p><strong>{item.price}</strong><motion.button type="button" className="add-button" onClick={() => setAdded(true)} whileHover={reduced ? undefined : { y: -2, scale: 1.025 }} whileTap={reduced ? undefined : { scale: 0.96 }}>{added ? <><i className="bi bi-check-lg" /> Added</> : <><i className="bi bi-bag-plus" /> Add to Cart</>}</motion.button></div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function Collections() {
  const reduced = useReducedMotion();
  return (
    <section className="collections section-pad-lg" id="collections">
      <div className="container">
        <SectionHeading eyebrow="Explore" title="Shop by collection" action={{ href: links.shop, label: 'View all' }} />
        <div className="collection-grid">
          {collections.map((item, index) => <motion.a href={item.href} className={`collection-card tint-${index + 1}`} key={item.name} initial={{ opacity: 0, y: reduced ? 0 : 20, scale: reduced ? 1 : 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: reduced ? 0.2 : 0.5, delay: reduced ? 0 : index * 0.07, ease }} whileHover={reduced ? undefined : { y: -4, scale: 1.02 }}><span className="collection-icon"><i className={item.icon || 'bi bi-grid'} /></span><ImageAsset src={item.image} alt={item.name} className="collection-image" initial={{ opacity: 0, scale: reduced ? 1 : 0.88, y: reduced ? 0 : 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} hover={{ scale: 1.06, y: -6 }} transition={{ duration: reduced ? 0.2 : 0.55, ease }} /><div><small>{item.note}</small><h3>{item.name}</h3><i className="bi bi-arrow-right-circle" /></div></motion.a>)}
        </div>
      </div>
    </section>
  );
}

export function BestSellers() {
  const reduced = useReducedMotion();
  return (
    <section className="best section-pad-lg" id="best-sellers">
      <div className="container-wide">
        <SectionHeading eyebrow="Most loved" title="Best sellers" action={{ href: links.best, label: 'View all' }} />
        <div className="product-grid">
          {bestSellers.map((item, index) => <motion.article className="product-card" key={item.name} initial={{ opacity: 0, y: reduced ? 0 : 28, scale: reduced ? 1 : 0.985 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: reduced ? 0.2 : 0.56, delay: reduced ? 0 : index * 0.08, ease }} whileHover={reduced ? undefined : { y: -6, scale: 1.015 }}><span className="promo">{item.badge}</span><a className="product-media" href={item.href}><ImageAsset src={item.image} alt={item.name} className="primary-product-image" hover={{ scale: 1.055, filter: 'saturate(1.05)' }} transition={{ duration: 0.42, ease }} /><ImageAsset src={item.second} alt={`${item.name} alternate view`} className="secondary-product-image" hover={{ scale: 1.02 }} transition={{ duration: 0.38, ease }} /></a><div className="product-info"><div className="rating"><i className="bi bi-star-fill" /> Best Seller</div><a href={item.href}><h3>{item.name}</h3></a><div className="price-row"><div>{item.old ? <del>{item.old}</del> : null}<strong>{item.price}</strong></div><motion.a href={item.href} className="bag-button" aria-label={`Shop ${item.name}`} whileHover={reduced ? undefined : { y: -2, scale: 1.07 }} whileTap={reduced ? undefined : { scale: 0.9 }}><i className="bi bi-bag-plus" /></motion.a></div></div></motion.article>)}
        </div>
      </div>
    </section>
  );
}

export function NewArrivals() {
  const cards = [
    { title: 'Quick Makeup', line: '38% Off', price: '3,100.00 PKR', image: 'https://manabeautyspirit.com/cdn/shop/files/Bundle1.jpg?v=1784710462&width=1050', href: 'https://manabeautyspirit.com/products/quick-iftar-makeup' },
    { title: 'The Perfect Pot Duo', line: 'New Arrival', price: '2,100.00 PKR', image: 'https://manabeautyspirit.com/cdn/shop/files/Bundle2.jpg?v=1784710942&width=1050', href: 'https://manabeautyspirit.com/products/the-perfect-pot-duo' }
  ];
  const reduced = useReducedMotion();
  return (
    <section className="new section-pad-lg" id="new-arrivals">
      <div className="container"><SectionHeading eyebrow="Just landed" title="New arrivals" action={{ href: links.new, label: 'View all' }} /><div className="feature-grid">{cards.map((item, index) => <motion.article className="feature-card" key={item.title} initial={{ opacity: 0, x: reduced ? 0 : index === 0 ? -36 : 36, scale: reduced ? 1 : 0.98 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: true, amount: 0.24 }} transition={{ duration: reduced ? 0.2 : 0.64, delay: reduced ? 0 : index * 0.06, ease }} whileHover={reduced ? undefined : { y: -5, scale: 1.012 }}><ImageAsset src={item.image} alt={item.title} className="feature-image" initial={{ opacity: 0, clipPath: reduced ? 'inset(0)' : 'inset(0 100% 0 0)', scale: reduced ? 1 : 1.04 }} animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)', scale: 1 }} hover={{ scale: 1.07, x: '1.5%' }} transition={{ duration: reduced ? 0.2 : 0.72, ease }} /><div className="feature-copy"><span><i className="bi bi-lightning-charge" />{item.line}</span><h3>{item.title}</h3><strong>{item.price}</strong><Action href={item.href} secondary icon="bi bi-plus-circle">Quick add</Action></div></motion.article>)}</div></div>
    </section>
  );
}

export function IngredientSpotlight() {
  const reduced = useReducedMotion();
  return (
    <section className="ingredient-strip section-pad-lg" id="ingredients">
      <div className="container-wide">
        <SectionHeading eyebrow="Our ingredients" title="The facts about our ingredients" copy="Plant-led ingredient notes, made clear." action={{ href: '#ingredient-library', label: 'Open ingredient library' }} />
        <motion.div className="ingredient-track" drag={reduced ? false : 'x'} dragConstraints={{ left: -620, right: 0 }} dragElastic={0.08}>
          {ingredients.map((item, index) => <motion.article className="ingredient-card" key={item.name} initial={{ opacity: 0, y: reduced ? 0 : 20, rotate: reduced ? 0 : -1 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduced ? 0.2 : 0.5, delay: reduced ? 0 : index * 0.075, ease }} whileHover={reduced ? undefined : { y: -5, scale: 1.018, rotate: 0.5 }}><span className="ingredient-icon"><i className={item.icon || 'bi bi-leaf'} /></span><ImageAsset src={item.image} alt={item.name} className="ingredient-image" initial={{ opacity: 0, scale: reduced ? 1 : 0.82, rotate: reduced ? 0 : -4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} hover={{ scale: 1.08, rotate: 1.5, y: -5, filter: 'sepia(0) saturate(1.08)' }} transition={{ type: reduced ? 'tween' : 'spring', stiffness: 260, damping: 22 }} /><div><small>{item.benefit}</small><h3>{item.name}</h3><p>{item.text}</p></div></motion.article>)}
        </motion.div>
      </div>
    </section>
  );
}

export function Bundles() {
  const cards = [
    { title: 'Growth And Repair Bundle', benefit: 'Grow Faster', discount: '25', price: '1,650.00 PKR', image: 'https://manabeautyspirit.com/cdn/shop/files/DSC09059.jpg?v=1756277763&width=2500', href: 'https://manabeautyspirit.com/products/hair-growth-essentials' },
    { title: 'Blush and Bloom Bundle', benefit: 'Color', discount: '30', price: '1,120.00 PKR', image: 'https://manabeautyspirit.com/cdn/shop/files/shades.png?v=1771867546&width=787', href: 'https://manabeautyspirit.com/products/blush-and-bloom-bundle' },
    { title: 'Daily Hair Care Bundle', benefit: 'Daily Care', discount: '25', price: '1,950.00 PKR', image: 'https://manabeautyspirit.com/cdn/shop/files/DSC09121_2.jpg?v=1759421366&width=3504', href: 'https://manabeautyspirit.com/products/daily-hair-care' }
  ];
  const reduced = useReducedMotion();
  return (
    <section className="bundles section-pad-lg" id="bundles"><div className="container"><SectionHeading eyebrow="Save together" title="Bundles you’ll love" action={{ href: links.bundles, label: 'Shop bundles' }} /><div className="bundle-grid">{cards.map((item, index) => <motion.article className="bundle-card" key={item.title} initial={{ opacity: 0, y: reduced ? 0 : 30, scale: reduced ? 1 : 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.22 }} transition={{ duration: reduced ? 0.2 : 0.58, delay: reduced ? 0 : index * 0.09, ease }} whileHover={reduced ? undefined : { y: -2, scale: 1.018 }}><ImageAsset src={item.image} alt={item.title} className="bundle-image" initial={{ opacity: 0, scale: reduced ? 1 : 1.06 }} animate={{ opacity: 1, scale: 1 }} hover={{ scale: 1.065, y: -2 }} transition={{ duration: reduced ? 0.2 : 0.72, ease }} /><div className="bundle-overlay" /><span className="discount"><i className="bi bi-percent" />{item.discount}% Off</span><div className="bundle-copy"><small>{item.benefit}</small><h3>{item.title}</h3><strong>{item.price}</strong><Action href={item.href} secondary icon="bi bi-gift">Shop bundle</Action></div></motion.article>)}</div></div></section>
  );
}

export function Consultation() {
  const reduced = useReducedMotion();
  return (
    <section className="consult section-pad-lg" id="consultation"><div className="container consult-card"><Reveal className="consult-image-panel" direction="left"><ImageAsset src="https://manabeautyspirit.com/cdn/shop/files/IMG_1906.jpg?v=1761586337&width=2736" alt="Mana skin consultation" className="consult-image" initial={{ opacity: 0, clipPath: reduced ? 'inset(0)' : 'inset(0 100% 0 0)' }} animate={{ opacity: 1, clipPath: 'inset(0)' }} hover={{ scale: 1.05, x: '1%' }} transition={{ duration: reduced ? 0.2 : 0.72, ease }} /></Reveal><Reveal className="consult-copy" delay={0.12}><i className="bi bi-flower1 consult-watermark" /><span className="eyebrow">Skin consultation</span><h2>Book a call with us</h2><p>A quick 15-minute skin consultation where you can chat with one of our in-house specialists.</p><div className="consult-points"><span><i className="bi bi-telephone" /> 15-minute call</span><span><i className="bi bi-calendar2-check" /> Book a consultation</span></div><Action href={links.consultation} icon="bi bi-calendar2-check">Book consultation</Action></Reveal></div></section>
  );
}

export function HelpBar() {
  const reduced = useReducedMotion();
  return <section className="help-wrap section-pad-sm"><motion.div className="help-bar container" initial={{ opacity: 0, y: reduced ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} whileHover={reduced ? undefined : { y: -2, scale: 1.004 }} transition={{ duration: reduced ? 0.2 : 0.46, ease }}><div><motion.span className="online-icon" animate={reduced ? undefined : { scale: [1, 1.12, 1], boxShadow: ['0 0 0 0 rgba(83,107,84,.28)', '0 0 0 10px rgba(83,107,84,0)', '0 0 0 0 rgba(83,107,84,0)'] }} transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 11.2 }}><i className="bi bi-whatsapp" /></motion.span><p><strong>Questions?</strong> Chat with us on WhatsApp.</p></div><Action href={links.whatsapp} icon="bi bi-chat-dots">Chat now</Action></motion.div></section>;
}

export function Subscribe() {
  const [sent, setSent] = useState(false);
  const reduced = useReducedMotion();
  return (
    <section className="subscribe section-pad-lg" id="subscribe"><motion.div className="subscribe-card container" initial={{ opacity: 0, y: reduced ? 0 : 24, scale: reduced ? 1 : 0.985 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.3 }} whileHover={reduced ? undefined : { y: -3, scale: 1.006 }} transition={{ duration: reduced ? 0.2 : 0.58, ease }}><div><span className="eyebrow"><i className="bi bi-envelope-open-heart" /> Offers & early access</span><h2>Receive our best offers & promotional codes.</h2><p>And latest collection updates.</p></div><AnimatePresence mode="wait">{sent ? <motion.div className="success" key="success" initial={{ opacity: 0, y: reduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }}><i className="bi bi-unlock" /><strong>Thank you</strong></motion.div> : <motion.form key="form" onSubmit={(event) => { event.preventDefault(); setSent(true); }} exit={{ opacity: 0 }}><label><span>Email address</span><input type="email" required aria-label="Email address" /></label><motion.button type="submit" whileHover={reduced ? undefined : { y: -3, scale: 1.03 }} whileTap={reduced ? undefined : { scale: 0.97 }}>Subscribe <i className="bi bi-arrow-right" /></motion.button></motion.form>}</AnimatePresence></motion.div></section>
  );
}

export function IngredientLibrary() {
  const [open, setOpen] = useState(0);
  const [query, setQuery] = useState('');
  const reduced = useReducedMotion();
  const filtered = ingredients.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <section className="library section-pad-xl" id="ingredient-library"><div className="container"><SectionHeading eyebrow="Ingredient library" title="Explore what goes into your ritual" /><label className="search-field"><i className="bi bi-search" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search ingredients" aria-label="Search ingredients" /></label><div className="accordion-list">{filtered.map((item, index) => <motion.article className="accordion-item" key={item.name} initial={{ opacity: 0, y: reduced ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: reduced ? 0.2 : 0.46, delay: reduced ? 0 : index * 0.065 }}><button type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span className="accordion-icon"><i className={item.icon || 'bi bi-leaf'} /></span><span><strong>{item.name}</strong><small>{item.benefit}</small></span><motion.i className="bi bi-plus-square" animate={{ rotate: open === index && !reduced ? 90 : 0 }} /></button><AnimatePresence>{open === index ? <motion.div className="accordion-content" initial={{ height: 0, opacity: 0, y: reduced ? 0 : -8 }} animate={{ height: 'auto', opacity: 1, y: 0 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduced ? 0.15 : 0.34, ease }}><p>{item.text}</p></motion.div> : null}</AnimatePresence></motion.article>)}{filtered.length === 0 ? <div className="no-results">No ingredients match your search.</div> : null}</div></div></section>
  );
}

export function Safety() {
  return (
    <section className="safety section-pad-lg"><div className="container-narrow"><SectionHeading eyebrow="Preservation & safety" title="Transparent, measured formulation" /><Reveal><ImageAsset src="https://cdn.shopify.com/s/files/1/0606/1424/6606/t/3/assets/divider--edited-1636537852460_1200x.jpg?v=1636537854" alt="Botanical divider" className="divider-image" initial={{ opacity: 0, clipPath: 'inset(0 50% 0 50%)' }} animate={{ opacity: 1, clipPath: 'inset(0)' }} hover={{ scaleX: 1.015, scaleY: 1.04, filter: 'saturate(1.05)' }} transition={{ duration: 0.72, ease }} /></Reveal><div className="safety-copy"><Reveal><p><strong>Our oils and balms are preservative free.</strong> However, some formulations that contain water use a preservative system to help keep microbial counts to a minimum once opened.</p></Reveal><Reveal delay={0.11}><p>At Mana we are still looking for a natural preservative that is proven to be safe and effective. Natural preservatives are used for many formulations.</p></Reveal><Reveal delay={0.22} className="safety-callout"><i className="bi bi-shield-check" /><p>Phenoxyethanol is used at 1% concentration in relevant topical formulations for broad spectrum antimicrobial activity against bacteria, yeasts and moulds.</p><i className="bi bi-beaker" /></Reveal></div></div></section>
  );
}

export function ProductGallery() {
  const reduced = useReducedMotion();
  return (
    <section className="gallery section-pad-lg" aria-label="More Mana products"><div className="container-wide"><SectionHeading eyebrow="Discover more" title="Face, hair, makeup and body care" /><div className="gallery-track">{galleryImages.map((src, index) => <motion.a href={links.shop} className="gallery-item" key={src} initial={{ opacity: 0, y: reduced ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: reduced ? 0.2 : 0.45, delay: reduced ? 0 : (index % 6) * 0.04 }} whileHover={reduced ? undefined : { y: -4, scale: 1.02 }}><ImageAsset src={src} alt={`Mana product selection ${index + 1}`} className="gallery-image" hover={{ scale: 1.06 }} transition={{ duration: 0.38, ease }} /><span>Shop now <i className="bi bi-arrow-up-right" /></span></motion.a>)}</div></div></section>
  );
}
