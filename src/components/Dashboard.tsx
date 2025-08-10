import React, { useEffect, useRef, useState } from 'react';
import { 
  MapPin, Calendar, MessageSquare, AlertTriangle, 
  Book, UtensilsCrossed, Award, Users, Bus, Search 
} from 'lucide-react';
import { TabType } from '../App';

interface DashboardProps {
  onTabChange: (tab: TabType) => void;
  theme?: 'dark' | 'light';
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
  { label: 'Active Students', value: 12456, color: 'text-blue-400' },
  { label: 'Campus Events', value: 23, color: 'text-green-400' },
  { label: 'Available Books', value: 45892, color: 'text-purple-400' },
  { label: 'Active Societies', value: 18, color: 'text-yellow-400' },
];

// Animated counter component with uniform speed for all numbers
function AnimatedNumber({ start, end, duration = 2500 }: { start: number, end: number, duration?: number }) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    let startTimestamp: number | null = null;
    function animate(ts: number) {
      if (!startTimestamp) startTimestamp = ts;
      const progress = Math.min((ts - startTimestamp) / duration, 1);
      const current = Math.floor(start + (end - start) * progress);
      setValue(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setValue(end);
      }
    }
    requestAnimationFrame(animate);
    // eslint-disable-next-line
  }, [start, end, duration]);

  return <span>{value.toLocaleString()}</span>;
}

const Dashboard: React.FC<DashboardProps> = ({ onTabChange, theme = 'dark' }) => {
  const [headerShrunk, setHeaderShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderShrunk(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gradients for tabs
  const statGradient = theme === 'dark'
    ? 'linear-gradient(135deg, #23395d 0%, #16213e 100%)'
    : 'linear-gradient(135deg, #e0e7ef 0%, #f8fafc 100%)';

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border border-gray-700 mt-2 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome to Campus Connect</h1>
        <p className="text-gray-300 text-1xl">Your one-stop portal for all campus services and information</p>
      </div>

      {/* Logo + Institute Name Header (between welcome and stats) */}
      <div
        className="w-full flex flex-col items-center justify-center"
        style={{
          margin: headerShrunk ? '0px' : '32px 0 32px 0',
          height: headerShrunk ? '0px' : '90px',
          opacity: headerShrunk ? 0 : 1,
          overflow: 'hidden',
          transition: 'height 0.8s, opacity 0.8s, margin 0.8s'
        }}
      >
        <div className="flex flex-row items-center justify-center w-full max-w-4xl min-w-0 px-2">
          <img
            src="src/assets/logo_asiet.webp"
            alt="College Logo"
            style={{
              width: headerShrunk ? '0px' : '90px',
              height: headerShrunk ? '0px' : '90px',
              objectFit: 'contain',
              transition: 'width 0.8s, height 0.8s'
            }}
          />
          <span
            className="ml-6 text-white font-bold tracking-wide text-xl md:text-3xl uppercase overflow-hidden text-ellipsis whitespace-nowrap min-w-0"
            style={{
              letterSpacing: '2px',
              transition: 'font-size 0.8s',
              fontSize: headerShrunk ? '0px' : undefined,
              maxWidth: 'calc(100vw - 160px)',
              whiteSpace: 'nowrap'
            }}
          >
            ASIET
          </span>
        </div>
      </div>

      {/* Number Tabs (Stats Grid) */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        style={{
          marginTop: headerShrunk ? '16px' : '0px'
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-lg p-6 border border-gray-700"
            style={{
              background: statGradient,
              color: theme === 'dark' ? '#e3e8ee' : '#222'
            }}
          >
            <div className={`text-2xl font-bold mb-1`} style={{ color: theme === 'dark' ? '#fff' : '#222' }}>
              <AnimatedNumber
                start={Math.floor(stat.value * 0.8)}
                end={stat.value}
                duration={1500}
              />
            </div>
            <div className={theme === 'dark' ? "text-gray-200 text-sm" : "text-gray-700 text-sm"}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, idx) => {
            const IconComponent = action.icon;
            // Dull gradient for quick actions
            let gradientBg = theme === 'dark'
              ? 'linear-gradient(135deg, #295eb8ff 0%, #16213e 100%)'
              : 'linear-gradient(135deg, #e0e7ef 0%, #f8fafc 100%)';
            let iconColor = '#38bdf8'; // default blue
            if (action.color === 'bg-blue-600') {
              iconColor = '#3b82f6';
            } else if (action.color === 'bg-green-600') {
              iconColor = '#22c55e';
            } else if (action.color === 'bg-purple-600') {
              iconColor = '#a78bfa';
            } else if (action.color === 'bg-yellow-600') {
              iconColor = '#eab308';
            } else if (action.color === 'bg-indigo-600') {
              iconColor = '#6366f1';
            } else if (action.color === 'bg-orange-600') {
              iconColor = '#f59e42';
            } else if (action.color === 'bg-teal-600') {
              iconColor = '#14b8a6';
            } else if (action.color === 'bg-red-600') {
              iconColor = '#ef4444';
            }
            return (
              <button
                key={action.id}
                onClick={() => onTabChange(action.id)}
                className="border border-gray-700 rounded-xl p-6 text-left transition-all duration-200 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg group"
                style={{
                  background: gradientBg,
                  color: theme === 'dark' ? '#e3e8ee' : '#222'
                }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ background: 'rgba(0,0,0,0.10)' }}
                >
                  <IconComponent className="w-6 h-6" style={{ color: iconColor }} />
                </div>
                <h3 className="font-semibold mb-2">{action.title}</h3>
                <p className={theme === 'dark' ? "text-gray-200 text-sm" : "text-gray-700 text-sm"}>{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mt-8">
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