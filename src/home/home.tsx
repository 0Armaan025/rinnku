"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import FeatureCard from "@/components/feature-card/FeatureCard";

const HomePage = () => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null); // ✅ Fix 1


  // Multiple taglines to cycle through
  const taglines = [
    "a connecting platform that exceeds expectations!",
    "your digital identity, simplified.",
    "one link for all your online content.",
    "the easiest way to share everything you create.",
    "where your digital presence comes together.",
  ];

  // Typewriter effect
  useEffect(() => {
    let textTimer: NodeJS.Timeout | undefined; // ✅ Fix 2


    if (isTyping) {
      if (displayText.length < taglines[textIndex].length) {
        textTimer = setTimeout(() => {
          setDisplayText(taglines[textIndex].substring(0, displayText.length + 1));
        }, 50);
      } else {
        textTimer = setTimeout(() => setIsTyping(false), 1500);
      }
    } else {
      if (displayText.length > 0) {
        textTimer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30);
      } else {
        setTextIndex((textIndex + 1) % taglines.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(textTimer );
  }, [displayText, isTyping, textIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.replace("@", ""));
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // ✅ Fix 1: Ensuring `inputRef.current` is not null
    }
  };

  // Feature cards data
  const features = [
    {
      icon: "https://cdn-icons-png.flaticon.com/128/1017/1017466.png",
      title: "One Link for Everything",
      description: "Share all your content with just one link. Simplify your online presence and never worry about which link to share again.",
      borderColor: "from-indigo-500 to-purple-500"
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/128/10307/10307717.png",
      title: "Detailed Analytics",
      description: "Track visits, clicks, and engagement. Understand your audience better with comprehensive analytics.",
      borderColor: "from-cyan-500 to-blue-500"
    },
    {
      icon: "https://cdn-icons-png.flaticon.com/128/3418/3418201.png",
      title: "Custom Branding",
      description: "Make your profile uniquely yours with custom colors, fonts, and themes that match your personal brand.",
      borderColor: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#030213] to-[#0f0a2d] px-4 sm:px-6 pb-20">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto pt-20 pb-16 text-center">
        <div className="space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span className="text-white">
              <span className="bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Rinnku
              </span>{" "}
              is:
            </span>
            <span className="text-gray-300 min-h-8 block mt-2">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Connect all your content, profiles, and links in one beautiful, easy-to-share page. Stand out and make sharing simple.
          </p>

          {/* Input & Button */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="relative rounded-lg shadow-md flex-1 max-w-md w-full">
              <div 
                className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400" 
                onClick={focusInput}
              >
                rinkuu.com/@
              </div>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="username"
                className="w-full py-3 pl-28 pr-3 bg-[#1a1630] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto">
              Claim Your Rinnku
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-10 text-sm text-gray-400">
            <p>Join <span className="text-white font-semibold">Armaan</span> and many others in the process</p>
            <div className="flex justify-center mt-4 space-x-6">
              <div className="flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <span className="ml-2">5/5 stars by Armaan</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards - Masonry Layout */}
      <div className="max-w-6xl mt-16 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`${
                index === 1 ? "md:-mt-16" : (index === 2 ? "md:-mb-32" : "")
              } transform transition-all duration-300 hover:-translate-y-2 cursor-pointer`}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                borderColor={feature.borderColor}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;