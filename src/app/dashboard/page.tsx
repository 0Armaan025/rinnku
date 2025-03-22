"use client";
import React, { useEffect, useState } from 'react';
import { User, BarChart3, Settings, ClipboardList, LogOut, Globe, Link2, Users, ArrowUpRight, Plus, Edit, Eye, Save, Trash2, ChevronDown, Calendar, Clock, Smartphone, Laptop, Download, Tag } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend, AreaChart, Area } from 'recharts';
import { signIn, signOut, useSession } from 'next-auth/react';
import AuthButton from '@/components/auth-button/AuthButton';
import { QRCodeSVG } from 'qrcode.react';
import Image from 'next/image';
import PromoCodeInput from '@/components/promo-code-input/PromoCodeInput';
import CustomizationComponent from '@/components/customizaton/CustomizationComponent';
import ProfileComponent from '@/components/profile/ProfileComponent';
import AnalyticsComponent from '@/components/analytics/AnalyticsComponent';
import { getCurrentUser, getStats } from '../utils/api';


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


const DashboardPage = (props: Props) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState('week'); // 'day', 'week', 'month', 'year'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState('johndoe');
  const [avatar, setAvatar] = useState('');
  const [displayName, setDisplayName] = useState('John Doe');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [email, setEmail] = useState('johndoe@gmail.com');
  const [rinnkuUrl, setRinnkuUrl] = useState('');
  const [isProfilePublic, setIsProfilePublic] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  
  const [promoCode, setPromoCode] = useState('');
  
