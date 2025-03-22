import { QRCodeSVG } from "qrcode.react";
import React, { useState, useRef, ChangeEvent, DragEvent } from "react";

interface ProfileComponentProps {
  displayName: string;
  email: string;
  avatar: string;
  rinnkuUrl: string;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({ displayName, email, avatar, rinnkuUrl }) => {
  const [avatarFile, setAvatarFile] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Get initials from display name for default avatar
  const getInitials = (): string => {
    return displayName
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarFile(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarFile(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 flex flex-row items-between justify-between">
        <div className="flex flex-col md:flex-row md:items-center">
          <div 
            className={`w-24 h-24 rounded-full flex items-center justify-center cursor-pointer relative overflow-hidden ${
              isDragging ? 'border-2 border-indigo-400' : ''
            } ${
              avatar ? '' : 'bg-gradient-to-r from-indigo-500 to-purple-600'
            }`}
            onClick={triggerFileInput}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {avatar ? (
              <img src={avatar} alt="User avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-2xl font-bold">{getInitials()}</span>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-medium">Change Avatar</span>
            </div>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          <div className="mt-4 md:mt-0 md:ml-6">
            <h2 className="text-xl font-bold">{displayName}</h2>
            <p className="text-gray-400">{email}</p>
            <p className="text-gray-400">Administrator</p>
            <button 
              className="mt-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white"
              onClick={triggerFileInput}
            >
              Change Avatar
            </button>
          </div>
        </div>

        <QRCodeSVG 
          value={`https://rinnku.vercel.app/@${rinnkuUrl}`} 
          bgColor="white" 
          level="H" 
          size={128}
          
          className="hidden md:block"
          imageSettings={
            {
              src: '/logo.png',
              height: 100,
              width: 100,
              excavate: false,
            }
          }
        />
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
          <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white" onClick={() => alert('yo just dm armaan!')}>
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;