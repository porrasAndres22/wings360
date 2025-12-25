'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, Trash2, ArrowLeft, UserPlus } from 'lucide-react';

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    initials: string;
    color: string;
  };
  product: string;
  dealValue: string;
  closeDate: string;
  status: 'Complete' | 'Pending';
}

const mockOrders: Order[] = [
  {
    id: 'DE124321',
    customer: {
      name: 'John Doe',
      email: 'johndeo@gmail.com',
      initials: 'JD',
      color: 'bg-blue-100 text-blue-600'
    },
    product: 'Software License',
    dealValue: '$18,50.34',
    closeDate: '2024-06-15',
    status: 'Complete'
  },
  {
    id: 'DE124321',
    customer: {
      name: 'Kierra Franci',
      email: 'kierra@gmail.com',
      initials: 'KF',
      color: 'bg-pink-100 text-pink-600'
    },
    product: 'Software License',
    dealValue: '$18,50.34',
    closeDate: '2024-06-15',
    status: 'Complete'
  },
  {
    id: 'DE124321',
    customer: {
      name: 'Emerson Workman',
      email: 'emerson@gmail.com',
      initials: 'EW',
      color: 'bg-cyan-100 text-cyan-600'
    },
    product: 'Software License',
    dealValue: '$18,50.34',
    closeDate: '2024-06-15',
    status: 'Pending'
  },
  {
    id: 'DE124321',
    customer: {
      name: 'Chance Philips',
      email: 'chance@gmail.com',
      initials: 'CP',
      color: 'bg-orange-100 text-orange-600'
    },
    product: 'Software License',
    dealValue: '$18,50.34',
    closeDate: '2024-06-15',
    status: 'Complete'
  },
  {
    id: 'DE124321',
    customer: {
      name: 'Terry Geidt',
      email: 'terry@gmail.com',
      initials: 'TG',
      color: 'bg-green-100 text-green-600'
    },
    product: 'Software License',
    dealValue: '$18,50.34',
    closeDate: '2024-06-15',
    status: 'Complete'
  }
];

export default function RecentOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOrders(mockOrders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  return (
    <div className="w-full rounded-lg animate__animated animate__fadeIn">
      <div className="border-b border-gray-200">
        <div className="flex items-center gap-2">
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
      </div>
      {/* Back Button and Add User */}

      {/* Table - Desktop View */}
      <div className="bg-white hidden mt-4 lg:block overflow-x-auto rounded-lg">
        <div className="flex flex-col pl-5 sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Recent Orders</h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-3">

            {/* Filter Button */}
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mr-4">
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Filter</span>
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-12 px-6 py-3">
                <input
                  type="checkbox"
                  checked={selectedOrders.length === mockOrders.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deal ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product/Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deal Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Close Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockOrders.map((order, index) => (
              <tr key={`${order.id}-${index}`} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => handleSelectOrder(order.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${order.customer.color} flex items-center justify-center font-medium text-sm`}>
                      {order.customer.initials}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                      <div className="text-sm text-gray-500">{order.customer.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.product}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.dealValue}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.closeDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${order.status === 'Complete'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                    }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards - Mobile/Tablet View */}
      <div className="lg:hidden divide-y divide-gray-200">
        {mockOrders.map((order, index) => (
          <div key={`${order.id}-${index}`} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={selectedOrders.includes(order.id)}
                  onChange={() => handleSelectOrder(order.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                />
                <div className={`w-10 h-10 rounded-full ${order.customer.color} flex items-center justify-center font-medium text-sm flex-shrink-0`}>
                  {order.customer.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                  <div className="text-sm text-gray-500 truncate">{order.customer.email}</div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-red-600 transition-colors ml-2">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="ml-14 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Deal ID:</span>
                <span className="font-medium text-gray-900">{order.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Product:</span>
                <span className="text-gray-900">{order.product}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Value:</span>
                <span className="font-medium text-gray-900">{order.dealValue}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Close Date:</span>
                <span className="text-gray-900">{order.closeDate}</span>
              </div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-500">Status:</span>
                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${order.status === 'Complete'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
                  }`}>
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}