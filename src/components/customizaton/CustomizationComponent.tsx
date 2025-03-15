"use client";
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import {
  User, Settings, Link2, ArrowUpRight,
  Plus, Eye, Save, Trash2, ChevronDown,
  LinkIcon, DraftingCompass, X, Check, Layout,
  PanelLeft, Palette, Sparkles, Camera,
  Crop, Grip, Layers, CheckCircle, Circle, ChevronRight,
  Move, Headphones, Video, ShoppingBag, MessageSquare, MessageCircle
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

// Enhanced theme options
const themeOptions = [
  {
    id: 'midnight',
    name: 'Midnight Purple',
    from: 'from-indigo-500',
    to: 'to-purple-600',
    cardBg: 'bg-gray-900/60',
    textColor: 'text-white',
    accentColor: 'text-purple-400',
    borderColor: 'border-gray-700',
    iconColor: 'text-indigo-400'
  },
  {
    id: 'ocean',
    name: 'Ocean Blue',
    from: 'from-blue-500',
    to: 'to-cyan-600',
    cardBg: 'bg-gray-900/60',
    textColor: 'text-white',
    accentColor: 'text-cyan-400',
    borderColor: 'border-gray-700',
    iconColor: 'text-blue-400'
  },
  {
    id: 'sunset',
    name: 'Sunset Orange',
    from: 'from-orange-500',
    to: 'to-red-600',
    cardBg: 'bg-gray-900/60',
    textColor: 'text-white',
    accentColor: 'text-orange-400',
    borderColor: 'border-gray-700',
    iconColor: 'text-orange-400'
  },
  {
    id: 'forest',
    name: 'Forest Green',
    from: 'from-green-500',
    to: 'to-emerald-600',
    cardBg: 'bg-gray-900/70',
    textColor: 'text-white',
    accentColor: 'text-emerald-400',
    borderColor: 'border-gray-700',
    iconColor: 'text-green-400'
  },
  {
    id: 'royal',
    name: 'Royal Gold',
    from: 'from-yellow-500',
    to: 'to-amber-600',
    cardBg: 'bg-gray-900/70',
    textColor: 'text-white',
    accentColor: 'text-amber-400',
    borderColor: 'border-gray-700',
    iconColor: 'text-yellow-400'
  },
  {
    id: 'neon',
    name: 'Neon Dreams',
    from: 'from-pink-500',
    to: 'to-purple-600',
    cardBg: 'bg-gray-900/80',
    textColor: 'text-white',
    accentColor: 'text-pink-400',
    borderColor: 'border-gray-700',
    iconColor: 'text-pink-400'
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
  {
    id: 'pastel',
    name: 'Pastel Dream',
    from: 'from-pink-300',
    to: 'to-purple-400',
    cardBg: 'bg-gray-900/60',
    textColor: 'text-white',
    accentColor: 'text-pink-300',
    borderColor: 'border-gray-700',
    iconColor: 'text-purple-300'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    from: 'from-yellow-400',
    to: 'to-pink-600',
    cardBg: 'bg-gray-900/80',
    textColor: 'text-white',
    accentColor: 'text-yellow-300',
    borderColor: 'border-gray-700',
    iconColor: 'text-pink-400'
  },
  {
    id: 'aurora',
    name: 'Aurora Borealis',
    from: 'from-green-400',
    to: 'to-blue-500',
    cardBg: 'bg-gray-900/70',
    textColor: 'text-white',
    accentColor: 'text-green-300',
    borderColor: 'border-gray-700',
    iconColor: 'text-blue-300'
  }
];

// Layout templates
const layoutTemplates = [
  {
    id: 'standard',
    name: 'Standard',
    icon: <Layout size={16} />,
    description: 'Classic stacked layout with equal width links'
  },
  {
    id: 'compact',
    name: 'Compact',
    icon: <PanelLeft size={16} />,
    description: 'Smaller link buttons with tighter spacing'
  },
  {
    id: 'elegant',
    name: 'Elegant',
    icon: <Sparkles size={16} />,
    description: 'Sophisticated layout with refined spacing and borders'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    icon: <Crop size={16} />,
    description: 'Clean and simple with minimal distractions'
  },
  {
    id: 'grid',
    name: 'Grid',
    icon: <Grip size={16} />,
    description: 'Two-column grid layout for balanced presentation'
  },
  {
    id: 'cards',
    name: 'Cards',
    icon: <Layers size={16} />,
    description: 'Card-based layout with elevated appearance'
  }
];

// Link animations
const animationOptions = [
  { id: 'none', name: 'None', description: 'No animation' },
  { id: 'pulse', name: 'Pulse', description: 'Gentle pulsing effect' },
  { id: 'bounce', name: 'Bounce', description: 'Subtle bounce on hover' },
  { id: 'fade', name: 'Fade', description: 'Smooth fade-in transition' },
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

const CustomizationComponent = (props: Props) => {
  const [activeTab, setActiveTab] = useState('design'); // 'design', 'links'
  const [selectedTheme, setSelectedTheme] = useState(themeOptions[0]);
  const [selectedLayout, setSelectedLayout] = useState(layoutTemplates[0]);
  const [selectedAnimation, setSelectedAnimation] = useState(animationOptions[0]);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [layoutDropdownOpen, setLayoutDropdownOpen] = useState(false);
  const [animationDropdownOpen, setAnimationDropdownOpen] = useState(false);
  const [username, setUsername] = useState('johndoe');
  const [displayName, setDisplayName] = useState('John Doe');
  const [bio, setBio] = useState('Digital designer and content creator');
  const [avatar, setAvatar] = useState('');
  const [modified, setModified] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);
  const [draggingField, setDraggingField] = useState<number | null>(null);
  const [showBio, setShowBio] = useState(true);
  const [showAvatar, setShowAvatar] = useState(true);
  const [roundedCorners, setRoundedCorners] = useState(true);
  const [showBorders, setShowBorders] = useState(true);
  const [showShadows, setShowShadows] = useState(true);
  const [buttonFullWidth, setButtonFullWidth] = useState(true);
  const [showLinkIcons, setShowLinkIcons] = useState(true);

  const themeDropdownRef = useRef<HTMLDivElement>(null);
  const layoutDropdownRef = useRef<HTMLDivElement>(null);
  const animationDropdownRef = useRef<HTMLDivElement>(null);

  const [fields, setFields] = useState<FieldType[]>([
    { id: 1, title: 'Portfolio', link: 'https://portfolio.com', image: '', type: 'default', animation: 'none' },
    { id: 2, title: 'LinkedIn', link: 'https://linkedin.com', image: '', type: 'social', animation: 'none' },
    { id: 3, title: 'Twitter', link: 'https://twitter.com', image: '', type: 'social', animation: 'none' },
  ]);
  const [previewMode, setPreviewMode] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)
      ) {
        setThemeDropdownOpen(false);
      }
      if (
        layoutDropdownRef.current && !layoutDropdownRef.current.contains(event.target as Node)
      ) {
        setLayoutDropdownOpen(false);
      }

      if (
        animationDropdownRef.current && !animationDropdownRef.current.contains(event.target as Node)
      ) {
        setAnimationDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Track changes to set modified state
  useEffect(() => {
    setModified(true);
  }, [selectedTheme, selectedLayout, selectedAnimation, username, displayName, bio, avatar, fields,
    showBio, showAvatar, roundedCorners, showBorders, showShadows, buttonFullWidth, showLinkIcons]);

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

  // Get gradient classes based on selected theme
  const getGradientClasses = () => {
    return `bg-gradient-to-r ${selectedTheme.from} ${selectedTheme.to}`;
  };

  const getButtonClasses = () => {
    let classes = `mb-3 p-4 ${getGradientClasses()} flex items-center justify-between `;

    if (roundedCorners) {
      classes += 'rounded-lg ';
    } else {
      classes += 'rounded-none ';
    }

    if (showBorders) {
      classes += 'border border-gray-700/50 ';
    }

    if (showShadows) {
      classes += 'shadow-lg ';
    }

    if (selectedLayout.id === 'compact') {
      classes += 'py-2 ';
    } else if (selectedLayout.id === 'elegant') {
      classes += 'py-3 border-l-4 ';
    } else if (selectedLayout.id === 'minimal') {
      classes += 'bg-opacity-90 ';
    } else if (selectedLayout.id === 'cards') {
      classes += 'shadow-xl border-l-2 ';
    }

    return classes;
  };

  const getAnimationClass = (animation: string) => {
    switch (animation) {
      case 'pulse': return 'hover:animate-pulse';
      case 'bounce': return 'hover:animate-bounce';
      case 'fade': return 'transition-opacity hover:opacity-90';
      case 'scale': return 'transition-transform hover:scale-105';
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

  const getLinkIcon = (type: string = 'default') => {
    const linkType = linkTypes.find(lt => lt.id === type);
    return linkType ? linkType.icon : <LinkIcon size={16} />;
  };

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
            <div className={`w-24 h-24 rounded-full overflow-hidden ${showBorders ? 'border-2 ' + selectedTheme.borderColor : ''} mb-3`}>
              {avatar ? (
                <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${getGradientClasses()}`}>
                  <User size={40} className="text-white" />
                </div>
              )}
            </div>
          )}
          <h1 className={`text-xl font-bold ${selectedTheme.textColor}`}>{displayName}</h1>
          {/* <p className={`text-sm ${selectedTheme.accentColor} mb-1`}>@{username}</p> */}
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
                {showLinkIcons && (
                  <span className={`mr-3 ${selectedTheme.iconColor}`}>
                    {getLinkIcon(field.type)}
                  </span>
                )}
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
        <div>
          {/* Theme Selector */}

          <div className="mb-6">
            <h3 className="text-sm uppercase text-gray-400 mb-2">Theme</h3>
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
                <div className="absolute mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 overflow-hidden max-h-64 overflow-y-auto">
                  {themeOptions.map((theme) => (
                    <div
                      key={theme.id}
                      className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        console.log("Selected Theme:", theme);
                        setSelectedTheme({ ...theme }); // Force state update
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
          <h3 className="text-sm uppercase text-gray-400 mb-2">Layout</h3>
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
              <div className="absolute mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 overflow-hidden max-h-64 overflow-y-auto">
                {layoutTemplates.map((layout) => (
                  <div
                    key={layout.id}
                    className="flex flex-col px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      console.log("Selected Layout:", layout);
                      setSelectedLayout({ ...layout }); // Ensures state updates correctly
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


          {/* Animation Selector */}
          <div className="mb-6">
            <h3 className="text-sm uppercase text-gray-400 mb-2">Link Animation</h3>
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
                <div className="absolute mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 overflow-hidden max-h-64 overflow-y-auto">
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
          <div className="mb-6">
            <h3 className="text-sm uppercase text-gray-400 mb-2">Style Options</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm">Rounded Corners</label>
                <button
                  className="flex items-center"
                  onClick={() => setRoundedCorners(!roundedCorners)}
                >
                  {roundedCorners ? <CheckCircle size={20} className="text-green-500" /> : <Circle size={20} className="text-gray-400" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm">Show Borders</label>
                <button
                  className="flex items-center"
                  onClick={() => setShowBorders(!showBorders)}
                >
                  {showBorders ? <CheckCircle size={20} className="text-green-500" /> : <Circle size={20} className="text-gray-400" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm">Show Shadows</label>
                <button
                  className="flex items-center"
                  onClick={() => setShowShadows(!showShadows)}
                >
                  {showShadows ? <CheckCircle size={20} className="text-green-500" /> : <Circle size={20} className="text-gray-400" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm">Full Width Buttons</label>
                <button
                  className="flex items-center"
                  onClick={() => setButtonFullWidth(!buttonFullWidth)}
                >
                  {buttonFullWidth ? <CheckCircle size={20} className="text-green-500" /> : <Circle size={20} className="text-gray-400" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm">Show Link Icons</label>
                <button
                  className="flex items-center"
                  onClick={() => setShowLinkIcons(!showLinkIcons)}
                >
                  {showLinkIcons ? <CheckCircle size={20} className="text-green-500" /> : <Circle size={20} className="text-gray-400" />}
                </button>
              </div>
            </div>
          </div>

          {/* Profile Options */}
          <div className="mb-6">
            <h3 className="text-sm uppercase text-gray-400 mb-2">Profile Options</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm">Show Avatar</label>
                <button
                  className="flex items-center"
                  onClick={() => setShowAvatar(!showAvatar)}
                >
                  {showAvatar ? <CheckCircle size={20} className="text-green-500" /> : <Circle size={20} className="text-gray-400" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm">Show Bio</label>
                <button
                  className="flex items-center"
                  onClick={() => setShowBio(!showBio)}
                >
                  {showBio ? <CheckCircle size={20} className="text-green-500" /> : <Circle size={20} className="text-gray-400" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (activeTab === 'links') {
      return (
        <div>
          {/* Profile Info */}
          <div className="mb-6">
            <h3 className="text-sm uppercase text-gray-400 mb-2">Profile</h3>
            <div className="space-y-3">



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
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg resize-none"
                  placeholder="Tell people about yourself"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Avatar URL</label>
                <div className="flex">
                  <input
                    type="text"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg"
                    placeholder="https://example.com/avatar.jpg"
                  />
                  <button className="bg-gray-700 border border-gray-700 rounded-r-lg px-3">
                    <Camera size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Link Fields Management */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm uppercase text-gray-400">Links</h3>
              <button
                onClick={addField}
                className="flex items-center text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
              >
                <Plus size={14} className="mr-1" /> Add Link
              </button>
            </div>

            <div className="space-y-6">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className={`p-4 bg-gray-800 border ${draggingField === field.id ? 'border-blue-500' : 'border-gray-700'} rounded-lg relative`}
                  draggable
                  onDragStart={() => handleDragStart(field.id)}
                  onDragOver={(e) => handleDragOver(e, field.id)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => updateField(field.id, 'hidden', !field.hidden)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Eye size={16} className={field.hidden ? 'opacity-50' : ''} />
                    </button>
                    <button
                      onClick={() => deleteField(field.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="cursor-move text-gray-400">
                      <Move size={16} />
                    </div>
                  </div>

                  <div className="space-y-3 mt-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Type</label>
                      <div className="flex flex-wrap gap-2">
                        {linkTypes.map(type => (
                          <button
                            key={type.id}
                            className={`px-2 py-1 text-xs rounded flex items-center ${field.type === type.id ? 'bg-gray-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                            onClick={() => updateField(field.id, 'type', type.id)}
                          >
                            <span className="mr-1">{type.icon}</span>
                            <span>{type.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Title</label>
                      <input
                        type="text"
                        value={field.title}
                        onChange={(e) => updateField(field.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                        placeholder="Link Title"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1">URL</label>
                      <input
                        type="text"
                        value={field.link}
                        onChange={(e) => updateField(field.id, 'link', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                        placeholder="https://"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Animation</label>
                      <select
                        value={field.animation}
                        onChange={(e) => updateField(field.id, 'animation', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded"
                      >
                        {animationOptions.map(option => (
                          <option key={option.id} value={option.id}>{option.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              {fields.length === 0 && (
                <div className="text-center py-8 bg-gray-800 border border-dashed border-gray-700 rounded-lg">
                  <p className="text-gray-400 mb-3">No links yet</p>
                  <button
                    onClick={addField}
                    className="inline-flex items-center bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded"
                  >
                    <Plus size={16} className="mr-2" /> Add Your First Link
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-900 text-white">
  {/* Left Panel - Preview */}
  <div className="w-full lg:w-1/2 bg-gray-950 flex flex-col">
    <div className="flex justify-between items-center px-4 lg:px-6 py-4 border-b border-gray-800">
      <h2 className="text-lg font-medium">Preview</h2>
      <div className="flex items-center">
        <button
          onClick={() => setPreviewMode(!previewMode)}
          className={`flex items-center text-sm mr-4 ${previewMode ? 'text-blue-400' : 'text-gray-400'}`}
        >
          <Eye size={18} className="mr-1" />
          <span>Preview Mode</span>
        </button>
        <button
          onClick={saveChanges}
          disabled={!modified}
          className={`px-3 py-1 rounded text-sm flex items-center ${modified ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 cursor-not-allowed'}`}
        >
          <Save size={16} className="mr-1" />
          <span>Save</span>
        </button>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto bg-gray-950">
      <div className="max-w-xl mx-auto mt-6 lg:mt-12 px-4 lg:px-0">
        {previewMode ? (
          <div className={`bg-gray-950 ${selectedLayout.id === 'cards' ? 'p-4 lg:p-6' : 'p-6 lg:p-8'} rounded-2xl`}>
            {renderPreview()}
          </div>
        ) : (
          <div className="bg-gray-900 p-4 lg:p-6 rounded-2xl border border-gray-800 shadow-xl mb-8">
            <div className="bg-gray-950 p-4 lg:p-6 rounded-xl">
              {renderPreview()}
            </div>
          </div>
        )}
      </div>
    </div>

    {savedMessage && (
      <div className="fixed bottom-6 left-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
        <CheckCircle size={18} className="mr-2" />
        Changes saved successfully!
      </div>
    )}
  </div>

  {/* Right Panel - Edit */}
  <div className="w-full lg:w-[650px] bg-gray-900 flex flex-col justify-start items-start">
    <div className="px-4 lg:px-6 py-4 border-b border-gray-800">
      <div className="flex space-x-4">
        <button
          onClick={() => setActiveTab('design')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'design' ? 'bg-gray-800 text-white' : 'text-gray-400'}`}
        >
          <div className="flex items-center">
            <Palette size={16} className="mr-2" />
            <span>Design</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('links')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'links' ? 'bg-gray-800 text-white' : 'text-gray-400'}`}
        >
          <div className="flex items-center">
            <LinkIcon size={16} className="mr-2" />
            <span>Links & Profile</span>
          </div>
        </button>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto p-4 lg:p-6 w-[600px]
    ">
      {renderTabContent()}
    </div>
  </div>
</div>
</div>
  );
};

export default CustomizationComponent;