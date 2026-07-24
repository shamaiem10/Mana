import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { BestSellers, Bundles, Collections, Consultation, HelpBar, Hero, IngredientLibrary, IngredientSpotlight, NewArrivals, ProductGallery, Ritual, Safety, Subscribe } from './components/Sections.jsx';

function CursorGlow() {
  const reduced = useReducedMotion();
  const [position, setPosition] = useState({ x: -300, y: -300 });
  useEffect(() => {
    if (reduced) return undefined;
    const move = (event) => setPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [reduced]);
  if (reduced) return null;
  return <motion.div className="cursor-glow" animate={{ left: position.x, top: position.y }} transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }} />;
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <CursorGlow />
      <Header />
      <main id="main-content">
        <Hero />
        <Ritual />
        <Collections />
        <BestSellers />
        <NewArrivals />
        <IngredientSpotlight />
        <Bundles />
        <Consultation />
        <HelpBar />
        <Subscribe />
        <IngredientLibrary />
        <Safety />
        <ProductGallery />
      </main>
      <Footer />
    </>
  );
}
