import React, { useState } from 'react';
import { Users, Mail, Phone, MapPin, Calendar, Search, ExternalLink, User } from 'lucide-react';

interface Society {
  id: string;
  name: string;
  acronym: string;
  description: string;
  category: 'technical' | 'cultural' | 'sports' | 'academic' | 'social' | 'professional';
  establishedYear: number;
  memberCount: number;
  president: string;
  contactEmail: string;
  contactPhone?: string;
  meetingLocation: string;
  meetingTime: string;
  activities: string[];
  achievements: string[];
  websiteUrl?: string;
  logoUrl?: string;
}

const societies: Society[] = [
  {
    id: '1',
    name: 'Computer Society of India',
    acronym: 'CSI',
    description: 'Leading technical society focused on computer science, programming competitions, workshops, and industry connections. We organize hackathons, coding bootcamps, and tech talks.',
    category: 'technical',
    establishedYear: 2010,
    memberCount: 150,
    president: 'Sarah Johnson',
    contactEmail: 'csi@campus.edu',
    contactPhone: '+1-555-0101',
    meetingLocation: 'Computer Lab, Building A',
    meetingTime: 'Every Friday, 4:00 PM',
    activities: ['Hackathons', 'Coding Competitions', 'Tech Workshops', 'Industry Guest Lectures', 'Open Source Projects'],
    achievements: ['Best Technical Society 2023', 'Organized 15+ successful events', 'Winner of Inter-University Hackathon'],
    websiteUrl: 'https://csi-campus.org',
    logoUrl: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '2',
    name: 'Institute of Electrical and Electronics Engineers',
    acronym: 'IEEE',
    description: 'Professional society for electrical and electronics engineering students. We focus on advancing technology for humanity through technical projects and professional development.',
    category: 'professional',
    establishedYear: 2012,
    memberCount: 120,
    president: 'Michael Chen',
    contactEmail: 'ieee@campus.edu',
    contactPhone: '+1-555-0102',
    meetingLocation: 'Electronics Lab, Building B',
    meetingTime: 'Every Tuesday, 3:30 PM',
    activities: ['Technical Seminars', 'Project Exhibitions', 'Industry Visits', 'Research Publications', 'Career Guidance'],
    achievements: ['IEEE Student Branch of the Year 2023', 'Published 25+ research papers', 'Organized International Conference'],
    websiteUrl: 'https://ieee-campus.org',
    logoUrl: 'https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '3',
    name: 'Drama and Theatre Society',
    acronym: 'DTS',
    description: 'Creative society dedicated to theatrical arts, drama productions, and performing arts. We stage original plays, classics, and organize drama workshops for students.',
    category: 'cultural',
    establishedYear: 2008,
    memberCount: 80,
    president: 'Emma Davis',
    contactEmail: 'drama@campus.edu',
    meetingLocation: 'Auditorium, Main Building',
    meetingTime: 'Every Thursday, 5:00 PM',
    activities: ['Drama Productions', 'Acting Workshops', 'Script Writing', 'Stage Management', 'Costume Design'],
    achievements: ['Best Play Award 2023', 'Performed at State Festival', 'Trained 200+ students in acting'],
    logoUrl: 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '4',
    name: 'Basketball Club',
    acronym: 'BBC',
    description: 'Premier sports society for basketball enthusiasts. We participate in inter-university tournaments and organize training sessions for all skill levels.',
    category: 'sports',
    establishedYear: 2015,
    memberCount: 45,
    president: 'David Wilson',
    contactEmail: 'basketball@campus.edu',
    contactPhone: '+1-555-0104',
    meetingLocation: 'Sports Complex',
    meetingTime: 'Daily, 6:00 AM & 6:00 PM',
    activities: ['Daily Training', 'Inter-University Matches', 'Coaching Clinics', 'Youth Outreach Programs', 'Fitness Workshops'],
    achievements: ['Regional Champions 2023', 'Undefeated home season', 'Developed 15+ professional players'],
    logoUrl: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '5',
    name: 'Photography Club',
    acronym: 'PC',
    description: 'Creative society for photography enthusiasts, organizing photo walks, exhibitions, and workshops on various photography techniques and digital editing.',
    category: 'cultural',
    establishedYear: 2018,
    memberCount: 65,
    president: 'Lisa Anderson',
    contactEmail: 'photo@campus.edu',
    meetingLocation: 'Art Studio, Building C',
    meetingTime: 'Every Saturday, 2:00 PM',
    activities: ['Photo Walks', 'Photography Workshops', 'Annual Exhibition', 'Digital Editing Sessions', 'Nature Photography'],
    achievements: ['Best Photography Exhibition 2023', '1000+ photos in gallery', 'Featured in local magazines'],
    logoUrl: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '6',
    name: 'Environmental Club',
    acronym: 'EC',
    description: 'Dedicated to environmental conservation and sustainability initiatives. We organize tree plantations, clean-up drives, and awareness campaigns about environmental issues.',
    category: 'social',
    establishedYear: 2016,
    memberCount: 90,
    president: 'James Rodriguez',
    contactEmail: 'environment@campus.edu',
    meetingLocation: 'Conference Room, Library',
    meetingTime: 'Every Wednesday, 4:30 PM',
    activities: ['Tree Plantation', 'Clean-up Drives', 'Awareness Campaigns', 'Recycling Programs', 'Solar Energy Projects'],
    achievements: ['Planted 1000+ trees', 'Reduced campus waste by 30%', 'Green Campus Certification'],
    logoUrl: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

const categoryColors = {
  technical: 'bg-blue-600',
  cultural: 'bg-purple-600',
  sports: 'bg-green-600',
  academic: 'bg-indigo-600',
  social: 'bg-teal-600',
  professional: 'bg-orange-600'
};

const SocietiesDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSociety, setSelectedSociety] = useState<Society | null>(null);

  const filteredSocieties = societies.filter(society => {
    const matchesSearch = society.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         society.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         society.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || society.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Users className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Campus Societies Directory</h1>
          <p className="text-gray-400">Discover student organizations and join communities that match your interests</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-2xl font-bold text-blue-400 mb-1">{societies.length}</div>
          <div className="text-gray-400 text-sm">Active Societies</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-2xl font-bold text-green-400 mb-1">
            {societies.reduce((sum, s) => sum + s.memberCount, 0)}
          </div>
          <div className="text-gray-400 text-sm">Total Members</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-2xl font-bold text-purple-400 mb-1">
            {Object.keys(categoryColors).length}
          </div>
          <div className="text-gray-400 text-sm">Categories</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-2xl font-bold text-yellow-400 mb-1">
            {Math.round(societies.reduce((sum, s) => sum + s.memberCount, 0) / societies.length)}
          </div>
          <div className="text-gray-400 text-sm">Avg. Members</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search societies by name, acronym, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All Categories
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
      </div>

      {/* Societies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSocieties.map((society) => (
          <div
            key={society.id}
            className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => setSelectedSociety(society)}
          >
            {society.logoUrl && (
              <img
                src={society.logoUrl}
                alt={society.name}
                className="w-full h-48 object-cover"
              />
            )}
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 rounded text-xs font-medium text-white ${categoryColors[society.category]}`}>
                  {society.category.charAt(0).toUpperCase() + society.category.slice(1)}
                </span>
                <div className="text-gray-400 text-sm">
                  Est. {society.establishedYear}
                </div>
              </div>
              
              <div className="mb-3">
                <h3 className="text-lg font-bold text-white mb-1">{society.name}</h3>
                <div className="text-blue-400 font-semibold text-sm">{society.acronym}</div>
              </div>
              
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">{society.description}</p>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>{society.memberCount} members</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <User className="w-4 h-4" />
                  <span>President: {society.president}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{society.meetingTime}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  View Details →
                </button>
                <div className="flex items-center space-x-2">
                  <button className="p-1 bg-gray-700 hover:bg-gray-600 rounded">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </button>
                  {society.contactPhone && (
                    <button className="p-1 bg-gray-700 hover:bg-gray-600 rounded">
                      <Phone className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                  {society.websiteUrl && (
                    <button className="p-1 bg-gray-700 hover:bg-gray-600 rounded">
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSocieties.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No societies found matching your search criteria.</p>
        </div>
      )}

      {/* Society Details Modal */}
      {selectedSociety && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-4xl w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                {selectedSociety.logoUrl && (
                  <img
                    src={selectedSociety.logoUrl}
                    alt={selectedSociety.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedSociety.name}</h2>
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-400 font-semibold">{selectedSociety.acronym}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium text-white ${categoryColors[selectedSociety.category]}`}>
                      {selectedSociety.category.charAt(0).toUpperCase() + selectedSociety.category.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedSociety(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">About</h3>
                  <p className="text-gray-300">{selectedSociety.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <User className="w-4 h-4 text-blue-400" />
                      <span>President: {selectedSociety.president}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Mail className="w-4 h-4 text-blue-400" />
                      <span>{selectedSociety.contactEmail}</span>
                    </div>
                    {selectedSociety.contactPhone && (
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Phone className="w-4 h-4 text-blue-400" />
                        <span>{selectedSociety.contactPhone}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-gray-300">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span>{selectedSociety.meetingLocation}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span>{selectedSociety.meetingTime}</span>
                    </div>
                    {selectedSociety.websiteUrl && (
                      <div className="flex items-center space-x-2 text-gray-300">
                        <ExternalLink className="w-4 h-4 text-blue-400" />
                        <a href={selectedSociety.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-750 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Quick Facts</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Established:</span>
                      <p className="text-white font-medium">{selectedSociety.establishedYear}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Members:</span>
                      <p className="text-white font-medium">{selectedSociety.memberCount}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Activities</h3>
                  <div className="space-y-2">
                    {selectedSociety.activities.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-300">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Achievements</h3>
                  <div className="space-y-2">
                    {selectedSociety.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span className="text-gray-300">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedSociety(null)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Close
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                Join Society
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocietiesDirectory;