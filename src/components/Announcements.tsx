import React, { useState } from 'react';
import { Megaphone, Pin, Calendar, Tag, Bell } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'academic' | 'events' | 'administrative' | 'emergency';
  priority: 'high' | 'medium' | 'low';
  date: string;
  author: string;
  isPinned: boolean;
}

const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Semester End Examinations Schedule Released',
    content: 'The examination schedule for the current semester has been published. Students are advised to check their exam dates and venues on the student portal. Regular classes will end on August 20th, and examinations will begin from August 10th.',
    category: 'academic',
    priority: 'high',
    date: '2025-08-10',
    author: 'Academic Office',
    isPinned: true
  },
  {
    id: '2',
    title: 'Annual Tech Fest Registration Open',
    content: 'Registration for the Annual Tech Fest 2025 is now open! Join us for three days of innovation, competitions, and networking. Early bird registration ends September 5th with special discounts.',
    category: 'events',
    priority: 'medium',
    date: '2025-08-02',
    author: 'Student Activities',
    isPinned: true
  },
  {
    id: '3',
    title: 'Library Extended Hours During Exam Period',
    content: 'The central library will extend its operating hours from 7 AM to 11 PM during the examination period. Additional study spaces and resources will be available.',
    category: 'academic',
    priority: 'medium',
    date: '2025-03-02',
    author: 'Library Administration',
    isPinned: false
  },
  {
    id: '4',
    title: 'Campus WiFi Maintenance Scheduled',
    content: 'Network maintenance is scheduled for March 3rd from 2 AM to 6 AM. There may be intermittent connectivity issues during this period. We apologize for any inconvenience.',
    category: 'administrative',
    priority: 'low',
    date: '2025-02-25',
    author: 'IT Services',
    isPinned: false
  },
  {
    id: '5',
    title: 'Fire Safety Drill - January 15th',
    content: 'A campus-wide fire safety drill will be conducted on January 15th. All students and staff must participate. Assembly points are marked near each building.',
    category: 'emergency',
    priority: 'high',
    date: '2025-01-02',
    author: 'Safety Department',
    isPinned: false
  }
];

const categoryColors = {
  academic: 'bg-blue-600',
  events: 'bg-purple-600',
  administrative: 'bg-gray-600',
  emergency: 'bg-red-600'
};

const priorityColors = {
  high: 'border-l-red-500',
  medium: 'border-l-yellow-500',
  low: 'border-l-green-500'
};

const Announcements: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredAnnouncements = selectedCategory === 'all' 
    ? announcements 
    : announcements.filter(ann => ann.category === selectedCategory);

  const pinnedAnnouncements = filteredAnnouncements.filter(ann => ann.isPinned);
  const regularAnnouncements = filteredAnnouncements.filter(ann => !ann.isPinned);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Megaphone className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Announcements</h1>
          <p className="text-gray-400">Stay updated with campus news and events</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          All
        </button>
        {Object.keys(categoryColors).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Pinned Announcements */}
      {pinnedAnnouncements.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Pin className="w-5 h-5 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Pinned Announcements</h2>
          </div>
          <div className="space-y-4">
            {pinnedAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className={`bg-gray-800 rounded-xl p-6 border-l-4 ${priorityColors[announcement.priority]} border border-gray-700`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium text-white ${categoryColors[announcement.category]}`}>
                        {announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)}
                      </span>
                      {announcement.priority === 'high' && (
                        <span className="flex items-center space-x-1 text-red-400 text-xs">
                          <Bell className="w-3 h-3" />
                          <span>High Priority</span>
                        </span>
                      )}
                      <Pin className="w-4 h-4 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{announcement.title}</h3>
                    <p className="text-gray-300 mb-3">{announcement.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(announcement.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Tag className="w-4 h-4" />
                        <span>{announcement.author}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regular Announcements */}
      <div>
        {pinnedAnnouncements.length > 0 && (
          <h2 className="text-xl font-bold text-white mb-4">Recent Announcements</h2>
        )}
        <div className="space-y-4">
          {regularAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className={`bg-gray-800 rounded-xl p-6 border-l-4 ${priorityColors[announcement.priority]} border border-gray-700 hover:bg-gray-750 transition-colors`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium text-white ${categoryColors[announcement.category]}`}>
                      {announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)}
                    </span>
                    {announcement.priority === 'high' && (
                      <span className="flex items-center space-x-1 text-red-400 text-xs">
                        <Bell className="w-3 h-3" />
                        <span>High Priority</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{announcement.title}</h3>
                  <p className="text-gray-300 mb-3">{announcement.content}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(announcement.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Tag className="w-4 h-4" />
                      <span>{announcement.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredAnnouncements.length === 0 && (
        <div className="text-center py-12">
          <Megaphone className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No announcements found for the selected category.</p>
        </div>
      )}
    </div>
  );
};

export default Announcements;