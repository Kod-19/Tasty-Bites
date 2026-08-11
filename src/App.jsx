import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection'
import Cart from './components/Cart'
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Initialize cart state from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to parse cart items from localStorage:', error);
      return [];
    }
  });

  // Save cart state changes to localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? {...i, quantity: (i.quantity || 1) + 1} : i
        );
      }
      return [...prev, {...item, quantity: 1}]
    })
  }

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  return (
    <div className='min-h-screen flex flex-col bg-app-bg text-app-text font-sans transition-colors duration-200'>
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0)}
      />
      <Hero />
      <MenuSection onAddToCart={handleAddToCart} />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
      <ContactSection />
      <FooterSection />
    </div>
  )
}

export default App