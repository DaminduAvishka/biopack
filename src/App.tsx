/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { PageId, CatalogItem } from './types';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import MaterialsView from './components/MaterialsView';
import SolutionsView from './components/SolutionsView';
import StockCatalogView from './components/StockCatalogView';
import MetricsView from './components/MetricsView';
import ContactView from './components/ContactView';
import { SUSTAINABILITY_STATS_DEFAULT } from './data/materials';
import { Leaf, Mail, Phone, Calendar, ArrowRight, ShieldCheck, Heart, Trash2, X } from 'lucide-react';

export default function App() {
  // Page Navigation State
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  // Global scroll progress indicator for high-end scroll aesthetics
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Cart / Selected Wholesale Specimens State
  const [cart, setCart] = useState<CatalogItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Suggested Material ID linked from the Configurator to pre-check corresponding raw box blocks
  const [suggestedMaterialId, setSuggestedMaterialId] = useState<string>('mycelium');

  // Real-time live tally state (for the Carbon saved Dashboard)
  const [stats, setStats] = useState(SUSTAINABILITY_STATS_DEFAULT);

  // Periodically increment metrics fluidly to showcase live factory activity
  useEffect(() => {
    const timer = setInterval(() => {
      setStats((prev) => {
        const incrementPlastic = 0.12 + Math.random() * 0.18; // ~150g plastic displacement
        // Carbon coefficient approx ~6.5x avg displacement rate
        const incrementCO2 = incrementPlastic * (5.5 + Math.random() * 2); 
        return {
          ...prev,
          totalPlasticDisplacedKg: prev.totalPlasticDisplacedKg + incrementPlastic,
          totalCarbonSavedKg: prev.totalCarbonSavedKg + incrementCO2,
          oceanBoundPreventedKg: prev.oceanBoundPreventedKg + (incrementPlastic * 0.34), // 34% ocean equivalent
        };
      });
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  // Cart handlers
  const handleAddToCart = (item: CatalogItem) => {
    if (!cart.some((cartItem) => cartItem.id === item.id)) {
      setCart((prev) => [...prev, item]);
      // Brief pop up indicator
      setCartOpen(true);
    }
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Preselect a material box when configurator suggests one
  const handleSuggestMaterialSpecimen = (materialId: string) => {
    setSuggestedMaterialId(materialId);
  };

  // Define transition attributes for sliding page segments
  const pageVariants = {
    initial: {
      opacity: 0,
      x: 100,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: -100,
    },
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark flex flex-col justify-between selection:bg-brand-secondary selection:text-brand-accent">
      
      {/* Scroll-Driven Top Progress Bar - GSAP/ScrollTrigger Aesthetic */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[4px] bg-brand-accent origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* 1. Global Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={cart.length}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* 2. Main Page Render workspace mapped to router state */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {currentPage === 'home' && (
              <HomeView 
                setCurrentPage={setCurrentPage} 
                carbonStats={stats} 
              />
            )}
            
            {currentPage === 'materials' && (
              <MaterialsView />
            )}
            
            {currentPage === 'solutions' && (
              <SolutionsView
                onSuggestMaterial={handleSuggestMaterialSpecimen}
                setCurrentPage={setCurrentPage}
              />
            )}
            
            {currentPage === 'catalog' && (
              <StockCatalogView
                onAddToCart={handleAddToCart}
                cartItemsIds={cart.map((i) => i.id)}
                setCurrentPage={setCurrentPage}
              />
            )}
            
            {currentPage === 'metrics' && (
              <MetricsView carbonStats={stats} />
            )}
            
            {currentPage === 'contact' && (
              <ContactView
                cartItems={cart}
                onClearCart={handleClearCart}
                initialMaterialPreselect={suggestedMaterialId}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Global Aesthetic Footer (padelthon Webflow aesthetic) */}
      <footer className="bg-brand-dark text-brand-primary border-t border-brand-secondary pt-16 pb-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 pb-12 border-b border-brand-accent/25">
          
          {/* Col 1: BioPack branding & general stats (Grid 5) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded bg-brand-accent text-brand-secondary">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                BioPac<span className="text-brand-accent">k</span>
              </span>
            </div>
            
            <p className="font-sans text-xs text-brand-cream text-opacity-70 leading-normal max-w-sm">
              Industrial zero-emission manufacturing of mushroom mycelium and agricultural waste containers. Fully home degradable within 30 to 180 days.
            </p>

            <div className="pt-2 font-mono text-[10px] space-y-1 text-brand-accent uppercase tracking-wider">
              <div>✦ COMPLIANCE CERTIFIED ASTMD6400</div>
              <div>✦ ECO-MOLD BIO MATRIX CODES V1.02</div>
            </div>
          </div>

          {/* Col 2: Navigation Shortcuts (Grid 3) */}
          <div className="md:col-span-3 space-y-4 md:pl-6">
            <h4 className="font-mono text-xs uppercase text-white tracking-widest font-black">
              Cores Index
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-brand-cream/80">
              {['home', 'materials', 'solutions', 'catalog', 'metrics'].map((p) => (
                <li key={p}>
                  <button
                    onClick={() => setCurrentPage(p as PageId)}
                    className="hover:text-brand-accent text-left transition-colors font-semibold"
                  >
                    // {p.toUpperCase()} DIRECTWAY
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Technical Support desk (Grid 5) */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="font-mono text-xs uppercase text-white tracking-widest font-black">
              Biopack Factory Direct Desk
            </h4>
            
            <div className="space-y-2.5 text-xs font-sans text-brand-cream/80">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-accent flex-shrink-0" />
                <span>R&D Engineering: client-relations@biopack-industrial.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-accent flex-shrink-0" />
                <span>Factory Gate line: +1 (800) BIO-PACK (Hours: 08:00 - 17:00 CST)</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-accent flex-shrink-0" />
                <span>Standard Delivery time: Europe / Americas in 4-6 Days</span>
              </div>
            </div>

            {/* Newsletter input or minor notice */}
            <div className="pt-2">
              <span className="block font-mono text-[9px] uppercase tracking-wider text-brand-accent/70 mb-1">
                DISASTER DISPLACEMENT EMERGENCY BULLETINS
              </span>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Insert client email" 
                  className="bg-brand-secondary border border-brand-accent/25 px-3 py-2 text-xs text-white focus:outline-none w-full max-w-[200px]"
                />
                <button 
                  onClick={() => alert("Sustainability registry recorded. Welcome to BioPack.")}
                  className="bg-brand-accent text-brand-secondary text-[11px] font-mono whitespace-nowrap font-bold px-3 py-2 uppercase hover:bg-brand-accent-hover transition-colors"
                >
                  STAY TUNED
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Outer footer elements line */}
        <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-brand-cream/40 gap-4">
          <div>
            © 2026 BIOPACK SYSTEM CO. INDUSTRIAL BIO-REACTORS ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" /> Certified B-Corp Protocol
            </span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Planet Earth
            </span>
          </div>
        </div>
      </footer>

      {/* 4. Sliding Sidebar Carton Shopping Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden font-sans">
            <div className="absolute inset-0 bg-brand-secondary/40 backdrop-blur-sm transition-opacity" onClick={() => setCartOpen(false)} />
            
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-screen max-w-md bg-white border-l border-brand-secondary"
              >
                <div className="h-full flex flex-col justify-between p-6">
                  <div>
                    {/* Header bar */}
                    <div className="flex justify-between items-center border-b border-brand-secondary pb-4 mb-6">
                      <div>
                        <span className="font-mono text-[10px] text-brand-accent-hover block font-black uppercase">
                          Bio-Molds Deposit
                        </span>
                        <h3 className="font-serif text-2xl font-black text-brand-secondary uppercase">
                          Sample Carton
                        </h3>
                      </div>
                      <button
                        onClick={() => setCartOpen(false)}
                        className="p-1.5 hover:bg-brand-cream text-brand-secondary border border-brand-secondary rounded-sm transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Carton list */}
                    {cart.length > 0 ? (
                      <div className="space-y-4 overflow-y-auto max-h-[50vh] no-scrollbar">
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className="p-3 border border-brand-secondary bg-brand-cream/30 flex gap-3 items-center"
                          >
                            <div className="h-12 w-12 border border-brand-secondary/35 flex-shrink-0 bg-white">
                              <img
                                src={item.imageUrl}
                                alt=""
                                className="h-full w-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="block text-xs font-bold text-brand-secondary truncate">
                                {item.name}
                              </span>
                              <span className="block text-[10px] font-mono text-brand-secondary/60">
                                {item.materialType} • MOQ: {item.moq.toLocaleString()} units
                              </span>
                            </div>
                            <button
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="p-2 hover:bg-white text-red-700 hover:text-red-900 transition-colors"
                              title="Discard specimen"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 space-y-3">
                        <p className="text-xs text-brand-secondary opacity-65 italic">
                          Your custom sample kit is empty. Select standard moldings under the "Stock Wholesale" catalog.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Sidebar footer / transaction CTA */}
                  <div className="border-t border-brand-secondary/25 pt-6 space-y-4">
                    <div className="p-4 bg-brand-cream border border-brand-secondary space-y-1 text-xs font-mono text-brand-secondary">
                      <div className="flex justify-between items-center">
                        <span>Corporate specimens:</span>
                        <span>{cart.length} items</span>
                      </div>
                      <div className="flex justify-between items-center text-brand-accent-hover font-bold">
                        <span>Logistics Flat-rate fee:</span>
                        <span>$10.00 USD</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setCartOpen(false);
                        setCurrentPage('contact');
                      }}
                      className="w-full py-4 bg-brand-accent text-brand-secondary hover:bg-brand-accent-hover transition-all font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2"
                    >
                      PROCEED TO CHECKOUT ($10) <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
