import React, { useState } from 'react';
import { 
  Camera, 
  CheckCircle, 
  AlertCircle, 
  Scan, 
  ArrowLeft,
  Package,
  Clock,
  BarChart3,
  Target,
  ShoppingCart,
  Plus,
  Minus,
  Heart,
  Gift,
  Users,
  Edit3,
  Save,
  X,
  Trash2,
  List,
  FileText,
  TrendingUp,
  Store,
  Euro,
  Zap,
  History,
  Lightbulb
} from 'lucide-react';
import DatabaseService, { ShoppingList, Product, ShoppingListItem } from '../../../data/database';

interface InStoreScannerProps {
  validatedList?: ShoppingList | null;
  onListUpdated: (list: ShoppingList) => void;
  onNavigateToShoppingList?: () => void;
  onRectifyList?: () => void;
}

interface ScannedProduct {
  id: string;
  productId: string;
  quantity: number;
  scannedAt: Date;
  donated: boolean;
}

interface PriceHistory {
  date: string;
  price: number;
  store: string;
}

const InStoreScanner: React.FC<InStoreScannerProps> = ({ 
  validatedList, 
  onListUpdated, 
  onNavigateToShoppingList,
  onRectifyList
}) => {
  const [scannerActive, setScannerActive] = useState(false);
  const [lastScannedProduct, setLastScannedProduct] = useState<Product | null>(null);
  const [scannedProducts, setScannedProducts] = useState<ScannedProduct[]>([]);
  const [donationCount, setDonationCount] = useState(0);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [selectedProductForComparison, setSelectedProductForComparison] = useState<string | null>(null);
  const [showPriceHistory, setShowPriceHistory] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const scanProduct = (barcode: string) => {
    const product = DatabaseService.getProductByBarcode(barcode);
    if (!product) {
      alert('Produit non reconnu');
      return;
    }

    const existingProduct = scannedProducts.find(p => p.productId === product.id);
    
    if (existingProduct) {
      setScannedProducts(scannedProducts.map(p => 
        p.productId === product.id 
          ? { ...p, quantity: p.quantity + 1 }
          : p
      ));
    } else {
      const newScannedProduct: ScannedProduct = {
        id: Date.now().toString(),
        productId: product.id,
        quantity: 1,
        scannedAt: new Date(),
        donated: false
      };
      setScannedProducts([...scannedProducts, newScannedProduct]);
    }

    setLastScannedProduct(product);
  };

  // Simulation de scan automatique
  const simulateScan = () => {
    if (!scannerActive) return;
    
    setIsScanning(true);
    
    // Simuler un délai de scan (1-3 secondes)
    const scanDelay = Math.random() * 2000 + 1000;
    
    setTimeout(() => {
      // Sélectionner un produit aléatoire
      const allProducts = DatabaseService.getAllProductsWithPrices();
      const randomProduct = allProducts[Math.floor(Math.random() * allProducts.length)];
      
      if (randomProduct) {
        scanProduct(randomProduct.barcode);
      }
      
      setIsScanning(false);
      
      // Arrêter le scanner après le scan
      setScannerActive(false);
    }, scanDelay);
  };

  const handleScannerToggle = () => {
    if (!scannerActive) {
      setScannerActive(true);
      // Démarrer la simulation de scan automatiquement
      setTimeout(() => {
        simulateScan();
      }, 500);
    } else {
      setScannerActive(false);
      setIsScanning(false);
    }
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setScannedProducts(scannedProducts.filter(p => p.productId !== productId));
      return;
    }
    
    setScannedProducts(scannedProducts.map(p => 
      p.productId === productId 
        ? { ...p, quantity: newQuantity }
        : p
    ));
  };

  const toggleDonation = (productId: string) => {
    setScannedProducts(scannedProducts.map(p => {
      if (p.productId === productId) {
        const newDonated = !p.donated;
        if (newDonated) {
          setDonationCount(prev => prev + p.quantity);
        } else {
          setDonationCount(prev => prev - p.quantity);
        }
        return { ...p, donated: newDonated };
      }
      return p;
    }));
  };

  const calculateTotal = () => {
    return scannedProducts.reduce((total, item) => {
      const bestPrice = DatabaseService.getBestPriceForProduct(item.productId);
      const price = bestPrice ? DatabaseService.calculatePromotionalPrice(bestPrice.price, bestPrice.promotion) : 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateDonationTotal = () => {
    return scannedProducts
      .filter(item => item.donated)
      .reduce((total, item) => {
        const bestPrice = DatabaseService.getBestPriceForProduct(item.productId);
        const price = bestPrice ? DatabaseService.calculatePromotionalPrice(bestPrice.price, bestPrice.promotion) : 0;
        return total + (price * item.quantity);
      }, 0);
  };

  const calculateSavings = () => {
    return scannedProducts.reduce((savings, item) => {
      const productWithPrices = DatabaseService.getProductWithPrices(item.productId);
      if (!productWithPrices || productWithPrices.prices.length === 0) return savings;
      
      const availablePrices = productWithPrices.prices.filter(p => p.availability);
      if (availablePrices.length === 0) return savings;
      
      const bestPrice = Math.min(...availablePrices.map(p => 
        DatabaseService.calculatePromotionalPrice(p.price, p.promotion)
      ));
      const worstPrice = Math.max(...availablePrices.map(p => 
        DatabaseService.calculatePromotionalPrice(p.price, p.promotion)
      ));
      
      return savings + ((worstPrice - bestPrice) * item.quantity);
    }, 0);
  };

  const handleValidateFromDraft = () => {
    const draftList = DatabaseService.getShoppingLists().find(list => list.status === 'draft');
    
    if (!draftList || draftList.items.length === 0) {
      alert('Aucune liste à valider ou liste vide');
      return;
    }

    const totalEstimated = draftList.items.reduce((total, item) => {
      const bestPrice = DatabaseService.getBestPriceForProduct(item.productId);
      const price = bestPrice ? DatabaseService.calculatePromotionalPrice(bestPrice.price, bestPrice.promotion) : 0;
      return total + (price * item.quantity);
    }, 0);

    const validatedList: ShoppingList = {
      ...draftList,
      status: 'validated',
      validatedAt: new Date(),
      totalEstimated
    };

    DatabaseService.saveShoppingList(validatedList);
    onListUpdated(validatedList);
  };

  const renderPriceComparison = (productId: string) => {
    const product = DatabaseService.getProduct(productId);
    const productWithPrices = DatabaseService.getProductWithPrices(productId);
    
    if (!product || !productWithPrices || productWithPrices.prices.length === 0) {
      return null;
    }

    const sortedPrices = [...productWithPrices.prices]
      .filter(p => p.availability)
      .sort((a, b) => {
        const priceA = DatabaseService.calculatePromotionalPrice(a.price, a.promotion);
        const priceB = DatabaseService.calculatePromotionalPrice(b.price, b.promotion);
        return priceA - priceB;
      });

    return (
      <div className="bg-white border-2 border-blue-200 rounded-lg p-3 mt-3">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-blue-800 flex items-center text-sm">
            <TrendingUp className="mr-1" size={14} />
            Comparatif prix
          </h4>
          <button
            onClick={() => setSelectedProductForComparison(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={14} />
          </button>
        </div>
        
        <div className="space-y-2">
          {sortedPrices.slice(0, 3).map((priceInfo, index) => {
            const finalPrice = DatabaseService.calculatePromotionalPrice(priceInfo.price, priceInfo.promotion);
            const isBest = index === 0;
            
            return (
              <div 
                key={priceInfo.storeId}
                className={`flex items-center justify-between p-2 rounded border text-xs ${
                  isBest 
                    ? 'bg-green-50 border-green-300' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center">
                  <Store className={`mr-1 ${isBest ? 'text-green-600' : 'text-gray-500'}`} size={12} />
                  <div>
                    <div className={`font-medium ${isBest ? 'text-green-800' : 'text-gray-800'}`}>
                      {priceInfo.storeName}
                    </div>
                    {priceInfo.promotion && (
                      <div className="text-xs text-red-600">
                        PROMO
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`font-bold ${isBest ? 'text-green-600' : 'text-gray-800'}`}>
                    {finalPrice.toFixed(2)}€
                  </div>
                  {isBest && (
                    <div className="text-xs text-green-600">
                      Meilleur
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
          💡 Économie: {(sortedPrices[sortedPrices.length - 1] ? 
            (DatabaseService.calculatePromotionalPrice(sortedPrices[sortedPrices.length - 1].price, sortedPrices[sortedPrices.length - 1].promotion) - 
             DatabaseService.calculatePromotionalPrice(sortedPrices[0].price, sortedPrices[0].promotion)).toFixed(2) : '0.00')}€
        </div>
      </div>
    );
  };

  const renderPriceHistory = (productId: string) => {
    // Simulation d'historique des prix
    const mockHistory: PriceHistory[] = [
      { date: '15/01', price: 2.99, store: 'Carrefour' },
      { date: '10/01', price: 3.19, store: 'Carrefour' },
      { date: '05/01', price: 2.89, store: 'Carrefour' },
      { date: '01/01', price: 3.09, store: 'Carrefour' }
    ];

    return (
      <div className="bg-white border-2 border-purple-200 rounded-lg p-3 mt-3">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-purple-800 flex items-center text-sm">
            <History className="mr-1" size={14} />
            Historique prix
          </h4>
          <button
            onClick={() => setShowPriceHistory(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={14} />
          </button>
        </div>
        
        <div className="space-y-1">
          {mockHistory.map((entry, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-purple-50 rounded text-xs">
              <span className="text-purple-700">{entry.date}</span>
              <span className="font-medium text-purple-800">{entry.price.toFixed(2)}€</span>
            </div>
          ))}
        </div>
        
        <div className="mt-2 p-2 bg-purple-50 rounded text-xs text-purple-700">
          📈 Tendance: Prix stable ce mois
        </div>
      </div>
    );
  };

  const renderAlternativeProducts = (productId: string) => {
    const product = DatabaseService.getProduct(productId);
    if (!product) return null;

    // Simulation de produits alternatifs moins chers
    const alternatives = DatabaseService.getProductsByCategory(product.category)
      .filter(p => p.id !== productId)
      .slice(0, 2);

    return (
      <div className="bg-white border-2 border-orange-200 rounded-lg p-3 mt-3">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-orange-800 flex items-center text-sm">
            <Lightbulb className="mr-1" size={14} />
            Alternatives moins chères
          </h4>
          <button
            onClick={() => setSelectedProductForComparison(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={14} />
          </button>
        </div>
        
        <div className="space-y-2">
          {alternatives.map(alt => {
            const altPrice = DatabaseService.getBestPriceForProduct(alt.id);
            const currentPrice = DatabaseService.getBestPriceForProduct(productId);
            
            if (!altPrice || !currentPrice) return null;
            
            const savings = DatabaseService.calculatePromotionalPrice(currentPrice.price, currentPrice.promotion) - 
                           DatabaseService.calculatePromotionalPrice(altPrice.price, altPrice.promotion);
            
            return (
              <div key={alt.id} className="flex items-center justify-between p-2 bg-orange-50 rounded border border-orange-200">
                <div className="flex items-center">
                  <span className="text-lg mr-2">{alt.image}</span>
                  <div>
                    <div className="font-medium text-orange-800 text-xs">{alt.name}</div>
                    <div className="text-xs text-orange-600">{alt.brand}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-orange-600 text-xs">
                    {DatabaseService.calculatePromotionalPrice(altPrice.price, altPrice.promotion).toFixed(2)}€
                  </div>
                  {savings > 0 && (
                    <div className="text-xs text-green-600">
                      -{savings.toFixed(2)}€
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* BANNIÈRE PRINCIPALE */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold flex items-center">
            <Camera className="mr-2" size={24} />
            Scanner Magasin
          </h1>
          
          <div className="flex items-center space-x-2">
            {validatedList ? (
              <button
                onClick={onRectifyList}
                className="flex items-center px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm"
              >
                <Edit3 className="mr-1" size={14} />
                Rectifier
              </button>
            ) : (
              <button
                onClick={handleValidateFromDraft}
                className="flex items-center px-3 py-1 bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors text-sm"
              >
                <FileText className="mr-1" size={14} />
                Valider
              </button>
            )}
            
            <div className="flex items-center space-x-1">
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
                {scannedProducts.length}
              </span>
              {donationCount > 0 && (
                <span className="px-2 py-1 bg-pink-500 rounded-full text-xs flex items-center">
                  <Heart className="mr-1" size={10} />
                  {donationCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* LAYOUT PRINCIPAL - 50/50 sur mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        
        {/* PARTIE GAUCHE - Scanner + Liste */}
        <div className="space-y-4">
          
          {/* 1. SCANNER DE PRIX PAR PRODUIT */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-teal-800 mb-3 flex items-center">
              <Scan className="mr-2" size={20} />
              Scanner IA Produits
            </h2>
            
            {/* Interface caméra avec simulation */}
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-dashed border-teal-300 rounded-lg p-4 text-center">
              <div className="relative">
                <Camera className="mx-auto text-teal-500 mb-3" size={48} />
                {(scannerActive || isScanning) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              
              <p className="text-teal-700 font-medium mb-3 text-sm">
                {isScanning ? 'Scan en cours... Reconnaissance IA' : 
                 scannerActive ? 'Scanner actif - Pointez vers le code-barres' : 
                 'Activez le scanner pour commencer'}
              </p>
              
              {lastScannedProduct && !isScanning && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-center mb-2">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    <span className="font-medium text-green-800 text-sm">Produit scanné !</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-2xl mr-2">{lastScannedProduct.image}</span>
                    <div className="text-sm">
                      <div className="font-medium">{lastScannedProduct.name}</div>
                      <div className="text-gray-600">{lastScannedProduct.brand}</div>
                      {(() => {
                        const bestPrice = DatabaseService.getBestPriceForProduct(lastScannedProduct.id);
                        const price = bestPrice ? DatabaseService.calculatePromotionalPrice(bestPrice.price, bestPrice.promotion) : 0;
                        return price > 0 && (
                          <div className="text-emerald-600 font-bold">{price.toFixed(2)}€</div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}
              
              <button
                onClick={handleScannerToggle}
                disabled={isScanning}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                  isScanning 
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : scannerActive 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                <Camera className="inline mr-2" size={16} />
                {isScanning ? 'Scan en cours...' :
                 scannerActive ? 'Arrêter Scanner' : 'Activer Scanner'}
              </button>
              
              {scannerActive && !isScanning && (
                <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
                  🤖 IA activée - Reconnaissance automatique des produits
                </div>
              )}
            </div>
          </div>

          {/* 2. LISTE DE COURSES */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-blue-800 flex items-center">
                <List className="mr-2" size={20} />
                Ma Liste de Courses
              </h2>
              <button
                onClick={() => setShowShoppingList(!showShoppingList)}
                className="text-blue-600 hover:text-blue-800 transition-colors text-sm"
              >
                {showShoppingList ? 'Masquer' : 'Afficher'}
              </button>
            </div>
            
            {showShoppingList && validatedList ? (
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <div className="mb-3">
                  <div className="text-sm font-medium text-blue-800">{validatedList.name}</div>
                  <div className="text-xs text-blue-600">
                    {validatedList.items.length} articles • {validatedList.items.reduce((sum, item) => sum + item.quantity, 0)} unités
                  </div>
                </div>
                
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {validatedList.items.map(item => {
                    const product = DatabaseService.getProduct(item.productId);
                    if (!product) return null;
                    
                    const isScanned = scannedProducts.some(sp => sp.productId === item.productId);
                    
                    return (
                      <div 
                        key={item.id} 
                        className={`flex items-center justify-between p-2 rounded border text-sm ${
                          isScanned 
                            ? 'bg-green-50 border-green-300' 
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex items-center flex-1 min-w-0">
                          <span className="text-lg mr-2">{product.image}</span>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{product.name}</div>
                            <div className="text-xs text-gray-600">Qté: {item.quantity}</div>
                          </div>
                        </div>
                        {isScanned && (
                          <CheckCircle className="text-green-500 ml-2" size={16} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : !validatedList ? (
              <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
                <Package className="mx-auto text-blue-400 mb-2" size={32} />
                <p className="text-blue-700 text-sm font-medium">Aucune liste validée</p>
                <p className="text-blue-600 text-xs">Créez une liste de courses d'abord</p>
              </div>
            ) : (
              <div className="text-center text-gray-500 text-sm py-4">
                Cliquez sur "Afficher" pour voir votre liste
              </div>
            )}
          </div>
        </div>

        {/* PARTIE DROITE - Panier + Récapitulatif */}
        <div className="space-y-4">
          
          {/* 1. PANIER D'ACHATS EN COURS */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-emerald-800 flex items-center">
                <ShoppingCart className="mr-2" size={20} />
                Panier ({scannedProducts.length})
              </h2>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                {scannedProducts.reduce((sum, p) => sum + p.quantity, 0)} articles
              </span>
            </div>
            
            {scannedProducts.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Package className="mx-auto text-gray-400 mb-3" size={40} />
                <p className="text-gray-600 font-medium mb-1 text-sm">Panier vide</p>
                <p className="text-gray-500 text-xs">Scannez des produits pour commencer</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {scannedProducts.map(item => {
                  const product = DatabaseService.getProduct(item.productId);
                  if (!product) return null;

                  const bestPrice = DatabaseService.getBestPriceForProduct(item.productId);
                  const price = bestPrice ? DatabaseService.calculatePromotionalPrice(bestPrice.price, bestPrice.promotion) : 0;

                  return (
                    <div key={item.id}>
                      <div 
                        className={`p-3 rounded-lg border transition-all ${
                          item.donated 
                            ? 'bg-pink-50 border-pink-200' 
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center flex-1 min-w-0">
                            <span className="text-lg mr-2">{product.image}</span>
                            <div className="flex-1 min-w-0">
                              <h4 className={`font-medium text-sm truncate ${item.donated ? 'text-pink-800' : 'text-gray-800'}`}>
                                {product.name}
                              </h4>
                              <p className={`text-xs ${item.donated ? 'text-pink-600' : 'text-gray-600'}`}>
                                {product.brand}
                              </p>
                              {price > 0 && (
                                <div className="flex items-center space-x-1 mt-1">
                                  <span className="text-xs font-semibold text-emerald-600">
                                    {(price * item.quantity).toFixed(2)}€
                                  </span>
                                  {bestPrice?.promotion && (
                                    <span className="text-xs bg-red-100 text-red-600 px-1 rounded">
                                      PROMO
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => setScannedProducts(scannedProducts.filter(p => p.id !== item.id))}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Contrôles quantité */}
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => setSelectedProductForComparison(
                                selectedProductForComparison === item.productId ? null : item.productId
                              )}
                              className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 bg-blue-50 rounded"
                            >
                              <TrendingUp size={12} className="inline mr-1" />
                              Prix
                            </button>
                            
                            <button
                              onClick={() => toggleDonation(item.productId)}
                              className={`flex items-center px-2 py-1 rounded text-xs font-medium transition-all ${
                                item.donated
                                  ? 'bg-pink-500 text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-600'
                              }`}
                            >
                              <Heart 
                                className={`mr-1 ${item.donated ? 'fill-current' : ''}`} 
                                size={10} 
                              />
                              Don
                            </button>
                          </div>
                        </div>

                        {item.donated && (
                          <div className="mt-2 p-2 bg-pink-100 border border-pink-200 rounded text-xs">
                            <div className="flex items-center text-pink-700">
                              <Gift className="mr-1" size={12} />
                              <span className="font-medium">
                                Café suspendu activé
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Comparatif prix inter-enseignes */}
                      {selectedProductForComparison === item.productId && renderPriceComparison(item.productId)}
                      
                      {/* Historique des prix */}
                      {showPriceHistory === item.productId && renderPriceHistory(item.productId)}
                      
                      {/* Suggestions alternatives */}
                      {selectedProductForComparison === item.productId && renderAlternativeProducts(item.productId)}
                      
                      {/* Boutons fonctionnalités supplémentaires */}
                      {selectedProductForComparison === item.productId && (
                        <div className="flex space-x-2 mt-2">
                          <button
                            onClick={() => setShowPriceHistory(showPriceHistory === item.productId ? null : item.productId)}
                            className="flex-1 text-xs text-purple-600 hover:text-purple-800 px-2 py-1 bg-purple-50 rounded border border-purple-200"
                          >
                            <History size={12} className="inline mr-1" />
                            Historique
                          </button>
                          <button
                            onClick={() => {/* Logique suggestions */}}
                            className="flex-1 text-xs text-orange-600 hover:text-orange-800 px-2 py-1 bg-orange-50 rounded border border-orange-200"
                          >
                            <Lightbulb size={12} className="inline mr-1" />
                            Alternatives
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. RÉCAPITULATIF FINANCIER */}
          {scannedProducts.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Euro className="mr-2" size={20} />
                Récapitulatif
              </h2>
              
              <div className="space-y-3">
                {/* Mes achats */}
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-teal-700 text-sm">Mes achats:</span>
                    <span className="text-lg font-bold text-teal-600">
                      {(calculateTotal() - calculateDonationTotal()).toFixed(2)}€
                    </span>
                  </div>
                  <div className="text-xs text-teal-600">
                    {scannedProducts.filter(p => !p.donated).reduce((sum, p) => sum + p.quantity, 0)} articles personnels
                  </div>
                </div>

                {/* Mes dons */}
                {donationCount > 0 && (
                  <div className="bg-pink-50 border border-pink-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <Heart className="mr-1 text-pink-600 fill-current" size={14} />
                        <span className="font-medium text-pink-700 text-sm">Mes dons:</span>
                      </div>
                      <span className="text-lg font-bold text-pink-600">
                        {calculateDonationTotal().toFixed(2)}€
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-pink-600">{donationCount} articles offerts</span>
                      <span className="text-pink-700 font-medium">
                        Déduction: {(calculateDonationTotal() * 0.66).toFixed(2)}€
                      </span>
                    </div>
                  </div>
                )}

                {/* Économies réalisées */}
                {calculateSavings() > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <Target className="mr-1 text-green-600" size={14} />
                        <span className="font-medium text-green-700 text-sm">Économies:</span>
                      </div>
                      <span className="text-lg font-bold text-green-600">
                        -{calculateSavings().toFixed(2)}€
                      </span>
                    </div>
                    <div className="text-xs text-green-600">
                      Grâce au comparateur de prix
                    </div>
                  </div>
                )}

                {/* Total à payer */}
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">Total à payer:</span>
                    <span className="text-2xl font-bold">
                      {calculateTotal().toFixed(2)}€
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs opacity-90">
                    <div className="text-center">
                      <div>Achats: {(calculateTotal() - calculateDonationTotal()).toFixed(2)}€</div>
                    </div>
                    <div className="text-center">
                      <div>Dons: {calculateDonationTotal().toFixed(2)}€</div>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm flex items-center justify-center">
                  <Zap className="mr-2" size={16} />
                  Finaliser mes achats
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InStoreScanner;