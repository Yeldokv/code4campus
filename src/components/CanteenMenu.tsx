import React, { useState } from 'react';
import { UtensilsCrossed, Clock, Star, CheckCircle, XCircle, DollarSign } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'beverages';
  price: number;
  isAvailable: boolean;
  isVegetarian: boolean;
  isSpecial: boolean;
  rating: number;
  prepTime: number; // in minutes
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Veg Biryani',
    description: 'Aromatic basmati rice cooked with nutritious vegitable and traditional spices',
    category: 'lunch',
    price: 120,
    isAvailable: true,
    isVegetarian: true,
    isSpecial: true,
    rating: 4.8,
    prepTime: 25
  },
  {
    id: '2',
    name: 'Vegetable Sandwich',
    description: 'Fresh vegetables with cheese and mayo on whole wheat bread',
    category: 'breakfast',
    price: 20,
    isAvailable: true,
    isVegetarian: true,
    isSpecial: false,
    rating: 4.2,
    prepTime: 10
  },
  {
    id: '3',
    name: 'Pasta',
    description: 'Creamy pasta with parmesan cheese',
    category: 'lunch',
    price: 70,
    isAvailable: false,
    isVegetarian: true,
    isSpecial: false,
    rating: 4.5,
    prepTime: 20
  },
  {
    id: '4',
    name: 'Fresh Fruit Juice',
    description: 'Seasonal fresh fruit juice - Orange, Apple, or Mixed',
    category: 'beverages',
    price: 15,
    isAvailable: true,
    isVegetarian: true,
    isSpecial: false,
    rating: 4.1,
    prepTime: 5
  },
  {
    id: '5',
    name: 'Chocolate Brownie',
    description: 'Rich, fudgy chocolate brownie served with vanilla ice cream',
    category: 'snacks',
    price: 17,
    isAvailable: true,
    isVegetarian: true,
    isSpecial: true,
    rating: 4.7,
    prepTime: 0
  },
  {
    id: '6',
    name: 'Paneer Butter Masala',
    description: 'Fresh creamy paneer cubes simmered in a spiced tomato and butter gravy.',
    category: 'dinner',
    price: 15.99,
    isAvailable: true,
    isVegetarian: false,
    isSpecial: true,
    rating: 4.6,
    prepTime: 30
  }
];

const categoryLabels = {
  breakfast: 'Breakfast',
  lunch: 'Lunch', 
  dinner: 'Dinner',
  snacks: 'Snacks',
  beverages: 'Beverages'
};

const categoryColors = {
  breakfast: 'bg-yellow-600',
  lunch: 'bg-green-600',
  dinner: 'bg-blue-600',
  snacks: 'bg-purple-600',
  beverages: 'bg-teal-600'
};

const CanteenMenu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesAvailability = !showAvailableOnly || item.isAvailable;
    return matchesCategory && matchesAvailability;
  });

  const currentHour = new Date().getHours();
  let currentMealTime = '';
  if (currentHour < 11) currentMealTime = 'breakfast';
  else if (currentHour < 16) currentMealTime = 'lunch';
  else if (currentHour < 21) currentMealTime = 'dinner';
  else currentMealTime = 'snacks';

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <UtensilsCrossed className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Canteen Menu & Availability</h1>
          <p className="text-gray-400">Check today's menu and real-time availability</p>
        </div>
      </div>

      {/* Current Meal Time Banner */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Now Serving: {categoryLabels[currentMealTime as keyof typeof categoryLabels]}
            </h2>
            <div className="flex items-center space-x-4 text-gray-300">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Current time: {new Date().toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>{menuItems.filter(item => item.isAvailable).length} items available</span>
              </div>
            </div>
          </div>
        </div>
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
              All Items
            </button>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          
          <label className="flex items-center space-x-2 text-gray-300">
            <input
              type="checkbox"
              checked={showAvailableOnly}
              onChange={(e) => setShowAvailableOnly(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Available only</span>
          </label>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className={`bg-gray-800 rounded-xl border border-gray-700 overflow-hidden ${!item.isAvailable ? 'opacity-75' : ''}`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 rounded text-xs font-medium text-white ${categoryColors[item.category]}`}>
                  {categoryLabels[item.category]}
                </span>
                <div className="flex items-center space-x-2">
                  {item.isSpecial && (
                    <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-600 text-white">
                      ⭐ Special
                    </span>
                  )}
                  {item.isVegetarian && (
                    <span className="px-2 py-1 rounded text-xs font-medium bg-green-600 text-white">
                      🌱 Veg
                    </span>
                  )}
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
              <p className="text-gray-300 text-sm mb-4">{item.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-0 h-0 text-green-400" />
                    <span className="font-bold text-lg text-white">
                      ₹{item.price}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-gray-300 text-sm">{item.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 text-gray-400 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{item.prepTime}m</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {item.isAvailable ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 font-medium">Available</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-400" />
                      <span className="text-red-400 font-medium">Out of Stock</span>
                    </>
                  )}
                </div>
                
                <button 
                  disabled={!item.isAvailable}
                  className={`py-2 px-4 rounded-lg font-semibold transition-colors ${
                    item.isAvailable
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {item.isAvailable ? 'Order Now' : 'Unavailable'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <UtensilsCrossed className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No items found matching your criteria.</p>
        </div>
      )}

      {/* Daily Statistics */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Today's Menu Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(categoryLabels).map(([key, label]) => {
            const count = menuItems.filter(item => item.category === key).length;
            const available = menuItems.filter(item => item.category === key && item.isAvailable).length;
            
            return (
              <div key={key} className="text-center">
                <div className="text-2xl font-bold text-white mb-1">{available}/{count}</div>
                <div className="text-gray-400 text-sm">{label}</div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: count > 0 ? `${(available / count) * 100}%` : '0%' }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CanteenMenu;