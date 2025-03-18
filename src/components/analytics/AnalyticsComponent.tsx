import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Link2, Clock, Globe, ArrowUpRight, Download, Smartphone, Laptop } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid, Legend, AreaChart, Area } from 'recharts';

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

interface LinkType {
  id: number;
  title: string;
  link: string;
  image: string;
  clicks?: number;
}

interface AnalyticsComponentProps {
  analyticsData: AnalyticsData | null;
  links: LinkType[];
}

const AnalyticsComponent: React.FC<AnalyticsComponentProps> = ({ analyticsData, links }) => {
  const [timeRange, setTimeRange] = useState('week'); // 'day', 'week', 'month', 'year'
  
  // Colors for charts
  const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'];
  const DEVICE_COLORS = {
    'Mobile': '#6366f1',
    'Desktop': '#8b5cf6',
    'Tablet': '#a855f7'
  };

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
    if (!analyticsData || !links) return [];
    
    const linkClickMap: Record<string, number> = {};
    
    analyticsData.clicks.forEach(click => {
      linkClickMap[click.linkId] = (linkClickMap[click.linkId] || 0) + 1;
    });
    
    return links.map(link => {
      const clicks = linkClickMap[link.id.toString()] || 0;
      // Calculate growth (mock data for now)
      const growth = Math.round((Math.random() * 20) - 5) + '%';
      const growthDirection = growth.startsWith('-') ? 'negative' : 'positive';
      
      return {
        id: link.id,
        name: link.title,
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
      
      const link = links.find(f => f.id.toString() === click.linkId);
      
      return {
        id: index,
        country: click.country,
        time: timeAgo,
        page: link ? link.title : 'Unknown',
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

  // Export analytics data
  const exportAnalyticsData = () => {
    if (!analyticsData) return;
    
    // Prepare CSV data
    const headers = ['Timestamp', 'Country', 'Device', 'IP', 'Link'];
    const rows = analyticsData.clicks.map(click => {
      const link = links.find(f => f.id.toString() === click.linkId);
      return [
        new Date(click.timestamp).toISOString(),
        click.country,
        click.device,
        click.ip,
        link?.title || 'Unknown'
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

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
  };

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Analytics Overview</h2>
        <div className="inline-flex bg-gray-800 rounded-lg">
          {['day', 'week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => handleTimeRangeChange(range)}
              className={`px-3 py-1 text-sm ${timeRange === range 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg' 
                : 'text-gray-400'}`}
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
          <p className="text-2xl md:text-3xl font-bold">{links.reduce((sum, link) => sum + (link.clicks || 0), 0).toLocaleString()}</p>
          <div className="flex items-center mt-2 text-green-500">
            <ArrowUpRight size={16} />
            <span className="text-sm ml-1">15.3% increase</span>
          </div>
        </div>
        
        <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-400">Conversion Rate</h3>
            <div className="p-2 bg-pink-500/20 rounded-lg">
              <BarChart3 size={20} className="text-pink-400" />
            </div>
          </div>
          <p className="text-2xl md:text-3xl font-bold">5.8%</p>
          <div className="flex items-center mt-2 text-green-500">
            <ArrowUpRight size={16} />
            <span className="text-sm ml-1">2.1% increase</span>
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

      {/* Recent Activity Logs */}
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
  );
};

export default AnalyticsComponent;