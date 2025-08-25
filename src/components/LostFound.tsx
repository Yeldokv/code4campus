import React, { useState } from 'react';
import { Search, Plus, MapPin, Calendar, User, Phone } from 'lucide-react';

interface LostFoundItem {
  id: string;
  title: string;
  description: string;
  category: 'electronics' | 'accessories' | 'books' | 'clothing' | 'other';
  type: 'lost' | 'found';
  location: string;
  date: string;
  contactName: string;
  contactPhone: string;
  imageUrl?: string;
}

const items: LostFoundItem[] = [
  {
    id: '1',
    title: 'iPhone 13 Pro',
    description: 'Black iPhone 13 Pro with a clear case. Last seen in the library study area.',
    category: 'electronics',
    type: 'lost',
    location: 'Central Library',
    date: '2025-02-27',
    contactName: 'Sarah Johnson',
    contactPhone: '+1-555-0123',
    imageUrl: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '2',
    title: 'Blue Backpack',
    description: 'Found a blue JanSport backpack in the cafeteria. Contains some textbooks and notebooks.',
    category: 'other',
    type: 'found',
    location: 'Student Canteen',
    date: '2025-02-26',
    contactName: 'Mike Chen',
    contactPhone: '+1-555-0124',
    imageUrl: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '3',
    title: 'Silver Watch',
    description: 'Lost my silver Casio watch somewhere between the gym and the parking lot.',
    category: 'accessories',
    type: 'lost',
    location: 'campus gym',
    date: '2025-02-25',
    contactName: 'David Wilson',
    contactPhone: '+1-555-0125'
  },
  {
    id: '4',
    title: 'Mathematics Textbook',
    description: 'Found "Advanced Calculus" textbook by James Stewart in classroom B-201.',
    category: 'books',
    type: 'found',
    location: 'Main Block',
    date: '2025-02-24',
    contactName: 'Prof. Anderson',
    contactPhone: '+1-555-0126'
  },
  {
    id: '5',
    title: 'Blue Denim Jacket',
    description: 'Left my blue denim jacket with patches in the auditorium after the morning lecture.',
    category: 'clothing',
    type: 'lost',
    location: 'Main Auditorium',
    date: '2025-02-23',
    contactName: 'Emma Davis',
    contactPhone: '+1-555-0127'
  }
];

const categoryColors = {
  electronics: 'bg-blue-600',
  accessories: 'bg-purple-600',
  books: 'bg-green-600',
  clothing: 'bg-yellow-600',
  other: 'bg-gray-600'
};

const LostFound: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Search className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">Lost & Found</h1>
            <p className="text-gray-400">Report lost items or help others find their belongings</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Item</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Items</option>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {Object.keys(categoryColors).map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
            )}
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 rounded text-xs font-medium text-white ${categoryColors[item.category]}`}>
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  item.type === 'lost' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
                }`}>
                  {item.type.toUpperCase()}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">{item.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <User className="w-4 h-4" />
                  <span>{item.contactName}</span>
                </div>
              </div>
              
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Contact</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No items found matching your search criteria.</p>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Report Lost/Found Item</h3>
            <p className="text-gray-300 mb-4">Fill out the form to report a lost or found item.</p>
            
            <button
              onClick={() => setShowAddForm(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Form Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LostFound;