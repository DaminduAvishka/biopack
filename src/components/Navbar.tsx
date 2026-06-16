/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Leaf, Menu, X, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { PageId } from '../types';

interface NavbarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Navbar({
  currentPage,
  setCurrentPage,
  cartCount,
  onOpenCart,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'materials', label: 'Materials' },
    { id: 'solutions', label: 'Design' },
    { id: 'catalog', label: 'Products' },
    { id: 'metrics', label: 'Metrics' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-cream border-b border-brand-secondary">
      {/* 1. Rolling Announcement Ticker (Top Bar) */}
      <div className="w-full bg-brand-secondary text-brand-primary py-2 overflow-hidden border-b border-brand-secondary text-xs uppercase tracking-widest font-mono">
        <div className="flex whitespace-nowrap animate-ticker">
          <span className="mx-4 font-bold flex items-center gap-1">
            <Leaf className="w-3.5 h-3.5 text-brand-accent inline" /> PLANT-BASED PACKAGING: 100% COMPOSTABLE BOXES FOR RESPONSIBLE BRANDS ✦ &nbsp;
          </span>
          <span className="mx-4 flex items-center gap-1">
            MADE FROM MUSHROOM MYCELIUM ROOTS, SUGARCANE FIBERS, AND ORGANIC PULPS ✦ &nbsp;
          </span>
          <span className="mx-4 flex items-center gap-1">
            MELTS AWAY SAFELY IN THE GARDEN WITHIN 30 TO 180 DAYS • REPLACING TOXIC STYROFOAM ✦ &nbsp;
          </span>
          <span className="mx-4 flex items-center gap-1">
            ORDER A $10 SAMPLE KIT TODAY TO FEEL THE DIFFERENCE &nbsp;
          </span>
          {/* Duplicate for infinite effect */}
          <span className="mx-4 font-bold flex items-center gap-1">
            <Leaf className="w-3.5 h-3.5 text-brand-accent inline" /> PLANT-BASED PACKAGING: 100% COMPOSTABLE BOXES FOR RESPONSIBLE BRANDS ✦ &nbsp;
          </span>
          <span className="mx-4 flex items-center gap-1">
            MADE FROM MUSHROOM MYCELIUM ROOTS, SUGARCANE FIBERS, AND ORGANIC PULPS ✦ &nbsp;
          </span>
          <span className="mx-4 flex items-center gap-1">
            MELTS AWAY SAFELY IN THE GARDEN WITHIN 30 TO 180 DAYS • REPLACING TOXIC STYROFOAM ✦ &nbsp;
          </span>
          <span className="mx-4 flex items-center gap-1">
            ORDER A $10 SAMPLE KIT TODAY TO FEEL THE DIFFERENCE &nbsp;
          </span>
        </div>
      </div>

      {/* 2. Main Navigation Block with high contrast borders */}
      <div className="w-full max-w-7xl mx-auto flex items-stretch divide-x divide-brand-secondary h-16 justify-between lg:justify-start">
        {/* LOGO BOX */}
        <div
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2.5 px-6 cursor-pointer bg-brand-cream hover:bg-white transition-colors duration-200"
        >
          <div className="p-1.5 rounded bg-brand-secondary text-brand-accent">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <img className='w-26' src="src/assets/images/biopack_logo.png" alt="" />
          </div>
        </div>

        {/* DESKTOP NAV ITEMS - Flex divided */}
        <nav className="hidden lg:flex flex-1 items-stretch divide-x divide-brand-secondary">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                setMobileMenuOpen(false);
              }}
              className={`flex-1 flex items-center justify-center px-4 font-sans text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${currentPage === item.id
                ? 'bg-brand-secondary text-brand-accent font-bold'
                : 'text-brand-secondary hover:bg-white hover:text-brand-secondary'
                }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CART BOX & MENU CONTROL */}
        <div className="flex items-stretch divide-x divide-brand-secondary">
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-6 bg-brand-cream hover:bg-white transition-all cursor-pointer relative text-brand-secondary hover:text-brand-accent-hover"
            title="View Sample Kit Carton"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-brand-secondary" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-accent text-[9px] font-mono font-bold text-brand-secondary ring-1 ring-brand-secondary">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-mono text-[10px] uppercase font-bold tracking-wider">
              Cart ({cartCount})
            </span>
          </button>

          {/* Quick CTA */}
          <button
            onClick={() => setCurrentPage('contact')}
            className="hidden sm:flex items-center justify-center px-6 bg-brand-accent text-brand-secondary hover:bg-brand-accent-hover font-sans text-xs uppercase tracking-wider font-extrabold transition-all border-none"
          >
            Free Sample
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center px-5 hover:bg-white text-brand-secondary transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-brand-cream border-t border-brand-secondary divide-y divide-brand-secondary animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full py-4 px-6 text-left font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-between ${currentPage === item.id
                ? 'bg-brand-secondary text-brand-accent font-bold'
                : 'text-brand-secondary hover:bg-white'
                }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => {
              setCurrentPage('contact');
              setMobileMenuOpen(false);
            }}
            className="w-full py-4 px-6 text-left font-sans text-xs uppercase tracking-widest font-bold bg-brand-accent text-brand-secondary flex justify-between items-center"
          >
            <span>REQUEST INTRO SAMPLE BOX</span>
            <span>$10 Checkout →</span>
          </button>
        </div>
      )}
    </header>
  );
}
