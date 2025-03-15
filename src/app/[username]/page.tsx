// app/[username]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

const DUMMY_DATA = {
  name: "Jane Doe",
  username: "janedoe",
  email: "jane@example.com",
  avatar: "/api/placeholder/300/300", // Placeholder image
  links: [
    { id: 1, title: "My Portfolio", url: "https://portfolio.example.com", icon: "/api/placeholder/32/32" },
    { id: 2, title: "GitHub", url: "https://github.com", icon: "/api/placeholder/32/32" },
    { id: 3, title: "Twitter", url: "https://twitter.com", icon: "/api/placeholder/32/32" },
    { id: 4, title: "YouTube Channel", url: "https://youtube.com", icon: "/api/placeholder/32/32" },
    { id: 5, title: "LinkedIn", url: "https://linkedin.com", icon: "/api/placeholder/32/32" },
  ]
};

// Theme options as provided
const themeOptions = [
  { id: 'midnight', name: 'Midnight Purple', from: 'from-indigo-500', to: 'to-purple-600' },
  { id: 'ocean', name: 'Ocean Blue', from: 'from-blue-500', to: 'to-cyan-600' },
  { id: 'sunset', name: 'Sunset Orange', from: 'from-orange-500', to: 'to-red-600' },
  { id: 'forest', name: 'Forest Green', from: 'from-green-500', to: 'to-emerald-600' },
  { id: 'royal', name: 'Royal Gold', from: 'from-yellow-500', to: 'to-amber-600' },
];

// Layout templates
const layoutTemplates = [
  { id: 'standard', name: 'Standard' },
  { id: 'compact', name: 'Compact' },
  { id: 'elegant', name: 'Elegant' },
  { id: 'minimal', name: 'Minimal' },
];

