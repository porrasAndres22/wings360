"use client"
import Image from "next/image";

import React, { useState } from 'react';
import { 
  LayoutGrid, 
  Users, 
  ClipboardList, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  Menu,
  CheckCircle2,
  MoreHorizontal
} from 'lucide-react';


const FluentButton = ({ children, primary, className, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`px-6 py-2 rounded-[4px] text-sm font-medium transition-all duration-200 
    ${primary 
      ? 'bg-[#0078D4] text-white hover:bg-[#106EBE] active:bg-[#005A9E] shadow-sm' 
      : 'bg-white text-[#242424] border border-[#8A8886] hover:bg-[#F3F2F1]'} 
    ${className}`}
  >
    {children}
  </button>
);


// Input estilo Microsoft
const FluentInput = ({ type, placeholder, label }: any) => (
  <div className="flex flex-col gap-1.5 mb-4">
    <label className="text-sm font-semibold text-[#242424]">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      className="w-full p-2.5 text-sm border-b border-[#8A8886] bg-[#F3F2F1] rounded-t-[4px] focus:border-b-2 focus:border-[#0078D4] focus:bg-white outline-none transition-colors hover:bg-[#E1DFDD]"
    />
  </div>
);

const FluentCard = ({ title, icon: Icon, subtitle, status }: any) => (
  <div className="bg-white p-4 rounded-[8px] shadow-[0_1.6px_3.6px_0_rgba(0,0,0,0.13),0_0.3px_0.9px_0_rgba(0,0,0,0.11)] hover:shadow-[0_3.2px_7.2px_0_rgba(0,0,0,0.13),0_0.6px_1.8px_0_rgba(0,0,0,0.11)] transition-shadow cursor-pointer border border-transparent hover:border-[#E1DFDD]">
    <div className="flex justify-between items-start mb-3">
      <div className="p-2 bg-[#F3F2F1] rounded-full text-[#0078D4]">
        <Icon size={20} />
      </div>
      <button className="text-[#605E5C] hover:bg-[#F3F2F1] p-1 rounded">
        <MoreHorizontal size={16} />
      </button>
    </div>
    <h3 className="font-semibold text-[#242424] mb-1">{title}</h3>
    <p className="text-xs text-[#605E5C] mb-4">{subtitle}</p>
    
    {status && (
      <div className="flex items-center gap-2 text-xs font-medium">
        <span className={`w-2 h-2 rounded-full ${status === 'Active' ? 'bg-green-500' : 'bg-orange-400'}`}></span>
        <span className="text-[#605E5C]">{status}</span>
      </div>
    )}
  </div>
);

