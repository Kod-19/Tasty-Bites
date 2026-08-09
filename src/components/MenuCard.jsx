import React from 'react';

export default function MenuCard({ item }) {
  const { name, price, desc, image } = item;

  return (
    <div className="bg-app-card rounded-xl border border-app-border overflow-hidden shadow-xs flex flex-col justify-between h-full transition hover:shadow-md">
      <div>
        {/* Item Image Header */}
        <div className="relative w-full h-48 bg-app-bg-subtle overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Card Body Content */}
        <div className="p-5">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="text-xl font-bold text-app-text leading-snug">{name}</h3>
            <span className="text-app-primary font-extrabold text-lg shrink-0">{price}</span>
          </div>
          <p className="text-app-muted text-sm leading-relaxed">{desc}</p>
        </div>
      </div>

      {/* Action Footer Button */}
      <div className="p-5 pt-0">
        <button className="w-full bg-app-primary text-white py-2.5 px-4 rounded-lg font-medium hover:opacity-90 transition active:scale-[0.98]">
          Add to Cart
        </button>
      </div>
    </div>
  );
}