/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId = 'home' | 'materials' | 'solutions' | 'catalog' | 'metrics' | 'contact';

export interface Material {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  properties: {
    durability: number; // 1-100
    degradeTime: string;
    moistureResistance: string;
    bestFor: string;
  };
  details: string[];
  imageUrl: string;
  carbonOffsetRate: number; // kg saved per kg material vs plastic
}

export interface ConfiguratorOnboarding {
  productType: 'liquid' | 'electronics' | 'food' | 'cosmetics' | 'none';
  rigidity: 'soft' | 'semi-rigid' | 'rigid' | 'none';
  estimatedVolume: string;
}

export interface CatalogItem {
  id: string;
  name: string;
  materialType: 'Mushroom Roots' | 'Sugarcane Fiber' | 'Pressed Bamboo' | 'Mycelium' | 'Sugarcane Bagasse' | 'Bamboo';
  category: string;
  pricePerUnit: number;
  moq: number; // Minimum Order Quantity
  description: string;
  dimensions: string;
  imageUrl: string;
}

export interface SampleKitOrder {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  city: string;
  zipCode: string;
  selectedMaterials: string[]; // IDs of materials
  paymentDetails: {
    cardNumber: string;
    expiry: string;
    cvv: string;
  };
}
