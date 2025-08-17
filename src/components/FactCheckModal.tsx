import React from 'react';
import { X, CheckCircle, AlertTriangle, XCircle, Clock, ExternalLink } from 'lucide-react';
import { NewsArticle } from '../types';

interface FactCheckModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  hasProAccess: boolean;
}

const FactCheckModal: React.FC<FactCheckModalProps> = ({ article, onClose, hasProAccess }) => {
  if (!article) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'partially-verified': return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case 'disputed': case 'false': return <XCircle className="w-6 h-6 text-red-500" />;
      default: return <Clock className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-300';
      case 'partially-verified': return 'text-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'disputed': case 'false': return 'text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-300';
      default: return 'text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getBiasColor = (orientation: string) => {
    switch (orientation) {
      case 'left': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'center-left': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300';
      case 'center': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'center-right': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300';
      case 'right': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white pr-4">
            {hasProAccess ? 'AI Fact Check & Bias Analysis' : 'Upgrade to Pro for Full Analysis'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Article Title */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {article.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {article.source} • By {article.author}
            </p>
          </div>

          {hasProAccess ? (
            <>
              {/* Fact Check Status */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  {getStatusIcon(article.factCheckStatus.status)}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Fact Check Status
                    </h4>
                    <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${getStatusColor(article.factCheckStatus.status)}`}>
                      {article.factCheckStatus.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Confidence</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {Math.round(article.factCheckStatus.confidence * 100)}%
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  {article.factCheckStatus.summary}
                </p>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Sources:</h5>
                  <ul className="space-y-1">
                    {article.factCheckStatus.sources.map((source, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <ExternalLink className="w-3 h-3 text-gray-400" />
                        <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                          {source}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Political Bias Analysis */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Political Bias Analysis
                  </h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBiasColor(article.politicalBias.orientation)}`}>
                    {article.politicalBias.orientation.replace('-', ' ')}
                  </span>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Confidence Level</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {Math.round(article.politicalBias.confidence * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${article.politicalBias.confidence * 100}%` }}
                    />
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {article.politicalBias.reasoning}
                </p>
              </div>

              {/* Credibility Score */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Credibility Score
                  </h4>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Math.round(article.credibilityScore * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      article.credibilityScore >= 0.9 ? 'bg-green-500' :
                      article.credibilityScore >= 0.8 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${article.credibilityScore * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Based on source reputation, author expertise, and factual accuracy
                </p>
              </div>

              {/* Enhanced AI Analysis Section */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">AI</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Advanced AI Analysis
                  </h4>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Writing Style:</span>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {article.politicalBias.orientation === 'center' ? 'Objective, factual' : 
                       article.politicalBias.orientation.includes('left') ? 'Analytical, critical' : 'Supportive, descriptive'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Source Quality:</span>
                    <p className={`font-medium ${getCredibilityColor(article.credibilityScore)}`}>
                      {article.credibilityScore >= 0.9 ? 'Excellent' : 
                       article.credibilityScore >= 0.8 ? 'Good' : 'Fair'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Language Tone:</span>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {article.factCheckStatus.status === 'verified' ? 'Neutral, informative' : 'Cautious, questioning'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Controversy Level:</span>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {article.category === 'Politics' ? 'High' : 
                       article.category === 'Environment' ? 'Medium' : 'Low'}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Upgrade Prompt for Basic Users */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">AI</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Unlock AI-Powered Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Get detailed fact-checking, political bias analysis, credibility scoring, and advanced AI insights with Pro access.
              </p>
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 mb-6 border border-orange-200 dark:border-orange-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Pro Features Include:</h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• AI fact verification with confidence scores</li>
                  <li>• Political bias detection and analysis</li>
                  <li>• Source credibility assessment</li>
                  <li>• Writing style and tone analysis</li>
                  <li>• Advanced filtering capabilities</li>
                </ul>
              </div>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('openSubscriptionModal'))}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                Upgrade to Pro - $12.99/month
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function for credibility color (add this if not already present)
const getCredibilityColor = (score: number) => {
  if (score >= 0.9) return 'text-green-600 dark:text-green-400';
  if (score >= 0.8) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-600 dark:text-red-400';
};

export default FactCheckModal;