import React, { useState, useEffect } from 'react';
import { Bus, Clock, MapPin, AlertCircle, CheckCircle, Navigation } from 'lucide-react';

interface BusRoute {
  id: string;
  routeNumber: string;
  routeName: string;
  stops: string[];
  schedule: {
    departure: string;
    estimatedArrival: string;
    actualArrival?: string;
    delay?: number; // minutes
  }[];
  currentLocation?: string;
  isActive: boolean;
  nextDeparture: string;
}

const busRoutes: BusRoute[] = [
  {
    id: '1',
    routeNumber: 'R1',
    routeName: 'Campus - Aluva',
    stops: ['Main Gate', 'Kalady', 'Angamaly', 'Aluva'],
    schedule: [
      { departure: '8:00 AM', estimatedArrival: '8:25 AM', actualArrival: '8:23 AM' },
      { departure: '9:00 AM', estimatedArrival: '9:25 AM', actualArrival: '9:30 AM', delay: 5 },
      { departure: '10:00 AM', estimatedArrival: '10:25 AM' },
      { departure: '11:00 AM', estimatedArrival: '11:25 AM' }
    ],
    currentLocation: 'Near Canteen',
    isActive: true,
    nextDeparture: '10:00 AM'
  },
  {
    id: '2',
    routeNumber: 'R2',
    routeName: 'Campus - Angamaly',
    stops: ['Main Gate', 'kalady', 'Manjapra', 'Angamaly'],
    schedule: [
      { departure: '7:30 AM', estimatedArrival: '7:50 AM', actualArrival: '7:48 AM' },
      { departure: '8:30 AM', estimatedArrival: '8:50 AM', actualArrival: '8:55 AM', delay: 5 },
      { departure: '9:30 AM', estimatedArrival: '9:50 AM' },
      { departure: '10:30 AM', estimatedArrival: '10:50 AM' }
    ],
    currentLocation: 'Main pathway',
    isActive: true,
    nextDeparture: '9:30 AM'
  },
  {
    id: '3',
    routeNumber: 'R3',
    routeName: 'Campus - perumbavoor',
    stops: ['main Gate', 'Mattoor', 'perumbavoor'],
    schedule: [
      { departure: '8:15 AM', estimatedArrival: '8:30 AM', actualArrival: '8:32 AM', delay: 2 },
      { departure: '9:15 AM', estimatedArrival: '9:30 AM', delay: 10 },
      { departure: '10:15 AM', estimatedArrival: '10:30 AM' },
      { departure: '11:15 AM', estimatedArrival: '11:30 AM' }
    ],
    currentLocation: 'En route to Main Campus',
    isActive: false, // Temporarily out of service
    nextDeparture: 'Service Suspended'
  }
];

