
import { useState } from 'react';
import NewSchemaForm from './AdminSchema/NewSchemaForm'
import DataSchema from './AdminSchema/DataSchema'
import { Download, Share2, Plus } from 'lucide-react';

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState('Home');
  const [dateRange, setDateRange] = useState('30 days Oct 16 / 21 - Nov 14 / 21');
  const [showNewSchemaForm, setShowNewSchemaForm] = useState(false);

  // Estados para el formulario
  const [formData, setFormData] = useState({
    schemaName: '',
    description: '',
    category: '',
    dateRange: ''
  });

  const navTabs = ['Home', 'ppc', 'year-to-year', 'customize'];

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
            {activeTab == "Home" ? 
            <div className="animate__animated animate__fadeIn">
              {/* <DataSchema /> */}
              <></>
            </div>
            : ""}
          </>
        )}
      </div>
    </div>
  );
}