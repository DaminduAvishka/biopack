/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CATALOG_ITEMS } from '../data/materials';
import { CatalogItem, PageId } from '../types';
import { ShoppingBag, Star, Grid, List, Check, Box, HelpCircle } from 'lucide-react';

interface StockCatalogViewProps {
  onAddToCart: (item: CatalogItem) => void;
  cartItemsIds: string[];
  setCurrentPage: (page: PageId) => void;
}

export default function StockCatalogView({
  onAddToCart,
  cartItemsIds,
  setCurrentPage,
}: StockCatalogViewProps) {
  const [filterMaterial, setFilterMaterial] = useState<string>('All');
  
  // Categorize or filter items
  const filteredItems = CATALOG_ITEMS.filter((item) => {
    if (filterMaterial === 'All') return true;
    return item.materialType === filterMaterial;
  });

  return (
    <div className="w-full">
      {/* Catalog Title Banner */}
      <section className="bg-brand-secondary text-brand-primary py-12 md:py-16 border-b border-brand-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl space-y-4"
          >
            <span className="font-mono text-[10px] tracking-widest text-brand-accent uppercase font-bold bg-white/10 px-2.5 py-1 rounded-sm inline-block">
              READY-TO-ORDER BOXES
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-semibold tracking-tight">
              Our Pre-Made Packaging Catalog
            </h1>
            <p className="font-sans text-xs md:text-sm text-brand-primary text-opacity-80 leading-relaxed">
              Start shipping your products immediately using our pre-designed shapes. These sizes require no custom mold fees, so you can order them in any quantity without setup costs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Catalog Grid with Filters */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-secondary/25 pb-6 mb-8">
          
          {/* Material Category filter */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Mushroom Roots', 'Sugarcane Fiber', 'Pressed Bamboo'].map((category) => (
              <button
                key={category}
                onClick={() => setFilterMaterial(category === 'Mushroom Roots' ? 'Mushroom Roots' : category === 'Sugarcane Fiber' ? 'Sugarcane Fiber' : category)}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-all duration-200 border cursor-pointer ${
                  (filterMaterial === category || (filterMaterial === 'Mushroom Roots' && category === 'Mushroom Roots') || (filterMaterial === 'Sugarcane Fiber' && category === 'Sugarcane Fiber'))
                    ? 'bg-brand-secondary text-brand-accent border-brand-secondary'
                    : 'bg-white text-brand-secondary border-brand-secondary/25 hover:border-brand-secondary'
                }`}
              >
                {category === 'All' ? 'ALL MATERIALS' : category}
              </button>
            ))}
          </div>

          <div className="text-right text-xs font-mono text-brand-secondary/60">
            Showing <strong className="text-brand-secondary">{filteredItems.length}</strong> ready-to-order styles
          </div>
        </div>

        {/* Stock list container with motion stagger */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const isAdded = cartItemsIds.includes(item.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -30 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  key={item.id}
                  whileHover={{ y: -6, boxShadow: "0 20px 40px -15px rgba(46,74,63,0.12)" }}
                  className="bg-white border border-brand-secondary flex flex-col justify-between group transition-all"
                >
                  {/* Image panel */}
                  <div className="relative border-b border-brand-secondary cursor-pointer aspect-[4/3] bg-brand-cream overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover grayscale-[12%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-brand-secondary text-brand-primary text-[9px] font-mono tracking-widest px-2.5 py-0.5 rounded-sm">
                      {item.materialType.toUpperCase()}
                    </div>
                  </div>

                   {/* Info block */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-brand-secondary/60 block">
                        {item.category} // Standard Option
                      </span>
                      <h3 className="font-serif text-xl font-bold text-brand-secondary uppercase leading-snug">
                        {item.name}
                      </h3>
                      <p className="font-sans text-xs text-brand-secondary/80 leading-normal">
                        {item.description}
                      </p>
                    </div>

                    {/* Pricing and dimensions details container */}
                    <div className="pt-4 border-t border-brand-secondary/20 grid grid-cols-2 gap-4">
                      <div>
                        <span className="block font-mono text-[9px] text-brand-secondary/60 uppercase">Wholesale Price</span>
                        <span className="block font-sans text-sm font-black text-brand-secondary mt-0.5">
                          ${item.pricePerUnit.toFixed(2)} - ${ (item.pricePerUnit * 0.82).toFixed(2) }
                          <span className="text-[10px] font-normal text-brand-secondary/60 block font-mono">Per piece</span>
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="block font-mono text-[9px] text-brand-secondary/60 uppercase">Minimum Order Size</span>
                        <span className="block font-sans text-sm font-extrabold text-brand-secondary mt-0.5">
                          {item.moq.toLocaleString()} units
                        </span>
                      </div>
                    </div>

                    {/* Physical measurements box */}
                    <div className="p-3 bg-brand-cream border border-brand-secondary/30 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-brand-secondary/65">PRODUCT SIZE:</span>
                      <span className="font-bold text-brand-secondary">{item.dimensions}</span>
                    </div>

                    {/* Dynamic Action Button */}
                    <button
                      onClick={() => onAddToCart(item)}
                      className={`w-full py-3.5 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all ${
                        isAdded
                          ? 'bg-brand-secondary text-brand-accent border-brand-secondary cursor-default'
                          : 'bg-white text-brand-secondary border-brand-secondary hover:bg-brand-secondary hover:text-white cursor-pointer active:translate-y-px'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" /> SAMPLE ADDED
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" /> + ADD TO SAMPLE KIT
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Discovery Sample Box Checkout teaser promo */}
      <section className="bg-brand-cream border-t border-brand-secondary py-16 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.97, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto px-6 text-center space-y-6"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-brand-accent-hover font-bold block">
            EASY SAMPLES FOR YOUR TEAM
          </span>
          <h2 className="font-serif text-3xl md:text-4.5xl font-extrabold text-brand-secondary leading-tight">
            Order Your Custom $10 Sample Box
          </h2>
          <p className="font-sans text-xs md:text-sm text-brand-secondary text-opacity-80 leading-relaxed max-w-xl mx-auto">
            We know you need to touch and feel our materials to make sure they are perfect for your products. Pick any samples you like above, and we will ship a $10 custom sample kit straight to your office.
          </p>
          <button
            onClick={() => setCurrentPage('contact')}
            className="px-8 py-4 bg-brand-secondary text-brand-accent hover:bg-brand-dark transition-all text-xs font-mono font-black tracking-widest uppercase inline-flex items-center gap-2 cursor-pointer"
          >
            GO TO CHECKOUT NOW →
          </button>
        </motion.div>
      </section>
    </div>
  );
}
