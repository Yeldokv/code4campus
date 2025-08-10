import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Campus Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Campus Information</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Adi Shankara Institute of Engineering and Technology Kalady</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 999-9999-999</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@campus.edu</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Academic Calendar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Campus Map</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Student Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Library Resources</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Emergency Contacts</a></li>
            </ul>
          </div>

          {/* Support Hours */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Support Hours</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Monday - Friday: 8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Saturday: 9:00 AM - 4:00 PM</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Sunday: Closed</span>
              </div>
              <div className="mt-4 p-3 bg-red-900/30 border border-red-700 rounded-lg">
                <div className="text-red-400 font-semibold text-sm">Emergency: 100</div>
                <div className="text-gray-300 text-sm">Campus Security: ext. 2911</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Campus Connect. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Accessibility</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contact IT Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;