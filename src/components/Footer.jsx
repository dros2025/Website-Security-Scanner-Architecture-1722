import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHeart, FiGithub, FiTwitter, FiLinkedin } = FiIcons;

const Footer = () => {
  return (
    <motion.footer 
      className="bg-gray-900 text-white py-12 mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">SecureCheck</h3>
            <p className="text-gray-400 text-sm">
              Professional website security scanning and vulnerability assessment tools.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>SSL Certificate Analysis</li>
              <li>Security Headers Check</li>
              <li>Vulnerability Scanning</li>
              <li>Malware Detection</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Documentation</li>
              <li>API Reference</li>
              <li>Security Blog</li>
              <li>Best Practices</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <SafeIcon icon={FiGithub} className="text-gray-400 hover:text-white cursor-pointer" />
              <SafeIcon icon={FiTwitter} className="text-gray-400 hover:text-white cursor-pointer" />
              <SafeIcon icon={FiLinkedin} className="text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>Made with <SafeIcon icon={FiHeart} className="inline text-red-500" /> for a safer web</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;