import React, { useState, useMemo } from 'react';

export default function UserProjectList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
    },
    {
      id: 6,
      name: 'Marcus Johnson',
      role: 'Backend Developer',
      project: 'API Development',
      teamSize: 4,
      status: 'Active',
      budget: '8.2K',
      avatar: 'https://i.pravatar.cc/150?img=33'
    },
    {
      id: 7,
      name: 'Sofia Martinez',
      role: 'UX Researcher',
      project: 'User Testing',
      teamSize: 2,
      status: 'Pending',
      budget: '5.1K',
      avatar: 'https://i.pravatar.cc/150?img=44'
    },
    {
      id: 8,
      name: 'David Chen',
      role: 'DevOps Engineer',
      project: 'Infrastructure',
      teamSize: 3,
      status: 'Active',
      budget: '15.3K',
      avatar: 'https://i.pravatar.cc/150?img=52'
    },
    {
      id: 9,
      name: 'Emma Wilson',
      role: 'Data Analyst',
      project: 'Analytics Dashboard',
      teamSize: 2,
      status: 'Active',
      budget: '7.8K',
      avatar: 'https://i.pravatar.cc/150?img=47'
    },
    {
      id: 10,
      name: 'James Rodriguez',
      role: 'Mobile Developer',
      project: 'iOS App',
      teamSize: 4,
      status: 'Pending',
      budget: '18.5K',
      avatar: 'https://i.pravatar.cc/150?img=59'
    },
    {
      id: 11,
      name: 'Olivia Brown',
      role: 'Product Designer',
      project: 'Design System',
      teamSize: 3,
      status: 'Active',
      budget: '9.4K',
      avatar: 'https://i.pravatar.cc/150?img=23'
    },
    {
      id: 12,
      name: 'Michael Lee',
      role: 'QA Engineer',
      project: 'Testing Suite',
      teamSize: 2,
      status: 'Cancel',
      budget: '4.2K',
      avatar: 'https://i.pravatar.cc/150?img=61'
    }
  ];

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.project.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const getStatusColor = (status: string) => {
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

  const TeamAvatars = ({ count }: { count: number }) => (
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
            {/* Create Project Button */}
            <button
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
              <span>Nueva Conexión</span>
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
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-4 px-5 py-3 bg-slate-50 border-b border-slate-200 text-xs font-medium text-slate-600">
            <div>Usuario</div>
            <div>Proyecto</div>
            <div>Equipo</div>
            <div>Estado</div>
            <div>Presupuesto</div>
          </div>

          {/* User List */}
          <div className="divide-y divide-slate-100">
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
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
                        <p className="text-slate-500 mb-0.5">Proyecto</p>
                        <p className="text-slate-700 font-medium">{user.project}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 mb-0.5">Equipo</p>
                        <TeamAvatars count={user.teamSize} />
                      </div>
                      <div className="text-right">
                        <p className="text-slate-500 mb-0.5">Presupuesto</p>
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
                <p className="mt-2 text-sm text-slate-500">No se encontraron usuarios.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredUsers.length > 0 && (
            <div className="px-5 py-4 border-t border-slate-200">
              <div className="flex items-center justify-center gap-2">
                {/* Previous button */}
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-slate-200 transition-all font-medium"
                >
                  Previous
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-2">
                  {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                      {page === '...' ? (
                        <span className="px-2 py-2 text-slate-400 text-sm">...</span>
                      ) : (
                        <button
                          onClick={() => setCurrentPage(page as number)}
                          className={`min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium transition-all ${
                            currentPage === page
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                          }`}
                        >
                          {page}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Next button */}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-slate-200 transition-all font-medium"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}