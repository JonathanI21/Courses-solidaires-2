// Base de données simulée pour les produits et les prix
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  barcode: string;
  image: string;
  nutriScore: 'A' | 'B' | 'C' | 'D' | 'E';
  ecoScore: 'A' | 'B' | 'C' | 'D' | 'E';
  allergens: string[];
  description: string;
}

export interface StorePrice {
  storeId: string;
  storeName: string;
  price: number;
  promotion?: {
    type: 'percentage' | 'fixed' | 'quantity';
    value: number;
    description: string;
    validUntil: Date;
  };
  availability: boolean;
  lastUpdated: Date;
}

export interface ProductWithPrices extends Product {
  prices: StorePrice[];
}

export interface ShoppingListItem {
  id: string;
  productId: string;
  quantity: number;
  priority: 'low' | 'medium' | 'high';
  notes?: string;
  addedAt: Date;
  scanned?: boolean;
  scannedAt?: Date;
}

export interface ShoppingList {
  id: string;
  name: string;
  items: ShoppingListItem[];
  status: 'draft' | 'validated' | 'in_progress' | 'completed';
  createdAt: Date;
  validatedAt?: Date;
  completedAt?: Date;
  totalEstimated: number;
  totalActual?: number;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  distance: number;
  openingHours: string;
  phone: string;
  services: string[];
}

