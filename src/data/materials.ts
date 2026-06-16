/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Material, CatalogItem } from '../types';

export const MATERIALS_DATA: Material[] = [
  {
    id: 'mycelium',
    name: 'Mushroom Roots',
    scientificName: 'Mushroom Roots + Natural Farm Leftovers',
    description: 'Natural mushroom roots grown in custom shapes with organic farm leftovers to make soft, protective cushion molds.',
    properties: {
      durability: 85,
      degradeTime: '30 to 45 Days in garden soil',
      moistureResistance: 'Splash-proof (We can add a plant-based water barrier)',
      bestFor: 'Fragile things like phones, perfume jars, delicate glass, and high-quality gifts.',
    },
    details: [
      'Grows completely on its own inside clean molds in just 5 to 7 days.',
      '100% compostable at home, breaking down quickly into healthy soil food.',
      'Cushions drops and keeps products safe even better than Styrofoam.',
      'Naturally fire-safe and shrugs off water drops while keeping its exact shape.'
    ],
    imageUrl: '/src/assets/images/biopack_mycelium_1781632048706.jpg',
    carbonOffsetRate: 9.2, // saves 9.2 kg CO2 per kg vs Styrofoam
  },
  {
    id: 'bagasse',
    name: 'Sugarcane Fiber',
    scientificName: 'Crushed Sugarcane Stalk Fiber',
    description: 'The strong fibers left behind after sugarcane stalks are crushed for juice. Pressed with gentle heat into thin, clean plates and food bowls.',
    properties: {
      durability: 75,
      degradeTime: '60 to 90 Days in natural compost',
      moistureResistance: 'Excellent (Microwave safe & resists grease and oils)',
      bestFor: 'Takeout meal boxes, picnic plates, makeup trays, and light product dividers.',
    },
    details: [
      'Rescues leftover farm waste that would otherwise be piled up or burned.',
      'Safe in the freezer (down to -20°C) and completely microwave safe.',
      'Uses 70% less energy and 80% less water to make than standard plastic.',
      'Very easy to press into smooth compartments, clean borders, and custom divides.'
    ],
    imageUrl: '/src/assets/images/biopack_bagasse_1781632063300.jpg',
    carbonOffsetRate: 4.8, // saves 4.8 kg CO2 vs plastic
  },
  {
    id: 'bamboo',
    name: 'Pressed Bamboo',
    scientificName: 'Ultra-Durable Bamboo Wood',
    description: 'Finely combed bamboo wood fibers pressed tightly under heat. Perfect for high-quality refillable containers and reusable jars.',
    properties: {
      durability: 96,
      degradeTime: '120 to 180 Days in dirt compost',
      moistureResistance: 'Waterproof (Naturally clean and completely water-tight)',
      bestFor: 'Beautiful beauty cream bottles, bathroom organizers, jars, and dry-food storage containers.',
    },
    details: [
      'Made from fast-growing bamboo that reaches full size in just 3 to 5 years without chemicals.',
      'Tough and highly solid, designed to be washed, carried around, and reused hundreds of times.',
      'Natural elements in the bamboo fibers keep your beauty products fresh with no chemical aids.',
      'Beautiful natural wood look with easy twist-on lids and a premium, solid feel.'
    ],
    imageUrl: '/src/assets/images/biopack_bamboo_1781632078145.jpg',
    carbonOffsetRate: 7.5, // saves 7.5 kg CO2 vs high-impact plastics
  }
];

export const CATALOG_ITEMS: CatalogItem[] = [
  // Mycelium catalog items
  {
    id: 'myc-tech-box',
    name: 'Soft Cushion Soundbar Tray',
    materialType: 'Mushroom Roots',
    category: 'Electronics Cushioning',
    pricePerUnit: 1.45,
    moq: 5000,
    description: 'Molded mushroom tray that absorbs bumps and keeps electronics safe during transport.',
    dimensions: '320mm x 110mm x 55mm',
    imageUrl: '/src/assets/images/biopack_mycelium_1781632048706.jpg'
  },
  {
    id: 'myc-perfume-well',
    name: 'Velvet-Touch Perfume Bottle Well',
    materialType: 'Mushroom Roots',
    category: 'Premium Gift Trays',
    pricePerUnit: 1.10,
    moq: 10000,
    description: 'A soft, velvety circular holder designed to cradle glass perfume vials safely.',
    dimensions: '120mm x 120mm x 80mm',
    imageUrl: '/src/assets/images/biopack_mycelium_1781632048706.jpg'
  },
  // Sugarcane Bagasse items
  {
    id: 'bag-clamshell-8',
    name: 'Interlocking Bento Lunch Box',
    materialType: 'Sugarcane Fiber',
    category: 'Food Service Containers',
    pricePerUnit: 0.18,
    moq: 25000,
    description: 'A clean hot food container with click-closed locks. Keeps hot oils and water safely inside.',
    dimensions: '200mm x 200mm x 65mm',
    imageUrl: '/src/assets/images/biopack_bagasse_1781632063300.jpg'
  },
  {
    id: 'bag-cosmetic-pan',
    name: 'Makeup Powder Palette Insert',
    materialType: 'Sugarcane Fiber',
    category: 'Makeup Cups',
    pricePerUnit: 0.08,
    moq: 50000,
    description: 'A tiny, organic tray for holding eyeshadow or powder compacts. Simply compost when empty.',
    dimensions: '45mm x 45mm x 8mm',
    imageUrl: '/src/assets/images/biopack_bagasse_1781632063300.jpg'
  },
  // Bamboo items
  {
    id: 'bam-cosm-jar',
    name: 'Twist-Cap Cream Jar',
    materialType: 'Pressed Bamboo',
    category: 'Refillable Beauty Pots',
    pricePerUnit: 2.20,
    moq: 2500,
    description: 'Dual-layer wooden jar with a secure screw-on lid. Completely leak-proof for creams and gels.',
    dimensions: '60mm x 60mm x 50mm',
    imageUrl: '/src/assets/images/biopack_bamboo_1781632078145.jpg'
  },
  {
    id: 'bam-lux-tube',
    name: 'Twist-Action Lipstick Tube',
    materialType: 'Pressed Bamboo',
    category: 'Makeup Tube Cases',
    pricePerUnit: 1.85,
    moq: 5000,
    description: 'A gorgeous wooden lipstick holder with a smooth twisting bottom and clean natural feel.',
    dimensions: '20mm x 20mm x 85mm',
    imageUrl: '/src/assets/images/biopack_bamboo_1781632078145.jpg'
  }
];

export const SUSTAINABILITY_STATS_DEFAULT = {
  totalPlasticDisplacedKg: 1240582, // Total plastic saved in KG
  totalCarbonSavedKg: 8932190,      // CO2 avoided
  clientCount: 142,                 // Active client companies
  oceanBoundPreventedKg: 421590,    // Ocean plastic equivalent prevented
};
