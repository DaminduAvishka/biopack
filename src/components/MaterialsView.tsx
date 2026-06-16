/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { MATERIALS_DATA } from '../data/materials';
import { Material } from '../types';
import TiltCard from './TiltCard';
import { Sparkles, Activity, CheckCircle, HelpCircle, HardDrive, Droplet, Clock, Award } from 'lucide-react';

export default function MaterialsView() {
  const [selectedMatId, setSelectedMatId] = useState<string>('mycelium');
  
  const currentMaterial = MATERIALS_DATA.find((m) => m.id === selectedMatId) || MATERIALS_DATA[0];

  return (
    <div className="w-full">
      {/* Page Header banner */}
      <section className="bg-brand-secondary text-brand-primary py-12 md:py-16 border-b border-brand-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl space-y-4"
          >
            <span className="font-mono text-[10px] tracking-widest text-brand-accent uppercase font-bold bg-white/10 px-2.5 py-1 rounded-sm inline-block">
              OUR NATURAL MATERIALS CATALOG
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-semibold tracking-tight">
              Our Soil-Friendly Plant Fibers
            </h1>
            <p className="font-sans text-xs md:text-sm text-brand-primary text-opacity-80 leading-relaxed">
              Learn exactly how we make our plant-based packaging, how strong each material is, and what they are best used for. Our products are grown completely naturally from organic mushroom roots and farm leftovers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Tabbed Grid Workspace */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: Material Buttons Menu Selector (Col-4) - Slide on Scroll */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 space-y-3"
          >
            <span className="font-mono text-[10px] text-brand-secondary opacity-60 uppercase tracking-widest block font-bold mb-1">
              Choose a Material to Learn More
            </span>
            <div className="flex flex-col gap-3">
              {MATERIALS_DATA.map((mat) => {
                const isActive = mat.id === selectedMatId;
                return (
                  <button
                    key={mat.id}
                    onClick={() => setSelectedMatId(mat.id)}
                    className={`w-full p-6 text-left border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'border-brand-secondary bg-brand-secondary text-brand-primary font-bold'
                        : 'border-brand-secondary/35 bg-white text-brand-secondary hover:border-brand-secondary hover:bg-brand-cream/30'
                    }`}
                  >
                    <div>
                      <span className="block font-serif text-xl font-bold">{mat.name}</span>
                      <span className={`block font-mono text-[9px] uppercase tracking-wider ${isActive ? 'text-brand-accent' : 'text-brand-secondary/70'}`}>
                        {mat.scientificName}
                      </span>
                    </div>
                    <span className="font-mono text-xs">[{isActive ? 'COMPARING' : 'SELECT'}]</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Fact Callout */}
            <div className="p-6 bg-brand-cream/50 border border-brand-secondary/50 space-y-3 mt-6">
              <span className="font-mono text-[10px] font-bold text-brand-secondary uppercase block">Worldwide Safety Approvals</span>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-accent flex-shrink-0" />
                  <span className="font-sans text-brand-secondary">ASTM D6400 certified garden safe compostable</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-accent flex-shrink-0" />
                  <span className="font-sans text-brand-secondary">USDA certified organic plant farming</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-accent flex-shrink-0" />
                  <span className="font-sans text-brand-secondary">European compost safety approved</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Interactive Detail Dashboard (Col-8) - Animated on change of selectedMatId */}
          <motion.div 
            key={selectedMatId}
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 bg-white border border-brand-secondary p-6 md:p-10 space-y-8 shadow-sm"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-brand-secondary/25 pb-6">
              <div>
                <span className="font-mono text-xs text-brand-accent font-bold uppercase tracking-widest block">Material Properties & Handling</span>
                <h2 className="font-serif text-3xl md:text-4.5xl font-extrabold text-brand-secondary mt-1">
                  {currentMaterial.name}
                </h2>
                <span className="font-mono text-xs text-brand-secondary/60 italic block mt-1">
                  {currentMaterial.scientificName}
                </span>
              </div>

              {/* Carbon saved badge badge */}
              <div className="bg-brand-cream border border-brand-secondary p-3 text-center md:text-right flex flex-col md:items-end justify-center">
                <span className="font-mono text-[9px] uppercase tracking-wider text-brand-secondary select-none">CO₂ Carbon Saved</span>
                <span className="font-mono text-2xl font-black text-brand-secondary">
                  -{currentMaterial.carbonOffsetRate}×
                </span>
                <span className="font-mono text-[8px] uppercase tracking-wider text-brand-secondary/60 block">
                  kg carbon avoided vs traditional plastic
                </span>
              </div>
            </div>

            {/* Description and Image visual Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="font-sans text-xs md:text-sm text-brand-secondary leading-relaxed">
                  {currentMaterial.description}
                </p>
                
                {/* Physical metrics bullet points */}
                <div className="space-y-3.5 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-sm bg-brand-cream border border-brand-secondary/40 text-brand-secondary">
                      <HardDrive className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase text-brand-secondary/60 tracking-wider">How Tough & Solid It Is</span>
                      <span className="block font-sans text-xs font-bold text-brand-secondary">
                        Strength rating: {currentMaterial.properties.durability} out of 100
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-sm bg-brand-cream border border-brand-secondary/40 text-brand-secondary">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase text-brand-secondary/60 tracking-wider">Composting Time in Your Garden</span>
                      <span className="block font-sans text-xs font-bold text-brand-secondary">
                        {currentMaterial.properties.degradeTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-sm bg-brand-cream border border-brand-secondary/40 text-brand-secondary">
                      <Droplet className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase text-brand-secondary/60 tracking-wider">Water & Liquid Safety</span>
                      <span className="block font-sans text-xs font-bold text-brand-secondary">
                        {currentMaterial.properties.moistureResistance}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-sm bg-brand-cream border border-brand-secondary/40 text-brand-secondary">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] uppercase text-brand-secondary/60 tracking-wider">Best Used For</span>
                      <span className="block font-sans text-xs font-bold text-brand-secondary">
                        {currentMaterial.properties.bestFor}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* 3D TILT GRAPHIC FOR SELECTION */}
              <div className="flex justify-center items-center">
                <TiltCard 
                  id={`tilt-${currentMaterial.id}`}
                  className="w-full max-w-[320px] bg-brand-cream border border-brand-secondary p-3"
                  maxTilt={12}
                >
                  <div className="relative overflow-hidden aspect-square border border-brand-secondary bg-white">
                    <img 
                      src={currentMaterial.imageUrl} 
                      alt={`${currentMaterial.name} product photography`} 
                      className="w-full h-full object-cover grayscale-[15%] transition-all duration-500 hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-secondary to-transparent p-4 text-brand-primary">
                      <span className="font-mono text-[9px] uppercase tracking-wider block text-brand-accent">
                        Real Product Photograph
                      </span>
                      <span className="font-serif text-lg font-bold">{currentMaterial.name} Box</span>
                    </div>
                  </div>
                  <div className="mt-2 text-center text-[10px] font-mono text-brand-secondary/60 mt-2 font-medium">
                    ← MOVE CURSOR OVER TO TILT CARD →
                  </div>
                </TiltCard>
              </div>
            </div>

            {/* In-depth Industrial Composition list */}
            <div className="border-t border-brand-secondary/25 pt-6 space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-brand-secondary font-bold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-brand-accent" /> PRODUCT PROPERTIES & GREEN DETAILS
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentMaterial.details.map((detail, idx) => (
                  <div key={idx} className="p-4 bg-brand-cream/40 border border-brand-secondary/20 flex gap-2.5 items-start">
                    <span className="font-mono text-[10px] font-bold text-brand-accent py-0.5 px-1 bg-brand-secondary text-brand-primary rounded-sm select-none">
                      0{idx + 1}
                    </span>
                    <p className="font-sans text-xs text-brand-secondary leading-relaxed">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

        </div>
      </section>

      {/* Full Grid Comparison Banner with Scroll Reveal */}
      <section className="bg-brand-cream bg-opacity-30 border-t border-brand-secondary py-16 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-6"
        >
          <div className="mb-10 text-center space-y-2">
            <span className="font-mono text-[10px] tracking-wider uppercase text-brand-secondary">HOW THEY STACK UP</span>
            <h2 className="font-serif text-3xl font-bold text-brand-secondary">Earthy Materials vs. Plastic</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-brand-secondary font-sans text-xs md:text-sm text-left">
              <thead>
                <tr className="bg-brand-secondary text-brand-primary divide-x divide-brand-secondary/50">
                  <th className="p-4 font-mono font-bold tracking-widest uppercase text-[11px]">Material Type</th>
                  <th className="p-4 font-mono font-bold tracking-widest uppercase text-[11px]">Time to Rot in Ground</th>
                  <th className="p-4 font-mono font-bold tracking-widest uppercase text-[11px]">Energy Needed to Make</th>
                  <th className="p-4 font-mono font-bold tracking-widest uppercase text-[11px]">Strength & Flexibility</th>
                  <th className="p-4 font-mono font-bold tracking-widest uppercase text-[11px]">CO₂ Released per kg</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-brand-secondary">
                <tr className="divide-x divide-brand-secondary/20 hover:bg-brand-cream/25">
                  <td className="p-4 font-bold text-brand-secondary">Mushroom Roots</td>
                  <td className="p-4 text-brand-accent-hover font-bold">30 to 45 Days (safe for garden)</td>
                  <td className="p-4">Extremely ultra-low (~0.7 MJ)</td>
                  <td className="p-4">Bouncy, cushions drops & falls</td>
                  <td className="p-4 font-mono font-semibold text-brand-accent-hover">Very low (0.2 kg)</td>
                </tr>
                <tr className="divide-x divide-brand-secondary/20 hover:bg-brand-cream/25">
                  <td className="p-4 font-bold text-brand-secondary">Sugarcane Fiber</td>
                  <td className="p-4 text-brand-accent-hover font-bold">60 to 90 Days (safe for garden)</td>
                  <td className="p-4">Very low (~2.4 MJ)</td>
                  <td className="p-4">Stiff, does not leak/bend</td>
                  <td className="p-4 font-mono font-semibold text-brand-accent-hover">Very low (0.5 kg)</td>
                </tr>
                <tr className="divide-x divide-brand-secondary/20 hover:bg-brand-cream/25">
                  <td className="p-4 font-bold text-brand-secondary">Pressed Bamboo</td>
                  <td className="p-4 text-brand-accent-hover font-bold">120 to 180 Days (safe for garden)</td>
                  <td className="p-4">Low (~3.1 MJ)</td>
                  <td className="p-4">Super tough, great for reuse</td>
                  <td className="p-4 font-mono font-semibold text-brand-accent-hover">Low (0.8 kg)</td>
                </tr>
                <tr className="divide-x divide-brand-secondary/20 bg-red-50/30 text-red-950">
                  <td className="p-4 font-bold">Styrofoam (White foam)</td>
                  <td className="p-4 text-red-600 font-bold">Never (500+ years)</td>
                  <td className="p-4">Incredibly high (~92 MJ)</td>
                  <td className="p-4">Crumbles, falls apart easily</td>
                  <td className="p-4 font-mono font-bold text-red-600">Extremely high (9.4 kg)</td>
                </tr>
                <tr className="divide-x divide-brand-secondary/20 bg-red-50/30 text-red-950">
                  <td className="p-4 font-bold">Standard Bottles & Bags</td>
                  <td className="p-4 text-red-600 font-bold">Never (1000+ years)</td>
                  <td className="p-4">Incredibly high (~81 MJ)</td>
                  <td className="p-4">Stretches, pollutes soil</td>
                  <td className="p-4 font-mono font-bold text-red-600">Very high (5.5 kg)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
