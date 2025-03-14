"use client";
import React, { useState } from 'react';
import { User, BarChart3, Settings, ClipboardList, LogOut, Globe, Link2, Users, ArrowUpRight, Plus, Edit, Eye, Save, Trash2, ChevronDown } from 'lucide-react';
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

interface FieldType {
    id: number;
    title: string; // Adjust this based on your actual field structure
    link: string; // Adjust this too if needed
    image: string; // Adjust this too if needed
  }

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

// Theme options for customization
const themeOptions = [
  { id: 'midnight', name: 'Midnight Purple', from: 'from-indigo-500', to: 'to-purple-600' },
  { id: 'ocean', name: 'Ocean Blue', from: 'from-blue-500', to: 'to-cyan-600' },
  { id: 'sunset', name: 'Sunset Orange', from: 'from-orange-500', to: 'to-red-600' },
  { id: 'forest', name: 'Forest Green', from: 'from-green-500', to: 'to-emerald-600' },
  { id: 'royal', name: 'Royal Gold', from: 'from-yellow-500', to: 'to-amber-600' },
];

const DashboardPage = (props: Props) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState('johndoe');
  const [displayName, setDisplayName] = useState('John Doe');
  const [settingsOpen, setSettingsOpen] = useState(false);
const [isProfilePublic, setIsProfilePublic] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState(themeOptions[0]);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [fields, setFields] = useState<FieldType[]>([
    { id: 1, title: 'Portfolio', link: 'https://portfolio.com', image: '' },
    { id: 2, title: 'LinkedIn', link: 'https://linkedin.com', image: '' },
    { id: 3, title: 'Twitter', link: 'https://twitter.com', image: '' },
  ]);

  
  const [previewMode, setPreviewMode] = useState(false);

  // Colors for the pie chart
  const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'];

  // Add new field
  const addField = () => {
    const newId = fields.length > 0 ? Math.max(...fields.map(f => f.id)) + 1 : 1;
    setFields([...fields, { id: newId, title: '', link: '', image: '' }]);
  };

  // Delete field
  const deleteField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
  };
  
  const updateField = (id: number, key: keyof FieldType, value: string) => {
    setFields(fields.map((field) =>
      field.id === id ? { ...field, [key]: value } : field
    ));
  };
  

  // Get gradient classes based on selected theme
  const getGradientClasses = () => {
    return `bg-gradient-to-r ${selectedTheme.from} ${selectedTheme.to}`;
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-b from-[#030213] to-[#0f0a2d] text-gray-200">
      {/* Mobile Menu Button */}
      <div className="md:hidden p-4 flex items-center justify-between border-b border-gray-800">
        <h1 className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent font-bold text-2xl">Rinkuu</h1>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-gray-800/50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-64 border-r border-gray-800 flex flex-col`}>
        <div className="p-4 border-b border-gray-800 hidden md:block">
          <h1 className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent font-bold text-2xl">Rinkuu</h1>
        </div>
        
        {/* User profile summary */}
        <div className="p-4 flex items-center border-b border-gray-800">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
            JD
          </div>
          <div className="ml-3">
            <p className="text-gray-200">{displayName}</p>
            <p className="text-gray-400 text-sm">Administrator</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => {setActiveTab('profile'); setSidebarOpen(false);}}
                className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'profile' ? 'bg-gray-800' : 'hover:bg-gray-800/40'}`}
              >
                <User size={18} className={activeTab === 'profile' ? 'text-purple-400' : 'text-gray-400'} />
                <span className="ml-3">Profile</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => {setActiveTab('dashboard'); setSidebarOpen(false);}}
                className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'dashboard' ? 'bg-gray-800' : 'hover:bg-gray-800/40'}`}
              >
                <BarChart3 size={18} className={activeTab === 'dashboard' ? 'text-purple-400' : 'text-gray-400'} />
                <span className="ml-3">Dashboard</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => {setActiveTab('customization'); setSidebarOpen(false);}}
                className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'customization' ? 'bg-gray-800' : 'hover:bg-gray-800/40'}`}
              >
                <Settings size={18} className={activeTab === 'customization' ? 'text-purple-400' : 'text-gray-400'} />
                <span className="ml-3">Customization</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => {setActiveTab('logs'); setSidebarOpen(false);}}
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
        <header className="p-4 md:p-6 border-b border-gray-800">
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              {activeTab === 'profile' && 'Profile Settings'}
              {activeTab === 'dashboard' && 'Analytics Dashboard'}
              {activeTab === 'customization' && 'Rinkuu Customization'}
              {activeTab === 'logs' && 'Activity Logs'}
            </h1>
            <div className="flex items-center space-x-4">
              <button    onClick={() => setSettingsOpen(!settingsOpen)}
 className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800">
                <Settings size={18} />
                
              </button>

              {settingsOpen && (
    <div className="absolute right-0 top-full mt-2 w-64 bg-gray-900 border border-gray-800 rounded-lg shadow-lg z-20">
      <div className="p-4">
        <h3 className="text-lg font-medium mb-4">Quick Settings</h3>
        
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <label className="text-gray-300">Profile Public</label>
            <button 
              onClick={() => setIsProfilePublic(!isProfilePublic)} 
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${isProfilePublic ? 'bg-purple-600' : 'bg-gray-700'}`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isProfilePublic ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>
          <p className="text-gray-400 text-xs mt-1">
            {isProfilePublic ? 'Anyone can view your profile' : 'Your profile is private'}
          </p>
        </div>
        
        <div className="pt-3 border-t border-gray-800 flex justify-end">
          <button 
            onClick={() => setSettingsOpen(false)}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white text-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )}
  {settingsOpen && (
  <div 
    className="fixed inset-0 z-10" 
    onClick={() => setSettingsOpen(false)}
  ></div>
)}
              
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                JD
              </div>
            </div>
          </div>
        </header>
        
        {/* Content based on active tab */}
        <main className="p-4 md:p-6">
          {/* Profile Section */}
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    JD
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <h2 className="text-xl font-bold">{displayName}</h2>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-gray-900/50 p-4 md:p-6 rounded-xl border border-gray-800">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-gray-400">Total Visitors</h3>
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                      <Users size={20} className="text-indigo-400" />
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold">24,892</p>
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
          
          {/* Customization Section */}
{activeTab === 'customization' && (
  <div className="space-y-6">
    {/* Profile URL and Theme Selection */}
    <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
      <h2 className="text-xl font-bold mb-4">Your Rinkuu</h2>
      
      {/* Profile URL */}
      <div className="mb-6">
        <label className="block text-gray-400 mb-2">Your Profile URL</label>
        <div className="flex items-center">
          <span className="bg-gray-800 p-2 rounded-l-lg border border-gray-700 text-gray-400">rinkuu.com/@</span>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 bg-gray-800 border border-gray-700 border-l-0 rounded-r-lg p-2"
          />
        </div>
      </div>
      
      {/* Display Name */}
      <div className="mb-6">
        <label className="block text-gray-400 mb-2">Display Name</label>
        <input 
          type="text" 
          value={displayName} 
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2"
        />
      </div>
      
      {/* Theme Selection */}
      <div className="mb-6">
        <label className="block text-gray-400 mb-2">Theme</label>
        <div className="relative">
          <button 
            className="w-full flex items-center justify-between bg-gray-800 border border-gray-700 rounded-lg p-2"
            onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
          >
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full mr-2 bg-gradient-to-r ${selectedTheme.from} ${selectedTheme.to}`}></div>
              <span>{selectedTheme.name}</span>
            </div>
            <ChevronDown size={18} />
          </button>
          
          {themeDropdownOpen && (
            <div className="absolute mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
              {themeOptions.map((theme) => (
                <button 
                  key={theme.id}
                  className="w-full flex items-center p-2 hover:bg-gray-700 text-left"
                  onClick={() => {
                    setSelectedTheme(theme);
                    setThemeDropdownOpen(false);
                  }}
                >
                  <div className={`w-4 h-4 rounded-full mr-2 bg-gradient-to-r ${theme.from} ${theme.to}`}></div>
                  <span>{theme.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    
    {/* Field Management */}
    <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Fields</h2>
        <button 
          onClick={() => setPreviewMode(!previewMode)}
          className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
        >
          {previewMode ? <Edit size={16} className="mr-2" /> : <Eye size={16} className="mr-2" />}
          {previewMode ? 'Edit Mode' : 'Preview'}
        </button>
      </div>
      
      {previewMode ? (
        /* Preview Mode */
        <div className="space-y-4 max-w-md mx-auto">
          <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold mb-2">
                {displayName.split(' ').map(n => n[0]).join('')}
              </div>
              <h2 className="text-xl font-bold">{displayName}</h2>
              <p className="text-gray-400">@{username}</p>
            </div>
            
            <div className="space-y-3">
              {fields.map((field) => (
                field.title && field.link ? (
                  <a 
                    key={field.id}
                    href={field.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`flex items-center p-3 rounded-lg text-white ${getGradientClasses()}`}
                  >
                    {field.image && (
                      <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                        <img src={field.image} alt={field.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <span>{field.title}</span>
                  </a>
                ) : null
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Edit Mode */
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.id} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium">Field #{field.id}</h3>
                <button 
                  onClick={() => deleteField(field.id)}
                  className="p-1 text-red-400 hover:text-red-300"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">Title</label>
                  <input 
                    type="text" 
                    value={field.title} 
                    onChange={(e) => updateField(field.id, 'title', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2"
                    placeholder="LinkedIn"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Link</label>
                  <input 
                    type="text" 
                    value={field.link} 
                    onChange={(e) => updateField(field.id, 'link', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-gray-400 mb-1">Image URL (Optional)</label>
                <input 
                  type="text" 
                  value={field.image} 
                  onChange={(e) => updateField(field.id, 'image', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2"
                  placeholder="https://example.com/image.png"
                />
              </div>
            </div>
          ))}
          
          <button 
            onClick={addField}
            className="w-full p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-dashed border-gray-600 flex items-center justify-center"
          >
            <Plus size={18} className="mr-2" />
            <span>Add New Field</span>
          </button>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <button 
          onClick={() => setPreviewMode(!previewMode)}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
        >
          {previewMode ? 'Back to Editing' : 'Preview'}
        </button>
        <button 
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 rounded-lg"
        >
          <Save size={18} className="inline mr-2" />
          Save Changes
        </button>
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