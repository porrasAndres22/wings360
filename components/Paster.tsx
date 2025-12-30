'use client';

import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Smartphone, Laptop, Monitor, Filter, X, Calendar, DollarSign, Package, User, Users, Mail, Phone, Building, MapPin } from 'lucide-react';

// Types and Interfaces
type DeviceCategory = 'Móvil' | 'Laptop' | 'Desktop';
type DeviceCondition = 'Nuevo' | 'Usado - Excelente' | 'Usado - Bueno' | 'Reparación';
type UserRole = 'Empleado' | 'Manager' | 'Admin' | 'Técnico';
type UserStatus = 'Activo' | 'Inactivo' | 'Vacaciones';

interface BaseDevice {
  id: number;
  category: DeviceCategory;
  brand: string;
  model: string;
  condition: DeviceCondition;
  price: number;
  stock: number;
  assignedTo: string;
  purchaseDate?: string;
  warranty?: string;
  notes?: string;
}

interface MobileDevice extends BaseDevice {
  category: 'Móvil';
  imei: string;
  storage: string;
  color: string;
}

interface LaptopDevice extends BaseDevice {
  category: 'Laptop';
  serialNumber: string;
  processor: string;
  ram: string;
  storage: string;
  screenSize: string;
}

interface DesktopDevice extends BaseDevice {
  category: 'Desktop';
  serialNumber: string;
  processor: string;
  ram: string;
  storage: string;
  graphicsCard: string;
}

type Device = MobileDevice | LaptopDevice | DesktopDevice;

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  department: string;
  status: UserStatus;
  hireDate: string;
  assignedDevices: number;
  location?: string;
  notes?: string;
}

interface DeviceFormData {
  category: DeviceCategory;
  brand: string;
  model: string;
  condition: DeviceCondition;
  price: string;
  stock: string;
  assignedTo: string;
  purchaseDate?: string;
  warranty?: string;
  notes?: string;
  imei?: string;
  color?: string;
  serialNumber?: string;
  processor?: string;
  ram?: string;
  screenSize?: string;
  graphicsCard?: string;
  storage?: string;
}

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  department: string;
  status: UserStatus;
  hireDate: string;
  location?: string;
  notes?: string;
}

