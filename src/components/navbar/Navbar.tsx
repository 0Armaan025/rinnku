"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links
  const navLinks = [
    
    { name: "About", href: "/about" },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
      <nav
        className={`transition-all duration-300 mx-auto my-4 rounded-xl ${
          scrolled 
            ? "bg-[#030213]/85 backdrop-blur-md py-2 shadow-lg" 
            : "bg-[#030213]/90 py-4"
        }`}
        style={{ fontFamily: "Poppins" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="relative overflow-hidden">
                  <Image 
                    src="/logo.png" 
                    alt="Logo" 
                    height={40} 
                    width={120} 
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </Link>
            </div>

            {/* Combined Navigation and Buttons for Desktop */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 relative px-1 py-2 text-sm font-medium transition-colors duration-200 hover:text-white group"
                >
                  {link.name}
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
              
              <Link href="/auth">
              <button 
                className="relative overflow-hidden bg-gradient-to-r cursor-pointer from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-md transition-all duration-300 hover:shadow-indigo-500/30 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-none border border-indigo-400/30"
              >
                <span className="relative z-10">
                  Get Started
                </span>
                <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 hover:opacity-20"></div>
                <div className="absolute -inset-px bg-gradient-to-r from-pink-500 to-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
              </button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                className="relative overflow-hidden md:hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-md transition-all duration-300 hover:shadow-indigo-500/30 mr-2"
              >
                <span className="relative z-10 cursor-pointer">
                  Get Started
                </span>
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed */}
                <svg
                  className={`${mobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* Icon when menu is open */}
                <svg
                  className={`${mobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on mobile menu state */}
        <div className={`${mobileMenuOpen ? "block" : "hidden"} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;