// Base de données des produits
export const productsDatabase: Product[] = [
  // Fruits et Légumes
  {
    id: 'prod_001',
    name: 'Pommes Golden',
    brand: 'Carrefour Bio',
    category: 'fruits-legumes',
    barcode: '3560070123456',
    image: '🍎',
    nutriScore: 'A',
    ecoScore: 'A',
    allergens: [],
    description: 'Pommes Golden biologiques, origine France'
  },
  {
    id: 'prod_002',
    name: 'Bananes',
    brand: 'Chiquita',
    category: 'fruits-legumes',
    barcode: '3560070123457',
    image: '🍌',
    nutriScore: 'A',
    ecoScore: 'B',
    allergens: [],
    description: 'Bananes équitables, origine Équateur'
  },
  {
    id: 'prod_003',
    name: 'Tomates cerises',
    brand: 'Prince de Bretagne',
    category: 'fruits-legumes',
    barcode: '3560070123458',
    image: '🍅',
    nutriScore: 'A',
    ecoScore: 'A',
    allergens: [],
    description: 'Tomates cerises françaises, cultivées en Bretagne'
  },
  {
    id: 'prod_004',
    name: 'Carottes',
    brand: 'Carrefour',
    category: 'fruits-legumes',
    barcode: '3560070123459',
    image: '🥕',
    nutriScore: 'A',
    ecoScore: 'A',
    allergens: [],
    description: 'Carottes fraîches, origine France'
  },
  {
    id: 'prod_005',
    name: 'Salade iceberg',
    brand: 'Florette',
    category: 'fruits-legumes',
    barcode: '3560070123460',
    image: '🥬',
    nutriScore: 'A',
    ecoScore: 'B',
    allergens: [],
    description: 'Salade iceberg prête à consommer'
  },

  // Produits laitiers
  {
    id: 'prod_006',
    name: 'Lait demi-écrémé 1L',
    brand: 'Lactel',
    category: 'produits-laitiers',
    barcode: '3560070123461',
    image: '🥛',
    nutriScore: 'B',
    ecoScore: 'C',
    allergens: ['lait'],
    description: 'Lait demi-écrémé UHT, origine France'
  },
  {
    id: 'prod_007',
    name: 'Yaourts nature x8',
    brand: 'Danone',
    category: 'produits-laitiers',
    barcode: '3560070123462',
    image: '🥛',
    nutriScore: 'A',
    ecoScore: 'C',
    allergens: ['lait'],
    description: 'Yaourts nature au lait entier'
  },
  {
    id: 'prod_008',
    name: 'Fromage râpé',
    brand: 'Président',
    category: 'produits-laitiers',
    barcode: '3560070123463',
    image: '🧀',
    nutriScore: 'C',
    ecoScore: 'D',
    allergens: ['lait'],
    description: 'Emmental râpé, 200g'
  },
  {
    id: 'prod_009',
    name: 'Beurre doux 250g',
    brand: 'Elle & Vire',
    category: 'produits-laitiers',
    barcode: '3560070123464',
    image: '🧈',
    nutriScore: 'D',
    ecoScore: 'D',
    allergens: ['lait'],
    description: 'Beurre doux de Normandie'
  },

  // Féculents
  {
    id: 'prod_010',
    name: 'Riz basmati 1kg',
    brand: 'Uncle Ben\'s',
    category: 'feculents',
    barcode: '3560070123465',
    image: '🍚',
    nutriScore: 'A',
    ecoScore: 'B',
    allergens: [],
    description: 'Riz basmati long grain'
  },
  {
    id: 'prod_011',
    name: 'Pâtes spaghetti',
    brand: 'Barilla',
    category: 'feculents',
    barcode: '3560070123466',
    image: '🍝',
    nutriScore: 'A',
    ecoScore: 'B',
    allergens: ['gluten'],
    description: 'Spaghetti n°5, 500g'
  },
  {
    id: 'prod_012',
    name: 'Pain de mie complet',
    brand: 'Harry\'s',
    category: 'feculents',
    barcode: '3560070123467',
    image: '🍞',
    nutriScore: 'B',
    ecoScore: 'C',
    allergens: ['gluten'],
    description: 'Pain de mie complet, 14 tranches'
  },
  {
    id: 'prod_013',
    name: 'Pommes de terre',
    brand: 'Carrefour',
    category: 'feculents',
    barcode: '3560070123468',
    image: '🥔',
    nutriScore: 'A',
    ecoScore: 'A',
    allergens: [],
    description: 'Pommes de terre Charlotte, 2kg'
  },

  // Viandes et Poissons
  {
    id: 'prod_014',
    name: 'Escalopes de poulet',
    brand: 'Le Gaulois',
    category: 'viandes-poissons',
    barcode: '3560070123469',
    image: '🍗',
    nutriScore: 'B',
    ecoScore: 'C',
    allergens: [],
    description: 'Escalopes de poulet fermier, 4 pièces'
  },
  {
    id: 'prod_015',
    name: 'Saumon fumé',
    brand: 'Labeyrie',
    category: 'viandes-poissons',
    barcode: '3560070123470',
    image: '🐟',
    nutriScore: 'B',
    ecoScore: 'C',
    allergens: ['poisson'],
    description: 'Saumon fumé d\'Écosse, 4 tranches'
  },
  {
    id: 'prod_016',
    name: 'Jambon blanc',
    brand: 'Fleury Michon',
    category: 'viandes-poissons',
    barcode: '3560070123471',
    image: '🥓',
    nutriScore: 'C',
    ecoScore: 'D',
    allergens: [],
    description: 'Jambon blanc découenné dégraissé, 4 tranches'
  },

  // Épicerie
  {
    id: 'prod_017',
    name: 'Huile d\'olive',
    brand: 'Puget',
    category: 'epicerie',
    barcode: '3560070123472',
    image: '🫒',
    nutriScore: 'C',
    ecoScore: 'B',
    allergens: [],
    description: 'Huile d\'olive vierge extra, 50cl'
  },
  {
    id: 'prod_018',
    name: 'Conserve tomates',
    brand: 'Mutti',
    category: 'epicerie',
    barcode: '3560070123473',
    image: '🥫',
    nutriScore: 'A',
    ecoScore: 'B',
    allergens: [],
    description: 'Tomates pelées entières, 400g'
  },
  {
    id: 'prod_019',
    name: 'Céréales',
    brand: 'Kellogg\'s',
    category: 'epicerie',
    barcode: '3560070123474',
    image: '🥣',
    nutriScore: 'C',
    ecoScore: 'C',
    allergens: ['gluten'],
    description: 'Corn Flakes, 375g'
  },
  {
    id: 'prod_020',
    name: 'Café moulu',
    brand: 'Carte Noire',
    category: 'epicerie',
    barcode: '3560070123475',
    image: '☕',
    nutriScore: 'A',
    ecoScore: 'C',
    allergens: [],
    description: 'Café moulu arabica, 250g'
  }
];

