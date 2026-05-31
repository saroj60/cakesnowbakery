import React from 'react';
import { MessageCircle } from 'lucide-react';

const ADMIN_PHONE = '9779860568012';

const FloatingWhatsApp = () => {
  const handleClick = () => {
    const message = "Hello Snow Cakes! I have a question regarding my order.";
    const whatsappUrl = `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 md:bottom-10 md:right-10 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] transition-all duration-300 z-40 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 md:w-8 md:h-8" />
      <span className="absolute right-full mr-4 bg-surface text-on-surface px-4 py-2 rounded-xl text-sm font-medium shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
        Chat with us! (Usually replies in 1 hour)
      </span>
    </button>
  );
};

export default FloatingWhatsApp;
