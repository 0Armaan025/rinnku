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
import { renderPreview, addField, updateField, deleteField , handleLinkIconUpload} from './helperFunctions';

import FieldType from './types';

import customizationUtils from './utils';
import { getCurrentUser, updateUser } from '@/app/utils/api';

type Props = {}


// Enhanced theme options with more professional palette




export default function CustomizationComponent(props: Props) {

  const saveChanges = async () => {
    try {
      // Get the current token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }
  
      // Format the fields data to match the User schema
      const formattedLinks = fields.map(field => ({
        name: field.name || '',
        url: field.url || '',
        type: field.type || 'social',
        animation: field.animation || 'none',
        image: field.image || "",
      }));
  
      // Prepare the user data object that matches the MongoDB schema
      const userData = {
        bio: bio || "Hey there, I'm using Rinkuu",
        rinnkuUrl: username,
        name: displayName,
        avatar: '',
        theme: selectedTheme.id || "Midnight",
        layout: selectedLayout.id || "Compact",
        animation: selectedAnimation.id || "Scale",
        links: formattedLinks || [],
        roundedCorners: roundedCorners || true,
        showShadows: showShadows || true,
        showBorders: showBorders || true,
        fullWidth: buttonFullWidth || true,
        showAvatar: showAvatar || true,
        showIcons: showLinkIcons || true,
        showBio: showBio || true,
      };
  
      // Call the API function to update the user
      const response = await updateUser(token, userData);
      
      if (response.error) {
        console.error("Error saving changes:", response.error);
        return;
      }
  
      // Show success message and reset modified state
      setSavedMessage(true);
      setModified(false);
      
      // Hide the success message after 3 seconds
      setTimeout(() => {
        setSavedMessage(false);
      }, 3000);
      
    } catch (error) {
      console.error("Error saving changes:", error);
    }
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




  // UI State
  const [activeTab, setActiveTab] = useState('design');
  const [selectedTheme, setSelectedTheme] = useState(customizationUtils.themeOptions[0]);
  const [selectedLayout, setSelectedLayout] = useState(customizationUtils.layoutTemplates[0]);
  const [selectedAnimation, setSelectedAnimation] = useState(customizationUtils.animationOptions[0]);
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
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState("");
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
    { id: 1, name: '', url: '', image: '', type: 'default', animation: 'none' },
  ]);


  
  // Update the useEffect hook to find the matching theme in the options array
  useEffect(() => {
    const getCurrentUserData = async () => {
      const response = await getCurrentUser(localStorage.getItem("token"));
  
      if (response) {
        // Initialize fields with data from backend
        setDisplayName(response.name);
        setUsername(response.rinnkuUrl?response.rinnkuUrl?response.rinnkuUrl:"":response.name?response.name:"");
        setBio(response.bio || 'Hey there! im using Rinkuu');
        setAvatar(response.avatar!="" || response.avatar!=null?response.avatar:"");
        
        // Find the matching theme object
        const matchingTheme = customizationUtils.themeOptions.find(theme => theme.id === response.theme);
        if (matchingTheme) {
          setSelectedTheme(matchingTheme);
        }
  
        // Find the matching layout object
        const matchingLayout = customizationUtils.layoutTemplates.find(layout => layout.id === response.layout);
        if (matchingLayout) {
          setSelectedLayout(matchingLayout);
        }
  
        // Find the matching animation object
        const matchingAnimation = customizationUtils.animationOptions.find(animation => animation.id === response.animation);
        if (matchingAnimation) {
          setSelectedAnimation(matchingAnimation);
        }
  
        setShowBio(response.showBio);
        setShowAvatar(response.showAvatar);
        setRoundedCorners(response.roundedCorners);
        setShowBorders(response.showBorders);
        setShowShadows(response.showShadows);
        setButtonFullWidth(response.buttonFullWidth);
        setShowLinkIcons(response.showLinkIcons);
        
        alert(response.links[0].name);

        if (response.links && response.links.length > 0) {
          const formattedFields = response.links.map((link:FieldType, index:number) => {
            // Ensure each link is a valid object
            if (!link) return null;
            
            return {
              id: index + 1,
              title: link.name || '', // Use empty string if title is null
              link: link.url || '',  // Use empty string if link is null
              image: link.image || '',
              type: link.type || 'default',
              animation: link.animation || 'none',
              hidden: false
            };
          }).filter((item: FieldType | null): item is FieldType => item !== null); // Remove any null entries
          
          setFields(formattedFields);
        }
        
      }
      
    };
  
    getCurrentUserData();
  }, []);

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
                  {customizationUtils.themeOptions.map((theme) => (
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
                  {customizationUtils.layoutTemplates.map((layout) => (
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
                  {customizationUtils.animationOptions.map((animation) => (
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
                    value={avatar || 'no avatar yet'}
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
                    onClick={() => {
                      addField(
                        fields,
                        setFields,
                        
                      );
                    }}
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
                              value={field.name || 'no title'}
                              onChange={(e) => updateField(field.id, 'name', e.target.value, fields, setFields)}
                              className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
                              placeholder="Link Title"
                            />
                          </div>
                          <div className="flex items-center">
                            <button
                              className="p-1 hover:bg-gray-700 rounded-md"
                              onClick={() => updateField(field.id, 'hidden', !field.hidden, fields, setFields)}
                            >
                              <Eye size={16} className={field.hidden ? 'text-gray-500' : 'text-gray-300'} />
                            </button>
                            <button
                              className="p-1 hover:bg-gray-700 rounded-md ml-1"
                              onClick={() => deleteField(field.id, fields, setFields)}
                            >
                              <Trash2 size={16} className="text-gray-500 hover:text-red-400" />
                            </button>
                          </div>
                        </div>
              
                        <div className="mb-3">
                          <input
                            type="text"
                            value={field.url || 'no link'}
                            onChange={(e) => updateField(field.id, 'url', e.target.value, fields, setFields)}
                            className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
                            placeholder="https://example.com"
                          />
                        </div>
              
                        <div className="flex items-center">
                          <div className="relative mr-3">
                            <div className="flex items-center bg-gray-700 border border-gray-600 rounded px-2 py-1">
                              <span className="text-xs mr-1">Type:</span>
                              {customizationUtils.linkTypes.find(lt => lt.id === field.type)?.icon || <LinkIcon size={14} />}
                              <select
                                value={field.type || 'no type'}
                                onChange={(e) => updateField(field.id, 'type', e.target.value, fields, setFields)}
                                className="bg-transparent text-xs ml-1 outline-none appearance-none  pl-1"
                              >
                                {customizationUtils.linkTypes.map(lt => (
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
                                value={field.animation || 'no anim'}
                                onChange={(e) => updateField(field.id, 'animation', e.target.value, fields, setFields)}
                                className="bg-transparent text-xs ml-1 outline-none appearance-none pl-1"
                              >
                                {customizationUtils.animationOptions.map(ao => (
                                  <option key={ao.id} value={ao.id} className="text-black hover:cursor-pointer"> {ao.name}</option>
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
                                onChange={(e) => handleLinkIconUpload(field.id, e, fields, setFields)}
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
                        onClick={()=>{
                          addField(
                            fields,
                            setFields,
                            
                          );
                        }}
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
                    <h1 className="text-2xl font-bold">Rinkuu</h1>
                    <div className="flex items-center">
                      {modified && !savedMessage && (
                        <span className="text-xs text-yellow-400 mr-3">Unsaved changes</span>
                      )}
                      {savedMessage && (
                        <span className="text-xs text-green-400 mr-3">Changes saved!</span>
                      )}
                      <button
                        className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg mr-2"
                        onClick={() => {
                          setPreviewMode(!previewMode);
                          saveChanges();
                        }}
                      >
                        <Eye size={16} className="mr-2" />
                        {previewMode ? 'Edit' : 'Preview'}
                      </button>
                      {!previewMode && (
                        <button
                          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
                          onClick={() => {
                            saveChanges();
                          }}
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
                        {renderPreview(
                          selectedLayout,
                          showAvatar,
                          showBorders,
                          selectedTheme,
                          avatarFile,
                          avatarPreview,
                          avatar,
                          displayName,
                          showBio,
                          bio,
                          fields,
                          buttonFullWidth,
                          showLinkIcons
                        )}
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
                      <h1 className="text-2xl font-bold">Rinkuu</h1>
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
                            onClick={() => {
                              saveChanges();
                            }}
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
                          {renderPreview(
                            selectedLayout,
                            showAvatar,
                            showBorders,
                            selectedTheme,
                            avatarFile,
                            avatarPreview,
                            avatar,
                            displayName,
                            showBio,
                            bio,
                            fields,
                            buttonFullWidth,
                            showLinkIcons
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
              
              