// Base de données des magasins
export const storesDatabase: Store[] = [
  {
    id: 'store_001',
    name: 'Carrefour Marseille Centre',
    address: '123 Avenue de la République, 13001 Marseille',
    coordinates: { lat: 43.2965, lng: 5.3698 },
    distance: 1.2,
    openingHours: 'Lun-Sam: 8h30-21h30, Dim: 9h-19h',
    phone: '04 91 XX XX XX',
    services: ['Drive', 'Livraison', 'Click & Collect']
  },
  {
    id: 'store_002',
    name: 'Leclerc Marseille Est',
    address: '456 Boulevard National, 13003 Marseille',
    coordinates: { lat: 43.3047, lng: 5.3925 },
    distance: 2.8,
    openingHours: 'Lun-Sam: 8h30-20h30, Dim: 9h-19h',
    phone: '04 91 YY YY YY',
    services: ['Drive', 'Click & Collect']
  },
  {
    id: 'store_003',
    name: 'Auchan Marseille Nord',
    address: '789 Route de Lyon, 13015 Marseille',
    coordinates: { lat: 43.3628, lng: 5.3714 },
    distance: 4.5,
    openingHours: 'Lun-Sam: 8h30-22h, Dim: 9h-19h',
    phone: '04 91 ZZ ZZ ZZ',
    services: ['Drive', 'Livraison', 'Click & Collect', 'Retrait 2h']
  },
  {
    id: 'store_004',
    name: 'Monoprix Marseille Vieux-Port',
    address: '321 Rue de la République, 13002 Marseille',
    coordinates: { lat: 43.2951, lng: 5.3756 },
    distance: 0.8,
    openingHours: 'Lun-Sam: 9h-20h, Dim: 10h-19h',
    phone: '04 91 AA AA AA',
    services: ['Livraison', 'Click & Collect']
  },
  {
    id: 'store_005',
    name: 'Casino Marseille Castellane',
    address: '654 Avenue du Prado, 13008 Marseille',
    coordinates: { lat: 43.2733, lng: 5.3927 },
    distance: 3.1,
    openingHours: 'Lun-Sam: 8h-21h, Dim: 9h-19h',
    phone: '04 91 BB BB BB',
    services: ['Click & Collect']
  }
];

