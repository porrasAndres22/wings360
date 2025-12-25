'use client';

import { useState } from 'react';
import { 
  Settings, 
  BarChart3, 
  Database, 
  Globe, 
  Webhook, 
  Users, 
  Key, 
  Box, 
  AlertTriangle,
  X,
  Copy,
  Check
} from 'lucide-react';

export default function ProjectSettings() {
  const [projectName, setProjectName] = useState('glistening-laughter');
  const [description, setDescription] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const projectId = '5bbb0405-57bf-41a2-8f59-356f002a4b6c';

  const menuItems = [
    { id: 'general', icon: Settings, label: 'General' },
    { id: 'usage', icon: BarChart3, label: 'Usage' },
    { id: 'environments', icon: Database, label: 'Environments' },
    { id: 'shared-variables', icon: Globe, label: 'Shared Variables' },
    { id: 'webhooks', icon: Webhook, label: 'Webhooks' },
    { id: 'members', icon: Users, label: 'Members' },
    { id: 'tokens', icon: Key, label: 'Tokens' },
    { id: 'integrations', icon: Box, label: 'Integrations' },
    { id: 'danger', icon: AlertTriangle, label: 'Danger' },
  ];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(projectId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Componente para la pantalla General
  const GeneralScreen = () => (
    <div className="animate__animated animate__fadeIn">
      <h2 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8 text-gray-900">Project Info</h2>

      {/* Name Field */}
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm text-gray-600 mb-2 font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Description Field */}
      <div className="mb-6">
        <label htmlFor="description" className="block text-sm text-gray-600 mb-2 font-medium">
          Description
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description of this project"
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Project ID Field */}
      <div className="mb-8">
        <label htmlFor="projectId" className="block text-sm text-gray-600 mb-2 font-medium">
          Project ID
        </label>
        <div className="relative">
          <input
            id="projectId"
            type="text"
            value={projectId}
            readOnly
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-12 text-gray-900 font-mono text-sm focus:outline-none cursor-default"
          />
          <button
            onClick={handleCopy}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Update Button */}
      <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-50">
        Update
      </button>
    </div>
  );

  // Componente para la pantalla Usage
  const UsageScreen = () => (
    <div className="animate__animated animate__fadeIn">
      <h2 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8 text-gray-900">Usage Statistics</h2>

      {/* Usage Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 font-medium">API Calls</span>
            <BarChart3 className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">12,458</p>
          <p className="text-xs text-gray-500 mt-1">This month</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 font-medium">Storage</span>
            <Database className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">2.4 GB</p>
          <p className="text-xs text-gray-500 mt-1">of 10 GB used</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 font-medium">Bandwidth</span>
            <Globe className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">45.2 GB</p>
          <p className="text-xs text-gray-500 mt-1">This month</p>
        </div>
      </div>

      {/* Usage Chart Placeholder */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Over Time</h3>
        <div className="h-64 flex items-center justify-center rounded border-2 border-dashed border-gray-300">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Chart visualization would go here</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { date: '2025-12-24 14:32', action: 'API call to /users endpoint', count: '1,245 requests' },
            { date: '2025-12-24 12:15', action: 'Database backup completed', count: '2.3 GB' },
            { date: '2025-12-23 18:45', action: 'Webhook triggered', count: '342 events' },
            { date: '2025-12-23 09:20', action: 'File upload', count: '156 MB' },
          ].map((activity, index) => (
            <div key={index} className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
              </div>
              <span className="text-sm text-gray-600 font-medium">{activity.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Renderizar contenido según la pestaña activa
  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralScreen />;
      case 'usage':
        return <UsageScreen />;
      case 'environments':
        return (
          <div className="animate__animated animate__fadeIn">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">Environments</h2>
            <p className="text-gray-600">Environment configuration will be displayed here.</p>
          </div>
        );
      case 'shared-variables':
        return (
          <div className="animate__animated animate__fadeIn">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">Shared Variables</h2>
            <p className="text-gray-600">Shared variables configuration will be displayed here.</p>
          </div>
        );
      case 'webhooks':
        return (
          <div className="animate__animated animate__fadeIn">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">Webhooks</h2>
            <p className="text-gray-600">Webhook configuration will be displayed here.</p>
          </div>
        );
      case 'members':
        return (
          <div className="animate__animated animate__fadeIn">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">Members</h2>
            <p className="text-gray-600">Team members management will be displayed here.</p>
          </div>
        );
      case 'tokens':
        return (
          <div className="animate__animated animate__fadeIn">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">Tokens</h2>
            <p className="text-gray-600">API tokens management will be displayed here.</p>
          </div>
        );
      case 'integrations':
        return (
          <div className="animate__animated animate__fadeIn">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">Integrations</h2>
            <p className="text-gray-600">Third-party integrations will be displayed here.</p>
          </div>
        );
      case 'danger':
        return (
          <div className="animate__animated animate__fadeIn">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900 text-red-600">Danger Zone</h2>
            <p className="text-gray-600">Dangerous actions like project deletion will be displayed here.</p>
          </div>
        );
      default:
        return <GeneralScreen />;
    }
  };

  return (
    <div className="min-h-screen text-gray-900 animate__animated animate__fadeInDown">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 pt-6 overflow-x-auto md:overflow-x-visible">
          <nav className="flex md:flex-col gap-1 min-w-max md:min-w-0">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left whitespace-nowrap ${
                    isActive
                      ? 'text-theme-text-1 bg-theme-text-10'
                      : 'text-theme-text-0 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm md:text-base">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 lg:p-12 max-w-4xl">
          <div className="space-y-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}