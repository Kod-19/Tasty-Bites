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
      desc: cartItem.desc || dishData.desc || '',
      image: cartItem.image || dishData.image || 'https://via.placeholder.com/150',
      price: cartItem.price || dishData.price || '£0.00',
    };
  });

  const [itemCustomizations, setItemCustomizations] = useState({});

  // Helper function to set initial customization defaults based on dish type
  const getDefaultCustomizations = (dish) => {
    const name = (dish.name || '').toLowerCase();
    
    if (name.includes('fufu')) {
      return {
        soupType: 'Light Soup',
        proteinType: 'Goat Meat',
        spiceLevel: 'Medium',
      };
    }
    if (name.includes('waakye')) {
      return {
        proteinType: 'Assorted Meat',
        sideOption: 'Shito & Boiled Egg',
        spiceLevel: 'Medium',
      };
    }
    if (name.includes('yam')) {
      return {
        stewType: 'Savory Tomato Stew',
        prepType: 'Boiled White Yam',
        spiceLevel: 'Medium',
      };
    }
    if (name.includes('jollof')) {
      return {
        proteinType: 'Slow-Roasted Chicken',
        spiceLevel: 'Medium',
      };
    }
    if (name.includes('fried rice')) {
      return {
        proteinType: 'Grilled Chicken',
        spiceLevel: 'Medium',
      };
    }
    
    return {
      proteinType: 'Chicken',
      spiceLevel: 'Medium',
    };
  };

  // Sync customization state whenever cart items change
  useEffect(() => {
    setItemCustomizations((prev) => {
      const updated = { ...prev };
      syncedCartItems.forEach((item) => {
        if (!updated[item.id]) {
          updated[item.id] = item.customizations || getDefaultCustomizations(item);
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
        ...(prev[itemId] || {}),
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
              Customize preferences for your selected cart items before completing checkout.
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
                  const name = (item.name || '').toLowerCase();
                  const custom = itemCustomizations[item.id] || getDefaultCustomizations(item);

                  const isFufu = name.includes('fufu');
                  const isWaakye = name.includes('waakye');
                  const isYam = name.includes('yam');
                  const isJollof = name.includes('jollof');
                  const isFriedRice = name.includes('fried rice');

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

                        {/* Quantity & Delete Controls */}
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

                      {/* Dynamic Dropdowns based on dish description */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-app-border/60">
                        
                        {/* Fufu: Includes Soup Dropdown */}
                        {isFufu && (
                          <>
                            <div>
                              <label className="block text-[11px] font-bold uppercase text-app-muted mb-1">
                                Soup Preference
                              </label>
                              <select
                                value={custom.soupType || 'Light Soup'}
                                onChange={(e) => handleCustomChange(item.id, 'soupType', e.target.value)}
                                className="w-full bg-app-card border border-app-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-app-primary"
                              >
                                <option value="Light Soup">Light Soup</option>
                                <option value="Groundnut Soup">Groundnut (Peanut) Soup</option>
                                <option value="Palm Nut Soup">Palm Nut Soup</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold uppercase text-app-muted mb-1">
                                Protein Choice
                              </label>
                              <select
                                value={custom.proteinType || 'Goat Meat'}
                                onChange={(e) => handleCustomChange(item.id, 'proteinType', e.target.value)}
                                className="w-full bg-app-card border border-app-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-app-primary"
                              >
                                <option value="Goat Meat">Tender Goat Meat</option>
                                <option value="Assorted Beef">Assorted Beef</option>
                                <option value="Fresh Fish">Fresh Fish / Tilapia</option>
                              </select>
                            </div>
                          </>
                        )}

                        {/* Waakye Customizations */}
                        {isWaakye && (
                          <>
                            <div>
                              <label className="block text-[11px] font-bold uppercase text-app-muted mb-1">
                                Protein Choice
                              </label>
                              <select
                                value={custom.proteinType || 'Assorted Meat'}
                                onChange={(e) => handleCustomChange(item.id, 'proteinType', e.target.value)}
                                className="w-full bg-app-card border border-app-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-app-primary"
                              >
                                <option value="Assorted Meat">Assorted Meats</option>
                                <option value="Wele & Beef">Wele & Beef</option>
                                <option value="Fried Fish">Fried Fish</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold uppercase text-app-muted mb-1">
                                Sides & Add-ons
                              </label>
                              <select
                                value={custom.sideOption || 'Shito & Boiled Egg'}
                                onChange={(e) => handleCustomChange(item.id, 'sideOption', e.target.value)}
                                className="w-full bg-app-card border border-app-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-app-primary"
                              >
                                <option value="Shito & Boiled Egg">Spicy Shito + Boiled Egg</option>
                                <option value="Shito Extra">Extra Black Shito</option>
                                <option value="Plain Gari">Gari & Spaghetti Add-on</option>
                              </select>
                            </div>
                          </>
                        )}

                        {/* Yam and Plantain Customizations */}
                        {isYam && (
                          <>
                            <div>
                              <label className="block text-[11px] font-bold uppercase text-app-muted mb-1">
                                Yam Preparation
                              </label>
                              <select
                                value={custom.prepType || 'Boiled White Yam'}
                                onChange={(e) => handleCustomChange(item.id, 'prepType', e.target.value)}
                                className="w-full bg-app-card border border-app-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-app-primary"
                              >
                                <option value="Boiled White Yam">Boiled White Yam</option>
                                <option value="Fried Yam">Golden Fried Yam</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold uppercase text-app-muted mb-1">
                                Sauce / Stew Choice
                              </label>
                              <select
                                value={custom.stewType || 'Savory Tomato Stew'}
                                onChange={(e) => handleCustomChange(item.id, 'stewType', e.target.value)}
                                className="w-full bg-app-card border border-app-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-app-primary"
                              >
                                <option value="Savory Tomato Stew">Savory Spicy Tomato Stew</option>
                                <option value="Palava Sauce">Palava Sauce (Contomire)</option>
                              </select>
                            </div>
                          </>
                        )}

                        {/* Jollof Rice Customizations */}
                        {isJollof && (
                          <div>
                            <label className="block text-[11px] font-bold uppercase text-app-muted mb-1">
                              Protein Choice
                            </label>
                            <select
                              value={custom.proteinType || 'Slow-Roasted Chicken'}
                              onChange={(e) => handleCustomChange(item.id, 'proteinType', e.target.value)}
                              className="w-full bg-app-card border border-app-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-app-primary"
                            >
                              <option value="Slow-Roasted Chicken">Slow-Roasted Chicken</option>
                              <option value="Grilled Beef">Grilled Beef</option>
                              <option value="Fried Fish">Fried Fish</option>
                            </select>
                          </div>
                        )}

                        {/* Fried Rice Customizations */}
                        {isFriedRice && (
                          <div>
                            <label className="block text-[11px] font-bold uppercase text-app-muted mb-1">
                              Protein Choice
                            </label>
                            <select
                              value={custom.proteinType || 'Grilled Chicken'}
                              onChange={(e) => handleCustomChange(item.id, 'proteinType', e.target.value)}
                              className="w-full bg-app-card border border-app-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-app-primary"
                            >
                              <option value="Grilled Chicken">Grilled Chicken</option>
                              <option value="Seasoned Beef">Seasoned Beef</option>
                            </select>
                          </div>
                        )}

                        {/* Universal Spice Level Dropdown */}
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-app-muted mb-1">
                            Spice Level
                          </label>
                          <select
                            value={custom.spiceLevel || 'Medium'}
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