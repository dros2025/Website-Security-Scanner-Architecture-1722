import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiShield, FiGlobe } = FiIcons;

const Header = () => {
  return (
    <motion.header 
      className="bg-white shadow-lg border-b border-gray-200"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg">
              <SafeIcon icon={FiShield} className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">SecureCheck</h1>
              <p className="text-gray-600 text-sm">Website Security Scanner</p>
            </div>
          </motion.div>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <SafeIcon icon={FiGlobe} className="text-lg" />
            <span className="text-sm">Protecting the web, one scan at a time</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;