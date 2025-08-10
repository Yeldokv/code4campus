import React, { useState } from 'react';
import { Award, Trophy, Medal, Star, Calendar, User, Filter } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  achiever: string;
  category: 'academic' | 'sports' | 'cultural' | 'research' | 'community' | 'leadership';
  type: 'individual' | 'team';
  date: string;
  award: string;
  level: 'gold' | 'silver' | 'bronze' | 'recognition';
  imageUrl?: string;
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'First Place in National Programming Contest',
    description: 'Won the national level coding competition organized by ACM, solving complex algorithmic problems under time pressure.',
    achiever: 'Sarah Johnson (CS Department)',
    category: 'academic',
    type: 'individual',
    date: '2024-02-20',
    award: 'Gold Medal & $5000 Prize',
    level: 'gold',
    imageUrl: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '2',
    title: 'Inter-University Basketball Championship',
    description: 'Campus basketball team secured victory in the regional inter-university championship after an intense final match.',
    achiever: 'Men\'s Basketball Team',
    category: 'sports',
    type: 'team',
    date: '2024-02-15',
    award: 'Championship Trophy',
    level: 'gold',
    imageUrl: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '3',
    title: 'Best Research Paper Award',
    description: 'Outstanding research paper on renewable energy solutions published in the International Journal of Sustainable Engineering.',
    achiever: 'Dr. Michael Chen & Graduate Students',
    category: 'research',
    type: 'team',
    date: '2024-02-10',
    award: 'Best Paper Award',
    level: 'gold',
    imageUrl: 'https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '4',
    title: 'Cultural Night Performance Excellence',
    description: 'Outstanding performance in traditional dance during the annual cultural night, representing rich cultural heritage.',
    achiever: 'Traditional Dance Group',
    category: 'cultural',
    type: 'team',
    date: '2024-01-25',
    award: 'Excellence Certificate',
    level: 'silver',
    imageUrl: 'https://images.pexels.com/photos/164936/pexels-photo-164936.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '5',
    title: 'Community Service Leadership',
    description: 'Led a successful community outreach program providing education support to underprivileged children in the local area.',
    achiever: 'Emma Davis (Social Work Department)',
    category: 'community',
    type: 'individual',
    date: '2024-01-20',
    award: 'Community Service Award',
    level: 'recognition',
    imageUrl: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '6',
    title: 'Student Government President',
    description: 'Successfully served as Student Government President, implementing various student welfare initiatives and policy improvements.',
    achiever: 'Alex Rodriguez',
    category: 'leadership',
    type: 'individual',
    date: '2024-01-15',
    award: 'Leadership Recognition',
    level: 'recognition',
    imageUrl: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

const categoryColors = {
  academic: 'bg-blue-600',
  sports: 'bg-green-600',
  cultural: 'bg-purple-600',
  research: 'bg-indigo-600',
  community: 'bg-teal-600',
  leadership: 'bg-orange-600'
};

const levelIcons = {
  gold: Trophy,
  silver: Medal,
  bronze: Award,
  recognition: Star
};

const levelColors = {
  gold: 'text-yellow-400',
  silver: 'text-gray-300',
  bronze: 'text-orange-400',
  recognition: 'text-blue-400'
};

const AchievementBoard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const filteredAchievements = achievements.filter(achievement => {
    const matchesCategory = selectedCategory === 'all' || achievement.category === selectedCategory;
    const matchesType = selectedType === 'all' || achievement.type === selectedType;
    return matchesCategory && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Award className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Achievement Board</h1>
          <p className="text-gray-400">Celebrating excellence and outstanding accomplishments</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-2xl font-bold text-yellow-400 mb-1">
            {achievements.filter(a => a.level === 'gold').length}
          </div>
          <div className="text-gray-400 text-sm">Gold Level</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-2xl font-bold text-gray-300 mb-1">
            {achievements.filter(a => a.level === 'silver').length}
          </div>
          <div className="text-gray-400 text-sm">Silver Level</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-2xl font-bold text-green-400 mb-1">
            {achievements.filter(a => a.type === 'team').length}
          </div>
          <div className="text-gray-400 text-sm">Team Achievements</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-2xl font-bold text-purple-400 mb-1">
            {Object.keys(categoryColors).length}
          </div>
          <div className="text-gray-400 text-sm">Categories</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-bold text-white">Filters</h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-gray-400 text-sm">Category:</span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-lg font-medium text-sm transition-colors ${
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
                className={`px-3 py-1 rounded-lg font-medium text-sm transition-colors capitalize ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="individual">Individual</option>
              <option value="team">Team</option>
            </select>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => {
          const IconComponent = levelIcons[achievement.level];
          
          return (
            <div
              key={achievement.id}
              className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setSelectedAchievement(achievement)}
            >
              {achievement.imageUrl && (
                <img
                  src={achievement.imageUrl}
                  alt={achievement.title}
                  className="w-full h-48 object-cover"
                />
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium text-white ${categoryColors[achievement.category]}`}>
                    {achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <IconComponent className={`w-5 h-5 ${levelColors[achievement.level]}`} />
                    <span className={`text-xs font-medium capitalize ${levelColors[achievement.level]}`}>
                      {achievement.level}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{achievement.title}</h3>
                <p className="text-gray-300 text-sm mb-3 line-clamp-3">{achievement.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <User className="w-4 h-4" />
                    <span className="truncate">{achievement.achiever}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(achievement.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Trophy className="w-4 h-4" />
                    <span className="truncate">{achievement.award}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    achievement.type === 'team' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'
                  }`}>
                    {achievement.type.charAt(0).toUpperCase() + achievement.type.slice(1)}
                  </span>
                  <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center py-12">
          <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No achievements found matching your criteria.</p>
        </div>
      )}

      {/* Achievement Details Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded text-sm font-medium text-white ${categoryColors[selectedAchievement.category]}`}>
                  {selectedAchievement.category.charAt(0).toUpperCase() + selectedAchievement.category.slice(1)}
                </span>
                <div className="flex items-center space-x-2">
                  {React.createElement(levelIcons[selectedAchievement.level], {
                    className: `w-5 h-5 ${levelColors[selectedAchievement.level]}`
                  })}
                  <span className={`text-sm font-medium capitalize ${levelColors[selectedAchievement.level]}`}>
                    {selectedAchievement.level}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedAchievement(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            {selectedAchievement.imageUrl && (
              <img
                src={selectedAchievement.imageUrl}
                alt={selectedAchievement.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}
            
            <h3 className="text-2xl font-bold text-white mb-4">{selectedAchievement.title}</h3>
            <p className="text-gray-300 mb-6">{selectedAchievement.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span className="text-gray-400 text-sm">Achiever:</span>
                <p className="text-white font-medium">{selectedAchievement.achiever}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Date:</span>
                <p className="text-white font-medium">{new Date(selectedAchievement.date).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Award:</span>
                <p className="text-white font-medium">{selectedAchievement.award}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Type:</span>
                <p className="text-white font-medium capitalize">{selectedAchievement.type}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedAchievement(null)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementBoard;