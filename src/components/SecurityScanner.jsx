import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { performSecurityScan } from '../utils/scanningEngine';
import ToolsPanel from './ToolsPanel';

const { FiSearch, FiSettings, FiInfo, FiShield, FiGlobe, FiLock, FiAlertTriangle } = FiIcons;

const SecurityScanner = ({ onScanComplete, isScanning, setIsScanning }) => {
  const [url, setUrl] = useState('');
  const [scanDepth, setScanDepth] = useState('basic');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleScan = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setError('');
    setIsScanning(true);
    
    try {
      // Validate URL format
      new URL(url);
      
      console.log(`Starting security scan for ${url} with depth: ${scanDepth}`);
      const results = await performSecurityScan(url, scanDepth);
      onScanComplete(results);
      navigate('/results');
    } catch (error) {
      console.error('Scan failed:', error);
      setError(error.message || 'Failed to scan the website. Please check the URL and try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const scanOptions = [
    {
      value: 'basic',
      label: 'Basic Scan',
      description: 'SSL & Security Headers only',
      duration: '~30 seconds'
    },
    {
      value: 'advanced',
      label: 'Advanced Scan',
      description: 'Adds VirusTotal & Safe Browsing',
      duration: '~60 seconds'
    },
    {
      value: 'full',
      label: 'Full Scan',
      description: 'Adds Mozilla Observatory',
      duration: '~90 seconds'
    }
  ];

  const features = [
    {
      icon: FiLock,
      title: 'SSL Certificate Analysis',
      description: 'Powered by SSL Labs API for comprehensive certificate validation'
    },
    {
      icon: FiShield,
      title: 'Security Headers Check',
      description: 'SecurityHeaders.com integration for HTTP security analysis'
    },
    {
      icon: FiGlobe,
      title: 'Multi-Engine Scanning',
      description: 'VirusTotal & Google Safe Browsing for threat detection (Advanced & Full)'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Professional Website Security Analysis
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Comprehensive security scanning powered by industry-leading tools. Choose scan depth to control which security tests are run.
        </p>
      </motion.div>

      {/* Scan Form */}
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8 mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <form onSubmit={handleScan} className="space-y-6">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              Website URL
            </label>
            <div className="relative">
              <SafeIcon icon={FiGlobe} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            {error && (
              <div className="mt-2 flex items-center space-x-2 text-red-600">
                <SafeIcon icon={FiAlertTriangle} className="text-sm" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <SafeIcon icon={FiSettings} className="inline mr-2" /> Scan Depth
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {scanOptions.map((option) => (
                <motion.label
                  key={option.value}
                  className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                    scanDepth === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <input
                    type="radio"
                    name="scanDepth"
                    value={option.value}
                    checked={scanDepth === option.value}
                    onChange={(e) => setScanDepth(e.target.value)}
                    className="sr-only"
                  />
                  <div className="font-medium text-gray-800">{option.label}</div>
                  <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                  <div className="text-xs text-gray-500 mt-2">{option.duration}</div>
                </motion.label>
              ))}
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isScanning}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isScanning ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Scanning with {scanDepth} scan tools...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <SafeIcon icon={FiSearch} className="text-lg" />
                <span>Start {scanDepth.charAt(0).toUpperCase() + scanDepth.slice(1)} Security Scan</span>
              </div>
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <SafeIcon icon={feature.icon} className="text-blue-600 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Scan Depth Information */}
      <motion.div 
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Scan Depth Information</h3>
        <div className="space-y-4">
          <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                Basic Scan
              </span>
              <span className="text-sm text-gray-600">~30 seconds</span>
            </div>
            <p className="text-sm text-gray-700 mb-2">Checks SSL certificate configuration and HTTP security headers.</p>
            <div className="text-xs text-gray-600">
              <span className="font-medium">Tests:</span> SSL Labs, SecurityHeaders.com
            </div>
          </div>
          
          <div className="p-4 border border-purple-100 bg-purple-50 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800 mr-2">
                Advanced Scan
              </span>
              <span className="text-sm text-gray-600">~60 seconds</span>
            </div>
            <p className="text-sm text-gray-700 mb-2">Includes basic scan plus malware detection and safe browsing checks.</p>
            <div className="text-xs text-gray-600">
              <span className="font-medium">Additional Tests:</span> VirusTotal, Google Safe Browsing
            </div>
          </div>
          
          <div className="p-4 border border-green-100 bg-green-50 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 mr-2">
                Full Scan
              </span>
              <span className="text-sm text-gray-600">~90 seconds</span>
            </div>
            <p className="text-sm text-gray-700 mb-2">Comprehensive security analysis including all advanced checks plus Mozilla Observatory.</p>
            <div className="text-xs text-gray-600">
              <span className="font-medium">Additional Tests:</span> Mozilla Observatory
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tools Panel */}
      <ToolsPanel />
    </div>
  );
};

export default SecurityScanner;