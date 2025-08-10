import React, { useRef, useEffect, useState } from 'react';
import { Menu, X, MapPin, LogOut } from 'lucide-react';
import { TabType } from '../App';

interface NavbarProps {
  user: {studentId: string} | null;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onLogout: () => void;
}

const tabs = [
  { id: 'dashboard' as TabType, label: 'Dashboard', icon: '🏠' },
  { id: 'map' as TabType, label: 'Campus Map', icon: '🗺️' },
  { id: 'events' as TabType, label: 'Event Navigation', icon: '🎯' },
  { id: 'announcements' as TabType, label: 'Announcements', icon: '📢' },
  { id: 'lostfound' as TabType, label: 'Lost & Found', icon: '🔍' },
  { id: 'library' as TabType, label: 'Library Books', icon: '📚' },
  { id: 'canteen' as TabType, label: 'Canteen Menu', icon: '🍽️' },
  { id: 'concerns' as TabType, label: 'Concerns', icon: '💭' },
  { id: 'eventdiscussion' as TabType, label: 'Event Discussion', icon: '💬' },
  { id: 'complaints' as TabType, label: 'Complaints', icon: '📝' },
  { id: 'calendar' as TabType, label: 'Academic Calendar', icon: '📅' },
  { id: 'transport' as TabType, label: 'Transport', icon: '🚌' },
  { id: 'achievements' as TabType, label: 'Achievements', icon: '🏆' },
  { id: 'societies' as TabType, label: 'Societies', icon: '👥' },
];

const Navbar: React.FC<NavbarProps> = ({ user, activeTab, onTabChange, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <MapPin className="w-8 h-8 text-blue-400" />
            <h1 className="text-xl font-bold text-white">Campus Connect</h1>
          </div>
          {/* User Info, Name Button, and Logout */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-gray-300">Welcome, {user?.studentId}</span>
            <button
              className="px-4 py-2 rounded-lg font-bold text-sm bg-blue-400 hover:bg-blue-500 text-white transition-colors"
              onClick={() => onTabChange('profile')}
            >
              👤
            </button>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-700"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation Tabs - Desktop */}
        <div className="hidden md:flex space-x-1 pb-4 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="grid grid-cols-2 gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 p-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
            
            {/* Mobile User Actions */}
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Welcome, {user?.studentId}</span>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;