import React, { useState } from 'react';
import { Calendar, Clock, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { TimelineEvent, NewsArticle } from '../types';

interface TimelineViewProps {
  events: TimelineEvent[];
  onArticleSelect: (article: NewsArticle) => void;
  hasEnterpriseAccess: boolean;
}

const TimelineView: React.FC<TimelineViewProps> = ({ events, onArticleSelect, hasEnterpriseAccess }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [currentPage, setCurrentPage] = useState(0);

  const periods = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '3 Months' }
  ];

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
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

  // Always show full timeline for demo
  const showUpgradePrompt = false;

  return (
    <div className="space-y-6">
      {/* Enterprise Feature Badge */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
            <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">Enterprise Timeline Feature</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Track story development over time with historical context analysis and significance indicators.
            </p>
          </div>
          <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-medium">
            Active
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              News Timeline
            </h2>
          </div>

          {/* Period Selector */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {periods.map(period => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  selectedPeriod === period.value
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600" />

          {/* Timeline Events */}
          <div className="space-y-6">
            {events.map((event, index) => (
              <div key={event.id} className="relative flex items-start space-x-4">
                {/* Timeline Dot */}
                <div className={`w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${getSignificanceColor(event.significance)} z-10`} />

                {/* Event Content */}
                <div className="flex-1 min-w-0 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {event.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {event.summary}
                  </p>

                  {/* Related Articles */}
                  <div className="space-y-2">
                    {event.articles.map(article => (
                      <button
                        key={article.id}
                        onClick={() => onArticleSelect(article)}
                        className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 dark:text-white truncate">
                              {article.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {article.source} • {article.readTime}m read
                            </p>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getBiasColor(article.politicalBias.orientation)}`}>
                              {article.politicalBias.orientation.replace('-', ' ')}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Significance Indicator */}
                  <div className="flex items-center space-x-2 mt-3">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Significance: <span className="capitalize font-medium">{event.significance}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-sm text-gray-500 dark:text-gray-400">
              Showing events for {periods.find(p => p.value === selectedPeriod)?.label}
            </span>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Original enterprise-only view (keeping as fallback)
  if (false && !hasEnterpriseAccess) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Timeline Feature
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Track how news stories develop over time and understand historical context with our Enterprise timeline feature.
        </p>
        <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          Upgrade to Enterprise
        </button>
      </div>
    );
  }
};

export default TimelineView;