export default function AppPrototype() {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'admin', 'user'
  const [email, setEmail] = useState('');

  // Simulación de Login
  const handleLogin = () => {
    if (email.includes('admin')) {
      setCurrentView('admin');
    } else {
      setCurrentView('user');
    }
  };

  // --- VISTA LOGIN ---
  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4 bg-[url('https://img.freepik.com/free-vector/white-abstract-background-design_23-2148825582.jpg')] bg-cover bg-center">
        <div className="bg-white p-10 rounded-[8px] shadow-xl w-full max-w-[440px]">
          {/* Logo Simulado */}
          <div className="flex items-center gap-2 mb-8">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-2.5 h-2.5 bg-[#F25022]"></div>
              <div className="w-2.5 h-2.5 bg-[#7FBA00]"></div>
              <div className="w-2.5 h-2.5 bg-[#00A4EF]"></div>
              <div className="w-2.5 h-2.5 bg-[#FFB900]"></div>
            </div>
            <span className="font-semibold text-xl text-[#5E5E5E]">Proyecto 360</span>
          </div>

          <h1 className="text-2xl font-bold text-[#1b1b1b] mb-2">Iniciar sesión</h1>
          <p className="text-sm text-[#242424] mb-6">Prosiga a su portal de evaluación</p>

          <div className="flex flex-col gap-1.5 mb-4">
            <label className="text-sm font-semibold text-[#242424]">Correo electrónico</label>
            <input 
              type="email" 
              placeholder="usuario@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 text-sm border-b border-[#8A8886] bg-[#F3F2F1] rounded-t-[4px] focus:border-b-2 focus:border-[#0078D4] focus:bg-white outline-none transition-colors hover:bg-[#E1DFDD]"
            />
          </div>
          
          <FluentInput type="password" placeholder="Contraseña" label="Contraseña" />

          <div className="text-sm text-[#0078D4] hover:underline cursor-pointer mb-6">
            ¿Olvidó su contraseña?
          </div>

          <div className="flex justify-end gap-3">
            <FluentButton onClick={handleLogin} primary className="w-32">
              Siguiente
            </FluentButton>
          </div>
        </div>
      </div>
    );
  }

  // --- LAYOUT PRINCIPAL (ADMIN/USER) ---
  return (
    <div className="min-h-screen bg-[#FAF9F8] flex font-sans text-[#201F1E]">
      {/* Sidebar Estilo Teams/M365 */}
      <aside className="w-16 lg:w-64 bg-[#FFFFFF] border-r border-[#E1DFDD] flex flex-col transition-all duration-300">
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
          <SidebarItem icon={LayoutGrid} label="Dashboard" active />
          {currentView === 'admin' && (
            <>
              <SidebarItem icon={Users} label="Empleados" />
              <SidebarItem icon={Settings} label="Configuración" />
            </>
          )}
          <SidebarItem icon={ClipboardList} label="Mis Evaluaciones" />
        </nav>

        <div className="p-2 border-t border-[#E1DFDD]">
          <button onClick={() => setCurrentView('login')} className="flex items-center gap-3 w-full p-2 text-[#201F1E] hover:bg-[#F3F2F1] rounded-[4px]">
            <LogOut size={20} />
            <span className="text-sm font-medium hidden lg:block">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-white border-b border-[#E1DFDD] flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center bg-[#F3F2F1] px-3 py-1.5 rounded-[4px] w-full max-w-md">
            <Search size={16} className="text-[#605E5C]" />
            <input type="text" placeholder="Buscar..." className="bg-transparent border-none outline-none text-sm ml-2 w-full placeholder-[#605E5C]" />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-[#605E5C] hover:text-[#0078D4]"><Bell size={20} /></button>
            <div className="w-8 h-8 rounded-full bg-[#0078D4] text-white flex items-center justify-center text-xs font-bold">
              {currentView === 'admin' ? 'AD' : 'US'}
            </div>
          </div>
        </header>

        {/* Área de Contenido (Scrollable) */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">
            
            {/* Título de la sección */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold mb-1">
                {currentView === 'admin' ? 'Panel de Administración' : 'Mi Espacio de Trabajo'}
              </h1>
              <p className="text-[#605E5C]">
                {currentView === 'admin' 
                  ? 'Gestione las evaluaciones activas y el personal.' 
                  : 'Bienvenido de nuevo, aquí están tus tareas pendientes.'}
              </p>
            </div>

            {/* GRID DE DASHBOARD */}
            {currentView === 'admin' ? (
              // VISTA ADMIN
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
              // VISTA USUARIO
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <FluentCard title="Autoevaluación" icon={ClipboardList} subtitle="Pendiente de envío" status="Vence en 2 días" />
                <FluentCard title="Evaluación de Pares" icon={Users} subtitle="Evaluar a: Juan Pérez" status="Active" />
                <FluentCard title="Resultados Históricos" icon={CheckCircle2} subtitle="Ver feedback anterior" />
              </div>
            )}

            {/* Sección de Lista (Estilo Tabla Microsoft) */}
            <div className="bg-white rounded-[8px] shadow-sm border border-[#E1DFDD] overflow-hidden">
              <div className="p-4 border-b border-[#E1DFDD] flex justify-between items-center">
                <h3 className="font-semibold">Actividad Reciente</h3>
                <button className="text-[#0078D4] text-sm font-medium hover:underline">Ver todo</button>
              </div>
              <div className="divide-y divide-[#E1DFDD]">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-[#F3F2F1] transition-colors cursor-default">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E1DFDD] flex items-center justify-center text-xs">
                        {currentView === 'admin' ? 'EMP' : 'SYS'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#242424]">
                          {currentView === 'admin' ? `Empleado ${i} completó su autoevaluación` : `Sistema: Recordatorio enviado`}
                        </p>
                        <p className="text-xs text-[#605E5C]">Hace {i * 2} horas</p>
                      </div>
                    </div>
                    <span className="text-xs bg-[#F3F2F1] text-[#605E5C] px-2 py-1 rounded">Detalles</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

const SidebarItem = ({ icon: Icon, label, active }: any) => (
  <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-[4px] text-sm transition-colors ${active ? 'bg-[#EFF6FC] text-[#0078D4] font-semibold' : 'text-[#201F1E] hover:bg-[#F3F2F1]'}`}>
    <Icon size={20} />
    <span className="hidden lg:block">{label}</span>
  </button>
);