const [fields, setFields] = useState<FieldType[]>([
        { id: 1, title: 'Portfolio', link: 'https://portfolio.com', image: '', clicks: 215 },
        { id: 2, title: 'LinkedIn', link: 'https://linkedin.com', image: '', clicks: 432 },
        { id: 3, title: 'Twitter', link: 'https://twitter.com', image: '', clicks: 187 },
      ]);

  // Fetch analytics data
  const fetchAnalyticsData = async () => {
    try {
      // This would be replaced with your actual API call
      // const response = await fetch('/api/analytics');
      // const data = await response.json();
      setLoading(true);
      
      // Mock data for demonstration
      try {
        
        

        if(!token) {
          
        }
        else {

          const data = await getStats(token, displayName);
          setAnalyticsData(data);
        }

      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    }
    catch(e) {

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

  const fetchUserData = async () => {
    // todo: fetch the data

   
    if(!localStorage.getItem("token")) return alert("Please login first");
    const response = await getCurrentUser(localStorage.getItem("token"));
    console.log(response);
    try {

      if(response.avatar!="") {
        setAvatar(response.avatar);
      }

      setUsername(response.name);
      if(response.name) {
        setDisplayName(response.name);
        
      }
      else {
        setDisplayName(response.email);
      }
      setEmail(response.email);
    }
    catch(e) {
      alert("error, sorry man!");

    }
      
    
    
    
  }

  

  useEffect(() => {
    if (status === "loading") return;
  
    console.log("Session status:", status, "Session data:", session);
  
    async function fetchToken() {
      try {
        const storedToken = localStorage.getItem("token");
  
        if (storedToken && storedToken !== "") {
          setToken(storedToken);
        } else {
          console.log("bsdk, token toh yeh hai:", session?.accessToken);
          const accessToken = session?.accessToken;
          localStorage.setItem("token", accessToken as string);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    }
  
    fetchToken();
  
    setTimeout(() => {
      if (localStorage.getItem("token") && localStorage.getItem("token") !== "") {
        fetchAnalyticsData();
        fetchUserData();
      } else {
        if (status === "unauthenticated") {
          setTimeout(() => {
            window.location.href = "/auth";
          }, 5000);
        } else if (status === "authenticated") {
          fetchAnalyticsData();
          fetchUserData();
        }
      }
    }, 1500); // ⏳ Wait for 1.5 seconds before calling these functions
  }, [status, session]);
  

  // Prepare derived data for charts
  const prepareVisitorData = () => {
    if (!analyticsData || !Array.isArray(analyticsData.clicks)) {
        console.log("analyticsData is undefined or clicks is not an array:", analyticsData);
        return [{ label: 'No data yet', visits: 0, clicks: 0 }];
    }

    const timeRangeMap = {
      'day': { unit: 'hour', count: 24, format: (d: Date) => d.getHours() + ':00' },
      'week': { unit: 'day', count: 7, format: (d: Date) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()] },
      'month': { unit: 'day', count: 30, format: (d: Date) => d.getDate().toString() },
      'year': { unit: 'month', count: 12, format: (d: Date) => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()] }
    };

    const { unit, count, format } = timeRangeMap[timeRange as keyof typeof timeRangeMap];

    const now = new Date();
    const buckets: Record<string, { label: string, visits: number, clicks: number }> = {};

    for (let i = 0; i < count; i++) {
      const date = new Date();
      if (unit === 'hour') date.setHours(now.getHours() - i, 0, 0, 0);
      else if (unit === 'day') date.setDate(now.getDate() - i);
      else if (unit === 'month') date.setMonth(now.getMonth() - i, 1);

      const label = format(date);
      buckets[label.toString()] = { label: label.toString(), visits: 0, clicks: 0 };
    }

    console.log("Buckets initialized:", buckets);

    const clicks = analyticsData.clicks ?? [];
    
if(clicks) {
  clicks.forEach(click => {
    const date = new Date(click.timestamp);
    const label = format(date);

    if (buckets[label]) {
      buckets[label].clicks += 1;
      buckets[label].visits += 1;
    }
  });  

    }
    
    

    return Object.values(buckets).reverse();
};

  const prepareCountryData = () => {
    if (!analyticsData || !analyticsData.clicks) return [];
    
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
    if (!analyticsData || !analyticsData.clicks) return [];
    
    const deviceMap: Record<string, number> = {};
    
    analyticsData.clicks.forEach(click => {
      deviceMap[click.device] = (deviceMap[click.device] || 0) + 1;
    });
    
    return Object.entries(deviceMap)
      .map(([device, count]) => ({ device, count, percentage: Math.round((count / analyticsData.clicks.length) * 100) }));
  };

  const prepareLinkPerformance = () => {
    if (!analyticsData || !fields || !analyticsData.clicks) return [];
    
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
    if (!analyticsData || !analyticsData.clicks) return [];
    
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
    if (!analyticsData || !analyticsData.clicks) return [];
    
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
  
  // Export analytics data
  const exportAnalyticsData = () => {
    if (!analyticsData || !analyticsData.clicks) return;
    
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

  const getInitials = (): string => {
    return displayName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
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
        <div 
              className={`w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600'`}
              
  
          >
            {avatar ? (
              <img src={avatar} 
              className="w-full h-full object-cover"/>
            ) : (
            <span className="text-white text-2xl font-bold">{getInitials()}</span>
            )} 
            
          </div>
          <div className="ml-3">
            <p className="text-gray-200">{displayName}</p>
            <p className="text-gray-400 text-sm">Administrator</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li className='cursor-pointer'>
              <button 
                onClick={() => {setActiveTab('profile'); setSidebarOpen(false);}}
                className={`flex items-center w-full p-2 cursor-pointer rounded-lg ${activeTab === 'profile' ? 'bg-gray-800' : 'hover:bg-gray-800/40'}`}
              >
                <User size={18} className={activeTab === 'profile' ? 'text-purple-400' : 'text-gray-400'} />
                <span className="ml-3">Profile</span>
              </button>
            </li>
            <li className='cursor-pointer'>
              <button 
                onClick={() => {setActiveTab('dashboard'); setSidebarOpen(false);}}
                className={`flex items-center w-full cursor-pointer p-2 rounded-lg ${activeTab === 'dashboard' ? 'bg-gray-800' : 'hover:bg-gray-800/40'}`}
              >
                <BarChart3 size={18} className={activeTab === 'dashboard' ? 'text-purple-400' : 'text-gray-400'} />
                <span className="ml-3">Dashboard</span>
              </button>
            </li>
            <li className='cursor-pointer'>
              <button 
                onClick={() => {setActiveTab('customization'); setSidebarOpen(false);}}
                className={`flex items-center w-full  cursor-pointer  p-2 rounded-lg ${activeTab === 'customization' ? 'bg-gray-800' : 'hover:bg-gray-800/40'}`}
              >
                <Settings size={18} className={activeTab === 'customization' ? 'text-purple-400' : 'text-gray-400'} />
                <span className="ml-3">Customization</span>
              </button>
            </li>
           
            <li className='cursor-pointer'>
              <button 
                onClick={() => {setActiveTab('promocode'); setSidebarOpen(false);}}
                className={`flex items-center w-full cursor-pointer  p-2 rounded-lg ${activeTab === 'promocode' ? 'bg-gray-800' : 'hover:bg-gray-800/40'}`}
              >
                <Tag size={18} className={activeTab === 'promocode' ? 'text-purple-400' : 'text-gray-400'} />
                <span className="ml-3">Promo code</span>
              </button>
            </li>
          </ul>
        </nav>
        
        {/* Logout button */}
        <div className="p-4 border-t border-gray-800">
          <button
          onClick={() => {
            signOut();
            localStorage.setItem("token", "");
          }}
          className="flex items-center w-full p-2 rounded-lg cursor-pointer hover:bg-gray-800/40">
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
              {/* <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800"
              >
                <Settings size={18} />
              </button> */}

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
              
              {/* <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                JD
              </div> */}
            </div>
          </div>
        </header>
        
        {/* Content based on active tab */}
        <main className="p-4 md:p-6">
          {/* Profile Section */}
          {activeTab === 'profile' && (
           <ProfileComponent displayName={displayName} avatar={avatar} email="armaan33000@gmail.com" rinnkuUrl={username} />
          )}

{activeTab === 'promocode' && (
  <PromoCodeInput/>
)}


          
          {/* Dashboard Section */}
          {activeTab === 'dashboard' && (
            //  id: number;
            //  title: string;
            //  link: string;
            //  image: string;
            //  clicks?: number;
            <AnalyticsComponent analyticsData={analyticsData} links={[
              {
                id: 30,
                title: "Google",
                link: "https://google.com",
                image: "https://cdn-icons-png.flaticon.com/128/432/432492.png",
                clicks: 100
              }
            ]}/>
          )}

          {/* Customization Section */}
          {activeTab === 'customization' && (
            <CustomizationComponent/>
        )}
        
        {/* Logs Section */}
        
      </main>
    </div>
  </div>
);
};

export default DashboardPage;