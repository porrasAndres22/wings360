
import { useState } from 'react';
import NewSchemaForm from './AdminSchema/NewSchemaForm'
import DataSchema from './AdminSchema/DataSchema'
import { Download, Share2, Plus } from 'lucide-react';

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30 days Oct 16 / 21 - Nov 14 / 21');
  const [showNewSchemaForm, setShowNewSchemaForm] = useState(false);

  // Estados para el formulario
  const [formData, setFormData] = useState({
    schemaName: '',
    description: '',
    category: '',
    dateRange: ''
  });

  const navTabs = ['overview', 'ppc', 'year-to-year', 'customize'];

  const summaryItems = [
    { label: 'Overview', value: '1,552', color: 'bg-blue-100 text-blue-900' },
    { label: 'Campaigns', value: '1,552', color: 'bg-purple-100 text-purple-900' },
    { label: 'Ad Group', value: '1,552', color: 'bg-pink-100 text-pink-900' },
    { label: 'Keywords', value: '1,552', color: 'bg-yellow-100 text-yellow-900' },
  ];

  const metricsCards = [
    {
      title: 'Orders Created',
      value: '$134,970',
      subtitle: '$128,451',
      change: '+12.98%',
      positive: true,
      dark: false,
    },
    {
      title: 'Total Sales',
      value: '$2,145,132.80',
      subtitle: '$2,141,564.20',
      change: '+4.98%',
      positive: true,
      dark: true,
    },
    {
      title: 'PPC Sales',
      value: '$890.00',
      subtitle: '$877.00',
      change: '+0.17%',
      positive: true,
      dark: false,
    },
    {
      title: 'Units Sales',
      value: '$151,740',
      subtitle: '$145,869',
      change: '',
      positive: null,
      dark: false,
    },
    {
      title: 'Organic Sales Ra...',
      value: '100.00%',
      subtitle: '100.00%',
      change: '+0.12%',
      positive: true,
      dark: false,
    },
  ];

  const highestACosCampaigns = [
    { name: 'B08NY9N3MT', spend: '$30.25', sales: '$149.85', acos: '$149.85', indicator: 'A' },
    { name: 'Campaign - 3...', spend: '$40.00', sales: '$134.00', acos: '$134.50', indicator: 'A' },
    { name: 'Research - Ac...', spend: '$43.55', sales: '$129.75', acos: '$125.00', indicator: 'M' },
    { name: 'B087C75QQJ', spend: '$45.85', sales: '$113.00', acos: '$119.45', indicator: 'M' },
    { name: 'House Numbe...', spend: '$54.00', sales: '$99.55', acos: '$85.00', indicator: 'A' },
  ];

  // Manejador de cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejador de envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos del nuevo schema:', formData);
    // Aquí puedes agregar la lógica para guardar el schema
    // Por ahora solo mostramos los datos en consola y volvemos al dashboard
    alert('Schema creado exitosamente!');
    setShowNewSchemaForm(false);
    // Reiniciar formulario
    setFormData({
      schemaName: '',
      description: '',
      category: '',
      dateRange: ''
    });
  };


  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DataSchema summaryItems={summaryItems} highestACosCampaigns={highestACosCampaigns} metricsCards={metricsCards}></DataSchema>
      case 'ppc':
        return <></>
      case 'year-to-year':
        return <></>
      case 'customize':
        return <></>
      default:
        return <></>
    }
  };

  return (
    <div className="min-h-screen from-slate-50 via-white to-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto mb-8">
        {showNewSchemaForm ? (
          // Mostrar formulario de nuevo schema
          <NewSchemaForm formData={formData} setShowNewSchemaForm={setShowNewSchemaForm} handleInputChange={handleInputChange} handleSubmit={handleSubmit}></NewSchemaForm>
        ) : (
          // Mostrar dashboard normal
          <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 bg-white rounded-2xl p-1.5 shadow-sm border border-slate-200 w-fit">
                {navTabs.map((tab, index): any => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`cursor-pointer px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === tab
                      ? 'bg-slate-900 text-white shadow-lg'
                      : 'text-slate-600 hover:bg-slate-50'
                      }`}
                  >
                    {navTabs[index]}
                  </button>
                ))}
              </div>

              {/* Date Range & Actions */}
              <div className="flex items-center gap-3">
                <button className="p-2.5 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
                  <Download size={18} className="text-slate-700" />
                </button>
                <button className="p-2.5 bg-slate-900 rounded-xl hover:bg-slate-800 transition-all shadow-lg">
                  <Share2 size={18} className="text-white" />
                </button>
                <button
                  onClick={() => setShowNewSchemaForm(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg font-medium"
                >
                  <Plus size={18} />
                  Nuevo Schema
                </button>
              </div>
            </div>

            {/* Render Dynamic Content */}
            {renderContent()}
          </>
        )}
      </div>
    </div>
  );
}