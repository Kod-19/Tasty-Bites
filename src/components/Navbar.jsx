import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { Menu, ShoppingBag, X } from 'lucide-react';

export default function Navbar({ onOpenCart, cartCount = 0 }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/#' },
    { name: 'Menu', path: '/#menu' },
    { name: 'Contact', path: '/#contact' },
    { name: 'Booking', path: '/booking' },
  ];

  const handleNavClick = (e, path) => {
    if (path.startsWith('/#')) {
      e.preventDefault();
      const targetId = path.replace('/#', '');

      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-app-bg-subtle/95 text-app-text border-b border-app-border px-4 sm:px-6 lg:px-8 py-3.5 shadow-xs backdrop-blur-md transition-colors">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link to="/" className="text-lg sm:text-xl font-kavoon tracking-wide shrink-0 font-black text-app-text">
          Tasty<span className="text-app-primary">Bites</span>.
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={(e) => handleNavClick(e, link.path)}
              className={`transition-colors hover:text-app-primary ${
                location.pathname === link.path ? 'text-app-primary font-bold' : 'text-app-muted'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle className="cursor-pointer" />

          <button
            onClick={onOpenCart}
            className="cursor-pointer flex flex-row items-center gap-1.5 sm:gap-2 active:scale-[0.98] shrink-0"
          >
            <span className="flex items-center gap-1 whitespace-nowrap">
              <ShoppingBag size={18} />
              <span className="hidden xs:inline">Cart</span>
            </span>

            {cartCount > 0 && (
              <span className="bg-app-primary text-white text-[10px] sm:text-xs font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full shadow-xs shrink-0">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Links */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-app-border mt-3 pt-3 pb-2 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={(e) => handleNavClick(e, link.path)}
              className="px-3 py-2 rounded-md text-sm font-medium text-app-text hover:bg-app-card hover:text-app-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}