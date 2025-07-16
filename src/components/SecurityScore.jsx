import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiShield, FiAlertTriangle, FiCheckCircle, FiXCircle } = FiIcons;

const SecurityScore = ({ score, grade }) => {
  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'text-green-600 bg-green-100';
      case 'B':
        return 'text-blue-600 bg-blue-100';
      case 'C':
        return 'text-yellow-600 bg-yellow-100';
      case 'D':
      case 'F':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (grade) => {
    if (grade === 'A+' || grade === 'A') return FiCheckCircle;
    if (grade === 'B' || grade === 'C') return FiAlertTriangle;
    return FiXCircle;
  };

  const getStatusMessage = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'Excellent security posture';
    if (grade === 'B') return 'Good security with minor issues';
    if (grade === 'C') return 'Moderate security concerns';
    return 'Critical security issues detected';
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-8 mb-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full">
            <SafeIcon icon={FiShield} className="text-white text-3xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Security Score</h2>
            <p className="text-gray-600">Overall website security assessment</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center space-x-3 mb-2">
            <motion.div 
              className={`text-6xl font-bold px-4 py-2 rounded-lg ${getGradeColor(grade)}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {grade}
            </motion.div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-800">{score}/100</div>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <SafeIcon icon={getStatusIcon(grade)} className="text-lg" />
                <span>{getStatusMessage(grade)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-6">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>Poor</span>
          <span>Excellent</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SecurityScore;