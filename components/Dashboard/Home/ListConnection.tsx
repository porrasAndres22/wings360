'use client';

import React, { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import NewProjectForm from './ListConnection/Newprojectform';

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

const ProjectTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      user: {
        name: 'Lindsey Curtis',
        role: 'Web Designer',
        avatar: '👤',
      },
      project: 'Agency Website',
      team: [
        { id: '1', avatar: '👤' },
        { id: '2', avatar: '👤' },
        { id: '3', avatar: '👤' },
      ],
      status: 'Active',
      budget: '3.9K',
    },
    {
      id: '2',
      user: {
        name: 'Kaiya George',
        role: 'Project Manager',
        avatar: '👤',
      },
      project: 'Technology',
      team: [
        { id: '1', avatar: '👤' },
        { id: '2', avatar: '👤' },
      ],
      status: 'Pending',
      budget: '24.9K',
    },
    {
      id: '3',
      user: {
        name: 'Zain Geidt',
        role: 'Content Writer',
        avatar: '👤',
      },
      project: 'Blog Writing',
      team: [{ id: '1', avatar: '👤' }],
      status: 'Active',
      budget: '12.7K',
    },
    {
      id: '4',
      user: {
        name: 'Abram Schleifer',
        role: 'Digital Marketer',
        avatar: '👤',
      },
      project: 'Social Media',
      team: [
        { id: '1', avatar: '👤' },
        { id: '2', avatar: '👤' },
        { id: '3', avatar: '👤' },
      ],
      status: 'Cancel',
      budget: '2.8K',
    },
    {
      id: '5',
      user: {
        name: 'Carla George',
        role: 'Front-end Developer',
        avatar: '👤',
      },
      project: 'Website',
      team: [
        { id: '1', avatar: '👤' },
        { id: '2', avatar: '👤' },
        { id: '3', avatar: '👤' },
      ],
      status: 'Active',
      budget: '4.5K',
    },
    {
      id: '6',
      user: {
        name: 'Marcus Rivera',
        role: 'UX Designer',
        avatar: '👤',
      },
      project: 'Mobile App',
      team: [
        { id: '1', avatar: '👤' },
        { id: '2', avatar: '👤' },
      ],
      status: 'Active',
      budget: '18.2K',
    },
    {
      id: '7',
      user: {
        name: 'Sofia Chen',
        role: 'Backend Developer',
        avatar: '👤',
      },
      project: 'API Development',
      team: [
        { id: '1', avatar: '👤' },
        { id: '2', avatar: '👤' },
        { id: '3', avatar: '👤' },
      ],
      status: 'Pending',
      budget: '32.5K',
    },
    {
      id: '8',
      user: {
        name: 'James Wilson',
        role: 'DevOps Engineer',
        avatar: '👤',
      },
      project: 'Cloud Migration',
      team: [
        { id: '1', avatar: '👤' },
      ],
      status: 'Active',
      budget: '45.0K',
    },
    {
      id: '9',
      user: {
        name: 'Emma Thompson',
        role: 'Product Manager',
        avatar: '👤',
      },
      project: 'E-commerce Platform',
      team: [
        { id: '1', avatar: '👤' },
        { id: '2', avatar: '👤' },
        { id: '3', avatar: '👤' },
      ],
      status: 'Active',
      budget: '67.8K',
    },
    {
      id: '10',
      user: {
        name: 'Oliver Martinez',
        role: 'SEO Specialist',
        avatar: '👤',
      },
      project: 'SEO Optimization',
      team: [
        { id: '1', avatar: '👤' },
        { id: '2', avatar: '👤' },
      ],
      status: 'Cancel',
      budget: '5.3K',
    },
    {
      id: '11',
      user: {
        name: 'Isabella Garcia',
        role: 'Graphic Designer',
        avatar: '👤',
      },
      project: 'Brand Identity',
      team: [
        { id: '1', avatar: '👤' },
        { id: '2', avatar: '👤' },
      ],
      status: 'Pending',
      budget: '8.9K',
    },
    {
      id: '12',
      user: {
        name: 'Noah Anderson',
        role: 'Data Analyst',
        avatar: '👤',
      },
      project: 'Analytics Dashboard',
      team: [
        { id: '1', avatar: '👤' },
        { id: '2', avatar: '👤' },
        { id: '3', avatar: '👤' },
      ],
      status: 'Active',
      budget: '28.4K',
    },
  ]);
  
  const itemsPerPage = 5;

  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    
    const query = searchQuery.toLowerCase();
    return projects.filter(
      (project) =>
        project.user.name.toLowerCase().includes(query) ||
        project.user.role.toLowerCase().includes(query) ||
        project.project.toLowerCase().includes(query) ||
        project.status.toLowerCase().includes(query)
    );
  }, [searchQuery, projects]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset to page 1 when search query changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
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

  const handleNewProject = (newProject: Project) => {
    setProjects([...projects, newProject]);
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

  // If form is shown, render only the form
  if (showNewProjectForm) {
    return (
      <NewProjectForm
        onClose={() => setShowNewProjectForm(false)}
        onSubmit={handleNewProject}
      />
    );
  }

  // Otherwise, render the table
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <button 
            onClick={() => setShowNewProjectForm(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105"
          >
            <Plus size={20} />
            Nueva Conexión
          </button>

          <div className="relative w-full sm:w-auto sm:min-w-[300px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Usuario
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Proyecto
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Equipo
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Estado
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">
                    Presupuesto
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentProjects.map((project, index) => (
                  <tr
                    key={project.id}
                    className="hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-indigo-50/50 transition-all duration-200"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white font-medium shadow-md">
                          {project.user.avatar}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {project.user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {project.user.role}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-700 font-medium">
                        {project.project}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex -space-x-2">
                        {project.team.map((member, idx) => (
                          <div
                            key={member.id}
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 border-2 border-white flex items-center justify-center text-white text-xs shadow-md hover:scale-110 transition-transform duration-200"
                            style={{ zIndex: project.team.length - idx }}
                          >
                            {member.avatar}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-900 font-semibold">
                        {project.budget}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile & Tablet Cards */}
          <div className="lg:hidden divide-y divide-gray-100">
            {currentProjects.map((project, index) => (
              <div
                key={project.id}
                className="p-4 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-indigo-50/50 transition-all duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* User Info */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white font-medium shadow-md">
                    {project.user.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {project.user.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {project.user.role}
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-100">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Proyecto</div>
                    <div className="text-sm font-medium text-gray-700">
                      {project.project}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      Presupuesto
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      {project.budget}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs text-gray-500 mb-2">Equipo</div>
                    <div className="flex -space-x-2">
                      {project.team.map((member, idx) => (
                        <div
                          key={member.id}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 border-2 border-white flex items-center justify-center text-white text-xs shadow-md"
                          style={{ zIndex: project.team.length - idx }}
                        >
                          {member.avatar}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          {/* Results info */}
          <div className="text-sm text-gray-600">
            Mostrando{' '}
            <span className="font-medium text-gray-900">
              {startIndex + 1}
            </span>{' '}
            a{' '}
            <span className="font-medium text-gray-900">
              {Math.min(endIndex, filteredProjects.length)}
            </span>{' '}
            de{' '}
            <span className="font-medium text-gray-900">
              {filteredProjects.length}
            </span>{' '}
            resultados
          </div>

          {/* Pagination controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Previous
            </button>

            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                  {page === '...' ? (
                    <span className="px-3 py-2 text-gray-500">...</span>
                  ) : (
                    <button
                      onClick={() => handlePageChange(page as number)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        currentPage === page
                          ? 'bg-blue-600 text-white shadow-md hover:shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTable;