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
  Trash2,
  Link2,
  UserCog,
  UsersRound,
  BarChart3,
  PieChart,
  ClipboardCheck,
  Target,
  Lightbulb,
  Flag,
  Lock
} from 'lucide-react';

// --- TYPES ---
type Aspecto = {
  id: string;
  question: string;
};

type Competencia = {
  id: number;
  competencia: string;
  aspectos: Aspecto[];
};

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

const FluentInput = ({ type, placeholder, label, value, onChange, disabled }: any) => (
  <div className="flex flex-col gap-1.5 mb-4">
    {label && <label className="text-sm font-semibold text-[#242424]">{label}</label>}
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full p-2.5 text-sm border-b border-[#8A8886] rounded-t-[4px] outline-none transition-colors 
      ${disabled ? 'bg-[#F3F2F1] text-[#605E5C] cursor-not-allowed border-transparent' : 'bg-[#F3F2F1] focus:border-b-2 focus:border-[#0078D4] focus:bg-white hover:bg-[#E1DFDD]'}`}
    />
  </div>
);

const FluentCard = ({ title, icon: Icon, subtitle, status, children, className, onClick }: any) => (
  <div
    onClick={onClick}
    className={`bg-white p-4 rounded-[8px] shadow-[0_1.6px_3.6px_0_rgba(0,0,0,0.13),0_0.3px_0.9px_0_rgba(0,0,0,0.11)] hover:shadow-[0_3.2px_7.2px_0_rgba(0,0,0,0.13),0_0.6px_1.8px_0_rgba(0,0,0,0.11)] transition-shadow border border-transparent hover:border-[#E1DFDD] ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
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
    className={`w-full flex items-center justify-center lg:justify-start gap-3 px-3 py-2 rounded-[4px] text-sm transition-colors 
    ${active ? 'bg-[#EFF6FC] text-[#0078D4] font-semibold relative after:content-[""] after:absolute after:left-0 after:top-2 after:bottom-2 after:w-[3px] after:bg-[#0078D4] after:rounded-r' : 'text-[#201F1E] hover:bg-[#F3F2F1]'}`}
    title={label}
  >
    <Icon size={20} />
    <span className="hidden lg:block">{label}</span>
  </button>
);

const BottomNavItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 p-2 rounded-[4px] transition-colors 
    ${active ? 'text-[#0078D4]' : 'text-[#605E5C] hover:bg-[#F3F2F1]'}`}
  >
    <Icon size={24} strokeWidth={active ? 2.5 : 2} />
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

const SimpleBarChart = ({ data, title, colorClass }: any) => {
  const totalScore = data.reduce((acc: number, item: any) => acc + item.score, 0);
  const maxScore = data.length * 5;
  const totalPercentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  const textColor = colorClass.includes('blue') ? 'text-blue-600'
    : colorClass.includes('green') ? 'text-green-600'
      : colorClass.includes('purple') ? 'text-purple-600'
        : colorClass.includes('orange') ? 'text-orange-600'
          : 'text-[#0078D4]';

  return (
    <div className="bg-[#FAFAFA] p-4 rounded-[8px] border border-[#E1DFDD] h-full flex flex-col">
      <h4 className="text-xs font-bold text-[#605E5C] uppercase mb-4 text-center">{title}</h4>
      <div className="space-y-3 flex-1">
        {data.map((item: any, index: number) => (
          <div key={index} className="flex flex-col gap-1">
            <div className="flex justify-between text-[10px] text-[#242424]">
              <span className="truncate w-24 font-medium">{item.label}</span>
              <span className="font-bold">{item.score.toFixed(1)}</span>
            </div>
            <div className="w-full bg-[#E1DFDD] rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
                style={{ width: `${(item.score / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-[#E1DFDD] flex justify-between items-center">
        <span className="text-xs font-semibold text-[#605E5C]">Total</span>
        <span className={`text-sm font-bold ${textColor}`}>{totalPercentage}%</span>
      </div>
    </div>
  );
};

const RatingScale = ({ value, onChange, readOnly, isAverageMode }: any) => {
  const options = [
    { val: 1, label: "Nunca" },
    { val: 2, label: "Casi nunca" },
    { val: 3, label: "A veces" },
    { val: 4, label: "Frecuentemente" },
    { val: 5, label: "Siempre" }
  ];

  return (
    <div className="mt-2">
      <div className={`flex flex-wrap gap-2 ${readOnly && !isAverageMode ? 'opacity-90 pointer-events-none' : ''}`}>
        {options.map((opt) => {
          const isSelected = isAverageMode
            ? Math.round(value) === opt.val
            : value === opt.val;

          return (
            <button
              key={opt.val}
              onClick={() => !readOnly && onChange(opt.val)}
              disabled={readOnly}
              className={`px-3 py-2 rounded-[4px] text-xs sm:text-sm font-medium transition-all duration-200 border flex-1 sm:flex-none relative
                    ${isSelected
                  ? 'bg-[#0078D4] text-white border-[#0078D4] shadow-sm ring-2 ring-[#E1DFDD]'
                  : `bg-white text-[#242424] border-[#8A8886] ${!readOnly ? 'hover:bg-[#EFF6FC] hover:border-[#0078D4]' : ''}`}`}
            >
              {opt.label}
              {isAverageMode && isSelected && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow-sm border border-white font-bold">
                  {value.toFixed(1)}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {isAverageMode && (
        <div className="mt-2 text-xs text-[#605E5C] flex items-center gap-2">
          <BarChart3 size={12} />
          <span>Promedio calculado: <strong>{value.toFixed(2)} / 5.00</strong></span>
        </div>
      )}
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---

export default function AppPrototype() {
  const [currentView, setCurrentView] = useState('login');
  const [userRole, setUserRole] = useState('user');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [settingsTab, setSettingsTab] = useState('periods');
  const [email, setEmail] = useState('');
  const [teamPeriodFilter, setTeamPeriodFilter] = useState('');

  // Estados con tipo ANY[] para evitar errores de TypeScript en el prototipo
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null);
  const [formResponses, setFormResponses] = useState<any>({});
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isReportMode, setIsReportMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isActionPlanReadOnly, setIsActionPlanReadOnly] = useState(false);

  const [competencies, setCompetencies] = useState<Competencia[]>([
    { id: 1, competencia: "Liderazgo y Gestión", aspectos: [{ id: "c1_a1", question: "Demuestra capacidad para motivar e inspirar al equipo." }, { id: "c1_a2", question: "Toma decisiones efectivas bajo presión." }] },
    { id: 2, competencia: "Trabajo en Equipo", aspectos: [{ id: "c2_a1", question: "Colabora activamente compartiendo conocimientos." }, { id: "c2_a2", question: "Mantiene una actitud positiva ante conflictos." }] },
    { id: 3, competencia: "Comunicación Efectiva", aspectos: [{ id: "c3_a1", question: "Escucha atentamente y respeta las opiniones de otros." }, { id: "c3_a2", question: "Transmite ideas de manera clara y concisa." }] }
  ]);

  const [teamEvaluations, setTeamEvaluations] = useState<any[]>([
    {
      id: 101, name: 'Carlos López', role: 'Desarrollador', period: 'Evaluación Q1 2025', status: 'Completed', averageScore: 4.2, percentage: 84, responses: { "c1_a1": 4.5, "c1_a2": 4.0, "c2_a1": 3.8, "c2_a2": 4.5, "c3_a1": 4.2, "c3_a2": 4.0 },
      breakdown: { self: [{ label: "Liderazgo", score: 4.2 }, { label: "Trabajo Eq.", score: 4.5 }, { label: "Comunicación", score: 4.0 }], boss: [{ label: "Liderazgo", score: 4.0 }, { label: "Trabajo Eq.", score: 4.2 }, { label: "Comunicación", score: 4.4 }], subs: [{ label: "Liderazgo", score: 4.4 }, { label: "Trabajo Eq.", score: 4.0 }, { label: "Comunicación", score: 4.2 }], peers: [{ label: "Liderazgo", score: 4.1 }, { label: "Trabajo Eq.", score: 4.6 }, { label: "Comunicación", score: 4.3 }] },
      actionPlan: { strengths: "Excelente capacidad técnica.", weaknesses: "Comunicación en reuniones.", competencyPlans: [{ id: 1, competencyName: "Comunicación Efectiva", objective: "Mejorar oratoria.", successIndicator: "Feedback positivo.", actions: [{ id: 101, aspecto: "Transmite ideas", action: "Curso oratoria", actionType: "Capacitación", status: "In Progress", deadline: "2025-03-01", observations: "Aprobado." }] }] }
    },
    { id: 102, name: 'Maria Rodriguez', role: 'Coordinadora', period: 'Evaluación Q1 2025', status: 'Completed', averageScore: 4.8, percentage: 96, responses: { "c1_a1": 5.0, "c1_a2": 4.8, "c2_a1": 4.5, "c2_a2": 5.0, "c3_a1": 4.9, "c3_a2": 4.7 }, breakdown: { self: [], boss: [], subs: [], peers: [] }, actionPlan: null },
    { id: 103, name: 'Pedro Sanchez', role: 'Analista Jr.', period: 'Evaluación Anual 2024', status: 'Pending', averageScore: 0, percentage: 0, responses: {}, breakdown: null, actionPlan: null }
  ]);

  const [employees, setEmployees] = useState<any[]>([
    { id: 1, name: 'Juan Pérez', email: 'juan.perez@empresa.com', department: 'Ventas', role: 'Gerente', status: 'Active' },
    { id: 2, name: 'Ana García', email: 'ana.garcia@empresa.com', department: 'Marketing', role: 'Analista', status: 'Active' },
    { id: 3, name: 'Carlos López', email: 'carlos.lopez@empresa.com', department: 'TI', role: 'Desarrollador', status: 'Inactive' },
    { id: 4, name: 'Maria Rodriguez', email: 'maria.rodriguez@empresa.com', department: 'RRHH', role: 'Coordinadora', status: 'Active' },
  ]);
  const [periods, setPeriods] = useState<any[]>([{ id: 1, name: 'Evaluación Anual 2024', startDate: '2024-01-01', endDate: '2024-12-31', status: 'Closed' }, { id: 2, name: 'Evaluación Q1 2025', startDate: '2025-01-01', endDate: '2025-03-31', status: 'Active' }]);
  const [assignments, setAssignments] = useState<any[]>([{ id: 1, evaluatorId: 1, evaluateeId: 3, relation: 'Jefe Inmediato', periodId: 2 }, { id: 2, evaluatorId: 2, evaluateeId: 4, relation: 'Pares', periodId: 2 }]);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [assignmentForm, setAssignmentForm] = useState({ evaluatorId: '', evaluateeId: '', relation: 'Pares', periodId: '' });

  // Estados Modales
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState<number | null>(null);
  const [employeeForm, setEmployeeForm] = useState({ name: '', email: '', department: '', role: '' });
  const [showPeriodModal, setShowPeriodModal] = useState(false);
  const [isEditingPeriod, setIsEditingPeriod] = useState(false);
  const [currentPeriodId, setCurrentPeriodId] = useState<number | null>(null);
  const [periodForm, setPeriodForm] = useState({ name: '', startDate: '', endDate: '', status: 'Active' });
  const [showCompetencyModal, setShowCompetencyModal] = useState(false);
  const [isEditingCompetency, setIsEditingCompetency] = useState(false);
  const [currentCompetencyId, setCurrentCompetencyId] = useState<number | null>(null);
  const [competencyForm, setCompetencyForm] = useState<{ competencia: string, aspectos: Aspecto[] }>({ competencia: '', aspectos: [] });
  const [showActionPlanModal, setShowActionPlanModal] = useState(false);
  const [actionPlanForm, setActionPlanForm] = useState<{ strengths: string; weaknesses: string; competencyPlans: any[] }>({ strengths: '', weaknesses: '', competencyPlans: [] });

  const myEvaluations = [
    {
      id: 1,
      collaborator: 'Administrador Principal',
      relation: 'Autoevaluación',
      status: 'Finalizado',
      action: 'Ver',
      percentage: 92,
      responses: { "c1_a1": 5, "c1_a2": 4, "c2_a1": 5, "c2_a2": 5, "c3_a1": 4, "c3_a2": 5 }
    },
    {
      id: 2,
      collaborator: 'Usuario de Prueba',
      relation: 'Subalterno',
      status: 'Finalizado',
      action: 'Ver',
      percentage: 75,
      responses: { "c1_a1": 3, "c1_a2": 4, "c2_a1": 2, "c2_a2": 3, "c3_a1": 4, "c3_a2": 3 }
    },
    { id: 3, collaborator: 'Prueba2', relation: 'Par', status: 'Pendiente', action: 'Evaluar', responses: {} },
    { id: 4, collaborator: 'Gerente de Ventas', relation: 'Jefe Directo', status: 'Pendiente', action: 'Evaluar', responses: {} },
  ];

  const handleLogin = () => { if (email.includes('admin')) { setUserRole('admin'); } else { setUserRole('user'); } setCurrentView('app'); setActiveTab('dashboard'); };
  const startEvaluation = (evaluation: any) => { setSelectedEvaluation(evaluation); setFormResponses({}); setIsReadOnly(false); setIsReportMode(false); setActiveTab('perform_evaluation'); };

  const viewEvaluation = (evaluation: any) => {
    setSelectedEvaluation(evaluation);
    setFormResponses(evaluation.responses || {});
    setIsReadOnly(true);
    setIsReportMode(false);
    setActiveTab('perform_evaluation');
  };

  const viewTeamReport = (member: any) => {
    setSelectedEvaluation({ id: member.id, collaborator: member.name, relation: member.role, percentage: member.percentage, averageScore: member.averageScore, breakdown: member.breakdown, actionPlan: member.actionPlan });
    setFormResponses(member.responses || {}); setIsReadOnly(true); setIsReportMode(true); setActiveTab('perform_evaluation');
  };

  const openMyActionPlan = () => {
    const myId = 101;
    const myData = teamEvaluations.find(e => e.id === myId);
    if (myData && myData.actionPlan) {
      const plan = JSON.parse(JSON.stringify(myData.actionPlan));
      if (!plan.competencyPlans) plan.competencyPlans = [];
      setSelectedEvaluation({ id: myData.id, collaborator: myData.name, actionPlan: myData.actionPlan });
      setActionPlanForm(plan);
      setIsActionPlanReadOnly(true);
      setShowActionPlanModal(true);
    } else {
      alert("No tienes un Plan de Acción asignado todavía.");
    }
  };

  const handleResponseChange = (questionId: string, value: any) => { if (isReadOnly) return; setFormResponses((prev: any) => ({ ...prev, [questionId]: value })); };

  // CRUD functions expanded
  const toggleEmployeeStatus = (id: number) => {
    setEmployees(employees.map(e => e.id === id ? { ...e, status: e.status === 'Active' ? 'Inactive' : 'Active' } : e));
  };
  const openAddModal = () => { setEmployeeForm({ name: '', email: '', department: '', role: '' }); setIsEditing(false); setCurrentEmployeeId(null); setShowEmployeeModal(true); };
  const openEditModal = (emp: any) => { setEmployeeForm({ name: emp.name, email: emp.email, department: emp.department, role: emp.role }); setIsEditing(true); setCurrentEmployeeId(emp.id); setShowEmployeeModal(true); };
  const handleSaveEmployee = () => {
    if (!employeeForm.name || !employeeForm.email) return;
    if (isEditing && currentEmployeeId) {
      setEmployees(employees.map(e => e.id === currentEmployeeId ? { ...e, ...employeeForm } : e));
    } else {
      const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
      setEmployees([...employees, { ...employeeForm, id: newId, status: 'Active' }]);
    }
    setShowEmployeeModal(false);
  };

  const openAddPeriodModal = () => { setPeriodForm({ name: '', startDate: '', endDate: '', status: 'Active' }); setIsEditingPeriod(false); setCurrentPeriodId(null); setShowPeriodModal(true); };
  const openEditPeriodModal = (p: any) => { setPeriodForm({ ...p }); setIsEditingPeriod(true); setCurrentPeriodId(p.id); setShowPeriodModal(true); };
  const handleSavePeriod = () => {
    if (!periodForm.name || !periodForm.startDate) return;
    if (isEditingPeriod && currentPeriodId) {
      setPeriods(periods.map(p => p.id === currentPeriodId ? { ...p, ...periodForm } : p));
    } else {
      const newId = periods.length > 0 ? Math.max(...periods.map(p => p.id)) + 1 : 1;
      setPeriods([...periods, { ...periodForm, id: newId }]);
    }
    setShowPeriodModal(false);
  };

  const openAddCompetencyModal = () => { setCompetencyForm({ competencia: '', aspectos: [{ id: `new_${Date.now()}`, question: '' }] }); setIsEditingCompetency(false); setCurrentCompetencyId(null); setShowCompetencyModal(true); };
  const openEditCompetencyModal = (c: any) => { setCompetencyForm({ competencia: c.competencia, aspectos: c.aspectos.map((aspecto: any) => ({ ...aspecto })) }); setIsEditingCompetency(true); setCurrentCompetencyId(c.id); setShowCompetencyModal(true); };
  const handleAddAspectToForm = () => setCompetencyForm({ ...competencyForm, aspectos: [...competencyForm.aspectos, { id: `temp_${Date.now()}`, question: '' }] });
  const handleRemoveAspectFromForm = (i: number) => { const na = [...competencyForm.aspectos]; na.splice(i, 1); setCompetencyForm({ ...competencyForm, aspectos: na }); };
  const handleChangeAspectQuestion = (i: number, v: string) => { const na = [...competencyForm.aspectos]; na[i].question = v; setCompetencyForm({ ...competencyForm, aspectos: na }); };
  const handleSaveCompetency = () => {
    if (!competencyForm.competencia) return;
    const va = competencyForm.aspectos.filter(aspecto => aspecto.question.trim() !== '');
    if (va.length === 0) return;
    const fd = { competencia: competencyForm.competencia, aspectos: va.map(aspecto => ({ ...aspecto, id: aspecto.id.startsWith('temp_') ? `c${currentCompetencyId || 'new'}_a${Math.random()}` : aspecto.id })) };
    if (isEditingCompetency && currentCompetencyId) {
      setCompetencies(competencies.map(c => c.id === currentCompetencyId ? { ...c, ...fd } : c));
    } else {
      const newId = competencies.length > 0 ? Math.max(...competencies.map(c => c.id)) + 1 : 1;
      setCompetencies([...competencies, { id: newId, ...fd }]);
    }
    setShowCompetencyModal(false);
  };
  const handleDeleteCompetency = (id: number) => { if (confirm('¿Eliminar?')) setCompetencies(competencies.filter(c => c.id !== id)); };

  const openAssignmentModal = () => { setAssignmentForm({ evaluatorId: '', evaluateeId: '', relation: 'Pares', periodId: '' }); setShowAssignmentModal(true); };
  const handleSaveAssignment = () => {
    if (!assignmentForm.evaluatorId || !assignmentForm.evaluateeId || !assignmentForm.periodId) return;
    const newId = assignments.length > 0 ? Math.max(...assignments.map(a => a.id)) + 1 : 1;
    setAssignments([...assignments, { id: newId, evaluatorId: parseInt(assignmentForm.evaluatorId), evaluateeId: parseInt(assignmentForm.evaluateeId), relation: assignmentForm.relation, periodId: parseInt(assignmentForm.periodId) }]);
    setShowAssignmentModal(false);
  };
  const handleDeleteAssignment = (id: number) => { if (confirm("¿Borrar?")) setAssignments(assignments.filter(a => a.id !== id)); };

  const openActionPlanModal = () => {
    if (selectedEvaluation && selectedEvaluation.actionPlan) {
      const plan = JSON.parse(JSON.stringify(selectedEvaluation.actionPlan));
      if (!plan.competencyPlans) plan.competencyPlans = [];
      setActionPlanForm(plan);
    } else {
      setActionPlanForm({ strengths: '', weaknesses: '', competencyPlans: [] });
    }
    setIsActionPlanReadOnly(false);
    setShowActionPlanModal(true);
  };
  const handleAddCompetencyPlan = () => { setActionPlanForm({ ...actionPlanForm, competencyPlans: [...actionPlanForm.competencyPlans, { id: Date.now(), competencyName: '', objective: '', successIndicator: '', actions: [] }] }); };
  const handleRemoveCompetencyPlan = (index: number) => { const newPlans = [...actionPlanForm.competencyPlans]; newPlans.splice(index, 1); setActionPlanForm({ ...actionPlanForm, competencyPlans: newPlans }); };
  const handleChangeCompetencyPlan = (index: number, field: string, value: string) => { const newPlans = [...actionPlanForm.competencyPlans]; (newPlans[index] as any)[field] = value; setActionPlanForm({ ...actionPlanForm, competencyPlans: newPlans }); };
  const handleAddActionToPlan = (planIndex: number) => { const newPlans = [...actionPlanForm.competencyPlans]; newPlans[planIndex].actions.push({ id: Date.now(), aspecto: '', action: '', actionType: '', status: 'Sin Iniciar', deadline: '', observations: '' }); setActionPlanForm({ ...actionPlanForm, competencyPlans: newPlans }); };
  const handleRemoveActionFromPlan = (planIndex: number, actionIndex: number) => { const newPlans = [...actionPlanForm.competencyPlans]; newPlans[planIndex].actions.splice(actionIndex, 1); setActionPlanForm({ ...actionPlanForm, competencyPlans: newPlans }); };
  const handleChangeActionInPlan = (planIndex: number, actionIndex: number, field: string, value: string) => { const newPlans = [...actionPlanForm.competencyPlans]; (newPlans[planIndex].actions[actionIndex] as any)[field] = value; setActionPlanForm({ ...actionPlanForm, competencyPlans: newPlans }); };
  const handleSaveActionPlan = () => {
    const updatedTeam = teamEvaluations.map(member => {
      if (member.id === selectedEvaluation.id) {
        return { ...member, actionPlan: actionPlanForm };
      }
      return member;
    });
    setTeamEvaluations(updatedTeam);
    setSelectedEvaluation({ ...selectedEvaluation, actionPlan: actionPlanForm });
    setShowActionPlanModal(false);
  };

  if (currentView === 'login') {
    return (<div className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}><div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div><div className="relative z-10 bg-white p-10 rounded-[8px] shadow-2xl w-full max-w-[440px]"><div className="flex items-center gap-2 mb-8"><div className="grid grid-cols-2 gap-0.5"><div className="w-2.5 h-2.5 bg-[#F25022]"></div><div className="w-2.5 h-2.5 bg-[#7FBA00]"></div><div className="w-2.5 h-2.5 bg-[#00A4EF]"></div><div className="w-2.5 h-2.5 bg-[#FFB900]"></div></div><span className="font-semibold text-xl text-[#5E5E5E]">360 Evaluation</span></div><h1 className="text-2xl font-bold text-[#1b1b1b] mb-2">Iniciar sesión</h1><p className="text-sm text-[#242424] mb-6">Prosiga a su portal de evaluación</p><FluentInput type="email" label="Correo electrónico" placeholder="usuario@empresa.com" value={email} onChange={(e: any) => setEmail(e.target.value)} /><FluentInput type="password" placeholder="Contraseña" label="Contraseña" /><div className="flex justify-end gap-3 mt-8"><FluentButton onClick={handleLogin} primary className="w-32 shadow-md">Siguiente</FluentButton></div></div></div>);
  }

  return (
    <div className="min-h-screen bg-[#FAF9F8] flex font-sans text-[#201F1E]">
      {/* Sidebar */}
      <aside className="hidden md:flex w-16 lg:w-64 bg-[#FFFFFF] border-r border-[#E1DFDD] flex-col transition-all duration-300 shadow-[1px_0_3px_rgba(0,0,0,0.05)] z-10">
        <div className="p-4 flex items-center justify-center lg:justify-start gap-3 mb-6">
          <div className="grid grid-cols-2 gap-0.5 shrink-0"><div className="w-2 h-2 bg-[#F25022]"></div><div className="w-2 h-2 bg-[#7FBA00]"></div><div className="w-2 h-2 bg-[#00A4EF]"></div><div className="w-2 h-2 bg-[#FFB900]"></div></div><span className="font-bold text-lg hidden lg:block">Evaluación</span>
        </div>
        <nav className="flex-1 px-2 space-y-1">
          <SidebarItem icon={LayoutGrid} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          {userRole === 'admin' && (<><SidebarItem icon={UserCog} label="Empleados" active={activeTab === 'employees'} onClick={() => setActiveTab('employees')} /><SidebarItem icon={Settings} label="Configuración" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} /></>)}
          <SidebarItem icon={ClipboardList} label="Mis Evaluaciones" active={activeTab === 'evaluations' || (activeTab === 'perform_evaluation' && !isReportMode)} onClick={() => setActiveTab('evaluations')} />
          <SidebarItem icon={Users} label="Evaluaciones de Equipo" active={activeTab === 'team_evaluations' || (activeTab === 'perform_evaluation' && isReportMode)} onClick={() => setActiveTab('team_evaluations')} />
        </nav>
        <div className="p-2 border-t border-[#E1DFDD]"><button onClick={() => setCurrentView('login')} className="flex items-center justify-center lg:justify-start gap-3 w-full p-2 text-[#201F1E] hover:bg-[#F3F2F1] rounded-[4px]"><LogOut size={20} /><span className="text-sm font-medium hidden lg:block">Cerrar sesión</span></button></div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Headers */}
        <header className="hidden md:flex h-14 bg-white border-b border-[#E1DFDD] items-center justify-between px-6 shadow-sm shrink-0">
          <div className="flex items-center bg-[#F3F2F1] px-3 py-1.5 rounded-[4px] w-full max-w-md"><Search size={16} className="text-[#605E5C]" /><input type="text" placeholder="Buscar..." className="bg-transparent border-none outline-none text-sm ml-2 w-full placeholder-[#605E5C]" /></div><div className="flex items-center gap-4"><button className="text-[#605E5C] hover:text-[#0078D4]"><Bell size={20} /></button><div className="w-8 h-8 rounded-full bg-[#0078D4] text-white flex items-center justify-center text-xs font-bold shadow-sm cursor-default">{userRole === 'admin' ? 'AD' : 'US'}</div></div>
        </header>
        <header className="md:hidden h-14 bg-white border-b border-[#E1DFDD] flex items-center justify-between px-4 shrink-0 relative z-20">
          <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-[#0078D4] text-white flex items-center justify-center text-xs font-bold shadow-sm cursor-default">{userRole === 'admin' ? 'AD' : 'US'}</div><span className="font-semibold text-[#242424]">Evaluación 360</span></div>
          <div className="flex items-center gap-3"><button className="p-2 text-[#605E5C] hover:bg-[#F3F2F1] rounded-[4px]"><Search size={22} /></button><div className="relative"><button onClick={() => setShowMobileMenu(!showMobileMenu)} className="p-2 text-[#605E5C] hover:bg-[#F3F2F1] rounded-[4px]"><MoreHorizontal size={22} /></button>{showMobileMenu && (<><div className="fixed inset-0 z-40" onClick={() => setShowMobileMenu(false)}></div><div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-[8px] shadow-xl border border-[#E1DFDD] z-50 animate-in fade-in slide-in-from-top-2"><div className="py-1"><button onClick={() => { setCurrentView('login'); setShowMobileMenu(false); }} className="w-full text-left px-4 py-3 text-sm text-[#A80000] hover:bg-[#F3F2F1] flex items-center gap-2"><LogOut size={16} /> Cerrar Sesión</button></div></div></>)}</div></div>
        </header>

        <div className="flex-1 overflow-auto p-4 pb-20 md:pb-8 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'dashboard' && (
              <>
                <div className="mb-6 lg:mb-8"><h1 className="text-xl lg:text-2xl font-semibold mb-1">{userRole === 'admin' ? 'Dashboard' : 'Mi Espacio'}</h1><p className="text-[#605E5C] text-sm">{userRole === 'admin' ? 'Gestione las evaluaciones activas.' : 'Bienvenido de nuevo.'}</p></div>
                {userRole === 'admin' ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"><div className="bg-[#0078D4] text-white p-4 rounded-[8px] shadow-md col-span-1 md:col-span-2"><h3 className="text-lg font-semibold">Evaluación Q4 2025</h3><p className="opacity-90 text-sm mb-4">Periodo actual en curso</p><div className="text-3xl font-bold mb-1">78%</div><p className="text-xs opacity-80">Completado por la organización</p></div><FluentCard title="Usuarios Activos" icon={Users} subtitle="Total empleados" status="124 Total" /><FluentCard title="Pendientes" icon={CheckCircle2} subtitle="Sin finalizar" status="23 Alertas" /></div>) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="cursor-pointer" onClick={() => setActiveTab('evaluations')}><FluentCard title="Autoevaluación" icon={ClipboardList} subtitle="Pendiente de envío" status="Vence en 2 días" /></div>
                    <div className="cursor-pointer" onClick={() => setActiveTab('evaluations')}><FluentCard title="Evaluación de Pares" icon={Users} subtitle="Evaluar a: Juan Pérez" status="Active" /></div>
                    {/* TARJETA MI PLAN DE ACCIÓN */}
                    <div className="cursor-pointer" onClick={openMyActionPlan}>
                      <FluentCard title="Mi Plan de Acción" icon={Target} subtitle="Objetivos de desarrollo" status="Ver detalles" />
                    </div>
                    <FluentCard title="Histórico" icon={CheckCircle2} subtitle="Ver feedback anterior" />
                  </div>
                )}
              </>
            )}
            {activeTab === 'employees' && userRole === 'admin' && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4"><div><h1 className="text-xl lg:text-2xl font-semibold mb-1 text-[#242424]">Empleados</h1><p className="text-[#605E5C] text-sm">Administre usuarios.</p></div><div className="flex gap-3 w-full sm:w-auto"><button className="flex-1 sm:flex-none flex items-center justify-center gap-2 text-[#605E5C] border border-[#8A8886] bg-white hover:bg-[#F3F2F1] px-4 py-2 rounded-[4px] text-sm font-medium transition-colors"><Filter size={16} />Filtrar</button><FluentButton className="flex-1 sm:flex-none" primary onClick={openAddModal}><UserPlus size={18} /> Agregar</FluentButton></div></div>
                <div className="bg-white rounded-[8px] shadow-[0_1.6px_3.6px_0_rgba(0,0,0,0.13),0_0.3px_0.9px_0_rgba(0,0,0,0.11)] border border-[#E1DFDD] overflow-hidden"><div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-[#E1DFDD] bg-[#FAFAFA] text-xs font-semibold text-[#605E5C] uppercase tracking-wider"><div className="col-span-4">Nombre / Email</div><div className="col-span-3">Departamento / Cargo</div><div className="col-span-3">Estado</div><div className="col-span-2 text-center">Acciones</div></div><div className="divide-y divide-[#E1DFDD]">{employees.map((emp) => (<div key={emp.id} className={`grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center transition-colors group ${emp.status === 'Inactive' ? 'bg-gray-50 opacity-75' : 'hover:bg-[#F3F2F1]'}`}><div className="md:col-span-4 flex items-center gap-3"><div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white ${emp.status === 'Inactive' ? 'bg-gray-400' : 'bg-[#0078D4]'}`}>{emp.name.charAt(0)}</div><div><p className="text-sm font-semibold text-[#242424]">{emp.name}</p><p className="text-xs text-[#605E5C]">{emp.email}</p></div></div><div className="md:col-span-3 flex justify-between md:block"><span className="md:hidden text-xs font-bold text-[#605E5C]">Cargo:</span><div className="text-right md:text-left"><p className="text-sm text-[#242424]">{emp.department}</p><p className="text-xs text-[#605E5C]">{emp.role}</p></div></div><div className="md:col-span-3 flex justify-between md:block"><span className="md:hidden text-xs font-bold text-[#605E5C]">Estado:</span><span className={`px-2.5 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 ${emp.status === 'Active' ? 'bg-[#DFF6DD] text-[#107C10]' : 'bg-[#FDE7E9] text-[#A80000]'}`}><span className={`w-1.5 h-1.5 rounded-full ${emp.status === 'Active' ? 'bg-[#107C10]' : 'bg-[#A80000]'}`}></span>{emp.status === 'Active' ? 'Activo' : 'Inhabilitado'}</span></div><div className="md:col-span-2 flex justify-end md:justify-center gap-2 transition-opacity"><button onClick={() => openEditModal(emp)} className="p-2 text-[#605E5C] hover:bg-[#EFF6FC] hover:text-[#0078D4] rounded-[4px]" title="Editar"><Pencil size={18} /></button><button onClick={() => toggleEmployeeStatus(emp.id)} className={`p-2 rounded-[4px] transition-colors ${emp.status === 'Active' ? 'hover:bg-[#FDE7E9] text-[#A80000]' : 'hover:bg-[#DFF6DD] text-[#107C10]'}`} title={emp.status === 'Active' ? "Desactivar" : "Activar"}>{emp.status === 'Active' ? <UserX size={18} /> : <UserCheck size={18} />}</button></div></div>))}</div></div>
              </div>
            )}
            {activeTab === 'settings' && userRole === 'admin' && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-6 flex justify-between items-end"><div><h1 className="text-xl lg:text-2xl font-semibold mb-1 text-[#242424]">Configuración</h1></div></div>
                <div className="flex items-center gap-6 mb-6 border-b border-[#E1DFDD] overflow-x-auto"><button onClick={() => setSettingsTab('periods')} className={`pb-2 text-sm font-medium whitespace-nowrap transition-all relative ${settingsTab === 'periods' ? 'text-[#0078D4] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#0078D4] after:rounded-t' : 'text-[#605E5C] hover:text-[#242424]'}`}>Periodos</button><button onClick={() => setSettingsTab('competencies')} className={`pb-2 text-sm font-medium whitespace-nowrap transition-all relative ${settingsTab === 'competencies' ? 'text-[#0078D4] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#0078D4] after:rounded-t' : 'text-[#605E5C] hover:text-[#242424]'}`}>Competencias</button><button onClick={() => setSettingsTab('assignments')} className={`pb-2 text-sm font-medium whitespace-nowrap transition-all relative ${settingsTab === 'assignments' ? 'text-[#0078D4] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#0078D4] after:rounded-t' : 'text-[#605E5C] hover:text-[#242424]'}`}>Asignaciones</button></div>
                {settingsTab === 'periods' && (<div className="animate-in fade-in"><div className="flex justify-end mb-4"><FluentButton primary onClick={openAddPeriodModal}><CalendarRange size={18} /> Nuevo</FluentButton></div><div className="bg-white rounded-[8px] shadow-sm border border-[#E1DFDD] overflow-hidden"><div className="divide-y divide-[#E1DFDD]">{periods.map((period) => (<div key={period.id} className="p-4 hover:bg-[#F3F2F1] transition-colors"><div className="flex justify-between items-start mb-2"><div className="flex items-center gap-3"><div className="p-2 bg-[#EFF6FC] rounded text-[#0078D4]"><CalendarDays size={20} /></div><div><span className="block text-sm font-semibold text-[#242424]">{period.name}</span><span className={`text-xs font-medium ${period.status === 'Active' ? 'text-[#107C10]' : 'text-[#605E5C]'}`}>{period.status === 'Active' ? 'Activo' : 'Cerrado'}</span></div></div><button onClick={() => openEditPeriodModal(period)} className="p-2 text-[#605E5C] hover:bg-[#EFF6FC] hover:text-[#0078D4] rounded-[4px]"><Pencil size={18} /></button></div><div className="flex justify-between text-xs text-[#605E5C] pl-12"><span>Inicio: {period.startDate}</span><span>Fin: {period.endDate}</span></div></div>))}</div></div></div>)}
                {settingsTab === 'competencies' && (<div className="animate-in fade-in"><div className="flex justify-end mb-4"><FluentButton primary onClick={openAddCompetencyModal}><ListChecks size={18} /> Nueva</FluentButton></div><div className="space-y-4">{competencies.map((comp) => (<div key={comp.id} className="bg-white p-4 rounded-[8px] shadow-sm border border-[#E1DFDD] hover:border-[#0078D4] transition-colors group"><div className="flex justify-between items-start mb-3"><div className="flex items-center gap-3"><div className="w-8 h-8 bg-[#EFF6FC] text-[#0078D4] rounded-full flex items-center justify-center font-bold text-sm shrink-0">{comp.id}</div><h3 className="font-semibold text-[#242424] text-lg leading-tight">{comp.competencia}</h3></div><div className="flex gap-1"><button onClick={() => openEditCompetencyModal(comp)} className="p-2 text-[#605E5C] hover:bg-[#EFF6FC] hover:text-[#0078D4] rounded-[4px]"><Pencil size={18} /></button><button onClick={() => handleDeleteCompetency(comp.id)} className="p-2 text-[#605E5C] hover:bg-[#FDE7E9] hover:text-[#A80000] rounded-[4px]"><Trash2 size={18} /></button></div></div><div className="pl-11"><p className="text-xs font-semibold text-[#605E5C] uppercase mb-2">Preguntas</p><ul className="list-disc list-inside text-sm text-[#242424] space-y-1">{comp.aspectos.map((aspecto: any) => (<li key={aspecto.id} className="text-[#605E5C]">{aspecto.question}</li>))}</ul></div></div>))}</div></div>)}
                {settingsTab === 'assignments' && (<div className="animate-in fade-in"><div className="flex justify-end mb-4"><FluentButton primary onClick={openAssignmentModal}><Link2 size={18} /> Nueva Asignación</FluentButton></div><div className="bg-white rounded-[8px] shadow-sm border border-[#E1DFDD] overflow-hidden"><div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-[#E1DFDD] bg-[#FAFAFA] text-xs font-semibold text-[#605E5C] uppercase tracking-wider"><div className="col-span-3">Evaluador</div><div className="col-span-3">Evaluado</div><div className="col-span-2">Relación</div><div className="col-span-3">Periodo</div><div className="col-span-1 text-center">Acción</div></div><div className="divide-y divide-[#E1DFDD]">{assignments.map((assign) => { const evaluator = employees.find(e => e.id === assign.evaluatorId); const evaluatee = employees.find(e => e.id === assign.evaluateeId); const period = periods.find(p => p.id === assign.periodId); return (<div key={assign.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 p-4 items-center hover:bg-[#F3F2F1] transition-colors text-sm"><div className="md:col-span-3 font-medium flex items-center gap-2"><div className="w-6 h-6 bg-[#0078D4] text-white rounded-full flex items-center justify-center text-xs md:hidden">{evaluator?.name.charAt(0)}</div><span className="md:hidden font-bold text-[#605E5C]">Evaluador: </span>{evaluator?.name}</div><div className="md:col-span-3 flex items-center gap-2"><span className="md:hidden font-bold text-[#605E5C]">Evaluado: </span>{evaluatee?.name}</div><div className="md:col-span-2 flex items-center gap-2"><span className="md:hidden font-bold text-[#605E5C]">Relación: </span><span className="bg-[#EFF6FC] text-[#0078D4] px-2 py-0.5 rounded text-xs">{assign.relation}</span></div><div className="md:col-span-3 text-[#605E5C] flex items-center gap-2"><span className="md:hidden font-bold">Periodo: </span>{period?.name}</div><div className="md:col-span-1 flex justify-end md:justify-center"><button onClick={() => handleDeleteAssignment(assign.id)} className="p-2 text-[#605E5C] hover:bg-[#FDE7E9] hover:text-[#A80000] rounded-[4px]"><Trash2 size={16} /></button></div></div>); })}</div></div></div>)}
              </div>
            )}

            {/* ... (Mis Evaluaciones, Team Eval, etc.) */}
            {activeTab === 'evaluations' && (
              <>
                <div className="mb-6 flex justify-between items-end"><div><h1 className="text-xl lg:text-2xl font-semibold mb-1 text-[#242424]">Mis Evaluaciones</h1><p className="text-[#605E5C] text-sm">Gestione sus evaluaciones.</p></div><button className="flex items-center gap-2 text-[#0078D4] font-medium hover:bg-[#F3F2F1] px-3 py-2 rounded transition-colors"><Filter size={16} /><span className="text-sm hidden sm:inline">Filtrar</span></button></div>
                <div className="bg-white rounded-[8px] shadow-sm border border-[#E1DFDD] overflow-hidden"><div className="divide-y divide-[#E1DFDD]">{myEvaluations.map((item) => (<div key={item.id} className="p-4 hover:bg-[#F3F2F1] transition-colors text-sm group"><div className="flex justify-between items-start mb-2"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-[#E1DFDD] flex items-center justify-center text-xs font-bold text-[#605E5C]">{item.collaborator.charAt(0)}</div><div><div className="font-medium text-[#242424]">{item.collaborator}</div><div className="text-[#605E5C] text-xs">{item.relation}</div></div></div><div className="flex flex-col items-end gap-2"><span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold inline-flex items-center gap-1 ${item.status === 'Finalizado' ? 'bg-[#DFF6DD] text-[#107C10]' : 'bg-[#FFF4CE] text-[#795E00]'}`}><span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Finalizado' ? 'bg-[#107C10]' : 'bg-[#795E00]'}`}></span>{item.status}</span></div></div><div className="flex justify-end mt-3">{item.action === 'Evaluar' ? (<button onClick={() => startEvaluation(item)} className="bg-[#0078D4] hover:bg-[#106EBE] text-white text-xs font-semibold px-4 py-1.5 rounded shadow-sm w-full sm:w-auto">Evaluar</button>) : (<button onClick={() => viewEvaluation(item)} className="bg-[#F3F2F1] hover:bg-[#E1DFDD] border border-[#E1DFDD] text-[#242424] text-xs font-semibold px-4 py-1.5 rounded shadow-sm w-full sm:w-auto">Ver</button>)}</div></div>))}</div></div>
              </>
            )}

            {activeTab === 'team_evaluations' && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-6 flex justify-between items-end">
                  <div><h1 className="text-xl lg:text-2xl font-semibold mb-1 text-[#242424]">Evaluaciones de mi Equipo</h1><p className="text-[#605E5C] text-sm">Visualice el desempeño consolidado de sus subalternos.</p></div>
                  <select className="p-2 border border-[#8A8886] rounded-[4px] text-sm bg-white text-[#242424] focus:border-[#0078D4] outline-none" value={teamPeriodFilter} onChange={(e) => setTeamPeriodFilter(e.target.value)}><option value="">Todos los periodos</option>{periods.map(p => (<option key={p.id} value={p.name}>{p.name}</option>))}</select>
                </div>
                <div className="grid grid-cols-1 gap-4">{teamEvaluations.filter(member => !teamPeriodFilter || member.period === teamPeriodFilter).map((member) => (<FluentCard key={member.id} className="hover:border-[#0078D4] group"><div className="flex flex-col sm:flex-row justify-between gap-4"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-[#EFF6FC] text-[#0078D4] flex items-center justify-center text-lg font-bold border border-[#E1DFDD]">{member.name.charAt(0)}</div><div><h3 className="font-bold text-[#242424] text-lg">{member.name}</h3><p className="text-sm text-[#605E5C]">{member.role}</p><span className="text-xs text-[#605E5C] block mt-1">Periodo: {member.period}</span></div></div><div className="flex items-center justify-between sm:justify-end gap-6 flex-1">{member.status === 'Completed' ? (<div className="text-center"><p className="text-[10px] uppercase font-bold text-[#605E5C]">Resultado Global</p><div className="flex items-end gap-1.5"><span className="text-2xl font-bold text-[#0078D4]">{member.percentage}%</span><span className="text-sm font-medium text-[#605E5C] mb-1">({member.averageScore.toFixed(1)})</span></div></div>) : (<div className="text-center px-4"><span className="bg-[#FFF4CE] text-[#795E00] px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#795E00]"></span> En Proceso</span></div>)}<FluentButton onClick={() => member.status === 'Completed' && viewTeamReport(member)} disabled={member.status !== 'Completed'} className={`h-10 ${member.status === 'Completed' ? '' : 'opacity-50'}`}>{member.status === 'Completed' ? 'Ver Informe' : 'Pendiente'}</FluentButton></div></div></FluentCard>))}</div>
              </div>
            )}

            {/* ... Perform Evaluation / Report View ... */}
            {activeTab === 'perform_evaluation' && selectedEvaluation && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <button onClick={() => setActiveTab(isReportMode ? 'team_evaluations' : 'evaluations')} className="flex items-center gap-2 text-[#605E5C] hover:text-[#242424] transition-colors"><ArrowLeft size={18} /> <span className="text-sm font-medium">Volver</span></button>
                  {!isReadOnly && (<div className="flex gap-2"><button className="text-[#242424] p-2 rounded hover:bg-[#F3F2F1]" title="Guardar Borrador"><Save size={20} /> </button></div>)}
                  {isReportMode && (<FluentButton onClick={openActionPlanModal} primary className="w-full sm:w-auto"><ClipboardCheck size={18} /> {selectedEvaluation.actionPlan ? 'Ver Plan de Acción' : 'Crear Plan de Acción'}</FluentButton>)}
                </div>
                <div className={`bg-white p-4 lg:p-6 rounded-[8px] shadow-sm border border-[#E1DFDD] mb-6 border-l-[6px] ${isReportMode ? 'border-l-orange-500' : isReadOnly ? 'border-l-[#107C10]' : 'border-l-[#0078D4]'}`}>
                  <div className="flex justify-between items-start"><div><h1 className="text-xl lg:text-2xl font-bold text-[#242424] mb-1">{isReportMode ? 'Informe Consolidado' : isReadOnly ? 'Evaluación Completada' : 'Evaluación'}</h1><p className="text-[#605E5C] text-sm mb-4">{isReportMode ? 'Promedio de todas las evaluaciones recibidas.' : isReadOnly ? 'Solo lectura' : 'Complete el formulario.'}</p></div>{/* Mostrar porcentaje también en Mis Evaluaciones "Ver" */}{(isReportMode || (isReadOnly && selectedEvaluation.percentage)) && selectedEvaluation.percentage && (<div className="flex flex-col items-end"><span className="text-xs font-bold text-[#605E5C] uppercase">Resultado Final</span><div className="flex items-baseline gap-1"><span className="text-3xl font-bold text-[#0078D4]">{selectedEvaluation.percentage}%</span></div></div>)}</div>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-4 border-t border-[#E1DFDD]"><div><p className="text-xs font-bold text-[#605E5C] uppercase tracking-wider mb-1">Colaborador</p><div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-[#0078D4] text-white text-xs flex items-center justify-center">{selectedEvaluation.collaborator.charAt(0)}</div><span className="text-sm font-semibold text-[#242424]">{selectedEvaluation.collaborator}</span></div></div><div><p className="text-xs font-bold text-[#605E5C] uppercase tracking-wider mb-1">Rol/Relación</p><span className="bg-[#F3F2F1] text-[#242424] px-2 py-0.5 rounded text-sm">{selectedEvaluation.relation}</span></div></div>
                </div>
                {isReportMode && selectedEvaluation.breakdown && (
                  <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-2">
                    <SimpleBarChart title="Autoevaluación" data={selectedEvaluation.breakdown.self} colorClass="bg-blue-500" /><SimpleBarChart title="Jefe Inmediato" data={selectedEvaluation.breakdown.boss} colorClass="bg-green-600" /><SimpleBarChart title="Subordinados" data={selectedEvaluation.breakdown.subs} colorClass="bg-purple-500" /><SimpleBarChart title="Pares" data={selectedEvaluation.breakdown.peers} colorClass="bg-orange-500" />
                  </div>
                )}
                <div className="space-y-6 pb-24">
                  {competencies.map((comp) => (
                    <div key={comp.id} className="bg-white rounded-[8px] shadow-sm border border-[#E1DFDD] overflow-hidden">
                      <div className="bg-[#FAFAFA] px-6 py-4 border-b border-[#E1DFDD]"><h2 className="text-lg font-semibold text-[#0078D4]">{comp.competencia}</h2></div>
                      <div className="divide-y divide-[#E1DFDD]">{comp.aspectos.map((aspecto) => (<div key={aspecto.id} className="p-4 lg:p-6 hover:bg-[#FEFEFE] transition-colors"><p className="text-[#242424] font-medium mb-3">{aspecto.question}</p><div className="w-full"><p className="text-xs text-[#605E5C] mb-2 uppercase font-semibold">{isReportMode ? 'Promedio Obtenido' : 'Frecuencia'}</p><RatingScale value={formResponses[aspecto.id]} readOnly={isReadOnly} isAverageMode={isReportMode} onChange={(val: any) => handleResponseChange(aspecto.id, val)} /></div></div>))}</div>
                    </div>
                  ))}
                  {!isReportMode && (<FluentCard className="bg-white"><h3 className="font-semibold text-[#242424] mb-2">Feedback Adicional</h3><textarea disabled={isReadOnly} className={`w-full p-3 text-sm border border-[#8A8886] bg-[#F3F2F1] rounded-[4px] focus:border-b-2 focus:border-b-[#0078D4] focus:bg-white outline-none min-h-[100px] ${isReadOnly ? 'opacity-70 cursor-not-allowed' : ''}`} placeholder={isReadOnly ? 'Sin comentarios.' : "Comentarios finales..."}></textarea></FluentCard>)}
                  {!isReadOnly && (<div className="flex justify-end pt-4"><FluentButton primary onClick={() => { alert("Evaluación enviada con éxito"); setActiveTab('evaluations'); }} className="w-full sm:w-48 py-3"><Send size={18} /> Finalizar</FluentButton></div>)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MODALES */}
        {showEmployeeModal && (<div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-end lg:items-center justify-center lg:justify-end z-50 animate-in fade-in duration-200"><div className="w-full lg:max-w-md h-[90%] lg:h-full bg-white shadow-2xl rounded-t-xl lg:rounded-none lg:border-l border-[#E1DFDD] flex flex-col animate-in slide-in-from-bottom lg:slide-in-from-right duration-300"><div className="p-6 border-b border-[#E1DFDD] flex justify-between items-center"><h2 className="text-xl font-semibold text-[#242424]">{isEditing ? 'Editar Empleado' : 'Nuevo Empleado'}</h2><button onClick={() => setShowEmployeeModal(false)} className="text-[#605E5C] hover:text-[#242424]"><X size={24} /></button></div><div className="p-6 flex-1 overflow-auto"><FluentInput label="Nombre Completo" placeholder="Ej. Maria Gonzales" value={employeeForm.name} onChange={(e: any) => setEmployeeForm({ ...employeeForm, name: e.target.value })} /><FluentInput label="Correo Electrónico" placeholder="usuario@empresa.com" type="email" value={employeeForm.email} onChange={(e: any) => setEmployeeForm({ ...employeeForm, email: e.target.value })} /><FluentInput label="Departamento" placeholder="Ej. Finanzas" value={employeeForm.department} onChange={(e: any) => setEmployeeForm({ ...employeeForm, department: e.target.value })} /><FluentInput label="Cargo / Puesto" placeholder="Ej. Analista Senior" value={employeeForm.role} onChange={(e: any) => setEmployeeForm({ ...employeeForm, role: e.target.value })} /></div><div className="p-6 border-t border-[#E1DFDD] bg-[#FAFAFA] flex justify-end gap-3 pb-safe"><FluentButton onClick={() => setShowEmployeeModal(false)}>Cancelar</FluentButton><FluentButton primary onClick={handleSaveEmployee}>Guardar</FluentButton></div></div></div>)}
        {showPeriodModal && (<div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-end lg:items-center justify-center lg:justify-end z-50 animate-in fade-in duration-200"><div className="w-full lg:max-w-md h-[90%] lg:h-full bg-white shadow-2xl rounded-t-xl lg:rounded-none lg:border-l border-[#E1DFDD] flex flex-col animate-in slide-in-from-bottom lg:slide-in-from-right duration-300"><div className="p-6 border-b border-[#E1DFDD] flex justify-between items-center"><h2 className="text-xl font-semibold text-[#242424]">{isEditingPeriod ? 'Editar Periodo' : 'Nuevo Periodo'}</h2><button onClick={() => setShowPeriodModal(false)} className="text-[#605E5C] hover:text-[#242424]"><X size={24} /></button></div><div className="p-6 flex-1 overflow-auto"><FluentInput label="Nombre del Periodo" placeholder="Ej. Evaluación Q3 2025" value={periodForm.name} onChange={(e: any) => setPeriodForm({ ...periodForm, name: e.target.value })} /><div className="grid grid-cols-2 gap-4"><FluentInput label="Fecha Inicio" type="date" value={periodForm.startDate} onChange={(e: any) => setPeriodForm({ ...periodForm, startDate: e.target.value })} /><FluentInput label="Fecha Fin" type="date" value={periodForm.endDate} onChange={(e: any) => setPeriodForm({ ...periodForm, endDate: e.target.value })} /></div><div className="flex flex-col gap-1.5 mb-4"><label className="text-sm font-semibold text-[#242424]">Estado</label><select value={periodForm.status} onChange={(e) => setPeriodForm({ ...periodForm, status: e.target.value })} className="w-full p-2.5 text-sm border-b border-[#8A8886] bg-[#F3F2F1] rounded-t-[4px] focus:border-b-2 focus:border-[#0078D4] focus:bg-white outline-none"><option value="Active">Activo</option><option value="Closed">Cerrado</option><option value="Scheduled">Programado</option></select></div></div><div className="p-6 border-t border-[#E1DFDD] bg-[#FAFAFA] flex justify-end gap-3 pb-safe"><FluentButton onClick={() => setShowPeriodModal(false)}>Cancelar</FluentButton><FluentButton primary onClick={handleSavePeriod}>Guardar Periodo</FluentButton></div></div></div>)}
        {showCompetencyModal && (<div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-end lg:items-center justify-center lg:justify-end z-50 animate-in fade-in duration-200"><div className="w-full lg:max-w-xl h-[95%] lg:h-full bg-white shadow-2xl rounded-t-xl lg:rounded-none lg:border-l border-[#E1DFDD] flex flex-col animate-in slide-in-from-bottom lg:slide-in-from-right duration-300"><div className="p-6 border-b border-[#E1DFDD] flex justify-between items-center"><h2 className="text-xl font-semibold text-[#242424]">{isEditingCompetency ? 'Editar Competencia' : 'Nueva Competencia'}</h2><button onClick={() => setShowCompetencyModal(false)} className="text-[#605E5C] hover:text-[#242424]"><X size={24} /></button></div><div className="p-6 flex-1 overflow-auto"><p className="text-sm text-[#605E5C] mb-6">Configure la competencia y las preguntas asociadas.</p><FluentInput label="Nombre de la Competencia" placeholder="Ej. Liderazgo" value={competencyForm.competencia} onChange={(e: any) => setCompetencyForm({ ...competencyForm, competencia: e.target.value })} /><div className="mt-6"><div className="flex justify-between items-center mb-2"><label className="text-sm font-semibold text-[#242424]">Preguntas (Aspectos)</label><button onClick={handleAddAspectToForm} className="text-xs text-[#0078D4] font-medium hover:underline flex items-center gap-1"><Plus size={14} /> Agregar Pregunta</button></div><div className="space-y-3">{competencyForm.aspectos.map((aspecto, index) => (<div key={aspecto.id} className="flex gap-2 items-start"><span className="text-xs font-bold text-[#605E5C] mt-3 w-4">{index + 1}.</span><div className="flex-1"><textarea value={aspecto.question} onChange={(e) => handleChangeAspectQuestion(index, e.target.value)} placeholder="Escriba la pregunta..." className="w-full p-2 text-sm border border-[#E1DFDD] bg-[#FAFAFA] rounded-[4px] focus:border-[#0078D4] focus:bg-white outline-none resize-none h-[60px]" /></div><button onClick={() => handleRemoveAspectFromForm(index)} className="text-[#605E5C] hover:text-[#A80000] mt-1.5 p-1.5 rounded-[4px]"><Trash2 size={16} /></button></div>))}</div></div></div><div className="p-6 border-t border-[#E1DFDD] bg-[#FAFAFA] flex justify-end gap-3 pb-safe"><FluentButton onClick={() => setShowCompetencyModal(false)}>Cancelar</FluentButton><FluentButton primary onClick={handleSaveCompetency}>Guardar Competencia</FluentButton></div></div></div>)}
        {showAssignmentModal && (<div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-end lg:items-center justify-center lg:justify-end z-50 animate-in fade-in duration-200"><div className="w-full lg:max-w-md h-[90%] lg:h-full bg-white shadow-2xl rounded-t-xl lg:rounded-none lg:border-l border-[#E1DFDD] flex flex-col animate-in slide-in-from-bottom lg:slide-in-from-right duration-300"><div className="p-6 border-b border-[#E1DFDD] flex justify-between items-center"><h2 className="text-xl font-semibold text-[#242424]">Nueva Asignación</h2><button onClick={() => setShowAssignmentModal(false)} className="text-[#605E5C] hover:text-[#242424]"><X size={24} /></button></div><div className="p-6 flex-1 overflow-auto"><div className="flex flex-col gap-1.5 mb-4"><label className="text-sm font-semibold text-[#242424]">Evaluador</label><select value={assignmentForm.evaluatorId} onChange={(e) => setAssignmentForm({ ...assignmentForm, evaluatorId: e.target.value })} className="w-full p-2.5 text-sm border-b border-[#8A8886] bg-[#F3F2F1] rounded-t-[4px] focus:border-b-2 focus:border-[#0078D4] focus:bg-white outline-none"><option value="">Seleccione...</option>{employees.filter(e => e.status === 'Active').map(emp => (<option key={emp.id} value={emp.id}>{emp.name}</option>))}</select></div><div className="flex flex-col gap-1.5 mb-4"><label className="text-sm font-semibold text-[#242424]">Evaluado</label><select value={assignmentForm.evaluateeId} onChange={(e) => setAssignmentForm({ ...assignmentForm, evaluateeId: e.target.value })} className="w-full p-2.5 text-sm border-b border-[#8A8886] bg-[#F3F2F1] rounded-t-[4px] focus:border-b-2 focus:border-[#0078D4] focus:bg-white outline-none"><option value="">Seleccione...</option>{employees.filter(e => e.status === 'Active').map(emp => (<option key={emp.id} value={emp.id}>{emp.name}</option>))}</select></div><div className="flex flex-col gap-1.5 mb-4"><label className="text-sm font-semibold text-[#242424]">Relación</label><select value={assignmentForm.relation} onChange={(e) => setAssignmentForm({ ...assignmentForm, relation: e.target.value })} className="w-full p-2.5 text-sm border-b border-[#8A8886] bg-[#F3F2F1] rounded-t-[4px] focus:border-b-2 focus:border-[#0078D4] focus:bg-white outline-none"><option value="Pares">Pares</option><option value="Jefe Inmediato">Jefe Inmediato</option><option value="Subalterno">Subalterno</option></select></div><div className="flex flex-col gap-1.5 mb-4"><label className="text-sm font-semibold text-[#242424]">Periodo</label><select value={assignmentForm.periodId} onChange={(e) => setAssignmentForm({ ...assignmentForm, periodId: e.target.value })} className="w-full p-2.5 text-sm border-b border-[#8A8886] bg-[#F3F2F1] rounded-t-[4px] focus:border-b-2 focus:border-[#0078D4] focus:bg-white outline-none"><option value="">Seleccione...</option>{periods.filter(p => p.status === 'Active').map(period => (<option key={period.id} value={period.id}>{period.name}</option>))}</select></div></div><div className="p-6 border-t border-[#E1DFDD] bg-[#FAFAFA] flex justify-end gap-3 pb-safe"><FluentButton onClick={() => setShowAssignmentModal(false)}>Cancelar</FluentButton><FluentButton primary onClick={handleSaveAssignment}>Crear</FluentButton></div></div></div>)}

        {/* ================= MODAL PLAN DE ACCION (RENOVADO CON READ ONLY) ================= */}
        {showActionPlanModal && (
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-end lg:items-center justify-center lg:justify-end z-50 animate-in fade-in duration-200">
            <div className="w-full lg:max-w-2xl h-[95%] lg:h-full bg-white shadow-2xl rounded-t-xl lg:rounded-none lg:border-l border-[#E1DFDD] flex flex-col animate-in slide-in-from-bottom lg:slide-in-from-right duration-300">
              <div className="p-6 border-b border-[#E1DFDD] flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-[#242424]">Plan de Acción</h2>
                  <p className="text-sm text-[#605E5C] flex items-center gap-2">
                    {selectedEvaluation?.collaborator}
                    {isActionPlanReadOnly && <span className="bg-[#F3F2F1] text-[#605E5C] text-[10px] px-2 py-0.5 rounded flex items-center gap-1"><Lock size={10} /> Solo Lectura</span>}
                  </p>
                </div>
                <button onClick={() => setShowActionPlanModal(false)} className="text-[#605E5C] hover:text-[#242424]"><X size={24} /></button>
              </div>
              <div className="p-6 flex-1 overflow-auto space-y-8">
                {/* 1. Análisis Inicial */}
                <div className="bg-[#F3F2F1] p-4 rounded-[8px]">
                  <h3 className="font-bold text-[#0078D4] mb-4 flex items-center gap-2 text-sm uppercase tracking-wide"><Lightbulb size={16} /> 1. Análisis de Resultados</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-xs font-bold text-[#605E5C] mb-1 block">Fortalezas</label><textarea disabled={isActionPlanReadOnly} className={`w-full p-2 text-sm border border-[#E1DFDD] rounded-[4px] outline-none h-20 resize-none ${isActionPlanReadOnly ? 'bg-[#E1DFDD] text-[#605E5C]' : 'bg-white focus:border-[#0078D4]'}`} value={actionPlanForm.strengths} onChange={(e) => setActionPlanForm({ ...actionPlanForm, strengths: e.target.value })}></textarea></div>
                    <div><label className="text-xs font-bold text-[#605E5C] mb-1 block">Áreas de Oportunidad</label><textarea disabled={isActionPlanReadOnly} className={`w-full p-2 text-sm border border-[#E1DFDD] rounded-[4px] outline-none h-20 resize-none ${isActionPlanReadOnly ? 'bg-[#E1DFDD] text-[#605E5C]' : 'bg-white focus:border-[#0078D4]'}`} value={actionPlanForm.weaknesses} onChange={(e) => setActionPlanForm({ ...actionPlanForm, weaknesses: e.target.value })}></textarea></div>
                  </div>
                </div>
                {/* 2. Planes por Competencia */}
                <div>
                  <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-[#0078D4] flex items-center gap-2 text-sm uppercase tracking-wide"><Target size={16} /> 2. Planes Específicos</h3>{!isActionPlanReadOnly && (<button onClick={handleAddCompetencyPlan} className="text-xs bg-[#0078D4] text-white px-3 py-1.5 rounded-[4px] hover:bg-[#106EBE] flex items-center gap-1 transition-colors"><Plus size={14} /> Agregar Competencia</button>)}</div>
                  <div className="space-y-6">
                    {actionPlanForm.competencyPlans.map((plan: any, planIndex: number) => (
                      <div key={plan.id} className="border border-[#E1DFDD] rounded-[8px] overflow-hidden shadow-sm">
                        <div className="bg-[#FAFAFA] p-4 border-b border-[#E1DFDD] flex justify-between items-start">
                          <div className="w-full pr-4">
                            <div className="flex flex-col gap-1.5 mb-3"><label className="text-[10px] font-bold text-[#605E5C] uppercase">Competencia a Trabajar</label><select disabled={isActionPlanReadOnly} className={`w-full p-2 text-sm border border-[#E1DFDD] rounded-[4px] outline-none font-semibold ${isActionPlanReadOnly ? 'bg-[#F3F2F1]' : 'bg-white focus:border-[#0078D4]'}`} value={plan.competencyName} onChange={(e) => handleChangeCompetencyPlan(planIndex, 'competencyName', e.target.value)}><option value="">Seleccione Competencia...</option>{competencies.map(c => (<option key={c.id} value={c.competencia}>{c.competencia}</option>))}</select></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="flex flex-col gap-1"><label className="text-[10px] font-bold text-[#605E5C] uppercase">Objetivo</label><input type="text" disabled={isActionPlanReadOnly} className={`w-full p-2 text-sm border-b border-[#E1DFDD] outline-none ${isActionPlanReadOnly ? 'bg-transparent text-[#605E5C]' : 'bg-transparent focus:border-[#0078D4]'}`} placeholder="¿Qué se quiere lograr?" value={plan.objective} onChange={(e) => handleChangeCompetencyPlan(planIndex, 'objective', e.target.value)} /></div><div className="flex flex-col gap-1"><label className="text-[10px] font-bold text-[#605E5C] uppercase">Indicador de Éxito</label><input type="text" disabled={isActionPlanReadOnly} className={`w-full p-2 text-sm border-b border-[#E1DFDD] outline-none ${isActionPlanReadOnly ? 'bg-transparent text-[#605E5C]' : 'bg-transparent focus:border-[#0078D4]'}`} placeholder="¿Cómo se medirá?" value={plan.successIndicator} onChange={(e) => handleChangeCompetencyPlan(planIndex, 'successIndicator', e.target.value)} /></div></div>
                          </div>
                          {!isActionPlanReadOnly && (<button onClick={() => handleRemoveCompetencyPlan(planIndex)} className="text-[#A80000] p-1.5 hover:bg-[#FDE7E9] rounded"><Trash2 size={18} /></button>)}
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-2"><h5 className="text-xs font-bold text-[#242424] uppercase">Acciones Definidas</h5>{!isActionPlanReadOnly && (<button onClick={() => handleAddActionToPlan(planIndex)} className="text-[10px] text-[#0078D4] font-bold hover:underline flex items-center gap-1"><Plus size={12} /> Agregar Acción</button>)}</div>
                          <div className="space-y-4">
                            {plan.actions.map((action: any, actionIndex: number) => {
                              const selectedCompData = competencies.find(c => c.competencia === plan.competencyName);
                              const availableAspects = selectedCompData ? selectedCompData.aspectos : [];
                              return (
                                <div key={action.id} className="bg-[#F8F9FA] p-3 rounded-[4px] border border-[#E1DFDD] text-sm">
                                  <div className="flex justify-between mb-2"><span className="text-[10px] font-bold text-[#0078D4] bg-[#EFF6FC] px-2 py-0.5 rounded">Acción #{actionIndex + 1}</span>{!isActionPlanReadOnly && (<button onClick={() => handleRemoveActionFromPlan(planIndex, actionIndex)} className="text-[#605E5C] hover:text-[#A80000]"><X size={14} /></button>)}</div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3"><div className="flex flex-col gap-1"><label className="text-[10px] text-[#605E5C] font-bold">Aspecto a Mejorar</label><select disabled={isActionPlanReadOnly} className={`w-full p-1.5 border border-[#E1DFDD] rounded text-xs ${isActionPlanReadOnly ? 'bg-[#F3F2F1]' : 'bg-white'}`} value={action.aspecto} onChange={(e) => handleChangeActionInPlan(planIndex, actionIndex, 'aspecto', e.target.value)}><option value="">Seleccione aspecto...</option>{availableAspects.map(aspecto => (<option key={aspecto.id} value={aspecto.question}>{aspecto.question}</option>))}</select></div><div className="flex flex-col gap-1"><label className="text-[10px] text-[#605E5C] font-bold">Acción Concreta</label><input type="text" disabled={isActionPlanReadOnly} className={`w-full p-1.5 border border-[#E1DFDD] rounded text-xs ${isActionPlanReadOnly ? 'bg-[#F3F2F1]' : 'bg-white'}`} placeholder="Descripción" value={action.action} onChange={(e) => handleChangeActionInPlan(planIndex, actionIndex, 'action', e.target.value)} /></div></div>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                                    <div><label className="text-[10px] text-[#605E5C] font-bold">Tipo</label><input type="text" disabled={isActionPlanReadOnly} className={`w-full p-1.5 border border-[#E1DFDD] rounded text-xs ${isActionPlanReadOnly ? 'bg-[#F3F2F1]' : 'bg-white'}`} placeholder="Ej. Curso" value={action.actionType} onChange={(e) => handleChangeActionInPlan(planIndex, actionIndex, 'actionType', e.target.value)} /></div>
                                    <div><label className="text-[10px] text-[#605E5C] font-bold">Fecha Límite</label><input type="date" disabled={isActionPlanReadOnly} className={`w-full p-1.5 border border-[#E1DFDD] rounded text-xs ${isActionPlanReadOnly ? 'bg-[#F3F2F1]' : 'bg-white'}`} value={action.deadline} onChange={(e) => handleChangeActionInPlan(planIndex, actionIndex, 'deadline', e.target.value)} /></div>
                                    <div><label className="text-[10px] text-[#605E5C] font-bold">Estado</label><select disabled={isActionPlanReadOnly} className={`w-full p-1.5 border border-[#E1DFDD] rounded text-xs ${isActionPlanReadOnly ? 'bg-[#F3F2F1]' : 'bg-white'}`} value={action.status} onChange={(e) => handleChangeActionInPlan(planIndex, actionIndex, 'status', e.target.value)}><option value="Sin Iniciar">Sin Iniciar</option><option value="En Proceso">En Proceso</option><option value="Finalizado">Finalizado</option></select></div>
                                    <div><label className="text-[10px] text-[#605E5C] font-bold">Observaciones</label><input type="text" disabled={isActionPlanReadOnly} className={`w-full p-1.5 border border-[#E1DFDD] rounded text-xs ${isActionPlanReadOnly ? 'bg-[#F3F2F1]' : 'bg-white'}`} placeholder="Notas..." value={action.observations} onChange={(e) => handleChangeActionInPlan(planIndex, actionIndex, 'observations', e.target.value)} /></div>
                                  </div>
                                </div>
                              )
                            })}
                            {plan.actions.length === 0 && (<div className="text-center py-4 text-xs text-[#605E5C] italic border-2 border-dashed border-[#E1DFDD] rounded">No hay acciones registradas para esta competencia.</div>)}
                          </div>
                        </div>
                      </div>
                    ))}
                    {actionPlanForm.competencyPlans.length === 0 && (<div className="text-center py-8 text-sm text-[#605E5C]">{isActionPlanReadOnly ? 'No se han definido planes específicos.' : 'Comience agregando una competencia para estructurar el plan.'}</div>)}
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-[#E1DFDD] bg-[#FAFAFA] flex justify-end gap-3 pb-safe">
                {isActionPlanReadOnly ? (<FluentButton onClick={() => setShowActionPlanModal(false)}>Cerrar</FluentButton>) : (<><FluentButton onClick={() => setShowActionPlanModal(false)}>Cancelar</FluentButton><FluentButton primary onClick={handleSaveActionPlan}>Guardar Plan</FluentButton></>)}
              </div>
            </div>
          </div>
        )}

        <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-[#E1DFDD] flex justify-around items-center px-2 py-2 z-30 pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          <BottomNavItem icon={LayoutGrid} label="Inicio" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          {userRole === 'admin' && (<><BottomNavItem icon={UserCog} label="Equipo" active={activeTab === 'employees'} onClick={() => setActiveTab('employees')} /><BottomNavItem icon={Settings} label="Ajustes" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} /></>)}
          <BottomNavItem icon={ClipboardList} label="Evaluar" active={activeTab === 'evaluations' || activeTab === 'perform_evaluation'} onClick={() => setActiveTab('evaluations')} />
          <BottomNavItem icon={UsersRound} label="Mi Equipo" active={activeTab === 'team_evaluations'} onClick={() => setActiveTab('team_evaluations')} />
        </nav>

      </main>
    </div>
  );
}