export default function UserPage({ params }: { params: { username: string } }) {
  const [currentTheme, setCurrentTheme] = useState(themeOptions[0]);
  const [currentLayout, setCurrentLayout] = useState(layoutTemplates[0]);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isLayoutMenuOpen, setIsLayoutMenuOpen] = useState(false);
  const [userData, setUserData] = useState(DUMMY_DATA);
  
    const username = usePathname();

  // Fetch user data (in a real app)
  useEffect(() => {
    // This would be a real API call in a production app
    // For now, we'll just use the dummy data, potentially modified based on the username
    setUserData({
      ...DUMMY_DATA,
      username: username.replace('@', '')
    });
  }, [username]);

  // Handle dropdown toggling
  const toggleThemeMenu = () => setIsThemeMenuOpen(!isThemeMenuOpen);
  const toggleLayoutMenu = () => setIsLayoutMenuOpen(!isLayoutMenuOpen);
  
  // Select a theme
  const selectTheme = (theme: typeof themeOptions[0]) => {
    setCurrentTheme(theme);
    setIsThemeMenuOpen(false);
  };
  
  // Select a layout
  const selectLayout = (layout: typeof layoutTemplates[0]) => {
    setCurrentLayout(layout);
    setIsLayoutMenuOpen(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#030213] to-[#0f0a2d] flex flex-col items-center py-12 px-4">
      {/* Settings Bar */}
      <div className="w-full max-w-md flex justify-between mb-6 p-2 bg-black bg-opacity-20 rounded-lg">
        {/* Theme Dropdown */}
        <div className="relative">
          <button 
            onClick={toggleThemeMenu}
            className="flex items-center space-x-2 px-3 py-2 bg-black bg-opacity-30 rounded-md text-white"
          >
            <span>Theme: {currentTheme.name}</span>
            <ChevronDown size={16} className={`transform transition-transform ${isThemeMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isThemeMenuOpen && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-black bg-opacity-90 rounded-md shadow-lg z-10">
              {themeOptions.map((theme) => (
               <button
               key={theme.id}
               onClick={() => selectTheme(theme)}
               className={`w-full text-left px-4 py-2 hover:bg-white/40 hover:text-black rounded-md transition-colors ${
                 currentTheme.id === theme.id ? 'bg-white/70 text-black' : 'text-white'
               }`}
             >
             
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full mr-2 bg-gradient-to-r ${theme.from} ${theme.to}`}></div>
                    <span className="text-white">{theme.name}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Layout Dropdown */}
        <div className="relative">
          <button 
            onClick={toggleLayoutMenu}
            className="flex items-center space-x-2 px-3 py-2 bg-black bg-opacity-30 rounded-md text-white"
          >
            <span>Layout: {currentLayout.name}</span>
            <ChevronDown size={16} className={`transform transition-transform ${isLayoutMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isLayoutMenuOpen && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-black bg-opacity-90 rounded-md shadow-lg z-10">
              {layoutTemplates.map((layout) => (
                <button
                  key={layout.id}
                  onClick={() => selectLayout(layout)}
                  className={`w-full text-left px-4 py-2 hover:bg-white/40 hover:bg-opacity-10 text-black rounded-md ${
                    currentLayout.id === layout.id ? 'bg-white/70 bg-opacity-10 text-black ' : ''
                  }`}
                >
                  <span className="text-white">{layout.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content - changes based on selected layout */}
      <div className="w-full max-w-md">
        {currentLayout.id === 'standard' && (
          <StandardLayout userData={userData} theme={currentTheme} />
        )}
        
        {currentLayout.id === 'compact' && (
          <CompactLayout userData={userData} theme={currentTheme} />
        )}
        
        {currentLayout.id === 'elegant' && (
          <ElegantLayout userData={userData} theme={currentTheme} />
        )}
        
        {currentLayout.id === 'minimal' && (
          <MinimalLayout userData={userData} theme={currentTheme} />
        )}
      </div>
      
      {/* Footer */}
      
    </main>
  );
}

// Standard Layout Component
function StandardLayout({ userData, theme }: { userData: typeof DUMMY_DATA, theme: typeof themeOptions[0] }) {
  return (
    <div className="flex flex-col items-center">
      {/* Profile Section */}
      <div className="mb-8 flex flex-col items-center">
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-white">
          <Image
            src={userData.avatar}
            alt={userData.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h1 className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent text-2xl font-bold mb-1">
          {userData.name}
        </h1>
        <p className="text-gray-300">@{userData.username}</p>
        <p className="text-gray-400 text-sm">{userData.email}</p>
      </div>
      
      {/* Links Section */}
      <div className="w-full space-y-3">
        {userData.links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center p-3 rounded-lg transition-all hover:scale-105 bg-gradient-to-r ${theme.from} ${theme.to}`}
          >
            <div className="w-6 h-6 relative mr-3">
              <Image src={link.icon} alt="" layout="fill" objectFit="cover" className="rounded" />
            </div>
            <span className="text-white font-medium">{link.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

// Compact Layout Component
function CompactLayout({ userData, theme }: { userData: typeof DUMMY_DATA, theme: typeof themeOptions[0] }) {
  return (
    <div className="bg-black bg-opacity-40 rounded-xl p-6">
      {/* Profile Section - Horizontal */}
      <div className="flex items-center mb-6">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white mr-4">
          <Image
            src={userData.avatar}
            alt={userData.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          <h1 className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent text-xl font-bold">
            {userData.name}
          </h1>
          <p className="text-gray-300 text-sm">@{userData.username}</p>
          <p className="text-gray-400 text-xs">{userData.email}</p>
        </div>
      </div>
      
      {/* Links Section - Compact Grid */}
      <div className="grid grid-cols-2 gap-2">
        {userData.links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center p-2 rounded-md transition-all hover:brightness-110 bg-gradient-to-r ${theme.from} ${theme.to}`}
          >
            <div className="w-5 h-5 relative mr-2">
              <Image src={link.icon} alt="" layout="fill" objectFit="cover" className="rounded" />
            </div>
            <span className="text-white text-sm font-medium truncate">{link.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

// Elegant Layout Component
function ElegantLayout({ userData, theme }: { userData: typeof DUMMY_DATA, theme: typeof themeOptions[0] }) {
  return (
    <div className="p-1 rounded-2xl bg-gradient-to-r from-white to-gray-300">
      <div className="bg-gradient-to-b from-[#030213] to-[#0f0a2d] rounded-xl p-6">
        {/* Profile Section - Centered and Elegant */}
        <div className="flex flex-col items-center mb-8">
          <div className={`p-1 rounded-full mb-4 bg-gradient-to-r ${theme.from} ${theme.to}`}>
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-black">
              <Image
                src={userData.avatar}
                alt={userData.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <h1 className={`bg-gradient-to-r ${theme.from} ${theme.to} bg-clip-text text-transparent text-2xl font-bold mb-1`}>
            {userData.name}
          </h1>
          <p className="text-gray-300">@{userData.username}</p>
          <p className="text-gray-400 text-sm mb-2">{userData.email}</p>
          <div className={`h-0.5 w-20 bg-gradient-to-r ${theme.from} ${theme.to} rounded-full`}></div>
        </div>
        
        {/* Links Section - Elegant Style */}
        <div className="w-full space-y-3">
          {userData.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 rounded-lg border border-gray-700 bg-black bg-opacity-40 hover:border-gray-500 transition-all"
            >
              <div className={`w-8 h-8 relative mr-3 p-0.5 rounded-md bg-gradient-to-r ${theme.from} ${theme.to}`}>
                <div className="bg-black rounded-sm w-full h-full flex items-center justify-center">
                  <Image src={link.icon} alt="" width={20} height={20} className="rounded" />
                </div>
              </div>
              <span className={`bg-gradient-to-r ${theme.from} ${theme.to} bg-clip-text text-transparent font-medium`}>
                {link.title}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// Minimal Layout Component
function MinimalLayout({ userData, theme }: { userData: typeof DUMMY_DATA, theme: typeof themeOptions[0] }) {
  return (
    <div className="flex flex-col items-center">
      {/* Profile Section - Minimal */}
      <div className="mb-8 flex flex-col items-center">
        <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4">
          <Image
            src={userData.avatar}
            alt={userData.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h1 className="text-white text-xl font-bold mb-1">
          {userData.name}
        </h1>
        <p className="text-gray-400 text-sm">{userData.email}</p>
      </div>
      
      {/* Links Section - Minimal */}
     <div className="w-full space-y-2">
        {userData.links.map((link) => (
          <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 text-center rounded-md border border-gray-700 text-white hover:bg-white hover:bg-opacity-5 transition-all"
        >
          <span className={`bg-gradient-to-r ${theme.from} ${theme.to} bg-clip-text text-transparent font-medium`}>
            {link.title}
          </span>
        </a>
      ))}
    </div>
  </div>
);
}