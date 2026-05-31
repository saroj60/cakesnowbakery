import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, ShoppingCart, Search, MapPin, ChevronDown, X, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.jpg';

const Navbar = () => {
  const { getCartCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-surface/95 dark:bg-surface-dim/95 backdrop-blur-md shadow-md py-2' : 'bg-surface py-4'}`}>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          {/* Main Navigation */}
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button className="md:hidden text-primary p-2 -ml-2" onClick={toggleMobileMenu}>
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Snow Cakes Logo" className="h-14 md:h-16 mix-blend-multiply object-contain scale-110" />
            </Link>

            {/* Desktop Links */}
            <nav className="hidden md:flex items-center gap-6 font-medium text-on-surface">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <a href="/#menu" className="hover:text-primary transition-colors">Shop</a>
              
              {/* Categories Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                <button className="flex items-center gap-1 hover:text-primary transition-colors py-2">
                  Categories <ChevronDown size={16} />
                </button>
                <div className={`absolute top-full left-0 w-48 bg-surface rounded-xl shadow-lg border border-outline-variant/20 overflow-hidden transition-all duration-200 origin-top ${isCategoriesOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-0 invisible'}`}>
                  <div className="py-2 flex flex-col">
                    <Link to="/?category=Cakes#menu" onClick={() => setIsCategoriesOpen(false)} className="px-4 py-2 hover:bg-surface-container-low transition-colors">Cakes</Link>
                    <Link to="/?category=Pastries#menu" onClick={() => setIsCategoriesOpen(false)} className="px-4 py-2 hover:bg-surface-container-low transition-colors">Pastries</Link>
                    <Link to="/?category=Donuts#menu" onClick={() => setIsCategoriesOpen(false)} className="px-4 py-2 hover:bg-surface-container-low transition-colors">Donuts</Link>
                    <Link to="/?category=Cookies#menu" onClick={() => setIsCategoriesOpen(false)} className="px-4 py-2 hover:bg-surface-container-low transition-colors">Cookies</Link>
                    <Link to="/?category=Bread#menu" onClick={() => setIsCategoriesOpen(false)} className="px-4 py-2 hover:bg-surface-container-low transition-colors">Bread</Link>
                    <Link to="/?category=Coffee#menu" onClick={() => setIsCategoriesOpen(false)} className="px-4 py-2 hover:bg-surface-container-low transition-colors">Coffee</Link>
                  </div>
                </div>
              </div>

              <a href="/#menu" className="hover:text-primary transition-colors">Best Sellers</a>
              <Link to="/decorations" className="hover:text-primary transition-colors">Decorations</Link>
              <Link to="/custom-order" className="hover:text-primary transition-colors font-bold text-primary">Custom Order</Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <form onSubmit={handleSearch} className="hidden lg:flex relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..." 
                  className="pl-10 pr-4 py-2 rounded-full border border-outline-variant bg-surface focus:ring-2 focus:ring-primary outline-none transition-all w-64"
                />
                <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors">
                  <Search size={18} />
                </button>
              </form>
              <button className="lg:hidden text-primary p-2">
                <Search size={24} />
              </button>
              <Link 
                to="/admin/login"
                className="text-primary p-2 hover:bg-surface-container-low rounded-full transition-colors hidden sm:block"
                title="Admin Login"
              >
                <User size={24} />
              </Link>
              <button 
                className="relative text-primary p-2 hover:bg-surface-container-low rounded-full transition-colors"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart size={24} />
                {getCartCount() > 0 && (
                  <span className="absolute top-0 right-0 bg-error text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-surface transform translate-x-1/4 -translate-y-1/4">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={toggleMobileMenu}>
        <div 
          className={`absolute top-0 left-0 bottom-0 w-4/5 max-w-sm bg-surface shadow-2xl transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center">
            <span className="font-headline-md text-xl font-bold text-primary">Menu</span>
            <button onClick={toggleMobileMenu} className="p-2 text-on-surface-variant hover:text-error transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="p-4 flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-70px)]">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant bg-surface-container-low focus:ring-2 focus:ring-primary outline-none"
              />
              <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors">
                <Search size={18} />
              </button>
            </form>
            
            <Link to="/" onClick={toggleMobileMenu} className="font-medium text-lg py-2 border-b border-outline-variant/10">Home</Link>
            <a href="/#menu" onClick={toggleMobileMenu} className="font-medium text-lg py-2 border-b border-outline-variant/10">Shop</a>
            
            <div className="py-2 border-b border-outline-variant/10">
              <span className="font-medium text-lg text-primary block mb-2">Categories</span>
              <div className="grid grid-cols-2 gap-2 pl-4">
                <Link to="/?category=Cakes#menu" onClick={toggleMobileMenu} className="py-1 text-on-surface-variant">Cakes</Link>
                <Link to="/?category=Pastries#menu" onClick={toggleMobileMenu} className="py-1 text-on-surface-variant">Pastries</Link>
                <Link to="/?category=Donuts#menu" onClick={toggleMobileMenu} className="py-1 text-on-surface-variant">Donuts</Link>
                <Link to="/?category=Cookies#menu" onClick={toggleMobileMenu} className="py-1 text-on-surface-variant">Cookies</Link>
                <Link to="/?category=Bread#menu" onClick={toggleMobileMenu} className="py-1 text-on-surface-variant">Bread</Link>
                <Link to="/?category=Coffee#menu" onClick={toggleMobileMenu} className="py-1 text-on-surface-variant">Coffee</Link>
              </div>
            </div>

            <a href="/#menu" onClick={toggleMobileMenu} className="font-medium text-lg py-2 border-b border-outline-variant/10">Best Sellers</a>
            <Link to="/decorations" onClick={toggleMobileMenu} className="font-medium text-lg py-2 border-b border-outline-variant/10">Decorations</Link>
            <Link to="/custom-order" onClick={toggleMobileMenu} className="font-bold text-primary text-lg py-2 border-b border-outline-variant/10">Custom Order</Link>
            
            <Link to="/admin/login" onClick={toggleMobileMenu} className="font-medium text-on-surface-variant text-lg py-2 mt-auto flex items-center gap-2">
              <User size={20} />
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
