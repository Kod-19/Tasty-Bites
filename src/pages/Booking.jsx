import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, CheckCircle, CreditCard, Utensils, User, Calendar, ArrowLeft, TrashIcon } from 'lucide-react';
import { menuItems } from '../data/menuData';

export default function Booking({ cartItems = [], onUpdateQuantity, onRemoveFromCart }) {
  // Cross-reference cart items with menuData.js for authoritative fallback properties
  const syncedCartItems = cartItems.map((cartItem) => {
    const dishData = menuItems.find((d) => d.id === cartItem.id) || {};
    return {
      ...cartItem,
      name: cartItem.name || dishData.name || 'Unknown Item',
      image: cartItem.image || dishData.image || 'https://via.placeholder.com/150',
      price: cartItem.price || dishData.price || '£0.00',
    };
  });

  const [itemCustomizations, setItemCustomizations] = useState({});

  // Sync customization state whenever cart items change
  useEffect(() => {
    setItemCustomizations((prev) => {
      const updated = { ...prev };
      syncedCartItems.forEach((item) => {
        if (!updated[item.id]) {
          updated[item.id] = {
            soupType: item.customizations?.soupType || 'Light Soup',
            proteinType: item.customizations?.proteinType || 'Goat Meat',
            spiceLevel: item.customizations?.spiceLevel || 'Medium',
          };
        }
      });
      return updated;
    });
  }, [cartItems]);

  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    deliveryAddress: '',
    deliveryDate: '',
    deliveryTime: '12:00',
    specialInstructions: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('paystack');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCustomChange = (itemId, field, value) => {
    setItemCustomizations((prev) => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || { soupType: 'Light Soup', proteinType: 'Goat Meat', spiceLevel: 'Medium' }),
        [field]: value,
      },
    }));
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    return syncedCartItems.reduce((acc, item) => {
      let numPrice = 0;
      if (typeof item.price === 'number') numPrice = item.price;
      else if (typeof item.price === 'string') {
        numPrice = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
      }
      return acc + numPrice * (item.quantity || 1);
    }, 0);
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();

    const orderPayload = {
      items: syncedCartItems.map((item) => ({
        ...item,
        customizations: itemCustomizations[item.id] || {},
      })),
      customer: userInfo,
      paymentMethod,
      totalAmount: calculateTotal(),
    };

    console.log('Order Ready for Paystack Integration:', orderPayload);

    if (paymentMethod === 'paystack') {
      alert('Order saved! Ready for Paystack popup / redirect integration.');
    }

    setIsSubmitted(true);
  };

  if (syncedCartItems.length === 0 && !isSubmitted) {
    return (
      <div className="min-h-screen bg-app-bg text-app-text flex flex-col items-center justify-center p-6 text-center">
        <ShoppingBag className="w-16 h-16 text-app-muted mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your Cart is Currently Empty</h2>
        <p className="text-app-muted mb-6 max-w-md">
          Please add dishes to your cart first before customizing preferences and checking out.
        </p>
        <Link
          to="/#menu"
          className="inline-flex items-center gap-2 bg-app-primary text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-bg text-app-text py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-app-border pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-app-primary">Dish Preferences & Booking</h1>
            <p className="text-app-muted text-sm mt-1">
              Customize soup and protein choices for your cart items before completing checkout.
            </p>
          </div>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs font-bold text-app-muted hover:text-app-primary transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {isSubmitted ? (
          <div className="bg-app-card border border-app-border rounded-2xl p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold">Order Details Saved!</h2>
            <p className="text-app-muted text-sm max-w-md mx-auto">
              Your customized order is registered. Proceeding to Paystack checkout integration.
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-2.5 bg-app-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition"
            >
              Return Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmitBooking} className="space-y-8">
            
            {/* 1. Customize Cart Items */}
            <div className="bg-app-card border border-app-border rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 border-b border-app-border pb-3">
                <Utensils className="text-app-primary w-5 h-5" />
                <h2 className="text-xl font-bold">1. Customize Dish Components</h2>
              </div>

              <div className="space-y-6">
                {syncedCartItems.map((item) => {
                  const custom = itemCustomizations[item.id] || {
                    soupType: 'Light Soup',
                    proteinType: 'Goat Meat',
                    spiceLevel: 'Medium',
                  };

                  return (
                    <div
                      key={item.id}
                      className="p-4 bg-app-bg-subtle border border-app-border rounded-xl space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover border border-app-border"
                          />
                          <div>
                            <h3 className="font-bold text-base">{item.name}</h3>
                            <p className="text-xs text-app-muted">
                              Qty: {item.quantity || 1} × {typeof item.price === 'number' ? `£${item.price.toFixed(2)}` : item.price}
                            </p>
                          </div>
                        </div>

                        {/* Quantity & Delete Controls synced with Cart */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-app-card px-2 py-1 rounded-md border border-app-border">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                              className="text-app-muted hover:text-app-text font-bold px-1 cursor-pointer text-xs"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="text-xs font-semibold text-app-text w-4 text-center">
                              {item.quantity || 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                              className="text-app-muted hover:text-app-text font-bold px-1 cursor-pointer text-xs"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveFromCart && onRemoveFromCart(item.id)}
                            className="text-app-muted hover:text-red-500 transition p-1 cursor-pointer"
                            title="Remove item"
                          >
                            <TrashIcon size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Dropdowns to customize the dish */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-app-border/60">
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-app-muted mb-1">
                            Soup / Sauce Preference
                          </label>
                          <select
                            value={custom.soupType}
                            onChange={(e) => handleCustomChange(item.id, 'soupType', e.target.value)}
                            className="w-full bg-app-card border border-app-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-app-primary"
                          >
                            <option value="Light Soup">Goat / Light Soup</option>
                            <option value="Groundnut Soup">Groundnut (Peanut) Soup</option>
                            <option value="Palm Nut Soup">Palm Nut Soup</option>
                            <option value="Spinach Stew">Contomire / Spinach Stew</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-app-muted mb-1">
                            Protein Preference
                          </label>
                          <select
                            value={custom.proteinType}
                            onChange={(e) => handleCustomChange(item.id, 'proteinType', e.target.value)}
                            className="w-full bg-app-card border border-app-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-app-primary"
                          >
                            <option value="Goat Meat">Goat Meat</option>
                            <option value="Assorted Beef">Assorted Beef</option>
                            <option value="Tilapia / Fish">Tilapia / Fresh Fish</option>
                            <option value="Chicken">Chicken</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase text-app-muted mb-1">
                            Spice Level
                          </label>
                          <select
                            value={custom.spiceLevel}
                            onChange={(e) => handleCustomChange(item.id, 'spiceLevel', e.target.value)}
                            className="w-full bg-app-card border border-app-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-app-primary"
                          >
                            <option value="Mild">Mild</option>
                            <option value="Medium">Medium</option>
                            <option value="Extra Hot">Extra Hot</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Customer Information */}
            <div className="bg-app-card border border-app-border rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 border-b border-app-border pb-3">
                <User className="text-app-primary w-5 h-5" />
                <h2 className="text-xl font-bold">2. Customer & Delivery Details</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-app-muted mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={userInfo.fullName}
                    onChange={handleUserChange}
                    placeholder="e.g. Full Name"
                    className="w-full bg-app-bg-subtle border border-app-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-app-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-app-muted mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={userInfo.phone}
                    onChange={handleUserChange}
                    placeholder="+44 7123 456789 or local phone"
                    className="w-full bg-app-bg-subtle border border-app-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-app-primary"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-app-muted mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={userInfo.email}
                    onChange={handleUserChange}
                    placeholder="customer@example.com"
                    className="w-full bg-app-bg-subtle border border-app-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-app-primary"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-app-muted mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    name="deliveryAddress"
                    required
                    value={userInfo.deliveryAddress}
                    onChange={handleUserChange}
                    placeholder="Full street address & Postcode"
                    className="w-full bg-app-bg-subtle border border-app-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-app-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-app-muted mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="deliveryDate"
                    required
                    value={userInfo.deliveryDate}
                    onChange={handleUserChange}
                    className="w-full bg-app-bg-subtle border border-app-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-app-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-app-muted mb-1">
                    Delivery Slot *
                  </label>
                  <select
                    name="deliveryTime"
                    value={userInfo.deliveryTime}
                    onChange={handleUserChange}
                    className="w-full bg-app-bg-subtle border border-app-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-app-primary"
                  >
                    <option value="12:00">12:00 PM - 2:00 PM (Lunch)</option>
                    <option value="15:00">3:00 PM - 5:00 PM (Afternoon)</option>
                    <option value="18:00">6:00 PM - 8:00 PM (Dinner)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Payment Selection */}
            <div className="bg-app-card border border-app-border rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 border-b border-app-border pb-3">
                <CreditCard className="text-app-primary w-5 h-5" />
                <h2 className="text-xl font-bold">3. Select Payment Gateway</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paystack')}
                  className={`p-4 rounded-xl border flex flex-col justify-between text-left transition ${
                    paymentMethod === 'paystack'
                      ? 'border-app-primary bg-app-primary/10'
                      : 'border-app-border bg-app-bg-subtle'
                  }`}
                >
                  <span className="font-bold text-sm">Paystack (Card / Mobile Money)</span>
                  <span className="text-xs text-app-muted mt-1">
                    Secure online checkout ready for Paystack integration.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-4 rounded-xl border flex flex-col justify-between text-left transition ${
                    paymentMethod === 'paypal'
                      ? 'border-app-primary bg-app-primary/10'
                      : 'border-app-border bg-app-bg-subtle'
                  }`}
                >
                  <span className="font-bold text-sm">PayPal (UK / International)</span>
                  <span className="text-xs text-app-muted mt-1">
                    Pay securely via UK PayPal account or card.
                  </span>
                </button>
              </div>
            </div>

            {/* Checkout Action */}
            <div className="bg-app-card border border-app-border rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase text-app-muted block">Total Payable</span>
                <span className="text-2xl font-extrabold text-app-primary">£{calculateTotal().toFixed(2)}</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-app-primary text-white px-8 py-3.5 rounded-xl font-bold hover:opacity-90 transition active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Proceed to Paystack Payment</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}