import React, { useState } from 'react';
import { MessageSquare, Plus, ThumbsUp, MessageCircle, Clock, User, Pin } from 'lucide-react';

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: string;
  category: 'facilities' | 'academic' | 'safety' | 'transport' | 'food' | 'other';
  priority: 'high' | 'medium' | 'low';
  date: string;
  likes: number;
  replies: number;
  isPinned: boolean;
  isResolved: boolean;
}

const discussions: Discussion[] = [
  {
    id: '1',
    title: 'WiFi connectivity issues in Main blocks',
    content: 'The WiFi connection has been very unstable in the Main blocks, especially during evening hours. This is affecting our online classes and assignments. Can the IT department look into this?',
    author: 'StudentA2025',
    category: 'facilities',
    priority: 'high',
    date: '2025-02-28',
    likes: 23,
    replies: 8,
    isPinned: true,
    isResolved: false
  },
  {
    id: '2',
    title: 'Library opening hours during exam period',
    content: 'Many students are requesting extended library hours during the upcoming exam period. The current 4 PM closing time is insufficient for proper study preparation.',
    author: 'StudyGroup2025',
    category: 'academic',
    priority: 'medium',
    date: '2025-02-27',
    likes: 15,
    replies: 12,
    isPinned: false,
    isResolved: true
  },
  {
    id: '3',
    title: 'Parking shortage near civil building',
    content: 'There are insufficient parking spaces near the civil building, especially during morning hours. Students often have to park very far and walk long distances.',
    author: 'CommutingStudent',
    category: 'transport',
    priority: 'medium',
    date: '2025-02-26',
    likes: 19,
    replies: 6,
    isPinned: false,
    isResolved: false
  },
  {
    id: '4',
    title: 'Cafeteria food quality concerns',
    content: 'Several students have reported that the food quality in the main cafeteria has declined recently. We need better hygiene standards and fresher ingredients.',
    author: 'ConcernedStudent',
    category: 'food',
    priority: 'high',
    date: '2025-02-25',
    likes: 31,
    replies: 15,
    isPinned: false,
    isResolved: false
  }
];

const categoryColors = {
  facilities: 'bg-blue-600',
  academic: 'bg-green-600',
  safety: 'bg-red-600',
  transport: 'bg-yellow-600',
  food: 'bg-orange-600',
  other: 'bg-gray-600'
};

const priorityColors = {
  high: 'border-l-red-500',
  medium: 'border-l-yellow-500',
  low: 'border-l-green-500'
};

const ConcernDiscussion: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showResolved, setShowResolved] = useState(true);

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesCategory = selectedCategory === 'all' || discussion.category === selectedCategory;
    const matchesResolved = showResolved || !discussion.isResolved;
    return matchesCategory && matchesResolved;
  });

  const pinnedDiscussions = filteredDiscussions.filter(d => d.isPinned);
  const regularDiscussions = filteredDiscussions.filter(d => !d.isPinned);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">Campus Concerns Discussion</h1>
            <p className="text-gray-400">Share and discuss campus-related concerns and suggestions</p>
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Discussion</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All Topics
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
          
          <label className="flex items-center space-x-2 text-gray-300">
            <input
              type="checkbox"
              checked={showResolved}
              onChange={(e) => setShowResolved(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Show resolved</span>
          </label>
        </div>
      </div>

      {/* Pinned Discussions */}
      {pinnedDiscussions.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Pin className="w-5 h-5 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Pinned Discussions</h2>
          </div>
          <div className="space-y-4">
            {pinnedDiscussions.map((discussion) => (
              <div
                key={discussion.id}
                className={`bg-gray-800 rounded-xl p-6 border-l-4 ${priorityColors[discussion.priority]} border border-gray-700`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium text-white ${categoryColors[discussion.category]}`}>
                      {discussion.category.charAt(0).toUpperCase() + discussion.category.slice(1)}
                    </span>
                    {discussion.isResolved && (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-600 text-white">
                        ✓ Resolved
                      </span>
                    )}
                    <Pin className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="text-xs text-gray-400 flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(discussion.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{discussion.title}</h3>
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
              className={`bg-gray-800 rounded-xl p-6 border-l-4 ${priorityColors[discussion.priority]} border border-gray-700 hover:bg-gray-750 transition-colors`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium text-white ${categoryColors[discussion.category]}`}>
                    {discussion.category.charAt(0).toUpperCase() + discussion.category.slice(1)}
                  </span>
                  {discussion.isResolved && (
                    <span className="px-2 py-1 rounded text-xs font-medium bg-green-600 text-white">
                      ✓ Resolved
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-400 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(discussion.date).toLocaleDateString()}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">{discussion.title}</h3>
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
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredDiscussions.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No discussions found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ConcernDiscussion;