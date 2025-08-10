import React from 'react';
import { 
  MapPin, Calendar, MessageSquare, AlertTriangle, 
  Book, UtensilsCrossed, Award, Users, Bus, Search 
} from 'lucide-react';
import { TabType } from '../App';

interface DashboardProps {
  onTabChange: (tab: TabType) => void;
}

const quickActions = [
  { id: 'map' as TabType, title: 'Campus Map', description: 'Navigate campus buildings', icon: MapPin, color: 'bg-blue-600' },
  { id: 'calendar' as TabType, title: 'Academic Calendar', description: 'Important dates & events', icon: Calendar, color: 'bg-green-600' },
  { id: 'announcements' as TabType, title: 'Announcements', description: 'Latest campus news', icon: MessageSquare, color: 'bg-purple-600' },
  { id: 'transport' as TabType, title: 'Transport Tracker', description: 'Bus schedules & updates', icon: Bus, color: 'bg-yellow-600' },
  { id: 'library' as TabType, title: 'Library Books', description: 'Search book availability', icon: Book, color: 'bg-indigo-600' },
  { id: 'canteen' as TabType, title: 'Canteen Menu', description: 'Today\'s menu & availability', icon: UtensilsCrossed, color: 'bg-orange-600' },
  { id: 'lostfound' as TabType, title: 'Lost & Found', description: 'Report or find items', icon: Search, color: 'bg-teal-600' },
  { id: 'complaints' as TabType, title: 'Submit Complaint', description: 'Report issues or concerns', icon: AlertTriangle, color: 'bg-red-600' },
];

const stats = [
  { label: 'Active Students', value: '12,456', color: 'text-blue-400' },
  { label: 'Campus Events', value: '23', color: 'text-green-400' },
  { label: 'Available Books', value: '45,892', color: 'text-purple-400' },
  { label: 'Active Societies', value: '18', color: 'text-yellow-400' },
];

const Dashboard: React.FC<DashboardProps> = ({ onTabChange }) => {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border border-gray-700">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome to Campus Navigation</h1>
        <p className="text-gray-300 text-lg">Your one-stop portal for all campus services and information</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onTabChange(action.id)}
                className="bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-xl p-6 text-left transition-all duration-200 hover:scale-105 hover:shadow-lg group"
              >
                <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">{action.title}</h3>
                <p className="text-gray-400 text-sm">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Recent Updates</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-gray-300">New announcement posted about semester exams</span>
            <span className="text-gray-500 text-sm ml-auto">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-gray-300">Library books updated - New arrivals available</span>
            <span className="text-gray-500 text-sm ml-auto">5 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span className="text-gray-300">Bus schedule updated for Route 3</span>
            <span className="text-gray-500 text-sm ml-auto">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;