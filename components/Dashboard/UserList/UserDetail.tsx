'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, MessageSquare, History } from 'lucide-react';

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

interface UserDetailProps {
  user: User;
  onBack: () => void;
}

const UserDetail: React.FC<UserDetailProps> = ({ user, onBack }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const getStatusBadge = (status: 'active' | 'inactive' | 'pending') => {
    const styles = {
      active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      inactive: 'bg-slate-100 text-slate-600 border-slate-200',
      pending: 'bg-amber-100 text-amber-700 border-amber-200'
    };

    return (
      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Users</span>
      </button>

      {/* Profile Header Card */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-10 border border-slate-200/60 mb-6">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Profile Image */}
          <div className="relative">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-1 shadow-2xl">
              <img
                src={user.profileImage}
                alt={user.name}
                className="w-full h-full rounded-3xl object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">{user.avatar}</span>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{user.name}</h2>
                <p className="text-lg text-slate-600 font-medium mb-1">{user.role}</p>
                <p className="text-sm text-slate-500">{user.department} Department</p>
              </div>
              {getStatusBadge(user.status)}
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="text-sm font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Phone</p>
                  <p className="text-sm font-medium">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Location</p>
                  <p className="text-sm font-medium">{user.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Joined</p>
                  <p className="text-sm font-medium">{user.joinDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-cyan-200/50">
          <div className="flex items-center justify-between mb-3">
            <p className="text-cyan-100 text-sm font-medium">Projects</p>
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              📊
            </div>
          </div>
          <p className="text-4xl font-bold">12</p>
          <p className="text-cyan-100 text-sm mt-2">Active projects</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-6 text-white shadow-xl shadow-purple-200/50">
          <div className="flex items-center justify-between mb-3">
            <p className="text-purple-100 text-sm font-medium">Tasks</p>
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              ✓
            </div>
          </div>
          <p className="text-4xl font-bold">48</p>
          <p className="text-purple-100 text-sm mt-2">Completed this month</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 text-white shadow-xl shadow-emerald-200/50">
          <div className="flex items-center justify-between mb-3">
            <p className="text-emerald-100 text-sm font-medium">Performance</p>
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              🎯
            </div>
          </div>
          <p className="text-4xl font-bold">94%</p>
          <p className="text-emerald-100 text-sm mt-2">Overall rating</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-200/60 mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'Completed task', project: 'Website Redesign', time: '2 hours ago', icon: '✓', color: 'emerald' },
            { action: 'Commented on', project: 'Mobile App Update', time: '5 hours ago', icon: '💬', color: 'blue' },
            { action: 'Updated status', project: 'API Integration', time: '1 day ago', icon: '📝', color: 'purple' },
            { action: 'Started working on', project: 'Database Migration', time: '2 days ago', icon: '🚀', color: 'cyan' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className={`w-12 h-12 rounded-xl bg-${activity.color}-100 flex items-center justify-center flex-shrink-0`}>
                <span className="text-xl">{activity.icon}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">
                  {activity.action} <span className="text-slate-600">{activity.project}</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-semibold shadow-xl shadow-cyan-200/50 hover:shadow-2xl hover:scale-105 transition-all">
          <MessageSquare className="w-5 h-5" />
          Send Message
        </button>
        <button className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-4 bg-white text-slate-900 rounded-2xl font-semibold shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:scale-105 transition-all border border-slate-200">
          <Mail className="w-5 h-5" />
          Send Email
        </button>
      </div>
    </div>
  );
};

export default UserDetail;