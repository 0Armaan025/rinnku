"use client";
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import {
  User, Settings, Link2, ArrowUpRight,
  Plus, Eye, Save, Trash2, ChevronDown,
  LinkIcon, X, Check, Layout,
  PanelLeft, Palette, Sparkles, Camera,
  Crop, Grip, Layers, CheckCircle, Circle,
  Move, Headphones, Video, ShoppingBag, MessageCircle, ImageIcon, Upload
} from 'lucide-react';

type Props = {}

interface FieldType {
  id: number;
  title: string;
  link: string;
  image: string;
  type?: string;
  hidden?: boolean;
  animation?: string;
}

// Enhanced theme options with more professional palette
const themeOptions = [
  {
    id: 'midnight',
    name: 'Midnight',
    from: 'from-indigo-600',
    to: 'to-blue-700',
    cardBg: 'bg-gray-900/60',
    textColor: 'text-white',
    accentColor: 'text-blue-400',
    borderColor: 'border-gray-700',
    iconColor: 'text-blue-400'
  },
  {
    id: 'slate',
    name: 'Slate',
    from: 'from-slate-600',
    to: 'to-slate-800',
    cardBg: 'bg-gray-900/60',
    textColor: 'text-white',
    accentColor: 'text-slate-300',
    borderColor: 'border-gray-700',
    iconColor: 'text-slate-300'
  },
  {
    id: 'emerald',
    name: 'Emerald',
    from: 'from-emerald-500',
    to: 'to-teal-700',
    cardBg: 'bg-gray-900/60',
    textColor: 'text-white',
    accentColor: 'text-emerald-300',
    borderColor: 'border-gray-700',
    iconColor: 'text-emerald-400'
  },
  {
    id: 'amber',
    name: 'Amber',
    from: 'from-amber-500',
    to: 'to-orange-600',
    cardBg: 'bg-gray-900/70',
    textColor: 'text-white',
    accentColor: 'text-amber-300',
    borderColor: 'border-gray-700',
    iconColor: 'text-amber-400'
  },
  {
    id: 'rose',
    name: 'Rose',
    from: 'from-rose-500',
    to: 'to-pink-600',
    cardBg: 'bg-gray-900/70',
    textColor: 'text-white',
    accentColor: 'text-rose-300',
    borderColor: 'border-gray-700',
    iconColor: 'text-rose-400'
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    from: 'from-gray-600',
    to: 'to-gray-800',
    cardBg: 'bg-gray-900/60',
    textColor: 'text-white',
    accentColor: 'text-gray-300',
    borderColor: 'border-gray-700',
    iconColor: 'text-gray-400'
  },
];

// Simplified layout templates for cleaner options
const layoutTemplates = [
  {
    id: 'standard',
    name: 'Standard',
    icon: <Layout size={16} />,
    description: 'Classic stacked layout'
  },
  {
    id: 'compact',
    name: 'Compact',
    icon: <PanelLeft size={16} />,
    description: 'Space-efficient design'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    icon: <Crop size={16} />,
    description: 'Clean, distraction-free design'
  },
  {
    id: 'grid',
    name: 'Grid',
    icon: <Grip size={16} />,
    description: 'Two-column grid layout'
  },
];

// Link animations
const animationOptions = [
  { id: 'none', name: 'None', description: 'No animation' },
  { id: 'pulse', name: 'Pulse', description: 'Gentle pulsing effect' },
  { id: 'scale', name: 'Scale', description: 'Grows slightly on hover' },
  { id: 'slide', name: 'Slide', description: 'Slides in from the side' }
];

// Link types
const linkTypes = [
  { id: 'default', name: 'Default', icon: <LinkIcon size={16} /> },
  { id: 'social', name: 'Social', icon: <User size={16} /> },
  { id: 'music', name: 'Music', icon: <Headphones size={16} /> },
  { id: 'video', name: 'Video', icon: <Video size={16} /> },
  { id: 'shop', name: 'Shop', icon: <ShoppingBag size={16} /> },
  { id: 'message', name: 'Message', icon: <MessageCircle size={16} /> }
];

