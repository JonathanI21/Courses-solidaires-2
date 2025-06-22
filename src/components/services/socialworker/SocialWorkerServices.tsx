import React from 'react';
import { 
  UserCheck, 
  ClipboardList, 
  QrCode, 
  AlertTriangle,
  Shield,
  Database,
  Timer,
  Brain,
  CheckCircle,
  XCircle,
  User,
  FileText,
  MapPin
} from 'lucide-react';

interface SocialWorkerServicesProps {
  serviceId: string;
  onBack: () => void;
}

const SocialWorkerServices: React.FC<SocialWorkerServicesProps> = ({ serviceId, onBack }) => {
  const renderValidation = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <UserCheck className="mr-3 text-blue-600" size={28} />
          Validation Sécurisée des Profils
        </h2>
        
        <div className="space-y-6">
          {[
            { 
              name: 'Marie Dubois', 
              familySize: 4, 
              income: '1200€', 
              cafVerified: true,
              confidence: 96,
              priority: 'high'
            },
            { 
              name: 'Ahmed Hassan', 
              familySize: 3, 
              income: '950€', 
              cafVerified: false,
              confidence: 78,
              priority: 'medium'
            }
          ].map((profile, index) => (
            <div key={index} className="border-2 border-gray-200 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-blue-50">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <User className="text-gray-500 mr-3" size={24} />
                  <div>
                    <h3 className="text-lg font-semibold">{profile.name}</h3>
                    <p className="text-gray-600">Code unique: PDS-2024-00{index + 1}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    profile.priority === 'high' 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    Priorité {profile.priority === 'high' ? 'haute' : 'moyenne'}
                  </span>
                  {profile.cafVerified && (
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm flex items-center">
                      <Database className="mr-1" size={14} />
                      CAF ✓
                    </span>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-gray-600">Taille famille</p>
                  <p className="text-lg font-semibold">{profile.familySize} personnes</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-gray-600">Revenus mensuels</p>
                  <p className="text-lg font-semibold">{profile.income}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-gray-600">Confiance IA</p>
                  <p className="text-lg font-semibold">{profile.confidence}%</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button className="flex items-center px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                  <XCircle className="mr-2" size={16} />
                  Rejeter
                </button>
                <button 
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  disabled={!profile.cafVerified}
                >
                  <CheckCircle className="mr-2" size={16} />
                  Valider & Attribuer Code
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnonymousRequests = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <ClipboardList className="mr-3 text-indigo-600" size={28} />
          Demandes Anonymes aux Donateurs
        </h2>
        
        <div className="space-y-6">
          {[
            {
              beneficiary: 'Famille 4 pers. (Code: ***-001)',
              items: ['Riz 2kg', 'Lait 4L', 'Pâtes 1kg'],
              urgency: 'high',
              matchingDonors: 3
            },
            {
              beneficiary: 'Famille 3 pers. (Code: ***-002)',
              items: ['Pain', 'Légumes', 'Produits hygiène'],
              urgency: 'medium',
              matchingDonors: 1
            }
          ].map((request, index) => (
            <div key={index} className="border-2 border-gray-200 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-indigo-50">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{request.beneficiary}</h3>
                  <p className="text-gray-600">Demande anonymisée</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  request.urgency === 'high' 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {request.urgency === 'high' ? 'Urgent' : 'Normal'}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h4 className="font-medium mb-2">Articles demandés:</h4>
                  <div className="flex flex-wrap gap-2">
                    {request.items.map((item, itemIndex) => (
                      <span key={itemIndex} className="px-3 py-1 bg-white border rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Donateurs compatibles:</h4>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold text-blue-600">{request.matchingDonors}</div>
                    <span className="ml-2 text-sm text-gray-600">ménages intéressés</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Shield className="text-blue-600 mr-2" size={20} />
                  <p className="text-blue-800 font-medium">
                    Demande anonymisée - Identité protégée
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderQRCodes = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <QrCode className="mr-3 text-purple-600" size={28} />
          QR Codes Sécurisés (Validité 72h)
        </h2>
        
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-purple-800 mb-4">Générer un nouveau QR Code</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bénéficiaire validé
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                <option>Marie Dubois (PDS-2024-001)</option>
                <option>Ahmed Hassan (PDS-2024-002)</option>
                <option>Sophie Martin (PDS-2024-003)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Association de retrait
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                <option>Restos du Cœur - Marseille</option>
                <option>Secours Populaire - Aix</option>
                <option>Banque Alimentaire - Toulon</option>
              </select>
            </div>
          </div>
          
          <button className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
            <QrCode className="mr-2" size={20} />
            Générer QR Code Sécurisé
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">QR Codes Actifs</h3>
          <div className="space-y-4">
            {[
              { id: 'QR001', beneficiary: 'Marie D.', status: 'active', remainingHours: 48 },
              { id: 'QR002', beneficiary: 'Ahmed H.', status: 'used', remainingHours: 0 }
            ].map((qr, index) => (
              <div key={index} className="border-2 border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <QrCode className="text-purple-600 mr-3" size={24} />
                    <div>
                      <p className="font-medium">{qr.id} - {qr.beneficiary}</p>
                      <p className="text-sm text-gray-600">Géolocalisation requise</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    qr.status === 'active' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {qr.status === 'active' ? 'Actif' : 'Utilisé'}
                  </span>
                </div>

                <div className="text-sm text-gray-600">
                  <p>Temps restant: <span className={`font-bold ${
                    qr.remainingHours > 24 ? 'text-green-600' : 
                    qr.remainingHours > 0 ? 'text-orange-600' : 'text-red-600'
                  }`}>
                    {qr.remainingHours > 0 ? `${qr.remainingHours}h` : 'Expiré'}
                  </span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderKPIDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <AlertTriangle className="mr-3 text-red-600" size={28} />
          Dashboard KPI - Objectifs de Performance
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border-2 border-green-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-green-800">Délai de validation</h3>
              <Timer className="text-green-600" size={24} />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">36h</div>
            <div className="text-sm text-green-600">Objectif: &lt;48h ✓</div>
            <div className="w-full bg-green-200 rounded-full h-2 mt-2">
              <div className="bg-green-600 h-2 rounded-full" style={{width: '75%'}}></div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border-2 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-blue-800">Précision IA Documents</h3>
              <Brain className="text-blue-600" size={24} />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">94%</div>
            <div className="text-sm text-blue-600">Objectif: ≥90% ✓</div>
            <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: '94%'}}></div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border-2 border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-purple-800">Taux d'utilisation QR</h3>
              <QrCode className="text-purple-600" size={24} />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
            <div className="text-sm text-purple-600">Objectif: 98% ✓</div>
            <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{width: '98%'}}></div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Statistiques Mensuelles</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Profils validés</span>
                <span className="font-semibold">23</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Demandes traitées</span>
                <span className="font-semibold">45</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">QR codes générés</span>
                <span className="font-semibold">38</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Familles aidées</span>
                <span className="font-semibold">42</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Intégrations API</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Database className="text-green-500 mr-2" size={16} />
                  <span>API CAF</span>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                  Actif - 98%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="text-blue-500 mr-2" size={16} />
                  <span>Géolocalisation</span>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                  Actif - 100%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="text-purple-500 mr-2" size={16} />
                  <span>Chiffrement AES-256</span>
                </div>
                <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">
                  Actif
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderServiceContent = () => {
    switch (serviceId) {
      case 'validation':
        return renderValidation();
      case 'anonymous-requests':
        return renderAnonymousRequests();
      case 'qr-codes':
        return renderQRCodes();
      case 'kpi-dashboard':
        return renderKPIDashboard();
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">Service en développement</h2>
            <p className="text-gray-500 mb-6">Ce service sera bientôt disponible.</p>
            <button
              onClick={onBack}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
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

export default SocialWorkerServices;