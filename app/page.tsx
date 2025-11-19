"use client"
import React, { useState } from 'react';
import { 
  LayoutGrid, 
  Users, 
  ClipboardList, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  CheckCircle2,
  MoreHorizontal,
  ChevronRight,
  Filter,
  ArrowLeft,
  Save,
  Send,
  Eye,
  Plus,
  UserPlus,
  UserX,
  UserCheck,
  MoreVertical,
  Pencil,
  CalendarRange,
  CalendarDays,
  X,
  ListChecks,
  Trash2
} from 'lucide-react';

// --- COMPONENTES DE UI (Estilo Fluent) ---

const FluentButton = ({ children, primary, className, onClick, disabled }: any) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`px-6 py-2 rounded-[4px] text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2
    ${primary 
      ? 'bg-[#0078D4] text-white hover:bg-[#106EBE] active:bg-[#005A9E] shadow-sm' 
      : 'bg-white text-[#242424] border border-[#8A8886] hover:bg-[#F3F2F1]'} 
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}`}
  >
    {children}
  </button>
);

const FluentInput = ({ type, placeholder, label, value, onChange }: any) => (
  <div className="flex flex-col gap-1.5 mb-4">
    {label && <label className="text-sm font-semibold text-[#242424]">{label}</label>}
    <input 
      type={type} 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-2.5 text-sm border-b border-[#8A8886] bg-[#F3F2F1] rounded-t-[4px] focus:border-b-2 focus:border-[#0078D4] focus:bg-white outline-none transition-colors hover:bg-[#E1DFDD]"
    />
  </div>
);

const FluentCard = ({ title, icon: Icon, subtitle, status, children, className }: any) => (
  <div className={`bg-white p-4 rounded-[8px] shadow-[0_1.6px_3.6px_0_rgba(0,0,0,0.13),0_0.3px_0.9px_0_rgba(0,0,0,0.11)] hover:shadow-[0_3.2px_7.2px_0_rgba(0,0,0,0.13),0_0.6px_1.8px_0_rgba(0,0,0,0.11)] transition-shadow border border-transparent hover:border-[#E1DFDD] ${className}`}>
    {(title || Icon) && (
      <div className="flex justify-between items-start mb-3">
        {Icon && (
          <div className="p-2 bg-[#F3F2F1] rounded-full text-[#0078D4]">
            <Icon size={20} />
          </div>
        )}
        {(title || subtitle) && (
            <div className={Icon ? "ml-3 flex-1" : "flex-1"}>
                {title && <h3 className="font-semibold text-[#242424]">{title}</h3>}
                {subtitle && <p className="text-xs text-[#605E5C]">{subtitle}</p>}
            </div>
        )}
      </div>
    )}
    
    {status && (
      <div className="flex items-center gap-2 text-xs font-medium mb-2">
        <span className={`w-2 h-2 rounded-full ${status === 'Active' ? 'bg-green-500' : 'bg-orange-400'}`}></span>
        <span className="text-[#605E5C]">{status}</span>
      </div>
    )}
    {children}
  </div>
);

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-[4px] text-sm transition-colors 
    ${active ? 'bg-[#EFF6FC] text-[#0078D4] font-semibold relative after:content-[""] after:absolute after:left-0 after:top-2 after:bottom-2 after:w-[3px] after:bg-[#0078D4] after:rounded-r' : 'text-[#201F1E] hover:bg-[#F3F2F1]'}`}
  >
    <Icon size={20} />
    <span className="hidden lg:block">{label}</span>
  </button>
);

// Componente de Escala de Calificación (Texto) estilo Microsoft Forms
const RatingScale = ({ value, onChange, readOnly }: any) => {
  const options = [
    { val: 1, label: "Nunca" },
    { val: 2, label: "Casi nunca" },
    { val: 3, label: "A veces" },
    { val: 4, label: "Frecuentemente" },
    { val: 5, label: "Siempre" }
  ];

  return (
    <div className={`flex flex-wrap gap-2 mt-2 ${readOnly ? 'opacity-90 pointer-events-none' : ''}`}>
      {options.map((opt) => (
        <button
          key={opt.val}
          onClick={() => !readOnly && onChange(opt.val)}
          className={`px-3 py-2 rounded-[4px] text-xs sm:text-sm font-medium transition-all duration-200 border flex-1 sm:flex-none
            ${value === opt.val 
              ? 'bg-[#0078D4] text-white border-[#0078D4] shadow-sm ring-2 ring-[#E1DFDD]' 
              : `bg-white text-[#242424] border-[#8A8886] ${!readOnly ? 'hover:bg-[#EFF6FC] hover:border-[#0078D4]' : ''}`}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---

export default function AppPrototype() {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'app'
  const [userRole, setUserRole] = useState('user'); // 'admin', 'user'
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'evaluations', 'settings', 'employees', 'perform_evaluation'
  const [settingsTab, setSettingsTab] = useState('periods'); // 'periods', 'competencies'
  const [email, setEmail] = useState('');
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null);
  const [formResponses, setFormResponses] = useState<any>({});
  const [isReadOnly, setIsReadOnly] = useState(false); // Nuevo estado para modo lectura

  // --- ESTADO DE COMPETENCIAS (DINÁMICO) ---
  const [competencies, setCompetencies] = useState([
    {
      id: 1,
      competencia: "Liderazgo y Gestión",
      aspectos: [
        { id: "c1_a1", question: "Demuestra capacidad para motivar e inspirar al equipo." },
        { id: "c1_a2", question: "Toma decisiones efectivas bajo presión." }
      ]
    },
    {
      id: 2,
      competencia: "Trabajo en Equipo",
      aspectos: [
        { id: "c2_a1", question: "Colabora activamente compartiendo conocimientos." },
        { id: "c2_a2", question: "Mantiene una actitud positiva ante conflictos." }
      ]
    },
    {
      id: 3,
      competencia: "Comunicación Efectiva",
      aspectos: [
        { id: "c3_a1", question: "Escucha atentamente y respeta las opiniones de otros." },
        { id: "c3_a2", question: "Transmite ideas de manera clara y concisa." }
      ]
    }
  ]);

  // Estado para la gestión de empleados
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState<number | null>(null);
  const [employeeForm, setEmployeeForm] = useState({ name: '', email: '', department: '', role: '' });
  
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Juan Pérez', email: 'juan.perez@empresa.com', department: 'Ventas', role: 'Gerente', status: 'Active' },
    { id: 2, name: 'Ana García', email: 'ana.garcia@empresa.com', department: 'Marketing', role: 'Analista', status: 'Active' },
    { id: 3, name: 'Carlos López', email: 'carlos.lopez@empresa.com', department: 'TI', role: 'Desarrollador', status: 'Inactive' },
    { id: 4, name: 'Maria Rodriguez', email: 'maria.rodriguez@empresa.com', department: 'RRHH', role: 'Coordinadora', status: 'Active' },
  ]);

  // Estado para gestión de Periodos
  const [showPeriodModal, setShowPeriodModal] = useState(false);
  const [isEditingPeriod, setIsEditingPeriod] = useState(false);
  const [currentPeriodId, setCurrentPeriodId] = useState<number | null>(null);
  const [periodForm, setPeriodForm] = useState({ name: '', startDate: '', endDate: '', status: 'Active' });
  
  const [periods, setPeriods] = useState([
    { id: 1, name: 'Evaluación Anual 2024', startDate: '2024-01-01', endDate: '2024-12-31', status: 'Closed' },
    { id: 2, name: 'Evaluación Q1 2025', startDate: '2025-01-01', endDate: '2025-03-31', status: 'Active' },
  ]);

  // Estado para gestión de Competencias (Modal)
  const [showCompetencyModal, setShowCompetencyModal] = useState(false);
  const [isEditingCompetency, setIsEditingCompetency] = useState(false);
  const [currentCompetencyId, setCurrentCompetencyId] = useState<number | null>(null);
  const [competencyForm, setCompetencyForm] = useState<{competencia: string, aspectos: {id: string, question: string}[]}>({ competencia: '', aspectos: [] });

  // Datos Simulados de Evaluaciones
  const myEvaluations = [
    { 
        id: 1, 
        collaborator: 'Administrador Principal', 
        relation: 'Autoevaluación', 
        status: 'Finalizado', 
        action: 'Ver',
        responses: { "c1_a1": 5, "c1_a2": 4, "c2_a1": 5, "c2_a2": 5, "c3_a1": 4, "c3_a2": 5 } 
    },
    { 
        id: 2, 
        collaborator: 'Usuario de Prueba', 
        relation: 'Subalterno', 
        status: 'Finalizado', 
        action: 'Ver',
        responses: { "c1_a1": 3, "c1_a2": 4, "c2_a1": 2, "c2_a2": 3, "c3_a1": 4, "c3_a2": 3 }
    },
    { 
        id: 3, 
        collaborator: 'Prueba2', 
        relation: 'Par', 
        status: 'Pendiente', 
        action: 'Evaluar',
        responses: {} 
    },
    { 
        id: 4, 
        collaborator: 'Gerente de Ventas', 
        relation: 'Jefe Directo', 
        status: 'Pendiente', 
        action: 'Evaluar',
        responses: {}
    },
  ];

  const handleLogin = () => {
    if (email.includes('admin')) {
      setUserRole('admin');
    } else {
      setUserRole('user');
    }
    setCurrentView('app');
    setActiveTab('dashboard');
  };

  // --- FUNCIONES DE EVALUACION ---
  const startEvaluation = (evaluation: any) => {
    setSelectedEvaluation(evaluation);
    setFormResponses({});
    setIsReadOnly(false); 
    setActiveTab('perform_evaluation');
  };

  const viewEvaluation = (evaluation: any) => {
    setSelectedEvaluation(evaluation);
    setFormResponses(evaluation.responses || {}); 
    setIsReadOnly(true); 
    setActiveTab('perform_evaluation');
  };

  const handleResponseChange = (questionId: string, value: any) => {
    if (isReadOnly) return; 
    setFormResponses((prev: any) => ({
      ...prev,
      [questionId]: value
    }));
  };

  // --- FUNCIONES DE EMPLEADOS ---
  const toggleEmployeeStatus = (id: number) => {
    setEmployees(employees.map(emp => 
        emp.id === id 
            ? { ...emp, status: emp.status === 'Active' ? 'Inactive' : 'Active' }
            : emp
    ));
  };

  const openAddModal = () => {
    setEmployeeForm({ name: '', email: '', department: '', role: '' });
    setIsEditing(false);
    setCurrentEmployeeId(null);
    setShowEmployeeModal(true);
  };

  const openEditModal = (emp: any) => {
    setEmployeeForm({ name: emp.name, email: emp.email, department: emp.department, role: emp.role });
    setIsEditing(true);
    setCurrentEmployeeId(emp.id);
    setShowEmployeeModal(true);
  };

  const handleSaveEmployee = () => {
    if(!employeeForm.name || !employeeForm.email) return;
    
    if (isEditing && currentEmployeeId) {
        // Editar existente
        setEmployees(employees.map(emp => 
            emp.id === currentEmployeeId ? { ...emp, ...employeeForm } : emp
        ));
    } else {
        // Crear nuevo
        const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
        setEmployees([...employees, { ...employeeForm, id: newId, status: 'Active' }]);
    }
    setShowEmployeeModal(false);
    setEmployeeForm({ name: '', email: '', department: '', role: '' });
  };

  // --- FUNCIONES DE PERIODOS ---
  const openAddPeriodModal = () => {
    setPeriodForm({ name: '', startDate: '', endDate: '', status: 'Active' });
    setIsEditingPeriod(false);
    setCurrentPeriodId(null);
    setShowPeriodModal(true);
  };

  const openEditPeriodModal = (period: any) => {
    setPeriodForm({ ...period });
    setIsEditingPeriod(true);
    setCurrentPeriodId(period.id);
    setShowPeriodModal(true);
  };

  const handleSavePeriod = () => {
     if(!periodForm.name || !periodForm.startDate) return;
     
     if (isEditingPeriod && currentPeriodId) {
         setPeriods(periods.map(p => 
            p.id === currentPeriodId ? { ...p, ...periodForm } : p
         ));
     } else {
         const newId = periods.length > 0 ? Math.max(...periods.map(p => p.id)) + 1 : 1;
         setPeriods([...periods, { ...periodForm, id: newId } as any]);
     }
     setShowPeriodModal(false);
  };

  // --- FUNCIONES DE COMPETENCIAS ---
  const openAddCompetencyModal = () => {
      setCompetencyForm({ competencia: '', aspectos: [{ id: `new_${Date.now()}`, question: '' }] });
      setIsEditingCompetency(false);
      setCurrentCompetencyId(null);
      setShowCompetencyModal(true);
  };

  const openEditCompetencyModal = (comp: any) => {
      setCompetencyForm({ 
          competencia: comp.competencia, 
          aspectos: comp.aspectos.map((a: any) => ({...a})) // Deep copy de aspectos
      });
      setIsEditingCompetency(true);
      setCurrentCompetencyId(comp.id);
      setShowCompetencyModal(true);
  };

  const handleAddAspectToForm = () => {
      setCompetencyForm({
          ...competencyForm,
          aspectos: [...competencyForm.aspectos, { id: `temp_${Date.now()}`, question: '' }]
      });
  };

  const handleRemoveAspectFromForm = (index: number) => {
      const newAspects = [...competencyForm.aspectos];
      newAspects.splice(index, 1);
      setCompetencyForm({ ...competencyForm, aspectos: newAspects });
  };

  const handleChangeAspectQuestion = (index: number, value: string) => {
      const newAspects = [...competencyForm.aspectos];
      newAspects[index].question = value;
      setCompetencyForm({ ...competencyForm, aspectos: newAspects });
  };

  const handleSaveCompetency = () => {
      if (!competencyForm.competencia) return;
      // Filtrar preguntas vacías
      const validAspects = competencyForm.aspectos.filter(a => a.question.trim() !== '');
      
      if (validAspects.length === 0) {
          alert("Debe agregar al menos una pregunta (aspecto) a la competencia.");
          return;
      }

      const finalData = {
          competencia: competencyForm.competencia,
          aspectos: validAspects.map(a => ({ ...a, id: a.id.startsWith('temp_') ? `c${currentCompetencyId || 'new'}_a${Math.random()}` : a.id }))
      };

      if (isEditingCompetency && currentCompetencyId) {
          setCompetencies(competencies.map(c => 
              c.id === currentCompetencyId ? { ...c, ...finalData } : c
          ));
      } else {
          const newId = competencies.length > 0 ? Math.max(...competencies.map(c => c.id)) + 1 : 1;
          setCompetencies([...competencies, { id: newId, ...finalData }]);
      }
      setShowCompetencyModal(false);
  };

  const handleDeleteCompetency = (id: number) => {
      if (confirm('¿Está seguro de eliminar esta competencia?')) {
          setCompetencies(competencies.filter(c => c.id !== id));
      }
  };


  // --- VISTA LOGIN ---
  if (currentView === 'login') {
    return (
      <div 
        className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center relative"
        style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div>
        <div className="relative z-10 bg-white p-10 rounded-[8px] shadow-2xl w-full max-w-[440px]">
          <div className="flex items-center gap-2 mb-8">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-2.5 h-2.5 bg-[#F25022]"></div>
              <div className="w-2.5 h-2.5 bg-[#7FBA00]"></div>
              <div className="w-2.5 h-2.5 bg-[#00A4EF]"></div>
              <div className="w-2.5 h-2.5 bg-[#FFB900]"></div>
            </div>
            <span className="font-semibold text-xl text-[#5E5E5E]">360 Evaluation</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1b1b1b] mb-2">Iniciar sesión</h1>
          <p className="text-sm text-[#242424] mb-6">Prosiga a su portal de evaluación</p>
          <FluentInput 
            type="email"
            label="Correo electrónico"
            placeholder="usuario@empresa.com"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <FluentInput type="password" placeholder="Contraseña" label="Contraseña" />
          <div className="flex justify-end gap-3 mt-8">
            <FluentButton onClick={handleLogin} primary className="w-32 shadow-md">
              Siguiente
            </FluentButton>
          </div>
        </div>
      </div>
    );
  }

  // --- LAYOUT PRINCIPAL ---
  return (
    <div className="min-h-screen bg-[#FAF9F8] flex font-sans text-[#201F1E]">
      {/* Sidebar */}
      <aside className="w-16 lg:w-64 bg-[#FFFFFF] border-r border-[#E1DFDD] flex flex-col transition-all duration-300 shadow-[1px_0_3px_rgba(0,0,0,0.05)] z-10">
        <div className="p-4 flex items-center gap-3 mb-6">
           <div className="grid grid-cols-2 gap-0.5 shrink-0">
              <div className="w-2 h-2 bg-[#F25022]"></div>
              <div className="w-2 h-2 bg-[#7FBA00]"></div>
              <div className="w-2 h-2 bg-[#00A4EF]"></div>
              <div className="w-2 h-2 bg-[#FFB900]"></div>
            </div>
            <span className="font-bold text-lg hidden lg:block">Evaluación</span>
        </div>

        <nav className="flex-1 px-2 space-y-1">
          <SidebarItem 
            icon={LayoutGrid} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
          />
          
          {userRole === 'admin' && (
            <>
              <SidebarItem 
                icon={Users} 
                label="Empleados" 
                active={activeTab === 'employees'}
                onClick={() => setActiveTab('employees')}
              />
              <SidebarItem 
                icon={Settings} 
                label="Configuración" 
                active={activeTab === 'settings'}
                onClick={() => setActiveTab('settings')}
              />
            </>
          )}

          <SidebarItem 
            icon={ClipboardList} 
            label="Mis Evaluaciones" 
            active={activeTab === 'evaluations' || activeTab === 'perform_evaluation'}
            onClick={() => setActiveTab('evaluations')}
          />
        </nav>

        <div className="p-2 border-t border-[#E1DFDD]">
          <button onClick={() => setCurrentView('login')} className="flex items-center gap-3 w-full p-2 text-[#201F1E] hover:bg-[#F3F2F1] rounded-[4px]">
            <LogOut size={20} />
            <span className="text-sm font-medium hidden lg:block">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <header className="h-14 bg-white border-b border-[#E1DFDD] flex items-center justify-between px-6 shadow-sm shrink-0">
          <div className="flex items-center bg-[#F3F2F1] px-3 py-1.5 rounded-[4px] w-full max-w-md">
            <Search size={16} className="text-[#605E5C]" />
            <input type="text" placeholder="Buscar..." className="bg-transparent border-none outline-none text-sm ml-2 w-full placeholder-[#605E5C]" />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-[#605E5C] hover:text-[#0078D4]"><Bell size={20} /></button>
            <div className="w-8 h-8 rounded-full bg-[#0078D4] text-white flex items-center justify-center text-xs font-bold shadow-sm cursor-default">
              {userRole === 'admin' ? 'AD' : 'US'}
            </div>
          </div>
        </header>

        {/* Área de Contenido Dinámica */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">
            
            {/* ================= DASHBOARD VIEW ================= */}
            {activeTab === 'dashboard' && (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl font-semibold mb-1">
                    {userRole === 'admin' ? 'Panel de Administración' : 'Mi Espacio de Trabajo'}
                  </h1>
                  <p className="text-[#605E5C]">
                    {userRole === 'admin' 
                      ? 'Gestione las evaluaciones activas y el personal.' 
                      : 'Bienvenido de nuevo, aquí están tus tareas pendientes.'}
                  </p>
                </div>

                {userRole === 'admin' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-[#0078D4] text-white p-4 rounded-[8px] shadow-md col-span-1 md:col-span-2">
                      <h3 className="text-lg font-semibold">Evaluación Q4 2025</h3>
                      <p className="opacity-90 text-sm mb-4">Periodo actual en curso</p>
                      <div className="text-3xl font-bold mb-1">78%</div>
                      <p className="text-xs opacity-80">Completado por la organización</p>
                    </div>
                    <FluentCard title="Usuarios Activos" icon={Users} subtitle="Total empleados registrados" status="124 Total" />
                    <FluentCard title="Pendientes" icon={CheckCircle2} subtitle="Evaluaciones sin finalizar" status="23 Alertas" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="cursor-pointer" onClick={() => setActiveTab('evaluations')}>
                        <FluentCard title="Autoevaluación" icon={ClipboardList} subtitle="Pendiente de envío" status="Vence en 2 días" />
                    </div>
                    <div className="cursor-pointer" onClick={() => setActiveTab('evaluations')}>
                        <FluentCard title="Evaluación de Pares" icon={Users} subtitle="Evaluar a: Juan Pérez" status="Active" />
                    </div>
                    <FluentCard title="Resultados Históricos" icon={CheckCircle2} subtitle="Ver feedback anterior" />
                  </div>
                )}
              </>
            )}

            {/* ================= EMPLEADOS VIEW (ADMIN) ================= */}
            {activeTab === 'employees' && userRole === 'admin' && (
                <div className="animate-in fade-in duration-300">
                    {/* ... existing employee code ... */}
                    <div className="mb-6 flex justify-between items-end">
                        <div>
                            <h1 className="text-2xl font-semibold mb-1 text-[#242424]">Gestión de Empleados</h1>
                            <p className="text-[#605E5C] text-sm">Administre el acceso y la información de los usuarios del sistema.</p>
                        </div>
                        <div className="flex gap-3">
                             <button className="flex items-center gap-2 text-[#605E5C] border border-[#8A8886] bg-white hover:bg-[#F3F2F1] px-4 py-2 rounded-[4px] text-sm font-medium transition-colors">
                                <Filter size={16} />
                                Filtrar
                            </button>
                            <FluentButton primary onClick={openAddModal}>
                                <UserPlus size={18} /> Agregar Empleado
                            </FluentButton>
                        </div>
                    </div>

                    <div className="bg-white rounded-[8px] shadow-[0_1.6px_3.6px_0_rgba(0,0,0,0.13),0_0.3px_0.9px_0_rgba(0,0,0,0.11)] border border-[#E1DFDD] overflow-hidden">
                        {/* Header de Tabla */}
                        <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#E1DFDD] bg-[#FAFAFA] text-xs font-semibold text-[#605E5C] uppercase tracking-wider">
                            <div className="col-span-4">Nombre / Email</div>
                            <div className="col-span-3">Departamento / Cargo</div>
                            <div className="col-span-3">Estado</div>
                            <div className="col-span-2 text-center">Acciones</div>
                        </div>
                        
                        {/* Cuerpo de Tabla */}
                        <div className="divide-y divide-[#E1DFDD]">
                            {employees.map((emp) => (
                                <div key={emp.id} className={`grid grid-cols-12 gap-4 p-4 items-center transition-colors group ${emp.status === 'Inactive' ? 'bg-gray-50 opacity-75' : 'hover:bg-[#F3F2F1]'}`}>
                                    <div className="col-span-4 flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white ${emp.status === 'Inactive' ? 'bg-gray-400' : 'bg-[#0078D4]'}`}>
                                            {emp.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-[#242424]">{emp.name}</p>
                                            <p className="text-xs text-[#605E5C]">{emp.email}</p>
                                        </div>
                                    </div>
                                    <div className="col-span-3">
                                        <p className="text-sm text-[#242424]">{emp.department}</p>
                                        <p className="text-xs text-[#605E5C]">{emp.role}</p>
                                    </div>
                                    <div className="col-span-3">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5
                                            ${emp.status === 'Active' 
                                                ? 'bg-[#DFF6DD] text-[#107C10]' 
                                                : 'bg-[#FDE7E9] text-[#A80000]'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${emp.status === 'Active' ? 'bg-[#107C10]' : 'bg-[#A80000]'}`}></span>
                                            {emp.status === 'Active' ? 'Activo' : 'Inhabilitado'}
                                        </span>
                                    </div>
                                    <div className="col-span-2 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => openEditModal(emp)}
                                            title="Editar Información"
                                            className="p-2 text-[#605E5C] hover:bg-[#EFF6FC] hover:text-[#0078D4] rounded-[4px]"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button 
                                            onClick={() => toggleEmployeeStatus(emp.id)}
                                            title={emp.status === 'Active' ? "Inhabilitar Usuario" : "Habilitar Usuario"}
                                            className={`p-2 rounded-[4px] transition-colors ${emp.status === 'Active' ? 'hover:bg-[#FDE7E9] text-[#A80000]' : 'hover:bg-[#DFF6DD] text-[#107C10]'}`}
                                        >
                                            {emp.status === 'Active' ? <UserX size={18} /> : <UserCheck size={18} />}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ================= CONFIGURACION VIEW (ADMIN) ================= */}
            {activeTab === 'settings' && userRole === 'admin' && (
                <div className="animate-in fade-in duration-300">
                    <div className="mb-6 flex justify-between items-end">
                        <div>
                            <h1 className="text-2xl font-semibold mb-1 text-[#242424]">Configuración</h1>
                            <p className="text-[#605E5C] text-sm">Gestione los periodos y modelos de evaluación.</p>
                        </div>
                    </div>
                    
                    {/* TABS DE CONFIGURACIÓN */}
                    <div className="flex items-center gap-6 mb-6 border-b border-[#E1DFDD]">
                        <button 
                            onClick={() => setSettingsTab('periods')}
                            className={`pb-2 text-sm font-medium transition-all relative ${settingsTab === 'periods' ? 'text-[#0078D4] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#0078D4] after:rounded-t' : 'text-[#605E5C] hover:text-[#242424]'}`}
                        >
                            Periodos
                        </button>
                        <button 
                            onClick={() => setSettingsTab('competencies')}
                            className={`pb-2 text-sm font-medium transition-all relative ${settingsTab === 'competencies' ? 'text-[#0078D4] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#0078D4] after:rounded-t' : 'text-[#605E5C] hover:text-[#242424]'}`}
                        >
                            Competencias
                        </button>
                    </div>

                    {/* TAB: PERIODOS */}
                    {settingsTab === 'periods' && (
                    <div className="animate-in fade-in">
                        <div className="flex justify-end mb-4">
                             <FluentButton primary onClick={openAddPeriodModal}>
                                <CalendarRange size={18} /> Nuevo Periodo
                            </FluentButton>
                        </div>
                        <div className="bg-white rounded-[8px] shadow-[0_1.6px_3.6px_0_rgba(0,0,0,0.13),0_0.3px_0.9px_0_rgba(0,0,0,0.11)] border border-[#E1DFDD] overflow-hidden">
                            <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#E1DFDD] bg-[#FAFAFA] text-xs font-semibold text-[#605E5C] uppercase tracking-wider">
                                <div className="col-span-4">Nombre del Periodo</div>
                                <div className="col-span-2">Inicio</div>
                                <div className="col-span-2">Fin</div>
                                <div className="col-span-2">Estado</div>
                                <div className="col-span-2 text-center">Acciones</div>
                            </div>
                            
                            <div className="divide-y divide-[#E1DFDD]">
                                {periods.map((period) => (
                                    <div key={period.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#F3F2F1] transition-colors group">
                                        <div className="col-span-4 flex items-center gap-3">
                                            <div className="p-2 bg-[#EFF6FC] rounded text-[#0078D4]">
                                                <CalendarDays size={20} />
                                            </div>
                                            <span className="text-sm font-semibold text-[#242424]">{period.name}</span>
                                        </div>
                                        <div className="col-span-2 text-sm text-[#605E5C]">{period.startDate}</div>
                                        <div className="col-span-2 text-sm text-[#605E5C]">{period.endDate}</div>
                                        <div className="col-span-2">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5
                                                ${period.status === 'Active' 
                                                    ? 'bg-[#DFF6DD] text-[#107C10]' 
                                                    : 'bg-[#F3F2F1] text-[#605E5C]'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${period.status === 'Active' ? 'bg-[#107C10]' : 'bg-[#605E5C]'}`}></span>
                                                {period.status === 'Active' ? 'Activo' : 'Cerrado'}
                                            </span>
                                        </div>
                                        <div className="col-span-2 flex justify-center gap-2">
                                            <button 
                                                onClick={() => openEditPeriodModal(period)}
                                                className="p-2 text-[#605E5C] hover:bg-[#EFF6FC] hover:text-[#0078D4] rounded-[4px]"
                                                title="Editar Periodo"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    )}

                    {/* TAB: COMPETENCIAS */}
                    {settingsTab === 'competencies' && (
                        <div className="animate-in fade-in">
                            <div className="flex justify-end mb-4">
                                <FluentButton primary onClick={openAddCompetencyModal}>
                                    <ListChecks size={18} /> Nueva Competencia
                                </FluentButton>
                            </div>

                            <div className="space-y-4">
                                {competencies.map((comp) => (
                                    <div key={comp.id} className="bg-white p-4 rounded-[8px] shadow-sm border border-[#E1DFDD] hover:border-[#0078D4] transition-colors group">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-[#EFF6FC] text-[#0078D4] rounded-full flex items-center justify-center font-bold text-sm">
                                                    {comp.id}
                                                </div>
                                                <h3 className="font-semibold text-[#242424] text-lg">{comp.competencia}</h3>
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                 <button 
                                                    onClick={() => openEditCompetencyModal(comp)}
                                                    className="p-2 text-[#605E5C] hover:bg-[#EFF6FC] hover:text-[#0078D4] rounded-[4px]"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteCompetency(comp.id)}
                                                    className="p-2 text-[#605E5C] hover:bg-[#FDE7E9] hover:text-[#A80000] rounded-[4px]"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="pl-11">
                                            <p className="text-xs font-semibold text-[#605E5C] uppercase mb-2">Preguntas (Aspectos)</p>
                                            <ul className="list-disc list-inside text-sm text-[#242424] space-y-1">
                                                {comp.aspectos.map((asp: any) => (
                                                    <li key={asp.id} className="text-[#605E5C]">{asp.question}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ================= MIS EVALUACIONES VIEW (LISTA) ================= */}
            {activeTab === 'evaluations' && (
              <>
                <div className="mb-6 flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-semibold mb-1 text-[#242424]">Mis Evaluaciones</h1>
                        <p className="text-[#605E5C] text-sm">Gestione sus evaluaciones pendientes y revise su historial.</p>
                    </div>
                    <button className="flex items-center gap-2 text-[#0078D4] font-medium hover:bg-[#F3F2F1] px-3 py-2 rounded transition-colors">
                        <Filter size={16} />
                        <span className="text-sm">Filtrar</span>
                    </button>
                </div>

                <div className="bg-white rounded-[8px] shadow-[0_1.6px_3.6px_0_rgba(0,0,0,0.13),0_0.3px_0.9px_0_rgba(0,0,0,0.11)] border border-[#E1DFDD] overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#E1DFDD] bg-[#FAFAFA] text-xs font-semibold text-[#605E5C] uppercase tracking-wider">
                        <div className="col-span-4">Colaborador a Evaluar</div>
                        <div className="col-span-3">Tipo de Relación</div>
                        <div className="col-span-3">Estado</div>
                        <div className="col-span-2 text-center">Acción</div>
                    </div>

                    <div className="divide-y divide-[#E1DFDD]">
                        {myEvaluations.map((item) => (
                            <div key={item.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#F3F2F1] transition-colors text-sm group">
                                <div className="col-span-4 font-medium text-[#242424] flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#E1DFDD] flex items-center justify-center text-xs font-bold text-[#605E5C]">
                                        {item.collaborator.charAt(0)}
                                    </div>
                                    {item.collaborator}
                                </div>
                                <div className="col-span-3 text-[#605E5C]">{item.relation}</div>
                                <div className="col-span-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5
                                        ${item.status === 'Finalizado' ? 'bg-[#DFF6DD] text-[#107C10]' : 'bg-[#FFF4CE] text-[#795E00]'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Finalizado' ? 'bg-[#107C10]' : 'bg-[#795E00]'}`}></span>
                                        {item.status}
                                    </span>
                                </div>
                                <div className="col-span-2 flex justify-center">
                                    {item.action === 'Evaluar' ? (
                                        <button 
                                          onClick={() => startEvaluation(item)}
                                          className="bg-[#0078D4] hover:bg-[#106EBE] text-white text-xs font-semibold px-4 py-1.5 rounded shadow-sm transition-all active:scale-95 w-24"
                                        >
                                            Evaluar
                                        </button>
                                    ) : (
                                        <button 
                                          onClick={() => viewEvaluation(item)}
                                          className="bg-[#F3F2F1] hover:bg-[#E1DFDD] border border-[#E1DFDD] text-[#242424] text-xs font-semibold px-4 py-1.5 rounded shadow-sm transition-all active:scale-95 w-24"
                                        >
                                            Ver
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-2 bg-[#FAFAFA] border-t border-[#E1DFDD] flex justify-end">
                         <div className="text-xs text-[#605E5C] px-4 py-2">Mostrando 1-4 de 4</div>
                    </div>
                </div>
              </>
            )}

            {/* ================= FORMULARIO DE EVALUACIÓN (USANDO COMPETENCIAS DINÁMICAS) ================= */}
            {activeTab === 'perform_evaluation' && selectedEvaluation && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="mb-6 flex items-center justify-between">
                    <button 
                        onClick={() => setActiveTab('evaluations')}
                        className="flex items-center gap-2 text-[#605E5C] hover:text-[#242424] transition-colors"
                    >
                        <ArrowLeft size={18} />
                        <span className="text-sm font-medium">Volver a la lista</span>
                    </button>
                    
                    {!isReadOnly && (
                        <div className="flex gap-2">
                            <FluentButton className="text-[#242424]" onClick={() => {}}>
                                <Save size={16} /> Guardar borrador
                            </FluentButton>
                        </div>
                    )}
                </div>

                <div className={`bg-white p-6 rounded-[8px] shadow-sm border border-[#E1DFDD] mb-6 border-l-[6px] ${isReadOnly ? 'border-l-[#107C10]' : 'border-l-[#0078D4]'}`}>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-[#242424] mb-1">
                                {isReadOnly ? 'Detalle de Evaluación Completada' : 'Evaluación de Competencias'}
                            </h1>
                            <p className="text-[#605E5C] mb-4">
                                {isReadOnly 
                                    ? 'Esta evaluación ya ha sido enviada y no se puede modificar.' 
                                    : 'Complete el siguiente formulario evaluando objetivamente el desempeño.'}
                            </p>
                        </div>
                        {isReadOnly && (
                            <span className="bg-[#DFF6DD] text-[#107C10] px-3 py-1 rounded-full text-xs font-bold border border-[#107C10]/20 flex items-center gap-2">
                                <CheckCircle2 size={14} /> Finalizada
                            </span>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-8 pt-4 border-t border-[#E1DFDD]">
                        <div>
                            <p className="text-xs font-bold text-[#605E5C] uppercase tracking-wider mb-1">Colaborador</p>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-[#0078D4] text-white text-xs flex items-center justify-center">
                                    {selectedEvaluation.collaborator.charAt(0)}
                                </div>
                                <span className="text-sm font-semibold text-[#242424]">{selectedEvaluation.collaborator}</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-[#605E5C] uppercase tracking-wider mb-1">Relación</p>
                            <span className="bg-[#F3F2F1] text-[#242424] px-2 py-0.5 rounded text-sm">{selectedEvaluation.relation}</span>
                        </div>
                    </div>
                </div>

                {/* Loop de Competencias (DINÁMICO) */}
                <div className="space-y-6 pb-20">
                    {competencies.map((comp) => (
                        <div key={comp.id} className="bg-white rounded-[8px] shadow-sm border border-[#E1DFDD] overflow-hidden">
                            <div className="bg-[#FAFAFA] px-6 py-4 border-b border-[#E1DFDD]">
                                <h2 className="text-lg font-semibold text-[#0078D4]">{comp.competencia}</h2>
                            </div>
                            
                            <div className="divide-y divide-[#E1DFDD]">
                                {comp.aspectos.map((aspect) => (
                                    <div key={aspect.id} className="p-6 hover:bg-[#FEFEFE] transition-colors">
                                        <p className="text-[#242424] font-medium mb-3">{aspect.question}</p>
                                        
                                        <div className="w-full max-w-3xl">
                                            <p className="text-xs text-[#605E5C] mb-2 uppercase font-semibold">Frecuencia</p>
                                            <RatingScale 
                                                value={formResponses[aspect.id]} 
                                                readOnly={isReadOnly}
                                                onChange={(val: any) => handleResponseChange(aspect.id, val)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <FluentCard className="bg-white">
                        <h3 className="font-semibold text-[#242424] mb-2">Feedback General Adicional</h3>
                        <p className="text-xs text-[#605E5C] mb-3">Si desea agregar comentarios generales sobre el desempeño.</p>
                        <textarea 
                            disabled={isReadOnly}
                            className={`w-full p-3 text-sm border border-[#8A8886] bg-[#F3F2F1] rounded-[4px] focus:border-b-2 focus:border-b-[#0078D4] focus:bg-white outline-none min-h-[100px] ${isReadOnly ? 'opacity-70 cursor-not-allowed' : ''}`}
                            placeholder={isReadOnly ? 'Sin comentarios adicionales.' : "Escriba aquí sus comentarios finales..."}
                        ></textarea>
                    </FluentCard>

                    {!isReadOnly && (
                        <div className="flex justify-end pt-4">
                            <FluentButton primary onClick={() => {
                                alert("Evaluación enviada con éxito");
                                setActiveTab('evaluations');
                            }} className="w-48 py-3">
                                <Send size={18} /> Finalizar Evaluación
                            </FluentButton>
                        </div>
                    )}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ================= MODAL AGREGAR/EDITAR EMPLEADO ================= */}
        {showEmployeeModal && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-end z-50 animate-in fade-in duration-200">
                <div className="w-full max-w-md h-full bg-white shadow-2xl border-l border-[#E1DFDD] flex flex-col animate-in slide-in-from-right duration-300">
                    <div className="p-6 border-b border-[#E1DFDD] flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-[#242424]">
                            {isEditing ? 'Editar Empleado' : 'Nuevo Empleado'}
                        </h2>
                        <button onClick={() => setShowEmployeeModal(false)} className="text-[#605E5C] hover:text-[#242424]">
                            <X size={24} />
                        </button>
                    </div>
                    <div className="p-6 flex-1 overflow-auto">
                        <p className="text-sm text-[#605E5C] mb-6">
                            {isEditing 
                                ? 'Modifique la información del colaborador.' 
                                : 'Ingrese la información básica del nuevo colaborador para darle acceso a la plataforma.'}
                        </p>
                        
                        <FluentInput 
                            label="Nombre Completo" 
                            placeholder="Ej. Maria Gonzales" 
                            value={employeeForm.name}
                            onChange={(e:any) => setEmployeeForm({...employeeForm, name: e.target.value})}
                        />
                        <FluentInput 
                            label="Correo Electrónico" 
                            placeholder="usuario@empresa.com" 
                            type="email"
                            value={employeeForm.email}
                            onChange={(e:any) => setEmployeeForm({...employeeForm, email: e.target.value})}
                        />
                        <FluentInput 
                            label="Departamento" 
                            placeholder="Ej. Finanzas" 
                            value={employeeForm.department}
                            onChange={(e:any) => setEmployeeForm({...employeeForm, department: e.target.value})}
                        />
                        <FluentInput 
                            label="Cargo / Puesto" 
                            placeholder="Ej. Analista Senior" 
                            value={employeeForm.role}
                            onChange={(e:any) => setEmployeeForm({...employeeForm, role: e.target.value})}
                        />
                    </div>
                    <div className="p-6 border-t border-[#E1DFDD] bg-[#FAFAFA] flex justify-end gap-3">
                        <FluentButton onClick={() => setShowEmployeeModal(false)}>Cancelar</FluentButton>
                        <FluentButton primary onClick={handleSaveEmployee}>
                            {isEditing ? 'Guardar Cambios' : 'Guardar y Enviar Invitación'}
                        </FluentButton>
                    </div>
                </div>
            </div>
        )}

        {/* ================= MODAL AGREGAR/EDITAR PERIODO ================= */}
        {showPeriodModal && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-end z-50 animate-in fade-in duration-200">
                <div className="w-full max-w-md h-full bg-white shadow-2xl border-l border-[#E1DFDD] flex flex-col animate-in slide-in-from-right duration-300">
                    <div className="p-6 border-b border-[#E1DFDD] flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-[#242424]">
                            {isEditingPeriod ? 'Editar Periodo' : 'Nuevo Periodo'}
                        </h2>
                        <button onClick={() => setShowPeriodModal(false)} className="text-[#605E5C] hover:text-[#242424]">
                            <X size={24} />
                        </button>
                    </div>
                    <div className="p-6 flex-1 overflow-auto">
                        <p className="text-sm text-[#605E5C] mb-6">
                            Defina los rangos de fechas para el ciclo de evaluación.
                        </p>
                        
                        <FluentInput 
                            label="Nombre del Periodo" 
                            placeholder="Ej. Evaluación Q3 2025" 
                            value={periodForm.name}
                            onChange={(e:any) => setPeriodForm({...periodForm, name: e.target.value})}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                             <FluentInput 
                                label="Fecha Inicio" 
                                type="date"
                                value={periodForm.startDate}
                                onChange={(e:any) => setPeriodForm({...periodForm, startDate: e.target.value})}
                            />
                             <FluentInput 
                                label="Fecha Fin" 
                                type="date"
                                value={periodForm.endDate}
                                onChange={(e:any) => setPeriodForm({...periodForm, endDate: e.target.value})}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5 mb-4">
                            <label className="text-sm font-semibold text-[#242424]">Estado</label>
                            <select 
                                value={periodForm.status}
                                onChange={(e) => setPeriodForm({...periodForm, status: e.target.value})}
                                className="w-full p-2.5 text-sm border-b border-[#8A8886] bg-[#F3F2F1] rounded-t-[4px] focus:border-b-2 focus:border-[#0078D4] focus:bg-white outline-none"
                            >
                                <option value="Active">Activo</option>
                                <option value="Closed">Cerrado</option>
                                <option value="Scheduled">Programado</option>
                            </select>
                        </div>

                    </div>
                    <div className="p-6 border-t border-[#E1DFDD] bg-[#FAFAFA] flex justify-end gap-3">
                        <FluentButton onClick={() => setShowPeriodModal(false)}>Cancelar</FluentButton>
                        <FluentButton primary onClick={handleSavePeriod}>
                            Guardar Periodo
                        </FluentButton>
                    </div>
                </div>
            </div>
        )}

        {/* ================= MODAL AGREGAR/EDITAR COMPETENCIA ================= */}
        {showCompetencyModal && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-end z-50 animate-in fade-in duration-200">
                <div className="w-full max-w-xl h-full bg-white shadow-2xl border-l border-[#E1DFDD] flex flex-col animate-in slide-in-from-right duration-300">
                    <div className="p-6 border-b border-[#E1DFDD] flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-[#242424]">
                            {isEditingCompetency ? 'Editar Competencia' : 'Nueva Competencia'}
                        </h2>
                        <button onClick={() => setShowCompetencyModal(false)} className="text-[#605E5C] hover:text-[#242424]">
                            <X size={24} />
                        </button>
                    </div>
                    <div className="p-6 flex-1 overflow-auto">
                        <p className="text-sm text-[#605E5C] mb-6">
                            Configure la competencia y las preguntas asociadas.
                        </p>
                        
                        <FluentInput 
                            label="Nombre de la Competencia" 
                            placeholder="Ej. Liderazgo" 
                            value={competencyForm.competencia}
                            onChange={(e:any) => setCompetencyForm({...competencyForm, competencia: e.target.value})}
                        />
                        
                        <div className="mt-6">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-semibold text-[#242424]">Preguntas (Aspectos)</label>
                                <button 
                                    onClick={handleAddAspectToForm}
                                    className="text-xs text-[#0078D4] font-medium hover:underline flex items-center gap-1"
                                >
                                    <Plus size={14} /> Agregar Pregunta
                                </button>
                            </div>
                            
                            <div className="space-y-3">
                                {competencyForm.aspectos.map((aspect, index) => (
                                    <div key={aspect.id} className="flex gap-2 items-start">
                                        <span className="text-xs font-bold text-[#605E5C] mt-3 w-4">{index + 1}.</span>
                                        <div className="flex-1">
                                            <textarea
                                                value={aspect.question}
                                                onChange={(e) => handleChangeAspectQuestion(index, e.target.value)}
                                                placeholder="Escriba la pregunta o aspecto a evaluar..."
                                                className="w-full p-2 text-sm border border-[#E1DFDD] bg-[#FAFAFA] rounded-[4px] focus:border-[#0078D4] focus:bg-white outline-none resize-none h-[60px]"
                                            />
                                        </div>
                                        <button 
                                            onClick={() => handleRemoveAspectFromForm(index)}
                                            className="p-2 text-[#605E5C] hover:text-[#A80000] hover:bg-[#FDE7E9] rounded mt-1"
                                            title="Eliminar pregunta"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                {competencyForm.aspectos.length === 0 && (
                                    <div className="text-center py-8 border-2 border-dashed border-[#E1DFDD] rounded text-[#605E5C] text-sm">
                                        No hay preguntas asignadas a esta competencia.
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                    <div className="p-6 border-t border-[#E1DFDD] bg-[#FAFAFA] flex justify-end gap-3">
                        <FluentButton onClick={() => setShowCompetencyModal(false)}>Cancelar</FluentButton>
                        <FluentButton primary onClick={handleSaveCompetency}>
                            Guardar Competencia
                        </FluentButton>
                    </div>
                </div>
            </div>
        )}

      </main>
    </div>
  );
}