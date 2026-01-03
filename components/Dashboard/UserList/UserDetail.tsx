import { Search, Calendar, Grid3x3, List, Mail, Phone, MapPin, MoreVertical, UserPlus, ArrowLeft, MessageSquare, History, Edit, Save, X } from 'lucide-react';
import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  profileImage: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  location: string;
}

export default ({ selectedUser, handleBackToDashboard, getStatusBadge }: {
  selectedUser: User | null,
  handleBackToDashboard: () => void,
  getStatusBadge: any
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(selectedUser);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedUser(selectedUser);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUser(selectedUser);
  };

  const handleSaveEdit = () => {
    // Aquí puedes agregar la lógica para guardar los cambios
    // Por ejemplo, hacer un API call
    console.log('Guardando cambios:', editedUser);
    setIsEditing(false);
    // Actualizar el usuario seleccionado con los cambios
    // selectedUser = editedUser; // Esto dependerá de cómo manejes el estado global
  };

  const handleInputChange = (field: keyof User, value: string) => {
    if (editedUser) {
      setEditedUser({
        ...editedUser,
        [field]: value
      });
    }
  };

  const currentUser = isEditing ? editedUser : selectedUser;

  return (
    <div className="min-h-screen from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8 font-['Instrument_Sans',sans-serif] animate__animated animate__fadeIn">
      <div className="max-w-5xl mx-auto">
        {/* Back Button and Edit/Save/Cancel Buttons */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBackToDashboard}
            className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 rounded-2xl transition-all shadow-sm border border-slate-200"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">Volver a usuarios</span>
          </button>

          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancelEdit}
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-all shadow-sm"
                >
                  <X className="w-5 h-5" />
                  <span className="text-sm font-medium">Cancelar</span>
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl transition-all shadow-sm"
                >
                  <Save className="w-5 h-5" />
                  <span className="text-sm font-medium">Guardar</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleEditClick}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-all shadow-sm"
              >
                <Edit className="w-5 h-5" />
                <span className="text-sm font-medium">Editar</span>
              </button>
            )}
          </div>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-200/60 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <img
              src={currentUser?.profileImage}
              alt={currentUser?.name}
              className="w-24 h-24 rounded-3xl object-cover shadow-lg ring-4 ring-white"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-6xl shadow-lg hidden">
              {currentUser?.avatar}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editedUser?.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-4xl font-bold text-slate-900 mb-2 bg-slate-50 rounded-xl px-3 py-1 border-2 border-blue-300 focus:border-blue-500 outline-none w-full"
                  />
                  <input
                    type="text"
                    value={editedUser?.role || ''}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="text-xl text-slate-600 mb-3 bg-slate-50 rounded-xl px-3 py-1 border-2 border-blue-300 focus:border-blue-500 outline-none w-full"
                  />
                </>
              ) : (
                <>
                  <h1 className="text-4xl font-bold text-slate-900 mb-2">{currentUser?.name}</h1>
                  <p className="text-xl text-slate-600 mb-3">{currentUser?.role}</p>
                </>
              )}
              <div className="flex items-center gap-3">
                {getStatusBadge(currentUser?.status)}
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  {currentUser?.department}
                </span>
              </div>
            </div>
            {!isEditing && (
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-medium transition-all shadow-lg shadow-blue-600/30">
                  <MessageSquare className="w-5 h-5" />
                  Enviar Mensaje
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-medium transition-all">
                  <History className="w-5 h-5" />
                  Ver Historial
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-8 border border-slate-200/60">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              Información de Contacto
            </h2>

            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-5 hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                  <Mail className="w-4 h-4" />
                  <span className="font-medium">Email</span>
                </div>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedUser?.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="text-blue-600 font-medium text-lg break-all bg-white rounded-lg px-3 py-2 border-2 border-blue-300 focus:border-blue-500 outline-none w-full"
                  />
                ) : (
                  <a
                    href={`mailto:${currentUser?.email}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-lg break-all"
                  >
                    {currentUser?.email}
                  </a>
                )}
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">Teléfono</span>
                </div>
                {isEditing ? (
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="text-slate-900 font-medium text-lg bg-white rounded-lg px-3 py-2 border-2 border-blue-300 focus:border-blue-500 outline-none w-full"
                  />
                ) : (
                  <p className="text-slate-900 font-medium text-lg">+1 (555) 123-4567</p>
                )}
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">Ubicación</span>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser?.location || ''}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="text-slate-900 font-medium text-lg bg-white rounded-lg px-3 py-2 border-2 border-blue-300 focus:border-blue-500 outline-none w-full"
                  />
                ) : (
                  <p className="text-slate-900 font-medium text-lg">{currentUser?.location}</p>
                )}
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">Fecha de Ingreso</span>
                </div>
                {isEditing ? (
                  <input
                    type="date"
                    value={editedUser?.joinDate || ''}
                    onChange={(e) => handleInputChange('joinDate', e.target.value)}
                    className="text-slate-900 font-medium text-lg bg-white rounded-lg px-3 py-2 border-2 border-blue-300 focus:border-blue-500 outline-none w-full"
                  />
                ) : (
                  <p className="text-slate-900 font-medium text-lg">{currentUser?.joinDate}</p>
                )}
              </div>
            </div>
          </div>

          {/* Work Information */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-8 border border-slate-200/60">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              Información Laboral
            </h2>

            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-5 hover:bg-slate-100 transition-colors">
                <div className="text-slate-500 text-sm mb-2 font-medium">Cargo</div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser?.role || ''}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="text-slate-900 font-semibold text-lg bg-white rounded-lg px-3 py-2 border-2 border-blue-300 focus:border-blue-500 outline-none w-full"
                  />
                ) : (
                  <p className="text-slate-900 font-semibold text-lg">{currentUser?.role}</p>
                )}
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 hover:bg-slate-100 transition-colors">
                <div className="text-slate-500 text-sm mb-2 font-medium">Departamento</div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser?.department || ''}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="text-blue-700 font-semibold text-base bg-white rounded-lg px-3 py-2 border-2 border-blue-300 focus:border-blue-500 outline-none w-full"
                  />
                ) : (
                  <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-base font-semibold">
                    {currentUser?.department}
                  </span>
                )}
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 hover:bg-slate-100 transition-colors">
                <div className="text-slate-500 text-sm mb-2 font-medium">ID de Empleado</div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser?.id || ''}
                    onChange={(e) => handleInputChange('id', e.target.value)}
                    className="text-slate-900 font-semibold text-lg bg-white rounded-lg px-3 py-2 border-2 border-blue-300 focus:border-blue-500 outline-none w-full"
                    placeholder="ID de empleado"
                  />
                ) : (
                  <p className="text-slate-900 font-semibold text-lg">EMP-{currentUser?.id.padStart(5, '0')}</p>
                )}
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 hover:bg-slate-100 transition-colors">
                <div className="text-slate-500 text-sm mb-2 font-medium">Reporta a</div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center text-xl">
                    👤
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      defaultValue="John Smith"
                      className="text-slate-900 font-semibold text-lg bg-white rounded-lg px-3 py-2 border-2 border-blue-300 focus:border-blue-500 outline-none flex-1"
                    />
                  ) : (
                    <p className="text-slate-900 font-semibold text-lg">John Smith</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics & Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Performance Stats */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 p-6 border border-slate-200/60">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Rendimiento</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-600">Proyectos Activos</span>
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-600">Tareas Completadas</span>
                  <span className="text-2xl font-bold text-emerald-600">127</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Time Tracking */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 p-6 border border-slate-200/60">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Tiempo</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div>
                  <div className="text-sm text-slate-600">Horas este mes</div>
                  <div className="text-2xl font-bold text-slate-900">156h</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div>
                  <div className="text-sm text-slate-600">Promedio diario</div>
                  <div className="text-2xl font-bold text-slate-900">7.8h</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Vacation Info */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 p-6 border border-slate-200/60">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Vacaciones</h3>
            <div className="space-y-4">
              <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl">
                <div className="text-5xl font-bold text-amber-600 mb-2">12</div>
                <div className="text-sm text-amber-700 font-medium">Días disponibles</div>
              </div>
              <div className="flex justify-between text-sm">
                <div className="text-center">
                  <div className="text-xl font-bold text-slate-900">8</div>
                  <div className="text-slate-600">Usados</div>
                </div>
                <div className="w-px bg-slate-200"></div>
                <div className="text-center">
                  <div className="text-xl font-bold text-slate-900">20</div>
                  <div className="text-slate-600">Total anual</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-8 border border-slate-200/60 mt-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Actividad Reciente</h2>
          <div className="space-y-4">
            {[
              { action: 'Completó la tarea "Diseño de wireframes"', time: 'Hace 2 horas', color: 'emerald' },
              { action: 'Se unió al proyecto "Rediseño de Dashboard"', time: 'Hace 5 horas', color: 'blue' },
              { action: 'Actualizó el documento de especificaciones', time: 'Ayer', color: 'purple' },
              { action: 'Comentó en "Revisión de código"', time: 'Hace 2 días', color: 'amber' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                <div className={`w-10 h-10 rounded-xl bg-${activity.color}-100 flex items-center justify-center flex-shrink-0 mt-1`}>
                  <div className={`w-3 h-3 rounded-full bg-${activity.color}-500`}></div>
                </div>
                <div className="flex-1">
                  <p className="text-slate-900 font-medium">{activity.action}</p>
                  <p className="text-slate-500 text-sm mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}