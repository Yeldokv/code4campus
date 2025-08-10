import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Users } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'deadline' | 'holiday' | 'event' | 'registration';
  description?: string;
  location?: string;
  time?: string;
}

const events: CalendarEvent[] = [
  {
    id: '1',
    title: 'Spring Semester Begins',
    date: '2024-03-01',
    type: 'event',
    description: 'First day of spring semester classes',
    time: '8:00 AM'
  },
  {
    id: '2',
    title: 'Assignment Submission Deadline',
    date: '2024-03-05',
    type: 'deadline',
    description: 'Data Structures Assignment 2 due',
    time: '11:59 PM'
  },
  {
    id: '3',
    title: 'Midterm Examinations Begin',
    date: '2024-03-15',
    type: 'exam',
    description: 'Midterm examination period starts',
    location: 'Various Locations',
    time: '9:00 AM'
  },
  {
    id: '4',
    title: 'Tech Fest 2024',
    date: '2024-03-15',
    type: 'event',
    description: 'Annual technology festival',
    location: 'Main Campus',
    time: '10:00 AM'
  },
  {
    id: '5',
    title: 'Spring Break',
    date: '2024-03-18',
    type: 'holiday',
    description: 'Campus closed for spring break'
  },
  {
    id: '6',
    title: 'Cultural Night',
    date: '2024-03-20',
    type: 'event',
    description: 'Annual cultural celebration',
    location: 'Sports Complex',
    time: '6:00 PM'
  },
  {
    id: '7',
    title: 'Summer Course Registration',
    date: '2024-03-25',
    type: 'registration',
    description: 'Registration opens for summer courses',
    time: '9:00 AM'
  },
  {
    id: '8',
    title: 'Final Examinations',
    date: '2024-04-15',
    type: 'exam',
    description: 'Final examination period begins',
    location: 'Various Locations',
    time: '9:00 AM'
  }
];

const eventTypeColors = {
  exam: 'bg-red-600',
  deadline: 'bg-orange-600',
  holiday: 'bg-green-600',
  event: 'bg-blue-600',
  registration: 'bg-purple-600'
};

const eventTypeLabels = {
  exam: 'Examination',
  deadline: 'Deadline',
  holiday: 'Holiday',
  event: 'Event',
  registration: 'Registration'
};

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const AcademicCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 1)); // March 2024
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === month && 
                     new Date().getFullYear() === year;

      days.push(
        <div key={day} className={`p-2 min-h-[100px] border border-gray-700 ${isToday ? 'bg-blue-900/30 border-blue-500' : 'hover:bg-gray-750'} transition-colors`}>
          <div className={`text-sm font-semibold mb-2 ${isToday ? 'text-blue-400' : 'text-white'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.map((event) => (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className={`w-full text-left text-xs p-1 rounded text-white hover:opacity-80 transition-opacity ${eventTypeColors[event.type]}`}
              >
                {event.title}
              </button>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Calendar className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">Academic Calendar</h1>
          <p className="text-gray-400">Important dates, events, and deadlines</p>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={previousMonth}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <h2 className="text-2xl font-bold text-white">
            {monthNames[month]} {year}
          </h2>
          
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-0 bg-gray-700 rounded-lg overflow-hidden">
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="bg-gray-600 p-3 text-center text-white font-semibold text-sm">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {renderCalendarDays()}
        </div>
      </div>

      {/* Event Legend */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Event Types</h2>
        <div className="flex flex-wrap gap-4">
          {Object.entries(eventTypeLabels).map(([type, label]) => (
            <div key={type} className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded ${eventTypeColors[type as keyof typeof eventTypeColors]}`}></div>
              <span className="text-gray-300 text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Upcoming Events</h2>
        <div className="space-y-3">
          {events
            .filter(event => new Date(event.date) >= new Date())
            .slice(0, 5)
            .map((event) => (
              <div
                key={event.id}
                className="flex items-center space-x-4 p-3 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <div className={`w-3 h-3 rounded-full ${eventTypeColors[event.type]}`}></div>
                <div className="flex-1">
                  <div className="text-white font-medium">{event.title}</div>
                  <div className="text-gray-400 text-sm">
                    {new Date(event.date).toLocaleDateString()}
                    {event.time && ` at ${event.time}`}
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium text-white ${eventTypeColors[event.type]}`}>
                  {eventTypeLabels[event.type]}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded text-sm font-medium text-white ${eventTypeColors[selectedEvent.type]}`}>
                {eventTypeLabels[selectedEvent.type]}
              </span>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-4">{selectedEvent.title}</h3>
            
            {selectedEvent.description && (
              <p className="text-gray-300 mb-4">{selectedEvent.description}</p>
            )}
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
              </div>
              
              {selectedEvent.time && (
                <div className="flex items-center space-x-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{selectedEvent.time}</span>
                </div>
              )}
              
              {selectedEvent.location && (
                <div className="flex items-center space-x-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedEvent.location}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedEvent(null)}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicCalendar;