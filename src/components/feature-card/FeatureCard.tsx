import React from 'react';
import Image from 'next/image';

type Props = {
  icon: string;       // Path to the icon/image
  title: string;      // Title of the feature
  description: string; // Description of the feature
  borderColor?: string; // Optional custom border color
}

const FeatureCard = ({ icon, title, description, borderColor = "from-indigo-500 to-purple-500" }: Props) => {
  return (
    <div className="featureCard relative group">
      {/* Gradient border effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${borderColor} rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-300`}></div>
      
      {/* Card content */}
      <div className="relative h-full flex flex-col bg-gradient-to-b from-[#030213] to-[#0f0a2d] p-6 rounded-xl border border-gray-800">
        {/* Icon */}
        <div className="mb-4 w-12 h-12 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-2 shadow-lg">
          <Image
            src={icon}
            alt={`${title} icon`}
            width={36}
            height={36}
            className="object-contain"
          />
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        
        {/* Description */}
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  )
}

export default FeatureCard;