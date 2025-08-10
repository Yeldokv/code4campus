import React, { useState } from 'react';
import { Navigation, MapPin, Clock, Users, Calendar } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  venue: string;
  date: string;
  time: string;
  capacity: number;
  registered: number;
  description: string;
}

const events: Event[] = [
  {
    id: '1',
    title: 'Code 4 Campus',
    venue: 'Online',
    date: '2024-08-10',
    time: '10:00 AM',
    capacity: 500,
    registered: 387,
    description: 'Join the one week web development competition by mulearn.'
  },
  {
    id: '2',
    title: 'Cultural Night',
    venue: 'Main block',
    date: '2025-08-20',
    time: '6:00 PM',
    capacity: 800,
    registered: 654,
    description: 'An evening of music, dance, and cultural performances by students from various departments.'
  },
  {
    id: '3',
    title: 'Career Fair 2025',
    venue: 'Mech Block',
    date: '2025-08-25',
    time: '9:00 AM',
    capacity: 300,
    registered: 248,
    description: 'Meet with top employers and explore internship and job opportunities.'
  }
];

const EventNavigation: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showNavigation, setShowNavigation] = useState(false);

  const handleGetDirections = (event: Event) => {
    setSelectedEvent(event);
    setShowNavigation(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Navigation className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Event Navigation</h1>
          <p className="text-gray-400">Find your way to campus events</p>
        </div>
      </div>

      {/* Events List */}
      <div className="grid gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                <p className="text-gray-300 mb-3">{event.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">{event.venue}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300">{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300">{event.registered}/{event.capacity}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                {/* Only show Get Directions button if event.id !== '1' */}
                {event.venue !== 'Online' && (
                  <button 
                    onClick={() => handleGetDirections(event)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions</span>
                  </button>
                )}
                <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Register
                </button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Registration Progress</span>
                <span>{Math.round((event.registered / event.capacity) * 100)}% Full</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Modal */}
      {showNavigation && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Navigation to {selectedEvent.venue}</h3>
              <button
                onClick={() => setShowNavigation(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-4">
              <div className="bg-gray-700 rounded-lg p-4 mb-4">
                <h4 className="text-white font-semibold mb-2">Event: {selectedEvent.title}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Date:</span>
                    <span className="text-white ml-2">{new Date(selectedEvent.date).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Time:</span>
                    <span className="text-white ml-2">{selectedEvent.time}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Route Visualization */}
            <div className="bg-gray-700 rounded-lg p-4 mb-4">
              <h4 className="text-white font-semibold mb-3 flex items-center">
                <Navigation className="w-4 h-4 mr-2" />
                Route from Main Gate
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                  <div>
                    <div className="text-white">Start at Main Gate</div>
                    <div className="text-gray-400 text-sm">Campus entrance</div>
                  </div>
                </div>
                <div className="ml-4 h-6 w-0.5 bg-gray-600"></div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <div>
                    <div className="text-white">Walk straight 200m</div>
                    <div className="text-gray-400 text-sm">Follow main pathway</div>
                  </div>
                </div>
                <div className="ml-4 h-6 w-0.5 bg-gray-600"></div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                  <div>
                    <div className="text-white">Turn left to enter the lobby</div>
                    <div className="text-gray-400 text-sm">At the four pillar enterance</div>
                  </div>
                </div>
                <div className="ml-4 h-6 w-0.5 bg-gray-600"></div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                  <div>
                    <div className="text-white">Arrive at {selectedEvent.venue}</div>
                    <div className="text-gray-400 text-sm">Total walking time: ~2 minutes</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowNavigation(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Close
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Start Navigation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventNavigation;