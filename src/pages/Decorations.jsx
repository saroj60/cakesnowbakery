import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { getProducts } from '../services/db';
import { useCart } from '../context/CartContext';

const Decorations = () => {
  const [decorations, setDecorations] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts().then(products => {
      const activeProducts = products.filter(p => p.isActive !== false && p.category === 'Decorations');
      setDecorations(activeProducts);
    });
  }, []);

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

  return (
    <main className="pt-24 min-h-screen bg-surface-container-low/30">
      <section className="py-16 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-10">
          <span className="font-label-lg text-label-lg text-secondary uppercase tracking-[0.2em] mb-3 block">Extras</span>
          <h2 className="font-headline-lg text-3xl md:text-4xl text-primary font-bold">Decoration Items</h2>
          <div className="w-16 h-1 bg-secondary mx-auto rounded-full mt-4 mb-8"></div>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Make your celebration even more special with our premium selection of party decorations, balloons, banners, and candles.
          </p>
        </div>
        
        {decorations.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-gutter">
            {decorations.map((item) => (
              <div key={item.id} className="bg-surface rounded-xl p-4 md:p-6 shadow-[0_10px_30px_rgba(62,39,35,0.05)] border border-outline-variant/10 group flex flex-col">
                <div className="aspect-square overflow-hidden rounded-lg mb-4 bg-surface-variant relative p-2">
                  <img 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" 
                    alt={item.name} 
                    src={item.image || 'https://via.placeholder.com/150'} 
                  />
                </div>
                <div className="flex flex-col mb-4 flex-grow">
                  <h4 className="font-headline-md text-sm md:text-base text-primary line-clamp-2 min-h-[2.5rem]">{item.name}</h4>
                  <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">{item.description}</p>
                  <span className="font-bold text-lg text-on-surface mt-2">Rs. {item.price}</span>
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
        ) : (
          <div className="text-center py-20 bg-surface rounded-2xl border border-outline-variant/20 shadow-sm">
            <p className="text-on-surface-variant text-lg">No decoration items currently available. Check back soon!</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Decorations;
