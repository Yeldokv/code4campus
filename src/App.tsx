import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CampusMap from './components/CampusMap';
import EventNavigation from './components/EventNavigation';
import Announcements from './components/Announcements';
import LostFound from './components/LostFound';
import LibraryBooks from './components/LibraryBooks';
import CanteenMenu from './components/CanteenMenu';
import ConcernDiscussion from './components/ConcernDiscussion';
import EventDiscussion from './components/EventDiscussion';
import ComplaintPanel from './components/ComplaintPanel';
import AcademicCalendar from './components/AcademicCalendar';
import TransportTracker from './components/TransportTracker';
import AchievementBoard from './components/AchievementBoard';
import SocietiesDirectory from './components/SocietiesDirectory';
import Footer from './components/Footer';

export type TabType = 'dashboard' | 'map' | 'events' | 'announcements' | 'lostfound' | 'library' | 
  'canteen' | 'concerns' | 'eventdiscussion' | 'complaints' | 'calendar' | 'transport' | 
  'achievements' | 'societies';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [user, setUser] = useState<{studentId: string} | null>(null);

  const handleLogin = (studentId: string, password: string) => {
    // Simple validation - in real app, this would be API call
    if (studentId && password) {
      setIsLoggedIn(true);
      setUser({ studentId });
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setActiveTab('dashboard');
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard onTabChange={setActiveTab} />;
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
      default: return <Dashboard onTabChange={setActiveTab} />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar 
        user={user} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onLogout={handleLogout} 
      />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {renderActiveComponent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;