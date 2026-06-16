/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MATERIALS_DATA } from '../data/materials';
import { PageId, ConfiguratorOnboarding } from '../types';
import { Box, Sparkles, Check, ChevronRight, HelpCircle, HardDrive, Cpu, Droplet, ShoppingBag, ShieldAlert } from 'lucide-react';

interface SolutionsViewProps {
  onSuggestMaterial: (materialId: string) => void;
  setCurrentPage: (page: PageId) => void;
}

export default function SolutionsView({
  onSuggestMaterial,
  setCurrentPage,
}: SolutionsViewProps) {
  // Configurator onboarding questions state
  const [productType, setProductType] = useState<'liquid' | 'electronics' | 'food' | 'cosmetics' | 'none'>('none');
  const [rigidity, setRigidity] = useState<'soft' | 'semi-rigid' | 'rigid' | 'none'>('none');
  const [moisture, setMoisture] = useState<'low' | 'moderate' | 'waterproof'>('low');
  const [volume, setVolume] = useState<number>(10000); // Annual unit volume
  
  const [showResult, setShowResult] = useState(false);

  // Matcher logic based on selections
  const getRecommendedMaterial = () => {
    if (productType === 'electronics') {
      return MATERIALS_DATA.find((m) => m.id === 'mycelium') || MATERIALS_DATA[0];
    }
    if (productType === 'food') {
      return MATERIALS_DATA.find((m) => m.id === 'bagasse') || MATERIALS_DATA[1];
    }
    if (productType === 'cosmetics' || productType === 'liquid') {
      return MATERIALS_DATA.find((m) => m.id === 'bamboo') || MATERIALS_DATA[2];
    }
    // Fallback based on moisture
    if (moisture === 'waterproof') {
      return MATERIALS_DATA.find((m) => m.id === 'bamboo') || MATERIALS_DATA[2];
    }
    // High durability -> Bamboo, otherwise Mycelium
    if (rigidity === 'soft') {
      return MATERIALS_DATA.find((m) => m.id === 'mycelium') || MATERIALS_DATA[0];
    }
    return MATERIALS_DATA.find((m) => m.id === 'bagasse') || MATERIALS_DATA[1];
  };

  const recMaterial = getRecommendedMaterial();

  // Financial and environmental impact math
  const estimatedUnitPrice = recMaterial.id === 'mycelium' 
    ? 1.25 
    : recMaterial.id === 'bagasse' 
      ? 0.16 
      : 1.95;

  const totalCostEstimate = volume * estimatedUnitPrice;
  const annualCarbonSavedKgHeight = volume * recMaterial.carbonOffsetRate * 0.18; // 18% average unit weight 180g

  const handleConfiguratorReset = () => {
    setProductType('none');
    setRigidity('none');
    setMoisture('low');
    setVolume(10000);
    setShowResult(false);
  };

  const handleApplyToSampleKit = () => {
    // Pass suggested material up
    onSuggestMaterial(recMaterial.id);
    setCurrentPage('contact');
  };

  return (
    <div className="w-full">
      {/* 1. SECTION BANNER */}
      <section className="bg-brand-cream border-b border-brand-secondary py-12 md:py-16 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          <div className="space-y-4">
            <span className="font-mono text-[10px] tracking-widest text-brand-secondary uppercase font-bold bg-brand-secondary/15 px-2.5 py-1 rounded-sm inline-block">
              CUSTOM DESIGNED PACKAGING
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-semibold tracking-tight text-brand-secondary leading-tight">
              Custom Boxes For Good Brands
            </h1>
            <p className="font-sans text-xs md:text-sm text-brand-secondary text-opacity-80 leading-relaxed">
              Fully customized packaging options made exactly to your product's size. From soft protective inserts to elegant makeup tubes, we help you design and grow completely natural boxes that fit your products perfectly.
            </p>
          </div>
          
          <div className="border border-brand-secondary p-6 bg-white space-y-4">
            <h3 className="font-serif text-lg font-bold text-brand-secondary">Our Product Quality Checklist</h3>
            <ul className="space-y-2 text-xs text-brand-secondary/90">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-accent flex-shrink-0" />
                <span>100% free from plastic, wax, and petroleum chemicals</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-accent flex-shrink-0" />
                <span>Options for waterproof, shock-absorbent, and oil-proof coats</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-accent flex-shrink-0" />
                <span>Approved for shipping across international borders smoothly</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-accent flex-shrink-0" />
                <span>Highly accurate molds shaped precisely to your product's dimensions</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </section>

      {/* 2. MAIN CONFIGURATOR HUB */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Form Control OR Result Presentation */}
          <div className="lg:col-span-8 bg-white border border-brand-secondary p-6 md:p-10 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key="configurator-form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-8"
                >
                  <div className="border-b border-brand-secondary/20 pb-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-brand-accent font-bold">
                      Interactive Selection Helper
                    </span>
                    <h2 className="font-serif text-2.5xl md:text-4xl font-extrabold text-brand-secondary">
                      Design Helper: Find Your Match
                    </h2>
                    <p className="font-sans text-xs text-brand-secondary opacity-75 mt-1">
                      Answer a few simple questions below to find the perfect plant-based material for your product.
                    </p>
                  </div>

                  {/* Question 1: Product Type */}
                  <div className="space-y-3">
                    <label className="block font-mono text-xs uppercase tracking-widest text-brand-secondary font-bold">
                      01 / What are you putting inside?
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { id: 'electronics', label: 'Fragile Items', desc: 'Like gadgets, phones, and glass' },
                        { id: 'food', label: 'Hot Food & Drinks', desc: 'Resists grease, water, and heat' },
                        { id: 'cosmetics', label: 'Makeup & Beauty', desc: 'Resists oils and matches beauty jars' },
                        { id: 'liquid', label: 'Spillable Liquids', desc: 'Leak-proof tubes, jars, and bottles' },
                      ].map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setProductType(type.id as any)}
                          className={`p-4 border text-left transition-all ${
                            productType === type.id
                              ? 'border-brand-secondary bg-brand-secondary text-brand-primary'
                              : 'border-brand-secondary/30 hover:border-brand-secondary bg-brand-cream/10'
                          }`}
                        >
                          <span className="block font-sans text-xs font-bold uppercase tracking-wider">{type.label}</span>
                          <span className={`block text-[10px] mt-1 leading-normal ${productType === type.id ? 'opacity-80' : 'opacity-60'}`}>{type.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question 2: Rigidity Required */}
                  <div className="space-y-3">
                    <label className="block font-mono text-xs uppercase tracking-widest text-brand-secondary font-bold">
                      02 / How stiff or strong does it need to be?
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {[
                        { id: 'soft', label: 'Soft & Spongy', desc: 'Cushions delicate items and absorbs drops' },
                        { id: 'semi-rigid', label: 'Semi-Stiff Molded', desc: 'Flat trays, sturdy lids, and custom dividers' },
                        { id: 'rigid', label: 'Extremely Tough', desc: 'Strong wood-like feel, reusable jars' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setRigidity(item.id as any)}
                          className={`p-4 border text-left transition-all ${
                            rigidity === item.id
                              ? 'border-brand-secondary bg-brand-secondary text-brand-primary'
                              : 'border-brand-secondary/30 hover:border-brand-secondary bg-brand-cream/10'
                          }`}
                        >
                          <span className="block font-sans text-xs font-bold uppercase tracking-wider">{item.label}</span>
                          <span className={`block text-[10px] mt-1 leading-normal ${rigidity === item.id ? 'opacity-80' : 'opacity-60'}`}>{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question 3: Moisture Exposure */}
                  <div className="space-y-3">
                    <label className="block font-mono text-xs uppercase tracking-widest text-brand-secondary font-bold">
                      03 / Will it get exposed to water or moisture?
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {[
                        { id: 'low', label: 'Dry Only', desc: 'Kept inside typical cardboard outer boxes' },
                        { id: 'moderate', label: 'Splash Resistant', desc: 'Great for refrigerated foods or makeup oils' },
                        { id: 'waterproof', label: '100% Waterproof', desc: 'Holds liquid creams, gels, and liquids safely' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setMoisture(item.id as any)}
                          className={`p-4 border text-left transition-all ${
                            moisture === item.id
                              ? 'border-brand-secondary bg-brand-secondary text-brand-primary'
                              : 'border-brand-secondary/30 hover:border-brand-secondary bg-brand-cream/10'
                          }`}
                        >
                          <span className="block font-sans text-xs font-bold uppercase tracking-wider">{item.label}</span>
                          <span className={`block text-[10px] mt-1 leading-normal ${moisture === item.id ? 'opacity-80' : 'opacity-60'}`}>{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question 4: Volumetric Run Slider */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="block font-mono text-xs uppercase tracking-widest text-brand-secondary font-bold">
                        04 / How many items do you think you will need annually?
                      </label>
                      <span className="font-mono text-xs font-black bg-brand-cream px-3 py-1 border border-brand-secondary">
                        {volume.toLocaleString()} Units
                      </span>
                    </div>
                    <input
                      type="range"
                      min={5000}
                      max={250000}
                      step={5000}
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-full accent-brand-secondary cursor-pointer h-2 bg-brand-cream border border-brand-secondary rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-brand-secondary/60">
                      <span>5,000 unit minimum</span>
                      <span>100,000 medium batch</span>
                      <span>250,000 large batch</span>
                    </div>
                  </div>

                  {/* Bottom Action Trigger */}
                  <div className="pt-4">
                    <button
                      type="button"
                      disabled={productType === 'none' || rigidity === 'none'}
                      onClick={() => setShowResult(true)}
                      className={`w-full py-4 text-xs font-mono font-bold tracking-widest uppercase transition-all ${
                        productType === 'none' || rigidity === 'none'
                          ? 'bg-brand-cream text-brand-secondary/30 border border-brand-secondary/20 cursor-not-allowed'
                          : 'bg-brand-accent text-brand-secondary hover:bg-brand-accent-hover active:translate-y-px cursor-pointer'
                      }`}
                    >
                      SEE MY IDEAL PACKAGING RECOMMENDATION →
                    </button>
                    {(productType === 'none' || rigidity === 'none') && (
                      <span className="text-[10px] text-brand-secondary opacity-65 text-center block mt-2 text-red-700 font-semibold">
                        ▲ Please pick an item category and strength level to find your match.
                      </span>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="configurator-result"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center border-b border-brand-secondary/20 pb-4">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-brand-accent font-bold">
                        Excellent! Here is your custom suggestion
                      </span>
                      <h2 className="font-serif text-2.5xl md:text-3.5xl font-extrabold text-brand-secondary">
                        Suggested Material: {recMaterial.name}
                      </h2>
                    </div>
                    <button
                      onClick={handleConfiguratorReset}
                      className="font-mono text-[10px] border border-brand-secondary font-bold text-brand-secondary px-3 py-1 bg-white hover:bg-brand-cream/50 uppercase transition-colors"
                    >
                      Start Over
                    </button>
                  </div>

                  {/* Recommendation Details Card block */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Tiny representation image */}
                    <div className="md:col-span-4 border border-brand-secondary aspect-square overflow-hidden bg-brand-cream">
                      <img 
                        src={recMaterial.imageUrl} 
                        alt="Proposed molded material specimen" 
                        className="w-full h-full object-cover grayscale-[10%]"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="md:col-span-8 space-y-3">
                      <span className="font-mono text-[10px] uppercase text-brand-secondary/65 block">
                        Earthy Material Name: <strong className="text-brand-secondary font-semibold">{recMaterial.scientificName}</strong>
                      </span>
                      <p className="font-sans text-xs md:text-sm text-brand-secondary leading-normal">
                        Based on your selections, {recMaterial.name} is the best option for your products. It dissolves safely and naturally in normal backyard compost and keeps your products fully secure during storage and shipping.
                      </p>
                      
                      {/* Technical specifications bullets */}
                      <div className="grid grid-cols-2 gap-3 text-xs border-t border-brand-secondary/25 pt-3">
                        <div>
                          <span className="font-mono text-[10px] text-brand-secondary/60 uppercase block">Estimated Price</span>
                          <span className="font-sans font-extrabold text-brand-secondary text-lg">
                            ${estimatedUnitPrice.toFixed(2)} <span className="text-[10px] font-normal font-mono">/ Unit</span>
                          </span>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] text-brand-secondary/60 uppercase block">Carbon Savings per Year</span>
                          <span className="font-sans font-extrabold text-brand-accent-hover text-lg">
                            {annualCarbonSavedKgHeight.toFixed(0).toLocaleString()} kg CO₂
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary math chart analysis */}
                  <div className="p-5 bg-brand-cream border border-brand-secondary space-y-3">
                    <span className="font-mono text-[10px] uppercase font-extrabold text-brand-secondary block">
                      Estimated Timelines & Costs
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-brand-secondary/35">
                      <div className="py-2 sm:py-0">
                        <span className="font-mono text-[9px] uppercase tracking-wider block text-brand-secondary/60">Estimated Total Budget</span>
                        <span className="font-serif text-xl font-bold font-mono text-brand-secondary">
                          ${totalCostEstimate.toLocaleString()}
                        </span>
                      </div>
                      <div className="py-2 sm:py-0 md:px-2">
                        <span className="font-mono text-[9px] uppercase tracking-wider block text-brand-secondary/60 font-bold">First Shipments Ready</span>
                        <span className="font-sans text-xs uppercase tracking-widest font-extrabold text-brand-secondary">
                          In 14 to 18 Days
                        </span>
                      </div>
                      <div className="py-2 sm:py-0">
                        <span className="font-mono text-[9px] uppercase tracking-wider block text-brand-secondary/60">Green Benefits</span>
                        <span className="font-sans text-xs uppercase tracking-widest font-extrabold text-brand-accent-hover">
                          100% Plastic-Tax Free
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Post Onboarding CTAs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <button
                      onClick={handleApplyToSampleKit}
                      className="flex items-center justify-center gap-2 py-4 bg-brand-accent text-brand-secondary hover:bg-brand-accent-hover transition-all text-xs font-mono font-bold tracking-wider"
                    >
                      <ShoppingBag className="w-4 h-4" /> ADD TO SAMPLE CART ($10)
                    </button>
                    <button
                      onClick={() => setCurrentPage('contact')}
                      className="flex items-center justify-center py-4 bg-transparent text-brand-secondary border border-brand-secondary hover:bg-brand-cream/35 transition-all text-xs font-mono font-bold tracking-wider"
                    >
                      ASK US A QUESTION
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Factory Engineering Features list (Col-4) - Slide on Scroll */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 bg-brand-secondary text-brand-primary p-6 md:p-8 flex flex-col justify-between border border-brand-secondary shadow-lg overflow-hidden"
          >
            <div className="space-y-6">
              <span className="font-mono text-[10px] text-brand-accent uppercase tracking-widest block font-bold border-b border-brand-accent/25 pb-3">
                Expert Packaging Assistance
              </span>
              
              <div className="space-y-5">
                <div className="space-y-2">
                  <span className="font-serif text-xl font-semibold flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-brand-accent" /> Send Us Your Sketches
                  </span>
                  <p className="font-sans text-xs text-brand-primary text-opacity-80 leading-relaxed">
                    Our packaging designers can take your existing box sizes, simple sketches, or digital designs and shape the natural material smoothly around your products with perfect accuracy.
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="font-serif text-xl font-semibold flex items-center gap-2">
                    <Droplet className="w-4 h-4 text-brand-accent" /> Extra Protective Coating
                  </span>
                  <p className="font-sans text-xs text-brand-primary text-opacity-80 leading-relaxed text-opacity-85">
                    Need to hold hot liquids or greasy items? We can coat the inside with a natural pine-sap layer that keeps the container moisture-safe for up to two years.
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="font-serif text-xl font-semibold flex items-center gap-2">
                    <Box className="w-4 h-4 text-brand-accent" /> Production Sites Worldwide
                  </span>
                  <p className="font-sans text-xs text-brand-primary text-opacity-80 leading-relaxed text-opacity-85">
                    We maintain friendly processing and loading spots across North America and Europe, ensuring you get your boxes quickly and reliably.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-brand-dark p-5 mt-6 border border-brand-accent/35 font-mono text-[10px] space-y-2 rounded-sm leading-normal">
              <div className="flex items-center gap-2 text-brand-accent font-bold">
                <ShieldAlert className="w-4 h-4" /> SAFE SHIPPING & STERILIZATION
              </div>
              <p className="text-white opacity-80">
                To make sure our products are 100% safe to ship anywhere in the world, we clean all of our mushroom boxes with safe, sanitizing steam. They arrive completely clean and ready to use.
              </p>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
