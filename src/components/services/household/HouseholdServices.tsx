import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Camera, 
  Heart, 
  Car, 
  TrendingUp,
  Gift,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import ShoppingListManager from './ShoppingListManager';
import InStoreScanner from './InStoreScanner';
import PriceComparator from './PriceComparator';
import DatabaseService, { ShoppingList } from '../../../data/database';

interface HouseholdServicesProps {
  serviceId: string;
  onBack: () => void;
}

const HouseholdServices: React.FC<HouseholdServicesProps> = ({ serviceId, onBack }) => {
  const [validatedList, setValidatedList] = useState<ShoppingList | null>(null);
  const [currentService, setCurrentService] = useState<string>(serviceId);
  const [listToRectify, setListToRectify] = useState<ShoppingList | null>(null);

  // Charger la liste validée au démarrage
  useEffect(() => {
    const existingList = DatabaseService.getValidatedList();
    if (existingList) {
      setValidatedList(existingList);
    }
  }, []);

  const handleListValidated = (list: ShoppingList) => {
    setValidatedList(list);
    setListToRectify(null); // Réinitialiser la liste à rectifier
    // Rediriger automatiquement vers le scanner après validation
    setCurrentService('scanner');
  };

  const handleListUpdated = (list: ShoppingList) => {
    setValidatedList(list);
    DatabaseService.saveShoppingList(list);
  };

  const handleNavigateToShoppingList = () => {
    setListToRectify(null); // Mode création normale
    setCurrentService('shopping-list');
  };

  const handleRectifyList = () => {
    if (validatedList) {
      setListToRectify(validatedList); // Passer la liste à rectifier
      setCurrentService('shopping-list');
    }
  };

  const renderDonations = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <Heart className="mr-3 text-pink-600" size={28} />
        Mes Dons Solidaires & Reçus Fiscaux
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-pink-800 mb-4">Faire un don</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Articles à donner
              </label>
              <div className="space-y-2">
                {['Riz 1kg', 'Pâtes 500g', 'Conserves', 'Lait UHT'].map((item) => (
                  <label key={item} className="flex items-center">
                    <input type="checkbox" className="mr-2 text-pink-600" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
            <button className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors">
              Confirmer le don
            </button>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4">Mes reçus fiscaux</h3>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded border">
              <div className="flex justify-between items-center">
                <span className="font-medium">Don janvier 2024</span>
                <span className="text-green-600 font-semibold">45€</span>
              </div>
              <p className="text-sm text-gray-600">Déduction: 29.70€</p>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="flex justify-between items-center">
                <span className="font-medium">Don décembre 2023</span>
                <span className="text-green-600 font-semibold">32€</span>
              </div>
              <p className="text-sm text-gray-600">Déduction: 21.12€</p>
            </div>
          </div>
          <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
            Télécharger tous les reçus
          </button>
        </div>
      </div>
    </div>
  );

  const renderTransportServices = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <Car className="mr-3 text-indigo-600" size={28} />
        Services de Transport
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-indigo-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-indigo-800 mb-4">Covoiturage</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Tarif de base:</span>
              <span className="font-semibold">15€</span>
            </div>
            <div className="flex justify-between">
              <span>Par kilomètre:</span>
              <span className="font-semibold">0.60€</span>
            </div>
            <div className="flex justify-between">
              <span>Commission app:</span>
              <span className="font-semibold">15%</span>
            </div>
          </div>
          <button className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
            Réserver un covoiturage
          </button>
        </div>

        <div className="border border-purple-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-800 mb-4">Livraison</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Tarif de base:</span>
              <span className="font-semibold">25€</span>
            </div>
            <div className="flex justify-between">
              <span>Par kilomètre:</span>
              <span className="font-semibold">0.60€</span>
            </div>
            <div className="flex justify-between">
              <span>Commission app:</span>
              <span className="font-semibold">20%</span>
            </div>
          </div>
          <button className="w-full mt-4 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
            Commander une livraison
          </button>
        </div>
      </div>
    </div>
  );

  const renderPromotions = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <Gift className="mr-3 text-purple-600" size={28} />
        Flyers Promotionnels
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {['Carrefour', 'Leclerc', 'Auchan'].map((store) => (
          <div key={store} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold mb-3">{store}</h3>
            <div className="space-y-2 text-sm">
              <div className="bg-red-100 text-red-800 p-2 rounded">
                -30% sur les fruits et légumes
              </div>
              <div className="bg-blue-100 text-blue-800 p-2 rounded">
                2+1 gratuit sur les yaourts
              </div>
              <div className="bg-green-100 text-green-800 p-2 rounded">
                -20% sur les produits bio
              </div>
            </div>
            <button className="w-full mt-4 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors">
              Voir toutes les promos
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderServiceContent = () => {
    switch (currentService) {
      case 'shopping-list':
        return (
          <ShoppingListManager 
            onListValidated={handleListValidated} 
            existingList={listToRectify}
          />
        );
      case 'scanner':
        return (
          <InStoreScanner 
            validatedList={validatedList} 
            onListUpdated={handleListUpdated}
            onNavigateToShoppingList={handleNavigateToShoppingList}
            onRectifyList={handleRectifyList}
          />
        );
      case 'price-comparison':
        return <PriceComparator validatedList={validatedList} />;
      case 'donations':
        return renderDonations();
      case 'transport-services':
        return renderTransportServices();
      case 'promotions':
        return renderPromotions();
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">Service en développement</h2>
            <p className="text-gray-500 mb-6">Ce service sera bientôt disponible.</p>
            <button
              onClick={onBack}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Retour aux services
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {renderServiceContent()}
    </div>
  );
};

export default HouseholdServices;