import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiLock, FiShield, FiGlobe, FiSearch, FiEye, FiExternalLink } = FiIcons;

const ApiResultsPanel = ({ checks }) => {
  const getGradeColor = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'bg-green-100 text-green-800';
    if (grade === 'B') return 'bg-blue-100 text-blue-800';
    if (grade === 'C') return 'bg-yellow-100 text-yellow-800';
    if (grade === 'D' || grade === 'F') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const apiTools = [
    {
      key: 'ssl',
      name: 'SSL Labs',
      icon: FiLock,
      url: 'https://www.ssllabs.com/ssltest/',
      description: 'SSL certificate and TLS configuration analysis'
    },
    {
      key: 'headers',
      name: 'SecurityHeaders',
      icon: FiShield,
      url: 'https://securityheaders.com/',
      description: 'HTTP security headers analysis'
    },
    {
      key: 'observatory',
      name: 'Mozilla Observatory',
      icon: FiGlobe,
      url: 'https://observatory.mozilla.org/',
      description: 'Comprehensive web security analysis'
    },
    {
      key: 'virusTotal',
      name: 'VirusTotal',
      icon: FiSearch,
      url: 'https://www.virustotal.com/',
      description: 'Multi-engine malware detection'
    },
    {
      key: 'safeBrowsing',
      name: 'Google Safe Browsing',
      icon: FiEye,
      url: 'https://transparencyreport.google.com/safe-browsing/',
      description: 'Google threat detection service'
    }
  ];

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">API Integration Results</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {apiTools.map((tool) => {
          const result = checks[tool.key];
          if (!result) return null;

          return (
            <motion.div
              key={tool.key}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-start space-x-3">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-2 rounded-lg">
                  <SafeIcon icon={tool.icon} className="text-blue-600 text-lg" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">{tool.name}</h4>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <SafeIcon icon={FiExternalLink} className="text-sm" />
                    </a>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{tool.description}</p>

                  {/* SSL Labs Results */}
                  {tool.key === 'ssl' && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Grade:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getGradeColor(result.grade)}`}>
                          {result.grade}
                        </span>
                      </div>
                      {result.hasWarnings && (
                        <div className="text-xs text-yellow-600">⚠️ Has warnings</div>
                      )}
                    </div>
                  )}

                  {/* SecurityHeaders Results */}
                  {tool.key === 'headers' && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Grade:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getGradeColor(result.grade)}`}>
                          {result.grade}
                        </span>
                      </div>
                      {result.missingHeaders && result.missingHeaders.length > 0 && (
                        <div className="text-xs text-red-600">
                          Missing: {result.missingHeaders.length} headers
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mozilla Observatory Results */}
                  {tool.key === 'observatory' && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Score:</span>
                        <span className="text-sm font-medium text-gray-800">{result.score}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Grade:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getGradeColor(result.grade)}`}>
                          {result.grade}
                        </span>
                      </div>
                      {result.tests_passed !== undefined && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Tests:</span>
                          <span className="text-xs">
                            <span className="text-green-600">{result.tests_passed} passed</span>
                            {result.tests_failed > 0 && (
                              <>, <span className="text-red-600">{result.tests_failed} failed</span></>
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* VirusTotal Results */}
                  {tool.key === 'virusTotal' && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${result.clean ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {result.clean ? 'Clean' : 'Threats'}
                        </span>
                      </div>
                      {!result.clean && result.detections !== undefined && (
                        <div className="text-xs text-red-600">
                          {result.detections}/{result.engines} engines detected threats
                        </div>
                      )}
                      {result.message && (
                        <div className="text-xs text-gray-600">{result.message}</div>
                      )}
                    </div>
                  )}

                  {/* Google Safe Browsing Results */}
                  {tool.key === 'safeBrowsing' && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${result.safe ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {result.safe ? 'Safe' : 'Flagged'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">{result.message}</div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ApiResultsPanel;