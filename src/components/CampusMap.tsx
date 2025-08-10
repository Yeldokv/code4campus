import React, { useState, useEffect } from 'react';
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
    position: { x: 40, y: 30 },
  },
  {
    id: 'library',
    name: 'Central Library',
    description: 'Multi-story library with extensive digital and print resources',
    facilities: ['Reading Halls', 'Digital Lab', 'Study Rooms', 'Archives'],
    position: { x: 25, y: 45 },
  },
  {
    id: 'science-block',
    name: 'Science & Technology Block',
    description: 'Modern laboratories and lecture halls for science programs',
    facilities: ['Physics Lab', 'Chemistry Lab', 'Computer Labs', 'Research Centers'],
    position: { x: 65, y: 25 },
  },
  {
    id: 'canteen',
    name: 'Student Canteen',
    description: 'Main dining facility with various food options',
    facilities: ['Food Court', 'Coffee Shop', 'Outdoor Seating'],
    position: { x: 50, y: 60 },
  },
  {
    id: 'sports-complex',
    name: 'Sports Complex',
    description: 'Indoor and outdoor sports facilities',
    facilities: ['Gymnasium', 'Swimming Pool', 'Tennis Courts', 'Football Field'],
    position: { x: 20, y: 70 },
  },
  {
    id: 'auditorium',
    name: 'Main Auditorium',
    description: 'Large venue for events, conferences, and performances',
    facilities: ['Main Hall (500 seats)', 'Stage', 'Audio/Visual Equipment'],
    position: { x: 75, y: 50 },
  },
];

// === Helper to convert GPS to % coords on your map ===
// You need to replace these GPS boundaries with YOUR campus GPS corners!
const gpsToPercent = (lat: number, lng: number) => {
  const latTop = 40.0;    // northern boundary latitude
  const latBottom = 39.9; // southern boundary latitude
  const lngLeft = -75.0;  // western boundary longitude
  const lngRight = -74.9; // eastern boundary longitude

  // Map latitude to vertical percent (lat decreases as you go south, so invert)
  const yPercent = ((latTop - lat) / (latTop - latBottom)) * 100;
  // Map longitude to horizontal percent
  const xPercent = ((lng - lngLeft) / (lngRight - lngLeft)) * 100;

  return { xPercent, yPercent };
};

const CampusMap: React.FC = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Watch user position when map is shown
  useEffect(() => {
    if (!showMap) return;

    if ('geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setUserLocation(null);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error('Geolocation not supported');
      setUserLocation(null);
    }
  }, [showMap]);

  return (
    <div className="space-y-6 p-4 bg-gray-900 min-h-screen">
      <div className="flex items-center space-x-3 mb-4">
        <MapPin className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Campus Map</h1>
          <p className="text-gray-400">Click on buildings to view information</p>
        </div>
      </div>

      {/* Button to show/hide map */}
      {!showMap && (
        <button
          onClick={() => setShowMap(true)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
        >
          Show Campus Map
        </button>
      )}

      {/* Map display */}
      {showMap && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden relative max-w-4xl mx-auto">
          {/* Map background */}
          <div
            className="w-full h-96 bg-cover bg-center relative select-none"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')",
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Buildings */}
            {buildings.map((building) => (
              <button
                key={building.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${building.position.x}%`, top: `${building.position.y}%` }}
                onClick={() => setSelectedBuilding(building)}
                title={building.name}
              >
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg group-hover:scale-125 transition-transform"></div>
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {building.name}
                </div>
              </button>
            ))}

            {/* User location marker */}
            {userLocation && (() => {
              const { xPercent, yPercent } = gpsToPercent(userLocation.lat, userLocation.lng);
              const clampedX = Math.min(Math.max(xPercent, 0), 100);
              const clampedY = Math.min(Math.max(yPercent, 0), 100);

              return (
                <div
                  className="absolute w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"
                  style={{
                    left: `${clampedX}%`,
                    top: `${clampedY}%`,
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                  }}
                  title="You are here"
                />
              );
            })()}

            {/* Navigation instructions */}
            <div className="absolute bottom-4 left-4 bg-gray-900/90 text-white p-3 rounded-lg text-sm">
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Click markers to view building information</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Your current location</span>
              </div>
            </div>

            {/* Close map button */}
            <button
              onClick={() => setShowMap(false)}
              className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white rounded-full p-2"
              title="Close Map"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

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

      {/* Building Legend */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 max-w-4xl mx-auto">
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