const TransportTracker: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const selectedRouteData = busRoutes.find(route => route.id === selectedRoute);

  const getNextBus = (route: BusRoute) => {
    const now = new Date();
    const currentTimeStr = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });

    for (const schedule of route.schedule) {
      if (schedule.departure > currentTimeStr) {
        return schedule;
      }
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Bus className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Campus Transport Tracker</h1>
          <p className="text-gray-400">Real-time bus schedules and tracking information</p>
        </div>
      </div>

      {/* Current Time */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Current Time</h2>
            <div className="flex items-center space-x-4 text-gray-300">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span className="text-xl font-mono">
                  {currentTime.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit',
                    hour12: true 
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Route Selection */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Select Bus Route</h2>
        <select
          value={selectedRoute}
          onChange={(e) => setSelectedRoute(e.target.value)}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Choose a route...</option>
          {busRoutes.map((route) => (
            <option key={route.id} value={route.id}>
              {route.routeNumber} - {route.routeName}
            </option>
          ))}
        </select>
      </div>

      {/* All Routes Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {busRoutes.map((route) => {
          const nextBus = getNextBus(route);
          const hasDelay = route.schedule.some(s => s.delay && s.delay > 0);

          return (
            <div
              key={route.id}
              className={`bg-gray-800 rounded-xl p-6 border border-gray-700 cursor-pointer transition-all hover:shadow-lg ${
                selectedRoute === route.id ? 'ring-2 ring-blue-500' : ''
              } ${!route.isActive ? 'opacity-60' : ''}`}
              onClick={() => setSelectedRoute(route.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold ${
                    route.isActive ? 'bg-blue-600' : 'bg-gray-600'
                  }`}>
                    {route.routeNumber}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{route.routeName}</h3>
                    <div className="flex items-center space-x-2">
                      {route.isActive ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-400" />
                      )}
                      <span className={`text-sm ${route.isActive ? 'text-green-400' : 'text-red-400'}`}>
                        {route.isActive ? 'Active' : 'Out of Service'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {hasDelay && route.isActive && (
                  <div className="bg-yellow-600 text-white px-2 py-1 rounded text-xs font-medium">
                    Delayed
                  </div>
                )}
              </div>

              {route.isActive && route.currentLocation && (
                <div className="mb-4">
                  <div className="flex items-center space-x-2 text-gray-400 mb-2">
                    <Navigation className="w-4 h-4" />
                    <span className="text-sm">Current Location:</span>
                  </div>
                  <p className="text-white font-medium">{route.currentLocation}</p>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Next Departure:</span>
                </div>
                <p className="text-lg font-bold text-white">{route.nextDeparture}</p>
                
                {nextBus && (
                  <p className="text-gray-400 text-sm">
                    Est. Arrival: {nextBus.estimatedArrival}
                    {nextBus.delay && nextBus.delay > 0 && (
                      <span className="text-yellow-400 ml-2">
                        (+{nextBus.delay} min delay)
                      </span>
                    )}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Route Details */}
      {selectedRouteData && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              {selectedRouteData.routeNumber}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{selectedRouteData.routeName}</h2>
              <div className="flex items-center space-x-2">
                {selectedRouteData.isActive ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400" />
                )}
                <span className={`text-sm ${selectedRouteData.isActive ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedRouteData.isActive ? 'Active Service' : 'Service Suspended'}
                </span>
              </div>
            </div>
          </div>

          {/* Route Stops */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white mb-3">Route Stops</h3>
            <div className="flex flex-wrap gap-2">
              {selectedRouteData.stops.map((stop, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {index + 1}. {stop}
                  </div>
                  {index < selectedRouteData.stops.length - 1 && (
                    <div className="text-gray-400">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Today's Schedule</h3>
            <div className="space-y-3">
              {selectedRouteData.schedule.map((schedule, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    schedule.actualArrival ? 'bg-gray-700' : 'bg-gray-750'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-white font-bold">{schedule.departure}</div>
                    <div className="text-gray-400">→</div>
                    <div className="text-gray-300">{schedule.estimatedArrival}</div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {schedule.actualArrival ? (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm">
                          Arrived: {schedule.actualArrival}
                        </span>
                      </div>
                    ) : schedule.delay ? (
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 text-sm">
                          Delayed: +{schedule.delay} min
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400 text-sm">On Schedule</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!selectedRouteData.isActive && (
            <div className="mt-6 p-4 bg-red-900/30 border border-red-700 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <div>
                  <h4 className="text-red-400 font-semibold">Service Notice</h4>
                  <p className="text-gray-300 text-sm mt-1">
                    This route is currently suspended due to maintenance. 
                    Please use alternative routes or check back later for updates.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Service Announcements */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Service Announcements</h2>
        <div className="space-y-3">
          <div className="p-3 bg-yellow-900/30 border border-yellow-700 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-semibold text-sm">Route R1 - Minor Delays</span>
            </div>
            <p className="text-gray-300 text-sm mt-1">
              Expect 5-10 minute delays due to increased traffic on Main Street.
            </p>
          </div>
          
          <div className="p-3 bg-red-900/30 border border-red-700 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-red-400 font-semibold text-sm">Route R3 - Service Suspended</span>
            </div>
            <p className="text-gray-300 text-sm mt-1">
              Dormitory shuttle temporarily out of service for maintenance. Expected to resume tomorrow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportTracker;