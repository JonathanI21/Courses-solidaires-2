import React from 'react';
import { 
  Package, 
  Truck, 
  QrCode, 
  AlertCircle,
  Scan,
  Bell,
  MapPin,
  Shield
} from 'lucide-react';

interface AssociationServicesProps {
  serviceId: string;
  onBack: () => void;
}

const AssociationServices: React.FC<AssociationServicesProps> = ({ serviceId, onBack }) => {
  const renderServiceContent = () => {
    switch (serviceId) {
      case 'smart-inventory':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Package className="mr-3 text-purple-600" size={28} />
              Gestion Intelligente des Stocks
            </h2>
            <p className="text-gray-600 mb-6">
              Système de gestion des stocks avec alertes automatiques et prédictions IA pour optimiser vos inventaires.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Articles référencés</h3>
                <p className="text-2xl font-bold text-purple-600">132</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">Stocks critiques</h3>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Alertes actives</h3>
                <p className="text-2xl font-bold text-yellow-600">5</p>
              </div>
            </div>
          </div>
        );

      case 'auto-reception':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Truck className="mr-3 text-indigo-600" size={28} />
              Réception Automatisée
            </h2>
            <p className="text-gray-600 mb-6">
              Réception automatique des colis avec scanner IA et mise à jour temps réel des stocks.
            </p>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-indigo-800 mb-4">Scanner automatique actif</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-indigo-600">Scans aujourd'hui</p>
                  <p className="text-2xl font-bold text-indigo-800">127</p>
                </div>
                <div>
                  <p className="text-sm text-indigo-600">Précision IA</p>
                  <p className="text-2xl font-bold text-indigo-800">98%</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'qr-distribution':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <QrCode className="mr-3 text-green-600" size={28} />
              Distribution QR Géolocalisée
            </h2>
            <p className="text-gray-600 mb-6">
              Système de distribution sécurisé avec QR codes géolocalisés et validation temps réel.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">QR validés cette semaine</h3>
                <p className="text-2xl font-bold text-green-600">24</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Taux de validation GPS</h3>
                <p className="text-2xl font-bold text-blue-600">98%</p>
              </div>
            </div>
          </div>
        );

      case 'auto-alerts':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <AlertCircle className="mr-3 text-red-600" size={28} />
              Système d'Alertes Automatiques
            </h2>
            <p className="text-gray-600 mb-6">
              Alertes intelligentes avec IA prédictive pour optimiser la gestion des stocks et des distributions.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800">Stock critique - Lait UHT</h3>
                <p className="text-red-600">Seulement 8 unités restantes (seuil: 15)</p>
              </div>
              <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800">Expiration détectée</h3>
                <p className="text-yellow-600">6 articles expirent dans les 7 prochains jours</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">Service en développement</h2>
            <p className="text-gray-500 mb-6">Ce service sera bientôt disponible.</p>
            <button
              onClick={onBack}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
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

export default AssociationServices;