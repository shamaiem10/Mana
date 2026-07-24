import { links } from '../data.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div><a className="brand footer-brand" href="#top"><i className="bi bi-flower1" /><span>Mana</span><small>Beauty Spirit</small></a><p>Beauty, skincare, hair care, makeup and body rituals.</p></div>
        <div><strong>Explore</strong><a href="#best-sellers">Best Sellers</a><a href="#new-arrivals">New Arrivals</a><a href="#ingredients">Ingredients</a><a href="#consultation">Skin Consultation</a></div>
        <div><strong>Policies</strong><a href="https://manabeautyspirit.com/policies/privacy-policy">Privacy policy</a><a href="https://manabeautyspirit.com/policies/terms-of-service">Terms of service</a><a href="https://manabeautyspirit.com/policies/refund-policy">Refund policy</a><a href="https://manabeautyspirit.com/policies/shipping-policy">Shipping policy</a></div>
        <div><strong>Follow Mana</strong><div className="socials"><a href="https://www.facebook.com/Manabeautyspirit" aria-label="Facebook"><i className="bi bi-facebook" /></a><a href="https://www.instagram.com/manabeautyspirit/" aria-label="Instagram"><i className="bi bi-instagram" /></a><a href="https://www.youtube.com/@manabeautyspirit" aria-label="YouTube"><i className="bi bi-youtube" /></a><a href="https://www.tiktok.com/@manabeautyandspirit" aria-label="TikTok"><i className="bi bi-tiktok" /></a></div><a href={links.whatsapp}>WhatsApp help</a></div>
      </div>
      <div className="footer-bottom container"><span>Mana Beauty Spirit</span><a href="#top">Back to top <i className="bi bi-arrow-up" /></a></div>
    </footer>
  );
}
