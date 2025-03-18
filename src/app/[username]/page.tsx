"use client";

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import customizationUtils from '@/components/customizaton/utils';
import FieldType from '@/components/customizaton/types';
import {
  ArrowUpRight, 
  LinkIcon,
  User,
  Sparkles
} from 'lucide-react';

// Type definitions
interface UserProfileData {
  displayName: string;
  bio: string;
  avatar: string;
  theme: string;
  layout: string;
  showBio: boolean;
  showAvatar: boolean;
  animation: string;
  roundedCorners: boolean;
  showBorders: boolean;
  showShadows: boolean;
  buttonFullWidth: boolean;
  showLinkIcons: boolean;
  isPremium: boolean;
  fields: FieldType[];
}

// Utility functions - moved outside component and memoized
const getGradientClasses = (selectedTheme: typeof customizationUtils.themeOptions[0]) => 
  `bg-gradient-to-r ${selectedTheme.from} ${selectedTheme.to}`;

const getButtonClasses = (
  selectedTheme: typeof customizationUtils.themeOptions[0], 
  roundedCorners: boolean, 
  showBorders: boolean, 
  showShadows: boolean, 
  selectedLayout: typeof customizationUtils.layoutTemplates[0],
  isGlass = false
) => {
  const classes = [
    'mb-3 p-3',
    getGradientClasses(selectedTheme),
    'flex items-center justify-between',
    roundedCorners ? 'rounded-lg' : '',
    showBorders ? `border ${selectedTheme.borderColor}` : '',
    showShadows ? 'shadow-md hover:shadow-lg' : '',
    selectedLayout.id === 'compact' ? 'py-2' : '',
    selectedLayout.id === 'minimal' ? 'bg-opacity-90 border-0' : '',
    isGlass ? 'backdrop-blur-md bg-opacity-20' : ''
  ];
  
  return classes.filter(Boolean).join(' ');
};

// Animation classes map for better performance
const ANIMATION_CLASSES = {
  pulse: 'hover:animate-pulse transition-all',
  scale: 'transition-transform hover:scale-105',
  slide: 'transition-transform hover:translate-x-4',
  bounce: 'transition-transform hover:animate-bounce',
  rotate: 'transition-transform hover:rotate-1',
  default: 'transition-all'
};

const getAnimationClass = (animation: string | undefined) => 
  ANIMATION_CLASSES[animation as keyof typeof ANIMATION_CLASSES] || ANIMATION_CLASSES.default;

const getLinkIcon = (field: FieldType) => {
  if (field.image) {
    return (
      <div className="w-12 h-8 mr-3 flex-shrink-0">
        <div className="w-full h-full bg-gray-200 rounded relative">
          <Image 
            src={field.image} 
            alt="" 
            fill
            className="rounded object-cover" 
            unoptimized={field.image.startsWith('http')}
          />
        </div>
      </div>
    );
  }
  
  const linkType = customizationUtils.linkTypes.find(lt => lt.id === field.type);
  return <span className="mr-3">{linkType ? linkType.icon : <LinkIcon size={16} />}</span>;
};

// Enhanced fetch function with proper error handling
const userDataCache: Record<string, UserProfileData> = {};

async function fetchUserData(username: string): Promise<UserProfileData> {
  // Remove @ from username if present
  const cleanUsername = username.startsWith('@') ? username.substring(1) : username;
  
  if (userDataCache[cleanUsername]) {
    return userDataCache[cleanUsername];
  }
  
  try {
    // In a real app, this would be an API call
    // For demo/testing, we'll use mock data with a small delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Check if the username is exactly '0Armaan025'
    const isPremium = cleanUsername === '0Armaan025';
    
    const data = {
      displayName: cleanUsername.charAt(0).toUpperCase() + cleanUsername.slice(1),
      bio: "Digital creator and content enthusiast",
      avatar: "",
      theme: "rose",
      layout: "compact",
      showBio: false,
      animation: "bounce",
      showAvatar: true,
      roundedCorners: true,
      showBorders: true,
      showShadows: false,
      isPremium,
      buttonFullWidth: false,
      showLinkIcons: false,
      fields: [
        { id: 1, title: 'Portfolio', link: 'https://portfolio.com', image: 'https://cdn.dribbble.com/userupload/18679649/file/original-4862151ee849235dc5910c606ab05a72.jpg?resize=1200x926&vertical=center', type: 'default', animation: 'slide' },
        { id: 2, title: 'LinkedIn', link: 'https://linkedin.com', image: '', type: 'social', animation: 'pulse' },
        { id: 3, title: 'Twitter', link: 'https://twitter.com', image: '', type: 'social', animation: 'scale' },
      ]
    };
    
    userDataCache[cleanUsername] = data;
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to load user profile");
  }
}

