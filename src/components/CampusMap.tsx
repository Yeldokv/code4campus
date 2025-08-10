import React, { useState, useEffect, useRef } from "react";
import { MapPin, X, Info } from "lucide-react";
import mapImage from "./college1.jpg";

// ===== CONFIG =====
const centerLat = 10.1289036;
const centerLng = 76.4895797;
const latOffset = 0.00045; // ~100m
const lngOffset = 0.00045;

const campusBounds = {
  latTop: centerLat + latOffset,
  latBottom: centerLat - latOffset,
  lngLeft: centerLng - lngOffset,
  lngRight: centerLng + lngOffset,
};

const isInsideCampus = (lat: number, lng: number) =>
  lat <= campusBounds.latTop &&
  lat >= campusBounds.latBottom &&
  lng >= campusBounds.lngLeft &&
  lng <= campusBounds.lngRight;

const gpsToPercent = (lat: number, lng: number) => {
  const yPercent =
    ((campusBounds.latTop - lat) /
      (campusBounds.latTop - campusBounds.latBottom)) *
    100;
  const xPercent =
    ((lng - campusBounds.lngLeft) /
      (campusBounds.lngRight - campusBounds.lngLeft)) *
    100;
  return { xPercent, yPercent };
};

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
    name: 'Main Building',
    description: 'Central administrative offices and student services',
    facilities: ['Admissions Office', 'CS department', 'Library'],
    position: { x: 50, y: 50 }
  },
  {
    id: 'gate',
    name: 'Main Gate',
    description: 'Civil department and associated labs',
    facilities: ['Department Room', 'Civil Lab', 'Class Rooms'],
    position: { x: 26, y: 65 }
  },
  {
    id: 'mech',
    name: 'Mech Block',
    description: 'Mechanical Department and associated labs',
    facilities: ['Mechanical Department', 'Machines Lab', 'CAD Labs'],
    position: { x: 65, y: 65 }
  },
  {
    id: 'canteen',
    name: 'Student Canteen',
    description: 'Main dining facility with various food options',
    facilities: ['Food Court', 'Staff Seating', 'Indoor Seating'],
    position: { x: 47, y: 75 }
  },
  {
    id: 'ccf',
    name: 'Lab Complex',
    description: 'Three floor building with computer labs',
    facilities: ['Computer Lab', 'Maintanance Room'],
    position: { x: 50, y: 70 }
  },
  {
    id: 'hostel',
    name: 'Mens Hostel',
    description: 'Hostel complex with gym and other facilities',
    facilities: ['Rooms', 'Guy'],
    position: { x: 68, y: 37 }
  }
];

const CampusMap: React.FC = () => {
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState<{ x: number; y: number } | null>(null);
  const [insideCampus, setInsideCampus] = useState(true);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);

  const animationRef = useRef<number | null>(null);
  const targetPos = useRef<{ x: number; y: number } | null>(null);

  const animateMarker = () => {
    if (userLocation && targetPos.current) {
      const lerp = (start: number, end: number, t: number) =>
        start + (end - start) * t;

      const newX = lerp(userLocation.x, targetPos.current.x, 0.1);
      const newY = lerp(userLocation.y, targetPos.current.y, 0.1);

      setUserLocation({ x: newX, y: newY });

      if (Math.abs(newX - targetPos.current.x) > 0.01 || Math.abs(newY - targetPos.current.y) > 0.01) {
        animationRef.current = requestAnimationFrame(animateMarker);
      }
    }
  };

  useEffect(() => {
    if (!showMap) return;

    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords;

          if (isInsideCampus(lat, lng)) {
            setInsideCampus(true);
            const { xPercent, yPercent } = gpsToPercent(lat, lng);
            targetPos.current = { x: xPercent, y: yPercent };

            if (!userLocation) {
              setUserLocation(targetPos.current);
            } else {
              if (animationRef.current) cancelAnimationFrame(animationRef.current);
              animationRef.current = requestAnimationFrame(animateMarker);
            }
          } else {
            setInsideCampus(false);
            setUserLocation(null);
          }
        },
        (err) => {
          console.error("Error getting location:", err);
          setUserLocation(null);
          setInsideCampus(true);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
    } else {
      console.error("Geolocation not supported");
    }
  }, [showMap]);

  return (
    <div className="space-y-6 p-4 bg-gray-900 min-h-screen">
      <div className="flex items-center space-x-3 mb-4">
        <MapPin className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Campus Map</h1>
          <p className="text-gray-400">Live location tracking inside campus</p>
        </div>
      </div>

      {!showMap && (
        <button
          onClick={() => setShowMap(true)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
        >
          Show Campus Map
        </button>
      )}

      {showMap && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden relative max-w-4xl mx-auto">
          <div
            className="w-full h-96 bg-cover bg-center relative select-none"
            style={{ backgroundImage: `url(${mapImage})` }}
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

            {/* User Location Marker */}
            {userLocation && (
              <div
                className="absolute w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse transition-all duration-500 ease-out"
                style={{
                  left: `${userLocation.x}%`,
                  top: `${userLocation.y}%`,
                  transform: "translate(-50%, -50%) scale(1)",
                  opacity: 1,
                }}
              />
            )}

            {/* Warning if outside campus */}
            {!insideCampus && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
                You are outside campus boundaries
              </div>
            )}

            {/* Navigation Instructions */}
            <div className="absolute bottom-4 left-4 bg-gray-900/90 text-white p-3 rounded-lg">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Click markers to view building information</span>
              </div>
            </div>

            <button
              onClick={() => setShowMap(false)}
              className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white rounded-full p-2"
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
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mt-6">
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