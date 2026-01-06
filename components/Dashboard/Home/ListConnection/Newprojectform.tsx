import { X, User, Briefcase, DollarSign, CheckCircle, Users, ArrowLeft } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TeamMember {
  id: string;
  avatar: string;
}

interface Project {
  id: string;
  user: {
    name: string;
    role: string;
    avatar: string;
  };
  project: string;
  team: TeamMember[];
  status: 'Active' | 'Pending' | 'Cancel';
  budget: string;
}

interface NewProjectFormData {
  userName: string;
  userRole: string;
  projectName: string;
  teamName: string;
  immediateSupervisor: string;
  clientName: string;
  clientCompany: string;
}

interface ConfirmModal {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  type: 'warning' | 'danger' | 'info' | 'success';
  showCancelButton?: boolean;
}

interface NewProjectFormProps {
  onClose: () => void;
  onSubmit: (project: Project) => void;
}

export default function NewProjectForm({ onClose, onSubmit }: NewProjectFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<NewProjectFormData>({
    userName: '',
    userRole: '',
    projectName: '', // Will be set by useEffect
    teamName: '',
    immediateSupervisor: '',
    clientName: '',
    clientCompany: '',
  });
  const [showUserSuggestions, setShowUserSuggestions] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<Array<{ name: string; role: string; team: string; supervisor: string }>>([]);
  const [selectedUser, setSelectedUser] = useState<{ name: string; role: string; team: string; supervisor: string } | null>(null);
  const [showProjectSuggestions, setShowProjectSuggestions] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState<Array<{ name: string; description: string; category: string }>>([]);
  const [showRoleSuggestions, setShowRoleSuggestions] = useState(false);
  const [filteredRoles, setFilteredRoles] = useState<Array<{ name: string; department: string }>>([]);
  const [selectedRole, setSelectedRole] = useState<{ name: string; department: string } | null>(null);
  const [showTeamSuggestions, setShowTeamSuggestions] = useState(false);
  const [filteredTeams, setFilteredTeams] = useState<Array<{ name: string; description: string }>>([]);
  const [selectedTeam, setSelectedTeam] = useState<{ name: string; description: string } | null>(null);
  const [showSupervisorSuggestions, setShowSupervisorSuggestions] = useState(false);
  const [filteredSupervisors, setFilteredSupervisors] = useState<Array<{ name: string; role: string }>>([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState<{ name: string; role: string } | null>(null);
  const [showClientSuggestions, setShowClientSuggestions] = useState(false);
  const [filteredClients, setFilteredClients] = useState<Array<{ name: string; company: string; email: string }>>([]);
  const [selectedClient, setSelectedClient] = useState<{ name: string; company: string; email: string } | null>(null);
  const [additionalClients, setAdditionalClients] = useState<Array<{ name: string; company: string; email: string }>>([]);
  const [confirmModal, setConfirmModal] = useState<ConfirmModal>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    onCancel: () => {},
    type: 'info'
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const projectDropdownRef = useRef<HTMLDivElement>(null);
  const roleDropdownRef = useRef<HTMLDivElement>(null);
  const teamDropdownRef = useRef<HTMLDivElement>(null);
  const supervisorDropdownRef = useRef<HTMLDivElement>(null);
  const clientDropdownRef = useRef<HTMLDivElement>(null);

  // Lista de usuarios disponibles
  const availableUsers = [
    { name: 'Lindsey Curtis', role: 'Web Designer', team: 'Equipo de Diseño', supervisor: 'Marcus Rivera' },
    { name: 'Kaiya George', role: 'Project Manager', team: 'Equipo de Gestión', supervisor: 'Emma Thompson' },
    { name: 'Zain Geidt', role: 'Content Writer', team: '', supervisor: '' }, // Sin equipo ni supervisor
    { name: 'Abram Schleifer', role: 'Digital Marketer', team: 'Equipo de Marketing', supervisor: 'Oliver Martinez' },
    { name: 'Carla George', role: 'Front-end Developer', team: 'Equipo de Desarrollo Frontend', supervisor: 'Sofia Chen' },
    { name: 'Marcus Rivera', role: 'UX Designer', team: 'Equipo de Diseño', supervisor: 'Emma Thompson' },
    { name: 'Sofia Chen', role: 'Backend Developer', team: 'Equipo de Desarrollo Backend', supervisor: 'James Wilson' },
    { name: 'James Wilson', role: 'DevOps Engineer', team: 'Equipo de Infraestructura', supervisor: 'Emma Thompson' },
    { name: 'Emma Thompson', role: 'Product Manager', team: 'Dirección de Producto', supervisor: '' },
    { name: 'Oliver Martinez', role: 'SEO Specialist', team: 'Equipo de Marketing', supervisor: 'Abram Schleifer' },
    { name: 'Isabella Garcia', role: 'Graphic Designer', team: 'Equipo de Diseño', supervisor: 'Marcus Rivera' },
    { name: 'Noah Anderson', role: 'Data Analyst', team: 'Equipo de Analytics', supervisor: 'Emma Thompson' },
    { name: 'Ava Rodriguez', role: '', team: '', supervisor: '' }, // Sin información completa
    { name: 'Liam Brown', role: '', team: 'Equipo de QA', supervisor: 'James Wilson' }, // Sin rol pero con equipo
    { name: 'Mia Taylor', role: 'Business Analyst', team: '', supervisor: 'Emma Thompson' }, // Sin equipo
  ];

  // Lista de proyectos disponibles
  const availableProjects = [
    { name: 'E-commerce Platform', description: 'Sistema completo de ventas online', category: 'Desarrollo Web' },
    { name: 'Mobile Banking App', description: 'Aplicación móvil para servicios bancarios', category: 'Desarrollo Móvil' },
    { name: 'CRM System', description: 'Gestión de relaciones con clientes', category: 'Software Empresarial' },
    { name: 'Marketing Campaign', description: 'Campaña digital multicanal', category: 'Marketing Digital' },
    { name: 'Brand Redesign', description: 'Renovación de identidad corporativa', category: 'Diseño Gráfico' },
    { name: 'Data Analytics Dashboard', description: 'Panel de análisis de datos en tiempo real', category: 'Business Intelligence' },
    { name: 'API Integration', description: 'Integración de servicios externos', category: 'Desarrollo Backend' },
    { name: 'Cloud Migration', description: 'Migración de infraestructura a la nube', category: 'DevOps' },
    { name: 'SEO Optimization', description: 'Mejora de posicionamiento web', category: 'SEO/SEM' },
    { name: 'Social Media Strategy', description: 'Estrategia de redes sociales', category: 'Marketing Digital' },
  ];

  // Lista de roles disponibles
  const availableRoles = [
    { name: 'Web Designer', department: 'Diseño' },
    { name: 'Project Manager', department: 'Gestión' },
    { name: 'Content Writer', department: 'Marketing' },
    { name: 'Digital Marketer', department: 'Marketing' },
    { name: 'Front-end Developer', department: 'Desarrollo' },
    { name: 'UX Designer', department: 'Diseño' },
    { name: 'Backend Developer', department: 'Desarrollo' },
    { name: 'DevOps Engineer', department: 'Infraestructura' },
    { name: 'Product Manager', department: 'Producto' },
    { name: 'SEO Specialist', department: 'Marketing' },
    { name: 'Graphic Designer', department: 'Diseño' },
    { name: 'Data Analyst', department: 'Analytics' },
    { name: 'Business Analyst', department: 'Negocio' },
    { name: 'QA Engineer', department: 'Calidad' },
    { name: 'Mobile Developer', department: 'Desarrollo' },
  ];

  // Lista de equipos disponibles
  const availableTeams = [
    { name: 'Equipo de Diseño', description: 'Diseño UI/UX y gráfico' },
    { name: 'Equipo de Gestión', description: 'Administración de proyectos' },
    { name: 'Equipo de Marketing', description: 'Marketing digital y contenido' },
    { name: 'Equipo de Desarrollo Frontend', description: 'Interfaces y experiencia de usuario' },
    { name: 'Equipo de Desarrollo Backend', description: 'APIs y lógica de negocio' },
    { name: 'Equipo de Infraestructura', description: 'DevOps y cloud' },
    { name: 'Dirección de Producto', description: 'Estrategia de producto' },
    { name: 'Equipo de Analytics', description: 'Análisis de datos' },
    { name: 'Equipo de QA', description: 'Control de calidad' },
  ];

  // Lista de supervisores disponibles (usuarios que pueden ser supervisores)
  const availableSupervisors = [
    { name: 'Marcus Rivera', role: 'UX Designer' },
    { name: 'Emma Thompson', role: 'Product Manager' },
    { name: 'Sofia Chen', role: 'Backend Developer' },
    { name: 'James Wilson', role: 'DevOps Engineer' },
    { name: 'Oliver Martinez', role: 'SEO Specialist' },
    { name: 'Abram Schleifer', role: 'Digital Marketer' },
  ];

  // Lista de clientes disponibles
  const availableClients = [
    { name: 'Roberto Méndez', company: 'Tech Solutions SA', email: 'roberto@techsolutions.com' },
    { name: 'Ana Martínez', company: 'Innovate Corp', email: 'ana.martinez@innovate.com' },
    { name: 'Carlos Hernández', company: 'Digital Ventures', email: 'carlos@digitalventures.com' },
    { name: 'María Rodríguez', company: 'StartUp Hub', email: 'maria.r@startuphub.com' },
    { name: 'Jorge López', company: 'Consulting Group', email: 'jorge.lopez@consulting.com' },
    { name: 'Patricia González', company: 'Creative Agency', email: 'patricia@creativeagency.com' },
    { name: 'Fernando Silva', company: 'Enterprise Solutions', email: 'fernando@enterprise.com' },
    { name: 'Laura Ramírez', company: 'Marketing Pro', email: 'laura@marketingpro.com' },
    { name: 'Miguel Torres', company: 'Business Partners', email: 'miguel.torres@bizpartners.com' },
    { name: 'Sandra Vargas', company: 'Global Tech', email: 'sandra@globaltech.com' },
  ];

  // Proyecto seleccionado por defecto (el primero de la lista)
  const [selectedProject, setSelectedProject] = useState<{ name: string; description: string; category: string }>(
    availableProjects[0]
  );

  const totalSteps = 4;

  // Función para mostrar modal de confirmación
  const showConfirm = (
    title: string,
    message: string,
    onConfirm: () => void,
    type: 'warning' | 'danger' | 'info' | 'success' = 'info',
    showCancelButton: boolean = true
  ): void => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      },
      onCancel: () => {
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      },
      type,
      showCancelButton
    });
  };

  // Establecer proyecto por defecto en formData
  useEffect(() => {
    if (!formData.projectName) {
      setFormData(prev => ({ ...prev, projectName: availableProjects[0].name }));
    }
  }, []);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserSuggestions(false);
      }
      if (projectDropdownRef.current && !projectDropdownRef.current.contains(event.target as Node)) {
        setShowProjectSuggestions(false);
      }
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target as Node)) {
        setShowRoleSuggestions(false);
      }
      if (teamDropdownRef.current && !teamDropdownRef.current.contains(event.target as Node)) {
        setShowTeamSuggestions(false);
      }
      if (supervisorDropdownRef.current && !supervisorDropdownRef.current.contains(event.target as Node)) {
        setShowSupervisorSuggestions(false);
      }
      if (clientDropdownRef.current && !clientDropdownRef.current.contains(event.target as Node)) {
        setShowClientSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleUserNameChange = (value: string) => {
    setFormData({ ...formData, userName: value });
    
    if (value.trim().length > 0) {
      const filtered = availableUsers.filter(user =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
      setShowUserSuggestions(true);
    } else {
      setFilteredUsers([]);
      setShowUserSuggestions(false);
    }
  };

  const handleUserSelect = (user: { name: string; role: string; team: string; supervisor: string }) => {
    setFormData({ 
      ...formData, 
      userName: user.name, 
      userRole: user.role,
      teamName: user.team,
      immediateSupervisor: user.supervisor
    });
    setSelectedUser(user);
    // Si el usuario tiene rol, seleccionarlo también
    if (user.role) {
      const roleObj = availableRoles.find(r => r.name === user.role);
      if (roleObj) setSelectedRole(roleObj);
    }
    // Si el usuario tiene equipo, seleccionarlo también
    if (user.team) {
      const teamObj = availableTeams.find(t => t.name === user.team);
      if (teamObj) setSelectedTeam(teamObj);
    }
    // Si el usuario tiene supervisor, seleccionarlo también
    if (user.supervisor) {
      const supervisorObj = availableSupervisors.find(s => s.name === user.supervisor);
      if (supervisorObj) setSelectedSupervisor(supervisorObj);
    }
    setShowUserSuggestions(false);
    setFilteredUsers([]);
  };

  const handleRemoveUser = () => {
    setSelectedUser(null);
    setSelectedRole(null);
    setSelectedTeam(null);
    setSelectedSupervisor(null);
    setFormData({ ...formData, userName: '', userRole: '', teamName: '', immediateSupervisor: '' });
  };

  const handleRoleNameChange = (value: string) => {
    setFormData({ ...formData, userRole: value });
    
    if (value.trim().length > 0) {
      const filtered = availableRoles.filter(role =>
        role.name.toLowerCase().includes(value.toLowerCase()) ||
        role.department.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredRoles(filtered);
      setShowRoleSuggestions(true);
    } else {
      setFilteredRoles([]);
      setShowRoleSuggestions(false);
    }
  };

  const handleRoleSelect = (role: { name: string; department: string }) => {
    setFormData({ ...formData, userRole: role.name });
    setSelectedRole(role);
    setShowRoleSuggestions(false);
    setFilteredRoles([]);
  };

  const handleRemoveRole = () => {
    setSelectedRole(null);
    setFormData({ ...formData, userRole: '' });
  };

  const handleTeamNameChange = (value: string) => {
    setFormData({ ...formData, teamName: value });
    
    if (value.trim().length > 0) {
      const filtered = availableTeams.filter(team =>
        team.name.toLowerCase().includes(value.toLowerCase()) ||
        team.description.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredTeams(filtered);
      setShowTeamSuggestions(true);
    } else {
      setFilteredTeams([]);
      setShowTeamSuggestions(false);
    }
  };

  const handleTeamSelect = (team: { name: string; description: string }) => {
    setFormData({ ...formData, teamName: team.name });
    setSelectedTeam(team);
    setShowTeamSuggestions(false);
    setFilteredTeams([]);
  };

  const handleRemoveTeam = () => {
    setSelectedTeam(null);
    setFormData({ ...formData, teamName: '' });
  };

  const handleSupervisorNameChange = (value: string) => {
    setFormData({ ...formData, immediateSupervisor: value });
    
    if (value.trim().length > 0) {
      const filtered = availableSupervisors.filter(supervisor =>
        supervisor.name.toLowerCase().includes(value.toLowerCase()) ||
        supervisor.role.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSupervisors(filtered);
      setShowSupervisorSuggestions(true);
    } else {
      setFilteredSupervisors([]);
      setShowSupervisorSuggestions(false);
    }
  };

  const handleSupervisorSelect = (supervisor: { name: string; role: string }) => {
    setFormData({ ...formData, immediateSupervisor: supervisor.name });
    setSelectedSupervisor(supervisor);
    setShowSupervisorSuggestions(false);
    setFilteredSupervisors([]);
  };

  const handleRemoveSupervisor = () => {
    setSelectedSupervisor(null);
    setFormData({ ...formData, immediateSupervisor: '' });
  };

  const handleClientNameChange = (value: string) => {
    setFormData({ ...formData, clientName: value });
    
    if (value.trim().length > 0) {
      const filtered = availableClients.filter(client =>
        client.name.toLowerCase().includes(value.toLowerCase()) ||
        client.company.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredClients(filtered);
      setShowClientSuggestions(true);
    } else {
      setFilteredClients([]);
      setShowClientSuggestions(false);
    }
  };

  const handleClientSelect = (client: { name: string; company: string; email: string }) => {
    setFormData({ ...formData, clientName: client.name, clientCompany: client.company });
    setSelectedClient(client);
    setShowClientSuggestions(false);
    setFilteredClients([]);
  };

  const handleRemoveClient = () => {
    setSelectedClient(null);
    setFormData({ ...formData, clientName: '', clientCompany: '' });
  };

  const handleAddAnotherClient = () => {
    if (selectedClient) {
      // Agregar el cliente actual a la lista de clientes adicionales
      setAdditionalClients([...additionalClients, selectedClient]);
      // Resetear la selección actual para permitir agregar otro
      setSelectedClient(null);
      setFormData({ ...formData, clientName: '', clientCompany: '' });
    }
  };

  const handleRemoveAdditionalClient = (index: number) => {
    const newAdditionalClients = additionalClients.filter((_, i) => i !== index);
    setAdditionalClients(newAdditionalClients);
  };

  const handleProjectSelect = (project: { name: string; description: string; category: string }) => {
    setFormData({ ...formData, projectName: project.name });
    setSelectedProject(project);
    setShowProjectSuggestions(false);
    setFilteredProjects([]);
  };

  const handleChangeProject = () => {
    setShowProjectSuggestions(true);
    setFilteredProjects(availableProjects);
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Mostrar modal de confirmación antes de crear el proyecto
      const clientCount = additionalClients.length + (selectedClient ? 1 : 0);
      showConfirm(
        'Crear Proyecto',
        `¿Estás seguro de crear el proyecto "${selectedProject.name}"? 
        
• Responsable: ${formData.userName}
• Equipo: ${selectedTeam ? selectedTeam.name : formData.teamName}
• Cliente${clientCount > 1 ? 's' : ''}: ${clientCount}`,
        () => {
          handleSubmit();
        },
        'success'
      );
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.userName.trim() !== '' && formData.userRole.trim() !== '';
      case 2:
        // Validar que haya proyecto, equipo y supervisor (ya sea en formData o seleccionado)
        const hasProject = formData.projectName.trim() !== '';
        const hasTeam = formData.teamName.trim() !== '' || selectedTeam !== null;
        const hasSupervisor = formData.immediateSupervisor.trim() !== '' || selectedSupervisor !== null;
        return hasProject && hasTeam && hasSupervisor;
      case 3:
        // Validar que haya al menos un cliente (actual o en la lista de adicionales)
        return formData.clientName.trim() !== '' || selectedClient !== null || additionalClients.length > 0;
      case 4:
        // El paso 4 es solo resumen, siempre válido
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    const newProject: Project = {
      id: String(Date.now()),
      user: {
        name: formData.userName,
        role: formData.userRole,
        avatar: '👤',
      },
      project: formData.projectName,
      team: [
        { id: '1', avatar: '👤' },
        { id: '2', avatar: '👤' },
        { id: '3', avatar: '👤' },
      ], // Default team of 3 members
      status: 'Active', // Default status
      budget: '50K', // Default budget
    };

    onSubmit(newProject);
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setFormData({
      userName: '',
      userRole: '',
      projectName: '',
      teamName: '',
      immediateSupervisor: '',
      clientName: '',
      clientCompany: '',
    });
    setSelectedUser(null);
    setSelectedRole(null);
    setSelectedTeam(null);
    setSelectedSupervisor(null);
    setSelectedClient(null);
    setAdditionalClients([]);
    setSelectedProject(availableProjects[0]);
    onClose();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6">
          <button
            onClick={handleClose}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Volver a proyectos</span>
          </button>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Nueva Conexión</h2>
            <p className="text-purple-100 mb-6">Paso {currentStep} de {totalSteps}</p>

            {/* Progress bar */}
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Step indicators */}
            <div className="flex justify-between mt-6">
              {['Usuario', 'Proyecto', 'Cliente', 'Resumen'].map((label, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all ${
                      index + 1 <= currentStep
                        ? 'bg-white text-purple-600'
                        : 'bg-white/20 text-white/60'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      index + 1 <= currentStep ? 'text-white' : 'text-white/60'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {/* Step 1: User Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User size={40} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Información del Usuario</h3>
                    <p className="text-gray-500 mt-2">Ingresa los datos del responsable del proyecto</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    
                    {selectedUser ? (
                      /* Tarjeta de usuario seleccionado */
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative"
                      >
                        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-xl p-4 flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">
                            {selectedUser.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-bold text-gray-900 truncate">
                              {selectedUser.name}
                            </h4>
                            {selectedUser.role ? (
                              <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                                <Briefcase size={14} />
                                {selectedUser.role}
                              </p>
                            ) : (
                              <p className="text-sm text-amber-600 flex items-center gap-2 mt-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                Sin rol definido - especificar abajo
                              </p>
                            )}
                          </div>
                          <button
                            onClick={handleRemoveUser}
                            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all hover:scale-110"
                            title="Cambiar usuario"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      /* Input de búsqueda */
                      <div className="relative" ref={dropdownRef}>
                        <input
                          type="text"
                          value={formData.userName}
                          onChange={(e) => handleUserNameChange(e.target.value)}
                          onFocus={() => {
                            if (formData.userName.trim().length > 0) {
                              const filtered = availableUsers.filter(user =>
                                user.name.toLowerCase().includes(formData.userName.toLowerCase())
                              );
                              setFilteredUsers(filtered);
                              setShowUserSuggestions(true);
                            }
                          }}
                          placeholder="Ej: María García"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-base"
                          autoComplete="off"
                        />
                        
                        {/* Dropdown de sugerencias */}
                        <AnimatePresence>
                          {showUserSuggestions && filteredUsers.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto"
                            >
                              <div className="p-2">
                                <div className="text-xs font-medium text-gray-500 px-3 py-2">
                                  Usuarios sugeridos ({filteredUsers.length})
                                </div>
                                {filteredUsers.map((user, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleUserSelect(user)}
                                    className="w-full text-left px-3 py-3 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-3 group"
                                  >
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
                                      {user.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="font-medium text-gray-900 group-hover:text-purple-700 transition-colors">
                                        {user.name}
                                      </div>
                                      {user.role ? (
                                        <div className="text-sm text-gray-500">
                                          {user.role}
                                        </div>
                                      ) : (
                                        <div className="text-sm text-amber-600 flex items-center gap-1">
                                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                          </svg>
                                          Sin rol definido
                                        </div>
                                      )}
                                    </div>
                                    <svg 
                                      className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" 
                                      fill="none" 
                                      stroke="currentColor" 
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        {/* Mensaje cuando no hay resultados */}
                        {showUserSuggestions && filteredUsers.length === 0 && formData.userName.trim().length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-4"
                          >
                            <div className="text-center text-gray-500">
                              <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                              <p className="text-sm">No se encontraron usuarios</p>
                              <p className="text-xs text-gray-400 mt-1">Puedes escribir un nombre nuevo</p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Campo de Rol - Solo visible cuando hay usuario seleccionado */}
                  <AnimatePresence>
                    {selectedUser && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rol / Cargo *
                          </label>
                          
                          {selectedRole ? (
                            /* Tarjeta de rol seleccionado */
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="relative"
                            >
                              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-4 flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">
                                  <Briefcase size={24} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-bold text-gray-900">
                                    {selectedRole.name}
                                  </h4>
                                  <p className="text-sm text-gray-600 mt-0.5">
                                    {selectedRole.department}
                                  </p>
                                </div>
                                {/* Solo mostrar botón de remover si el usuario no tiene rol predefinido */}
                                {(!selectedUser || !selectedUser.role) && (
                                  <button
                                    onClick={handleRemoveRole}
                                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all hover:scale-110"
                                    title="Cambiar rol"
                                  >
                                    <X size={18} />
                                  </button>
                                )}
                                {/* Indicador de bloqueado si viene del usuario */}
                                {selectedUser && selectedUser.role && (
                                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          ) : (
                            /* Input de búsqueda de rol */
                            <div className="relative" ref={roleDropdownRef}>
                              <input
                                type="text"
                                value={formData.userRole}
                                onChange={(e) => handleRoleNameChange(e.target.value)}
                                onFocus={() => {
                                  if (formData.userRole.trim().length > 0) {
                                    const filtered = availableRoles.filter(role =>
                                      role.name.toLowerCase().includes(formData.userRole.toLowerCase()) ||
                                      role.department.toLowerCase().includes(formData.userRole.toLowerCase())
                                    );
                                    setFilteredRoles(filtered);
                                    setShowRoleSuggestions(true);
                                  }
                                }}
                                placeholder="Ej: Project Manager"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-base"
                                autoComplete="off"
                              />
                              
                              {/* Dropdown de roles */}
                              <AnimatePresence>
                                {showRoleSuggestions && filteredRoles.length > 0 && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto"
                                  >
                                    <div className="p-2">
                                      <div className="text-xs font-medium text-gray-500 px-3 py-2">
                                        Roles sugeridos ({filteredRoles.length})
                                      </div>
                                      {filteredRoles.map((role, index) => (
                                        <button
                                          key={index}
                                          onClick={() => handleRoleSelect(role)}
                                          className="w-full text-left px-3 py-2.5 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-3 group"
                                        >
                                          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                                            <Briefcase size={20} />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <div className="font-medium text-gray-900 group-hover:text-purple-700 transition-colors">
                                              {role.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                              {role.department}
                                            </div>
                                          </div>
                                          <svg 
                                            className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                          >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                          </svg>
                                        </button>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                              
                              {/* Mensaje cuando no hay resultados */}
                              {showRoleSuggestions && filteredRoles.length === 0 && formData.userRole.trim().length > 0 && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-4"
                                >
                                  <div className="text-center text-gray-500">
                                    <Briefcase className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                    <p className="text-sm">No se encontraron roles</p>
                                    <p className="text-xs text-gray-400 mt-1">Puedes escribir un rol nuevo</p>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Step 2: Project Details */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Briefcase size={40} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Detalles del Proyecto</h3>
                    <p className="text-gray-500 mt-2">Define el proyecto y su equipo</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Proyecto Seleccionado *
                    </label>
                    
                    {/* Tarjeta de proyecto seleccionado siempre visible */}
                    <motion.div
                      key={selectedProject.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative"
                    >
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-300 rounded-xl p-4">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">
                            <Briefcase size={32} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-bold text-gray-900 mb-1">
                              {selectedProject.name}
                            </h4>
                            <p className="text-sm text-gray-600 mb-2">
                              {selectedProject.description}
                            </p>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                              {selectedProject.category}
                            </span>
                          </div>
                          <button
                            onClick={handleChangeProject}
                            className="flex-shrink-0 px-3 py-1.5 flex items-center gap-2 rounded-lg bg-white hover:bg-indigo-50 text-indigo-600 border border-indigo-200 hover:border-indigo-300 transition-all text-sm font-medium"
                            title="Cambiar proyecto"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                            Cambiar
                          </button>
                        </div>
                      </div>
                      
                      {/* Dropdown de proyectos */}
                      <AnimatePresence>
                        {showProjectSuggestions && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto"
                            ref={projectDropdownRef}
                          >
                            <div className="p-2">
                              <div className="flex items-center justify-between px-3 py-2 mb-2 border-b border-gray-200">
                                <div className="text-sm font-medium text-gray-700">
                                  Selecciona un proyecto
                                </div>
                                <button
                                  onClick={() => setShowProjectSuggestions(false)}
                                  className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                  <X size={18} />
                                </button>
                              </div>
                              {filteredProjects.map((project, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleProjectSelect(project)}
                                  className={`w-full text-left px-3 py-3 rounded-lg transition-colors group ${
                                    selectedProject.name === project.name
                                      ? 'bg-indigo-100'
                                      : 'hover:bg-indigo-50'
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                                      <Briefcase size={20} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className={`font-medium transition-colors mb-1 ${
                                        selectedProject.name === project.name
                                          ? 'text-indigo-700'
                                          : 'text-gray-900 group-hover:text-indigo-700'
                                      }`}>
                                        {project.name}
                                      </div>
                                      <div className="text-xs text-gray-500 mb-2 line-clamp-1">
                                        {project.description}
                                      </div>
                                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                                        {project.category}
                                      </span>
                                    </div>
                                    {selectedProject.name === project.name && (
                                      <div className="flex-shrink-0 mt-1">
                                        <CheckCircle size={20} className="text-indigo-600" />
                                      </div>
                                    )}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Equipo *
                    </label>
                    
                    {selectedTeam ? (
                      /* Tarjeta de equipo seleccionado */
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative"
                      >
                        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-300 rounded-xl p-4 flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">
                            <Users size={24} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900">
                              {selectedTeam.name}
                            </h4>
                            <p className="text-sm text-gray-600 mt-0.5">
                              {selectedTeam.description}
                            </p>
                          </div>
                          {/* Solo mostrar botón de remover si el usuario no tiene equipo predefinido */}
                          {(!selectedUser || !selectedUser.team) && (
                            <button
                              onClick={handleRemoveTeam}
                              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all hover:scale-110"
                              title="Cambiar equipo"
                            >
                              <X size={18} />
                            </button>
                          )}
                          {/* Indicador de bloqueado si viene del usuario */}
                          {selectedUser && selectedUser.team && (
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      /* Input de búsqueda de equipo */
                      <div className="relative" ref={teamDropdownRef}>
                        <input
                          type="text"
                          value={formData.teamName}
                          onChange={(e) => handleTeamNameChange(e.target.value)}
                          onFocus={() => {
                            if (formData.teamName.trim().length > 0) {
                              const filtered = availableTeams.filter(team =>
                                team.name.toLowerCase().includes(formData.teamName.toLowerCase()) ||
                                team.description.toLowerCase().includes(formData.teamName.toLowerCase())
                              );
                              setFilteredTeams(filtered);
                              setShowTeamSuggestions(true);
                            }
                          }}
                          placeholder="Ej: Equipo de Desarrollo Frontend"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-base"
                          autoComplete="off"
                        />
                        
                        {/* Dropdown de equipos */}
                        <AnimatePresence>
                          {showTeamSuggestions && filteredTeams.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto"
                            >
                              <div className="p-2">
                                <div className="text-xs font-medium text-gray-500 px-3 py-2">
                                  Equipos sugeridos ({filteredTeams.length})
                                </div>
                                {filteredTeams.map((team, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleTeamSelect(team)}
                                    className="w-full text-left px-3 py-2.5 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-3 group"
                                  >
                                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                                      <Users size={20} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="font-medium text-gray-900 group-hover:text-indigo-700 transition-colors">
                                        {team.name}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        {team.description}
                                      </div>
                                    </div>
                                    <svg 
                                      className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" 
                                      fill="none" 
                                      stroke="currentColor" 
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        {/* Mensaje cuando no hay resultados */}
                        {showTeamSuggestions && filteredTeams.length === 0 && formData.teamName.trim().length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-4"
                          >
                            <div className="text-center text-gray-500">
                              <Users className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                              <p className="text-sm">No se encontraron equipos</p>
                              <p className="text-xs text-gray-400 mt-1">Puedes escribir un nombre nuevo</p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jefe Inmediato *
                    </label>
                    
                    {selectedSupervisor ? (
                      /* Tarjeta de supervisor seleccionado */
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative"
                      >
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-xl p-4 flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold shadow-md flex-shrink-0 text-xl">
                            {selectedSupervisor.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900">
                              {selectedSupervisor.name}
                            </h4>
                            <p className="text-sm text-gray-600 mt-0.5">
                              {selectedSupervisor.role}
                            </p>
                          </div>
                          {/* Solo mostrar botón de remover si el usuario no tiene supervisor predefinido */}
                          {(!selectedUser || !selectedUser.supervisor) && (
                            <button
                              onClick={handleRemoveSupervisor}
                              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all hover:scale-110"
                              title="Cambiar supervisor"
                            >
                              <X size={18} />
                            </button>
                          )}
                          {/* Indicador de bloqueado si viene del usuario */}
                          {selectedUser && selectedUser.supervisor && (
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      /* Input de búsqueda de supervisor */
                      <div className="relative" ref={supervisorDropdownRef}>
                        <input
                          type="text"
                          value={formData.immediateSupervisor}
                          onChange={(e) => handleSupervisorNameChange(e.target.value)}
                          onFocus={() => {
                            if (formData.immediateSupervisor.trim().length > 0) {
                              const filtered = availableSupervisors.filter(supervisor =>
                                supervisor.name.toLowerCase().includes(formData.immediateSupervisor.toLowerCase()) ||
                                supervisor.role.toLowerCase().includes(formData.immediateSupervisor.toLowerCase())
                              );
                              setFilteredSupervisors(filtered);
                              setShowSupervisorSuggestions(true);
                            }
                          }}
                          placeholder="Ej: Carlos Ramírez"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-base"
                          autoComplete="off"
                        />
                        
                        {/* Dropdown de supervisores */}
                        <AnimatePresence>
                          {showSupervisorSuggestions && filteredSupervisors.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto"
                            >
                              <div className="p-2">
                                <div className="text-xs font-medium text-gray-500 px-3 py-2">
                                  Supervisores sugeridos ({filteredSupervisors.length})
                                </div>
                                {filteredSupervisors.map((supervisor, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleSupervisorSelect(supervisor)}
                                    className="w-full text-left px-3 py-2.5 hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-3 group"
                                  >
                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
                                      {supervisor.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="font-medium text-gray-900 group-hover:text-emerald-700 transition-colors">
                                        {supervisor.name}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        {supervisor.role}
                                      </div>
                                    </div>
                                    <svg 
                                      className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" 
                                      fill="none" 
                                      stroke="currentColor" 
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        {/* Mensaje cuando no hay resultados */}
                        {showSupervisorSuggestions && filteredSupervisors.length === 0 && formData.immediateSupervisor.trim().length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-4"
                          >
                            <div className="text-center text-gray-500">
                              <User className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                              <p className="text-sm">No se encontraron supervisores</p>
                              <p className="text-xs text-gray-400 mt-1">Puedes escribir un nombre nuevo</p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Budget and Status */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User size={40} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Información del Cliente</h3>
                    <p className="text-gray-500 mt-2">Selecciona o ingresa el cliente del proyecto</p>
                  </div>

                  {/* Lista de clientes adicionales ya agregados */}
                  {additionalClients.length > 0 && (
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Clientes agregados ({additionalClients.length})
                      </label>
                      {additionalClients.map((client, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative"
                        >
                          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-300 rounded-xl p-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md flex-shrink-0">
                                {client.name.charAt(0)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-gray-900">
                                  {client.name}
                                </h4>
                                <p className="text-xs text-gray-600 truncate">
                                  {client.company}
                                </p>
                              </div>
                              <button
                                onClick={() => handleRemoveAdditionalClient(index)}
                                className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg bg-white hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all hover:scale-110"
                                title="Eliminar cliente"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {additionalClients.length > 0 ? 'Agregar otro cliente' : 'Nombre del Cliente *'}
                    </label>
                    
                    {selectedClient ? (
                      /* Tarjeta de cliente seleccionado con botón para agregar ARRIBA */
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative space-y-3"
                      >
                        {/* Botón para agregar este cliente y añadir otro - ARRIBA */}
                        <motion.button
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={handleAddAnotherClient}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-all hover:scale-[1.02]"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Agregar este cliente y añadir otro
                        </motion.button>

                        {/* Tarjeta de cliente */}
                        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-300 rounded-xl p-4">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg flex-shrink-0">
                              {selectedClient.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg font-bold text-gray-900 mb-1">
                                {selectedClient.name}
                              </h4>
                              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                                <Briefcase size={14} />
                                {selectedClient.company}
                              </p>
                              <p className="text-xs text-gray-500 flex items-center gap-2">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {selectedClient.email}
                              </p>
                            </div>
                            <button
                              onClick={handleRemoveClient}
                              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all hover:scale-110"
                              title="Cambiar cliente"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      /* Input de búsqueda de cliente */
                      <div className="relative" ref={clientDropdownRef}>
                        <input
                          type="text"
                          value={formData.clientName}
                          onChange={(e) => handleClientNameChange(e.target.value)}
                          onFocus={() => {
                            if (formData.clientName.trim().length > 0) {
                              const filtered = availableClients.filter(client =>
                                client.name.toLowerCase().includes(formData.clientName.toLowerCase()) ||
                                client.company.toLowerCase().includes(formData.clientName.toLowerCase())
                              );
                              setFilteredClients(filtered);
                              setShowClientSuggestions(true);
                            }
                          }}
                          placeholder="Ej: Roberto Méndez"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-base"
                          autoComplete="off"
                        />
                        
                        {/* Dropdown de clientes sugeridos */}
                        <AnimatePresence>
                          {showClientSuggestions && filteredClients.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto"
                            >
                              <div className="p-2">
                                <div className="text-xs font-medium text-gray-500 px-3 py-2">
                                  Clientes sugeridos ({filteredClients.length})
                                </div>
                                {filteredClients.map((client, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleClientSelect(client)}
                                    className="w-full text-left px-3 py-3 hover:bg-cyan-50 rounded-lg transition-colors flex items-center gap-3 group"
                                  >
                                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
                                      {client.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="font-medium text-gray-900 group-hover:text-cyan-700 transition-colors">
                                        {client.name}
                                      </div>
                                      <div className="text-xs text-gray-500 truncate">
                                        {client.company}
                                      </div>
                                    </div>
                                    <svg 
                                      className="w-5 h-5 text-gray-400 group-hover:text-cyan-600 transition-colors" 
                                      fill="none" 
                                      stroke="currentColor" 
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        {/* Mensaje cuando no hay resultados */}
                        {showClientSuggestions && filteredClients.length === 0 && formData.clientName.trim().length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-4"
                          >
                            <div className="text-center text-gray-500">
                              <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                              <p className="text-sm">No se encontraron clientes</p>
                              <p className="text-xs text-gray-400 mt-1">Puedes escribir un nombre nuevo</p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Summary */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={40} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Resumen del Proyecto</h3>
                    <p className="text-gray-500 mt-2">Revisa la información antes de crear el proyecto</p>
                  </div>

                  {/* Resumen del Usuario */}
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <User size={20} className="text-purple-600" />
                      <h4 className="text-lg font-bold text-gray-900">Responsable del Proyecto</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md flex-shrink-0">
                          {formData.userName.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">Nombre</p>
                          <p className="font-semibold text-gray-900">{formData.userName}</p>
                        </div>
                      </div>
                      <div className="pl-15">
                        <p className="text-sm text-gray-600">Rol / Cargo</p>
                        <p className="font-semibold text-gray-900 flex items-center gap-2">
                          <Briefcase size={16} className="text-purple-600" />
                          {formData.userRole}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Resumen del Proyecto */}
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Briefcase size={20} className="text-indigo-600" />
                      <h4 className="text-lg font-bold text-gray-900">Información del Proyecto</h4>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Nombre del Proyecto</p>
                        <p className="font-semibold text-gray-900">{selectedProject.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{selectedProject.description}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                          {selectedProject.category}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                        <div>
                          <p className="text-sm text-gray-600">Equipo</p>
                          <p className="font-semibold text-gray-900 flex items-center gap-2">
                            <Users size={16} className="text-indigo-600" />
                            {selectedTeam ? selectedTeam.name : formData.teamName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Jefe Inmediato</p>
                          <p className="font-semibold text-gray-900 flex items-center gap-2">
                            <User size={16} className="text-indigo-600" />
                            {selectedSupervisor ? selectedSupervisor.name : formData.immediateSupervisor}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Resumen de Clientes */}
                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Users size={20} className="text-cyan-600" />
                      <h4 className="text-lg font-bold text-gray-900">
                        Cliente{(additionalClients.length > 0 || selectedClient) && additionalClients.length + (selectedClient ? 1 : 0) > 1 ? 's' : ''} del Proyecto
                      </h4>
                    </div>
                    <div className="space-y-3">
                      {/* Cliente actual (si existe) */}
                      {selectedClient && (
                        <div className="bg-white rounded-lg p-3 border border-cyan-200">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                              {selectedClient.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900">{selectedClient.name}</p>
                              <p className="text-sm text-gray-600 truncate">{selectedClient.company}</p>
                              <p className="text-xs text-gray-500 truncate">{selectedClient.email}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Clientes adicionales */}
                      {additionalClients.map((client, index) => (
                        <div key={index} className="bg-white rounded-lg p-3 border border-cyan-200">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                              {client.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900">{client.name}</p>
                              <p className="text-sm text-gray-600 truncate">{client.company}</p>
                              <p className="text-xs text-gray-500 truncate">{client.email}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Si solo hay nombre en formData */}
                      {!selectedClient && additionalClients.length === 0 && formData.clientName && (
                        <div className="bg-white rounded-lg p-3 border border-cyan-200">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                              {formData.clientName.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900">{formData.clientName}</p>
                              <p className="text-sm text-gray-600">{formData.clientCompany || 'Sin compañía especificada'}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Nota informativa */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-blue-900">¿Todo se ve bien?</p>
                      <p className="text-sm text-blue-700 mt-1">
                        Puedes volver atrás para editar cualquier información antes de crear el proyecto.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 sm:p-8 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className="w-full sm:w-auto px-8 py-3 text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 rounded-lg transition-all"
            >
              Anterior
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={handleNextStep}
                disabled={!isStepValid()}
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
              >
                Siguiente
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
              >
                Crear Proyecto
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Modal de Confirmación */}
      <AnimatePresence>
        {confirmModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={confirmModal.onCancel}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              {/* Header with color based on type */}
              <div className={`p-6 ${
                confirmModal.type === 'success'
                  ? 'bg-gradient-to-r from-emerald-500 to-green-500'
                  : confirmModal.type === 'danger'
                  ? 'bg-gradient-to-r from-red-500 to-rose-500'
                  : confirmModal.type === 'warning'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                  : 'bg-gradient-to-r from-purple-500 to-indigo-500'
              }`}>
                <div className="flex items-center gap-3">
                  {/* Icon based on type */}
                  <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    {confirmModal.type === 'success' && (
                      <CheckCircle className="w-6 h-6 text-white" />
                    )}
                    {confirmModal.type === 'danger' && (
                      <X className="w-6 h-6 text-white" />
                    )}
                    {confirmModal.type === 'warning' && (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    )}
                    {confirmModal.type === 'info' && (
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {confirmModal.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
                  {confirmModal.message}
                </p>
              </div>

              {/* Footer with buttons */}
              <div className={`p-6 border-t border-gray-200 flex gap-3 ${confirmModal.showCancelButton !== false ? 'justify-end' : 'justify-center'}`}>
                {confirmModal.showCancelButton !== false && (
                  <button
                    onClick={confirmModal.onCancel}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300 hover:scale-105"
                  >
                    Cancelar
                  </button>
                )}
                <button
                  onClick={confirmModal.onConfirm}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg text-white ${
                    confirmModal.type === 'success'
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600'
                      : confirmModal.type === 'danger'
                      ? 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600'
                      : confirmModal.type === 'warning'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
                      : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600'
                  }`}
                >
                  {confirmModal.type === 'success' ? 'Confirmar' : 'Aceptar'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}