export default function InventorySystem() {
  const [activeTab, setActiveTab] = useState<'devices' | 'users'>('users');
  
  const [devices, setDevices] = useState<Device[]>([
    {
      id: 1,
      category: 'Móvil',
      brand: 'Apple',
      model: 'iPhone 15 Pro',
      imei: '352099001234567',
      storage: '256GB',
      color: 'Titanio Natural',
      condition: 'Nuevo',
      price: 1199,
      stock: 5,
      assignedTo: '-',
      purchaseDate: '2024-11-15',
      warranty: '1 año AppleCare+',
      notes: 'Incluye cargador MagSafe'
    },
    {
      id: 2,
      category: 'Móvil',
      brand: 'Samsung',
      model: 'Galaxy S24 Ultra',
      imei: '352099007654321',
      storage: '512GB',
      color: 'Negro Titanio',
      condition: 'Nuevo',
      price: 1299,
      stock: 3,
      assignedTo: '-',
      purchaseDate: '2024-12-01',
      warranty: '2 años Samsung Care',
      notes: 'Con S Pen incluido'
    },
    {
      id: 3,
      category: 'Laptop',
      brand: 'Dell',
      model: 'XPS 15',
      serialNumber: 'DL9876543210',
      processor: 'Intel Core i7-13700H',
      ram: '32GB DDR5',
      storage: '1TB NVMe SSD',
      screenSize: '15.6"',
      condition: 'Nuevo',
      price: 2299,
      stock: 2,
      assignedTo: 'María García',
      purchaseDate: '2024-10-20',
      warranty: '3 años Dell Premium Support',
      notes: 'Pantalla OLED 4K touch'
    },
    {
      id: 4,
      category: 'Laptop',
      brand: 'Apple',
      model: 'MacBook Pro M3',
      serialNumber: 'AP1234567890',
      processor: 'Apple M3 Pro',
      ram: '18GB',
      storage: '512GB SSD',
      screenSize: '14"',
      condition: 'Nuevo',
      price: 2499,
      stock: 4,
      assignedTo: 'Carlos López',
      purchaseDate: '2024-11-30',
      warranty: '1 año AppleCare',
      notes: 'Liquid Retina XDR display'
    },
    {
      id: 5,
      category: 'Desktop',
      brand: 'HP',
      model: 'EliteDesk 800 G9',
      serialNumber: 'HP5555666677',
      processor: 'Intel Core i9-12900',
      ram: '64GB DDR4',
      storage: '2TB NVMe SSD',
      graphicsCard: 'NVIDIA RTX 4060',
      condition: 'Usado - Excelente',
      price: 1899,
      stock: 1,
      assignedTo: 'Carlos López',
      purchaseDate: '2023-08-10',
      warranty: '6 meses restantes',
      notes: 'Actualizado con GPU aftermarket'
    },
    {
      id: 6,
      category: 'Desktop',
      brand: 'Custom Build',
      model: 'Workstation Pro',
      serialNumber: 'CB9998887776',
      processor: 'AMD Ryzen 9 7950X',
      ram: '128GB DDR5',
      storage: '4TB NVMe SSD',
      graphicsCard: 'NVIDIA RTX 4090',
      condition: 'Nuevo',
      price: 3999,
      stock: 2,
      assignedTo: 'Ana Martínez',
      purchaseDate: '2024-12-15',
      warranty: '2 años piezas individuales',
      notes: 'Build personalizado para rendering 3D'
    },
    {
      id: 7,
      category: 'Móvil',
      brand: 'Google',
      model: 'Pixel 8',
      imei: '352099008765432',
      storage: '128GB',
      color: 'Blanco Nieve',
      condition: 'Nuevo',
      price: 699,
      stock: 4,
      assignedTo: 'Roberto Sánchez',
      purchaseDate: '2024-11-20',
      warranty: '1 año Google',
      notes: 'Con cargador rápido incluido'
    },
    {
      id: 8,
      category: 'Laptop',
      brand: 'Lenovo',
      model: 'ThinkPad X1 Carbon',
      serialNumber: 'LN7654321098',
      processor: 'Intel Core i7-1365U',
      ram: '16GB DDR5',
      storage: '512GB SSD',
      screenSize: '14"',
      condition: 'Nuevo',
      price: 1799,
      stock: 3,
      assignedTo: 'Patricia Hernández',
      purchaseDate: '2024-10-15',
      warranty: '3 años Lenovo Premier',
      notes: 'Pantalla táctil WQXGA'
    },
    {
      id: 9,
      category: 'Desktop',
      brand: 'Dell',
      model: 'OptiPlex 7090',
      serialNumber: 'DL4567890123',
      processor: 'Intel Core i5-11500',
      ram: '16GB DDR4',
      storage: '512GB NVMe SSD',
      graphicsCard: 'Intel UHD Graphics 750',
      condition: 'Nuevo',
      price: 899,
      stock: 5,
      assignedTo: 'Diego Morales',
      purchaseDate: '2024-09-10',
      warranty: '3 años Dell ProSupport',
      notes: 'Ideal para tareas de oficina'
    },
    {
      id: 10,
      category: 'Móvil',
      brand: 'Apple',
      model: 'iPhone 14',
      imei: '352099003456789',
      storage: '128GB',
      color: 'Azul',
      condition: 'Usado - Excelente',
      price: 799,
      stock: 2,
      assignedTo: 'Carmen Flores',
      purchaseDate: '2023-05-10',
      warranty: '6 meses restantes',
      notes: 'Reacondicionado certificado'
    },
    {
      id: 11,
      category: 'Laptop',
      brand: 'HP',
      model: 'Pavilion 15',
      serialNumber: 'HP9876543210',
      processor: 'AMD Ryzen 5 5600H',
      ram: '8GB DDR4',
      storage: '512GB SSD',
      screenSize: '15.6"',
      condition: 'Nuevo',
      price: 749,
      stock: 6,
      assignedTo: 'Fernando Castro',
      purchaseDate: '2024-08-20',
      warranty: '1 año HP',
      notes: 'Para uso general de oficina'
    },
    {
      id: 12,
      category: 'Móvil',
      brand: 'Samsung',
      model: 'Galaxy A54',
      imei: '352099005678901',
      storage: '256GB',
      color: 'Negro',
      condition: 'Nuevo',
      price: 449,
      stock: 8,
      assignedTo: 'Sofía Ramírez',
      purchaseDate: '2024-11-01',
      warranty: '2 años Samsung',
      notes: 'Incluye funda protectora'
    },
    {
      id: 13,
      category: 'Desktop',
      brand: 'Apple',
      model: 'Mac Mini M2',
      serialNumber: 'AP5432109876',
      processor: 'Apple M2',
      ram: '16GB',
      storage: '512GB SSD',
      graphicsCard: 'Apple M2 GPU',
      condition: 'Nuevo',
      price: 1299,
      stock: 2,
      assignedTo: 'Gabriela Mendoza',
      purchaseDate: '2024-07-15',
      warranty: '1 año AppleCare',
      notes: 'Compacto y potente'
    },
    {
      id: 14,
      category: 'Laptop',
      brand: 'Asus',
      model: 'ROG Zephyrus G14',
      serialNumber: 'AS1234567890',
      processor: 'AMD Ryzen 9 7940HS',
      ram: '32GB DDR5',
      storage: '1TB NVMe SSD',
      screenSize: '14"',
      condition: 'Nuevo',
      price: 1999,
      stock: 1,
      assignedTo: 'Ricardo Vargas',
      purchaseDate: '2024-06-25',
      warranty: '2 años Asus',
      notes: 'Gaming/Workstation - RTX 4060'
    },
    {
      id: 15,
      category: 'Móvil',
      brand: 'Xiaomi',
      model: 'Redmi Note 13 Pro',
      imei: '352099006789012',
      storage: '256GB',
      color: 'Verde Bosque',
      condition: 'Nuevo',
      price: 349,
      stock: 10,
      assignedTo: 'Valeria Torres',
      purchaseDate: '2024-10-05',
      warranty: '1 año Xiaomi',
      notes: 'Excelente relación calidad-precio'
    },
    {
      id: 16,
      category: 'Desktop',
      brand: 'Lenovo',
      model: 'ThinkCentre M90q',
      serialNumber: 'LN0987654321',
      processor: 'Intel Core i7-10700T',
      ram: '16GB DDR4',
      storage: '512GB SSD',
      graphicsCard: 'Intel UHD Graphics 630',
      condition: 'Usado - Bueno',
      price: 699,
      stock: 3,
      assignedTo: '-',
      purchaseDate: '2023-03-10',
      warranty: '1 año restante',
      notes: 'Mini PC ultra compacto'
    }
  ]);

  const [users, setUsers] = useState<UserData[]>([
    {
      id: 1,
      name: 'María García',
      email: 'maria.garcia@empresa.com',
      phone: '+502 1234-5678',
      role: 'Empleado',
      department: 'Desarrollo',
      status: 'Activo',
      hireDate: '2023-03-15',
      assignedDevices: 0, // Se calculará dinámicamente
      location: 'Guatemala City',
      notes: 'Desarrolladora Senior - Equipo Frontend'
    },
    {
      id: 2,
      name: 'Carlos López',
      email: 'carlos.lopez@empresa.com',
      phone: '+502 2345-6789',
      role: 'Manager',
      department: 'IT',
      status: 'Activo',
      hireDate: '2022-01-10',
      assignedDevices: 0, // Se calculará dinámicamente
      location: 'Guatemala City',
      notes: 'Gerente de TI - Responsable de infraestructura'
    },
    {
      id: 3,
      name: 'Ana Martínez',
      email: 'ana.martinez@empresa.com',
      phone: '+502 3456-7890',
      role: 'Admin',
      department: 'Administración',
      status: 'Activo',
      hireDate: '2021-06-20',
      assignedDevices: 0, // Se calculará dinámicamente
      location: 'Antigua Guatemala',
      notes: 'Administradora de sistemas'
    },
    {
      id: 4,
      name: 'Juan Pérez',
      email: 'juan.perez@empresa.com',
      phone: '+502 4567-8901',
      role: 'Técnico',
      department: 'Soporte',
      status: 'Activo',
      hireDate: '2023-09-01',
      assignedDevices: 0, // Se calculará dinámicamente
      location: 'Guatemala City',
      notes: 'Técnico de soporte nivel 2'
    },
    {
      id: 5,
      name: 'Laura Rodríguez',
      email: 'laura.rodriguez@empresa.com',
      phone: '+502 5678-9012',
      role: 'Empleado',
      department: 'Marketing',
      status: 'Vacaciones',
      hireDate: '2022-11-15',
      assignedDevices: 0, // Se calculará dinámicamente
      location: 'Guatemala City',
      notes: 'Coordinadora de marketing digital'
    },
    {
      id: 6,
      name: 'Roberto Sánchez',
      email: 'roberto.sanchez@empresa.com',
      phone: '+502 6789-0123',
      role: 'Empleado',
      department: 'Desarrollo',
      status: 'Activo',
      hireDate: '2023-05-20',
      assignedDevices: 0,
      location: 'Guatemala City',
      notes: 'Desarrollador Backend - Especialista en APIs'
    },
    {
      id: 7,
      name: 'Patricia Hernández',
      email: 'patricia.hernandez@empresa.com',
      phone: '+502 7890-1234',
      role: 'Manager',
      department: 'Recursos Humanos',
      status: 'Activo',
      hireDate: '2020-08-15',
      assignedDevices: 0,
      location: 'Guatemala City',
      notes: 'Gerente de RRHH - Gestión de talento'
    },
    {
      id: 8,
      name: 'Diego Morales',
      email: 'diego.morales@empresa.com',
      phone: '+502 8901-2345',
      role: 'Técnico',
      department: 'Soporte',
      status: 'Activo',
      hireDate: '2024-01-10',
      assignedDevices: 0,
      location: 'Mixco',
      notes: 'Técnico de soporte nivel 1'
    },
    {
      id: 9,
      name: 'Carmen Flores',
      email: 'carmen.flores@empresa.com',
      phone: '+502 9012-3456',
      role: 'Empleado',
      department: 'Ventas',
      status: 'Activo',
      hireDate: '2023-07-01',
      assignedDevices: 0,
      location: 'Guatemala City',
      notes: 'Ejecutiva de ventas - Sector corporativo'
    },
    {
      id: 10,
      name: 'Fernando Castro',
      email: 'fernando.castro@empresa.com',
      phone: '+502 0123-4567',
      role: 'Admin',
      department: 'IT',
      status: 'Activo',
      hireDate: '2021-03-15',
      assignedDevices: 0,
      location: 'Guatemala City',
      notes: 'Administrador de redes y seguridad'
    },
    {
      id: 11,
      name: 'Sofía Ramírez',
      email: 'sofia.ramirez@empresa.com',
      phone: '+502 1357-2468',
      role: 'Empleado',
      department: 'Diseño',
      status: 'Activo',
      hireDate: '2023-02-20',
      assignedDevices: 0,
      location: 'Antigua Guatemala',
      notes: 'Diseñadora UX/UI - Productos digitales'
    },
    {
      id: 12,
      name: 'Miguel Ángel Ortiz',
      email: 'miguel.ortiz@empresa.com',
      phone: '+502 2468-1357',
      role: 'Técnico',
      department: 'IT',
      status: 'Inactivo',
      hireDate: '2022-06-10',
      assignedDevices: 0,
      location: 'Guatemala City',
      notes: 'Técnico en licencia médica'
    },
    {
      id: 13,
      name: 'Gabriela Mendoza',
      email: 'gabriela.mendoza@empresa.com',
      phone: '+502 3579-2468',
      role: 'Empleado',
      department: 'Marketing',
      status: 'Activo',
      hireDate: '2024-02-15',
      assignedDevices: 0,
      location: 'Guatemala City',
      notes: 'Especialista en redes sociales'
    },
    {
      id: 14,
      name: 'Ricardo Vargas',
      email: 'ricardo.vargas@empresa.com',
      phone: '+502 4680-1357',
      role: 'Manager',
      department: 'Ventas',
      status: 'Activo',
      hireDate: '2020-04-01',
      assignedDevices: 0,
      location: 'Guatemala City',
      notes: 'Gerente de ventas - Región centro'
    },
    {
      id: 15,
      name: 'Valeria Torres',
      email: 'valeria.torres@empresa.com',
      phone: '+502 5791-2468',
      role: 'Empleado',
      department: 'Contabilidad',
      status: 'Activo',
      hireDate: '2023-10-05',
      assignedDevices: 0,
      location: 'Guatemala City',
      notes: 'Contadora - Análisis financiero'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterCondition, setFilterCondition] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // Pagination states
  const [currentPageUsers, setCurrentPageUsers] = useState<number>(1);
  const [currentPageDevices, setCurrentPageDevices] = useState<number>(1);
  const itemsPerPage = 10;
  
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [showUserDetailModal, setShowUserDetailModal] = useState<boolean>(false);
  
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);

  const [formData, setFormData] = useState<DeviceFormData>({
    category: 'Móvil',
    brand: '',
    model: '',
    condition: 'Nuevo',
    price: '',
    stock: '',
    assignedTo: '-'
  });

  const [userFormData, setUserFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    role: 'Empleado',
    department: '',
    status: 'Activo',
    hireDate: ''
  });

  const filteredDevices = devices.filter((device: Device) => {
    const matchesSearch = 
      device.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ('imei' in device && device.imei.includes(searchTerm)) ||
      ('serialNumber' in device && device.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCondition = filterCondition === 'all' || device.condition === filterCondition;
    const matchesCategory = filterCategory === 'all' || device.category === filterCategory;
    
    return matchesSearch && matchesCondition && matchesCategory;
  });

  // Calcular dispositivos asignados por usuario dinámicamente
  const getUserDeviceCount = (userName: string): number => {
    return devices.filter(device => device.assignedTo === userName).length;
  };

  // Obtener dispositivos asignados a un usuario
  const getUserDevices = (userName: string): Device[] => {
    return devices.filter(device => device.assignedTo === userName);
  };

  const filteredUsers = users.filter((user: UserData) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination for users
  const totalPagesUsers = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndexUsers = (currentPageUsers - 1) * itemsPerPage;
  const endIndexUsers = startIndexUsers + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndexUsers, endIndexUsers);

  // Pagination for devices
  const totalPagesDevices = Math.ceil(filteredDevices.length / itemsPerPage);
  const startIndexDevices = (currentPageDevices - 1) * itemsPerPage;
  const endIndexDevices = startIndexDevices + itemsPerPage;
  const paginatedDevices = filteredDevices.slice(startIndexDevices, endIndexDevices);

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPageUsers(1);
    setCurrentPageDevices(1);
  };

  const handleFilterChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
    setCurrentPageUsers(1);
    setCurrentPageDevices(1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    let newDeviceData: any = {
      brand: formData.brand,
      model: formData.model,
      condition: formData.condition,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      assignedTo: formData.assignedTo,
      category: formData.category,
      purchaseDate: formData.purchaseDate,
      warranty: formData.warranty,
      notes: formData.notes
    };

    if (formData.category === 'Móvil') {
      newDeviceData.imei = formData.imei;
      newDeviceData.storage = formData.storage;
      newDeviceData.color = formData.color;
    } else if (formData.category === 'Laptop') {
      newDeviceData.serialNumber = formData.serialNumber;
      newDeviceData.processor = formData.processor;
      newDeviceData.ram = formData.ram;
      newDeviceData.storage = formData.storage;
      newDeviceData.screenSize = formData.screenSize;
    } else if (formData.category === 'Desktop') {
      newDeviceData.serialNumber = formData.serialNumber;
      newDeviceData.processor = formData.processor;
      newDeviceData.ram = formData.ram;
      newDeviceData.storage = formData.storage;
      newDeviceData.graphicsCard = formData.graphicsCard;
    }
    
    if (editingDevice) {
      setDevices(devices.map((d: Device) => 
        d.id === editingDevice.id 
          ? { ...newDeviceData, id: editingDevice.id } as Device
          : d
      ));
      setEditingDevice(null);
    } else {
      const newDevice: Device = {
        ...newDeviceData,
        id: devices.length > 0 ? Math.max(...devices.map(d => d.id)) + 1 : 1,
      } as Device;
      setDevices([...devices, newDevice]);
    }
    
    setShowAddModal(false);
    resetForm();
  };

  const handleUserSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (editingUser) {
      setUsers(users.map((u: UserData) => 
        u.id === editingUser.id 
          ? { ...userFormData, id: editingUser.id, assignedDevices: editingUser.assignedDevices }
          : u
      ));
      setEditingUser(null);
    } else {
      const newUser: UserData = {
        ...userFormData,
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        assignedDevices: 0
      };
      setUsers([...users, newUser]);
    }
    
    setShowUserModal(false);
    resetUserForm();
  };

  const resetForm = () => {
    setFormData({
      category: 'Móvil',
      brand: '',
      model: '',
      condition: 'Nuevo',
      price: '',
      stock: '',
      assignedTo: '-'
    });
  };

  const resetUserForm = () => {
    setUserFormData({
      name: '',
      email: '',
      phone: '',
      role: 'Empleado',
      department: '',
      status: 'Activo',
      hireDate: ''
    });
  };

  const handleViewDetails = (device: Device) => {
    setSelectedDevice(device);
    setShowDetailModal(true);
  };

  const handleViewUserDetails = (user: UserData) => {
    setSelectedUser(user);
    setShowUserDetailModal(true);
  };

  const handleEdit = (device: Device) => {
    setEditingDevice(device);
    const baseFormData: DeviceFormData = {
      category: device.category,
      brand: device.brand,
      model: device.model,
      condition: device.condition,
      price: device.price.toString(),
      stock: device.stock.toString(),
      assignedTo: device.assignedTo,
      purchaseDate: device.purchaseDate,
      warranty: device.warranty,
      notes: device.notes
    };

    if (device.category === 'Móvil') {
      baseFormData.imei = device.imei;
      baseFormData.storage = device.storage;
      baseFormData.color = device.color;
    } else if (device.category === 'Laptop') {
      baseFormData.serialNumber = device.serialNumber;
      baseFormData.processor = device.processor;
      baseFormData.ram = device.ram;
      baseFormData.storage = device.storage;
      baseFormData.screenSize = device.screenSize;
    } else if (device.category === 'Desktop') {
      baseFormData.serialNumber = device.serialNumber;
      baseFormData.processor = device.processor;
      baseFormData.ram = device.ram;
      baseFormData.storage = device.storage;
      baseFormData.graphicsCard = device.graphicsCard;
    }

    setFormData(baseFormData);
    setShowAddModal(true);
    setShowDetailModal(false);
  };

  const handleEditUser = (user: UserData) => {
    setEditingUser(user);
    setUserFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      department: user.department,
      status: user.status,
      hireDate: user.hireDate,
      location: user.location,
      notes: user.notes
    });
    setShowUserModal(true);
    setShowUserDetailModal(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de eliminar este dispositivo?')) {
      setDevices(devices.filter((d: Device) => d.id !== id));
      setShowDetailModal(false);
    }
  };

  const handleDeleteUser = (id: number) => {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      setUsers(users.filter((u: UserData) => u.id !== id));
      setShowUserDetailModal(false);
    }
  };

  const handleCategoryChange = (newCategory: DeviceCategory) => {
    setFormData({
      category: newCategory,
      brand: '',
      model: '',
      condition: 'Nuevo',
      price: '',
      stock: '',
      assignedTo: '-'
    });
  };

  const getConditionClass = (condition: DeviceCondition): string => {
    switch (condition) {
      case 'Nuevo':
        return 'bg-green-100 text-green-800';
      case 'Usado - Excelente':
        return 'bg-blue-100 text-blue-800';
      case 'Usado - Bueno':
        return 'bg-yellow-100 text-yellow-800';
      case 'Reparación':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusClass = (status: UserStatus): string => {
    switch (status) {
      case 'Activo':
        return 'bg-green-100 text-green-800';
      case 'Inactivo':
        return 'bg-red-100 text-red-800';
      case 'Vacaciones':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleClass = (role: UserRole): string => {
    switch (role) {
      case 'Admin':
        return 'bg-purple-100 text-purple-800';
      case 'Manager':
        return 'bg-blue-100 text-blue-800';
      case 'Técnico':
        return 'bg-orange-100 text-orange-800';
      case 'Empleado':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockClass = (stock: number): string => {
    if (stock > 3) return 'bg-green-100 text-green-800';
    if (stock > 0) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getCategoryIcon = (category: DeviceCategory, size: number = 20) => {
    switch (category) {
      case 'Móvil':
        return <Smartphone className="text-blue-600" size={size} />;
      case 'Laptop':
        return <Laptop className="text-purple-600" size={size} />;
      case 'Desktop':
        return <Monitor className="text-green-600" size={size} />;
    }
  };

  const getCategoryColor = (category: DeviceCategory): string => {
    switch (category) {
      case 'Móvil':
        return 'bg-blue-100 text-blue-800';
      case 'Laptop':
        return 'bg-purple-100 text-purple-800';
      case 'Desktop':
        return 'bg-green-100 text-green-800';
    }
  };

  const totalValue: number = devices.reduce((sum: number, device: Device) => sum + (device.price * device.stock), 0);
  const totalDevices: number = devices.reduce((sum: number, device: Device) => sum + device.stock, 0);
  const mobileCount = devices.filter(d => d.category === 'Móvil').length;
  const laptopCount = devices.filter(d => d.category === 'Laptop').length;
  const desktopCount = devices.filter(d => d.category === 'Desktop').length;
  const activeUsers = users.filter(u => u.status === 'Activo').length;
  const totalAssignedDevices = devices.filter(d => d.assignedTo !== '-').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <Users className="text-blue-600" size={32} />
                Sistema de Inventario
              </h1>
              <p className="text-slate-600 mt-1">Gestiona usuarios y dispositivos</p>
            </div>
            <button
              onClick={() => {
                if (activeTab === 'users') {
                  setEditingUser(null);
                  resetUserForm();
                  setShowUserModal(true);
                } else {
                  setEditingDevice(null);
                  resetForm();
                  setShowAddModal(true);
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-md hover:shadow-lg"
            >
              <Plus size={20} />
              {activeTab === 'users' ? 'Agregar Usuario' : 'Agregar Dispositivo'}
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'users'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-slate-600 border-transparent hover:text-slate-800'
              }`}
            >
              <Users size={20} />
              Usuarios
            </button>
            <button
              onClick={() => setActiveTab('devices')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'devices'
                  ? 'text-blue-600 border-blue-600'
                  : 'text-slate-600 border-transparent hover:text-slate-800'
              }`}
            >
              <Monitor size={20} />
              Dispositivos
            </button>
          </div>
        </div>

        {/* Stats - Users */}
        {activeTab === 'users' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-600">
                <p className="text-slate-600 text-sm font-medium">Total Usuarios</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">{users.length}</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-600">
                <p className="text-slate-600 text-sm font-medium">Usuarios Activos</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">{activeUsers}</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-600">
                <p className="text-slate-600 text-sm font-medium">Dispositivos Asignados</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">{totalAssignedDevices}</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-600">
                <p className="text-slate-600 text-sm font-medium">Departamentos</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">{new Set(users.map(u => u.department)).size}</p>
              </div>
            </div>

            {/* Filters - Users */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar por nombre, email o departamento..."
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <select
                    value={filterRole}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFilterChange(setFilterRole, e.target.value)}
                    className="pl-10 pr-8 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white appearance-none cursor-pointer"
                  >
                    <option value="all">Todos los roles</option>
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Técnico">Técnico</option>
                    <option value="Empleado">Empleado</option>
                  </select>
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <select
                    value={filterStatus}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFilterChange(setFilterStatus, e.target.value)}
                    className="pl-10 pr-8 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white appearance-none cursor-pointer"
                  >
                    <option value="all">Todos los estados</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                    <option value="Vacaciones">Vacaciones</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table - Desktop - Users */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Usuario</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Contacto</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Rol</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Departamento</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Dispositivos</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {paginatedUsers.map((user: UserData) => (
                      <tr 
                        key={user.id} 
                        className="hover:bg-slate-50 transition-colors cursor-pointer"
                        onClick={() => handleViewUserDetails(user)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-800">{user.name}</div>
                              <div className="text-sm text-slate-600">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-600">{user.phone}</div>
                          {user.location && <div className="text-xs text-slate-500">{user.location}</div>}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleClass(user.role)}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-800">{user.department}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-slate-800 font-semibold">{getUserDeviceCount(user.name)}</span>
                        </td>
                        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditUser(user)}
                              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                              title="Editar"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination - Users Desktop */}
            {totalPagesUsers > 1 && (
              <div className="bg-white rounded-xl shadow-sm p-4 mt-4 flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Mostrando {startIndexUsers + 1} - {Math.min(endIndexUsers, filteredUsers.length)} de {filteredUsers.length} usuarios
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPageUsers(prev => Math.max(1, prev - 1))}
                    disabled={currentPageUsers === 1}
                    className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Anterior
                  </button>
                  <div className="flex gap-1">
                    {Array.from({ length: totalPagesUsers }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
                      if (
                        page === 1 ||
                        page === totalPagesUsers ||
                        (page >= currentPageUsers - 1 && page <= currentPageUsers + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPageUsers(page)}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              currentPageUsers === page
                                ? 'bg-blue-600 text-white'
                                : 'border border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      } else if (page === currentPageUsers - 2 || page === currentPageUsers + 2) {
                        return <span key={page} className="px-2 py-2">...</span>;
                      }
                      return null;
                    })}
                  </div>
                  <button
                    onClick={() => setCurrentPageUsers(prev => Math.min(totalPagesUsers, prev + 1))}
                    disabled={currentPageUsers === totalPagesUsers}
                    className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}

            {/* Cards - Mobile - Users */}
            <div className="md:hidden space-y-4">
              {paginatedUsers.map((user: UserData) => (
                <div 
                  key={user.id} 
                  className="bg-white rounded-xl shadow-sm p-5 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleViewUserDetails(user)}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-800">{user.name}</h3>
                      <p className="text-sm text-slate-600">{user.email}</p>
                      <div className="flex gap-2 mt-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getRoleClass(user.role)}`}>
                          {user.role}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusClass(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Departamento:</span>
                      <span className="text-slate-800 font-medium">{user.department}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Dispositivos:</span>
                      <span className="text-slate-800 font-semibold">{getUserDeviceCount(user.name)}</span>
                    </div>
                  </div>

                  <div className="text-center text-sm text-blue-600 font-medium pt-3 mt-3 border-t border-slate-100">
                    Toca para ver detalles completos
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination - Users Mobile */}
            {totalPagesUsers > 1 && (
              <div className="md:hidden bg-white rounded-xl shadow-sm p-4 mt-4">
                <div className="text-sm text-slate-600 text-center mb-3">
                  Página {currentPageUsers} de {totalPagesUsers}
                </div>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => setCurrentPageUsers(prev => Math.max(1, prev - 1))}
                    disabled={currentPageUsers === 1}
                    className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => setCurrentPageUsers(prev => Math.min(totalPagesUsers, prev + 1))}
                    disabled={currentPageUsers === totalPagesUsers}
                    className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Stats - Devices */}
        {activeTab === 'devices' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-600">
                <p className="text-slate-600 text-sm font-medium">Total Dispositivos</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">{totalDevices}</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-600">
                <p className="text-slate-600 text-sm font-medium">Valor Total</p>
                <p className="text-2xl md:text-3xl font-bold text-slate-800 mt-2">${totalValue.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone size={18} className="text-blue-600" />
                  <p className="text-slate-600 text-sm font-medium">Móviles</p>
                </div>
                <p className="text-3xl font-bold text-slate-800">{mobileCount}</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-600">
                <div className="flex items-center gap-2 mb-2">
                  <Laptop size={18} className="text-purple-600" />
                  <p className="text-slate-600 text-sm font-medium">Laptops</p>
                </div>
                <p className="text-3xl font-bold text-slate-800">{laptopCount}</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-2 mb-2">
                  <Monitor size={18} className="text-green-600" />
                  <p className="text-slate-600 text-sm font-medium">Desktops</p>
                </div>
                <p className="text-3xl font-bold text-slate-800">{desktopCount}</p>
              </div>
            </div>

            {/* Filters - Devices */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar por marca, modelo, IMEI o serial..."
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <select
                    value={filterCategory}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFilterChange(setFilterCategory, e.target.value)}
                    className="pl-10 pr-8 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white appearance-none cursor-pointer"
                  >
                    <option value="all">Todas las categorías</option>
                    <option value="Móvil">Móviles</option>
                    <option value="Laptop">Laptops</option>
                    <option value="Desktop">Desktops</option>
                  </select>
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <select
                    value={filterCondition}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFilterChange(setFilterCondition, e.target.value)}
                    className="pl-10 pr-8 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white appearance-none cursor-pointer"
                  >
                    <option value="all">Todas las condiciones</option>
                    <option value="Nuevo">Nuevo</option>
                    <option value="Usado - Excelente">Usado - Excelente</option>
                    <option value="Usado - Bueno">Usado - Bueno</option>
                    <option value="Reparación">Reparación</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table - Desktop - Devices */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Categoría</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Dispositivo</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Identificador</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Especificaciones</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Condición</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Precio</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {paginatedDevices.map((device: Device) => (
                      <tr 
                        key={device.id} 
                        className="hover:bg-slate-50 transition-colors cursor-pointer"
                        onClick={() => handleViewDetails(device)}
                      >
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getCategoryColor(device.category)}`}>
                            {getCategoryIcon(device.category)}
                            {device.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-800">{device.brand}</div>
                          <div className="text-sm text-slate-600">{device.model}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                          {device.category === 'Móvil' ? device.imei : device.serialNumber}
                        </td>
                        <td className="px-6 py-4">
                          {device.category === 'Móvil' && (
                            <>
                              <div className="text-sm text-slate-800">{device.storage}</div>
                              <div className="text-sm text-slate-600">{device.color}</div>
                            </>
                          )}
                          {device.category === 'Laptop' && (
                            <>
                              <div className="text-sm text-slate-800">{device.processor}</div>
                              <div className="text-sm text-slate-600">{device.ram} • {device.storage}</div>
                            </>
                          )}
                          {device.category === 'Desktop' && (
                            <>
                              <div className="text-sm text-slate-800">{device.processor}</div>
                              <div className="text-sm text-slate-600">{device.ram} • {device.storage}</div>
                            </>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getConditionClass(device.condition)}`}>
                            {device.condition}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-800 font-semibold">${device.price.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStockClass(device.stock)}`}>
                            {device.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(device)}
                              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                              title="Editar"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(device.id)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination - Devices Desktop */}
            {totalPagesDevices > 1 && (
              <div className="bg-white rounded-xl shadow-sm p-4 mt-4 flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Mostrando {startIndexDevices + 1} - {Math.min(endIndexDevices, filteredDevices.length)} de {filteredDevices.length} dispositivos
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPageDevices(prev => Math.max(1, prev - 1))}
                    disabled={currentPageDevices === 1}
                    className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Anterior
                  </button>
                  <div className="flex gap-1">
                    {Array.from({ length: totalPagesDevices }, (_, i) => i + 1).map((page) => {
                      if (
                        page === 1 ||
                        page === totalPagesDevices ||
                        (page >= currentPageDevices - 1 && page <= currentPageDevices + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPageDevices(page)}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              currentPageDevices === page
                                ? 'bg-blue-600 text-white'
                                : 'border border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      } else if (page === currentPageDevices - 2 || page === currentPageDevices + 2) {
                        return <span key={page} className="px-2 py-2">...</span>;
                      }
                      return null;
                    })}
                  </div>
                  <button
                    onClick={() => setCurrentPageDevices(prev => Math.min(totalPagesDevices, prev + 1))}
                    disabled={currentPageDevices === totalPagesDevices}
                    className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}

            {/* Cards - Mobile - Devices */}
            <div className="md:hidden space-y-4">
              {paginatedDevices.map((device: Device) => (
                <div 
                  key={device.id} 
                  className="bg-white rounded-xl shadow-sm p-5 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleViewDetails(device)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getCategoryColor(device.category)}`}>
                          {getCategoryIcon(device.category)}
                          {device.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-slate-800">{device.brand}</h3>
                      <p className="text-slate-600">{device.model}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getConditionClass(device.condition)}`}>
                      {device.condition}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Precio:</span>
                      <span className="font-semibold text-slate-800">${device.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Stock:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStockClass(device.stock)}`}>
                        {device.stock}
                      </span>
                    </div>
                  </div>

                  <div className="text-center text-sm text-blue-600 font-medium pt-2 border-t border-slate-100">
                    Toca para ver detalles completos
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination - Devices Mobile */}
            {totalPagesDevices > 1 && (
              <div className="md:hidden bg-white rounded-xl shadow-sm p-4 mt-4">
                <div className="text-sm text-slate-600 text-center mb-3">
                  Página {currentPageDevices} de {totalPagesDevices}
                </div>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => setCurrentPageDevices(prev => Math.max(1, prev - 1))}
                    disabled={currentPageDevices === 1}
                    className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => setCurrentPageDevices(prev => Math.min(totalPagesDevices, prev + 1))}
                    disabled={currentPageDevices === totalPagesDevices}
                    className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Device Detail Modal */}
        {showDetailModal && selectedDevice && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowDetailModal(false)}>
            <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getCategoryIcon(selectedDevice.category, 32)}
                      <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getCategoryColor(selectedDevice.category)}`}>
                        {selectedDevice.category}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800">{selectedDevice.brand}</h2>
                    <p className="text-xl text-slate-600 mt-1">{selectedDevice.model}</p>
                  </div>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-slate-400 hover:text-slate-600 p-2 hover:bg-white rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-slate-600 mb-1">
                      <Package size={18} />
                      <span className="text-sm font-medium">Stock</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">{selectedDevice.stock}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-slate-600 mb-1">
                      <DollarSign size={18} />
                      <span className="text-sm font-medium">Precio</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">${selectedDevice.price.toLocaleString()}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-slate-600 mb-1">
                      <User size={18} />
                      <span className="text-sm font-medium">Asignado</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 mt-2">{selectedDevice.assignedTo}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-slate-600 mb-1 text-sm font-medium">Condición</div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${getConditionClass(selectedDevice.condition)}`}>
                      {selectedDevice.condition}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Monitor size={20} className="text-blue-600" />
                    Especificaciones Técnicas
                  </h3>
                  <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                    {selectedDevice.category === 'Móvil' && (
                      <>
                        <div className="flex justify-between items-center py-2 border-b border-slate-200">
                          <span className="text-slate-600 font-medium">IMEI</span>
                          <span className="text-slate-800 font-mono">{selectedDevice.imei}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-200">
                          <span className="text-slate-600 font-medium">Almacenamiento</span>
                          <span className="text-slate-800">{selectedDevice.storage}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-slate-600 font-medium">Color</span>
                          <span className="text-slate-800">{selectedDevice.color}</span>
                        </div>
                      </>
                    )}

                    {selectedDevice.category === 'Laptop' && (
                      <>
                        <div className="flex justify-between items-center py-2 border-b border-slate-200">
                          <span className="text-slate-600 font-medium">Número de Serie</span>
                          <span className="text-slate-800 font-mono">{selectedDevice.serialNumber}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-200">
                          <span className="text-slate-600 font-medium">Procesador</span>
                          <span className="text-slate-800">{selectedDevice.processor}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-200">
                          <span className="text-slate-600 font-medium">RAM</span>
                          <span className="text-slate-800">{selectedDevice.ram}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-200">
                          <span className="text-slate-600 font-medium">Almacenamiento</span>
                          <span className="text-slate-800">{selectedDevice.storage}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-slate-600 font-medium">Tamaño de Pantalla</span>
                          <span className="text-slate-800">{selectedDevice.screenSize}</span>
                        </div>
                      </>
                    )}

                    {selectedDevice.category === 'Desktop' && (
                      <>
                        <div className="flex justify-between items-center py-2 border-b border-slate-200">
                          <span className="text-slate-600 font-medium">Número de Serie</span>
                          <span className="text-slate-800 font-mono">{selectedDevice.serialNumber}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-200">
                          <span className="text-slate-600 font-medium">Procesador</span>
                          <span className="text-slate-800">{selectedDevice.processor}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-200">
                          <span className="text-slate-600 font-medium">RAM</span>
                          <span className="text-slate-800">{selectedDevice.ram}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-slate-200">
                          <span className="text-slate-600 font-medium">Almacenamiento</span>
                          <span className="text-slate-800">{selectedDevice.storage}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-slate-600 font-medium">Tarjeta Gráfica</span>
                          <span className="text-slate-800">{selectedDevice.graphicsCard}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Calendar size={20} className="text-blue-600" />
                    Información Adicional
                  </h3>
                  <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                    {selectedDevice.purchaseDate && (
                      <div className="flex justify-between items-center py-2 border-b border-slate-200">
                        <span className="text-slate-600 font-medium">Fecha de Compra</span>
                        <span className="text-slate-800">{new Date(selectedDevice.purchaseDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                    )}
                    {selectedDevice.warranty && (
                      <div className="flex justify-between items-center py-2 border-b border-slate-200">
                        <span className="text-slate-600 font-medium">Garantía</span>
                        <span className="text-slate-800">{selectedDevice.warranty}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600 font-medium">Valor Total en Stock</span>
                      <span className="text-slate-800 font-bold text-lg">${(selectedDevice.price * selectedDevice.stock).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {selectedDevice.notes && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-3">Notas</h3>
                    <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-4">
                      <p className="text-slate-700">{selectedDevice.notes}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => handleEdit(selectedDevice)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    <Edit2 size={18} />
                    Editar Dispositivo
                  </button>
                  <button
                    onClick={() => handleDelete(selectedDevice.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    <Trash2 size={18} />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Detail Modal */}
        {showUserDetailModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowUserDetailModal(false)}>
            <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {selectedUser.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-slate-800">{selectedUser.name}</h2>
                      <p className="text-lg text-slate-600 mt-1">{selectedUser.email}</p>
                      <div className="flex gap-2 mt-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleClass(selectedUser.role)}`}>
                          {selectedUser.role}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(selectedUser.status)}`}>
                          {selectedUser.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowUserDetailModal(false)}
                    className="text-slate-400 hover:text-slate-600 p-2 hover:bg-white rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-slate-600 mb-1">
                      <Building size={18} />
                      <span className="text-sm font-medium">Departamento</span>
                    </div>
                    <p className="text-lg font-bold text-slate-800 mt-1">{selectedUser.department}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-slate-600 mb-1">
                      <Monitor size={18} />
                      <span className="text-sm font-medium">Dispositivos</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">{getUserDeviceCount(selectedUser.name)}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-slate-600 mb-1">
                      <Calendar size={18} />
                      <span className="text-sm font-medium">Fecha de Ingreso</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 mt-1">
                      {new Date(selectedUser.hireDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <User size={20} className="text-blue-600" />
                    Información de Contacto
                  </h3>
                  <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-3 py-2 border-b border-slate-200">
                      <Mail size={18} className="text-slate-500" />
                      <div>
                        <div className="text-xs text-slate-600">Email</div>
                        <div className="text-slate-800 font-medium">{selectedUser.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 py-2 border-b border-slate-200">
                      <Phone size={18} className="text-slate-500" />
                      <div>
                        <div className="text-xs text-slate-600">Teléfono</div>
                        <div className="text-slate-800 font-medium">{selectedUser.phone}</div>
                      </div>
                    </div>
                    {selectedUser.location && (
                      <div className="flex items-center gap-3 py-2">
                        <MapPin size={18} className="text-slate-500" />
                        <div>
                          <div className="text-xs text-slate-600">Ubicación</div>
                          <div className="text-slate-800 font-medium">{selectedUser.location}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dispositivos Asignados */}
                {getUserDeviceCount(selectedUser.name) > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <Monitor size={20} className="text-blue-600" />
                      Dispositivos Asignados ({getUserDeviceCount(selectedUser.name)})
                    </h3>
                    <div className="space-y-3">
                      {getUserDevices(selectedUser.name).map((device) => (
                        <div 
                          key={device.id}
                          className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors cursor-pointer"
                          onClick={() => {
                            setShowUserDetailModal(false);
                            handleViewDetails(device);
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <div className={`p-2 rounded-lg ${getCategoryColor(device.category)}`}>
                                {getCategoryIcon(device.category, 18)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-slate-800">{device.brand} {device.model}</span>
                                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getCategoryColor(device.category)}`}>
                                    {device.category}
                                  </span>
                                </div>
                                <div className="text-sm text-slate-600 mt-1">
                                  {device.category === 'Móvil' && `IMEI: ${device.imei}`}
                                  {device.category === 'Laptop' && `Serial: ${device.serialNumber}`}
                                  {device.category === 'Desktop' && `Serial: ${device.serialNumber}`}
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getConditionClass(device.condition)}`}>
                                    {device.condition}
                                  </span>
                                  <span className="text-sm text-slate-600">
                                    ${device.price.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedUser.notes && (
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-3">Notas</h3>
                    <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-4">
                      <p className="text-slate-700">{selectedUser.notes}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => handleEditUser(selectedUser)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    <Edit2 size={18} />
                    Editar Usuario
                  </button>
                  <button
                    onClick={() => handleDeleteUser(selectedUser.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    <Trash2 size={18} />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Device Add/Edit Modal - (Previous implementation remains the same, truncated for brevity) */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-2xl font-bold text-slate-800">
                  {editingDevice ? 'Editar Dispositivo' : 'Agregar Nuevo Dispositivo'}
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-3">Categoría del Dispositivo</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['Móvil', 'Laptop', 'Desktop'] as DeviceCategory[]).map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => handleCategoryChange(category)}
                        disabled={!!editingDevice}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.category === category
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-300'
                        } ${editingDevice ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          {getCategoryIcon(category)}
                          <span className="font-medium text-sm">{category}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Marca *</label>
                    <input
                      type="text"
                      required
                      value={formData.brand}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, brand: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Apple, Dell, HP, etc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Modelo *</label>
                    <input
                      type="text"
                      required
                      value={formData.model}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, model: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="iPhone 15, XPS 15, etc."
                    />
                  </div>
                </div>

                {/* Campos Específicos por Categoría */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {formData.category === 'Móvil' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">IMEI *</label>
                        <input
                          type="text"
                          required
                          value={formData.imei || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, imei: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="352099001234567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Almacenamiento *</label>
                        <input
                          type="text"
                          required
                          value={formData.storage || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, storage: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="128GB, 256GB, etc."
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Color *</label>
                        <input
                          type="text"
                          required
                          value={formData.color || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, color: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="Negro, Blanco, etc."
                        />
                      </div>
                    </>
                  )}

                  {formData.category === 'Laptop' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Número de Serie *</label>
                        <input
                          type="text"
                          required
                          value={formData.serialNumber || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, serialNumber: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="DL9876543210"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Procesador *</label>
                        <input
                          type="text"
                          required
                          value={formData.processor || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, processor: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="Intel Core i7, Apple M3, etc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">RAM *</label>
                        <input
                          type="text"
                          required
                          value={formData.ram || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, ram: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="16GB DDR5, 32GB, etc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Almacenamiento *</label>
                        <input
                          type="text"
                          required
                          value={formData.storage || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, storage: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="512GB SSD, 1TB NVMe, etc."
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Tamaño de Pantalla *</label>
                        <input
                          type="text"
                          required
                          value={formData.screenSize || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, screenSize: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder='14", 15.6", 16", etc.'
                        />
                      </div>
                    </>
                  )}

                  {formData.category === 'Desktop' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Número de Serie *</label>
                        <input
                          type="text"
                          required
                          value={formData.serialNumber || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, serialNumber: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="HP5555666677"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Procesador *</label>
                        <input
                          type="text"
                          required
                          value={formData.processor || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, processor: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="Intel Core i9, AMD Ryzen 9, etc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">RAM *</label>
                        <input
                          type="text"
                          required
                          value={formData.ram || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, ram: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="32GB DDR5, 64GB, etc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Almacenamiento *</label>
                        <input
                          type="text"
                          required
                          value={formData.storage || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, storage: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="1TB NVMe SSD, 2TB, etc."
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Tarjeta Gráfica *</label>
                        <input
                          type="text"
                          required
                          value={formData.graphicsCard || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, graphicsCard: e.target.value})}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="NVIDIA RTX 4060, AMD RX 7800, etc."
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Campos Finales Comunes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Fecha de Compra</label>
                    <input
                      type="date"
                      value={formData.purchaseDate || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, purchaseDate: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Garantía</label>
                    <input
                      type="text"
                      value={formData.warranty || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, warranty: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="1 año, 2 años, etc."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Notas</label>
                    <textarea
                      value={formData.notes || ''}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, notes: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      rows={3}
                      placeholder="Información adicional sobre el dispositivo..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Condición *</label>
                    <select
                      value={formData.condition}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({...formData, condition: e.target.value as DeviceCondition})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                    >
                      <option value="Nuevo">Nuevo</option>
                      <option value="Usado - Excelente">Usado - Excelente</option>
                      <option value="Usado - Bueno">Usado - Bueno</option>
                      <option value="Reparación">Reparación</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Precio ($) *</label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, price: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="999"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Stock *</label>
                    <input
                      type="number"
                      required
                      value={formData.stock}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, stock: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Asignado a</label>
                    <select
                      value={formData.assignedTo}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({...formData, assignedTo: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                    >
                      <option value="-">Sin asignar</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.name}>
                          {user.name} - {user.department}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingDevice(null);
                      resetForm();
                    }}
                    className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                  >
                    {editingDevice ? 'Guardar Cambios' : 'Agregar Dispositivo'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* User Add/Edit Modal */}
        {showUserModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-2xl font-bold text-slate-800">
                  {editingUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
                </h2>
              </div>
              
              <form onSubmit={handleUserSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      value={userFormData.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserFormData({...userFormData, name: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Juan Pérez"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={userFormData.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserFormData({...userFormData, email: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="juan.perez@empresa.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Teléfono *</label>
                    <input
                      type="tel"
                      required
                      value={userFormData.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserFormData({...userFormData, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="+502 1234-5678"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Rol *</label>
                    <select
                      value={userFormData.role}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUserFormData({...userFormData, role: e.target.value as UserRole})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                    >
                      <option value="Empleado">Empleado</option>
                      <option value="Manager">Manager</option>
                      <option value="Admin">Admin</option>
                      <option value="Técnico">Técnico</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Departamento *</label>
                    <input
                      type="text"
                      required
                      value={userFormData.department}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserFormData({...userFormData, department: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="IT, Desarrollo, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Estado *</label>
                    <select
                      value={userFormData.status}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUserFormData({...userFormData, status: e.target.value as UserStatus})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                    >
                      <option value="Activo">Activo</option>
                      <option value="Inactivo">Inactivo</option>
                      <option value="Vacaciones">Vacaciones</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Fecha de Ingreso *</label>
                    <input
                      type="date"
                      required
                      value={userFormData.hireDate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserFormData({...userFormData, hireDate: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Ubicación</label>
                    <input
                      type="text"
                      value={userFormData.location || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserFormData({...userFormData, location: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Guatemala City"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Notas</label>
                    <textarea
                      value={userFormData.notes || ''}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setUserFormData({...userFormData, notes: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      rows={3}
                      placeholder="Información adicional sobre el usuario..."
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUserModal(false);
                      setEditingUser(null);
                      resetUserForm();
                    }}
                    className="px-6 py-2.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                  >
                    {editingUser ? 'Guardar Cambios' : 'Agregar Usuario'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}