const UserProfilePage: React.FC = () => {
  const pathname = usePathname();
  // Extract username from path - must be in format /@username
  const username = pathname?.includes('@') ? pathname?.split('@')[1] || '' : '';
  
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [highlight, setHighlight] = useState<number | null>(null);
  const [viewCount, setViewCount] = useState<number>(0);
  const [showGlassEffect, setShowGlassEffect] = useState<boolean>(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [impressedAnimation, setImpressedAnimation] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState<'default' | 'hover'>('default');

  // Mark when client-side rendering is active
  useEffect(() => {
    setIsClient(true);
    setViewCount(Math.floor(Math.random() * 15) + 5);
    
    // Add event listener for custom cursor
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track mouse for spotlight effect - only on client
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isClient) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  }, [isClient]);

  // Show "impressed" animation effect when scrolling - only on client
  useEffect(() => {
    if (!isClient) return;
    
    const handleScroll = () => {
      if (window.scrollY > 100 && !impressedAnimation) {
        setImpressedAnimation(true);
        setTimeout(() => setImpressedAnimation(false), 3000);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [impressedAnimation, isClient]);

  useEffect(() => {
    if (!username || !isClient) return;

    const loadUserData = async () => {
      try {
        setLoading(true);
        const data = await fetchUserData(username);
        setUserData(data);
      } catch (err) {
        setError('Failed to load user profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [username, isClient]);

  // Memoized theme and layout calculations
  const { selectedTheme, selectedLayout, containerClasses } = useMemo(() => {
    if (!userData) {
      return {
        selectedTheme: customizationUtils.themeOptions[0],
        selectedLayout: customizationUtils.layoutTemplates[0],
        containerClasses: 'flex flex-col'
      };
    }
    
    const theme = customizationUtils.themeOptions.find(
      theme => theme.id === userData.theme
    ) || customizationUtils.themeOptions[0];

    const layout = customizationUtils.layoutTemplates.find(
      layout => layout.id === userData.layout
    ) || customizationUtils.layoutTemplates[0];

    const classes = layout.id === 'grid'
      ? 'grid grid-cols-1 sm:grid-cols-2 gap-3'
      : 'flex flex-col';
      
    return { selectedTheme: theme, selectedLayout: layout, containerClasses: classes };
  }, [userData]);

  // Handle mouse enter/leave for interactive elements
  const handleMouseEnter = useCallback(() => {
    setCursorType('hover');
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCursorType('default');
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#030213] to-[#0f0a2d] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full mb-4"></div>
          <div className="text-white text-lg">Loading amazing profile...</div>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#030213] to-[#0f0a2d] flex items-center justify-center">
        <div className="text-center p-8 rounded-xl bg-gray-900/60 border border-gray-700">
          <h1 className="text-2xl font-bold text-white mb-4">Profile not found</h1>
          <p className="text-gray-300">The user profile you&apos;re looking for doesn&apos;t exist or couldn&apos;t be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-[#030213] to-[#0f0a2d] py-10 px-4 relative overflow-hidden cursor-none"
      onMouseMove={userData.isPremium ? handleMouseMove : undefined}
    >
      {/* Custom cursor */}
      {isClient && (
        <>
          <div 
            className="fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference"
            style={{
              left: `${cursorPosition.x}px`,
              top: `${cursorPosition.y}px`,
              transform: 'translate(-50%, -50%)',
              backgroundColor: cursorType === 'hover' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.2)',
              transition: 'width 0.2s, height 0.2s, background-color 0.3s'
            }}
          />
          <div 
            className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-50"
            style={{
              left: `${cursorPosition.x}px`,
              top: `${cursorPosition.y}px`,
              transform: 'translate(-50%, -50%)',
              transition: 'left 0.05s, top 0.05s'
            }}
          />
        </>
      )}

      {/* PREMIUM BG - Only show for premium users */}
      {userData.isPremium && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-indigo-600 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-600 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
      )}
  
      {/* Spotlight effect following cursor - only active on client */}
      {isClient && userData.isPremium && (
        <div 
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-5 pointer-events-none blur-3xl"
          style={{
            left: `${mousePosition.x - 128}px`,
            top: `${mousePosition.y - 128}px`,
            transition: 'all 0.3s ease-out'
          }}
        ></div>
      )}

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Neuromorphic card effect with translucent glassy background */}
        <div className={userData.isPremium ? `rounded-xl p-8 backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl relative overflow-hidden ${impressedAnimation ? 'animate-wiggle' : ''}` : ''}>
          {/* Premium indicator - Only show for premium users */}
          {userData.isPremium && impressedAnimation && (
            <div className="absolute -top-2 -right-2 w-24 h-24">
              <div className="absolute top-8 right-8 bg-amber-500 text-white px-4 py-1 text-xs font-bold transform rotate-45 shadow-lg">
                PREMIUM
              </div>
            </div>
          )}
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({length: 10}).map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.1,
                  animationDuration: `${Math.random() * 10 + 5}s`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              ></div>
            ))}
          </div>

          {/* Profile Header */}
          <div className="flex flex-col items-center mb-8 relative">
            {userData.showAvatar && (
              <div className={`w-24 h-24 rounded-full overflow-hidden ${userData.showBorders ? 'border-2 ' + selectedTheme.borderColor : ''} mb-4 relative group`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Avatar glow effect - Only for premium users */}
                {userData.isPremium && (
                  <>
                    <div className="absolute inset-0 bg-purple-500 opacity-20 group-hover:animate-pulse rounded-full"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 rounded-full transition-opacity"></div>
                  </>
                )}
                
                {userData.avatar ? (
                  <div className="relative w-full h-full">
                    <Image 
                      src={userData.avatar} 
                      alt={userData.displayName} 
                      fill
                      className="object-cover"
                      unoptimized={userData.avatar.startsWith('http')}
                    />
                  </div>
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${getGradientClasses(selectedTheme)}`}>
                    <User size={32} className="text-white" />
                  </div>
                )}
                
                {/* Only show premium badge if user is premium */}
                {userData.isPremium && (
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center animate-spin-slow">
                    <div className="w-6 h-6 bg-[#030213] rounded-full flex items-center justify-center">
                      <Sparkles size={12} className="text-white" />
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                {userData.displayName}
              </span>
              
              {/* Only show premium badge if user is premium */}
              {userData.isPremium && (
                <span className="absolute -top-3 -right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-2 py-1 rounded-full transform rotate-12 animate-bounce">
                  Pro
                </span>
              )}
            </h1>
            
            {/* Views count */}
            {userData.showBio && (
              <div className="mt-4 flex items-center bg-white/10 px-3 py-1 rounded-full"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs text-white">{viewCount} views yet</span>
              </div>
            )}
          </div>

          {/* Style toggle button */}
          <button 
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            onClick={() => setShowGlassEffect(!showGlassEffect)}
            aria-label="Toggle glass effect"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
          </button>

          {/* Links Section */}
          <div className={containerClasses}>
            {userData.fields
              .filter(field => !field.hidden)
              .map((field, index) => (
                <a
                  key={field.id}
                  href={field.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${field.title}`}
                  className={`
                    hover:cursor-none
                    ${getButtonClasses(selectedTheme, userData.roundedCorners, userData.showBorders, userData.showShadows, selectedLayout, showGlassEffect)}
                    ${getAnimationClass(field.animation || userData.animation)}
                    ${!userData.buttonFullWidth && selectedLayout.id !== 'grid' ? 'self-center max-w-xs w-[300px]' : 'w-full'}
                    relative overflow-hidden group
                  `}
                  onMouseEnter={() => {
                    setHighlight(index);
                    handleMouseEnter();
                  }}
                  onMouseLeave={() => {
                    setHighlight(null);
                    handleMouseLeave();
                  }}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    transform: `translateY(${highlight === index ? '-2px' : '0'})`,
                    transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  {/* Spotlight effect */}
                  {isClient && highlight === index && (
                    <div className="absolute inset-0 bg-white opacity-10 rounded-full w-20 h-20 -top-5 -left-5 blur-xl animate-pulse"></div>
                  )}
                  
                  {/* Neuomorphic inner shadow */}
                  {showGlassEffect && (
                    <div className="absolute inset-0 rounded-lg shadow-inner opacity-30 pointer-events-none"></div>
                  )}
                  
                  <div className="flex items-center z-10 relative">
                    {userData.showLinkIcons && getLinkIcon(field)}
                    <span className={`${selectedTheme.textColor} group-hover:translate-x-1 transition-transform`}>
                      {field.title}
                    </span>
                  </div>
                  <ArrowUpRight 
                    size={16} 
                    className={`${selectedTheme.textColor} group-hover:scale-125 transition-transform`} 
                  />
                </a>
              ))}
          </div>
          
          {/* Call-to-action Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400 mb-2">Make your own link page in 60 seconds →</p>
            <button 
              className={`
                px-6 py-3 relative overflow-hidden hover:cursor-none
                
                ${showGlassEffect ? 'backdrop-blur-md bg-white/10' : 'bg-gradient-to-r from-purple-600 to-pink-600'}
                rounded-full text-white text-sm font-medium
                transform transition-all hover:scale-105 hover:shadow-lg
                ${showGlassEffect ? 'border border-white/20' : ''}
              `}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.href = '/dashboard';
                }
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-pink-600/40 opacity-0 hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10">Create Free Page</span>
            </button>
            
            {/* Premium upgrade teaser */}
            <div className="mt-6 p-4 rounded-lg hover:cursor-none bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-white/10 max-w-xs mx-auto transform transition-transform hover:scale-105"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center justify-center mb-2">
                <Sparkles size={16} className="text-amber-400 mr-2" />
                <span className="text-amber-400 text-xs font-medium">PREMIUM FEATURES</span>
              </div>
              <p className="text-xs text-gray-300 mb-3">Unlock animated backgrounds, custom domains, and advanced analytics</p>
              <button 
                className="text-xs text-white hover:cursor-none  bg-gradient-to-r from-amber-600 to-amber-500 px-3 py-1 rounded-full"
                aria-label="Upgrade to premium"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;