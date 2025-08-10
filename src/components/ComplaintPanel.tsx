import React, { useState } from 'react';
import { AlertTriangle, Upload, Send, CheckCircle, Clock, X } from 'lucide-react';

interface Complaint {
  id: string;
  title: string;
  description: string;
  category: 'academic' | 'facilities' | 'safety' | 'transport' | 'food' | 'harassment' | 'other';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'resolved' | 'closed';
  date: string;
  submittedBy: string;
  assignedTo?: string;
}

const existingComplaints: Complaint[] = [
  {
    id: '1',
    title: 'Broken AC in Lecture Hall B-201',
    description: 'The air conditioning system in Lecture Hall B-201 has been malfunctioning for the past week, making it very uncomfortable during afternoon classes.',
    category: 'facilities',
    priority: 'medium',
    status: 'in-progress',
    date: '2024-02-25',
    submittedBy: 'Anonymous',
    assignedTo: 'Maintenance Dept.'
  },
  {
    id: '2',
    title: 'Inadequate lighting in parking lot',
    description: 'The parking lot near the dormitories has poor lighting which creates safety concerns, especially during evening hours.',
    category: 'safety',
    priority: 'high',
    status: 'pending',
    date: '2024-02-27',
    submittedBy: 'Student Safety Committee'
  },
  {
    id: '3',
    title: 'Delay in grade posting',
    description: 'Grades for the midterm examination have not been posted even after 3 weeks, causing anxiety among students.',
    category: 'academic',
    priority: 'medium',
    status: 'resolved',
    date: '2024-02-20',
    submittedBy: 'CS Department Students',
    assignedTo: 'Academic Office'
  }
];

const categories = [
  { value: 'academic', label: 'Academic Issues' },
  { value: 'facilities', label: 'Facilities & Infrastructure' },
  { value: 'safety', label: 'Safety & Security' },
  { value: 'transport', label: 'Transportation' },
  { value: 'food', label: 'Food Services' },
  { value: 'harassment', label: 'Harassment/Discrimination' },
  { value: 'other', label: 'Other' }
];

const statusColors = {
  pending: 'bg-yellow-600',
  'in-progress': 'bg-blue-600',
  resolved: 'bg-green-600',
  closed: 'bg-gray-600'
};

const priorityColors = {
  high: 'text-red-400',
  medium: 'text-yellow-400',
  low: 'text-green-400'
};

const ComplaintPanel: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'other',
    priority: 'medium',
    anonymous: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Complaint submitted:', formData);
    setShowForm(false);
    setFormData({
      title: '',
      description: '',
      category: 'other',
      priority: 'medium',
      anonymous: false
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">Complaint Panel</h1>
            <p className="text-gray-400">Submit complaints and track their resolution status</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>Submit Complaint</span>
        </button>
      </div>

      {/* Complaint Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Submit New Complaint</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                  Complaint Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief title describing your complaint"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-2">
                    Priority *
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please provide detailed information about your complaint, including when and where it occurred, and any relevant details that might help in resolving the issue."
                  required
                />
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Upload className="w-5 h-5 text-gray-400" />
                  <div>
                    <h4 className="text-white font-medium">Attach Supporting Documents (Optional)</h4>
                    <p className="text-gray-400 text-sm">Upload images, documents, or other evidence related to your complaint</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="mt-3 bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  Choose Files
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="anonymous"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleInputChange}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="anonymous" className="text-gray-300 text-sm">
                  Submit anonymously (your identity will not be disclosed)
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Complaint</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Complaint Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-2xl font-bold text-blue-400 mb-1">{existingComplaints.length}</div>
          <div className="text-gray-400 text-sm">Total Complaints</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-2xl font-bold text-yellow-400 mb-1">
            {existingComplaints.filter(c => c.status === 'pending').length}
          </div>
          <div className="text-gray-400 text-sm">Pending</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-2xl font-bold text-blue-400 mb-1">
            {existingComplaints.filter(c => c.status === 'in-progress').length}
          </div>
          <div className="text-gray-400 text-sm">In Progress</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-2xl font-bold text-green-400 mb-1">
            {existingComplaints.filter(c => c.status === 'resolved').length}
          </div>
          <div className="text-gray-400 text-sm">Resolved</div>
        </div>
      </div>

      {/* Recent Complaints */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-6">Recent Complaints</h2>
        <div className="space-y-4">
          {existingComplaints.map((complaint) => (
            <div key={complaint.id} className="bg-gray-750 rounded-lg p-4 border border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{complaint.title}</h3>
                  <p className="text-gray-300 text-sm mb-2">{complaint.description}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium text-white ${statusColors[complaint.status]}`}>
                    {complaint.status.replace('-', ' ').toUpperCase()}
                  </span>
                  <span className={`text-xs font-medium ${priorityColors[complaint.priority]}`}>
                    {complaint.priority.toUpperCase()} PRIORITY
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center space-x-4">
                  <span>Category: {categories.find(c => c.value === complaint.category)?.label}</span>
                  <span>Submitted: {new Date(complaint.date).toLocaleDateString()}</span>
                  <span>By: {complaint.submittedBy}</span>
                </div>
                {complaint.assignedTo && (
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                    <span>Assigned to: {complaint.assignedTo}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guidelines */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Complaint Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Before Submitting</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></div>
                <span>Ensure your complaint hasn't already been reported</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></div>
                <span>Provide clear and specific details</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"></div>
                <span>Include dates, times, and locations when relevant</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Response Times</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-red-400" />
                <span>High Priority: 24-48 hours</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span>Medium Priority: 3-5 business days</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-green-400" />
                <span>Low Priority: 1-2 weeks</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintPanel;