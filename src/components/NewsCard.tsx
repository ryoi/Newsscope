import React from 'react';
import { Clock, ExternalLink, Bookmark, Share2, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { NewsArticle } from '../types';

interface NewsCardProps {
  article: NewsArticle;
  onFactCheck: (article: NewsArticle) => void;
  isBookmarked?: boolean;
  onBookmark?: (articleId: string) => void;
  hasProAccess: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ 
  article, 
  onFactCheck, 
  isBookmarked = false, 
  onBookmark,
  hasProAccess 
}) => {
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

  const getFactCheckIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'partially-verified': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'disputed': case 'false': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getCredibilityColor = (score: number) => {
    if (score >= 0.9) return 'text-green-600 dark:text-green-400';
    if (score >= 0.8) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
      {/* Article Image */}
      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-6">
        {/* Category and Source */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium rounded">
              {article.category}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {article.source}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {article.readTime}m read
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* AI Analysis - Pro Feature */}
        {hasProAccess ? (
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                AI Analysis
              </h3>
              <div className="flex items-center space-x-2">
                {getFactCheckIcon(article.factCheckStatus.status)}
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {article.factCheckStatus.confidence * 100}% confidence
                </span>
              </div>
            </div>

            {/* Political Bias */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Political Bias:</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getBiasColor(article.politicalBias.orientation)}`}>
                {article.politicalBias.orientation.replace('-', ' ')}
              </span>
            </div>

            {/* Credibility Score */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Credibility:</span>
              <span className={`text-sm font-medium ${getCredibilityColor(article.credibilityScore)}`}>
                {Math.round(article.credibilityScore * 100)}%
              </span>
            </div>

            {/* Reasoning Preview */}
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                <strong>Analysis:</strong> {article.politicalBias.reasoning}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 mb-4 border border-orange-200 dark:border-orange-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                AI Analysis
              </h3>
              <span className="px-2 py-1 bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-300 text-xs rounded font-medium">
                Pro Feature
              </span>
            </div>
            <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
              Get AI-powered fact checking, political bias analysis, and credibility scoring with Pro.
            </p>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('openSubscriptionModal'))}
              className="text-sm bg-orange-600 text-white px-3 py-1.5 rounded hover:bg-orange-700 transition-colors"
            >
              Upgrade to Pro
            </button>
          </div>
        )}

        {/* Enhanced AI Analysis - Only for Pro users */}
        {hasProAccess && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 mb-4 border border-blue-200 dark:border-blue-700">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Enhanced AI Insights
              </h3>
            </div>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Fact Verification:</span>
                <div className="flex items-center space-x-1">
                  {getFactCheckIcon(article.factCheckStatus.status)}
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {article.factCheckStatus.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Source Reliability:</span>
                <span className={`font-medium ${getCredibilityColor(article.credibilityScore)}`}>
                  {article.credibilityScore >= 0.9 ? 'Highly Reliable' : 
                   article.credibilityScore >= 0.8 ? 'Reliable' : 'Questionable'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Emotional Tone:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {article.politicalBias.orientation === 'center' ? 'Neutral' : 
                   article.politicalBias.orientation.includes('left') ? 'Slightly Critical' : 'Supportive'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Upgrade prompt for Enhanced AI Analysis - Basic users */}
        {!hasProAccess && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4 mb-4 border border-purple-200 dark:border-purple-700">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Enhanced AI Insights
              </h3>
            </div>
          </div>
        )}

        {/* Enhanced AI Analysis for Demo */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 mb-4 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Enhanced AI Insights
            </h3>
          </div>
          
          <div className="space-y-2 text-xs">
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onFactCheck(article)}
              className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              {getFactCheckIcon(article.factCheckStatus.status)}
              <span className="text-sm">
                {hasProAccess ? 'View Analysis' : 'Upgrade for Analysis'}
              </span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onBookmark?.(article.id)}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked 
                  ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20' 
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Author and Date */}
        <div className="flex items-center justify-between mt-3 text-sm text-gray-500 dark:text-gray-400">
          <span>By {article.author}</span>
          <time>{new Date(article.publishedAt).toLocaleDateString()}</time>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;