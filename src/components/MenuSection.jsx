import React from 'react';
import MenuCard from './MenuCard';
import { menuItems } from '../data/menuData'; // <-- Imported here

export default function MenuSection({onAddToCart}) {
  return (
    <section id="menu" className="bg-app-bg-subtle py-16 px-6 border-t border-app-border">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-app-text mb-2">Our Special Menu</h2>
        <p className="text-center text-app-muted mb-10">Authentic African flavors crafted with fresh ingredients</p>
        
        {/* Responsive Flex Wrapper */}
        <div className="flex flex-wrap -mx-3">
          {menuItems.map((item) => (
            <div key={item.id} className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-6 flex">
              <MenuCard onAddToCart={onAddToCart} item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}