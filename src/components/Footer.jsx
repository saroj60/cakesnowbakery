import logo from '../assets/logo.jpg';
import { MapPin, Mail, Phone, Clock, Star } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full pt-16 pb-8 bg-surface-container-low dark:bg-surface-dim border-t border-outline-variant/30">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 text-left">
        
        {/* Column 1: Brand & Social */}
        <div className="flex flex-col items-start">
          <img src={logo} alt="Snow Cakes Logo" className="h-24 mb-4 object-contain mix-blend-multiply" />
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
            Elevating the simple joy of artisan baking with premium ingredients and time-honored techniques in Lalitpur.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/cakesnowbakery/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://www.facebook.com/cakesnowbakery" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@cakesnowbekary" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
            </a>
          </div>
        </div>

        {/* Column 2: Contact Info */}
        <div>
          <h4 className="font-label-lg text-lg font-bold text-primary mb-6">Contact Us</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Phone size={18} className="text-secondary mt-1 shrink-0" />
              <div>
                <p className="font-body-sm text-on-surface-variant">+977 986-0568012</p>
                <p className="font-body-sm text-on-surface-variant">+977 976-3443555</p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Locations */}
        <div>
          <h4 className="font-label-lg text-lg font-bold text-primary mb-6">Our Locations</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-secondary mt-1 shrink-0" />
              <div>
                <p className="font-body-sm text-on-surface-variant font-bold">Tikathali Branch</p>
              </div>
            </div>
            <div className="flex items-start gap-3 mt-4">
              <MapPin size={18} className="text-secondary mt-1 shrink-0" />
              <div>
                <p className="font-body-sm text-on-surface-variant font-bold">Balkot Branch</p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 4: Google Maps */}
        <div className="h-48 md:h-full min-h-[200px] flex flex-col gap-2">
          <div className="flex-1 rounded-xl overflow-hidden border border-outline-variant/30 shadow-inner relative group">
            <iframe 
              src="https://maps.google.com/maps?q=Cake+Snow+Bakery+%26+Coffee+Shop&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
            ></iframe>
          </div>
          <div className="flex flex-col gap-2 mt-1">
            <a 
              href="https://www.google.com/maps/place/Cake+Snow+Bakery+%26+Coffee+Shop/@27.6672839,85.3510227,17z/data=!3m1!4b1!4m6!3m5!1s0x39eb19b88d33e753:0x7f96ce6e2ddc3581!8m2!3d27.6672792!4d85.3535976!16s%2Fg%2F11kj8wql10" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs text-primary font-medium hover:underline flex items-center justify-center gap-1"
            >
              <MapPin size={12} /> Open in Google Maps
            </a>
            <a 
              href="https://www.google.com/maps/place/Cake+Snow+Bakery+%26+Coffee+Shop/@27.6672792,85.3154888,14z/data=!4m10!1m2!2m1!1scake+snow+bakery+%26+coffee+shop!3m6!1s0x39eb19b88d33e753:0x7f96ce6e2ddc3581!8m2!3d27.6672792!4d85.3535976!15sCh5jYWtlIHNub3cgYmFrZXJ5ICYgY29mZmVlIHNob3BaICIeY2FrZSBzbm93IGJha2VyeSAmIGNvZmZlZSBzaG9wkgEGYmFrZXJ5mgEjQ2haRFNVaE5NRzluUzBWSlEwRm5UVU5aTjI5aE1FZDNFQUXgAQD6AQQIABA_!16s%2Fg%2F11kj8wql10?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank" 
              rel="noreferrer"
              className="mt-1 w-full py-2 bg-white text-primary border border-primary/20 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors shadow-sm"
            >
              <Star size={16} className="text-yellow-500 fill-yellow-500" /> Rate us on Google
            </a>
          </div>
        </div>

      </div>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-12 pt-8 border-t border-outline-variant/10 text-center">
        <p className="font-body-sm text-body-sm text-on-surface-variant opacity-70">© {new Date().getFullYear()} Snow Cakes Bakery. Handcrafted with love in Nepal.</p>
      </div>
    </footer>
  );
};

export default Footer;
