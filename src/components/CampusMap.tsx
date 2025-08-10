import React, { useState } from 'react';
import { MapPin, Info, X } from 'lucide-react';

interface Building {
  id: string;
  name: string;
  description: string;
  facilities: string[];
  position: { x: number; y: number };
}

const buildings: Building[] = [
  {
    id: 'main-building',
    name: 'Main Administrative Building',
    description: 'Central administrative offices and student services',
    facilities: ['Admissions Office', 'Student Records', 'Financial Aid'],
    position: { x: 40, y: 30 }
  },
  {
    id: 'library',
    name: 'Central Library',
    description: 'Multi-story library with extensive digital and print resources',
    facilities: ['Reading Halls', 'Digital Lab', 'Study Rooms', 'Archives'],
    position: { x: 25, y: 45 }
  },
  {
    id: 'science-block',
    name: 'Science & Technology Block',
    description: 'Modern laboratories and lecture halls for science programs',
    facilities: ['Physics Lab', 'Chemistry Lab', 'Computer Labs', 'Research Centers'],
    position: { x: 65, y: 25 }
  },
  {
    id: 'canteen',
    name: 'Student Canteen',
    description: 'Main dining facility with various food options',
    facilities: ['Food Court', 'Coffee Shop', 'Outdoor Seating'],
    position: { x: 50, y: 60 }
  },
  {
    id: 'sports-complex',
    name: 'Sports Complex',
    description: 'Indoor and outdoor sports facilities',
    facilities: ['Gymnasium', 'Swimming Pool', 'Tennis Courts', 'Football Field'],
    position: { x: 20, y: 70 }
  },
  {
    id: 'auditorium',
    name: 'Main Auditorium',
    description: 'Large venue for events, conferences, and performances',
    facilities: ['Main Hall (500 seats)', 'Stage', 'Audio/Visual Equipment'],
    position: { x: 75, y: 50 }
  }
];

const CampusMap: React.FC = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <MapPin className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Campus Map</h1>
          <p className="text-gray-400">Click on buildings to view information</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="relative">
          {/* Map Background */}
          <div 
            className="w-full h-96 bg-cover bg-center relative"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')`,
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            
            {/* Building Markers */}
            {buildings.map((building) => (
              <button
                key={building.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${building.position.x}%`, top: `${building.position.y}%` }}
                onClick={() => setSelectedBuilding(building)}
              >
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg group-hover:scale-125 transition-transform"></div>
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {building.name}
                </div>
              </button>
            ))}

            {/* Navigation Instructions */}
            <div className="absolute bottom-4 left-4 bg-gray-900/90 text-white p-3 rounded-lg">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Click markers to view building information</span>
              </div>
            </div>
          </div>
        </div>

        {/* Building Information Panel */}
        {selectedBuilding && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{selectedBuilding.name}</h3>
                <button
                  onClick={() => setSelectedBuilding(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-gray-300 mb-4">{selectedBuilding.description}</p>
              
              <div>
                <h4 className="text-white font-semibold mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  Facilities
                </h4>
                <ul className="space-y-1">
                  {selectedBuilding.facilities.map((facility, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                      {facility}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setSelectedBuilding(null)}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Building Legend */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Campus Buildings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {buildings.map((building) => (
            <button
              key={building.id}
              onClick={() => setSelectedBuilding(building)}
              className="text-left p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div>
                  <div className="text-white font-medium">{building.name}</div>
                  <div className="text-gray-400 text-sm">{building.facilities.length} facilities</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampusMap;