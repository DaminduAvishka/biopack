/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Leaf, Shield, Sparkles, Building, Globe, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import TiltCard from './TiltCard';

interface HomeViewProps {
  setCurrentPage: (page: PageId) => void;
  carbonStats: {
    totalPlasticDisplacedKg: number;
    totalCarbonSavedKg: number;
    clientCount: number;
    oceanBoundPreventedKg: number;
  };
}

export default function HomeView({ setCurrentPage, carbonStats }: HomeViewProps) {
  // Format numbers customly
  const formatNum = (num: number) => num.toLocaleString('en-US');

  return (
    <div className="w-full">
      {/* 1. HERO GRAPHIC GRID */}
      <section className="border-b border-brand-secondary">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-brand-secondary">
          
          {/* Hero Left Main Column */}
          <div className="lg:col-span-7 p-8 md:p-14 flex flex-col justify-between bg-brand-cream bg-opacity-30">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-secondary/10 border border-brand-secondary/20 rounded-full text-xs font-mono text-brand-secondary tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-brand-accent" /> THE FUTURE OF EARTH-FRIENDLY PACKAGING
              </div>
              
              <h1 className="font-serif text-5xl md:text-7xl font-semibold tracking-tight text-brand-secondary leading-[1.05]">
                Growing <br />
                <span className="italic font-normal font-serif text-brand-secondary text-opacity-80">Packaging</span> <br />
                From Soil.
              </h1>
              
              <p className="font-sans text-brand-secondary text-sm md:text-base leading-relaxed max-w-xl text-opacity-90">
                We grow sturdy, 100% compostable boxes and trays that replace wasteful plastics. By combining natural mushroom roots, sugarcane stalks, and strong bamboo wood, we help businesses of all sizes replace Styrofoam with beautiful, earth-friendly materials that dissolve safely in the soil.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-12 flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => setCurrentPage('solutions')}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-brand-secondary text-brand-primary hover:bg-brand-dark rounded-none font-sans text-xs uppercase tracking-widest font-extrabold transition-all border border-brand-secondary"
              >
                <span>Interactive Styling Helper</span>
                <ArrowRight className="w-4 h-4 text-brand-accent group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={() => setCurrentPage('contact')}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-brand-secondary hover:bg-brand-secondary/5 rounded-none font-sans text-xs uppercase tracking-widest font-extrabold transition-all border border-brand-secondary"
              >
                Get a Sample Box ($10)
              </button>
            </motion.div>
          </div>

          {/* Hero Right Visual Column */}
          <div className="lg:col-span-5 relative bg-white flex flex-col justify-between overflow-hidden group">
            {/* Top Border Accent */}
            <div className="p-6 md:p-8 bg-brand-cream/50 border-b border-brand-secondary font-mono text-[10px] uppercase tracking-wider text-brand-secondary flex justify-between items-center z-10">
              <span>EST. 2026 // GREEN PACKAGING CO.</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse"></span> INDOOR GARDENS ACTIVE</span>
            </div>

            {/* Image Box */}
            <div className="flex-1 min-h-[350px] relative overflow-hidden flex items-center justify-center bg-[#FDFBF9]">
              <img
                src="/src/assets/images/biopack_hero_banner_1781632032383.jpg"
                alt="BioPack Sustainable CPG Packaging boxes"
                className="absolute inset-0 w-full h-full object-cover grayscale-[10%] hover:scale-[1.03] transition-transform duration-700 pointer-events-none"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Bottom Graphic Stats */}
            <div className="p-6 bg-brand-secondary text-brand-primary border-t border-brand-secondary flex justify-between items-center">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest block text-brand-accent opacity-90">EARTH FRIENDLY</span>
                <span className="font-serif text-lg italic text-brand-primary">100% Certified Plastic-Free</span>
              </div>
              <div className="h-8 w-[1px] bg-brand-accent/35"></div>
              <div className="text-right">
                <span className="font-mono text-[10px] uppercase tracking-widest block text-brand-accent opacity-90">EASY GARDEN RECYCLING</span>
                <span className="font-mono text-xs font-semibold text-brand-primary">Dissolves in soil quickly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REALTIME IMPACT TRACKER */}
      <section className="bg-white border-b border-brand-secondary py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-center">
            
            {/* Impact Text Column - Slide and fade in from left */}
            <motion.div
              initial={{ opacity: 0, x: -45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-5 space-y-4"
            >
              <span className="font-mono text-[11px] font-bold text-brand-accent uppercase tracking-widest bg-brand-secondary/10 px-2.5 py-1 rounded-sm">
                Our Live Savings Tracker
              </span>
              <h2 className="font-serif text-3.5xl md:text-5xl font-semibold tracking-tight text-brand-secondary">
                See how much plastic we save together!
              </h2>
              <p className="font-sans text-xs md:text-sm text-brand-secondary text-opacity-80 leading-relaxed max-w-sm">
                Every clean, sustainable box we ship stops harmful plastic from ever being created. Our live counter shows exactly how much carbon emissions and plastic waste we are keeping out of our landfills.
              </p>
              <button
                onClick={() => setCurrentPage('metrics')}
                className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-wider text-brand-secondary hover:text-brand-accent transition-colors underline cursor-pointer"
              >
                VIEW FULL LIVE COUNTER <ArrowRight className="w-3 h-3" />
              </button>
            </motion.div>

            {/* Crucial Live Counter Grid column - Slide and fade in from right with staggered kids */}
            <motion.div
              initial={{ opacity: 0, x: 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6"
            >
              
              {/* Box 1: Carbon Avoided */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="p-6 bg-brand-cream border border-brand-secondary flex flex-col justify-between shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <Leaf className="w-5 h-5 text-brand-accent" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-brand-secondary opacity-75">CO₂ Emissions Saved</span>
                </div>
                <div className="mt-6">
                  <span className="block font-mono text-3xl lg:text-4.5xl font-extrabold text-brand-secondary tracking-tight">
                    {formatNum(carbonStats.totalCarbonSavedKg)}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-brand-secondary opacity-60">
                    Kilograms Kept Out of Air
                  </span>
                </div>
              </motion.div>

              {/* Box 2: Plastic Avoided */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="p-6 bg-brand-secondary text-brand-primary border border-brand-secondary flex flex-col justify-between shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <Shield className="w-5 h-5 text-brand-accent" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-brand-accent">Plastic Prevented</span>
                </div>
                <div className="mt-6">
                  <span className="block font-mono text-3xl lg:text-4.5xl font-extrabold text-brand-primary tracking-tight">
                    {formatNum(carbonStats.totalPlasticDisplacedKg)}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-brand-accent opacity-80">
                    Kilograms of Styrofoam Avoided
                  </span>
                </div>
              </motion.div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. MATERIAL PORTALS Grid Tease with GSAP-like Stagger on Scroll */}
      <section className="bg-brand-cream bg-opacity-20 border-b border-brand-secondary py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12"
          >
            <div className="space-y-3">
              <span className="font-mono text-[10px] tracking-widest uppercase text-brand-secondary opacity-70">
                100% NATURAL MATERIALS
              </span>
              <h2 className="font-serif text-3.5xl md:text-5.5xl font-semibold tracking-tight text-brand-secondary">
                Our Three Main Plant Fibers
              </h2>
            </div>
            
            <p className="font-sans text-xs md:text-sm text-brand-secondary text-opacity-80 max-w-sm mt-4 md:mt-0 leading-relaxed">
              We focus on three wonderful farming and forest fibers that are incredibly durable. Grown or pressed into shapes, they stand up to standard plastic boxes while being fully compostable.
            </p>
          </motion.div>

          {/* GSAP-style staggered reveal container for cards */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {/* CARD 1: Mycelium */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <TiltCard 
                id="tilt-mycelium" 
                className="bg-white border border-brand-secondary h-full flex flex-col"
                maxTilt={8}
              >
                <div className="relative h-64 overflow-hidden bg-brand-cream">
                  <img 
                    src="/src/assets/images/biopack_mycelium_1781632048706.jpg" 
                    alt="Raw Molded Mycelium sample" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-brand-secondary text-brand-accent uppercase font-mono text-[9px] tracking-widest px-2 py-0.5 font-bold">
                    Nature-Grown
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-brand-secondary">Mushroom Roots</h3>
                    <p className="font-sans text-xs text-brand-secondary text-opacity-80 leading-relaxed">
                      Grown completely naturally in just 5 days using safe mushroom roots and leftover farming chaff. Spongy, insulating, bouncy, and highly resistant to fire.
                    </p>
                  </div>
                  <div className="pt-4 flex justify-between items-center border-t border-brand-secondary border-dashed text-[11px] font-mono font-medium mt-auto">
                    <span className="text-brand-secondary">DISSOLVES IN THE SOIL IN 30-45 DAYS</span>
                    <span className="text-brand-accent-hover font-bold">LEARN MORE →</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* CARD 2: Sugarcane Bagasse */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <TiltCard 
                id="tilt-bagasse" 
                className="bg-white border border-brand-secondary h-full flex flex-col"
                maxTilt={8}
              >
                <div className="relative h-64 overflow-hidden bg-brand-cream">
                  <img 
                    src="/src/assets/images/biopack_bagasse_1781632063300.jpg" 
                    alt="Molded Sugarcane food box" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-brand-secondary text-brand-accent uppercase font-mono text-[9px] tracking-widest px-2 py-0.5 font-bold">
                    Heat-Pressed Stalks
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-brand-secondary">Sugarcane Fiber</h3>
                    <p className="font-sans text-xs text-brand-secondary text-opacity-80 leading-relaxed">
                      Made by heat-pressing natural sugarcane stems. Yields sleek, waterproof, and grease-proof food boxes, cosmetic trays, and sturdy shipping packaging.
                    </p>
                  </div>
                  <div className="pt-4 flex justify-between items-center border-t border-brand-secondary border-dashed text-[11px] font-mono font-medium mt-auto">
                    <span className="text-brand-secondary">SAFE FOR HOT FOODS & MICROWAVES</span>
                    <span className="text-brand-accent-hover font-bold">LEARN MORE →</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* CARD 3: Pressed Bamboo */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <TiltCard 
                id="tilt-bamboo" 
                className="bg-white border border-brand-secondary h-full flex flex-col"
                maxTilt={8}
              >
                <div className="relative h-64 overflow-hidden bg-brand-cream">
                  <img 
                    src="/src/assets/images/biopack_bamboo_1781632078145.jpg" 
                    alt="Durable Bamboo container cosmetics" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-brand-secondary text-brand-accent uppercase font-mono text-[9px] tracking-widest px-2 py-0.5 font-bold">
                    Bamboo Timber
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-brand-secondary">Pressed Bamboo</h3>
                    <p className="font-sans text-xs text-brand-secondary text-opacity-80 leading-relaxed">
                      Incredibly tough, long-lasting wood fibers from fast-growing bamboo. Spill-proof, naturally fresh, and gorgeous. Excellent for reusable luxury gift sets.
                    </p>
                  </div>
                  <div className="pt-4 flex justify-between items-center border-t border-brand-secondary border-dashed text-[11px] font-mono font-medium mt-auto">
                    <span className="text-brand-secondary">BUILT FOR ACTIVE REPEAT USE</span>
                    <span className="text-brand-accent-hover font-bold">LEARN MORE →</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setCurrentPage('materials')}
              className="inline-flex items-center gap-2 px-6 py-3 border border-brand-secondary bg-white text-brand-secondary hover:bg-brand-secondary hover:text-white transition-all font-sans text-xs uppercase tracking-widest font-semibold cursor-pointer"
            >
              Learn More About Our Materials <ArrowRight className="w-4 h-4 text-brand-accent" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 4. INDUSTRIAL CREDENTIALS - Staggered fade in on scroll */}
      <section className="bg-brand-secondary text-brand-primary py-16 border-b border-brand-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-brand-accent/25 gap-8 lg:gap-0"
          >
            
            {/* Box 1 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="lg:px-8 space-y-4 py-4 lg:py-0"
            >
              <Building className="w-8 h-8 text-brand-accent" />
              <h3 className="font-serif text-2xl font-semibold">Reliable Delivery</h3>
              <p className="font-sans text-xs text-brand-primary text-opacity-85 leading-relaxed">
                Our farm-friendly crafting spots operate day and night to handle custom retail or shipping orders of any size quickly.
              </p>
            </motion.div>

            {/* Box 2 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="lg:px-8 space-y-4 py-4 lg:py-0"
            >
              <Globe className="w-8 h-8 text-brand-accent" />
              <h3 className="font-serif text-2xl font-semibold">Worldwide Approvals</h3>
              <p className="font-sans text-xs text-brand-primary text-opacity-85 leading-relaxed">
                All of our organic materials are certified 100% compostable and approved worldwide. Stay ahead of plastic bans and garbage fees with ease.
              </p>
            </motion.div>

            {/* Box 3 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              className="lg:px-8 space-y-4 py-4 lg:py-0"
            >
              <Flame className="w-8 h-8 text-brand-accent" />
              <h3 className="font-serif text-2xl font-semibold">Fully Safe If Burned</h3>
              <p className="font-sans text-xs text-brand-primary text-opacity-85 leading-relaxed">
                Because our products are made entirely from natural plants and roots, they burn cleanly and release zero toxic or harsh plastic fumes.
              </p>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 5. ONBOARDING CONFIGURATOR TEASER - Zoom in elastic reveal */}
      <section className="bg-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-brand-cream border border-brand-secondary p-8 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block bg-brand-accent text-brand-secondary font-mono text-[9px] font-bold tracking-widest px-2.5 py-1 uppercase">
                Free Shopping Guide
              </div>
              <h2 className="font-serif text-3.5xl md:text-5xl font-semibold tracking-tight text-brand-secondary leading-tight">
                Not sure which material is right for your boxes?
              </h2>
              <p className="font-sans text-xs md:text-sm text-brand-secondary text-opacity-80 leading-relaxed max-w-xl">
                Our simple, step-by-step helper asks a few basic questions about your products—like whether they are light or heavy and if they need moisture protection—to recommend the perfect plant-based container design instantly.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col items-stretch justify-center h-full">
              <motion.div 
                whileHover={{ y: -4, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.1)" }}
                className="bg-white border border-brand-secondary p-6 shadow-sm space-y-4"
              >
                <span className="font-mono text-[10px] text-brand-secondary opacity-60 uppercase block">Easy Material Matcher</span>
                <p className="font-sans text-xs text-brand-secondary leading-normal">
                  Select your product type, typical handling conditions, and ideal sizes in seconds to get a custom composting design right on your screen.
                </p>
                <button
                  onClick={() => setCurrentPage('solutions')}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-brand-secondary text-brand-accent hover:bg-brand-dark transition-all text-xs font-mono font-bold tracking-wider cursor-pointer"
                >
                  FIND MY PERFECT MATCH <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  );
}
