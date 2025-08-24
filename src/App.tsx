import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CampusMap from './components/CampusMap';
import EventNavigation from './components/EventNavigation';
import Announcements from './components/Announcements';
import LostFound from './components/LostFound';
import LibraryBooks from './components/LibraryBooks';
import OrderHistory from './components/OrderHistory';
import CanteenMenu from './components/CanteenMenu';
import ConcernDiscussion from './components/ConcernDiscussion';
import EventDiscussion from './components/EventDiscussion';
import ComplaintPanel from './components/ComplaintPanel';
import AcademicCalendar from './components/AcademicCalendar';
import TransportTracker from './components/TransportTracker';
import AchievementBoard from './components/AchievementBoard';
import SocietiesDirectory from './components/SocietiesDirectory';
import Footer from './components/Footer';
import { Sun, Moon } from 'lucide-react';
import Profile from './components/Profile';

export type TabType = 
  | 'dashboard' | 'map' | 'events' | 'announcements' | 'lostfound' 
  | 'library' | 'canteen' | 'concerns' | 'eventdiscussion' 
  | 'complaints' | 'calendar' | 'transport' 
  | 'achievements' | 'societies' | 'profile' 
  | 'history';   


function App() {
const [isLoggedIn, setIsLoggedIn] = useState(() => {
  return localStorage.getItem("isLoggedIn") === "true";
});
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [user, setUser] = useState<{studentId: string} | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  React.useEffect(() => {
    const savedStudentId = localStorage.getItem("studentId");
    if (savedStudentId) {
      setUser({ studentId: savedStudentId });
    }
  }, []);

const handleLogin = (studentId: string, password: string) => {
  if (studentId && password) {
    setIsLoggedIn(true);
    setUser({ studentId });
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("studentId", studentId);
    return true;
  }
  return false;
};


const handleLogout = () => {
  setIsLoggedIn(false);
  setUser(null);
  setActiveTab('dashboard');
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("studentId");
};



  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard onTabChange={setActiveTab} theme={theme} />;
      case 'map': return <CampusMap />;
      case 'events': return <EventNavigation />;
      case 'announcements': return <Announcements />;
      case 'lostfound': return <LostFound />;
      case 'library': return <LibraryBooks />;
      case 'canteen': return <CanteenMenu />;
      case 'concerns': return <ConcernDiscussion />;
      case 'eventdiscussion': return <EventDiscussion />;
      case 'complaints': return <ComplaintPanel />;
      case 'calendar': return <AcademicCalendar />;
      case 'transport': return <TransportTracker />;
      case 'achievements': return <AchievementBoard />;
      case 'societies': return <SocietiesDirectory />;
      case 'profile': return <Profile />;
      case 'history': 
  return user ? <OrderHistory studentId={user.studentId} /> : null;

      default: return <Dashboard onTabChange={setActiveTab} theme={theme} />;
    }
  };


  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{
        background: theme === 'dark'
          ? 'linear-gradient(135deg, #181c3a 0%, #2b3260 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
        color: theme === 'dark' ? '#cbd5e1' : '#222'
      }}
    >
      <Navbar 
        user={user} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onLogout={handleLogout} 
      />
      {/* Theme toggle button - bottom right, above footer */}
      <div className="fixed bottom-8 right-20 z-0">
        <button
          onClick={handleThemeToggle}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg border border-gray-700 transition-all duration-300"
          style={{
            background: theme === 'dark'
              ? 'linear-gradient(135deg, #2b3260 0%, #181c3a 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
            color: theme === 'dark' ? '#fbbf24' : '#334155'
          }}
        >
          <span className="transition-transform duration-300" style={{
            transform: theme === 'dark' ? 'rotate(0deg)' : 'rotate(180deg)'
          }}>
            {theme === 'dark'
              ? <Sun className="w-7 h-7 animate-spin-slow" />
              : <Moon className="w-7 h-7 animate-spin-slow" />
            }
          </span>
        </button>
      </div>
      <main className="container mx-auto px-4 py-6 max-w-7xl" style={{
        color: theme === 'dark' ? '#cbd5e1' : '#222'
      }}>
        {activeTab === 'dashboard'
          ? <Dashboard onTabChange={setActiveTab} theme={theme} />
          : renderActiveComponent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;