// Base de données des prix par magasin - ÉTENDUE avec plus de produits
export const pricesDatabase: { [productId: string]: StorePrice[] } = {
  'prod_001': [
    {
      storeId: 'store_001',
      storeName: 'Carrefour',
      price: 2.99,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:00:00Z')
    },
    {
      storeId: 'store_002',
      storeName: 'Leclerc',
      price: 2.79,
      promotion: {
        type: 'percentage',
        value: 10,
        description: '-10% sur les fruits bio',
        validUntil: new Date('2024-01-20T23:59:59Z')
      },
      availability: true,
      lastUpdated: new Date('2024-01-15T09:30:00Z')
    },
    {
      storeId: 'store_003',
      storeName: 'Auchan',
      price: 3.19,
      availability: true,
      lastUpdated: new Date('2024-01-15T08:45:00Z')
    },
    {
      storeId: 'store_004',
      storeName: 'Monoprix',
      price: 3.49,
      availability: true,
      lastUpdated: new Date('2024-01-15T11:15:00Z')
    },
    {
      storeId: 'store_005',
      storeName: 'Casino',
      price: 2.89,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:30:00Z')
    }
  ],
  'prod_002': [
    {
      storeId: 'store_001',
      storeName: 'Carrefour',
      price: 1.89,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:00:00Z')
    },
    {
      storeId: 'store_002',
      storeName: 'Leclerc',
      price: 1.69,
      availability: true,
      lastUpdated: new Date('2024-01-15T09:30:00Z')
    },
    {
      storeId: 'store_003',
      storeName: 'Auchan',
      price: 1.79,
      promotion: {
        type: 'quantity',
        value: 2,
        description: '2 kg achetés = 1 kg offert',
        validUntil: new Date('2024-01-18T23:59:59Z')
      },
      availability: true,
      lastUpdated: new Date('2024-01-15T08:45:00Z')
    },
    {
      storeId: 'store_004',
      storeName: 'Monoprix',
      price: 2.19,
      availability: true,
      lastUpdated: new Date('2024-01-15T11:15:00Z')
    },
    {
      storeId: 'store_005',
      storeName: 'Casino',
      price: 1.99,
      availability: false,
      lastUpdated: new Date('2024-01-15T10:30:00Z')
    }
  ],
  'prod_003': [
    {
      storeId: 'store_001',
      storeName: 'Carrefour',
      price: 3.49,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:00:00Z')
    },
    {
      storeId: 'store_002',
      storeName: 'Leclerc',
      price: 3.29,
      availability: true,
      lastUpdated: new Date('2024-01-15T09:30:00Z')
    },
    {
      storeId: 'store_003',
      storeName: 'Auchan',
      price: 3.69,
      availability: true,
      lastUpdated: new Date('2024-01-15T08:45:00Z')
    },
    {
      storeId: 'store_004',
      storeName: 'Monoprix',
      price: 3.99,
      availability: true,
      lastUpdated: new Date('2024-01-15T11:15:00Z')
    },
    {
      storeId: 'store_005',
      storeName: 'Casino',
      price: 3.39,
      promotion: {
        type: 'fixed',
        value: 0.30,
        description: '-30 centimes immédiat',
        validUntil: new Date('2024-01-17T23:59:59Z')
      },
      availability: true,
      lastUpdated: new Date('2024-01-15T10:30:00Z')
    }
  ],
  'prod_004': [
    {
      storeId: 'store_001',
      storeName: 'Carrefour',
      price: 1.99,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:00:00Z')
    },
    {
      storeId: 'store_002',
      storeName: 'Leclerc',
      price: 1.79,
      availability: true,
      lastUpdated: new Date('2024-01-15T09:30:00Z')
    },
    {
      storeId: 'store_003',
      storeName: 'Auchan',
      price: 2.09,
      availability: true,
      lastUpdated: new Date('2024-01-15T08:45:00Z')
    },
    {
      storeId: 'store_004',
      storeName: 'Monoprix',
      price: 2.29,
      availability: true,
      lastUpdated: new Date('2024-01-15T11:15:00Z')
    },
    {
      storeId: 'store_005',
      storeName: 'Casino',
      price: 1.89,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:30:00Z')
    }
  ],
  'prod_005': [
    {
      storeId: 'store_001',
      storeName: 'Carrefour',
      price: 1.49,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:00:00Z')
    },
    {
      storeId: 'store_002',
      storeName: 'Leclerc',
      price: 1.39,
      availability: true,
      lastUpdated: new Date('2024-01-15T09:30:00Z')
    },
    {
      storeId: 'store_003',
      storeName: 'Auchan',
      price: 1.59,
      availability: true,
      lastUpdated: new Date('2024-01-15T08:45:00Z')
    },
    {
      storeId: 'store_004',
      storeName: 'Monoprix',
      price: 1.69,
      availability: true,
      lastUpdated: new Date('2024-01-15T11:15:00Z')
    },
    {
      storeId: 'store_005',
      storeName: 'Casino',
      price: 1.45,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:30:00Z')
    }
  ],
  'prod_006': [
    {
      storeId: 'store_001',
      storeName: 'Carrefour',
      price: 1.15,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:00:00Z')
    },
    {
      storeId: 'store_002',
      storeName: 'Leclerc',
      price: 1.09,
      availability: true,
      lastUpdated: new Date('2024-01-15T09:30:00Z')
    },
    {
      storeId: 'store_003',
      storeName: 'Auchan',
      price: 1.19,
      availability: true,
      lastUpdated: new Date('2024-01-15T08:45:00Z')
    },
    {
      storeId: 'store_004',
      storeName: 'Monoprix',
      price: 1.29,
      availability: true,
      lastUpdated: new Date('2024-01-15T11:15:00Z')
    },
    {
      storeId: 'store_005',
      storeName: 'Casino',
      price: 1.25,
      promotion: {
        type: 'fixed',
        value: 0.20,
        description: '-20 centimes immédiat',
        validUntil: new Date('2024-01-17T23:59:59Z')
      },
      availability: true,
      lastUpdated: new Date('2024-01-15T10:30:00Z')
    }
  ],
  'prod_007': [
    {
      storeId: 'store_001',
      storeName: 'Carrefour',
      price: 2.89,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:00:00Z')
    },
    {
      storeId: 'store_002',
      storeName: 'Leclerc',
      price: 2.69,
      promotion: {
        type: 'percentage',
        value: 15,
        description: '-15% sur les yaourts',
        validUntil: new Date('2024-01-19T23:59:59Z')
      },
      availability: true,
      lastUpdated: new Date('2024-01-15T09:30:00Z')
    },
    {
      storeId: 'store_003',
      storeName: 'Auchan',
      price: 2.99,
      availability: true,
      lastUpdated: new Date('2024-01-15T08:45:00Z')
    },
    {
      storeId: 'store_004',
      storeName: 'Monoprix',
      price: 3.19,
      availability: true,
      lastUpdated: new Date('2024-01-15T11:15:00Z')
    },
    {
      storeId: 'store_005',
      storeName: 'Casino',
      price: 2.79,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:30:00Z')
    }
  ],
  'prod_008': [
    {
      storeId: 'store_001',
      storeName: 'Carrefour',
      price: 2.49,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:00:00Z')
    },
    {
      storeId: 'store_002',
      storeName: 'Leclerc',
      price: 2.29,
      availability: true,
      lastUpdated: new Date('2024-01-15T09:30:00Z')
    },
    {
      storeId: 'store_003',
      storeName: 'Auchan',
      price: 2.59,
      availability: true,
      lastUpdated: new Date('2024-01-15T08:45:00Z')
    },
    {
      storeId: 'store_004',
      storeName: 'Monoprix',
      price: 2.79,
      availability: true,
      lastUpdated: new Date('2024-01-15T11:15:00Z')
    },
    {
      storeId: 'store_005',
      storeName: 'Casino',
      price: 2.39,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:30:00Z')
    }
  ],
  'prod_009': [
    {
      storeId: 'store_001',
      storeName: 'Carrefour',
      price: 3.29,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:00:00Z')
    },
    {
      storeId: 'store_002',
      storeName: 'Leclerc',
      price: 3.09,
      availability: true,
      lastUpdated: new Date('2024-01-15T09:30:00Z')
    },
    {
      storeId: 'store_003',
      storeName: 'Auchan',
      price: 3.39,
      availability: true,
      lastUpdated: new Date('2024-01-15T08:45:00Z')
    },
    {
      storeId: 'store_004',
      storeName: 'Monoprix',
      price: 3.59,
      availability: true,
      lastUpdated: new Date('2024-01-15T11:15:00Z')
    },
    {
      storeId: 'store_005',
      storeName: 'Casino',
      price: 3.19,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:30:00Z')
    }
  ],
  'prod_010': [
    {
      storeId: 'store_001',
      storeName: 'Carrefour',
      price: 3.29,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:00:00Z')
    },
    {
      storeId: 'store_002',
      storeName: 'Leclerc',
      price: 2.99,
      availability: true,
      lastUpdated: new Date('2024-01-15T09:30:00Z')
    },
    {
      storeId: 'store_003',
      storeName: 'Auchan',
      price: 3.49,
      availability: true,
      lastUpdated: new Date('2024-01-15T08:45:00Z')
    },
    {
      storeId: 'store_004',
      storeName: 'Monoprix',
      price: 3.79,
      availability: true,
      lastUpdated: new Date('2024-01-15T11:15:00Z')
    },
    {
      storeId: 'store_005',
      storeName: 'Casino',
      price: 3.19,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:30:00Z')
    }
  ],
  'prod_011': [
    {
      storeId: 'store_001',
      storeName: 'Carrefour',
      price: 1.89,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:00:00Z')
    },
    {
      storeId: 'store_002',
      storeName: 'Leclerc',
      price: 1.69,
      promotion: {
        type: 'quantity',
        value: 3,
        description: '3 paquets achetés = 1 offert',
        validUntil: new Date('2024-01-20T23:59:59Z')
      },
      availability: true,
      lastUpdated: new Date('2024-01-15T09:30:00Z')
    },
    {
      storeId: 'store_003',
      storeName: 'Auchan',
      price: 1.99,
      availability: true,
      lastUpdated: new Date('2024-01-15T08:45:00Z')
    },
    {
      storeId: 'store_004',
      storeName: 'Monoprix',
      price: 2.19,
      availability: true,
      lastUpdated: new Date('2024-01-15T11:15:00Z')
    },
    {
      storeId: 'store_005',
      storeName: 'Casino',
      price: 1.79,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:30:00Z')
    }
  ],
  'prod_012': [
    {
      storeId: 'store_001',
      storeName: 'Carrefour',
      price: 2.19,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:00:00Z')
    },
    {
      storeId: 'store_002',
      storeName: 'Leclerc',
      price: 1.99,
      availability: true,
      lastUpdated: new Date('2024-01-15T09:30:00Z')
    },
    {
      storeId: 'store_003',
      storeName: 'Auchan',
      price: 2.29,
      availability: true,
      lastUpdated: new Date('2024-01-15T08:45:00Z')
    },
    {
      storeId: 'store_004',
      storeName: 'Monoprix',
      price: 2.49,
      availability: true,
      lastUpdated: new Date('2024-01-15T11:15:00Z')
    },
    {
      storeId: 'store_005',
      storeName: 'Casino',
      price: 2.09,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:30:00Z')
    }
  ],
  'prod_013': [
    {
      storeId: 'store_001',
      storeName: 'Carrefour',
      price: 2.99,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:00:00Z')
    },
    {
      storeId: 'store_002',
      storeName: 'Leclerc',
      price: 2.79,
      availability: true,
      lastUpdated: new Date('2024-01-15T09:30:00Z')
    },
    {
      storeId: 'store_003',
      storeName: 'Auchan',
      price: 3.19,
      availability: true,
      lastUpdated: new Date('2024-01-15T08:45:00Z')
    },
    {
      storeId: 'store_004',
      storeName: 'Monoprix',
      price: 3.39,
      availability: true,
      lastUpdated: new Date('2024-01-15T11:15:00Z')
    },
    {
      storeId: 'store_005',
      storeName: 'Casino',
      price: 2.89,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:30:00Z')
    }
  ],
  'prod_014': [
    {
      storeId: 'store_001',
      storeName: 'Carrefour',
      price: 6.99,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:00:00Z')
    },
    {
      storeId: 'store_002',
      storeName: 'Leclerc',
      price: 6.49,
      availability: true,
      lastUpdated: new Date('2024-01-15T09:30:00Z')
    },
    {
      storeId: 'store_003',
      storeName: 'Auchan',
      price: 7.19,
      availability: true,
      lastUpdated: new Date('2024-01-15T08:45:00Z')
    },
    {
      storeId: 'store_004',
      storeName: 'Monoprix',
      price: 7.49,
      availability: true,
      lastUpdated: new Date('2024-01-15T11:15:00Z')
    },
    {
      storeId: 'store_005',
      storeName: 'Casino',
      price: 6.79,
      promotion: {
        type: 'percentage',
        value: 20,
        description: '-20% sur les volailles',
        validUntil: new Date('2024-01-18T23:59:59Z')
      },
      availability: true,
      lastUpdated: new Date('2024-01-15T10:30:00Z')
    }
  ],
  'prod_015': [
    {
      storeId: 'store_001',
      storeName: 'Carrefour',
      price: 4.99,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:00:00Z')
    },
    {
      storeId: 'store_002',
      storeName: 'Leclerc',
      price: 4.79,
      availability: true,
      lastUpdated: new Date('2024-01-15T09:30:00Z')
    },
    {
      storeId: 'store_003',
      storeName: 'Auchan',
      price: 5.19,
      availability: true,
      lastUpdated: new Date('2024-01-15T08:45:00Z')
    },
    {
      storeId: 'store_004',
      storeName: 'Monoprix',
      price: 5.49,
      availability: true,
      lastUpdated: new Date('2024-01-15T11:15:00Z')
    },
    {
      storeId: 'store_005',
      storeName: 'Casino',
      price: 4.89,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:30:00Z')
    }
  ],
  'prod_016': [
    {
      storeId: 'store_001',
      storeName: 'Carrefour',
      price: 2.99,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:00:00Z')
    },
    {
      storeId: 'store_002',
      storeName: 'Leclerc',
      price: 2.79,
      availability: true,
      lastUpdated: new Date('2024-01-15T09:30:00Z')
    },
    {
      storeId: 'store_003',
      storeName: 'Auchan',
      price: 3.19,
      availability: true,
      lastUpdated: new Date('2024-01-15T08:45:00Z')
    },
    {
      storeId: 'store_004',
      storeName: 'Monoprix',
      price: 3.39,
      availability: true,
      lastUpdated: new Date('2024-01-15T11:15:00Z')
    },
    {
      storeId: 'store_005',
      storeName: 'Casino',
      price: 2.89,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:30:00Z')
    }
  ],
  'prod_017': [
    {
      storeId: 'store_001',
      storeName: 'Carrefour',
      price: 4.49,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:00:00Z')
    },
    {
      storeId: 'store_002',
      storeName: 'Leclerc',
      price: 4.19,
      availability: true,
      lastUpdated: new Date('2024-01-15T09:30:00Z')
    },
    {
      storeId: 'store_003',
      storeName: 'Auchan',
      price: 4.69,
      availability: true,
      lastUpdated: new Date('2024-01-15T08:45:00Z')
    },
    {
      storeId: 'store_004',
      storeName: 'Monoprix',
      price: 4.99,
      availability: true,
      lastUpdated: new Date('2024-01-15T11:15:00Z')
    },
    {
      storeId: 'store_005',
      storeName: 'Casino',
      price: 4.29,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:30:00Z')
    }
  ],
  'prod_018': [
    {
      storeId: 'store_001',
      storeName: 'Carrefour',
      price: 1.29,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:00:00Z')
    },
    {
      storeId: 'store_002',
      storeName: 'Leclerc',
      price: 1.19,
      availability: true,
      lastUpdated: new Date('2024-01-15T09:30:00Z')
    },
    {
      storeId: 'store_003',
      storeName: 'Auchan',
      price: 1.39,
      availability: true,
      lastUpdated: new Date('2024-01-15T08:45:00Z')
    },
    {
      storeId: 'store_004',
      storeName: 'Monoprix',
      price: 1.49,
      availability: true,
      lastUpdated: new Date('2024-01-15T11:15:00Z')
    },
    {
      storeId: 'store_005',
      storeName: 'Casino',
      price: 1.25,
      promotion: {
        type: 'quantity',
        value: 2,
        description: '2 boîtes achetées = 1 offerte',
        validUntil: new Date('2024-01-19T23:59:59Z')
      },
      availability: true,
      lastUpdated: new Date('2024-01-15T10:30:00Z')
    }
  ],
  'prod_019': [
    {
      storeId: 'store_001',
      storeName: 'Carrefour',
      price: 3.49,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:00:00Z')
    },
    {
      storeId: 'store_002',
      storeName: 'Leclerc',
      price: 3.19,
      availability: true,
      lastUpdated: new Date('2024-01-15T09:30:00Z')
    },
    {
      storeId: 'store_003',
      storeName: 'Auchan',
      price: 3.69,
      availability: true,
      lastUpdated: new Date('2024-01-15T08:45:00Z')
    },
    {
      storeId: 'store_004',
      storeName: 'Monoprix',
      price: 3.89,
      availability: true,
      lastUpdated: new Date('2024-01-15T11:15:00Z')
    },
    {
      storeId: 'store_005',
      storeName: 'Casino',
      price: 3.29,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:30:00Z')
    }
  ],
  'prod_020': [
    {
      storeId: 'store_001',
      storeName: 'Carrefour',
      price: 4.99,
      availability: true,
      lastUpdated: new Date('2024-01-15T10:00:00Z')
    },
    {
      storeId: 'store_002',
      storeName: 'Leclerc',
      price: 4.69,
      availability: true,
      lastUpdated: new Date('2024-01-15T09:30:00Z')
    },
    {
      storeId: 'store_003',
      storeName: 'Auchan',
      price: 5.19,
      availability: true,
      lastUpdated: new Date('2024-01-15T08:45:00Z')
    },
    {
      storeId: 'store_004',
      storeName: 'Monoprix',
      price: 5.49,
      availability: true,
      lastUpdated: new Date('2024-01-15T11:15:00Z')
    },
    {
      storeId: 'store_005',
      storeName: 'Casino',
      price: 4.79,
      promotion: {
        type: 'fixed',
        value: 0.50,
        description: '-50 centimes immédiat',
        validUntil: new Date('2024-01-17T23:59:59Z')
      },
      availability: true,
      lastUpdated: new Date('2024-01-15T10:30:00Z')
    }
  ]
};

