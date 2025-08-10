import React, { useState } from 'react';
import { MessageCircle, Plus, ThumbsUp, Calendar, Users, Clock, User, Pin } from 'lucide-react';

interface EventDiscussion {
  id: string;
  title: string;
  content: string;
  author: string;
  eventName: string;
  category: 'planning' | 'feedback' | 'collaboration' | 'announcement' | 'question';
  date: string;
  likes: number;
  replies: number;
  isPinned: boolean;
  eventDate?: string;
}

const discussions: EventDiscussion[] = [
  {
    id: '1',
    title: 'Tech Fest 2024 - Looking for Team Members',
    content: 'Hi everyone! I\'m organizing a robotics competition team for the upcoming Tech Fest. We need 2 more members with experience in Arduino or Raspberry Pi. Great opportunity to showcase your skills!',
    author: 'TechEnthusiast',
    eventName: 'Annual Tech Fest 2024',
    category: 'collaboration',
    date: '2024-02-28',
    eventDate: '2024-03-15',
    likes: 18,
    replies: 12,
    isPinned: true
  },
  {
    id: '2',
    title: 'Cultural Night Performance Registration',
    content: 'Registration for Cultural Night performances is now open! We\'re looking for dance, music, drama, and art performances. Deadline is March 5th. Let\'s make this the best cultural night ever!',
    author: 'CulturalCommittee',
    eventName: 'Cultural Night 2024',
    category: 'announcement',
    date: '2024-02-27',
    eventDate: '2024-03-20',
    likes: 34,
    replies: 8,
    isPinned: true
  },
  {
    id: '3',
    title: 'Sports Day - Volunteer Coordination',
    content: 'We need volunteers for the upcoming Sports Day event. Various roles available including event coordination, score keeping, and crowd management. Community service hours will be provided.',
    author: 'SportsCoordinator',
    eventName: 'Annual Sports Day',
    category: 'planning',
    date: '2024-02-26',
    eventDate: '2024-04-10',
    likes: 12,
    replies: 15,
    isPinned: false
  },
  {
    id: '4',
    title: 'Guest Speaker Suggestions for Career Fair',
    content: 'The career fair organizing committee is looking for suggestions for guest speakers from the industry. Please share names of professionals you\'d like to hear from.',
    author: 'CareerServices',
    eventName: 'Career Fair 2024',
    category: 'planning',
    date: '2024-02-25',
    eventDate: '2024-03-25',
    likes: 9,
    replies: 22,
    isPinned: false
  },
  {
    id: '5',
    title: 'Photography Contest - Theme Ideas',
    content: 'What themes would you like to see for this year\'s photography contest? Last year\'s "Campus Life" theme was very popular. Share your creative ideas!',
    author: 'PhotoClub',
    eventName: 'Annual Photography Contest',
    category: 'question',
    date: '2024-02-24',
    eventDate: '2024-04-01',
    likes: 16,
    replies: 18,
    isPinned: false
  }
];

const categoryColors = {
  planning: 'bg-blue-600',
  feedback: 'bg-green-600',
  collaboration: 'bg-purple-600',
  announcement: 'bg-yellow-600',
  question: 'bg-teal-600'
};

const EventDiscussion: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredDiscussions = discussions.filter(discussion => {
    return selectedCategory === 'all' || discussion.category === selectedCategory;
  });

  const pinnedDiscussions = filteredDiscussions.filter(d => d.isPinned);
  const regularDiscussions = filteredDiscussions.filter(d => !d.isPinned);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MessageCircle className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">Discussions</h1>
            <p className="text-gray-400">Collaborate, plan, and discuss campus events</p>
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Start Discussion</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All Discussions
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
      </div>

      {/* Pinned Discussions */}
      {pinnedDiscussions.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Pin className="w-5 h-5 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Featured Discussions</h2>
          </div>
          <div className="space-y-4">
            {pinnedDiscussions.map((discussion) => (
              <div
                key={discussion.id}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium text-white ${categoryColors[discussion.category]}`}>
                      {discussion.category.charAt(0).toUpperCase() + discussion.category.slice(1)}
                    </span>
                    <Pin className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="text-xs text-gray-400 flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(discussion.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <h3 className="text-lg font-bold text-white mb-1">{discussion.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-blue-400 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{discussion.eventName}</span>
                    {discussion.eventDate && (
                      <span className="text-gray-500">
                        • Event: {new Date(discussion.eventDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4">{discussion.content}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-gray-400">
                      <User className="w-4 h-4" />
                      <span className="text-sm">{discussion.author}</span>
                    </div>
                    <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">{discussion.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-400 hover:text-green-400 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{discussion.replies} replies</span>
                    </button>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded text-sm transition-colors">
                    Join Discussion
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regular Discussions */}
      <div>
        {pinnedDiscussions.length > 0 && (
          <h2 className="text-xl font-bold text-white mb-4">All Discussions</h2>
        )}
        <div className="space-y-4">
          {regularDiscussions.map((discussion) => (
            <div
              key={discussion.id}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium text-white ${categoryColors[discussion.category]}`}>
                    {discussion.category.charAt(0).toUpperCase() + discussion.category.slice(1)}
                  </span>
                </div>
                <div className="text-xs text-gray-400 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(discussion.date).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="mb-3">
                <h3 className="text-lg font-bold text-white mb-1">{discussion.title}</h3>
                <div className="flex items-center space-x-2 text-sm text-blue-400 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{discussion.eventName}</span>
                  {discussion.eventDate && (
                    <span className="text-gray-500">
                      • Event: {new Date(discussion.eventDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">{discussion.content}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-gray-400">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{discussion.author}</span>
                  </div>
                  <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">{discussion.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-400 hover:text-green-400 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{discussion.replies} replies</span>
                  </button>
                </div>
                <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-1 px-3 rounded text-sm transition-colors">
                  View Thread
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredDiscussions.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No discussions found for the selected category.</p>
        </div>
      )}

      {/* Discussion Stats */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Discussion Activity</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">{discussions.length}</div>
            <div className="text-gray-400 text-sm">Total Discussions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {discussions.reduce((sum, d) => sum + d.replies, 0)}
            </div>
            <div className="text-gray-400 text-sm">Total Replies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {discussions.reduce((sum, d) => sum + d.likes, 0)}
            </div>
            <div className="text-gray-400 text-sm">Total Likes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">
              {new Set(discussions.map(d => d.eventName)).size}
            </div>
            <div className="text-gray-400 text-sm">Events Discussed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDiscussion;