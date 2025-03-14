"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Props = {};

const AboutPage = (props: Props) => {
  const [activeTab, setActiveTab] = useState("feedback");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#030213] to-[#0f0a2d] p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-gray-900 rounded-lg shadow-lg p-8 border border-gray-800"
      >
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          About
        </h1>

        <div className="space-y-6 mb-8">
          <div className="flex items-start" style={{fontFamily: "Poppins"}}>
            <div className="h-4 w-4 mt-1 rounded-full border-2 border-purple-500 border-dotted flex-shrink-0"></div>
            <p className="ml-4 text-lg text-gray-200">
              This is Commander Armaan speaking. Welcome to Rinnku, meaning Link in Japanese!
            </p>
          </div>

          <div className="flex items-start">
            <div className="h-4 w-4 mt-1 rounded-full border-2 border-purple-500 border-dotted flex-shrink-0"></div>
            <p className="ml-4 text-lg text-gray-200">
              Hope you enjoy this and share it with others!
            </p>
          </div>

          <div className="flex items-start">
            <div className="h-4 w-4 mt-1 rounded-full border-2 border-purple-500 border-dotted flex-shrink-0"></div>
            <p className="ml-4 text-lg text-gray-200">
              Based on feedback, I&apos;ll keep improving this.
            </p>
          </div>

          <div className="flex items-start">
            <div className="h-4 w-4 mt-1 rounded-full border-2 border-purple-500 border-dotted flex-shrink-0"></div>
            <p className="ml-4 text-lg text-gray-200">
              Do share your thoughts below! Signing off.
            </p>
          </div>

          <div className="pl-8 italic text-right text-gray-400">- Armaan</div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 text-lg font-semibold transition cursor-pointer ${
              activeTab === "feedback"
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-md"
                : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("feedback")}
          >
            Feedback
          </button>
          <button
            className={`ml-4 px-4 py-2 text-lg font-semibold transition ${
              activeTab === "inquiries"
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-md"
                : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("inquiries")}
          >
            Professional Inquiries
          </button>
        </div>

        {/* Tabs Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "feedback" ? (
            <div className="p-6 bg-gray-800 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Leave Feedback
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 text-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Your Feedback</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 text-white"
                    placeholder="Share your thoughts about the site..."
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-md hover:from-indigo-600 hover:to-purple-700 transition"
                >
                  Submit Feedback
                </button>
              </form>
            </div>
          ) : (
            <div className="p-6 bg-gray-800 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Professional Inquiries
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 text-white"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 text-white"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 text-white"
                    placeholder="What would you like to discuss?"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-md hover:from-indigo-600 hover:to-purple-700 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
