import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiExternalLink, FiShield, FiLock, FiGlobe, FiEye, FiSearch } = FiIcons;

const ToolsPanel = () => {
  const tools = [
    {
      name: 'SSL Labs SSL Test',
      icon: FiLock,
      description: 'Comprehensive SSL certificate and TLS configuration analysis',
      url: 'https://www.ssllabs.com/ssltest/analyze.html',
      features: ['Certificate validation', 'Protocol versions', 'Cipher strength', 'Vulnerability checks']
    },
    {
      name: 'SecurityHeaders',
      icon: FiShield,
      description: 'HTTP security headers analysis with A+ to F rating',
      url: 'https://securityheaders.com',
      features: ['Content-Security-Policy', 'X-Frame-Options', 'HSTS', 'Referrer-Policy']
    },
    {
      name: 'Mozilla Observatory',
      icon: FiGlobe,
      description: 'Comprehensive security analysis including headers and content policy',
      url: 'https://observatory.mozilla.org',
      features: ['Security headers', 'Content policy', 'Cookies', 'Third-party checks']
    },
    {
      name: 'VirusTotal',
      icon: FiSearch,
      description: 'Multi-engine malware and security threat detection',
      url: 'https://www.virustotal.com/gui/home/url',
      features: ['Malware detection', 'Blacklist status', 'Multiple engines', 'Threat intelligence']
    },
    {
      name: 'Google Safe Browsing',
      icon: FiEye,
      description: 'Check if Google has flagged your site for security issues',
      url: 'https://transparencyreport.google.com/safe-browsing/search',
      features: ['Malware detection', 'Phishing checks', 'Unwanted software', 'Deceptive sites']
    }
  ];

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Recommended Security Tools</h2>
        <p className="text-gray-600">
          Professional tools for deeper security analysis. Our scanner integrates with these services for comprehensive results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <div className="flex items-start space-x-3 mb-3">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-2 rounded-lg">
                <SafeIcon icon={tool.icon} className="text-blue-600 text-lg" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">{tool.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{tool.description}</p>
              </div>
            </div>
            
            <div className="mb-3">
              <h4 className="text-xs font-medium text-gray-700 mb-1">Features:</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                {tool.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-1">
                    <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              <span>Try Tool</span>
              <SafeIcon icon={FiExternalLink} className="text-xs" />
            </a>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-2">
          <SafeIcon icon={FiShield} className="text-blue-600 text-lg mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800 mb-1">Integration Notice</h4>
            <p className="text-sm text-blue-700">
              Our security scanner automatically integrates with these tools to provide comprehensive analysis. 
              You can also use them manually for additional insights and verification.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ToolsPanel;