export default function CustomizationComponent(props: Props) {
  // component code remains exactly the same

  // UI State
  const [activeTab, setActiveTab] = useState('design');
  const [selectedTheme, setSelectedTheme] = useState(themeOptions[0]);
  const [selectedLayout, setSelectedLayout] = useState(layoutTemplates[0]);
  const [selectedAnimation, setSelectedAnimation] = useState(animationOptions[0]);
  const [previewMode, setPreviewMode] = useState(false);
  const [modified, setModified] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);
  const [draggingField, setDraggingField] = useState<number | null>(null);
  
  // Dropdown state
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [layoutDropdownOpen, setLayoutDropdownOpen] = useState(false);
  const [animationDropdownOpen, setAnimationDropdownOpen] = useState(false);
  const themeDropdownRef = useRef<HTMLDivElement>(null);
  const layoutDropdownRef = useRef<HTMLDivElement>(null);
  const animationDropdownRef = useRef<HTMLDivElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  
  // Profile data
  const [username, setUsername] = useState('johndoe');
  const [displayName, setDisplayName] = useState('John Doe');
  const [bio, setBio] = useState('Digital designer and content creator');
  const [avatar, setAvatar] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState('');

  // Style options
  const [showBio, setShowBio] = useState(true);
  const [showAvatar, setShowAvatar] = useState(true);
  const [roundedCorners, setRoundedCorners] = useState(true);
  const [showBorders, setShowBorders] = useState(true);
  const [showShadows, setShowShadows] = useState(true);
  const [buttonFullWidth, setButtonFullWidth] = useState(true);
  const [showLinkIcons, setShowLinkIcons] = useState(true);

  // Fields data
  const [fields, setFields] = useState<FieldType[]>([
    { id: 1, title: 'Portfolio', link: 'https://portfolio.com', image: '', type: 'default', animation: 'none' },
    { id: 2, title: 'LinkedIn', link: 'https://linkedin.com', image: '', type: 'social', animation: 'none' },
    { id: 3, title: 'Twitter', link: 'https://twitter.com', image: '', type: 'social', animation: 'none' },
  ]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)) {
        setThemeDropdownOpen(false);
      }
      if (layoutDropdownRef.current && !layoutDropdownRef.current.contains(event.target as Node)) {
        setLayoutDropdownOpen(false);
      }
      if (animationDropdownRef.current && !animationDropdownRef.current.contains(event.target as Node)) {
        setAnimationDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Track changes to set modified state
  useEffect(() => {
    setModified(true);
  }, [
    selectedTheme, selectedLayout, selectedAnimation, 
    username, displayName, bio, avatar, avatarFile, fields,
    showBio, showAvatar, roundedCorners, showBorders, 
    showShadows, buttonFullWidth, showLinkIcons
  ]);

  // Handle avatar file upload
  useEffect(() => {
    if (avatarFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(avatarFile);
    } else {
      setAvatarPreview('');
    }
  }, [avatarFile]);

  // Field management functions
  const addField = () => {
    const newId = fields.length > 0 ? Math.max(...fields.map(f => f.id)) + 1 : 1;
    setFields([...fields, {
      id: newId,
      title: '',
      link: '',
      image: '',
      type: 'default',
      animation: 'none'
    }]);
  };

  const deleteField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const updateField = (id: number, key: keyof FieldType, value: string | number | boolean) => {
    setFields(fields.map((field) =>
      field.id === id ? { ...field, [key]: value } : field
    ));
  };

  // Drag and drop functions
  const handleDragStart = (id: number) => {
    setDraggingField(id);
  };

  const handleDragOver = (e: React.DragEvent, id: number) => {
    e.preventDefault();
    if (draggingField === null || draggingField === id) return;

    const draggedItemIndex = fields.findIndex(field => field.id === draggingField);
    const targetIndex = fields.findIndex(field => field.id === id);

    if (draggedItemIndex === -1 || targetIndex === -1) return;

    const newFields = [...fields];
    const draggedItem = newFields[draggedItemIndex];

    // Remove the dragged item
    newFields.splice(draggedItemIndex, 1);
    // Insert at the target position
    newFields.splice(targetIndex, 0, draggedItem);

    setFields(newFields);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggingField(null);
  };

  const handleDragEnd = () => {
    setDraggingField(null);
  };

  // Avatar handling functions
  const handleAvatarClick = () => {
    if (avatarInputRef.current) {
      avatarInputRef.current.click();
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
      setAvatar(''); // Clear URL if we're using a file
    }
  };

  const handleAvatarDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setAvatarFile(e.dataTransfer.files[0]);
      setAvatar(''); // Clear URL if we're using a file
    }
  };

  const handleAvatarDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Handle link icon upload
  const handleLinkIconUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField(id, 'image', reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Styling functions
  const getGradientClasses = () => {
    return `bg-gradient-to-r ${selectedTheme.from} ${selectedTheme.to}`;
  };

  const getButtonClasses = () => {
    let classes = `mb-3 p-3 ${getGradientClasses()} flex items-center justify-between `;

    if (roundedCorners) {
      classes += 'rounded-lg ';
    }

    if (showBorders) {
      classes += 'border border-gray-700/30 ';
    }

    if (showShadows) {
      classes += 'shadow-md ';
    }

    if (selectedLayout.id === 'compact') {
      classes += 'py-2 ';
    } else if (selectedLayout.id === 'minimal') {
      classes += 'bg-opacity-90 border-0 ';
    }

    return classes;
  };

  const getAnimationClass = (animation: string) => {
    switch (animation) {
      case 'pulse': return 'hover:animate-pulse';
      case 'scale': return 'transition-transform hover:scale-102';
      case 'slide': return 'transition-transform hover:translate-x-1';
      default: return '';
    }
  };

  const saveChanges = () => {
    setSavedMessage(true);
    setModified(false);

    setTimeout(() => {
      setSavedMessage(false);
    }, 3000);
  };

  const getLinkIcon = (field: FieldType) => {
    // If the field has a custom image, use that
    if (field.image) {
      return (
        <div className="w-4 h-4 mr-3 flex-shrink-0">
          <img src={field.image} alt="" className="w-full h-full object-cover rounded" />
        </div>
      );
    }
    
    // Otherwise use the type icon
    const linkType = linkTypes.find(lt => lt.id === field.type);
    return <span className="mr-3">{linkType ? linkType.icon : <LinkIcon size={16} />}</span>;
  };

  // Function to render the preview layout
  // Function to render the preview layout
  const renderPreview = () => {
    const containerClasses = selectedLayout.id === 'grid'
      ? 'grid grid-cols-2 gap-3'
      : 'flex flex-col';

    return (
      <div className="max-w-md mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6">
          {showAvatar && (
            <div className={`w-20 h-20 rounded-full overflow-hidden ${showBorders ? 'border-2 ' + selectedTheme.borderColor : ''} mb-3`}>
              {avatarFile && avatarPreview ? (
                <img src={avatarPreview} alt={displayName} className="w-full h-full object-cover" />
              ) : avatar ? (
                <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${getGradientClasses()}`}>
                  <User size={32} className="text-white" />
                </div>
              )}
            </div>
          )}
          <h1 className={`text-xl font-semibold ${selectedTheme.textColor}`}>{displayName}</h1>
          {showBio && bio && (
            <p className={`text-center text-sm mt-2 ${selectedTheme.textColor} max-w-xs opacity-80`}>
              {bio}
            </p>
          )}
        </div>

        {/* Links */}
        <div className={containerClasses}>
          {fields.filter(f => !f.hidden).map((field) => (
            <a
              key={field.id}
              href={field.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${getButtonClasses()} ${getAnimationClass(field.animation || 'none')} ${!buttonFullWidth && selectedLayout.id !== 'grid' ? 'self-center max-w-xs' : 'w-full'}`}
            >
              <div className="flex items-center">
                {showLinkIcons && getLinkIcon(field)}
                <span className={selectedTheme.textColor}>{field.title}</span>
              </div>
              <ArrowUpRight size={16} className={selectedTheme.textColor} />
            </a>
          ))}
        </div>
      </div>
    );
  };

  // Function to render the tabs content
  const renderTabContent = () => {
    if (activeTab === 'design') {
      return (
        <div className="space-y-6">
          {/* Theme Selector */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 mb-2 font-medium">Theme</h3>
            <div className="relative" ref={themeDropdownRef}>
              <button
                className="flex items-center justify-between w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${selectedTheme.from} ${selectedTheme.to} mr-3`}></div>
                  <span>{selectedTheme.name}</span>
                </div>
                <ChevronDown size={16} className={themeDropdownOpen ? "transform rotate-180" : ""} />
              </button>

              {themeDropdownOpen && (
                <div className="absolute mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 overflow-hidden max-h-56 overflow-y-auto">
                  {themeOptions.map((theme) => (
                    <div
                      key={theme.id}
                      className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        setSelectedTheme(theme);
                        setThemeDropdownOpen(false);
                      }}
                    >
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${theme.from} ${theme.to} mr-3`}></div>
                      <span>{theme.name}</span>
                      {selectedTheme.id === theme.id && <Check size={16} className="ml-auto" />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Layout Selector */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 mb-2 font-medium">Layout</h3>
            <div className="relative" ref={layoutDropdownRef}>
              <button
                className="flex items-center justify-between w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
                onClick={() => setLayoutDropdownOpen(!layoutDropdownOpen)}
              >
                <div className="flex items-center">
                  <span className="mr-3">{selectedLayout.icon}</span>
                  <span>{selectedLayout.name}</span>
                </div>
                <ChevronDown size={16} className={layoutDropdownOpen ? "transform rotate-180" : ""} />
              </button>

              {layoutDropdownOpen && (
                <div className="absolute mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 overflow-hidden max-h-56 overflow-y-auto">
                  {layoutTemplates.map((layout) => (
                    <div
                      key={layout.id}
                      className="flex flex-col px-4 py-2 hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        setSelectedLayout(layout);
                        setLayoutDropdownOpen(false);
                      }}
                    >
                      <div className="flex items-center">
                        <span className="mr-3">{layout.icon}</span>
                        <span>{layout.name}</span>
                        {selectedLayout.id === layout.id && <Check size={16} className="ml-auto" />}
                      </div>
                      <span className="text-xs text-gray-400 mt-1 ml-6">{layout.description}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Animation Selector */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 mb-2 font-medium">Link Animation</h3>
            <div className="relative" ref={animationDropdownRef}>
              <button
                className="flex items-center justify-between w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
                onClick={() => setAnimationDropdownOpen(!animationDropdownOpen)}
              >
                <div className="flex items-center">
                  <Sparkles size={16} className="mr-3" />
                  <span>{selectedAnimation.name}</span>
                </div>
                <ChevronDown size={16} className={animationDropdownOpen ? "transform rotate-180" : ""} />
              </button>

              {animationDropdownOpen && (
                <div className="absolute mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 overflow-hidden max-h-56 overflow-y-auto">
                  {animationOptions.map((animation) => (
                    <div
                      key={animation.id}
                      className="flex flex-col px-4 py-2 hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        setSelectedAnimation(animation);
                        setAnimationDropdownOpen(false);
                        // Apply this animation to all links
                        setFields(fields.map(field => ({ ...field, animation: animation.id })));
                      }}
                    >
                      <div className="flex items-center">
                        <span>{animation.name}</span>
                        {selectedAnimation.id === animation.id && <Check size={16} className="ml-auto" />}
                      </div>
                      <span className="text-xs text-gray-400 mt-1">{animation.description}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Style Options */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 mb-2 font-medium">Style Options</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <label className="text-sm">Rounded Corners</label>
                <button
                  className="flex items-center"
                  onClick={() => setRoundedCorners(!roundedCorners)}
                >
                  {roundedCorners ? <CheckCircle size={18} className="text-blue-500" /> : <Circle size={18} className="text-gray-400" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <label className="text-sm">Show Borders</label>
                <button
                  className="flex items-center"
                  onClick={() => setShowBorders(!showBorders)}
                >
                  {showBorders ? <CheckCircle size={18} className="text-blue-500" /> : <Circle size={18} className="text-gray-400" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <label className="text-sm">Show Shadows</label>
                <button
                  className="flex items-center"
                  onClick={() => setShowShadows(!showShadows)}
                >
                  {showShadows ? <CheckCircle size={18} className="text-blue-500" /> : <Circle size={18} className="text-gray-400" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <label className="text-sm">Full Width</label>
                <button
                  className="flex items-center"
                  onClick={() => setButtonFullWidth(!buttonFullWidth)}
                >
                  {buttonFullWidth ? <CheckCircle size={18} className="text-blue-500" /> : <Circle size={18} className="text-gray-400" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <label className="text-sm">Show Icons</label>
                <button
                  className="flex items-center"
                  onClick={() => setShowLinkIcons(!showLinkIcons)}
                >
                  {showLinkIcons ? <CheckCircle size={18} className="text-blue-500" /> : <Circle size={18} className="text-gray-400" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <label className="text-sm">Show Avatar</label>
                <button
                  className="flex items-center"
                  onClick={() => setShowAvatar(!showAvatar)}
                >
                  {showAvatar ? <CheckCircle size={18} className="text-blue-500" /> : <Circle size={18} className="text-gray-400" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <label className="text-sm">Show Bio</label>
                <button
                  className="flex items-center"
                  onClick={() => setShowBio(!showBio)}
                >
                  {showBio ? <CheckCircle size={18} className="text-blue-500" /> : <Circle size={18} className="text-gray-400" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (activeTab === 'links') {
      return (
        <div className="space-y-6">
          {/* Profile Info */}
          <div>
            <h3 className="text-xs uppercase text-gray-400 mb-4 font-medium">Profile</h3>
            <div className="space-y-4">
              {/* Avatar Upload */}
              <div className="mb-4">
                <label className="block text-sm mb-2">Profile Picture</label>
                <div
                  className="flex flex-col items-center justify-center bg-gray-800 border border-gray-700 border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-750"
                  onClick={handleAvatarClick}
                  onDrop={handleAvatarDrop}
                  onDragOver={handleAvatarDragOver}
                >
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                  {avatarFile && avatarPreview ? (
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-2">
                      <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : avatar ? (
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-2">
                      <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-300">Upload a profile picture</p>
                      <p className="text-xs text-gray-500 mt-1">Drop an image or click to browse</p>
                    </div>
                  )}
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-gray-500 mr-2">Or use URL:</span>
                  <input
                    type="text"
                    value={avatar}
                    onChange={(e) => {
                      setAvatar(e.target.value);
                      setAvatarFile(null); // Clear file if using URL
                    }}
                    className="flex-1 px-3 py-1 bg-gray-800 border border-gray-700 rounded-lg text-sm"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg"
                  placeholder="A short bio about yourself"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1">Username</label>
                <div className="flex items-center">
                  <span className="px-3 py-2 bg-gray-700 border border-gray-700 rounded-l-lg text-gray-400">
                    example.com/
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-r-lg"
                    placeholder="username"
                  />
                </div>
              </div>
              </div>
              </div>
              
              {/* Links Management */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs uppercase text-gray-400 font-medium">Links</h3>
                  <button
                    className="flex items-center p-1 px-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm"
                    onClick={addField}
                  >
                    <Plus size={14} className="mr-1" /> Add Link
                  </button>
                </div>
              
                <div className="space-y-3">
                  {fields.map((field) => (
                    <div
                      key={field.id}
                      className={`bg-gray-800 border border-gray-700 rounded-lg overflow-hidden ${draggingField === field.id ? 'opacity-50' : ''}`}
                      draggable
                      onDragStart={() => handleDragStart(field.id)}
                      onDragOver={(e) => handleDragOver(e, field.id)}
                      onDrop={handleDrop}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <Move size={16} className="mr-2 text-gray-500 cursor-move" />
                            <input
                              type="text"
                              value={field.title}
                              onChange={(e) => updateField(field.id, 'title', e.target.value)}
                              className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
                              placeholder="Link Title"
                            />
                          </div>
                          <div className="flex items-center">
                            <button
                              className="p-1 hover:bg-gray-700 rounded-md"
                              onClick={() => updateField(field.id, 'hidden', !field.hidden)}
                            >
                              <Eye size={16} className={field.hidden ? 'text-gray-500' : 'text-gray-300'} />
                            </button>
                            <button
                              className="p-1 hover:bg-gray-700 rounded-md ml-1"
                              onClick={() => deleteField(field.id)}
                            >
                              <Trash2 size={16} className="text-gray-500 hover:text-red-400" />
                            </button>
                          </div>
                        </div>
              
                        <div className="mb-3">
                          <input
                            type="text"
                            value={field.link}
                            onChange={(e) => updateField(field.id, 'link', e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
                            placeholder="https://example.com"
                          />
                        </div>
              
                        <div className="flex items-center">
                          <div className="relative mr-3">
                            <div className="flex items-center bg-gray-700 border border-gray-600 rounded px-2 py-1">
                              <span className="text-xs mr-1">Type:</span>
                              {linkTypes.find(lt => lt.id === field.type)?.icon || <LinkIcon size={14} />}
                              <select
                                value={field.type}
                                onChange={(e) => updateField(field.id, 'type', e.target.value)}
                                className="bg-transparent text-xs ml-1 outline-none appearance-none  pl-1"
                              >
                                {linkTypes.map(lt => (
                                  <option key={lt.id} value={lt.id} className='text-black hover:cursor-pointer hover:bg-white/30 transition-all'>{lt.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>
              
                          <div className="relative flex-1">
                            <div className="flex items-center bg-gray-700 border border-gray-600 rounded px-2 py-1">
                              <span className="text-xs mr-1">Animation:</span>
                              <Sparkles size={14} className="mr-1" />
                              <select
                                value={field.animation}
                                onChange={(e) => updateField(field.id, 'animation', e.target.value)}
                                className="bg-transparent text-xs ml-1 outline-none appearance-none pl-1"
                              >
                                {animationOptions.map(ao => (
                                  <option key={ao.id} value={ao.id}>{ao.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>
              
                          <div className="ml-3">
                            <label className="flex items-center justify-center w-8 h-8 bg-gray-700 border border-gray-600 rounded cursor-pointer hover:bg-gray-650">
                              <ImageIcon size={14} className="text-gray-400" />
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleLinkIconUpload(field.id, e)}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              
                  {fields.length === 0 && (
                    <div className="text-center py-6 bg-gray-800 border border-gray-700 border-dashed rounded-lg">
                      <p className="text-gray-400">No links added yet</p>
                      <button
                        className="mt-2 px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded-md text-sm"
                        onClick={addField}
                      >
                        Add Your First Link
                      </button>
                    </div>
                  )}
                </div>
              </div>
              </div>
              );
              }
              
              return (
              <div className="min-h-screen bg-gray-900 text-white">
                <div className="container mx-auto px-4 py-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Link Builder</h1>
                    <div className="flex items-center">
                      {modified && !savedMessage && (
                        <span className="text-xs text-yellow-400 mr-3">Unsaved changes</span>
                      )}
                      {savedMessage && (
                        <span className="text-xs text-green-400 mr-3">Changes saved!</span>
                      )}
                      <button
                        className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg mr-2"
                        onClick={() => setPreviewMode(!previewMode)}
                      >
                        <Eye size={16} className="mr-2" />
                        {previewMode ? 'Edit' : 'Preview'}
                      </button>
                      {!previewMode && (
                        <button
                          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
                          onClick={saveChanges}
                          disabled={!modified}
                        >
                          <Save size={16} className="mr-2" />
                          Save
                        </button>
                      )}
                    </div>
                  </div>
              
                  <div className="flex flex-col lg:flex-row lg:space-x-6">
                    {/* Editor Panel */}
                    {!previewMode && (
                      <div className="w-full lg:w-1/2 bg-gray-850 border border-gray-700 rounded-xl p-4 mb-6 lg:mb-0">
                        {/* Tabs */}
                        <div className="flex border-b border-gray-700 mb-4">
                          <button
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'design' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                            onClick={() => setActiveTab('design')}
                          >
                            <Palette size={16} className="inline mr-2" />
                            Design
                          </button>
                          <button
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'links' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                            onClick={() => setActiveTab('links')}
                          >
                            <Link2 size={16} className="inline mr-2" />
                            Content
                          </button>
                        </div>
              
                        {/* Tab Content */}
                        {renderTabContent()}
                      </div>
                    )}
              
                    {/* Preview Panel */}
                    <div className={`w-full ${!previewMode ? 'lg:w-1/2' : 'lg:w-full lg:max-w-lg lg:mx-auto'} bg-gray-850 border border-gray-700 rounded-xl p-6`}>
                      <div className="bg-gray-900 rounded-lg p-6 min-h-[500px] flex flex-col">
                        {renderPreview()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              );
              };

              return (
                <div className="min-h-screen bg-gray-900 text-white">
                  <div className="container mx-auto px-4 py-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <h1 className="text-2xl font-bold">Link Builder</h1>
                      <div className="flex items-center">
                        {modified && !savedMessage && (
                          <span className="text-xs text-yellow-400 mr-3">Unsaved changes</span>
                        )}
                        {savedMessage && (
                          <span className="text-xs text-green-400 mr-3">Changes saved!</span>
                        )}
                        <button
                          className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg mr-2"
                          onClick={() => setPreviewMode(!previewMode)}
                        >
                          <Eye size={16} className="mr-2" />
                          {previewMode ? 'Edit' : 'Preview'}
                        </button>
                        {!previewMode && (
                          <button
                            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
                            onClick={saveChanges}
                            disabled={!modified}
                          >
                            <Save size={16} className="mr-2" />
                            Save
                          </button>
                        )}
                      </div>
                    </div>
              
                    <div className="flex flex-col lg:flex-row lg:space-x-6">
                      {/* Editor Panel */}
                      {!previewMode && (
                        <div className="w-full lg:w-1/2 bg-gray-850 border border-gray-700 rounded-xl p-4 mb-6 lg:mb-0">
                          {/* Tabs */}
                          <div className="flex border-b border-gray-700 mb-4">
                            <button
                              className={`px-4 py-2 text-sm font-medium ${activeTab === 'design' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                              onClick={() => setActiveTab('design')}
                            >
                              <Palette size={16} className="inline mr-2" />
                              Design
                            </button>
                            <button
                              className={`px-4 py-2 text-sm font-medium ${activeTab === 'links' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                              onClick={() => setActiveTab('links')}
                            >
                              <Link2 size={16} className="inline mr-2" />
                              Content
                            </button>
                          </div>
              
                          {/* Tab Content */}
                          {renderTabContent()}
                        </div>
                      )}
              
                      {/* Preview Panel */}
                      <div className={`w-full ${!previewMode ? 'lg:w-1/2' : 'lg:w-full lg:max-w-lg lg:mx-auto'} bg-gray-850 border border-gray-700 rounded-xl p-6`}>
                        <div className="bg-gray-900 rounded-lg p-6 min-h-[500px] flex flex-col">
                          {renderPreview()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
              
              