"use client";
import React, { useEffect, useState } from 'react';
import { User, BarChart3, Settings, ClipboardList, LogOut, Globe, Link2, Users, ArrowUpRight, Plus, Edit, Eye, Save, Trash2, ChevronDown, Calendar, Clock, Smartphone, Laptop, Download, Tag } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend, AreaChart, Area } from 'recharts';
import { signIn, useSession } from 'next-auth/react';
import AuthButton from '@/components/auth-button/AuthButton';
import { QRCodeSVG } from 'qrcode.react';
import Image from 'next/image';
import PromoCodeInput from '@/components/promo-code-input/PromoCodeInput';

type Props = {};

// Define data types based on MongoDB schema
interface ClickData {
  linkId: string;
  timestamp: Date;
  country: string;
  device: string;
  ip: string;
}

interface AnalyticsData {
  rinnkuUrl: string;
  totalVisits: number;
  clicks: ClickData[];
  createdAt: Date;
}

interface FieldType {
  id: number;
  title: string;
  link: string;
  image: string;
  clicks?: number; // Track clicks for each link
}

// Theme options for customization
const themeOptions = [
  { id: 'midnight', name: 'Midnight Purple', from: 'from-indigo-500', to: 'to-purple-600' },
  { id: 'ocean', name: 'Ocean Blue', from: 'from-blue-500', to: 'to-cyan-600' },
  { id: 'sunset', name: 'Sunset Orange', from: 'from-orange-500', to: 'to-red-600' },
  { id: 'forest', name: 'Forest Green', from: 'from-green-500', to: 'to-emerald-600' },
  { id: 'royal', name: 'Royal Gold', from: 'from-yellow-500', to: 'to-amber-600' },
];

