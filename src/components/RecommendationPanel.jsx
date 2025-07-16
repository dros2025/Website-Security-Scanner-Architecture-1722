import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiLightbulb, FiCheckSquare, FiExternalLink } = FiIcons;

const RecommendationPanel = ({ recommendations }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommendations</h3>
      
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={index}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-start space-x-3">
              <SafeIcon icon={FiLightbulb} className="text-yellow-500 text-lg mt-1" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800">{rec.title}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                    {rec.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{rec.description}</p>
                
                {rec.steps && (
                  <div className="mb-3">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Steps to fix:</h5>
                    <ul className="space-y-1">
                      {rec.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                          <SafeIcon icon={FiCheckSquare} className="text-green-500 text-xs mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {rec.link && (
                  <a 
                    href={rec.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <span>Learn more</span>
                    <SafeIcon icon={FiExternalLink} className="text-xs" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecommendationPanel;