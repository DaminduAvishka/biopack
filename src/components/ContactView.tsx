/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CatalogItem } from '../types';
import { Check, Mail, MapPin, Building, CreditCard, ChevronRight, ChevronLeft, ArrowRight, ShieldCheck, HelpCircle, PackageOpen } from 'lucide-react';

interface ContactViewProps {
  cartItems: CatalogItem[];
  onClearCart: () => void;
  initialMaterialPreselect?: string; // Preselected material from configurations
}

export default function ContactView({
  cartItems,
  onClearCart,
  initialMaterialPreselect = '',
}: ContactViewProps) {
  // Form Steps
  const [step, setStep] = useState<number>(1);
  const [direction, setDirection] = useState<'right' | 'left'>('right');

  // Form Fields State
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  
  // Choose Materials raw blocks
  const [selectedMycelium, setSelectedMycelium] = useState(
    initialMaterialPreselect === 'mycelium' || true
  );
  const [selectedBagasse, setSelectedBagasse] = useState(
    initialMaterialPreselect === 'bagasse' || true
  );
  const [selectedBamboo, setSelectedBamboo] = useState(
    initialMaterialPreselect === 'bamboo' || true
  );

  // Payment Details
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // Submit states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Motion Variants for Horizontal swipe
  const variants = {
    enter: (dir: 'right' | 'left') => ({
      x: dir === 'right' ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: 'right' | 'left') => ({
      x: dir === 'right' ? -300 : 300,
      opacity: 0,
    }),
  };

  const nextStep = () => {
    if (step < 3) {
      setDirection('right');
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setDirection('left');
      setStep(step - 1);
    }
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API authorization
    setTimeout(() => {
      setIsSubmitting(false);
      setCheckoutComplete(true);
      onClearCart();
    }, 2000);
  };

  // Check step validation
  const isStep1Valid = companyName && contactName && email && phone;
  const isStep2Valid = address && city && zip && (selectedMycelium || selectedBagasse || selectedBamboo);
  const isStep3Valid = cardName && cardNumber.length >= 14 && expiry && cvv.length >= 3;

  return (
    <div className="w-full">
      {/* SECTION BANNER */}
      <section className="bg-brand-secondary text-brand-primary py-10 md:py-14 border-b border-brand-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl space-y-3"
          >
            <span className="font-mono text-[10px] tracking-widest text-brand-accent uppercase font-bold bg-white/10 px-2.5 py-1 rounded-sm inline-block">
              GET ORGANIC SAMPLES DELIVERED
            </span>
            <h1 className="font-serif text-4xl md:text-5.5xl font-semibold tracking-tight">
              Order Your $10 Sample Box
            </h1>
            <p className="font-sans text-xs md:text-sm text-brand-primary text-opacity-80 leading-relaxed">
              Order real, touchable samples to see and feel the natural quality of our plant fibers. Shipped straight to your team for a flat $10 delivery fee.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WORKSPACE: Form & Carton summary */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT AREA: Form Checkout (Col-8) */}
          <div className="lg:col-span-8 bg-white border border-brand-secondary p-6 md:p-10 min-h-[500px] flex flex-col justify-between">
            
            {/* SUCCESS CONTAINER */}
            {checkoutComplete ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="inline-flex items-center justify-center h-16 w-16 bg-brand-accent text-brand-secondary rounded-full border border-brand-secondary">
                  <Check className="w-8 h-8" />
                </div>
                <div className="space-y-3 max-w-md mx-auto">
                  <span className="font-mono text-[10px] text-brand-accent-hover font-bold uppercase tracking-widest block">
                    Your Sample Kit is on the Way!
                  </span>
                  <h2 className="font-serif text-3.5xl font-black text-brand-secondary">
                    Payment Complete
                  </h2>
                  <p className="font-sans text-xs text-brand-secondary/80 leading-relaxed">
                    We have charged <strong className="text-brand-secondary">$10.00 USD</strong> to your card. A confirmation email, package tracking link, and helpful packaging design guides have been sent to <strong className="text-brand-secondary">{email}</strong>.
                  </p>
                </div>

                <div className="p-4 bg-brand-cream border border-brand-secondary/40 text-left max-w-sm mx-auto text-xs font-mono space-y-1 text-brand-secondary">
                  <span className="font-bold uppercase tracking-wide block mb-1">Receipt ID: #BPK-{Math.floor(100000 + Math.random() * 900000)}</span>
                  <div>CLIENT: {companyName.toUpperCase()}</div>
                  <div>SHIP TO: {city.toUpperCase()}, USA</div>
                  <div>MATURED PLANT FIBERS: READY</div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setCheckoutComplete(false);
                    setCompanyName('');
                    setContactName('');
                    setEmail('');
                    setPhone('');
                    setAddress('');
                    setCity('');
                    setZip('');
                    setCardName('');
                    setCardNumber('');
                    setExpiry('');
                    setCvv('');
                  }}
                  className="px-6 py-3 border border-brand-secondary bg-white text-brand-secondary hover:bg-brand-cream/35 text-xs font-mono font-bold tracking-widest uppercase transition-colors"
                >
                  Request Another Kit
                </button>
              </motion.div>
            ) : (
              <div>
                {/* Steps Header indicator */}
                <div className="flex items-center justify-between border-b border-brand-secondary/15 pb-4 mb-8">
                  <span className="font-mono text-[11px] font-bold text-brand-secondary uppercase">
                    Step {step} of 3 — {step === 1 ? 'About Your Business' : step === 2 ? 'Pick Your Free Samples' : 'Shipping & Card Info'}
                  </span>
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map((s) => (
                      <span
                        key={s}
                        className={`h-2 w-2 rounded-full ${
                          s <= step ? 'bg-brand-accent' : 'bg-brand-secondary/15'
                        } border border-brand-secondary/35`}
                      ></span>
                    ))}
                  </div>
                </div>

                {/* ANIMATED FORM SPACE */}
                <form onSubmit={handleCreateOrder} className="relative overflow-hidden min-h-[300px]">
                  <AnimatePresence mode="popLayout" custom={direction}>
                    {step === 1 && (
                      <motion.div
                        key="step-1"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-4"
                      >
                        <h3 className="font-serif text-2xl font-bold text-brand-secondary mb-2">About Your Business</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="block font-mono text-[10px] uppercase font-bold text-brand-secondary/70">
                              Company Name
                            </label>
                            <div className="relative">
                              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-secondary/40" />
                              <input
                                type="text"
                                placeholder="e.g. Acme Organic Foods"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="w-full p-3 pl-9 text-xs bg-brand-cream border border-brand-secondary focus:outline-none focus:ring-1 focus:ring-brand-accent rounded-none"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="block font-mono text-[10px] uppercase font-bold text-brand-secondary/70">
                              Your Name
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Jordan Mercer"
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              className="w-full p-3 text-xs bg-brand-cream border border-brand-secondary focus:outline-none focus:ring-1 focus:ring-brand-accent rounded-none"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="block font-mono text-[10px] uppercase font-bold text-brand-secondary/70">
                              Business Email
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-secondary/40" />
                              <input
                                type="email"
                                placeholder="jordan@acmeorganic.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 pl-9 text-xs bg-brand-cream border border-brand-secondary focus:outline-none focus:ring-1 focus:ring-brand-accent rounded-none"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="block font-mono text-[10px] uppercase font-bold text-brand-secondary/70">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              placeholder="+1 (555) 482-1925"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full p-3 text-xs bg-brand-cream border border-brand-secondary focus:outline-none focus:ring-1 focus:ring-brand-accent rounded-none"
                              required
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step-2"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-5"
                      >
                        <h3 className="font-serif text-2xl font-bold text-brand-secondary mb-2">Free Raw Materials & Shipping</h3>

                        {/* Raw blocks checkboxes layout */}
                        <div className="space-y-2">
                          <label className="block font-mono text-[10px] uppercase font-bold text-brand-secondary/70">
                            Add any of these free sample plant blocks into your box:
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <button
                              type="button"
                              onClick={() => setSelectedMycelium(!selectedMycelium)}
                              className={`p-3.5 border text-left flex items-center justify-between transition-all ${
                                selectedMycelium
                                  ? 'border-brand-secondary bg-brand-secondary text-brand-primary'
                                  : 'border-brand-secondary/25 bg-white text-brand-secondary'
                              }`}
                            >
                              <span className="font-sans text-xs uppercase font-extrabold tracking-wider">Mushroom Roots</span>
                              <span className="font-mono text-xs">[{selectedMycelium ? '✓' : 'ADD'}]</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setSelectedBagasse(!selectedBagasse)}
                              className={`p-3.5 border text-left flex items-center justify-between transition-all ${
                                selectedBagasse
                                  ? 'border-brand-secondary bg-brand-secondary text-brand-primary'
                                  : 'border-brand-secondary/25 bg-white text-brand-secondary'
                              }`}
                            >
                              <span className="font-sans text-xs uppercase font-extrabold tracking-wider">Sugarcane Fiber</span>
                              <span className="font-mono text-xs">[{selectedBagasse ? '✓' : 'ADD'}]</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setSelectedBamboo(!selectedBamboo)}
                              className={`p-3.5 border text-left flex items-center justify-between transition-all ${
                                selectedBamboo
                                  ? 'border-brand-secondary bg-brand-secondary text-brand-primary'
                                  : 'border-brand-secondary/25 bg-white text-brand-secondary'
                              }`}
                            >
                              <span className="font-sans text-xs uppercase font-extrabold tracking-wider">Pressed Bamboo</span>
                              <span className="font-mono text-xs">[{selectedBamboo ? '✓' : 'ADD'}]</span>
                            </button>
                          </div>
                        </div>

                        {/* Shipping fields */}
                        <div className="space-y-3.5">
                          <div className="space-y-1.5">
                            <label className="block font-mono text-[10px] uppercase font-bold text-brand-secondary/70">
                              Shipping Address
                            </label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-secondary/40" />
                              <input
                                type="text"
                                placeholder="104 Industrial Parkway, Suite H"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full p-3 pl-9 text-xs bg-brand-cream border border-brand-secondary focus:outline-none focus:ring-1 focus:ring-brand-accent rounded-none"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="block font-mono text-[10px] uppercase font-bold text-brand-secondary/70">
                                City & State
                              </label>
                              <input
                                type="text"
                                placeholder="Chicago, IL"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full p-3 text-xs bg-brand-cream border border-brand-secondary focus:outline-none focus:ring-1 focus:ring-brand-accent rounded-none"
                                required
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="block font-mono text-[10px] uppercase font-bold text-brand-secondary/70">
                                Zip / Postal Code
                              </label>
                              <input
                                type="text"
                                placeholder="60601"
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                className="w-full p-3 text-xs bg-brand-cream border border-brand-secondary focus:outline-none focus:ring-1 focus:ring-brand-accent rounded-none"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step-3"
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-4"
                      >
                        <h3 className="font-serif text-2xl font-bold text-brand-secondary mb-2">Payment Info</h3>

                        <div className="p-4 bg-brand-cream border border-brand-secondary space-y-2 text-xs font-mono flex items-center justify-between text-brand-secondary mb-4 leading-normal">
                          <div>
                            <span className="font-bold uppercase block text-[10px]">SHIPPING FEES</span>
                            <span>Standard Ground Delivery: Flat Rate</span>
                          </div>
                          <span className="font-serif text-xl font-black text-brand-secondary">
                            $10.00 USD
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block font-mono text-[10px] uppercase font-bold text-brand-secondary/70">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            placeholder="JORDAN R MERCER"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="w-full p-3 text-xs bg-brand-cream border border-brand-secondary focus:outline-none focus:ring-1 focus:ring-brand-accent uppercase rounded-none"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="block font-mono text-[10px] uppercase font-bold text-brand-secondary/70">
                              Card Number
                            </label>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-secondary/40" />
                              <input
                                type="text"
                                maxLength={19}
                                placeholder="4111 2222 3333 4444"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className="w-full p-3 pl-9 text-xs bg-brand-cream border border-brand-secondary focus:outline-none focus:ring-1 focus:ring-brand-accent rounded-none font-mono"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                              <label className="block font-mono text-[10px] uppercase font-bold text-brand-secondary/70">
                                Expiration Date
                              </label>
                              <input
                                type="text"
                                maxLength={5}
                                placeholder="MM/YY"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                className="w-full p-3 text-xs bg-brand-cream border border-brand-secondary focus:outline-none focus:ring-1 focus:ring-brand-accent rounded-none font-mono text-center"
                                required
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="block font-mono text-[10px] uppercase font-bold text-brand-secondary/70">
                                CVV Code
                              </label>
                              <input
                                type="password"
                                maxLength={4}
                                placeholder="•••"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                className="w-full p-3 text-xs bg-brand-cream border border-brand-secondary focus:outline-none focus:ring-1 focus:ring-brand-accent rounded-none font-mono text-center"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex gap-2 items-center text-[10px] font-mono text-brand-secondary/60">
                          <ShieldCheck className="w-4 h-4 text-brand-accent" /> Safe and secure checkout with full encryption
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>

                {/* FORM CONTROLS FOOTER */}
                <div className="mt-8 pt-6 border-t border-brand-secondary/15 flex justify-between items-center bg-white z-20 relative">
                  <div>
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex items-center gap-1.5 px-5 py-3 border border-brand-secondary text-brand-secondary bg-white hover:bg-brand-cream/50 uppercase font-mono text-xs font-bold font-medium"
                      >
                        <ChevronLeft className="w-4 h-4" /> BACK
                      </button>
                    )}
                  </div>

                  <div>
                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
                        className={`flex items-center gap-1.5 px-6 py-3 uppercase font-mono text-xs font-bold font-black ${
                          (step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid)
                            ? 'bg-brand-cream text-brand-secondary/30 border border-brand-secondary/20 cursor-not-allowed'
                            : 'bg-brand-secondary text-brand-accent hover:bg-brand-dark cursor-pointer'
                        }`}
                      >
                        NEXT STEP <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleCreateOrder}
                        disabled={!isStep3Valid || isSubmitting}
                        className={`px-8 py-3.5 uppercase font-mono text-xs font-bold tracking-wider text-brand-secondary font-black ${
                          !isStep3Valid || isSubmitting
                            ? 'bg-brand-cream text-brand-secondary/35 border border-brand-secondary/20 cursor-not-allowed'
                            : 'bg-brand-accent hover:bg-brand-accent-hover cursor-pointer'
                        }`}
                      >
                        {isSubmitting ? 'SENDING ORDER...' : 'ORDER YOUR $10 SAMPLE BOX'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT AREA: Active Order Drawer / Carton specs (Col-4) - Slide on Scroll */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 bg-brand-cream/40 border border-brand-secondary p-6 md:p-8 space-y-6 overflow-hidden"
          >
            <h4 className="font-mono text-xs tracking-widest uppercase font-extrabold text-brand-secondary flex items-center gap-1.5 border-b border-brand-secondary/20 pb-3">
              <PackageOpen className="w-4 h-4 text-brand-accent" /> Your box contents
            </h4>

            {/* Selected specimens list */}
            <div className="space-y-4">
              {/* Selected Raw elements summary */}
              <div className="space-y-1.5">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-brand-secondary/50">
                  Raw plant fibers included:
                </span>
                <div className="space-y-1">
                  {selectedMycelium && (
                    <div className="flex justify-between items-center text-xs text-brand-secondary">
                      <span className="font-bold flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-brand-accent"></span> Mushroom root block
                      </span>
                      <span className="font-mono text-xs bg-white border px-1.5 py-0.5 border-brand-secondary-20 select-none">RAW</span>
                    </div>
                  )}
                  {selectedBagasse && (
                    <div className="flex justify-between items-center text-xs text-brand-secondary">
                      <span className="font-bold flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-brand-accent"></span> Sugarcane fiber disk
                      </span>
                      <span className="font-mono text-xs bg-white border px-1.5 py-0.5 border-brand-secondary-20 select-none">RAW</span>
                    </div>
                  )}
                  {selectedBamboo && (
                    <div className="flex justify-between items-center text-xs text-brand-secondary">
                      <span className="font-bold flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-brand-accent"></span> Bamboo wood block
                      </span>
                      <span className="font-mono text-xs bg-white border px-1.5 py-0.5 border-brand-secondary-20 select-none">RAW</span>
                    </div>
                  )}
                  {!selectedMycelium && !selectedBagasse && !selectedBamboo && (
                    <div className="text-red-700 font-mono text-[10px] leading-normal font-semibold">
                      ▲ No raw plant blocks chosen yet. Check boxes in Step 2.
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Standardized moldings from CART */}
              <div className="space-y-2 border-t border-brand-secondary/15 pt-4">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-brand-secondary/50">
                  Ready-to-order box samples ({cartItems.length}):
                </span>
                {cartItems.length > 0 ? (
                  <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-2.5 bg-white border border-brand-secondary/20 flex gap-2 items-center"
                      >
                        <div className="h-9 w-9 border border-brand-secondary/35 bg-brand-cream flex-shrink-0">
                          <img
                            src={item.imageUrl}
                            alt=""
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="block text-[11px] font-bold text-brand-secondary truncate">
                            {item.name}
                          </span>
                          <span className="block text-[9px] font-mono text-brand-accent-hover font-semibold">
                            MOQ: {item.moq.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[10px] italic font-mono text-brand-secondary/60">
                    No box samples selected yet. Add some from our Pre-Made Packaging Catalog!
                  </p>
                )}
              </div>
            </div>

            {/* Flat billing summary */}
            <div className="border-t border-brand-secondary/20 pt-4 space-y-2 font-mono text-xs text-brand-secondary">
              <div className="flex justify-between font-bold">
                <span>SAMPLES IN BOX:</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>HEATING TREATMENT:</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>SHIPPING FEE:</span>
                <span>$10.00</span>
              </div>
              <div className="flex justify-between text-brand-accent-hover font-extrabold border-t border-brand-secondary/10 pt-2 text-sm">
                <span>TOTAL CHARGE:</span>
                <span>$10.00 USD</span>
              </div>
            </div>

            <div className="p-4 bg-white border border-brand-secondary/20 text-[9px] font-mono rounded-sm leading-normal text-brand-secondary flex flex-col gap-1">
              <strong>Clean and Safe Plant Materials:</strong>
              <p className="text-brand-secondary/85 leading-relaxed">
                All raw plant blocks are carefully heat-cleaned using pressurized steam to ensure they are 100% safe, clean, and ready to handle.
              </p>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
