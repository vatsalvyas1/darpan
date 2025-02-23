import React from 'react';
import { Heart, Facebook, Twitter, Instagram, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-6 h-6 text-rose-500" />
              <span className="text-white text-xl font-semibold">Darpan</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Empowering communities through transparent and impactful charitable giving.
              Together, we can make a difference in the lives of those who need it most.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['About Us', 'How It Works', 'Success Stories', 'Get Involved'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <ExternalLink className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a href="mailto:contact@darpan.org" className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
                <Mail className="w-4 h-4 mr-2" />
                <span>contact@darpan.org</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
                <Phone className="w-4 h-4 mr-2" />
                <span>+1 (234) 567-890</span>
              </a>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span>123 Charity Lane, Giving City</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' }
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="bg-gray-700 p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-600 transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className=" text-center">
            <p className="text-gray-400 text-sm">
              Made with ❤️
              &copy; {currentYear} Darpan. 
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;