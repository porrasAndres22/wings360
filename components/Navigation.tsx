import { useState, useEffect, useRef } from 'react';
import {
  Sun,
  Moon,
  Search,
  Bell,
  ChevronDown,
  X,
  Settings,
  Download
} from 'lucide-react';
import {
  useAuth,
  UserButton,
} from '@clerk/nextjs'
import { useChangeOption } from '@/store';

// Main Navigation Component
export default function Navigation() {

  const { data, handler }: { data: String, handler: (setHandler: String) => void } = useChangeOption();
  const { has }: { has: any } = useAuth()

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeNav, setActiveNav] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('inbox');
  const [searchQuery, setSearchQuery] = useState('');

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveNav(location.hash)
  }, [data])

  useEffect(() => {

    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }

    if (mobileMenuOpen || notificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen, notificationsOpen]);

  const navItems = [
    { name: 'Dashboard', href: '' },
    { name: 'UserList', href: '#a90a81a258e5ab81db32d3a05b349b9f6df4e207' },
    { name: 'Overview', href: '#56acaf1d4b8590cbfac2aaafec411795f31c5bab' },
    { name: 'Analytics', href: '#cd2f1a458488e011a2fc1719ebe20437c52dc3e5' },
    { name: 'Settings', href: "#3cc1d5a427a45820b04fe30f78a972b784952460" },
  ];

  const notifications = [
    {
      id: 1,
      name: 'Robert Fox',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
      message: 'Fermentum dui faucibus in ornare quam viverra orci sagittis. Habitant morbi tristique senectus et...',
      time: '2 hours ago',
      unread: true,
      online: true,
      attachment: {
        name: 'Contract',
        size: '2.1 MB'
      },
      tab: 'inbox'
    },
    {
      id: 2,
      name: 'Arlene McCoy',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arlene',
      message: 'Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Elementum tempus e...',
      time: '7 hours ago',
      unread: false,
      online: true,
      tab: 'inbox'
    },
    {
      id: 3,
      name: 'Amy Elsner',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amy',
      message: 'Tempor commodo ullamcorper a lacus vestibulum sed. Dolor sit amet consectetur adipiscing elit pe...',
      time: '10 hours ago',
      unread: false,
      online: true,
      tab: 'inbox'
    },
    {
      id: 4,
      name: 'Course Update',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Course',
      message: 'New content added to Advanced Grammar',
      time: '1 day ago',
      unread: false,
      online: false,
      tab: 'general'
    },
    {
      id: 5,
      name: 'System Notification',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=System',
      message: 'Your weekly report is ready to view',
      time: '2 days ago',
      unread: false,
      online: false,
      tab: 'archived'
    },
  ];

  const tabs = [
    { id: 'inbox', label: 'Inbox', count: notifications.filter(n => n.tab === 'inbox' && n.unread).length },
    { id: 'general', label: 'General', count: 0 },
    { id: 'archived', label: 'Archived', count: 0 }
  ];

  const filteredNotifications = notifications.filter(n => {
    const matchesTab = n.tab === activeTab;
    const matchesSearch = n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 from-slate-50 via-blue-50/30 to-purple-50/20 backdrop-blur-sm z-[70]">
        <div className="w-full pt-2 pl-2 sm:pl-4 pr-4 sm:pr-6 lg:pr-8" ref={mobileMenuRef}>
          <div className="flex items-center justify-between h-16 relative">
            {/* Logo - Always visible */}
            <div className="flex-shrink-0">
              <svg className='w-30 h-20'>
                <use href="./sprite.svg#wings360"></use>
              </svg>
            </div>

            {/* Spacer for mobile to push right section */}
            <div className="flex-1 md:hidden"></div>

            {/* Desktop Navigation - Centered */}
            {
              has({ permission: 'org:testpermission:soysuperadmin' }) ?

                <nav className="hidden md:flex items-center space-x-2 bg-white/80 backdrop-blur-md rounded-2xl px-3 py-2 shadow-lg shadow-slate-200/50 border border-slate-200/50 absolute left-1/2 transform -translate-x-1/2 animate__animated animate__fadeIn">
                  {navItems.map((item) => (
                    <div key={item.name} className="relative group">
                      <button
                        onClick={() => {
                          if (item.href != data) {
                            if (item.name != "Dashboard") {
                              setActiveNav(item.name); handler(item.href); location.hash = item.href
                            } else {
                              location.replace('/')
                            }
                          }
                        }}
                        className={`
                          cursor-pointer px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105 active:scale-95
                          ${activeNav === item.href
                            ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg shadow-slate-900/25'
                            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                          }
                        `}
                      >
                        {item.name === 'Settings' ? (
                          <Settings className="w-5 h-5" />
                        ) : (
                          item.name
                        )}
                      </button>
                      {/* Tooltip for Settings */}
                      {item.name === 'Settings' && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg z-50">
                          Settings
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-1 border-4 border-transparent border-b-slate-900"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </nav>

                : <></>
            }

            {/* Right Section - Always visible */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Theme Toggle */}
              <div className="relative group hidden sm:block">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-white hover:bg-slate-50 transition-all duration-300 hover:scale-110 shadow-sm cursor-pointer active:scale-95"
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5 text-amber-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-slate-600" />
                  )}
                </button>
                {/* Tooltip */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-1 border-4 border-transparent border-b-slate-900"></div>
                </div>
              </div>

              {/* Search Button - Hidden on mobile */}
              <div className="relative group hidden sm:block">
                <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-white hover:bg-slate-50 transition-all duration-300 hover:scale-110 shadow-sm cursor-pointer active:scale-95">
                  <Search className="w-5 h-5 text-slate-600" />
                </button>
                {/* Tooltip */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                  Search
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-1 border-4 border-transparent border-b-slate-900"></div>
                </div>
              </div>

              {/* Mobile Menu Button - Only on mobile */}
              {
                has({ permission: 'org:testpermission:soysuperadmin' }) ?
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-white hover:bg-slate-50 transition-all duration-300 shadow-sm active:scale-95"
                  >
                    {mobileMenuOpen ? (
                      <X className="w-6 h-6 text-slate-600" />
                    ) : (
                      <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    )}
                  </button>

                  : <></>
              }

              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-xl bg-white hover:bg-slate-50 transition-all duration-300 hover:scale-110 shadow-sm cursor-pointer active:scale-95 relative"
                >
                  <Bell className="w-5 h-5 text-slate-600" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <div className="fixed sm:absolute right-2 sm:right-0 left-2 sm:left-auto top-20 sm:top-auto sm:mt-3 w-auto sm:w-[420px] bg-white rounded-2xl shadow-2xl border border-slate-200/60 overflow-hidden z-[80] animate-fadeIn">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-900">Notifications</h3>
                        <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                          <Settings className="w-4 h-4 text-slate-500" />
                        </button>
                      </div>

                      {/* Tabs */}
                      <div className="flex gap-4 border-b border-slate-200/60">
                        {tabs.map(tab => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                              relative pb-3 text-sm font-medium transition-colors
                              ${activeTab === tab.id
                                ? 'text-slate-900'
                                : 'text-slate-500 hover:text-slate-700'
                              }
                            `}
                          >
                            {tab.label}
                            {tab.count > 0 && (
                              <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-rose-500 rounded-full">
                                {tab.count}
                              </span>
                            )}
                            {activeTab === tab.id && (
                              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-900 to-slate-700 rounded-full"></div>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Search */}
                      <div className="mt-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Search notifications..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/60 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-[450px] overflow-y-auto custom-scrollbar">
                      {filteredNotifications.length === 0 ? (
                        <div className="px-6 py-12 text-center">
                          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bell className="w-8 h-8 text-slate-400" />
                          </div>
                          <p className="text-slate-500 font-medium">No notifications</p>
                          <p className="text-sm text-slate-400 mt-1">You're all caught up!</p>
                        </div>
                      ) : (
                        filteredNotifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`
                              px-6 py-4 border-b border-slate-100 hover:bg-slate-50/50 transition-colors cursor-pointer
                              ${notification.unread ? 'bg-blue-50/30' : ''}
                            `}
                          >
                            <div className="flex gap-4">
                              {/* Avatar */}
                              <div className="relative flex-shrink-0">
                                <div className="w-11 h-11 rounded-xl overflow-hidden ring-2 ring-white shadow-sm">
                                  <img
                                    src={notification.avatar}
                                    alt={notification.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                {notification.online && (
                                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                                )}
                                {notification.unread && !notification.online && (
                                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-rose-500 rounded-full border-2 border-white"></div>
                                )}
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <h4 className="font-semibold text-sm text-slate-900">
                                    {notification.name}
                                  </h4>
                                  <span className="text-xs text-slate-400 whitespace-nowrap flex-shrink-0">
                                    {notification.time}
                                  </span>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  {notification.message}
                                </p>

                                {/* Attachment */}
                                {notification.attachment && (
                                  <div className="mt-3 flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200/60 hover:bg-slate-100 transition-colors group">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200/60">
                                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                      </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-slate-900">
                                        {notification.attachment.name}
                                      </p>
                                      <p className="text-xs text-slate-500">
                                        {notification.attachment.size}
                                      </p>
                                    </div>
                                    <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                                      <Download className="w-4 h-4 text-slate-600" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Footer with View More Button */}
                    <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
                      <button
                        onClick={() => {
                          setNotificationCenterOpen(true);
                          setNotificationsOpen(false);
                        }}
                        className="w-full py-2.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-medium text-sm rounded-xl hover:from-slate-800 hover:to-slate-700 transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-slate-900/25"
                      >
                        View More
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Avatar */}
              <div className="relative group">
                <button className="flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-xl bg-white overflow-hidden ring-2 ring-slate-200/60 hover:ring-slate-300 transition-all duration-300 hover:scale-110 shadow-sm cursor-pointer active:scale-95">
                  <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-400 to-purple-500">

                    <UserButton appearance={{
                      elements: {
                        avatarBox: {
                          width: "120%",
                          height: "120%",
                          margin: "-10% 0 0 -10%"
                        }
                      }
                    }} />

                  </div>
                </button>
                {/* Tooltip */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                  Account
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-1 border-4 border-transparent border-b-slate-900"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {
            has({ permission: 'org:testpermission:soysuperadmin' }) ?
              mobileMenuOpen && (
                <div className="md:hidden pb-4 animate-fadeIn relative z-[80]">
                  <nav className="flex flex-col space-y-2 bg-white backdrop-blur-md rounded-2xl p-3 shadow-lg shadow-slate-200/50 border border-slate-200/50">
                    {navItems.filter(item => item.name !== 'Settings').map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          setActiveNav(item.name)
                          setMobileMenuOpen(false)
                          handler(item.href)
                          location.hash = item.href
                        }}
                        className={`
                        px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 text-left
                        ${activeNav === item.href
                            ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg shadow-slate-900/25'
                            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                          }
                      `}
                      >
                        {item.name}
                      </button>
                    ))}

                    {/* Mobile Action Buttons */}
                    <div className="flex items-center gap-2 pt-3 border-t border-slate-200/60 mt-2">
                      <button className="flex-1 flex items-center justify-center h-10 rounded-xl bg-white hover:bg-slate-50 text-slate-600 transition-all duration-300 shadow-sm">
                        <Search className="w-5 h-5" />
                      </button>
                      <div className="flex-1 relative group">
                        <button
                          onClick={() => {
                            const settingsItem = navItems.find(item => item.name === 'Settings');
                            if (settingsItem) {
                              setActiveNav(settingsItem.href)
                              setMobileMenuOpen(false)
                              handler(settingsItem.href)
                              location.hash = settingsItem.href
                            }
                          }}
                          className={`
                          w-full flex items-center justify-center h-10 rounded-xl transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 cursor-pointer
                          ${activeNav === '#3cc1d5a427a45820b04fe30f78a972b784952460'
                              ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg shadow-slate-900/25'
                              : 'bg-white hover:bg-slate-50 text-slate-600'
                            }
                        `}
                        >
                          <Settings className="w-5 h-5" />
                        </button>
                        {/* Tooltip */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg z-50">
                          Settings
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-1 border-4 border-transparent border-b-slate-900"></div>
                        </div>
                      </div>
                    </div>
                  </nav>
                </div>
              )
              : <></>
          }
        </div>
      </header>


      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        /* Custom scrollbar for notifications */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </>
  );
}