import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import SecurityScore from './SecurityScore';
import VulnerabilityList from './VulnerabilityList';
import RecommendationPanel from './RecommendationPanel';
import ApiResultsPanel from './ApiResultsPanel';

const { FiArrowLeft, FiDownload, FiRefreshCw, FiAlertCircle, FiClock, FiCheckCircle } = FiIcons;

const ScanResults = ({ scanData, isScanning }) => {
  const navigate = useNavigate();

  const handleRescan = () => {
    navigate('/');
  };

  const handleExportReport = () => {
    const reportData = {
      ...scanData,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `security-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getScanDepthInfo = (scanDepth) => {
    switch (scanDepth) {
      case 'basic':
        return {
          label: 'Basic Scan',
          description: 'SSL Certificate & Security Headers analysis',
          color: 'bg-blue-100 text-blue-800'
        };
      case 'advanced':
        return {
          label: 'Advanced Scan',
          description: 'Includes malware detection & safe browsing checks',
          color: 'bg-purple-100 text-purple-800'
        };
      case 'full':
        return {
          label: 'Full Security Audit',
          description: 'Comprehensive analysis including Mozilla Observatory',
          color: 'bg-green-100 text-green-800'
        };
      default:
        return {
          label: 'Security Scan',
          description: 'Security analysis completed',
          color: 'bg-gray-100 text-gray-800'
        };
    }
  };

  if (isScanning) {
    return (
      <motion.div
        className="flex items-center justify-center min-h-96"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Professional Security Scan in Progress...</h3>
          <p className="text-gray-600">
            {scanData?.scanDepth === 'basic' && 'Running SSL and Security Header checks...'}
            {scanData?.scanDepth === 'advanced' && 'Running advanced security checks including malware detection...'}
            {scanData?.scanDepth === 'full' && 'Performing comprehensive security audit with all available tools...'}
            {!scanData?.scanDepth && 'Analyzing with security tools...'}
          </p>
        </div>
      </motion.div>
    );
  }

  if (!scanData) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4">No scan results available</h3>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start New Scan
        </button>
      </motion.div>
    );
  }

  const depthInfo = getScanDepthInfo(scanData.scanDepth);

  return (
    <motion.div
      className="max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} />
            <span>Back to Scanner</span>
          </button>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleExportReport}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiDownload} />
              <span>Export Report</span>
            </button>
            <button
              onClick={handleRescan}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiRefreshCw} />
              <span>Rescan</span>
            </button>
          </div>
        </div>
        
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Professional Security Report</h1>
          <div className="flex items-center space-x-4 text-gray-600 mb-3">
            <span>
              Scanned: <span className="font-medium">{scanData.url}</span>
            </span>
            <span>•</span>
            <span>
              Completed: {new Date(scanData.timestamp).toLocaleString()}
            </span>
          </div>
          
          {/* Scan Type and Duration Info */}
          <div className="flex items-center space-x-4 mb-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${depthInfo.color}`}>
              {depthInfo.label}
            </span>
            {scanData.scanDuration && (
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <SafeIcon icon={FiClock} className="text-xs" />
                <span>Duration: {scanData.scanDuration}</span>
              </div>
            )}
          </div>
          
          <p className="text-sm text-gray-600 mb-3">{depthInfo.description}</p>
          
          {/* Tests Performed */}
          {scanData.testsPerformed && scanData.testsPerformed.length > 0 && (
            <div className="mb-3">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Tests Performed:</h4>
              <div className="flex flex-wrap gap-2">
                {scanData.testsPerformed.map((test, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                  >
                    <SafeIcon icon={FiCheckCircle} className="text-green-500 text-xs" />
                    <span>{test}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {scanData.fallback && (
            <div className="mt-3 inline-flex items-center space-x-1 text-yellow-600">
              <SafeIcon icon={FiAlertCircle} className="text-sm" />
              <span className="text-sm">Demo mode - API integrations disabled</span>
            </div>
          )}
        </div>
      </div>

      {/* Security Score */}
      <SecurityScore score={scanData.overallScore} grade={scanData.grade} />

      {/* API Results Panel (if real API data is available) */}
      {scanData.checks && Object.keys(scanData.checks).length > 0 && (
        <ApiResultsPanel checks={scanData.checks} />
      )}

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <VulnerabilityList vulnerabilities={scanData.vulnerabilities} />
        <RecommendationPanel recommendations={scanData.recommendations} />
      </div>

      {/* Detailed Results */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Detailed Analysis</h3>
        <div className="space-y-4">
          {scanData.details.map((detail, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-800">{detail.category}</h4>
                {detail.source && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {detail.source}
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm">{detail.description}</p>
              <div className="mt-2">
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    detail.status === 'pass'
                      ? 'bg-green-100 text-green-800'
                      : detail.status === 'warning'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {detail.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ScanResults;