import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
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
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&q=80&w=800',
    bgColor: 'from-red-950/20 to-red-900/5',
    accentColor: 'text-red-800 bg-red-100 dark:bg-red-950 dark:text-red-200'
  }
];

const Home = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [cakes, setCakes] = useState([]);
  const { addToCart } = useCart();
  const [selectedShowcaseIndex, setSelectedShowcaseIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('All');
  const [priceRange, setPriceRange] = useState(2000);
  const [selectedCakeForCustomization, setSelectedCakeForCustomization] = useState(null);
  const [customOptions, setCustomOptions] = useState({
    weight: 1,
    isEggless: false,
    message: '',
    flavor: 'Default / As Displayed',
    shape: 'Round'
  });

  const filters = ['All', 'Birthdays', 'Weddings', 'Engagement parties', 'Anniversaries', 'Baby showers', 'Job promotions', 'Passing an exam', 'Completing a major project', 'Opening a new business', 'Buying a new home'];

  useEffect(() => {
    getProducts().then(products => {
      const activeProducts = products.filter(p => p.isActive !== false);
      const mockTags = ['Birthdays', 'Weddings', 'Anniversaries'];
      
      setCakes(activeProducts.map(p => ({
        ...p,
        tags: p.tags && p.tags.length > 0 && p.tags[0] ? p.tags : [mockTags[Math.floor(Math.random() * mockTags.length)]]
      })));
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedShowcaseIndex((prev) => (prev + 1) % SHOWCASE_CAKES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCartClick = (product) => {
    setSelectedCakeForCustomization(product);
    setCustomOptions({ weight: 1, isEggless: false, message: '', flavor: 'Default / As Displayed', shape: 'Round' });
  };

  const handleConfirmAddToCart = () => {
    if (!selectedCakeForCustomization) return;
    
    const { weight, isEggless, message, flavor, shape } = customOptions;
    const isCustomDesign = selectedCakeForCustomization.isCustomDesign;
    const basePrice = typeof selectedCakeForCustomization.price === 'string' 
        ? parseFloat(selectedCakeForCustomization.price.replace(/,/g, '')) 
        : selectedCakeForCustomization.price;
    const finalPrice = isCustomDesign ? 'TBD' : ((basePrice * weight) + (isEggless ? 150 : 0));

    const customItem = {
      ...selectedCakeForCustomization,
      id: `${selectedCakeForCustomization.id}-${weight}lb-${isEggless ? 'eggless' : 'reg'}-${flavor.replace(/\s+/g, '')}-${shape}`,
      name: `${selectedCakeForCustomization.name} (${weight} lb${isEggless ? ', Eggless' : ''})`,
      price: finalPrice,
      messageOnCake: message,
      flavor: flavor,
      shape: shape
    };

    addToCart(customItem);
    setSelectedCakeForCustomization(null);
  };

  const handleAddDecorationToCart = (decoration) => {
    addToCart({
      ...decoration,
      id: `${decoration.id}-1`,
      name: decoration.name,
      price: decoration.price,
      messageOnCake: '',
      flavor: 'N/A',
      shape: 'N/A'
    });
  };

  const filteredCakes = cakes.filter(cake => {
    if (cake.category === 'Decorations') return false;
    const matchesFilter = activeFilter === 'All' || (cake.tags && cake.tags.includes(activeFilter));
    const cakePrice = parseFloat(String(cake.price).replace(/,/g, '')) || 0;
    const matchesPrice = cakePrice <= priceRange;
    const matchesSearch = !searchQuery || 
      cake.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (cake.description && cake.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
    return matchesFilter && matchesPrice && matchesSearch;
  });

  const filteredDecorations = cakes.filter(cake => {
    if (cake.category !== 'Decorations') return false;
    const matchesSearch = !searchQuery || 
      cake.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (cake.description && cake.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const activeCake = SHOWCASE_CAKES[selectedShowcaseIndex];
  const bestSellers = filteredCakes.slice(0, 3);

  return (
    <main className="pt-24">
      {/* Static Hero Section */}
      <section className="relative w-full flex flex-col md:block md:h-[80vh] bg-[#1a110a] overflow-hidden">
        <div className="w-full md:absolute md:inset-0">
          <img 
            src="/hero.png" 
            alt="Snow Cakes Hero" 
            className="w-full h-auto md:h-full object-cover object-top" 
          />
        </div>
        
        <div className="relative md:absolute md:inset-0 z-20 flex flex-col justify-end p-6 md:p-16">
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
            <a 
              href="#menu" 
              className="px-8 py-4 bg-primary text-white font-bold rounded-full text-lg hover:bg-primary/90 transition-all shadow-[0_10px_25px_rgba(68,42,34,0.3)] hover:scale-105 hover:-translate-y-1 active:scale-95 flex items-center gap-2 justify-center"
            >
              Explore Cakes
              <ArrowRight size={20} />
            </a>
            <Link 
              to="/custom-order"
              className="px-8 py-4 bg-white text-primary font-bold rounded-full text-lg hover:bg-gray-100 transition-all shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:scale-105 hover:-translate-y-1 active:scale-95 flex items-center gap-2 justify-center"
            >
              Customize Cake
              <Sparkles size={20} />
            </Link>
          </div>
        </div>
      </section>

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
                  <div className="absolute top-4 left-4 z-10 bg-secondary text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                    🔥 Best Seller
                  </div>
                  <div className="aspect-[4/3] w-full overflow-hidden bg-surface-variant relative">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      alt={cake.name} 
                      src={cake.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80'} 
                    />
                  </div>

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
                        onClick={() => handleAddToCartClick(cake)}
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
        <div className="text-center mb-10">
          <h2 className="font-headline-lg text-headline-lg text-primary">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Our Cakes"}
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 mb-10 shadow-sm mt-6">
            <div className="flex flex-wrap justify-center gap-2">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === filter 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-surface text-on-surface hover:bg-surface-variant border border-outline-variant'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            
            <div className="w-full md:w-64 flex flex-col items-center border-t md:border-t-0 md:border-l border-outline-variant/30 pt-4 md:pt-0 md:pl-6">
              <label className="text-sm font-medium text-on-surface mb-2 flex justify-between w-full">
                <span>Max Price</span>
                <span className="text-primary font-bold">Rs. {priceRange}</span>
              </label>
              <input 
                type="range" 
                min="500" 
                max="5000" 
                step="100" 
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-gutter">
          {filteredCakes.map((cake) => (
            <div key={cake.id} className="bg-surface-container-low rounded-xl p-3 md:p-6 shadow-[0_10px_30px_rgba(62,39,35,0.08)] group flex flex-col">
              <div className="aspect-square overflow-hidden rounded-lg mb-4 md:mb-6 bg-surface-variant">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt={cake.name} 
                  src={cake.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80'} 
                />
              </div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-headline-md text-sm md:text-headline-md text-primary line-clamp-1">{cake.name}</h4>
                <span className="font-label-lg text-[10px] md:text-label-lg text-on-surface-variant bg-surface px-2 md:px-3 py-1 rounded-full whitespace-nowrap">Rs. {cake.price}</span>
              </div>
              <p className="font-body-sm text-[10px] md:text-body-sm text-on-surface-variant mb-4 md:mb-6 flex-grow line-clamp-2">{cake.description}</p>
              <button 
                onClick={() => handleAddToCartClick(cake)}
                className="w-full py-4 rounded-full bg-primary text-white font-label-lg hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} className="md:w-5 md:h-5" />
                <span className="text-xs md:text-label-lg">Add to Cart</span>
              </button>
            </div>
          ))}
          {filteredCakes.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-on-surface-variant text-lg">No cakes available matching these filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Decorations Section */}
      {filteredDecorations.length > 0 && (
        <section className="py-16 max-w-container-max mx-auto px-margin-mobile bg-surface-container-low/30 border-t border-outline-variant/15">
          <div className="text-center mb-10">
            <span className="font-label-lg text-label-lg text-secondary uppercase tracking-[0.2em] mb-3 block">Party Supplies</span>
            <h2 className="font-headline-lg text-3xl md:text-4xl text-primary font-bold">Decorations & Add-ons</h2>
            <div className="w-16 h-1 bg-secondary mx-auto rounded-full mt-4"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-gutter">
            {filteredDecorations.map((item) => (
              <div key={item.id} className="bg-surface rounded-xl p-3 md:p-6 shadow-[0_10px_30px_rgba(62,39,35,0.05)] border border-outline-variant/10 group flex flex-col">
                <div className="aspect-square overflow-hidden rounded-lg mb-4 bg-surface-variant relative p-2">
                  <img 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" 
                    alt={item.name} 
                    src={item.image || 'https://via.placeholder.com/150'} 
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <h4 className="font-headline-md text-sm md:text-base text-primary line-clamp-2 min-h-[2.5rem]">{item.name}</h4>
                  <span className="font-bold text-lg text-on-surface mt-1">Rs. {item.price}</span>
                </div>
                <button 
                  onClick={() => handleAddDecorationToCart(item)}
                  className="w-full mt-auto py-3 rounded-lg bg-secondary text-white font-medium hover:bg-secondary/90 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={16} />
                  <span className="text-sm">Add to Cart</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Customer Reviews Section */}
      <section className="py-20 bg-surface-container-low/50 border-t border-outline-variant/15 overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="font-label-lg text-label-lg text-secondary uppercase tracking-[0.2em] mb-3 block">Testimonials</span>
              <h2 className="font-headline-lg text-3xl md:text-4xl text-primary font-bold">What Our Customers Say</h2>
            </div>
            
            <div className="flex items-center gap-3 bg-white p-3 md:p-4 rounded-xl shadow-md border border-outline-variant/20 shrink-0">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Star size={20} className="text-amber-500 fill-amber-500" />
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="font-bold text-lg text-on-surface">4.9</span>
                  <div className="flex">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-amber-500 text-amber-500" />)}
                  </div>
                </div>
                <span className="text-xs text-on-surface-variant font-medium">Based on 450+ Google Reviews</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Review 1 */}
            <div className="bg-surface p-8 rounded-3xl shadow-sm border border-outline-variant/20 relative">
              <div className="absolute top-6 right-6 text-primary/10">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              </div>
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-amber-500 text-amber-500" />)}
              </div>
              <p className="font-body-md text-on-surface-variant mb-8 italic">"The vegan chocolate cake we ordered for my daughter's birthday was absolutely phenomenal. Nobody could even tell it was vegan! The texture was perfect and it looked stunning."</p>
              <div className="flex items-center gap-4">
                <img src="https://i.pravatar.cc/150?img=44" alt="Customer" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                <div>
                  <h5 className="font-headline-sm text-sm font-bold text-primary">Priya S.</h5>
                  <span className="text-xs text-on-surface-variant">Ordered Vegan Chocolate</span>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-surface p-8 rounded-3xl shadow-sm border border-outline-variant/20 relative">
              <div className="absolute top-6 right-6 text-primary/10">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              </div>
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-amber-500 text-amber-500" />)}
              </div>
              <p className="font-body-md text-on-surface-variant mb-8 italic">"Snow Cakes handled my custom order perfectly. I sent a reference image for an anniversary cake and they nailed the design and the flavor. Best bakery in Lalitpur!"</p>
              <div className="flex items-center gap-4">
                <img src="https://i.pravatar.cc/150?img=33" alt="Customer" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                <div>
                  <h5 className="font-headline-sm text-sm font-bold text-primary">Aman T.</h5>
                  <span className="text-xs text-on-surface-variant">Custom Anniversary Cake</span>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-surface p-8 rounded-3xl shadow-sm border border-outline-variant/20 relative">
              <div className="absolute top-6 right-6 text-primary/10">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              </div>
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-amber-500 text-amber-500" />)}
              </div>
              <p className="font-body-md text-on-surface-variant mb-8 italic">"Their gluten-free options are a lifesaver. It's so hard to find good GF baked goods, but their strawberry cream cake was moist, fluffy, and completely safe for me."</p>
              <div className="flex items-center gap-4">
                <img src="https://i.pravatar.cc/150?img=5" alt="Customer" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                <div>
                  <h5 className="font-headline-sm text-sm font-bold text-primary">Sita M.</h5>
                  <span className="text-xs text-on-surface-variant">Gluten-Free Strawberry</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customization Modal */}
      {selectedCakeForCustomization && (
        <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-surface rounded-2xl w-full max-w-md shadow-2xl flex flex-col overflow-hidden">
            <div className="relative h-40 bg-surface-variant">
              <img 
                src={selectedCakeForCustomization.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80'} 
                alt={selectedCakeForCustomization.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <h3 className="text-white font-headline-md text-2xl font-bold">{selectedCakeForCustomization.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedCakeForCustomization(null)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
              <div>
                <label className="block font-medium text-on-surface mb-2">Select Size / Weight (lbs)</label>
                <input 
                  type="number" 
                  min="0.5" 
                  step="0.5"
                  placeholder="e.g., 1.5"
                  value={customOptions.weight || ''}
                  onChange={(e) => setCustomOptions(prev => ({ ...prev, weight: parseFloat(e.target.value) }))}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl border border-outline-variant bg-surface-container-low hover:border-primary/50 transition-colors">
                  <input 
                    type="checkbox"
                    checked={customOptions.isEggless}
                    onChange={(e) => setCustomOptions(prev => ({ ...prev, isEggless: e.target.checked }))}
                    className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary accent-primary"
                  />
                  <div className="flex-1">
                    <span className="block font-medium text-on-surface">Make it Eggless</span>
                    <span className="block text-xs text-on-surface-variant">+ Rs. 150 per cake</span>
                  </div>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-on-surface mb-2">Flavor</label>
                  <select 
                    value={customOptions.flavor}
                    onChange={(e) => setCustomOptions(prev => ({ ...prev, flavor: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none transition-all"
                  >
                    <option value="Default / As Displayed">As Displayed</option>
                    <option value="Vanilla">Classic Vanilla</option>
                    <option value="Chocolate">Rich Chocolate</option>
                    <option value="Strawberry">Fresh Strawberry</option>
                    <option value="Black Forest">Black Forest</option>
                    <option value="Pineapple">Pineapple</option>
                    <option value="Red Velvet">Red Velvet</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-on-surface mb-2">Shape</label>
                  <select 
                    value={customOptions.shape}
                    onChange={(e) => setCustomOptions(prev => ({ ...prev, shape: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none transition-all"
                  >
                    <option value="Round">Round</option>
                    <option value="Square">Square</option>
                    <option value="Heart">Heart-shaped</option>
                    <option value="Rectangle">Rectangle</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-on-surface mb-2">Message on Cake (Optional)</label>
                <input 
                  type="text"
                  maxLength={30}
                  placeholder="e.g., Happy Birthday John"
                  value={customOptions.message}
                  onChange={(e) => setCustomOptions(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none transition-all"
                />
                <div className="text-right mt-1 text-xs text-on-surface-variant">{customOptions.message.length}/30</div>
              </div>
              
              <div className="bg-surface-container-low p-4 rounded-xl flex justify-between items-center">
                <span className="font-medium text-on-surface-variant">Total Price:</span>
                <span className="font-bold text-xl text-primary">
                  {selectedCakeForCustomization.isCustomDesign 
                    ? 'To Be Determined' 
                    : `Rs. ${(((typeof selectedCakeForCustomization.price === 'string' ? parseFloat(selectedCakeForCustomization.price.replace(/,/g, '')) : selectedCakeForCustomization.price) * (customOptions.weight || 0)) + (customOptions.isEggless ? 150 : 0)).toFixed(2)}`
                  }
                </span>
              </div>
            </div>
            
            <div className="p-4 border-t border-outline-variant/30 bg-surface">
              <button 
                onClick={handleConfirmAddToCart}
                className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all shadow-md flex justify-center items-center gap-2"
              >
                <ShoppingBag size={20} />
                Confirm & Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
