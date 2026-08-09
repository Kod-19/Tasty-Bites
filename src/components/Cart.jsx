import React from 'react';
import { menuItems } from '../data/menuData';
import { X } from 'lucide-react';

export default function Cart({
  isOpen,
  onClose,
  cartItems = [],
  onRemoveFromCart,
  onUpdateQuantity
}) {
  if (!isOpen) return null;

  // Cross-reference cart items with authoritative dish details in menuData.js
  const syncedCartItems = cartItems.map((cartItem) => {
    const dishData = menuItems.find((d) => d.id === cartItem.id) || {};
    return {
      ...cartItem,
      name: cartItem.name || dishData.name || 'Unknown Item',
      image: cartItem.image || dishData.image || 'https://via.placeholder.com/150',
      price: cartItem.price || dishData.price || '$0.00',
    };
  });

  const totalAmount = syncedCartItems.reduce((acc, item) => {
    let numericPrice = 0;
    if (typeof item.price === 'string') {
      numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    } else if (typeof item.price === 'number') {
      numericPrice = item.price;
    }
    return acc + numericPrice * (item.quantity || 1);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity">
      <div className="bg-app-card text-app-text border-l border-app-border w-full max-w-md h-full flex flex-col justify-between shadow-2xl p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-app-border">
          <h2 className="text-2xl font-extrabold tracking-wide text-app-primary">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-app-bg-subtle text-app-text hover:opacity-80 transition"
            aria-label="Close Cart"
          >
            ✕
          </button>
        </div>

        {/* Synced Cart Items List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {syncedCartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-app-muted">
              <p>Your cart is empty.</p>
            </div>
          ) : (
            syncedCartItems.map((item, index) => (
              <div
                key={item.id ?? `cart-item-${index}`}
                className="flex items-center gap-4 bg-app-bg-subtle p-3 rounded-xl border border-app-border"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg shrink-0 border border-app-border"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-1">
                    <h4 className="font-bold text-base text-app-text truncate">{item.name}</h4>
                    {/* Delete Item Button */}
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="text-app-muted hover:text-red-500 transition p-1 text-sm shrink-0"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-app-primary font-bold text-sm">
                      {typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : item.price}
                    </span>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 bg-app-card px-2 py-0.5 rounded-md border border-app-border">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="text-app-muted hover:text-app-text font-bold px-1"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="text-xs font-semibold text-app-text w-4 text-center">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="text-app-muted hover:text-app-text font-bold px-1"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-app-border space-y-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span className="text-app-primary">${totalAmount.toFixed(2)}</span>
          </div>

          <button
            disabled={syncedCartItems.length === 0}
            className="w-full bg-app-primary text-white py-3 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50 active:scale-[0.99]"
          >
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  );
}