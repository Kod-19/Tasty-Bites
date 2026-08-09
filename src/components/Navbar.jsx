import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { Menu, ShoppingBag, X } from 'lucide-react';

export default function Navbar({ onOpenCart, cartCount = 0 }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Menu', href: '#menu' },
    { name: 'Contact', href: '#contact' },
    { name: 'Booking', href: '#booking' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-app-bg-subtle/95 text-app-text border-b border-app-border px-4 sm:px-6 lg:px-8 py-3.5 shadow-xs backdrop-blur-md transition-colors">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Brand Logo */}
        <a href="#" className="text-lg sm:text-xl font-kavoon tracking-wide text-app-primary shrink-0">
          TastyBites
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-app-muted">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-app-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Controls (Theme Toggle, Cart, Hamburger Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle className='cursor-pointer' />

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="cursor-pointer flex flex-row items-center gap-1.5 sm:gap-2 active:scale-[0.98] shrink-0"
          >
            <span className="flex items-center gap-1 whitespace-nowrap">
                <ShoppingBag size={18} />
               <span className="hidden xs:inline">Cart</span>
            </span>

            {cartCount > 0 && (
              <span className="bg-white text-app-primary text-[10px] sm:text-xs font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full shadow-xs shrink-0">
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger Icon Button (Mobile Only) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden "
            aria-label="Toggle menu"
          >
              {isMobileMenuOpen ? (
                <X />
              ) : (
                <Menu />
              )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Links */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-app-border mt-3 pt-3 pb-2 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium text-app-text hover:bg-app-card hover:text-app-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}