// Fonctions utilitaires pour la base de données
export class DatabaseService {
  static getProduct(productId: string): Product | undefined {
    return productsDatabase.find(p => p.id === productId);
  }

  static getProductByBarcode(barcode: string): Product | undefined {
    return productsDatabase.find(p => p.barcode === barcode);
  }

  static getProductsByCategory(category: string): Product[] {
    return productsDatabase.filter(p => p.category === category);
  }

  static searchProducts(query: string): Product[] {
    const lowercaseQuery = query.toLowerCase();
    return productsDatabase.filter(p => 
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.brand.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery)
    );
  }

  static getProductWithPrices(productId: string): ProductWithPrices | undefined {
    const product = this.getProduct(productId);
    if (!product) return undefined;

    const prices = pricesDatabase[productId] || [];
    return { ...product, prices };
  }

  static getAllProductsWithPrices(): ProductWithPrices[] {
    return productsDatabase.map(product => ({
      ...product,
      prices: pricesDatabase[product.id] || []
    }));
  }

  static getStores(): Store[] {
    return storesDatabase;
  }

  static getStore(storeId: string): Store | undefined {
    return storesDatabase.find(s => s.id === storeId);
  }

  static getBestPriceForProduct(productId: string): StorePrice | undefined {
    const prices = pricesDatabase[productId] || [];
    const availablePrices = prices.filter(p => p.availability);
    
    if (availablePrices.length === 0) return undefined;

    return availablePrices.reduce((best, current) => {
      const currentPrice = current.promotion ? 
        this.calculatePromotionalPrice(current.price, current.promotion) : 
        current.price;
      const bestPrice = best.promotion ? 
        this.calculatePromotionalPrice(best.price, best.promotion) : 
        best.price;
      
      return currentPrice < bestPrice ? current : best;
    });
  }

  static calculatePromotionalPrice(originalPrice: number, promotion: StorePrice['promotion']): number {
    if (!promotion) return originalPrice;

    switch (promotion.type) {
      case 'percentage':
        return originalPrice * (1 - promotion.value / 100);
      case 'fixed':
        return Math.max(0, originalPrice - promotion.value);
      case 'quantity':
        // Pour les promotions quantité, on retourne le prix original
        // La logique de calcul se fait au niveau du panier
        return originalPrice;
      default:
        return originalPrice;
    }
  }

  static calculateBasketTotal(items: ShoppingListItem[], storeId: string): number {
    return items.reduce((total, item) => {
      const prices = pricesDatabase[item.productId];
      if (!prices) return total;

      const storePrice = prices.find(p => p.storeId === storeId);
      if (!storePrice || !storePrice.availability) return total;

      const unitPrice = this.calculatePromotionalPrice(storePrice.price, storePrice.promotion);
      return total + (unitPrice * item.quantity);
    }, 0);
  }

  static compareBaskets(items: ShoppingListItem[]): Array<{
    store: Store;
    total: number;
    savings: number;
    unavailableItems: number;
    promotions: number;
  }> {
    const results = storesDatabase.map(store => {
      let total = 0;
      let unavailableItems = 0;
      let promotions = 0;

      items.forEach(item => {
        const prices = pricesDatabase[item.productId];
        if (!prices) {
          unavailableItems++;
          return;
        }

        const storePrice = prices.find(p => p.storeId === store.id);
        if (!storePrice || !storePrice.availability) {
          unavailableItems++;
          return;
        }

        if (storePrice.promotion) {
          promotions++;
        }

        const unitPrice = this.calculatePromotionalPrice(storePrice.price, storePrice.promotion);
        total += unitPrice * item.quantity;
      });

      return { store, total, unavailableItems, promotions, savings: 0 };
    });

    // Calculer les économies par rapport au plus cher
    const maxTotal = Math.max(...results.map(r => r.total));
    results.forEach(result => {
      result.savings = maxTotal - result.total;
    });

    // Trier par total croissant
    return results.sort((a, b) => a.total - b.total);
  }

  // Gestion des listes de courses
  static saveShoppingList(list: ShoppingList): void {
    const existingLists = this.getShoppingLists();
    const updatedLists = existingLists.filter(l => l.id !== list.id);
    updatedLists.push(list);
    localStorage.setItem('shoppingLists', JSON.stringify(updatedLists));
  }

  static getShoppingLists(): ShoppingList[] {
    const stored = localStorage.getItem('shoppingLists');
    return stored ? JSON.parse(stored) : [];
  }

  static getShoppingList(listId: string): ShoppingList | undefined {
    const lists = this.getShoppingLists();
    return lists.find(l => l.id === listId);
  }

  static deleteShoppingList(listId: string): void {
    const lists = this.getShoppingLists();
    const updatedLists = lists.filter(l => l.id !== listId);
    localStorage.setItem('shoppingLists', JSON.stringify(updatedLists));
  }

  static getValidatedList(): ShoppingList | undefined {
    const lists = this.getShoppingLists();
    return lists.find(l => l.status === 'validated' || l.status === 'in_progress');
  }
}

export default DatabaseService;