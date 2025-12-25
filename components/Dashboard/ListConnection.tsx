import React, { useState } from 'react';

export default function UserProjectList() {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    {
      id: 1,
      name: 'Lindsey Curtis',
      role: 'Web Designer',
      project: 'Agency Website',
      teamSize: 3,
      status: 'Active',
      budget: '3.9K',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: 2,
      name: 'Kaiya George',
      role: 'Project Manager',
      project: 'Technology',
      teamSize: 2,
      status: 'Pending',
      budget: '24.9K',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    {
      id: 3,
      name: 'Zain Geidt',
      role: 'Content Writer',
      project: 'Blog Writing',
      teamSize: 1,
      status: 'Active',
      budget: '12.7K',
      avatar: 'https://i.pravatar.cc/150?img=9'
    },
    {
      id: 4,
      name: 'Abram Schleifer',
      role: 'Digital Marketer',
      project: 'Social Media',
      teamSize: 3,
      status: 'Cancel',
      budget: '2.8K',
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    {
      id: 5,
      name: 'Carla George',
      role: 'Front-end Developer',
      project: 'Website',
      teamSize: 3,
      status: 'Active',
      budget: '4.5K',
      avatar: 'https://i.pravatar.cc/150?img=20'
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: any) => {
    switch (status) {
      case 'Active':
        return 'text-emerald-600 bg-emerald-50';
      case 'Pending':
        return 'text-amber-600 bg-amber-50';
      case 'Cancel':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const TeamAvatars = ({ count }: any) => (
    <div className="flex -space-x-1.5">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white"
        >
          <img
            src={`https://i.pravatar.cc/24?img=${i + 30}`}
            alt="Team member"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen from-slate-50 to-slate-100 animate__animated animate__fadeIn">
      <div className="max-w-6xl mx-auto">
        {/* Top Bar with Search and Add Button */}
        <div className="mb-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {/* Back to Button */}
            <button
              onClick={() => window.history.back()}
              className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 font-medium text-sm border border-gray-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Regresar</span>
            </button>

            {/* Create Project Button */}
            <button
              onClick={() => window.history.back()}
              className="cursor-pointer flex items-center justify-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 font-medium text-sm group"
            >
              <svg
                className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Nuevo Esquema</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative sm:max-w-xs w-full sm:w-auto">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-4 px-5 py-3 bg-slate-50 border-b border-slate-200 text-xs font-medium text-slate-600">
            <div>User</div>
            <div>Project Name</div>
            <div>Team</div>
            <div>Status</div>
            <div>Budget</div>
          </div>

          {/* User List */}
          <div className="divide-y divide-slate-100">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="px-4 sm:px-5 py-3.5 hover:bg-slate-50 transition-colors duration-150"
                >
                  {/* Desktop Layout */}
                  <div className="hidden lg:grid lg:grid-cols-5 gap-4 items-center">
                    {/* User Info */}
                    <div className="flex items-center gap-2.5">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
                      />
                      <div>
                        <h3 className="font-semibold text-slate-900 text-sm">{user.name}</h3>
                        <p className="text-xs text-slate-500">{user.role}</p>
                      </div>
                    </div>

                    {/* Project Name */}
                    <div className="text-slate-700 text-sm">{user.project}</div>

                    {/* Team */}
                    <div>
                      <TeamAvatars count={user.teamSize} />
                    </div>

                    {/* Status */}
                    <div>
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </div>

                    {/* Budget */}
                    <div className="text-slate-900 font-semibold text-sm">{user.budget}</div>
                  </div>

                  {/* Mobile/Tablet Layout */}
                  <div className="lg:hidden space-y-3">
                    {/* User Info */}
                    <div className="flex items-center gap-2.5">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 text-sm">{user.name}</h3>
                        <p className="text-xs text-slate-500">{user.role}</p>
                      </div>
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </div>

                    {/* Project & Team */}
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <p className="text-slate-500 mb-0.5">Project</p>
                        <p className="text-slate-700 font-medium">{user.project}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 mb-0.5">Team</p>
                        <TeamAvatars count={user.teamSize} />
                      </div>
                      <div className="text-right">
                        <p className="text-slate-500 mb-0.5">Budget</p>
                        <p className="text-slate-900 font-semibold">{user.budget}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-5 py-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <p className="mt-2 text-sm text-slate-500">No users found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}