import { useState, useEffect, useRef } from 'react';
import {
  Sun,
  Moon,
  Search,
  Bell,
  ChevronDown,
  X,
  Settings
} from 'lucide-react';
import {
  UserButton,
} from '@clerk/nextjs'
import { useChangeOption } from '@/store';

export default function Navigation() {

  const { handler }: { handler: (setHandler: String) => void } = useChangeOption();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

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
    { name: 'Dashboard', href: '#' },
    { name: 'Speaking', href: '#' },
    { name: 'Progress', href: '#' },
    { name: 'Courses', href: '#' },
    { name: 'Settings', href: '#' },
  ];

  const notifications = [
    {
      id: 1,
      title: 'New lesson available',
      message: 'Your next speaking lesson is ready to start',
      time: '5 min ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Achievement unlocked',
      message: 'You completed 7 days in a row!',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Course updated',
      message: 'New content added to Advanced Grammar',
      time: '3 hours ago',
      unread: false,
    },
    {
      id: 4,
      title: 'Weekly report ready',
      message: 'Check your progress from this week',
      time: '1 day ago',
      unread: false,
    },
  ];

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
            <nav className="hidden md:flex items-center space-x-2 bg-white/80 backdrop-blur-md rounded-2xl px-3 py-2 shadow-lg shadow-slate-200/50 border border-slate-200/50 absolute left-1/2 transform -translate-x-1/2 animate__animated animate__fadeIn">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveNav(item.name)}
                  className={`
                    cursor-pointer px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300
                    ${activeNav === item.name
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
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-1 md:ml-auto">
              {/* Search Icon */}
              <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-white hover:bg-slate-50 text-slate-600 transition-all duration-300 hover:scale-105 shadow-sm">
                <Search className="w-5 h-5" />
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-white hover:bg-slate-50 text-slate-600 transition-all duration-300 hover:scale-105 shadow-sm"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {/* Dark Mode Toggle - Desktop: after search, Mobile: before notifications */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-xl transition-all duration-300 hover:scale-105 shadow-sm ${isDarkMode
                  ? 'bg-slate-800 hover:bg-slate-700 text-amber-400'
                  : 'bg-white hover:bg-slate-50 text-slate-600'
                  }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-xl bg-white hover:bg-slate-50 text-slate-600 transition-all duration-300 hover:scale-105 shadow-sm relative"
                >
                  <Bell className="w-5 h-5 sm:w-5 sm:h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-80 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden animate-fadeIn z-50">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-slate-200/60 bg-slate-50/50">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900">Notifications</h3>
                        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                          Mark all as read
                        </button>
                      </div>
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 border-b border-slate-100 hover:bg-slate-50/50 transition-colors cursor-pointer ${notification.unread ? 'bg-blue-50/30' : ''
                            }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notification.unread ? 'bg-blue-500' : 'bg-transparent'
                              }`}></div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-slate-900 truncate">
                                {notification.title}
                              </p>
                              <p className="text-sm text-slate-600 mt-0.5">
                                {notification.message}
                              </p>
                              <p className="text-xs text-slate-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-3 bg-slate-50/50 border-t border-slate-200/60">
                      <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Avatar */}
              <button className="flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 rounded-xl bg-white overflow-hidden ring-2 ring-slate-200/60 hover:ring-slate-300 transition-all duration-300 hover:scale-105 shadow-sm">
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
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 animate-fadeIn relative z-[80]">
              <nav className="flex flex-col space-y-2 bg-white/80 backdrop-blur-md rounded-2xl p-3 shadow-lg shadow-slate-200/50 border border-slate-200/50">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveNav(item.name);
                      setMobileMenuOpen(false);
                    }}
                    className={`
                      px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 text-left
                      ${activeNav === item.name
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
                ))}

                {/* Mobile Action Buttons */}
                <div className="flex items-center justify-center pt-3 border-t border-slate-200/60 mt-2">
                  <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-white hover:bg-slate-50 text-slate-600 transition-all duration-300 shadow-sm">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </nav>
            </div>
          )}
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
      `}</style>
    </>
  );
}