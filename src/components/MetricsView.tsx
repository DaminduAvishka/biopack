/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TreePine, Fish, Landmark, CloudLightning, RefreshCw, BarChart, Calculator, CheckCircle2 } from 'lucide-react';

interface MetricsViewProps {
  carbonStats: {
    totalPlasticDisplacedKg: number;
    totalCarbonSavedKg: number;
    clientCount: number;
    oceanBoundPreventedKg: number;
  };
}

export default function MetricsView({ carbonStats }: MetricsViewProps) {
  // Calculator State for Corporate Footprint Estimator
  const [currentPlasticTons, setCurrentPlasticTons] = useState<number>(100);
  const [selectedAlt, setSelectedAlt] = useState<'mycelium' | 'bagasse' | 'bamboo'>('mycelium');

  // Math conversions
  const getSimulatedSavedCO2 = () => {
    const rate = selectedAlt === 'mycelium' ? 9.2 : selectedAlt === 'bagasse' ? 4.8 : 7.5;
    // Tons to KG is tons * 1000
    const kgPlasticSaved = currentPlasticTons * 1000;
    return kgPlasticSaved * rate;
  };

  const simulatedCO2 = getSimulatedSavedCO2();
  const forestEquivalentAcres = (simulatedCO2 / 1000) * 1.2; // approx 1.2 acres of forest carbon absorption per ton of CO2 avoided

  // Format helper
  const formatNum = (num: number) => Math.floor(num).toLocaleString('en-US');

  return (
    <div className="w-full">
      {/* 1. HERO REPORT INTRODUCTION */}
      <section className="bg-brand-secondary text-brand-primary py-12 md:py-16 border-b border-brand-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl space-y-4"
          >
            <span className="font-mono text-[10px] tracking-widest text-brand-accent uppercase font-bold bg-white/10 px-2.5 py-1 rounded-sm inline-block">
              OUR WORLDWIDE GREEN PROGRESS
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-semibold tracking-tight">
              Our Live Planet Impact Report
            </h1>
            <p className="font-sans text-xs md:text-sm text-brand-primary text-opacity-80 leading-relaxed">
              We keep a close eye on our factory outputs to measure exactly how much plastic we save. Below is our real-time counter showing the total amount of plastic and carbon avoided by our customers worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. REALTIME ANALYTICAL METRICS GRID */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="border border-brand-secondary bg-white p-6 md:p-8"
        >
          
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-brand-secondary/25 pb-6 mb-8 gap-4">
            <div>
              <span className="font-mono text-xs text-brand-accent font-bold uppercase tracking-widest block flex items-center gap-1.5 animate-pulse">
                <span className="h-2 w-2 rounded-full bg-brand-accent"></span> LIVE UPDATING COUNTER
              </span>
              <h2 className="font-serif text-2xl md:text-3.5xl font-extrabold text-brand-secondary mt-1">
                Total Plastic Avoided Worldwide
              </h2>
            </div>

            <div className="font-mono text-[10px] text-brand-secondary/60 flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Auto-syncing with the factory floors
            </div>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Metric 1 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileHover={{ y: -4, shadow: "0 10px 25px -10px rgba(0,0,0,0.05)" }}
              className="p-5 bg-brand-cream border border-brand-secondary space-y-4 flex flex-col justify-between"
            >
              <div>
                <CloudLightning className="w-6 h-6 text-brand-accent" />
                <span className="font-mono text-[10px] text-brand-secondary/60 uppercase block mt-3">
                  TOTAL CO₂ SAVED
                </span>
              </div>
              <div>
                <span className="font-mono text-xl md:text-2.5xl lg:text-3.5xl font-black text-brand-secondary block leading-none">
                  {formatNum(carbonStats.totalCarbonSavedKg)} kg
                </span>
                <span className="font-sans text-[10px] text-brand-secondary opacity-75 uppercase block mt-1.5 font-bold">
                  Greenhouse gases avoided
                </span>
              </div>
            </motion.div>

            {/* Metric 2 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileHover={{ y: -4, shadow: "0 10px 25px -10px rgba(0,0,0,0.05)" }}
              className="p-5 bg-brand-cream border border-brand-secondary space-y-4 flex flex-col justify-between"
            >
              <div>
                <TreePine className="w-6 h-6 text-brand-accent" />
                <span className="font-mono text-[10px] text-brand-secondary/60 uppercase block mt-3">
                  PLASTIC SAVED
                </span>
              </div>
              <div>
                <span className="font-mono text-xl md:text-2.5xl lg:text-3.5xl font-black text-brand-secondary block leading-none">
                  {formatNum(carbonStats.totalPlasticDisplacedKg)} kg
                </span>
                <span className="font-sans text-[10px] text-brand-secondary opacity-75 uppercase block mt-1.5 font-bold">
                  Styrofoam & soft plastics avoided
                </span>
              </div>
            </motion.div>

            {/* Metric 3 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileHover={{ y: -4, shadow: "0 10px 25px -10px rgba(0,0,0,0.05)" }}
              className="p-5 bg-brand-cream border border-brand-secondary space-y-4 flex flex-col justify-between"
            >
              <div>
                <Fish className="w-6 h-6 text-brand-accent" />
                <span className="font-mono text-[10px] text-brand-secondary/60 uppercase block mt-3">
                  OCEAN CLEANLINESS EQUIVALENT
                </span>
              </div>
              <div>
                <span className="font-mono text-xl md:text-2.5xl lg:text-3.5xl font-black text-brand-secondary block leading-none">
                  {formatNum(carbonStats.oceanBoundPreventedKg)} kg
                </span>
                <span className="font-sans text-[10px] text-brand-secondary opacity-75 uppercase block mt-1.5 font-bold">
                  Estimated trash kept from oceans
                </span>
              </div>
            </motion.div>

            {/* Metric 4 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileHover={{ y: -4, shadow: "0 10px 25px -10px rgba(0,0,0,0.05)" }}
              className="p-5 bg-brand-cream border border-brand-secondary space-y-4 flex flex-col justify-between"
            >
              <div>
                <Landmark className="w-6 h-6 text-brand-accent" />
                <span className="font-mono text-[10px] text-brand-secondary/60 uppercase block mt-3">
                  ACTIVE BRAND CUSTOMERS
                </span>
              </div>
              <div>
                <span className="font-mono text-xl md:text-2.5xl lg:text-3.5xl font-black text-brand-secondary block leading-none">
                  {carbonStats.clientCount} Companies
                </span>
                <span className="font-sans text-[10px] text-brand-secondary opacity-75 uppercase block mt-1.5 font-bold">
                  Partner brands working with us
                </span>
              </div>
            </motion.div>
          </motion.div>

        </motion.div>
      </section>

      {/* 3. ESG SAVINGS PROJECTION CHART & PLASTIC SAVINGS SIMULATOR */}
      <section className="bg-brand-cream bg-opacity-20 border-t border-b border-brand-secondary py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT COLUMN: Premium projection SVG Chart (Col-7) - Slide in left */}
          <motion.div 
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white border border-brand-secondary p-6 md:p-8 flex flex-col justify-between"
          >
            <div className="space-y-2 pb-4 border-b border-brand-secondary/15">
              <span className="font-mono text-[10px] uppercase tracking-widest text-brand-accent-hover font-bold">
                Manufacturing Metrics
              </span>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-secondary">
                Cumulative Plastic Saved (Tons)
              </h3>
            </div>

            {/* Custom High Fidelity SVG Bar-Line Chart */}
            <div className="my-6 relative h-[250px] w-full flex items-end">
              {/* SVG Grid background */}
              <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-between pointer-events-none opacity-30 select-none">
                <div className="border-b border-dashed border-brand-secondary w-full h-[1px]"></div>
                <div className="border-b border-dashed border-brand-secondary w-full h-[1px]"></div>
                <div className="border-b border-dashed border-brand-secondary w-full h-[1px]"></div>
                <div className="border-b border-dashed border-brand-secondary w-full h-[1px]"></div>
                <div className="border-b border-dashed border-brand-secondary w-full h-[1px]"></div>
              </div>

              {/* Chart Columns & Bars */}
              <div className="relative w-full h-[220px] flex justify-between items-end px-4 z-10">
                {/* Year 2022 */}
                <div className="flex flex-col items-center flex-1 space-y-2">
                  <span className="font-mono text-[9px] text-brand-secondary/70">18K tons</span>
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: "40px" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0 }}
                    className="w-8 md:w-12 bg-brand-secondary/25 border border-brand-secondary transition-all hover:bg-brand-secondary/45"
                  />
                  <span className="font-mono text-[10px] font-bold text-brand-secondary">2022</span>
                </div>

                {/* Year 2023 */}
                <div className="flex flex-col items-center flex-1 space-y-2">
                  <span className="font-mono text-[9px] text-brand-secondary/70">42K tons</span>
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: "85px" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                    className="w-8 md:w-12 bg-brand-secondary/45 border border-brand-secondary transition-all hover:bg-brand-secondary/60"
                  />
                  <span className="font-mono text-[10px] font-bold text-brand-secondary">2023</span>
                </div>

                {/* Year 2024 */}
                <div className="flex flex-col items-center flex-1 space-y-2">
                  <span className="font-mono text-[9px] text-brand-secondary/70">110K tons</span>
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: "130px" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    className="w-8 md:w-12 bg-brand-secondary/75 border border-brand-secondary transition-all hover:bg-brand-secondary/85"
                  />
                  <span className="font-mono text-[10px] font-bold text-brand-secondary">2024</span>
                </div>

                {/* Year 2025 */}
                <div className="flex flex-col items-center flex-1 space-y-2">
                  <span className="font-mono text-[9px] text-brand-secondary/70">450K tons</span>
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: "165px" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                    className="w-8 md:w-12 bg-brand-secondary border border-brand-secondary transition-all hover:bg-brand-dark"
                  />
                  <span className="font-mono text-[10px] font-bold text-brand-secondary">2025</span>
                </div>

                {/* Year 2026 (Live Project) */}
                <div className="flex flex-col items-center flex-1 space-y-2">
                  <span className="font-mono text-[9px] text-brand-accent-hover font-bold">1,240K tons</span>
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: "200px" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                    className="w-8 md:w-12 bg-brand-accent border border-brand-secondary transition-all hover:bg-brand-accent-hover relative"
                  >
                    <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 bg-white rounded-full ring-2 ring-brand-secondary animate-ping"></span>
                  </motion.div>
                  <span className="font-mono text-[10px] font-black text-brand-secondary">2026 ★</span>
                </div>
              </div>
            </div>

            <p className="font-mono text-[10px] text-brand-secondary/60 text-center uppercase leading-normal">
              ✦ TOTAL PLASTIC PACKAGING SAVED SINCE OUR FIRST FACTORY ROOT OPENED ✦
            </p>
          </motion.div>

          {/* RIGHT COLUMN: Interactive Corporate Footprint Estimator (Col-5) - Slide in right */}
          <motion.div 
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-12 xl:col-span-5 bg-white border border-brand-secondary p-6 md:p-8 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-brand-secondary/15">
                <Calculator className="w-5 h-5 text-brand-accent" />
                <h3 className="font-serif text-lg font-bold text-brand-secondary">
                  Savings Calculator for Your Brand
                </h3>
              </div>

              <p className="font-sans text-xs text-brand-secondary opacity-80 leading-relaxed">
                How much plastic packaging does your business use every year? Enter your average yearly use below to see how much carbon and money you will save by switching to plants.
              </p>

              {/* Calculator input */}
              <div className="space-y-2">
                <label className="block font-mono text-[10px] uppercase font-bold text-brand-secondary/70">
                  Annual Plastic or Foam Usage (Metric Tons)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    max={10000}
                    value={currentPlasticTons}
                    onChange={(e) => setCurrentPlasticTons(Math.max(1, Number(e.target.value)))}
                    className="w-full p-3 font-mono text-sm bg-brand-cream border border-brand-secondary focus:outline-none focus:ring-1 focus:ring-brand-accent uppercase"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[9px] font-bold uppercase text-brand-secondary px-2 py-0.5 bg-white border border-brand-secondary">
                    TONS / YEAR
                  </span>
                </div>
              </div>

              {/* Alternative fibers button layout */}
              <div className="space-y-1.5">
                <span className="block font-mono text-[10px] uppercase font-bold text-brand-secondary/70">
                  Selected Plant Material
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'mycelium', label: 'Mushroom Roots' },
                    { id: 'bagasse', label: 'Sugarcane Fiber' },
                    { id: 'bamboo', label: 'Pressed Bamboo' },
                  ].map((alt) => (
                    <button
                      key={alt.id}
                      onClick={() => setSelectedAlt(alt.id as any)}
                      className={`py-1.5 px-1 text-[10px] font-mono font-bold uppercase border transition-all cursor-pointer ${
                        selectedAlt === alt.id
                          ? 'bg-brand-secondary text-brand-accent border-brand-secondary'
                          : 'bg-white text-brand-secondary border-brand-secondary/25 hover:border-brand-secondary'
                      }`}
                    >
                      {alt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results metrics */}
              <div className="p-4 bg-brand-cream border border-brand-secondary space-y-3 mt-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-brand-secondary opacity-70">Estimated CO₂ Saved Every Year:</span>
                  <span className="font-mono font-extrabold text-brand-secondary">
                    {formatNum(simulatedCO2)} KG
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs border-t border-brand-secondary/15 pt-2">
                  <span className="text-brand-secondary opacity-70">Estimated Money Saved:</span>
                  <span className="font-mono font-extrabold text-brand-accent-hover">
                    ${formatNum((currentPlasticTons * 125))} USD
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs border-t border-brand-secondary/15 pt-2">
                  <span className="text-brand-secondary opacity-70">Forest equivalent:</span>
                  <span className="font-sans font-bold text-brand-secondary text-[11px] leading-tight text-right flex items-center gap-1">
                    <TreePine className="w-3.5 h-3.5 text-brand-accent inline-block flex-shrink-0" />
                    {forestEquivalentAcres.toFixed(1)} Acres of trees / yr
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-brand-secondary/15 text-[9px] font-mono text-brand-secondary/65 leading-normal">
              These numbers are calculated based on general carbon counts comparing our organic materials against fossil-fuel plastics and Styrofoam.
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. ACTIVE CLIENT STORIES */}
      <section className="max-w-7xl mx-auto px-6 py-16 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center space-y-2"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-brand-secondary font-bold">REAL CUSTOMER STORIES</span>
          <h2 className="font-serif text-3.5xl font-semibold text-brand-secondary">Friendly Brands We Assist</h2>
        </motion.div>

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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {/* Card 1 */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
            whileHover={{ y: -6, boxShadow: "0 10px 25px -10px rgba(0,0,0,0.08)" }}
            className="border border-brand-secondary p-6 bg-white space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-[10px] text-brand-secondary/50 block">ELECTRONICS BRAND</span>
                <span className="font-serif text-lg font-bold text-brand-secondary">Lumen Audio Labs</span>
              </div>
              <span className="text-xs bg-brand-accent text-brand-secondary font-mono tracking-wider font-extrabold px-2 py-0.5 uppercase">
                Mushroom Choice
              </span>
            </div>
            <p className="font-sans text-xs text-brand-secondary/80 leading-relaxed">
              Replaced 42,000 pieces of Styrofoam boxes for international soundbars. Cut their parcel carbon footprint by more than 90% using bouncy, soft Mushroom cushion trays.
            </p>
            <div className="flex items-center gap-1 text-xs text-brand-accent-hover font-bold font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" /> 84.2 TONS OF CARBON SAVED
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
            whileHover={{ y: -6, boxShadow: "0 10px 25px -10px rgba(0,0,0,0.08)" }}
            className="border border-brand-secondary p-6 bg-white space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-[10px] text-brand-secondary/50 block">ORGANIC FOOD BRAND</span>
                <span className="font-serif text-lg font-bold text-brand-secondary">Savour Organic Kitchen</span>
              </div>
              <span className="text-xs bg-brand-accent text-brand-secondary font-mono tracking-wider font-extrabold px-2 py-0.5 uppercase">
                Sugarcane Choice
              </span>
            </div>
            <p className="font-sans text-xs text-brand-secondary/80 leading-relaxed">
              Moved all of their takeout boxes and salad bowls to clean, warm sugarcane fibers. Safe for both the microwave and the freezer.
            </p>
            <div className="flex items-center gap-1 text-xs text-brand-accent-hover font-bold font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" /> 112.5 TONS OF CARBON SAVED
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
            whileHover={{ y: -6, boxShadow: "0 10px 25px -10px rgba(0,0,0,0.08)" }}
            className="border border-brand-secondary p-6 bg-white space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-[10px] text-brand-secondary/50 block">BEAUTY & SKINCARE BRAND</span>
                <span className="font-serif text-lg font-bold text-brand-secondary">Hebe Botanika Skincare</span>
              </div>
              <span className="text-xs bg-brand-accent text-brand-secondary font-mono tracking-wider font-extrabold px-2 py-0.5 uppercase">
                Bamboo Choice
              </span>
            </div>
            <p className="font-sans text-xs text-brand-secondary/80 leading-relaxed">
              Created double-layered wooden bamboo jars for their face creams. Naturally super clean, completely leakproof, and satisfyingly sturdy.
            </p>
            <div className="flex items-center gap-1 text-xs text-brand-accent-hover font-bold font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" /> 62.1 TONS OF CARBON SAVED
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
