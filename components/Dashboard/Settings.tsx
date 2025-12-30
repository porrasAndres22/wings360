'use client';

import { useState } from 'react';

export default function Dashboard() {
    const [activeNavItem, setActiveNavItem] = useState('Organization');
    const [selectedTab, setSelectedTab] = useState('Operations');
    const [selectedYear, setSelectedYear] = useState('2025');

    // Datos del gráfico de estadísticas
    const statsData = [
        { date: '27 Jun', operations: 0.48, dataTransfer: 0.95, operationsPercent: null, transferPercent: null },
        { date: '28 Jun', operations: 0.32, dataTransfer: 0.58, operationsPercent: null, transferPercent: null },
        { date: '29 Jun', operations: 0.28, dataTransfer: 0.72, operationsPercent: null, transferPercent: null },
        { date: '30 Jun', operations: null, dataTransfer: null, operationsPercent: null, transferPercent: null },
        { date: '1 Jul', operations: 0.44, dataTransfer: 0.98, operationsPercent: '32%', transferPercent: '87%' },
        { date: '2 Jul', operations: null, dataTransfer: null, operationsPercent: null, transferPercent: null },
        { date: '3 Jul', operations: 0.48, dataTransfer: 0.68, operationsPercent: null, transferPercent: null },
        { date: '4 Jul', operations: 0.34, dataTransfer: 0.62, operationsPercent: null, transferPercent: null },
    ];

    const navItems = [
        'Organization', 'Teams', 'Users', 'Subscription',
        'Payment', 'Installed Apps', 'Variables', 'Scenario Properties'
    ];

    // Renderizar contenido basado en el item activo
    const renderContent = () => {
        switch (activeNavItem) {
            case 'Organization':
                return <OrganizationContent statsData={statsData} selectedTab={selectedTab} setSelectedTab={setSelectedTab} selectedYear={selectedYear} setSelectedYear={setSelectedYear} />;
            case 'Teams':
                return <TeamsContent />;
            case 'Users':
                return <UsersContent />;
            case 'Subscription':
                return <SubscriptionContent />;
            case 'Payment':
                return <PaymentContent />;
            case 'Installed Apps':
                return <InstalledAppsContent />;
            case 'Variables':
                return <VariablesContent />;
            case 'Scenario Properties':
                return <ScenarioPropertiesContent />;
            default:
                return <OrganizationContent statsData={statsData} selectedTab={selectedTab} setSelectedTab={setSelectedTab} selectedYear={selectedYear} setSelectedYear={setSelectedYear} />;
        }
    };

    return (
        <div className="min-h-screen from-gray-50 via-stone-100 to-gray-100 p-4 md:p-8 animate__animated animate__fadeIn">
            {/* Navigation */}
            <nav className="mb-8">
                <div className="flex gap-3 items-center">
                    {/* Back Button with white background */}
                    <div className="flex-shrink-0 bg-white rounded-full p-1 shadow-md">
                        <button
                            onClick={() => window.history.back()}
                            className="cursor-pointer w-10 h-10 md:w-12 md:h-12 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center transition-all duration-300 group"
                            aria-label="Go back"
                        >
                            <svg
                                className="w-5 h-5 md:w-6 md:h-6 text-gray-700 group-hover:-translate-x-0.5 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <div className="flex-1 overflow-x-auto scrollbar-hide h-mx-4 py-2 px-4 md:mx-0 md:px-0">
                        <div className="flex gap-2 items-center min-w-max md:flex-wrap md:min-w-0">
                            {navItems.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setActiveNavItem(item)}
                                    className={`cursor-pointer px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                    ${activeNavItem === item
                                            ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/30'
                                            : 'bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md'
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

            {/* Render content based on active nav item */}
            {renderContent()}
        </div>
    );
}

// Organization Content Component
function OrganizationContent({ statsData, selectedTab, setSelectedTab, selectedYear, setSelectedYear }: any) {
    return (
        <>
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Operations Card */}
                <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 group">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                            </div>
                            <h3 className="text-gray-800 font-semibold">Operations</h3>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                        </button>
                    </div>

                    <div className="mb-4">
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-bold text-gray-900">780</span>
                            <span className="text-gray-400 text-lg">/1000</span>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                            <div className="flex items-center gap-1 text-xs font-semibold text-lime-600 bg-lime-50 px-2 py-1 rounded-full">
                                82%
                            </div>
                        </div>
                    </div>

                    {/* Progress dots */}
                    <div className="flex gap-1.5">
                        {[...Array(10)].map((_, i) => (
                            <div
                                key={i}
                                className={`h-8 rounded-full flex-1 transition-all duration-700 ${i < 8
                                        ? 'bg-gray-900 shadow-md'
                                        : 'bg-gray-200'
                                    }`}
                                style={{ animationDelay: `${i * 50}ms` }}
                            />
                        ))}
                    </div>
                </div>

                {/* Data Transfer Card */}
                <div className="bg-gradient-to-br from-lime-300 via-lime-200 to-yellow-200 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_50%)]" />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/50 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                </div>
                                <h3 className="text-gray-800 font-semibold">Data Transfer</h3>
                            </div>
                            <button className="text-gray-600 hover:text-gray-800">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                            </button>
                        </div>

                        <div className="mb-4">
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-bold text-gray-900">163</span>
                                <span className="text-gray-600 text-lg">/512.0 MB</span>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                                <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 bg-white/70 backdrop-blur-sm px-2 py-1 rounded-full">
                                    68%
                                </div>
                            </div>
                        </div>

                        {/* Progress dots */}
                        <div className="flex gap-1.5">
                            {[...Array(7)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-8 rounded-full flex-1 transition-all duration-700 ${i < 5
                                            ? 'bg-gray-900 shadow-md'
                                            : 'bg-gray-900/20'
                                        }`}
                                    style={{ animationDelay: `${i * 50}ms` }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Upgrade Card */}
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1),transparent_70%)]" />

                    {/* Decorative image area */}
                    <div className="relative z-10 mb-6">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl" />
                        <div className="flex items-start gap-3">
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                                    Take Your<br />Automation<br />to the Next<br />Level
                                </h3>
                            </div>
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-500 opacity-50" />
                        </div>
                    </div>

                    <button className="relative z-10 w-full bg-white text-gray-900 px-6 py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg group/btn">
                        <span>Upgrade</span>
                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                            </svg>
                            <h2 className="text-xl font-bold text-gray-900">Statistics</h2>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                            <button
                                onClick={() => setSelectedTab('Operations')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedTab === 'Operations'
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <div className="w-2 h-2 bg-current rounded-full" />
                                Operations
                            </button>
                            <button
                                onClick={() => setSelectedTab('Data transfer')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedTab === 'Data transfer'
                                        ? 'bg-lime-300 text-gray-900'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <div className="w-2 h-2 bg-current rounded-full" />
                                Data transfer
                            </button>
                        </div>
                    </div>

                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 cursor-pointer"
                    >
                        <option>2025</option>
                        <option>2024</option>
                        <option>2023</option>
                    </select>
                </div>

                {/* Chart */}
                <div className="relative h-80">
                    {/* Y-axis labels */}
                    <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-400 pr-4">
                        {['1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1'].map((label) => (
                            <div key={label}>{label}</div>
                        ))}
                    </div>

                    {/* Chart area */}
                    <div className="ml-8 h-full flex items-end justify-around gap-2 md:gap-4 border-b border-gray-200">
                        {statsData.map((data: any, index: any) => (
                            <div key={data.date} className="flex-1 flex flex-col items-center justify-end h-full relative group/bar">
                                {/* Bars */}
                                {data.operations !== null || data.dataTransfer !== null ? (
                                    <div className="relative w-full max-w-16 mb-2 flex flex-col items-center">
                                        {/* Data Transfer bar (background) */}
                                        {data.dataTransfer !== null && (
                                            <div
                                                className="absolute bottom-0 w-full bg-gray-900 rounded-t-full transition-all duration-700 hover:scale-105"
                                                style={{
                                                    height: `${data.dataTransfer * 100}%`,
                                                    animationDelay: `${index * 100}ms`,
                                                }}
                                            >
                                                {/* Percentage label */}
                                                {data.transferPercent && (
                                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-md whitespace-nowrap">
                                                        {data.transferPercent}
                                                    </div>
                                                )}
                                                {/* Indicator dot */}
                                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-4 border-gray-300 rounded-full" />
                                            </div>
                                        )}

                                        {/* Operations bar (foreground) */}
                                        {data.operations !== null && (
                                            <div
                                                className="relative w-full bg-lime-300 rounded-t-full transition-all duration-700 hover:scale-105 z-10"
                                                style={{
                                                    height: `${data.operations * 100}%`,
                                                    animationDelay: `${index * 100 + 50}ms`,
                                                }}
                                            >
                                                {/* Percentage label */}
                                                {data.operationsPercent && (
                                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-md whitespace-nowrap">
                                                        {data.operationsPercent}
                                                    </div>
                                                )}
                                                {/* Indicator dot */}
                                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-lime-400 border-4 border-lime-500 rounded-full" />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        {/* Empty state - dashed outline */}
                                        <div className="w-full max-w-16 h-32 mb-2 border-2 border-dashed border-gray-200 rounded-t-full flex items-center justify-center">
                                            <div className="w-4 h-4 bg-gray-200 rounded-full" />
                                        </div>
                                    </>
                                )}

                                {/* Date label */}
                                <div className="text-xs text-gray-500 font-medium mt-2 whitespace-nowrap">
                                    {data.date}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

// Teams Content Component
function TeamsContent() {
    const teams = [
        { name: 'Engineering', members: 24, color: 'from-blue-500 to-blue-600', active: true },
        { name: 'Product', members: 12, color: 'from-purple-500 to-purple-600', active: true },
        { name: 'Design', members: 8, color: 'from-pink-500 to-pink-600', active: false },
        { name: 'Marketing', members: 15, color: 'from-orange-500 to-orange-600', active: true },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Teams Overview</h2>
                <button className="bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all hover:scale-105 shadow-lg flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create Team
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teams.map((team) => (
                    <div key={team.name} className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${team.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{team.name}</h3>
                                    <p className="text-sm text-gray-500">{team.members} members</p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${team.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                {team.active ? 'Active' : 'Inactive'}
                            </span>
                        </div>

                        <div className="flex gap-2 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-white -ml-2 first:ml-0" />
                            ))}
                            {team.members > 5 && (
                                <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white -ml-2 flex items-center justify-center text-xs font-semibold text-gray-600">
                                    +{team.members - 5}
                                </div>
                            )}
                        </div>

                        <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-2.5 rounded-xl font-medium transition-all">
                            Manage Team
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Users Content Component
function UsersContent() {
    const users = [
        { name: 'Sarah Johnson', email: 'sarah.j@company.com', role: 'Admin', status: 'active' },
        { name: 'Mike Chen', email: 'mike.c@company.com', role: 'Editor', status: 'active' },
        { name: 'Emily Davis', email: 'emily.d@company.com', role: 'Viewer', status: 'inactive' },
        { name: 'James Wilson', email: 'james.w@company.com', role: 'Editor', status: 'active' },
    ];

    return (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                <button className="bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all hover:scale-105 shadow-lg">
                    Invite User
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">User</th>
                            <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Role</th>
                            <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Status</th>
                            <th className="text-right py-4 px-4 text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-300 to-lime-400 flex items-center justify-center font-bold text-gray-800">
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">{user.name}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                                        {user.role}
                                    </span>
                                </td>
                                <td className="py-4 px-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-right">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Subscription Content Component
function SubscriptionContent() {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2">Pro Plan</h2>
                    <p className="text-purple-200 mb-6">Your current subscription</p>

                    <div className="flex items-baseline gap-2 mb-6">
                        <span className="text-5xl font-bold">$49</span>
                        <span className="text-purple-200">/month</span>
                    </div>

                    <div className="space-y-3 mb-8">
                        {['Unlimited operations', 'Priority support', 'Advanced analytics', 'Custom integrations'].map((feature) => (
                            <div key={feature} className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-lime-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>

                    <button className="w-full bg-white text-purple-700 py-3.5 rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg">
                        Manage Subscription
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-sm text-gray-600 mb-1">Next billing date</div>
                    <div className="text-2xl font-bold text-gray-900">Jan 28, 2026</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-sm text-gray-600 mb-1">Usage this month</div>
                    <div className="text-2xl font-bold text-gray-900">82%</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-sm text-gray-600 mb-1">Team members</div>
                    <div className="text-2xl font-bold text-gray-900">24</div>
                </div>
            </div>
        </div>
    );
}

// Payment Content Component
function PaymentContent() {
    const transactions = [
        { date: 'Dec 1, 2025', amount: 49.00, status: 'Paid', method: '•••• 4242' },
        { date: 'Nov 1, 2025', amount: 49.00, status: 'Paid', method: '•••• 4242' },
        { date: 'Oct 1, 2025', amount: 49.00, status: 'Paid', method: '•••• 4242' },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Methods</h2>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white mb-6">
                    <div className="flex justify-between items-start mb-12">
                        <div className="text-sm opacity-70">Credit Card</div>
                        <div className="text-sm font-semibold">VISA</div>
                    </div>
                    <div className="text-2xl font-mono mb-8 tracking-wider">•••• •••• •••• 4242</div>
                    <div className="flex justify-between">
                        <div>
                            <div className="text-xs opacity-70 mb-1">Card Holder</div>
                            <div className="font-semibold">John Doe</div>
                        </div>
                        <div>
                            <div className="text-xs opacity-70 mb-1">Expires</div>
                            <div className="font-semibold">12/26</div>
                        </div>
                    </div>
                </div>

                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-all">
                    Add Payment Method
                </button>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Transaction History</h2>

                <div className="space-y-4">
                    {transactions.map((transaction, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">{transaction.date}</div>
                                    <div className="text-sm text-gray-500">{transaction.method}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-gray-900">${transaction.amount.toFixed(2)}</div>
                                <div className="text-sm text-green-600">{transaction.status}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Installed Apps Content Component
function InstalledAppsContent() {
    const apps = [
        { name: 'Slack', description: 'Team communication', icon: '💬', connected: true },
        { name: 'Google Drive', description: 'Cloud storage', icon: '📁', connected: true },
        { name: 'Salesforce', description: 'CRM platform', icon: '☁️', connected: false },
        { name: 'GitHub', description: 'Code repository', icon: '🔗', connected: true },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Installed Applications</h2>
                <button className="bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all hover:scale-105 shadow-lg">
                    Browse Apps
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {apps.map((app) => (
                    <div key={app.name} className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-500">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-3xl">
                                    {app.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{app.name}</h3>
                                    <p className="text-sm text-gray-500">{app.description}</p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${app.connected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {app.connected ? 'Connected' : 'Not connected'}
                            </span>
                        </div>

                        <button className={`w-full py-2.5 rounded-xl font-medium transition-all ${app.connected
                                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                : 'bg-gray-900 hover:bg-gray-800 text-white'
                            }`}>
                            {app.connected ? 'Manage' : 'Connect'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Variables Content Component
function VariablesContent() {
    const variables = [
        { name: 'API_KEY', value: '••••••••••••••••', type: 'Secret' },
        { name: 'MAX_RETRIES', value: '3', type: 'Number' },
        { name: 'ENVIRONMENT', value: 'production', type: 'String' },
        { name: 'DEBUG_MODE', value: 'false', type: 'Boolean' },
    ];

    return (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Environment Variables</h2>
                <button className="bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-all hover:scale-105 shadow-lg">
                    Add Variable
                </button>
            </div>

            <div className="space-y-3">
                {variables.map((variable, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <code className="font-mono font-semibold text-gray-900">{variable.name}</code>
                                <span className="px-2 py-0.5 bg-lime-100 text-lime-700 text-xs font-semibold rounded">
                                    {variable.type}
                                </span>
                            </div>
                            <code className="text-sm text-gray-600 font-mono">{variable.value}</code>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                            <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Scenario Properties Content Component
function ScenarioPropertiesContent() {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Scenario Configuration</h2>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Scenario Name</label>
                        <input
                            type="text"
                            defaultValue="Production Workflow"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                        <textarea
                            rows={4}
                            defaultValue="Main automation workflow for processing customer data"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Trigger Type</label>
                            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900">
                                <option>Webhook</option>
                                <option>Schedule</option>
                                <option>Manual</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900">
                                <option>Active</option>
                                <option>Inactive</option>
                                <option>Testing</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button className="flex-1 bg-gray-900 text-white py-3.5 rounded-full font-semibold hover:bg-gray-800 transition-all hover:scale-105 shadow-lg">
                            Save Changes
                        </button>
                        <button className="px-8 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-full font-semibold transition-all">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-sm text-gray-600 mb-1">Total Executions</div>
                    <div className="text-2xl font-bold text-gray-900">1,247</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-sm text-gray-600 mb-1">Success Rate</div>
                    <div className="text-2xl font-bold text-green-600">98.5%</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-sm text-gray-600 mb-1">Avg. Duration</div>
                    <div className="text-2xl font-bold text-gray-900">2.3s</div>
                </div>
            </div>
        </div>
    );
}