import React from 'react';
import { 
  Heart, 
  Clock, 
  QrCode, 
  Shield,
  FileText,
  MessageCircle,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface BeneficiaryServicesProps {
  serviceId: string;
  onBack: () => void;
}

const BeneficiaryServices: React.FC<BeneficiaryServicesProps> = ({ serviceId, onBack }) => {
  const renderServiceContent = () => {
    switch (serviceId) {
      case 'new-request':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Heart className="mr-3 text-orange-600" size={28} />
              Nouvelle Demande d'Aide
            </h2>
            
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-orange-800 mb-4">Demande anonyme sécurisée</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de demande
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option>Aide alimentaire générale</option>
                    <option>Aide d'urgence</option>
                    <option>Produits d'hygiène</option>
                    <option>Produits pour bébé</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Articles souhaités
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'Riz', 'Pâtes', 'Lait', 'Pain', 'Légumes', 'Fruits', 
                      'Conserves', 'Huile', 'Sucre', 'Céréales'
                    ].map((item) => (
                      <label key={item} className="flex items-center">
                        <input type="checkbox" className="mr-2 text-orange-600" />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
                  Envoyer la demande anonyme
                </button>
              </div>
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Clock className="mr-3 text-blue-600" size={28} />
              Historique de mes Demandes
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Colis retirés</h3>
                <p className="text-2xl font-bold text-green-600">8</p>
                <p className="text-sm text-green-600">Ce trimestre</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">En cours</h3>
                <p className="text-2xl font-bold text-yellow-600">2</p>
                <p className="text-sm text-yellow-600">Demandes actives</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Accompagnement</h3>
                <p className="text-xl font-bold text-blue-600">Sophie L.</p>
                <p className="text-sm text-blue-600">Référente</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { id: '1', status: 'collected', items: ['Riz 2kg', 'Lait 4L'], date: '2024-01-12' },
                { id: '2', status: 'approved', items: ['Légumes', 'Fruits'], date: '2024-01-15' },
                { id: '3', status: 'pending', items: ['Pain', 'Céréales'], date: '2024-01-16' }
              ].map((request) => (
                <div key={request.id} className="border-2 border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Demande #{request.id}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      request.status === 'collected' ? 'bg-green-100 text-green-600' :
                      request.status === 'approved' ? 'bg-blue-100 text-blue-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {request.status === 'collected' ? 'Retiré' :
                       request.status === 'approved' ? 'Approuvé' : 'En cours'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {request.items.join(', ')} • {request.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'qr-codes':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <QrCode className="mr-3 text-green-600" size={28} />
              Mes QR Codes Sécurisés
            </h2>
            
            <div className="border-2 border-green-200 rounded-xl p-6 bg-gradient-to-r from-green-50 to-green-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-green-800">QR Code - Demande #1</h3>
                  <p className="text-green-600">Valide pour retrait avec géolocalisation</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-white border-2 border-green-300 rounded-lg flex items-center justify-center mb-2">
                    <QrCode size={48} className="text-green-600" />
                  </div>
                  <p className="text-xs text-green-600 font-mono">QR12024</p>
                </div>
              </div>

              <div className="bg-white border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-2">Instructions de retrait:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Présentez-vous à l'association avec ce QR code</li>
                  <li>• Géolocalisation automatiquement vérifiée</li>
                  <li>• Heures d'ouverture: Mar-Jeu 14h-17h, Sam 9h-12h</li>
                  <li>• Validité: 48h restantes</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Shield className="mr-3 text-purple-600" size={28} />
              Mon Profil Validé
            </h2>
            
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-4">Profil vérifié et sécurisé</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Informations validées:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2" size={16} />
                      <span className="text-sm">Code unique: PDS-2024-156</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2" size={16} />
                      <span className="text-sm">Documents vérifiés par IA (96%)</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2" size={16} />
                      <span className="text-sm">Validation CAF confirmée</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Accompagnement:</h4>
                  <div className="bg-white border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <MessageCircle className="text-blue-500 mr-2" size={16} />
                      <span className="font-medium">Sophie L.</span>
                    </div>
                    <p className="text-sm text-gray-600">Travailleur social référent</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Validation effectuée le 12/01/2024
                    </p>
                  </div>
                </div>
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
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
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

export default BeneficiaryServices;