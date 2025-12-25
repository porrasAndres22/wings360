'use client';

import { useState } from 'react';
import { ChevronDown, Settings, Users, CreditCard, BarChart3, FileText, DollarSign, Gift, User, Bell, Flag, Key, Lock } from 'lucide-react';

export default function GeneralSettings() {
  const [workspaceName, setWorkspaceName] = useState("porrasandres22's Projects");
  const [avatarUrl, setAvatarUrl] = useState("https://avatars.githubusercontent.com/u/99056");
  const [region, setRegion] = useState("US East (Virginia, USA)");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-white border-r border-gray-200 lg:min-h-screen">
          {/* Workspace Header */}
          <div className="p-4 border-b border-gray-200">
            <button className="flex items-center gap-3 w-full hover:bg-gray-50 rounded-lg p-2 transition-colors">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-gray-300 rounded-sm"></div>
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900 text-sm truncate">porrasandres22's...</p>
                <p className="text-xs text-gray-500">Hobby Workspace</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Workspace Section */}
          <div className="p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Workspace</p>
            <nav className="space-y-1">
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg">
                <Settings className="w-4 h-4" />
                General
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Users className="w-4 h-4" />
                People
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <CreditCard className="w-4 h-4" />
                Plans
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <BarChart3 className="w-4 h-4" />
                Usage
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <FileText className="w-4 h-4" />
                Billing
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <FileText className="w-4 h-4" />
                Audit Logs
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <DollarSign className="w-4 h-4" />
                Earnings
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <FileText className="w-4 h-4" />
                Templates
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Gift className="w-4 h-4" />
                Referrals
              </a>
            </nav>
          </div>

          {/* Personal Section */}
          <div className="p-4 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Personal</p>
            <nav className="space-y-1">
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <User className="w-4 h-4" />
                Account
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-4 h-4" />
                Notifications
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Flag className="w-4 h-4" />
                Feature Flags
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Key className="w-4 h-4" />
                Tokens
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Lock className="w-4 h-4" />
                Security
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">General Settings</h1>

          {/* Workspace Information */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Workspace Information</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />

                <label className="block text-sm font-medium text-gray-700 mb-2 mt-6">
                  Avatar URL
                </label>
                <input
                  type="text"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />

                <button className="mt-6 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors">
                  Update Profile
                </button>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Preferred Deployment Region */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Preferred Deployment Region</h2>
            <p className="text-sm text-gray-600 mb-6">
              New services in this workspace will default to this region.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="relative">
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none cursor-pointer"
                  >
                    <option>US East (Virginia, USA)</option>
                    <option>US West (Oregon, USA)</option>
                    <option>EU Central (Frankfurt, Germany)</option>
                    <option>Asia Pacific (Singapore)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>

                <button className="mt-6 px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors">
                  Update Region
                </button>
              </div>

              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Globe background */}
                    <circle cx="100" cy="100" r="90" fill="#1e293b" opacity="0.1" />
                    
                    {/* Continents - simplified shapes */}
                    <path
                      d="M 60 50 Q 80 45 100 50 L 95 80 L 70 75 Z"
                      fill="#475569"
                      opacity="0.3"
                    />
                    <path
                      d="M 110 60 Q 130 55 145 65 L 140 90 L 115 85 Z"
                      fill="#475569"
                      opacity="0.3"
                    />
                    <path
                      d="M 50 100 Q 70 95 90 100 L 85 130 L 55 125 Z"
                      fill="#475569"
                      opacity="0.3"
                    />
                    <path
                      d="M 100 110 Q 120 105 135 115 L 130 140 L 105 135 Z"
                      fill="#475569"
                      opacity="0.3"
                    />
                    
                    {/* Location marker */}
                    <circle cx="100" cy="70" r="25" fill="#8b5cf6" opacity="0.3" />
                    <circle cx="100" cy="70" r="15" fill="#8b5cf6" opacity="0.5" />
                    <circle cx="100" cy="70" r="6" fill="#8b5cf6" />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* Warning Message */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm text-red-800">
              You cannot delete your last workspace. To delete your account, visit{' '}
              <a href="#" className="font-medium underline hover:text-red-900">
                Account Settings
              </a>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}