const DashboardPage = (props: Props) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState('week'); // 'day', 'week', 'month', 'year'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState('johndoe');
  const [displayName, setDisplayName] = useState('John Doe');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isProfilePublic, setIsProfilePublic] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState(themeOptions[0]);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [fields, setFields] = useState<FieldType[]>([
    { id: 1, title: 'Portfolio', link: 'https://portfolio.com', image: '', clicks: 215 },
    { id: 2, title: 'LinkedIn', link: 'https://linkedin.com', image: '', clicks: 432 },
    { id: 3, title: 'Twitter', link: 'https://twitter.com', image: '', clicks: 187 },
  ]);
  const [previewMode, setPreviewMode] = useState(false);

  // Fetch analytics data
  const fetchAnalyticsData = async () => {
    try {
      // This would be replaced with your actual API call
      // const response = await fetch('/api/analytics');
      // const data = await response.json();
      
      // Mock data for demonstration
      const mockAnalyticsData: AnalyticsData = {
        rinnkuUrl: 'johndoe',
        totalVisits: 24892,
        clicks: generateMockClicks(300),
        createdAt: new Date('2024-12-01')
      };
      
      setAnalyticsData(mockAnalyticsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setLoading(false);
    }
  };

  // Generate mock click data
  const generateMockClicks = (count: number): ClickData[] => {
    const countries = ['United States', 'India', 'Germany', 'United Kingdom', 'Canada', 'Japan', 'France', 'Australia', 'Brazil', 'Mexico'];
    const devices = ['Mobile', 'Desktop', 'Tablet'];
    const clicks: ClickData[] = [];

    // Generate clicks over the past 90 days with more recent dates being more common
    for (let i = 0; i < count; i++) {
      const daysAgo = Math.floor(Math.pow(Math.random(), 2) * 90); // Bias towards recent dates
      const timestamp = new Date();
      timestamp.setDate(timestamp.getDate() - daysAgo);
      
      // Random time within that day
      timestamp.setHours(Math.floor(Math.random() * 24));
      timestamp.setMinutes(Math.floor(Math.random() * 60));
      
      clicks.push({
        linkId: [fields[0].id, fields[1].id, fields[2].id][Math.floor(Math.random() * fields.length)].toString(),
        timestamp: timestamp,
        country: countries[Math.floor(Math.random() * countries.length)],
        device: devices[Math.floor(Math.random() * devices.length)],
        ip: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`
      });
    }
    
    // Sort by timestamp
    return clicks.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  useEffect(() => {
    if (status === "loading") return;

    console.log("Session status:", status, "Session data:", session);

    if (status === "unauthenticated") {
      setTimeout(() => {
        window.location.href = "/auth";
      }, 5000);
    } else if (status === "authenticated") {
      fetchAnalyticsData();
    }
  }, [status, session]);

  // Prepare derived data for charts
  const prepareVisitorData = () => {
    if (!analyticsData) return [];
    
    const timeRangeMap = {
      'day': { unit: 'hour', count: 24, format: (d: Date) => d.getHours() + ':00' },
      'week': { unit: 'day', count: 7, format: (d: Date) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()] },
      'month': { unit: 'day', count: 30, format: (d: Date) => d.getDate() },
      'year': { unit: 'month', count: 12, format: (d: Date) => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()] }
    };
    
    const { unit, count, format } = timeRangeMap[timeRange as keyof typeof timeRangeMap];
    
    // Create buckets
    const now = new Date();
    const buckets: Record<string, { label: string, visits: number, clicks: number }> = {};
    
    for (let i = 0; i < count; i++) {
      const date = new Date();
      if (unit === 'hour') {
        date.setHours(now.getHours() - i, 0, 0, 0);
      } else if (unit === 'day') {
        date.setDate(now.getDate() - i);
        date.setHours(0, 0, 0, 0);
      } else if (unit === 'month') {
        date.setMonth(now.getMonth() - i, 1);
        date.setHours(0, 0, 0, 0);
      }
      
      const label = format(date);
      buckets[label.toString()] = { label: label.toString(), visits: 0, clicks: 0 };
    }
    
    // Fill with data
    analyticsData.clicks.forEach(click => {
      const date = new Date(click.timestamp);
      let label;
      
      if (unit === 'hour') {
        label = date.getHours() + ':00';
      } else if (unit === 'day') {
        label = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
      } else if (unit === 'month') {
        label = date.getDate().toString();
      } else {
        label = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()];
      }
      
      // Only count if within the time range
      const timeDiff = now.getTime() - date.getTime();
      const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
      
      if ((timeRange === 'day' && daysDiff <= 1) ||
          (timeRange === 'week' && daysDiff <= 7) ||
          (timeRange === 'month' && daysDiff <= 30) ||
          (timeRange === 'year' && daysDiff <= 365)) {
        if (buckets[label]) {
          buckets[label].clicks += 1;
          // Assuming each click also counts as a visit
          buckets[label].visits += 1;
        }
      }
    });
    
    return Object.values(buckets).reverse();
  };

  const prepareCountryData = () => {
    if (!analyticsData) return [];
    
    const countryMap: Record<string, number> = {};
    
    analyticsData.clicks.forEach(click => {
      countryMap[click.country] = (countryMap[click.country] || 0) + 1;
    });
    
    return Object.entries(countryMap)
      .map(([country, visits]) => ({ country, visits, percentage: Math.round((visits / analyticsData.clicks.length) * 100) }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 5);
  };

  const prepareDeviceData = () => {
    if (!analyticsData) return [];
    
    const deviceMap: Record<string, number> = {};
    
    analyticsData.clicks.forEach(click => {
      deviceMap[click.device] = (deviceMap[click.device] || 0) + 1;
    });
    
    return Object.entries(deviceMap)
      .map(([device, count]) => ({ device, count, percentage: Math.round((count / analyticsData.clicks.length) * 100) }));
  };

  const prepareLinkPerformance = () => {
    if (!analyticsData || !fields) return [];
    
    const linkClickMap: Record<string, number> = {};
    
    analyticsData.clicks.forEach(click => {
      linkClickMap[click.linkId] = (linkClickMap[click.linkId] || 0) + 1;
    });
    
    return fields.map(field => {
      const clicks = linkClickMap[field.id.toString()] || 0;
      // Calculate growth (mock data for now)
      const growth = Math.round((Math.random() * 20) - 5) + '%';
      const growthDirection = growth.startsWith('-') ? 'negative' : 'positive';
      
      return {
        id: field.id,
        name: field.title,
        clicks,
        growth,
        growthDirection
      };
    }).sort((a, b) => b.clicks - a.clicks);
  };

  const prepareRecentLogs = () => {
    if (!analyticsData) return [];
    
    return analyticsData.clicks.slice(0, 10).map((click, index) => {
      const now = new Date();
      const clickTime = new Date(click.timestamp);
      const diffMs = now.getTime() - clickTime.getTime();
      
      let timeAgo;
      if (diffMs < 60000) {
        timeAgo = 'Just now';
      } else if (diffMs < 3600000) {
        timeAgo = `${Math.floor(diffMs / 60000)} minutes ago`;
      } else if (diffMs < 86400000) {
        timeAgo = `${Math.floor(diffMs / 3600000)} hours ago`;
      } else {
        timeAgo = `${Math.floor(diffMs / 86400000)} days ago`;
      }
      
      const field = fields.find(f => f.id.toString() === click.linkId);
      
      return {
        id: index,
        country: click.country,
        time: timeAgo,
        page: field ? field.title : 'Unknown',
        device: click.device,
        ip: click.ip
      };
    });
  };

  const prepareHourlyActivityData = () => {
    if (!analyticsData) return [];
    
    const hourlyData = Array(24).fill(0).map((_, i) => ({ hour: i, visits: 0 }));
    
    analyticsData.clicks.forEach(click => {
      const hour = new Date(click.timestamp).getHours();
      hourlyData[hour].visits++;
    });
    
    return hourlyData;
  };

  // Process data for charts
  const visitorData = prepareVisitorData();
  const countryData = prepareCountryData();
  const deviceData = prepareDeviceData();
  const popularLinks = prepareLinkPerformance();
  const recentLogs = prepareRecentLogs();
  const hourlyActivityData = prepareHourlyActivityData();

  // Colors for charts
  const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'];
  const DEVICE_COLORS = {
    'Mobile': '#6366f1',
    'Desktop': '#8b5cf6',
    'Tablet': '#a855f7'
  };

  // Calculate growth metrics
  const calculateGrowth = (currentValue: number, previousValue: number) => {
    if (previousValue === 0) return '100%';
    const growth = ((currentValue - previousValue) / previousValue) * 100;
    return growth > 0 ? `+${growth.toFixed(1)}%` : `${growth.toFixed(1)}%`;
  };

  // Add new field
  const addField = () => {
    const newId = fields.length > 0 ? Math.max(...fields.map(f => f.id)) + 1 : 1;
    setFields([...fields, { id: newId, title: '', link: '', image: '', clicks: 0 }]);
  };

  // Delete field
  const deleteField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
  };
  
  const updateField = (id: number, key: keyof FieldType, value: string | number) => {
    setFields(fields.map((field) =>
      field.id === id ? { ...field, [key]: value } : field
    ));
  };

  // Get gradient classes based on selected theme
  const getGradientClasses = () => {
    return `bg-gradient-to-r ${selectedTheme.from} ${selectedTheme.to}`;
  };

  // Export analytics data
  const exportAnalyticsData = () => {
    if (!analyticsData) return;
    
    // Prepare CSV data
    const headers = ['Timestamp', 'Country', 'Device', 'IP', 'Link'];
    const rows = analyticsData.clicks.map(click => {
      const field = fields.find(f => f.id.toString() === click.linkId);
      return [
        new Date(click.timestamp).toISOString(),
        click.country,
        click.device,
        click.ip,
        field?.title || 'Unknown'
      ];
    });
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `rinkuu-analytics-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <span className="ml-2 text-white">🔄 Loading analytics data...</span>
      </div>
    );
  }

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
        <Image src="https://cdn-icons-png.flaticon.com/128/432/432492.png" height={40} width={20} className='mr-2' alt="diamond"/>
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
            <li>
              <button 
                onClick={() => {setActiveTab('promocode'); setSidebarOpen(false);}}
                className={`flex items-center w-full p-2 rounded-lg ${activeTab === 'promocode' ? 'bg-gray-800' : 'hover:bg-gray-800/40'}`}
              >
                <Tag size={18} className={activeTab === 'promocode' ? 'text-purple-400' : 'text-gray-400'} />
                <span className="ml-3">Promo code</span>
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
              {activeTab === 'promocode' && 'Promo code'}
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800"
              >
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
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 flex flex-row items-between justify-between ">
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

                <QRCodeSVG value={`https://rinnku.vercel.app/@${username}`} bgColor='white' level="H" marginSize={2} title={displayName} minVersion={1} imageSettings={
                  {
                    src: '/logo.png',
                    height: 100,
                    width: 100,
                    excavate: false,
                  }
                }/>
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

{activeTab === 'promocode' && (
  <PromoCodeInput/>
)}


          
          {/* Dashboard Section */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Time range selector */}
              <div className="flex items-center justify-between bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                <h3 className="font-medium">Time Range</h3>
                <div className="flex space-x-2">
                  {['day', 'week', 'month', 'year'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1 rounded-lg ${timeRange === range ? getGradientClasses() : 'bg-gray-800'}`}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="bg-gray-900/50 p-4 md:p-6 rounded-xl border border-gray-800">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-gray-400">Total Visitors</h3>
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                      <Users size={20} className="text-indigo-400" />
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold">{analyticsData?.totalVisits?.toLocaleString() || '0'}</p>
                  <div className="flex items-center mt-2 text-green-500">
                    <ArrowUpRight size={16} />
                    <span className="text-sm ml-1">12.5% increase</span>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-gray-400">Average Session</h3>
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Clock size={20} className="text-purple-400" />
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold">4m 32s</p>
                  <div className="flex items-center mt-2 text-green-500">
                    <ArrowUpRight size={16} />
                    <span className="text-sm ml-1">8.2% increase</span>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-gray-400">Link Clicks</h3>
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <Link2 size={20} className="text-green-400" />
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold">{fields.reduce((sum, field) => sum + (field.clicks || 0), 0).toLocaleString()}</p>
                  <div className="flex items-center mt-2 text-green-500">
                    <ArrowUpRight size={16} />
                    <span className="text-sm ml-1">15.3% increase</span>
                  </div>
                </div>
                
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-gray-400">Conversion Rate</h3>
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <BarChart3 size={20} className="text-amber-400" />
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold">3.27%</p>
                  <div className="flex items-center mt-2 text-red-500">
                    <ArrowUpRight size={16} className="transform rotate-90" />
                    <span className="text-sm ml-1">2.1% decrease</span>
                  </div>
                </div>
              </div>

              {/* Visitor Chart */}
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="font-medium mb-6">Visitor Analytics</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={visitorData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="label" 
                        tick={{ fill: '#9ca3af' }}
                        tickLine={{ stroke: '#4b5563' }}
                      />
                      <YAxis 
                        tick={{ fill: '#9ca3af' }}
                        tickLine={{ stroke: '#4b5563' }}
                      />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#4b5563" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }}
                        itemStyle={{ color: '#d1d5db' }}
                        labelStyle={{ color: '#f9fafb' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="visits" 
                        stroke="#6366f1" 
                        fillOpacity={1} 
                        fill="url(#colorVisits)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="clicks" 
                        stroke="#8b5cf6" 
                        fillOpacity={1} 
                        fill="url(#colorClicks)" 
                      />
                      <Legend />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Popular Links and Device Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Popular Links */}
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                  <h3 className="font-medium mb-6">Link Performance</h3>
                  <div className="space-y-4">
                    {popularLinks.map((link) => (
                      <div key={link.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                            <Link2 size={16} className="text-indigo-400" />
                          </div>
                          <span className="ml-3 font-medium">{link.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{link.clicks.toLocaleString()}</p>
                          <p className={`text-xs ${link.growthDirection === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                            {link.growth}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Device Distribution */}
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                  <h3 className="font-medium mb-6">Device Distribution</h3>
                  <div className="flex items-center">
                    <div className="w-1/2 h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={deviceData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="count"
                          >
                            {deviceData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={DEVICE_COLORS[entry.device as keyof typeof DEVICE_COLORS] || COLORS[index % COLORS.length]} 
                              />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }}
                            itemStyle={{ color: '#d1d5db' }}
                            labelStyle={{ color: '#f9fafb' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="w-1/2">
                      <div className="space-y-4">
                        {deviceData.map((entry, index) => (
                          <div key={index} className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: DEVICE_COLORS[entry.device as keyof typeof DEVICE_COLORS] || COLORS[index % COLORS.length] }} 
                            />
                            <div>
                              <p className="font-medium">{entry.device}</p>
                              <p className="text-gray-400 text-sm">{entry.percentage}%</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Geographic Distribution and Daily Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Geographic Distribution */}
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                  <h3 className="font-medium mb-6">Geographic Distribution</h3>
                  <div className="space-y-4">
                    {countryData.map((country, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Globe size={16} className="text-gray-400 mr-2" />
                          <span>{country.country}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-400">{country.percentage}%</span>
                          <div className="w-24 bg-gray-800 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600" 
                              style={{ width: `${country.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Hourly Activity */}
                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                  <h3 className="font-medium mb-6">Hourly Activity</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={hourlyActivityData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <XAxis 
                          dataKey="hour" 
                          tick={{ fill: '#9ca3af' }}
                          tickLine={{ stroke: '#4b5563' }}
                          tickFormatter={(hour) => `${hour}:00`}
                        />
                        <YAxis 
                          tick={{ fill: '#9ca3af' }}
                          tickLine={{ stroke: '#4b5563' }}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#111827', borderColor: '#374151' }}
                          itemStyle={{ color: '#d1d5db' }}
                          labelStyle={{ color: '#f9fafb' }}
                          formatter={(value, name) => [`${value} visits`, `${name}`]}
                          labelFormatter={(hour) => `Hour ${hour}:00`}
                        />
                        <Bar dataKey="visits" fill="#6366f1" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Export Data Button */}
              <div className="flex justify-end">
                <button 
                  onClick={exportAnalyticsData}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white"
                >
                  <Download size={16} className="mr-2" />
                  Export Analytics Data
                </button>
              </div>
            </div>
          )}

          {/* Customization Section */}
          {activeTab === 'customization' && (
            <div className="space-y-6">
              {/* Profile URL */}
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="font-medium mb-4">Profile URL</h3>
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex-1">
                    <div className="flex items-center p-2 bg-gray-800 rounded-lg">
                      <span className="text-gray-400">rinkuu.app/</span>
                      <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none"
                      />
                    </div>
                  </div>
                  <button className="mt-3 md:mt-0 md:ml-3 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
                    Save
                  </button>
                </div>
              </div>
              
              {/* Display Name */}
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="font-medium mb-4">Display Name</h3>
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex-1">
                    <input 
                      type="text" 
                      value={displayName} 
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full p-2 bg-gray-800 rounded-lg border-none outline-none"
                    />
                  </div>
                  <button className="mt-3 md:mt-0 md:ml-3 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
                    Save
                  </button>
                </div>
              </div>
              
              {/* Theme Selection */}
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="font-medium mb-4">Theme</h3>
                <div className="relative">
                  <button 
                    onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                    className="flex items-center justify-between w-full p-2 bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-2 bg-gradient-to-r ${selectedTheme.from} ${selectedTheme.to}`}></div>
                      <span>{selectedTheme.name}</span>
                    </div>
                    <ChevronDown size={16} />
                  </button>
                  
                  {themeDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-800 rounded-lg shadow-lg z-10">
                    <div className="p-2">
                      {themeOptions.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => {
                            setSelectedTheme(theme);
                            setThemeDropdownOpen(false);
                          }}
                          className={`flex items-center w-full p-2 rounded-lg hover:bg-gray-800 ${
                            selectedTheme.id === theme.id ? 'bg-gray-800' : ''
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full mr-2 bg-gradient-to-r ${theme.from} ${theme.to}`}></div>
                          <span>{theme.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Links Management */}
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-medium">Links</h3>
                <div className="flex items-center">
                  <button 
                    onClick={() => setPreviewMode(!previewMode)}
                    className="flex items-center px-3 py-1 bg-gray-800 rounded-lg mr-2"
                  >
                    {previewMode ? <Edit size={16} className="mr-1" /> : <Eye size={16} className="mr-1" />}
                    {previewMode ? 'Edit' : 'Preview'}
                  </button>
                  <button 
                    onClick={addField}
                    className="flex items-center px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Link
                  </button>
                </div>
              </div>
              
              {previewMode ? (
                <div className="max-w-md mx-auto">
                  {fields.map((field) => (
                  <div 
                    key={field.id}
                    className={`mb-4 p-4 rounded-lg ${getGradientClasses()} flex items-center justify-between`}
                  >
                    <div className="flex items-center">
                    {field.image ? (
                      <img src={field.image} alt={field.title} className="w-8 mr-6 h-8 rounded-full mr-3" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-700 mr-3"></div>
                    )}
                    <span className="text-white font-medium" style={{fontFamily: "Poppins"}}>{field.title}</span>
                    </div>
                    <ArrowUpRight size={16} className="text-white" />
                  </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {fields.map((field) => (
                    <div 
                      key={field.id}
                      className="p-4 bg-gray-800/50 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium">Link #{field.id}</h4>
                        <button 
                          onClick={() => deleteField(field.id)}
                          className="p-1 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">Title</label>
                          <input 
                            type="text" 
                            value={field.title} 
                            onChange={(e) => updateField(field.id, 'title', e.target.value)}
                            className="w-full p-2 bg-gray-900 rounded-lg border border-gray-700"
                            placeholder="Enter link title"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">Icon/Logo Url</label>
                          <input 
                            type="text" 
                            value={field.image} 
                            onChange={(e) => updateField(field.id, 'image', e.target.value)}
                            className="w-full p-2 bg-gray-900 rounded-lg border border-gray-700"
                            placeholder="Enter media url"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">URL</label>
                          <input 
                            type="text" 
                            value={field.link} 
                            onChange={(e) => updateField(field.id, 'link', e.target.value)}
                            className="w-full p-2 bg-gray-900 rounded-lg border border-gray-700"
                            placeholder="https://example.com"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Save Button */}
            <div className="flex justify-end">
              <button className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
                <Save size={16} className="mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        )}
        
        {/* Logs Section */}
        {activeTab === 'logs' && (
          <div className="space-y-6">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="font-medium mb-6">Recent Activity</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-800">
                      <th className="pb-3 font-medium">Country</th>
                      <th className="pb-3 font-medium">Time</th>
                      <th className="pb-3 font-medium">Page</th>
                      <th className="pb-3 font-medium">Device</th>
                      <th className="pb-3 font-medium">IP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLogs.map((log) => (
                      <tr key={log.id} className="border-b border-gray-800">
                        <td className="py-3">
                          <div className="flex items-center">
                            <Globe size={16} className="text-gray-400 mr-2" />
                            <span>{log.country}</span>
                          </div>
                        </td>
                        <td className="py-3 text-gray-400">{log.time}</td>
                        <td className="py-3">{log.page}</td>
                        <td className="py-3">
                          <div className="flex items-center">
                            {log.device === 'Mobile' ? (
                              <Smartphone size={16} className="text-indigo-400 mr-1" />
                            ) : (
                              <Laptop size={16} className="text-purple-400 mr-1" />
                            )}
                            <span>{log.device}</span>
                          </div>
                        </td>
                        <td className="py-3 text-gray-400">HIDDEN</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Export Activity Logs */}
            <div className="flex justify-end">
              <button 
                onClick={exportAnalyticsData}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white"
              >
                <Download size={16} className="mr-2" />
                Export Activity Logs
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  </div>
);
};

export default DashboardPage;