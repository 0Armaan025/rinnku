"use client";
import React, { useState } from 'react';
import { User, BarChart3, Settings, ClipboardList, LogOut, Globe, Link2, Users, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

type Props = {};

// Sample data for the dashboard
const visitorData = [
  { day: 'Mon', count: 120 },
  { day: 'Tue', count: 150 },
  { day: 'Wed', count: 180 },
  { day: 'Thu', count: 220 },
  { day: 'Fri', count: 250 },
  { day: 'Sat', count: 190 },
  { day: 'Sun', count: 110 },
];

const popularLinks = [
  { id: 1, name: 'Marketing Campaign', clicks: 1204, growth: '+12.5%' },
  { id: 2, name: 'Product Release', clicks: 872, growth: '+8.2%' },
  { id: 3, name: 'Social Media', clicks: 654, growth: '+5.7%' },
];

const countryData = [
  { country: 'United States', visitors: 3842, percentage: 42 },
  { country: 'India', visitors: 1253, percentage: 18 },
  { country: 'Germany', visitors: 864, percentage: 12 },
  { country: 'United Kingdom', visitors: 654, percentage: 9 },
  { country: 'Canada', visitors: 532, percentage: 7 },
];

const recentLogs = [
  { id: 1, country: 'United States', time: '2 minutes ago', page: 'Home' },
  { id: 2, country: 'Germany', time: '5 minutes ago', page: 'Products' },
  { id: 3, country: 'Japan', time: '12 minutes ago', page: 'Contact' },
  { id: 4, country: 'France', time: '18 minutes ago', page: 'About' },
  { id: 5, country: 'Australia', time: '25 minutes ago', page: 'Blog' },
];

const DashboardPage = (props: Props) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Colors for the pie chart
  const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'];

  return (
    <div className="flex h-screen bg-gradient-to-b from-[#030213] to-[#0f0a2d] text-gray-200">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h1 className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent font-bold text-2xl">Rinkuu</h1>
        </div>
        
        {/* User profile summary */}
        <div className="p-4 flex items-center border-b border-gray-800">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
            JD
          </div>
          <div className="ml-3">
            <p className="text-gray-200">John Doe</p>
            <p className="text-gray-400 text-sm">Administrator</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'profile' ? 'bg-gray-800' : 'hover:bg-gray-800/40'}`}
              >
                <User size={18} className={activeTab === 'profile' ? 'text-purple-400' : 'text-gray-400'} />
                <span className="ml-3">Profile</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'dashboard' ? 'bg-gray-800' : 'hover:bg-gray-800/40'}`}
              >
                <BarChart3 size={18} className={activeTab === 'dashboard' ? 'text-purple-400' : 'text-gray-400'} />
                <span className="ml-3">Dashboard</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('customization')}
                className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'customization' ? 'bg-gray-800' : 'hover:bg-gray-800/40'}`}
              >
                <Settings size={18} className={activeTab === 'customization' ? 'text-purple-400' : 'text-gray-400'} />
                <span className="ml-3">Customization</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('logs')}
                className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'logs' ? 'bg-gray-800' : 'hover:bg-gray-800/40'}`}
              >
                <ClipboardList size={18} className={activeTab === 'logs' ? 'text-purple-400' : 'text-gray-400'} />
                <span className="ml-3">Logs</span>
              </button>
            </li>
          </ul>
        </nav>
        
        {/* Logout button */}
        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center w-full p-2 rounded-lg hover:bg-gray-800/40">
            <LogOut size={18} className="text-gray-400" />
            <span className="ml-3">Log Out</span>
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="p-6 border-b border-gray-800">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              {activeTab === 'profile' && 'Profile Settings'}
              {activeTab === 'dashboard' && 'Analytics Dashboard'}
              {activeTab === 'customization' && 'Rinkuu Customization'}
              {activeTab === 'logs' && 'Activity Logs'}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800">
                <Settings size={18} />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                JD
              </div>
            </div>
          </div>
        </header>
        
        {/* Content based on active tab */}
        <main className="p-6">
          {/* Profile Section */}
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    JD
                  </div>
                  <div className="ml-6">
                    <h2 className="text-xl font-bold">John Doe</h2>
                    <p className="text-gray-400">john.doe@example.com</p>
                    <p className="text-gray-400">Administrator</p>
                    <button className="mt-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
                      Change Avatar
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h2 className="text-xl font-bold mb-4">Change Password</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 mb-1">Current Password</label>
                    <input type="password" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2" />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">New Password</label>
                    <input type="password" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2" />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1">Confirm New Password</label>
                    <input type="password" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2" />
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Dashboard Section */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-gray-400">Total Visitors</h3>
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                      <Users size={20} className="text-indigo-400" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold">24,892</p>
                  <div className="flex items-center mt-2 text-green-500">
                    <ArrowUpRight size={16} />
                    <span className="text-sm ml-1">12.5% increase</span>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-gray-400">Link Clicks</h3>
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Link2 size={20} className="text-purple-400" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold">8,621</p>
                  <div className="flex items-center mt-2 text-green-500">
                    <ArrowUpRight size={16} />
                    <span className="text-sm ml-1">8.2% increase</span>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-gray-400">Countries</h3>
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                      <Globe size={20} className="text-indigo-400" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold">42</p>
                  <div className="flex items-center mt-2 text-green-500">
                    <ArrowUpRight size={16} />
                    <span className="text-sm ml-1">3 new countries</span>
                  </div>
                </div>
              </div>
              
              {/* Visitor Chart */}
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-bold mb-4">Visitor Traffic</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={visitorData}>
                    <XAxis dataKey="day" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                      cursor={{ fill: '#374151' }}
                    />
                    <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Popular Links and Country Data */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Popular Links */}
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                  <h3 className="text-xl font-bold mb-4">Most Popular Links</h3>
                  <div className="space-y-3">
                    {popularLinks.map((link) => (
                      <div key={link.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                        <div>
                          <h4 className="font-medium">{link.name}</h4>
                          <p className="text-gray-400 text-sm">{link.clicks} clicks</p>
                        </div>
                        <span className="text-green-500">{link.growth}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Country Data */}
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                  <h3 className="text-xl font-bold mb-4">Top Countries</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={countryData}
                        dataKey="percentage"
                        nameKey="country"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      >
                        {countryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
          
          {/* Customization Section Placeholder */}
          {activeTab === 'customization' && (
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <div className="flex items-center justify-center p-16">
                <div className="text-center">
                  <Settings size={48} className="mx-auto mb-4 text-gray-500" />
                  <h2 className="text-xl font-bold mb-2">Rinkuu Customization</h2>
                  <p className="text-gray-400 max-w-md">
                    This section will display the Rinkuu created by the user with different fields and a preview option.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Logs Section */}
          {activeTab === 'logs' && (
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg bg-indigo-500/20 mr-4">
                        <Globe size={18} className="text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">{log.country}</h4>
                        <p className="text-gray-400 text-sm">Visited {log.page} page</p>
                      </div>
                    </div>
                    <span className="text-gray-400 text-sm">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;