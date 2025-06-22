import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Search, 
  Check, 
  Trash2, 
  Edit3,
  Save,
  X,
  Package,
  CheckCircle,
  AlertCircle,
  Star,
  Leaf,
  Minus
} from 'lucide-react';
import DatabaseService, { Product, ShoppingList, ShoppingListItem } from '../../../data/database';

interface ShoppingListManagerProps {
  onListValidated: (list: ShoppingList) => void;
  existingList?: ShoppingList | null; // Nouvelle prop pour recevoir une liste existante
}

const ShoppingListManager: React.FC<ShoppingListManagerProps> = ({ onListValidated, existingList }) => {
  const [currentList, setCurrentList] = useState<ShoppingListItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('fruits-legumes');
  const [listName, setListName] = useState('Ma liste de courses');
  const [editingName, setEditingName] = useState(false);
  const [listStatus, setListStatus] = useState<'draft' | 'validated' | 'error'>('draft');

  const categories = [
    { id: 'fruits-legumes', name: 'Fruits et Légumes', icon: '🥕', color: 'green' },
    { id: 'produits-laitiers', name: 'Produits laitiers', icon: '🥛', color: 'blue' },
    { id: 'feculents', name: 'Féculents', icon: '🍞', color: 'yellow' },
    { id: 'viandes-poissons', name: 'Viandes et Poissons', icon: '🍗', color: 'red' },
    { id: 'epicerie', name: 'Épicerie', icon: '🥫', color: 'purple' }
  ];

  // Charger une liste existante si elle existe (priorité à existingList)
  useEffect(() => {
    if (existingList) {
      // Si une liste existante est passée en prop (cas de rectification)
      setCurrentList(existingList.items);
      setListName(existingList.name);
      setListStatus('draft'); // Remettre en mode brouillon pour modification
    } else {
      // Sinon, chercher une liste brouillon dans le localStorage
      const draftList = DatabaseService.getShoppingLists().find(list => list.status === 'draft');
      if (draftList) {
        setCurrentList(draftList.items);
        setListName(draftList.name);
        setListStatus('draft');
      }
    }
  }, [existingList]);

  // Sauvegarder automatiquement en tant que brouillon à chaque modification
  useEffect(() => {
    if (currentList.length > 0) {
      const draftList: ShoppingList = {
        id: existingList?.id || Date.now().toString(),
        name: listName,
        items: currentList,
        status: 'draft',
        createdAt: existingList?.createdAt || new Date(),
        totalEstimated: 0 // Sera calculé lors de la validation
      };
      DatabaseService.saveShoppingList(draftList);
    }
  }, [currentList, listName, existingList]);

  const addProductToList = (product: Product) => {
    const existingItem = currentList.find(item => item.productId === product.id);
    
    if (existingItem) {
      setCurrentList(currentList.map(item => 
        item.productId === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      const newItem: ShoppingListItem = {
        id: Date.now().toString(),
        productId: product.id,
        quantity: 1,
        priority: 'medium',
        addedAt: new Date()
      };
      setCurrentList([...currentList, newItem]);
    }
  };

  const removeFromList = (itemId: string) => {
    setCurrentList(currentList.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromList(itemId);
      return;
    }
    
    setCurrentList(currentList.map(item => 
      item.id === itemId 
        ? { ...item, quantity }
        : item
    ));
  };

  const updatePriority = (itemId: string, priority: 'low' | 'medium' | 'high') => {
    setCurrentList(currentList.map(item => 
      item.id === itemId 
        ? { ...item, priority }
        : item
    ));
  };

  const validateList = () => {
    if (currentList.length === 0) {
      setListStatus('error');
      return;
    }

    // Calculer le total estimé (pour usage interne uniquement)
    const totalEstimated = currentList.reduce((total, item) => {
      const bestPrice = DatabaseService.getBestPriceForProduct(item.productId);
      const price = bestPrice ? DatabaseService.calculatePromotionalPrice(bestPrice.price, bestPrice.promotion) : 0;
      return total + (price * item.quantity);
    }, 0);

    const newList: ShoppingList = {
      id: existingList?.id || Date.now().toString(),
      name: listName,
      items: currentList,
      status: 'validated',
      createdAt: existingList?.createdAt || new Date(),
      validatedAt: new Date(),
      totalEstimated
    };

    DatabaseService.saveShoppingList(newList);
    setListStatus('validated');
    onListValidated(newList);
  };

  const getScoreColor = (score: string) => {
    switch (score) {
      case 'A': return 'text-green-600 bg-green-100';
      case 'B': return 'text-lime-600 bg-lime-100';
      case 'C': return 'text-yellow-600 bg-yellow-100';
      case 'D': return 'text-orange-600 bg-orange-100';
      case 'E': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getCategoryColor = (categoryId: string, isActive: boolean) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return '';
    
    if (isActive) {
      switch (category.color) {
        case 'green': return 'bg-green-600 text-white border-green-600';
        case 'blue': return 'bg-blue-600 text-white border-blue-600';
        case 'yellow': return 'bg-yellow-600 text-white border-yellow-600';
        case 'red': return 'bg-red-600 text-white border-red-600';
        case 'purple': return 'bg-purple-600 text-white border-purple-600';
        default: return 'bg-gray-600 text-white border-gray-600';
      }
    } else {
      switch (category.color) {
        case 'green': return 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100';
        case 'blue': return 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100';
        case 'yellow': return 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100';
        case 'red': return 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100';
        case 'purple': return 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100';
        default: return 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100';
      }
    }
  };

  const filteredProducts = searchTerm 
    ? DatabaseService.searchProducts(searchTerm).filter(p => p.category === activeCategory)
    : DatabaseService.getProductsByCategory(activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* BANNIÈRE PRINCIPALE */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ShoppingCart className="mr-3" size={28} />
            {editingName ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  className="text-xl font-semibold bg-white/20 border-b-2 border-white focus:outline-none text-white placeholder-white/70 px-2 py-1 rounded"
                  onBlur={() => setEditingName(false)}
                  onKeyPress={(e) => e.key === 'Enter' && setEditingName(false)}
                  autoFocus
                />
                <button
                  onClick={() => setEditingName(false)}
                  className="text-white hover:text-emerald-200"
                >
                  <Save size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold">{listName}</h1>
                <button
                  onClick={() => setEditingName(true)}
                  className="text-white/80 hover:text-white"
                >
                  <Edit3 size={20} />
                </button>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {existingList && (
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm flex items-center">
                <Edit3 className="mr-1" size={16} />
                Mode rectification
              </span>
            )}
            {listStatus === 'validated' && (
              <span className="px-3 py-1 bg-green-500 rounded-full text-sm flex items-center">
                <CheckCircle className="mr-1" size={16} />
                Liste validée
              </span>
            )}
            {listStatus === 'error' && (
              <span className="px-3 py-1 bg-red-500 rounded-full text-sm flex items-center">
                <AlertCircle className="mr-1" size={16} />
                Erreur: Liste vide
              </span>
            )}
            <div className="flex items-center space-x-1">
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
                {currentList.length} articles
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Message informatif en mode rectification */}
      {existingList && (
        <div className="bg-blue-50 border-b border-blue-200 p-4">
          <div className="flex items-center text-blue-800">
            <Edit3 className="mr-2" size={16} />
            <span className="font-medium">Mode rectification activé</span>
          </div>
          <p className="text-sm text-blue-700 mt-1">
            Vous pouvez modifier votre liste existante. Les produits déjà sélectionnés sont conservés.
          </p>
        </div>
      )}

      {/* LAYOUT PRINCIPAL - 50/50 sur mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        
        {/* PARTIE GAUCHE - Catalogue produits */}
        <div className="space-y-4">
          
          {/* 1. CATALOGUE PRODUITS */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <Package className="mr-2" size={20} />
                Catalogue Produits
              </h2>
              <div className="text-sm text-gray-600">
                {DatabaseService.getAllProductsWithPrices().length} produits
              </div>
            </div>

            {/* Barre de recherche */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                />
              </div>
            </div>

            {/* Onglets des catégories */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => {
                  const isActive = activeCategory === category.id;
                  const categoryProducts = DatabaseService.getProductsByCategory(category.id);
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center px-3 py-2 rounded-lg border-2 font-medium transition-all text-sm ${getCategoryColor(category.id, isActive)}`}
                    >
                      <span className="text-base mr-1">{category.icon}</span>
                      <span className="hidden sm:inline">{category.name}</span>
                      <span className="ml-1 px-1 py-0.5 rounded-full text-xs bg-white/20">
                        {categoryProducts.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Produits de la catégorie active - FORMAT ÉTIQUETTES SANS PRIX */}
            <div className="max-h-96 overflow-y-auto">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-600 font-medium">
                    {searchTerm ? 'Aucun produit trouvé' : 'Aucun produit dans cette catégorie'}
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {filteredProducts.map(product => {
                    const isInList = currentList.some(item => item.productId === product.id);
                    
                    return (
                      <button
                        key={product.id}
                        onClick={() => addProductToList(product)}
                        className={`inline-flex items-center px-3 py-2 rounded-full border-2 transition-all text-sm ${
                          isInList 
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-800 shadow-md' 
                            : 'bg-white border-gray-200 text-gray-800 hover:border-emerald-300 hover:bg-emerald-50'
                        }`}
                      >
                        <span className="text-base mr-2">{product.image}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium truncate max-w-24">
                            {product.name}
                          </span>
                          
                          {/* Scores nutritionnels */}
                          <div className="flex items-center space-x-1">
                            <span className={`px-1 py-0.5 rounded text-xs font-medium ${getScoreColor(product.nutriScore)}`}>
                              {product.nutriScore}
                            </span>
                            <span className={`px-1 py-0.5 rounded text-xs font-medium ${getScoreColor(product.ecoScore)}`}>
                              {product.ecoScore}
                            </span>
                          </div>
                          
                          {isInList && (
                            <span className="px-1 py-0.5 bg-emerald-200 text-emerald-700 rounded text-xs font-medium">
                              ✓
                            </span>
                          )}
                          
                          {/* Bouton d'ajout */}
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            isInList 
                              ? 'bg-emerald-600 text-white' 
                              : 'bg-gray-300 text-gray-600'
                          }`}>
                            <Plus size={10} />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PARTIE DROITE - Ma liste */}
        <div className="space-y-4">
          
          {/* 1. MA LISTE DE COURSES */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-emerald-800 flex items-center">
                <ShoppingCart className="mr-2" size={20} />
                Ma liste de courses
              </h2>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                {currentList.length} articles
              </span>
            </div>
            
            {currentList.length === 0 ? (
              <div className="text-center py-12">
                <Package className="mx-auto text-emerald-400 mb-4" size={48} />
                <p className="text-emerald-700 font-medium mb-2">
                  Votre liste est vide
                </p>
                <p className="text-emerald-600 text-sm">
                  Ajoutez des produits depuis le catalogue
                </p>
              </div>
            ) : (
              <>
                {/* Affichage en étiquettes compactes */}
                <div className="mb-6 max-h-80 overflow-y-auto">
                  <div className="flex flex-wrap gap-2">
                    {currentList.map(item => {
                      const product = DatabaseService.getProduct(item.productId);
                      if (!product) return null;

                      return (
                        <div 
                          key={item.id} 
                          className={`inline-flex items-center bg-emerald-50 border rounded-full px-3 py-2 text-sm ${getPriorityColor(item.priority)}`}
                        >
                          <span className="text-base mr-2">{product.image}</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-emerald-800 truncate max-w-24">
                              {product.name}
                            </span>
                            
                            {/* Contrôles quantité compacts */}
                            <div className="flex items-center space-x-1 bg-white rounded-full px-2 py-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-4 h-4 flex items-center justify-center text-emerald-600 hover:bg-emerald-100 rounded-full transition-colors"
                              >
                                <Minus size={8} />
                              </button>
                              <span className="text-xs font-bold text-emerald-800 min-w-[12px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-4 h-4 flex items-center justify-center text-emerald-600 hover:bg-emerald-100 rounded-full transition-colors"
                              >
                                <Plus size={8} />
                              </button>
                            </div>

                            {/* Bouton suppression */}
                            <button
                              onClick={() => removeFromList(item.id)}
                              className="w-4 h-4 flex items-center justify-center text-red-500 hover:text-red-700 transition-colors"
                            >
                              <X size={10} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Légende des priorités */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Priorités :</h4>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 bg-red-100 text-red-600 border border-red-200 rounded-full">
                      Urgent
                    </span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-600 border border-yellow-200 rounded-full">
                      Moyen
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-600 border border-green-200 rounded-full">
                      Faible
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Cliquez sur un produit pour modifier sa priorité
                  </p>
                </div>

                {/* Résumé et validation */}
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium opacity-90">Articles</div>
                      <div className="text-lg font-bold">{currentList.length}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium opacity-90">Quantité totale</div>
                      <div className="text-lg font-bold">
                        {currentList.reduce((total, item) => total + item.quantity, 0)}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={validateList}
                    disabled={currentList.length === 0}
                    className={`w-full py-3 rounded-lg font-medium transition-all ${
                      currentList.length === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-emerald-600 hover:bg-emerald-50 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {listStatus === 'validated' ? (
                      <span className="flex items-center justify-center">
                        <CheckCircle className="mr-2" size={20} />
                        Liste validée ✓
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Check className="mr-2" size={20} />
                        {existingList ? 'Valider les modifications' : 'Valider ma liste'}
                      </span>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingListManager;