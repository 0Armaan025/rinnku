import { QRCodeSVG } from "qrcode.react";
import React, { JSX } from "react";

interface ProfileComponentProps {
  displayName: string;
  email: string;
  rinnkuUrl: string;
}

const ProfileComponent: React.FC<ProfileComponentProps> = ({ displayName, email, rinnkuUrl }) => {
  return (
        <div className="grid grid-cols-1 gap-6">
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 flex flex-row items-between justify-between ">
          <div className="flex flex-col md:flex-row md:items-center">
          
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            <div className="mt-4 md:mt-0 md:ml-6">
              <h2 className="text-xl font-bold">{displayName}</h2>
              <p className="text-gray-400">{email}</p>
              <p className="text-gray-400">Administrator</p>
              <button className="mt-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
                Change Avatar
              </button>
            </div>
          </div>

          <QRCodeSVG value={`https://rinnku.vercel.app/@${rinnkuUrl}`} bgColor='white' level="H" marginSize={2} title={displayName} minVersion={1} imageSettings={
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
    );
}

export default ProfileComponent;