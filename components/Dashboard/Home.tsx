'use client';

import React, { useState } from 'react';
import { 
  Home, 
  Clock, 
  Calendar, 
  FileText, 
  Mail, 
  Settings,
  Search, 
  Maximize2, 
  Video, 
  BookOpen, 
  MessageCircle, 
  Trophy, 
  Target 
} from 'lucide-react';

const IntegratedDashboard = () => {
  // Estados del sidebar
  const [activeSidebarIndex, setActiveSidebarIndex] = useState(0);
  
  // Estados del dashboard
  const [selectedDay, setSelectedDay] = useState('Day');
  const [selectedPeriod, setSelectedPeriod] = useState('Weekly');

  const sidebarMenuItems = [
    { icon: Home, label: 'Home' },
    { icon: Clock, label: 'Recent' },
    { icon: Calendar, label: 'Calendar' },
    { icon: FileText, label: 'Documents' },
    { icon: Mail, label: 'Mail' },
    { icon: Settings, label: 'Settings' },
  ];

  // Datos del dashboard
  const courses = [
    {
      id: 1,
      title: "Speak with Confidence",
      description: "Learn how to speak English clearly and confidently in everyday situations",
      date: "27 Apr 2025",
      color: "bg-gradient-to-br from-indigo-200/60 via-purple-200/50 to-indigo-300/60",
      borderColor: "border-indigo-300/40",
      avatars: ["/api/placeholder/32/32", "/api/placeholder/32/32"]
    },
    {
      id: 2,
      title: "Master the Basics",
      description: "Build a strong foundation with essential grammar and vocabulary",
      date: "30 Apr 2025",
      color: "bg-gradient-to-br from-sky-200/60 via-cyan-200/50 to-blue-200/60",
      borderColor: "border-sky-300/40",
      avatars: ["/api/placeholder/32/32", "/api/placeholder/32/32"]
    },
    {
      id: 3,
      title: "Sound Like a Native",
      description: "Improve your pronunciation and intonation for natural speech",
      date: "15 May 2025",
      color: "bg-gradient-to-br from-emerald-200/60 via-green-200/50 to-teal-200/60",
      borderColor: "border-emerald-300/40",
      avatars: ["/api/placeholder/32/32", "/api/placeholder/32/32"]
    }
  ];

  const homework = [
    { id: 1, task: "Learn 10 new words today", progress: 57, icon: BookOpen },
    { id: 2, task: "Do 1 grammar task today", progress: 42, icon: MessageCircle },
    { id: 3, task: "Watch a video, answer 3 questions", progress: 31, icon: Video },
    { id: 4, task: "Write 3 sentences with vocab", progress: 84, icon: BookOpen }
  ];

  const friends = [
    { name: "Anna Morgan", score: 10568, stats: { days: 25, percentage: 842, streak: 48 }, avatar: "/api/placeholder/40/40" },
    { name: "Jake Thompson", score: 10234, stats: { days: 23, percentage: 778, streak: 39 }, avatar: "/api/placeholder/40/40" },
    { name: "Sofia Bennett", score: 9892, stats: { days: 20, percentage: 742, streak: 33 }, avatar: "/api/placeholder/40/40" },
    { name: "Emily Carter", score: 9322, stats: { days: 17, percentage: 643, streak: 28 }, avatar: "/api/placeholder/40/40" }
  ];

  const chartData = Array.from({ length: 50 }, (_, i) => ({
    theory: 40 + Math.random() * 40,
    practice: 30 + Math.random() * 50,
    lexicon: 20 + Math.random() * 60
  }));

  const getProgressColor = (progress: number) => {
    if (progress >= 70) return 'bg-gradient-to-r from-emerald-400 to-green-500';
    if (progress >= 40) return 'bg-gradient-to-r from-cyan-400 to-blue-500';
    return 'bg-gradient-to-r from-violet-400 to-purple-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Mobile - Horizontal Menu at Top */}
      <aside className="md:hidden fixed left-0 right-0 top-[60px] backdrop-blur-md z-40 animate__animated animate__bounce">
        <div className="flex items-center justify-center px-4 py-3 overflow-x-auto">
          <nav className="flex items-center justify-center space-x-2">
            {sidebarMenuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = index === activeSidebarIndex;
              
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setActiveSidebarIndex(index);
                  }}
                  className={`
                    cursor-pointer w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                    transition-all duration-200
                    ${isActive 
                      ? 'bg-black text-white shadow-lg' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                    }
                  `}
                  aria-label={item.label}
                >
                  <Icon className="w-5 h-5" />
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Desktop - Vertical Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-16 backdrop-blur-md flex-col items-center py-6 z-50 animate__animated animate__bounce">
        <nav className="flex-1 flex flex-col items-center justify-center space-y-0.5 w-full px-3">
          {sidebarMenuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === activeSidebarIndex;
            
            return (
              <button
                key={item.label}
                onClick={() => {
                  setActiveSidebarIndex(index);
                }}
                className={`
                  cursor-pointer w-10 h-10 rounded-xl flex items-center justify-center
                  transition-all duration-200 group relative
                  ${isActive 
                    ? 'bg-black text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                  }
                `}
                aria-label={item.label}
              >
                <Icon className="w-5 h-5" />
                
                {/* Tooltip */}
                <span className="absolute left-full ml-4 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="md:ml-16 pt-[120px] md:pt-[100px]">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent tracking-tight">
              Dashboard
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Select Course Card */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-200/50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Select a course</h2>
                    <p className="text-sm text-slate-500 mt-1">Start learning today</p>
                  </div>
                  <button className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-300">
                    <Maximize2 className="w-5 h-5 text-slate-600" />
                  </button>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/50 transition-all duration-300"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-900 text-white p-2 rounded-xl hover:bg-slate-800 transition-all duration-300">
                    <Search className="w-4 h-4" />
                  </button>
                </div>

                {/* Courses */}
                <div className="space-y-3">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className={`${course.color} border ${course.borderColor} rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300 cursor-pointer group`}
                    >
                      <h3 className="font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-slate-800/90 text-white px-3 py-1.5 rounded-xl text-xs">
                          <Calendar className="w-3 h-3" />
                          <span className="font-medium">{course.date}</span>
                        </div>
                        <div className="flex -space-x-2">
                          {course.avatars.map((avatar, idx) => (
                            <div key={idx} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-white" />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Performance Chart */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-200/50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">Performance Chart</h2>
                    <p className="text-sm text-slate-500 mt-1">Track results and watch your progress rise</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <select 
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 cursor-pointer"
                    >
                      <option>Weekly</option>
                      <option>Monthly</option>
                      <option>Yearly</option>
                    </select>
                    <button className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-300">
                      <Maximize2 className="w-5 h-5 text-slate-600" />
                    </button>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-400" />
                    <span className="text-sm text-slate-600 font-medium">Theory</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-violet-400" />
                    <span className="text-sm text-slate-600 font-medium">Practice</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <span className="text-sm text-slate-600 font-medium">Lexicon</span>
                  </div>
                </div>

                {/* Chart */}
                <div className="relative h-64 bg-slate-50/50 rounded-2xl p-6">
                  <div className="absolute right-6 top-4 flex flex-col items-end gap-1 text-xs">
                    <span className="text-slate-400">More theory</span>
                  </div>
                  <div className="absolute right-6 bottom-4 flex flex-col items-end gap-1 text-xs">
                    <span className="text-xs text-slate-300">More practice</span>
                  </div>
                  
                  <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                    {/* Theory (cyan) */}
                    <path
                      d={`M 0 ${200 - chartData[0].theory} ${chartData.map((d, i) => `L ${(i / chartData.length) * 800} ${200 - d.theory}`).join(' ')}`}
                      fill="url(#theoryGradient)"
                      opacity="0.6"
                      className="transition-all duration-500"
                    />
                    {/* Practice (violet) */}
                    <path
                      d={`M 0 ${200 - chartData[0].practice} ${chartData.map((d, i) => `L ${(i / chartData.length) * 800} ${200 - d.practice}`).join(' ')}`}
                      fill="url(#practiceGradient)"
                      opacity="0.6"
                      className="transition-all duration-500"
                    />
                    {/* Lexicon (rose) */}
                    <path
                      d={`M 0 ${200 - chartData[0].lexicon} ${chartData.map((d, i) => `L ${(i / chartData.length) * 800} ${200 - d.lexicon}`).join(' ')}`}
                      fill="url(#lexiconGradient)"
                      opacity="0.6"
                      className="transition-all duration-500"
                    />
                    
                    <defs>
                      <linearGradient id="theoryGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
                      </linearGradient>
                      <linearGradient id="practiceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.1" />
                      </linearGradient>
                      <linearGradient id="lexiconGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#fb7185" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#fb7185" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Days labels */}
                  <div className="flex justify-between mt-2 px-2 text-xs text-slate-400 font-medium">
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Homework */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-200/50">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Homework</h2>
                      <p className="text-sm text-slate-500 mt-1">Check and complete tasks</p>
                    </div>
                    <select 
                      value={selectedDay}
                      onChange={(e) => setSelectedDay(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 cursor-pointer"
                    >
                      <option>Day</option>
                      <option>Week</option>
                      <option>Month</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    {homework.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.id} className="flex items-center gap-4 group hover:bg-slate-50/50 p-3 rounded-2xl transition-all duration-300">
                          <div className="bg-slate-900 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-700 mb-2">{item.task}</p>
                            <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={`absolute inset-y-0 left-0 ${getProgressColor(item.progress)} rounded-full transition-all duration-700 ease-out`}
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-lg font-bold text-slate-800 min-w-[50px] text-right">
                            {item.progress}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Friends Score */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-200/50">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Friends Score</h2>
                      <p className="text-sm text-slate-500 mt-1">See how you rank among friends</p>
                    </div>
                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 px-4 py-2 rounded-xl hover:bg-indigo-50 transition-all duration-300">
                      All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {friends.map((friend, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50/50 transition-all duration-300 group"
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 group-hover:scale-110 transition-transform duration-300" />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-800 truncate">{friend.name}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Calendar className="w-3 h-3" />
                              <span>{friend.stats.days}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Target className="w-3 h-3" />
                              <span>{friend.stats.percentage}%</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Trophy className="w-3 h-3" />
                              <span>{friend.stats.streak}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            {friend.score.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegratedDashboard;