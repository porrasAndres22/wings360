import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function UserTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const users = [
    { id: 1, name: 'Abram Schleifer', position: 'Sales Assistant', office: 'Edinburgh', age: 57, startDate: '25 Apr, 2027', salary: '$89,500', avatar: '👨' },
    { id: 2, name: 'Abram Schleifer', position: 'Sales Assistant', office: 'Edinburgh', age: 57, startDate: '25 Apr, 2027', salary: '$89,500', avatar: '👨' },
    { id: 3, name: 'Abram Schleifer', position: 'Sales Assistant', office: 'Edinburgh', age: 57, startDate: '25 Apr, 2027', salary: '$89,500', avatar: '👨' },
    { id: 4, name: 'Carla George', position: 'Sales Assistant', office: 'London', age: 45, startDate: '11 May, 2027', salary: '$15,500', avatar: '👩' },
    { id: 5, name: 'Carla George', position: 'Sales Assistant', office: 'London', age: 45, startDate: '11 May, 2027', salary: '$15,500', avatar: '👩' },
    { id: 6, name: 'Carla George', position: 'Sales Assistant', office: 'London', age: 45, startDate: '11 May, 2027', salary: '$15,500', avatar: '👩' },
    { id: 7, name: 'Ekstrom Bothman', position: 'Sales Assistant', office: 'San Francisco', age: 53, startDate: '15 Nov, 2027', salary: '$19,200', avatar: '👩' },
    { id: 8, name: 'Ekstrom Bothman', position: 'Sales Assistant', office: 'San Francisco', age: 53, startDate: '15 Nov, 2027', salary: '$19,200', avatar: '👩' },
    { id: 9, name: 'Ekstrom Bothman', position: 'Sales Assistant', office: 'San Francisco', age: 53, startDate: '15 Nov, 2027', salary: '$19,200', avatar: '👩' },
    { id: 10, name: 'Emery Culhane', position: 'Sales Assistant', office: 'New York', age: 45, startDate: '29 Jun, 2027', salary: '$23,500', avatar: '👨' },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.office.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-sm animate__animated animate__backInDown">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show</span>
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-600">entries</span>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">User</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Position</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Office</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Age</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Start date</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Salary</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-lg">
                      {user.avatar}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{user.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">{user.position}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{user.office}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{user.age}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{user.startDate}</td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900">{user.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards - Mobile */}
      <div className="md:hidden space-y-4">
        {currentUsers.map((user) => (
          <div key={user.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xl">
                {user.avatar}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.position}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Office:</span>
                <p className="text-gray-900">{user.office}</p>
              </div>
              <div>
                <span className="text-gray-500">Age:</span>
                <p className="text-gray-900">{user.age}</p>
              </div>
              <div>
                <span className="text-gray-500">Start date:</span>
                <p className="text-gray-900">{user.startDate}</p>
              </div>
              <div>
                <span className="text-gray-500">Salary:</span>
                <p className="text-gray-900 font-medium">{user.salary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
        <span className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} entries
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1.5 rounded-md text-sm ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}