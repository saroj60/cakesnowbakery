import { useState, useEffect } from 'react';
import { getProducts } from '../services/db';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Star, ArrowRight, Sparkles, MessageCircle, Clock, Heart } from 'lucide-react';

const SHOWCASE_CAKES = [
  {
    id: 'chocolate',
    name: 'Royal Chocolate Fudge',
    tag: 'Signature',
    description: 'Decadent dark chocolate layers filled with rich Belgian ganache, finished with a smooth chocolate glaze.',
    rating: '4.9',
    reviews: '480',
    price: '1,200',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    bgColor: 'from-amber-950/20 to-amber-900/5',
    accentColor: 'text-amber-800 bg-amber-100 dark:bg-amber-950 dark:text-amber-200'
  },
  {
    id: 'strawberry',
    name: 'Strawberry Cream Dream',
    tag: 'Best Seller',
    description: 'Fresh organic strawberries layered with light vanilla sponge, homemade strawberry compote, and sweet whipped cream.',
    rating: '4.8',
    reviews: '395',
    price: '1,400',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?w=800&q=80',
    bgColor: 'from-rose-950/20 to-rose-900/5',
    accentColor: 'text-rose-800 bg-rose-100 dark:bg-rose-950 dark:text-rose-200'
  },
  {
    id: 'redvelvet',
    name: 'Red Velvet Rosette',
    tag: 'Trending',
    description: 'Classic velvety cocoa crumb layers with rich cream cheese frosting, decorated with beautiful chocolate rosettes.',
    rating: '4.9',
    reviews: '312',
    price: '1,500',
    image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&q=80',
    bgColor: 'from-red-950/20 to-red-900/5',
    accentColor: 'text-red-800 bg-red-100 dark:bg-red-950 dark:text-red-200'
  }
];

const Home = () => {
  const [cakes, setCakes] = useState([]);
  const { addToCart } = useCart();
  const [selectedShowcaseIndex, setSelectedShowcaseIndex] = useState(0);

  useEffect(() => {
    getProducts().then(products => {
      // Only show active products on storefront
      setCakes(products.filter(p => p.isActive !== false));
    });
  }, []);

  const activeCake = SHOWCASE_CAKES[selectedShowcaseIndex];
  const bestSellers = cakes.slice(0, 3);

  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="relative w-full pt-8 pb-16 lg:py-24 overflow-hidden bg-gradient-to-br from-surface via-surface-container-low to-surface-container/30">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-fixed/10 rounded-full blur-3xl pointer-events-none opacity-40 z-0"></div>
        <div className="absolute -bottom-10 left-0 w-[500px] h-[500px] bg-secondary-fixed/10 rounded-full blur-3xl pointer-events-none opacity-30 z-0"></div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-fixed/20 border border-primary/10 text-primary mb-6 animate-pulse">
                <Sparkles size={16} className="text-primary-fixed-dim fill-primary-fixed-dim" />
                <span className="text-xs uppercase tracking-wider font-semibold">Kathmandu's Finest Artisan Cakes</span>
              </div>

              {/* Title */}
              <h1 className="font-headline-xl text-4xl md:text-[54px] md:leading-[1.1] text-primary mb-6">
                Handcrafted Moments, <br />
                <span className="text-secondary font-semibold italic">Freshly Baked.</span>
              </h1>

              {/* Description */}
              <p className="font-body-md text-base md:text-lg text-on-surface-variant mb-8 max-w-xl leading-relaxed">
                Discover the alchemy of flour, water, and time at Snowcakes. Every cake is a masterpiece designed to turn your celebrations into unforgettable memories.
              </p>

              {/* Showcase Detail Card */}
              <div className="w-full bg-surface/80 backdrop-blur-md rounded-2xl p-5 border border-outline-variant/35 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8 transition-all duration-500 hover:shadow-[0_15px_30px_rgb(68,42,34,0.06)]">
                <div className="flex justify-between items-center mb-3">
                  <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full ${activeCake.accentColor}`}>
                    {activeCake.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400 px-2.5 py-1 rounded-full text-xs font-semibold">
                    <Star size={14} className="fill-current" />
                    <span>{activeCake.rating} ({activeCake.reviews} reviews)</span>
                  </div>
                </div>
                <h3 className="font-headline-md text-xl md:text-2xl text-primary font-bold mb-2 transition-all duration-300">
                  {activeCake.name}
                </h3>
                <p className="font-body-sm text-xs md:text-sm text-on-surface-variant mb-4 min-h-[40px]">
                  {activeCake.description}
                </p>
                <div className="flex justify-between items-center pt-3 border-t border-outline-variant/20">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-medium">Price</span>
                    <span className="font-headline-md text-lg md:text-xl text-primary font-bold">Rs. {activeCake.price}</span>
                  </div>
                  <a href="#menu" className="inline-flex items-center gap-2 bg-primary text-white hover:bg-primary/90 font-label-md text-sm px-6 py-2.5 rounded-full shadow-md transition-all active:scale-95">
                    <span>Order Now</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                <a href="#menu" className="flex-1 sm:flex-initial text-center bg-primary text-white font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2">
                  <ShoppingBag size={18} />
                  <span>Explore Menu</span>
                </a>
                <a 
                  href="https://wa.me/9779800000000" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 sm:flex-initial text-center bg-white border-2 border-primary/20 text-primary font-semibold px-8 py-4 rounded-full hover:bg-primary-fixed/10 transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} />
                  <span>Custom Order</span>
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-xs font-semibold text-on-surface-variant border-t border-outline-variant/25 pt-6 w-full">
                <span className="flex items-center gap-1.5"><Clock size={14} className="text-secondary" /> Same-day Kathmandu Delivery</span>
                <span className="flex items-center gap-1.5"><Heart size={14} className="text-secondary" /> Baked Fresh Daily</span>
              </div>
            </div>

            {/* Right Column: Visual Interactive Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center">
              {/* Main Image Container */}
              <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(68,42,34,0.15)] group transition-all duration-500 hover:translate-y-[-4px]">
                {/* Background Ambient Color */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent z-10 pointer-events-none"></div>
                
                {/* The main Image */}
                <img 
                  className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105" 
                  alt={activeCake.name} 
                  src={activeCake.image} 
                />

                {/* Floating Glass Badges */}
                <div className="absolute top-6 left-6 z-20 backdrop-blur-md bg-white/70 dark:bg-black/60 px-4 py-2 rounded-2xl shadow-lg border border-white/20 flex items-center gap-2">
                  <span className="text-xl">🎂</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Quality</span>
                    <span className="text-xs text-primary font-bold">100% Handcrafted</span>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 z-20 backdrop-blur-md bg-white/70 dark:bg-black/60 px-4 py-2.5 rounded-2xl shadow-lg border border-white/20 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-on-surface-variant uppercase tracking-wider font-semibold">Availability</span>
                    <span className="text-xs text-primary font-bold">Freshly Baked Today</span>
                  </div>
                </div>
              </div>

              {/* Selector Thumbnails */}
              <div className="flex items-center gap-4 mt-8 bg-surface-container-low p-2 rounded-full border border-outline-variant/30 shadow-inner">
                {SHOWCASE_CAKES.map((cake, index) => (
                  <button
                    key={cake.id}
                    onClick={() => setSelectedShowcaseIndex(index)}
                    className={`relative w-16 h-16 rounded-full overflow-hidden border-2 transition-all duration-300 active:scale-90 ${selectedShowcaseIndex === index ? 'border-primary ring-2 ring-primary-fixed scale-110 shadow-md' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'}`}
                  >
                    <img src={cake.image} alt={cake.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* Freshly Baked Promo */}
      <section className="py-16 px-margin-mobile bg-surface">
        <div className="max-w-container-max mx-auto text-center">
          <span className="font-label-lg text-label-lg text-primary uppercase tracking-[0.2em] mb-4 block">Our Commitment</span>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-6">Freshly baked every day in Kathmandu.</h2>
          <div className="w-24 h-1 bg-primary-fixed mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Best Sellers Section */}
      {bestSellers.length > 0 && (
        <section className="py-16 bg-surface-container-low/50 border-y border-outline-variant/15">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-12">
              <span className="font-label-lg text-label-lg text-secondary uppercase tracking-[0.2em] mb-3 block">Customer Favorites</span>
              <h2 className="font-headline-lg text-3xl md:text-4xl text-primary font-bold">Our Best Sellers</h2>
              <div className="w-16 h-1 bg-secondary mx-auto rounded-full mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {bestSellers.map((cake) => (
                <div 
                  key={cake.id} 
                  className="bg-surface rounded-3xl overflow-hidden border border-outline-variant/20 shadow-[0_10px_30px_rgba(68,42,34,0.04)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(68,42,34,0.08)] group flex flex-col relative"
                >
                  {/* Ribbons & Badges */}
                  <div className="absolute top-4 left-4 z-10 bg-secondary text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                    🔥 Best Seller
                  </div>
                  <div className="absolute top-4 right-4 z-10 backdrop-blur-md bg-white/85 px-3 py-1 rounded-full text-xs font-semibold text-amber-700 flex items-center gap-1 shadow-sm">
                    <Star size={12} className="fill-amber-600 stroke-amber-600" />
                    <span>4.9</span>
                  </div>

                  {/* Image Container */}
                  <div className="aspect-[4/3] w-full overflow-hidden bg-surface-variant relative">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      alt={cake.name} 
                      src={cake.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80'} 
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Details */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h4 className="font-headline-md text-lg md:text-xl text-primary font-bold mb-2 group-hover:text-secondary transition-colors duration-300 line-clamp-1">
                        {cake.name}
                      </h4>
                      <p className="font-body-sm text-xs md:text-sm text-on-surface-variant mb-6 line-clamp-2 leading-relaxed">
                        {cake.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-outline-variant/10 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-wider text-on-surface-variant font-medium">Price</span>
                        <span className="font-headline-md text-lg text-primary font-bold">Rs. {cake.price}</span>
                      </div>
                      
                      <button 
                        onClick={() => addToCart(cake)}
                        className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-primary text-white font-label-lg hover:bg-primary/95 transition-all shadow-md active:scale-95"
                      >
                        <ShoppingBag size={14} />
                        <span className="text-xs">Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section id="menu" className="py-16 max-w-container-max mx-auto px-margin-mobile">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-primary">Our Cakes</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">Community favorites, baked to perfection.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-gutter">
          {cakes.map((cake) => (
            <div key={cake.id} className="bg-surface-container-low rounded-xl p-3 md:p-6 shadow-[0_10px_30px_rgba(62,39,35,0.08)] group flex flex-col">
              <div className="aspect-square overflow-hidden rounded-lg mb-4 md:mb-6 bg-surface-variant">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt={cake.name} 
                  src={cake.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80'} 
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80' }}
                />
              </div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-headline-md text-sm md:text-headline-md text-primary line-clamp-1">{cake.name}</h4>
                <span className="font-label-lg text-[10px] md:text-label-lg text-on-surface-variant bg-surface px-2 md:px-3 py-1 rounded-full whitespace-nowrap">Rs. {cake.price}</span>
              </div>
              <p className="font-body-sm text-[10px] md:text-body-sm text-on-surface-variant mb-4 md:mb-6 flex-grow line-clamp-2">{cake.description}</p>
              <button 
                onClick={() => addToCart(cake)}
                className="w-full py-4 rounded-full bg-primary text-white font-label-lg hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} className="md:w-5 md:h-5" />
                <span className="text-xs md:text-label-lg">Add to Cart</span>
              </button>
            </div>
          ))}
          {cakes.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-on-surface-variant text-lg">No cakes available right now. Check back later!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
