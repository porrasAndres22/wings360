import React, { useState, useEffect } from 'react';
import { Search, Calendar, Grid3x3, List, Mail, MapPin, MoreVertical, UserPlus, MessageSquare, History } from 'lucide-react';
import UserDetail from './UserList/UserDetail'

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  profileImage: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  location: string;
}

interface ProductivityData {
  day: string;
  research: number;
  design: number;
}

interface Project {
  title: string;
  date: string;
  tags: string[];
  comments: number;
  files: number;
  avatars: string[];
}

const UserDashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<'card' | 'list'>('list');
  const [selectedDate, setSelectedDate] = useState('Monday, 6th March');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'detail'>('dashboard');
  const [isPageAnimating, setIsPageAnimating] = useState(false);
  const usersPerPage = 5;

  const users: User[] = [
    {
      id: '1',
      name: 'Samanta Johnson',
      email: 'samanta.j@company.com',
      avatar: '👩🏻‍💼',
      profileImage: 'https://randomuser.me/api/portraits/women/1.jpg',
      role: 'Product Manager',
      department: 'Product',
      status: 'active',
      joinDate: '6 Mon',
      location: 'New York, USA'
    },
    {
      id: '2',
      name: 'Bob Peterson',
      email: 'bob.p@company.com',
      avatar: '👨🏻‍💻',
      profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
      role: 'Senior Developer',
      department: 'Engineering',
      status: 'active',
      joinDate: '7 Tue',
      location: 'San Francisco, USA'
    },
    {
      id: '3',
      name: 'Kate O\'Brien',
      email: 'kate.o@company.com',
      avatar: '👩🏽‍🎨',
      profileImage: 'https://randomuser.me/api/portraits/women/3.jpg',
      role: 'UX Designer',
      department: 'Design',
      status: 'active',
      joinDate: '10 Fri',
      location: 'London, UK'
    },
    {
      id: '4',
      name: 'Jack Foster',
      email: 'jack.f@company.com',
      avatar: '👨🏼‍💼',
      profileImage: 'https://randomuser.me/api/portraits/men/4.jpg',
      role: 'Sales Director',
      department: 'Sales',
      status: 'pending',
      joinDate: '19 Sun',
      location: 'Austin, USA'
    },
    {
      id: '5',
      name: 'Maria Garcia',
      email: 'maria.g@company.com',
      avatar: '👩🏻‍🔬',
      profileImage: 'https://randomuser.me/api/portraits/women/5.jpg',
      role: 'Data Analyst',
      department: 'Analytics',
      status: 'active',
      joinDate: '15 Wed',
      location: 'Barcelona, Spain'
    },
    {
      id: '6',
      name: 'David Chen',
      email: 'david.c@company.com',
      avatar: '👨🏻‍💼',
      profileImage: 'https://randomuser.me/api/portraits/men/6.jpg',
      role: 'Marketing Manager',
      department: 'Marketing',
      status: 'inactive',
      joinDate: '22 Mon',
      location: 'Singapore'
    },
    {
      id: '7',
      name: 'Sarah Williams',
      email: 'sarah.w@company.com',
      avatar: '👩🏼‍💻',
      profileImage: 'https://randomuser.me/api/portraits/women/7.jpg',
      role: 'Frontend Developer',
      department: 'Engineering',
      status: 'active',
      joinDate: '2 Thu',
      location: 'Toronto, Canada'
    },
    {
      id: '8',
      name: 'Michael Brown',
      email: 'michael.b@company.com',
      avatar: '👨🏽‍💼',
      profileImage: 'https://randomuser.me/api/portraits/men/8.jpg',
      role: 'HR Manager',
      department: 'Human Resources',
      status: 'active',
      joinDate: '8 Tue',
      location: 'Chicago, USA'
    },
    {
      id: '9',
      name: 'Emily Davis',
      email: 'emily.d@company.com',
      avatar: '👩🏻‍🎨',
      profileImage: 'https://randomuser.me/api/portraits/women/9.jpg',
      role: 'Graphic Designer',
      department: 'Design',
      status: 'pending',
      joinDate: '12 Sat',
      location: 'Los Angeles, USA'
    },
    {
      id: '10',
      name: 'James Wilson',
      email: 'james.w@company.com',
      avatar: '👨🏻‍🔧',
      profileImage: 'https://randomuser.me/api/portraits/men/10.jpg',
      role: 'DevOps Engineer',
      department: 'Engineering',
      status: 'active',
      joinDate: '5 Mon',
      location: 'Seattle, USA'
    },
    {
      id: '11',
      name: 'Sophie Martin',
      email: 'sophie.m@company.com',
      avatar: '👩🏼‍💼',
      profileImage: 'https://randomuser.me/api/portraits/women/11.jpg',
      role: 'Business Analyst',
      department: 'Analytics',
      status: 'active',
      joinDate: '18 Fri',
      location: 'Paris, France'
    },
    {
      id: '12',
      name: 'Alex Rodriguez',
      email: 'alex.r@company.com',
      avatar: '👨🏽‍💻',
      profileImage: 'https://randomuser.me/api/portraits/men/12.jpg',
      role: 'Backend Developer',
      department: 'Engineering',
      status: 'inactive',
      joinDate: '25 Wed',
      location: 'Mexico City, Mexico'
    },
    {
      id: '13',
      name: 'Lisa Anderson',
      email: 'lisa.a@company.com',
      avatar: '👩🏻‍💼',
      profileImage: 'https://randomuser.me/api/portraits/women/13.jpg',
      role: 'Customer Success',
      department: 'Support',
      status: 'active',
      joinDate: '3 Fri',
      location: 'Boston, USA'
    },
    {
      id: '14',
      name: 'Tom Jackson',
      email: 'tom.j@company.com',
      avatar: '👨🏼‍💻',
      profileImage: 'https://randomuser.me/api/portraits/men/14.jpg',
      role: 'Mobile Developer',
      department: 'Engineering',
      status: 'pending',
      joinDate: '14 Sun',
      location: 'Berlin, Germany'
    },
    {
      id: '15',
      name: 'Nina Patel',
      email: 'nina.p@company.com',
      avatar: '👩🏽‍🔬',
      profileImage: 'https://randomuser.me/api/portraits/women/15.jpg',
      role: 'QA Engineer',
      department: 'Quality',
      status: 'active',
      joinDate: '9 Thu',
      location: 'Mumbai, India'
    },
    {
      id: '16',
      name: 'Chris Lee',
      email: 'chris.l@company.com',
      avatar: '👨🏻‍💼',
      profileImage: 'https://randomuser.me/api/portraits/men/16.jpg',
      role: 'Account Manager',
      department: 'Sales',
      status: 'active',
      joinDate: '20 Tue',
      location: 'Sydney, Australia'
    },
    {
      id: '17',
      name: 'Anna Kim',
      email: 'anna.k@company.com',
      avatar: '👩🏻‍🎨',
      profileImage: 'https://randomuser.me/api/portraits/women/17.jpg',
      role: 'UI Designer',
      department: 'Design',
      status: 'active',
      joinDate: '11 Wed',
      location: 'Seoul, South Korea'
    },
    {
      id: '18',
      name: 'Robert Taylor',
      email: 'robert.t@company.com',
      avatar: '👨🏼‍💼',
      profileImage: 'https://randomuser.me/api/portraits/men/18.jpg',
      role: 'Finance Director',
      department: 'Finance',
      status: 'active',
      joinDate: '1 Mon',
      location: 'New York, USA'
    },
    {
      id: '19',
      name: 'Rachel Green',
      email: 'rachel.g@company.com',
      avatar: '👩🏼‍💼',
      profileImage: 'https://randomuser.me/api/portraits/women/19.jpg',
      role: 'Operations Manager',
      department: 'Operations',
      status: 'active',
      joinDate: '4 Sat',
      location: 'Miami, USA'
    },
    {
      id: '20',
      name: 'Daniel Park',
      email: 'daniel.p@company.com',
      avatar: '👨🏻‍💻',
      profileImage: 'https://randomuser.me/api/portraits/men/20.jpg',
      role: 'Full Stack Developer',
      department: 'Engineering',
      status: 'active',
      joinDate: '16 Mon',
      location: 'Vancouver, Canada'
    },
    {
      id: '21',
      name: 'Olivia Martinez',
      email: 'olivia.m@company.com',
      avatar: '👩🏽‍🎨',
      profileImage: 'https://randomuser.me/api/portraits/women/21.jpg',
      role: 'Brand Designer',
      department: 'Design',
      status: 'pending',
      joinDate: '21 Thu',
      location: 'Madrid, Spain'
    },
    {
      id: '22',
      name: 'Marcus Thompson',
      email: 'marcus.t@company.com',
      avatar: '👨🏿‍💼',
      profileImage: 'https://randomuser.me/api/portraits/men/22.jpg',
      role: 'VP of Sales',
      department: 'Sales',
      status: 'active',
      joinDate: '13 Fri',
      location: 'Atlanta, USA'
    },
    {
      id: '23',
      name: 'Yuki Tanaka',
      email: 'yuki.t@company.com',
      avatar: '👩🏻‍💻',
      profileImage: 'https://randomuser.me/api/portraits/women/23.jpg',
      role: 'Software Engineer',
      department: 'Engineering',
      status: 'active',
      joinDate: '7 Wed',
      location: 'Tokyo, Japan'
    },
    {
      id: '24',
      name: 'Isabella Silva',
      email: 'isabella.s@company.com',
      avatar: '👩🏽‍💼',
      profileImage: 'https://randomuser.me/api/portraits/women/24.jpg',
      role: 'Content Strategist',
      department: 'Marketing',
      status: 'active',
      joinDate: '17 Tue',
      location: 'São Paulo, Brazil'
    },
    {
      id: '25',
      name: 'Kevin O\'Connor',
      email: 'kevin.o@company.com',
      avatar: '👨🏻‍🔧',
      profileImage: 'https://randomuser.me/api/portraits/men/25.jpg',
      role: 'Site Reliability Engineer',
      department: 'Engineering',
      status: 'inactive',
      joinDate: '23 Sun',
      location: 'Dublin, Ireland'
    },
    {
      id: '26',
      name: 'Priya Sharma',
      email: 'priya.s@company.com',
      avatar: '👩🏽‍🔬',
      profileImage: 'https://randomuser.me/api/portraits/women/26.jpg',
      role: 'Data Scientist',
      department: 'Analytics',
      status: 'active',
      joinDate: '10 Thu',
      location: 'Bangalore, India'
    },
    {
      id: '27',
      name: 'Lucas Müller',
      email: 'lucas.m@company.com',
      avatar: '👨🏼‍💻',
      profileImage: 'https://randomuser.me/api/portraits/men/27.jpg',
      role: 'Cloud Architect',
      department: 'Engineering',
      status: 'active',
      joinDate: '5 Sat',
      location: 'Munich, Germany'
    },
    {
      id: '28',
      name: 'Zara Ahmed',
      email: 'zara.a@company.com',
      avatar: '👩🏽‍💼',
      profileImage: 'https://randomuser.me/api/portraits/women/28.jpg',
      role: 'Product Owner',
      department: 'Product',
      status: 'active',
      joinDate: '19 Mon',
      location: 'Dubai, UAE'
    },
    {
      id: '29',
      name: 'Connor Walsh',
      email: 'connor.w@company.com',
      avatar: '👨🏻‍💼',
      profileImage: 'https://randomuser.me/api/portraits/men/29.jpg',
      role: 'Business Development',
      department: 'Sales',
      status: 'pending',
      joinDate: '24 Wed',
      location: 'Edinburgh, Scotland'
    },
    {
      id: '30',
      name: 'Mei Zhang',
      email: 'mei.z@company.com',
      avatar: '👩🏻‍🎨',
      profileImage: 'https://randomuser.me/api/portraits/women/30.jpg',
      role: 'Motion Designer',
      department: 'Design',
      status: 'active',
      joinDate: '8 Fri',
      location: 'Shanghai, China'
    },
    {
      id: '31',
      name: 'Hugo Dupont',
      email: 'hugo.d@company.com',
      avatar: '👨🏼‍💼',
      profileImage: 'https://randomuser.me/api/portraits/men/31.jpg',
      role: 'Compliance Officer',
      department: 'Legal',
      status: 'active',
      joinDate: '14 Tue',
      location: 'Brussels, Belgium'
    },
    {
      id: '32',
      name: 'Aisha Hassan',
      email: 'aisha.h@company.com',
      avatar: '👩🏿‍💻',
      profileImage: 'https://randomuser.me/api/portraits/women/32.jpg',
      role: 'Security Engineer',
      department: 'Security',
      status: 'active',
      joinDate: '11 Mon',
      location: 'Nairobi, Kenya'
    },
    {
      id: '33',
      name: 'Oscar Lindberg',
      email: 'oscar.l@company.com',
      avatar: '👨🏼‍💻',
      profileImage: 'https://randomuser.me/api/portraits/men/33.jpg',
      role: 'Systems Administrator',
      department: 'IT',
      status: 'inactive',
      joinDate: '26 Thu',
      location: 'Stockholm, Sweden'
    },
    {
      id: '34',
      name: 'Carmen Rodriguez',
      email: 'carmen.r@company.com',
      avatar: '👩🏽‍💼',
      profileImage: 'https://randomuser.me/api/portraits/women/34.jpg',
      role: 'Training Coordinator',
      department: 'Human Resources',
      status: 'active',
      joinDate: '6 Sun',
      location: 'Buenos Aires, Argentina'
    },
    {
      id: '35',
      name: 'Finn Nielsen',
      email: 'finn.n@company.com',
      avatar: '👨🏼‍🔧',
      profileImage: 'https://randomuser.me/api/portraits/men/35.jpg',
      role: 'Infrastructure Engineer',
      department: 'Engineering',
      status: 'active',
      joinDate: '15 Sat',
      location: 'Copenhagen, Denmark'
    },
    {
      id: '36',
      name: 'Layla Osman',
      email: 'layla.o@company.com',
      avatar: '👩🏽‍🎨',
      profileImage: 'https://randomuser.me/api/portraits/women/36.jpg',
      role: 'UX Researcher',
      department: 'Design',
      status: 'pending',
      joinDate: '20 Fri',
      location: 'Amsterdam, Netherlands'
    },
    {
      id: '37',
      name: 'Ryan Cooper',
      email: 'ryan.c@company.com',
      avatar: '👨🏻‍💼',
      profileImage: 'https://randomuser.me/api/portraits/men/37.jpg',
      role: 'Strategic Partnerships',
      department: 'Business',
      status: 'active',
      joinDate: '9 Tue',
      location: 'Los Angeles, USA'
    },
    {
      id: '38',
      name: 'Fatima Al-Rashid',
      email: 'fatima.a@company.com',
      avatar: '👩🏽‍💻',
      profileImage: 'https://randomuser.me/api/portraits/women/38.jpg',
      role: 'Machine Learning Engineer',
      department: 'AI',
      status: 'active',
      joinDate: '12 Wed',
      location: 'Riyadh, Saudi Arabia'
    }
  ];

  // Filter users based on search term
  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower) ||
      user.department.toLowerCase().includes(searchLower) ||
      user.location.toLowerCase().includes(searchLower)
    );
  });

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Handle page changes with animation
  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return;
    setIsPageAnimating(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsPageAnimating(false);
    }, 300);
  };

  const handlePreviousPage = () => {
    const newPage = Math.max(currentPage - 1, 1);
    handlePageChange(newPage);
  };

  const handleNextPage = () => {
    const newPage = Math.min(currentPage + 1, totalPages);
    handlePageChange(newPage);
  };

  const productivityData: ProductivityData[] = [
    { day: 'Mon', research: 1.5, design: 1 },
    { day: 'Tue', research: 2, design: 1.5 },
    { day: 'Wed', research: 3.5, design: 2.5 },
    { day: 'Thu', research: 3.8, design: 3 },
    { day: 'Fri', research: 3.2, design: 2.8 },
    { day: 'Sat', research: 2.5, design: 2 },
    { day: 'Sun', research: 3, design: 2.2 }
  ];

  const projects: Project[] = [
    {
      title: 'Improve cards readability',
      date: '21.03.22',
      tags: ['Feedback', 'Bug', 'Design System'],
      comments: 12,
      files: 0,
      avatars: ['👨🏻‍💼', '👩🏽‍🎨', '👨🏼‍💻', '👩🏻‍💼']
    },
    {
      title: 'Mobile App Redesign',
      date: '15.04.22',
      tags: ['Design', 'UX'],
      comments: 24,
      files: 8,
      avatars: ['👩🏻‍🎨', '👨🏽‍💻', '👩🏼‍💼']
    },
    {
      title: 'API Performance Optimization',
      date: '10.05.22',
      tags: ['Backend', 'Bug'],
      comments: 18,
      files: 5,
      avatars: ['👨🏻‍💻', '👨🏼‍💻', '👩🏽‍🔬', '👨🏻‍🔧']
    },
    {
      title: 'Dark Mode Implementation',
      date: '28.05.22',
      tags: ['Feature', 'Design System'],
      comments: 31,
      files: 12,
      avatars: ['👩🏼‍🎨', '👨🏻‍💻', '👩🏻‍💼']
    },
    {
      title: 'Customer Dashboard Analytics',
      date: '05.06.22',
      tags: ['Feature', 'Analytics'],
      comments: 15,
      files: 6,
      avatars: ['👩🏻‍🔬', '👨🏽‍💼', '👩🏽‍💻']
    },
    {
      title: 'Security Audit Fixes',
      date: '12.06.22',
      tags: ['Security', 'Bug'],
      comments: 9,
      files: 3,
      avatars: ['👨🏻‍💻', '👨🏼‍🔧', '👩🏻‍💼', '👨🏽‍💼']
    }
  ];

  const [currentProjectIndex, setCurrentProjectIndex] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const currentProject = projects[currentProjectIndex];

  const handleNextProject = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrevProject = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
      setIsAnimating(false);
    }, 300);
  };

  const activeUsers = filteredUsers.filter(u => u.status === 'active').length;
  const pendingUsers = filteredUsers.filter(u => u.status === 'pending').length;
  const inactiveUsers = filteredUsers.filter(u => u.status === 'inactive').length;

  const getStatusBadge = (status: User['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Active
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Pending
          </span>
        );
      case 'inactive':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            Inactive
          </span>
        );
    }
  };

  // Handle menu actions
  const handleViewMore = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setCurrentView('detail');
    }
    setOpenMenuId(null);
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setCurrentView('detail');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedUser(null);
  };

  const handleDelete = (userId: string) => {
    console.log('Delete:', userId);
    setOpenMenuId(null);
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este usuario?');
    if (confirmDelete) {
      // Aquí implementarías la lógica de eliminación
      alert(`Usuario ${userId} eliminado`);
    }
  };

  const handleSuspend = (userId: string) => {
    console.log('Suspend:', userId);
    setOpenMenuId(null);
    const confirmSuspend = window.confirm('¿Estás seguro de que quieres suspender este usuario?');
    if (confirmSuspend) {
      // Aquí implementarías la lógica de suspensión
      alert(`Usuario ${userId} suspendido`);
    }
  };

  const toggleMenu = (userId: string) => {
    setOpenMenuId(openMenuId === userId ? null : userId);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    if (openMenuId) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openMenuId]);

  // Render UserDetail if a user is selected
  if (currentView === 'detail' && selectedUser) {
    return <UserDetail selectedUser={selectedUser} handleBackToDashboard={handleBackToDashboard} getStatusBadge={getStatusBadge}></UserDetail>
  }

  // Render Dashboard
  return (
    <div className="min-h-screen  from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8 font-['Instrument_Sans',sans-serif]">
      <div className="max-w-7xl mx-auto space-y-6 animate__animated animate__fadeIn">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 p-6 border border-slate-200/60">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Back Button - Circular */}
              <button
                onClick={() => window.history.back()}
                className="cursor-pointer w-12 h-12 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full transition-all group"
                aria-label="Go back"
              >
                <svg
                  className="w-5 h-5 text-slate-600 group-hover:text-slate-900 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Search Bar */}
              <div className="relative flex-1 w-full md:max-w-xs">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-slate-50 rounded-2xl text-slate-700 placeholder:text-slate-400 border border-slate-200/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
                    aria-label="Clear search"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-all shadow-lg shadow-blue-600/30 font-medium">
                <UserPlus className="w-4 h-4" />
                <span className="text-sm">Add User</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-3 bg-slate-50 rounded-2xl text-slate-700 hover:bg-slate-100 transition-all border border-slate-200/60">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">{selectedDate}</span>
              </button>

              <div className="flex bg-slate-900 rounded-2xl p-1.5">
                <button
                  onClick={() => setViewMode('card')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${viewMode === 'card'
                      ? 'bg-white text-slate-900 shadow-lg'
                      : 'text-white/70 hover:text-white'
                    }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Card</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${viewMode === 'list'
                      ? 'bg-white text-slate-900 shadow-lg'
                      : 'text-white/70 hover:text-white'
                    }`}
                >
                  <List className="w-4 h-4" />
                  <span className="hidden sm:inline">List</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-8 border border-slate-200/60 relative">
          {/* User Statistics - Top */}
          <div className="flex gap-6 lg:gap-8 mb-6 justify-center lg:justify-start">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald-600">{activeUsers}</div>
              <div className="text-xs text-slate-500 mt-1">Active</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-600">{pendingUsers}</div>
              <div className="text-xs text-slate-500 mt-1">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-slate-400">{inactiveUsers}</div>
              <div className="text-xs text-slate-500 mt-1">Inactive</div>
            </div>
          </div>

          <div className="flex flex-col items-start mb-8 gap-4">
            <div className="w-full lg:w-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Team Members</h2>
              <p className="text-slate-500 mt-2 text-sm">
                {searchTerm ? (
                  <>
                    <span className="font-semibold text-slate-700">{filteredUsers.length} of {users.length} users</span> match your search
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-slate-700">{users.length} total users</span>, manage your team
                  </>
                )}
              </p>
            </div>

            {/* Pagination - Centered (Mobile) / Top Right (Desktop) */}
            {filteredUsers.length > 0 && totalPages > 1 && (
              <div className="flex items-center gap-2 w-full justify-center lg:w-auto lg:absolute lg:top-6 lg:right-6 md:top-8 md:right-8">
                {/* Previous Button */}
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="cursor-pointer px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="hidden sm:flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => {
                    // Show first page, last page, current page, and pages around current
                    const showPage =
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);

                    const showEllipsis =
                      (pageNum === 2 && currentPage > 3) ||
                      (pageNum === totalPages - 1 && currentPage < totalPages - 2);

                    if (showEllipsis) {
                      return (
                        <span key={pageNum} className="px-2 text-slate-400">
                          ...
                        </span>
                      );
                    }

                    if (!showPage) return null;

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`cursor-pointer w-10 h-10 rounded-xl font-medium transition-all ${currentPage === pageNum
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                            : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {/* Mobile: Current Page Display */}
                <div className="sm:hidden px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-medium">
                  {currentPage} / {totalPages}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="cursor-pointer px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Table Header - Only visible in List view */}
          {viewMode === 'list' && (
            <div className="hidden lg:grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_1fr_50px] gap-4 px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <div>Name</div>
              <div>Email</div>
              <div>Role</div>
              <div>Department</div>
              <div>Status</div>
              <div>Join Date</div>
              <div></div>
            </div>
          )}

          {/* User Rows - List View */}
          {viewMode === 'list' && (
            <div className={`space-y-2 mt-2 transition-all duration-300 ${isPageAnimating ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
              }`}>
              {filteredUsers.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-xl text-slate-600 font-medium">No users found</p>
                  <p className="text-sm text-slate-400 mt-2">Try adjusting your search terms</p>
                </div>
              ) : (
                currentUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleUserClick(user)}
                    className="grid grid-cols-1 lg:grid-cols-[2fr_1.5fr_1fr_1fr_1fr_1fr_50px] gap-4 p-4 md:px-6 md:py-5 rounded-2xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-200 hover:shadow-md cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-12 h-12 rounded-2xl object-cover shadow-lg ring-2 ring-white"
                        onError={(e) => {
                          // Fallback to gradient with emoji if image fails to load
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-2xl shadow-lg hidden">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{user.name}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          {user.location}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center text-slate-600 text-sm lg:text-base">
                      <div className="lg:hidden mr-2">
                        <Mail className="w-4 h-4 text-slate-400" />
                      </div>
                      <a href={`mailto:${user.email}`} className="hover:text-blue-600 transition-colors truncate">
                        {user.email}
                      </a>
                    </div>

                    <div className="flex items-center">
                      <span className="lg:hidden text-xs text-slate-500 mr-2">Role:</span>
                      <span className="text-slate-700 font-medium text-sm">{user.role}</span>
                    </div>

                    <div className="flex items-center">
                      <span className="lg:hidden text-xs text-slate-500 mr-2">Department:</span>
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                        {user.department}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <span className="lg:hidden text-xs text-slate-500 mr-2">Status:</span>
                      {getStatusBadge(user.status)}
                    </div>

                    <div className="flex items-center text-slate-600 text-sm">
                      <span className="lg:hidden text-xs text-slate-500 mr-2">Joined:</span>
                      {user.joinDate}
                    </div>

                    <div className="flex items-center justify-end lg:justify-center relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMenu(user.id);
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-all text-slate-400 hover:text-slate-700"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {/* Dropdown Menu */}
                      {openMenuId === user.id && (
                        <div className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                          <button
                            onClick={() => handleViewMore(user.id)}
                            className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Ver más
                          </button>
                          <button
                            onClick={() => handleSuspend(user.id)}
                            className="w-full px-4 py-2 text-left text-sm text-amber-600 hover:bg-amber-50 flex items-center gap-2 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                            Suspender
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Eliminar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* User Cards - Card View */}
          {viewMode === 'card' && (
            <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6 transition-all duration-300 ${isPageAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}>
              {filteredUsers.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-xl text-slate-600 font-medium">No users found</p>
                  <p className="text-sm text-slate-400 mt-2">Try adjusting your search terms</p>
                </div>
              ) : (
                currentUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleUserClick(user)}
                    className="bg-white border-2 border-slate-200 rounded-3xl p-6 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group relative overflow-hidden cursor-pointer"
                  >
                    {/* Background gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.profileImage}
                            alt={user.name}
                            className="w-16 h-16 rounded-2xl object-cover shadow-lg ring-2 ring-white group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform duration-300 hidden">
                            {user.avatar}
                          </div>
                        </div>
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMenu(user.id);
                            }}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-all text-slate-400 hover:text-slate-700"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>

                          {/* Dropdown Menu */}
                          {openMenuId === user.id && (
                            <div className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                              <button
                                onClick={() => handleViewMore(user.id)}
                                className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Ver más
                              </button>
                              <button
                                onClick={() => handleSuspend(user.id)}
                                className="w-full px-4 py-2 text-left text-sm text-amber-600 hover:bg-amber-50 flex items-center gap-2 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                </svg>
                                Suspender
                              </button>
                              <button
                                onClick={() => handleDelete(user.id)}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Eliminar
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Name and Role */}
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{user.name}</h3>
                        <p className="text-sm text-slate-600 font-medium mb-2">{user.role}</p>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <MapPin className="w-3 h-3" />
                          {user.location}
                        </div>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2 mb-4 pb-4 border-b border-slate-200">
                        <a
                          href={`mailto:${user.email}`}
                          className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors group/email"
                        >
                          <Mail className="w-4 h-4 text-slate-400 group-hover/email:text-blue-600" />
                          <span className="truncate">{user.email}</span>
                        </a>
                      </div>

                      {/* Department and Status */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Department</p>
                          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                            {user.department}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1 text-right">Status</p>
                          {getStatusBadge(user.status)}
                        </div>
                      </div>

                      {/* Join Date */}
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Joined</span>
                        <span className="font-medium text-slate-700">{user.joinDate}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Showing Info - Bottom */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            <div className="text-sm text-slate-600 text-center lg:text-left">
              Showing <span className="font-semibold text-slate-900">{indexOfFirstUser + 1}</span> to{' '}
              <span className="font-semibold text-slate-900">
                {Math.min(indexOfLastUser, filteredUsers.length)}
              </span>{' '}
              of <span className="font-semibold text-slate-900">{filteredUsers.length}</span> users
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Productivity Chart */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-8 border border-slate-200/60">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Team Activity</h3>
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
                <span>01-07 May</span>
              </button>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                <span className="text-sm text-slate-600 font-medium">Development</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-800"></div>
                <span className="text-sm text-slate-600 font-medium">Design</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 mb-4">Data updates every 3 hours</p>

            {/* Chart */}
            <div className="relative h-48">
              <svg className="w-full h-full" viewBox="0 0 400 160">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={160 - i * 40}
                    x2="400"
                    y2={160 - i * 40}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                  />
                ))}

                {/* Development line */}
                <path
                  d="M 0 130 Q 30 110, 60 90 T 120 50 T 180 55 T 240 70 T 300 90 T 360 75"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Design line */}
                <path
                  d="M 0 150 Q 30 140, 60 130 T 120 80 T 180 65 T 240 75 T 300 90 T 360 85"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Tooltip indicator */}
                <line x1="180" y1="0" x2="180" y2="160" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="180" cy="55" r="4" fill="#22d3ee" />
                <circle cx="180" cy="65" r="4" fill="#1e293b" />
              </svg>

              {/* Tooltip */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg">
                3h 10m
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between mt-2 text-xs text-slate-500">
                {productivityData.map((data) => (
                  <span key={data.day}>{data.day}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Projects in Progress */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-xl shadow-slate-400/50 p-6 md:p-8 border border-slate-700/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),transparent_50%)]"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Projects in progress:</h3>
                <div className="flex items-center gap-2">
                  <span className="text-white/60 text-sm">{currentProjectIndex + 1} / {projects.length}</span>
                </div>
              </div>

              <div className="relative">
                {/* Cards stack effect */}
                <div className={`absolute top-4 left-4 right-0 bottom-0 bg-slate-700/40 rounded-2xl transform transition-all duration-300 ${isAnimating ? 'rotate-3 scale-98' : 'rotate-1'
                  }`}></div>
                <div className={`absolute top-2 left-2 right-0 bottom-0 bg-slate-700/20 rounded-2xl transform transition-all duration-300 ${isAnimating ? '-rotate-3 scale-98' : '-rotate-1'
                  }`}></div>

                {/* Main card */}
                <div className={`relative bg-white rounded-2xl p-6 shadow-2xl transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95 rotate-2' : 'opacity-100 scale-100 rotate-0'
                  }`}>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentProject.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${tag === 'Feedback' || tag === 'Feature'
                            ? 'bg-teal-100 text-teal-700'
                            : tag === 'Bug'
                              ? 'bg-amber-100 text-amber-700'
                              : tag === 'Security'
                                ? 'bg-red-100 text-red-700'
                                : tag === 'Analytics' || tag === 'Backend'
                                  ? 'bg-blue-100 text-blue-700'
                                  : tag === 'UX' || tag === 'Design'
                                    ? 'bg-pink-100 text-pink-700'
                                    : 'bg-purple-100 text-purple-700'
                          }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 mb-2">{currentProject.title}</h4>
                  <p className="text-sm text-slate-500 mb-6">{currentProject.date}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {currentProject.avatars.map((avatar, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-lg border-2 border-white shadow-sm"
                        >
                          {avatar}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        💬 {currentProject.comments} comments
                      </span>
                      <span className="flex items-center gap-1">
                        📎 {currentProject.files} files
                      </span>
                    </div>
                  </div>
                </div>

                {/* Previous button */}
                <button
                  onClick={handlePrevProject}
                  className="cursor-pointer absolute -left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform z-20"
                >
                  <span className="text-slate-900 text-xl">←</span>
                </button>

                {/* Next button */}
                <button
                  onClick={handleNextProject}
                  className="cursor-pointer absolute -right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform z-20"
                >
                  <span className="text-slate-900 text-xl">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;