import React, { useState } from 'react';
import { BarChart3, TrendingUp, PieChart, Activity, Calendar, Filter, Users, Globe } from 'lucide-react';

interface AnalyticsViewProps {
  hasEnterpriseAccess: boolean;
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ hasEnterpriseAccess }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('bias');

  const periods = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '3 Months' }
  ];

  const metrics = [
    { value: 'bias', label: 'Political Bias Distribution', icon: PieChart },
    { value: 'credibility', label: 'Source Credibility', icon: BarChart3 },
    { value: 'topics', label: 'Trending Topics', icon: TrendingUp },
    { value: 'engagement', label: 'Reading Patterns', icon: Activity }
  ];

  // Mock analytics data
  const biasDistribution = [
    { label: 'Left', value: 18, color: 'bg-red-500' },
    { label: 'Center-Left', value: 24, color: 'bg-pink-500' },
    { label: 'Center', value: 35, color: 'bg-purple-500' },
    { label: 'Center-Right', value: 15, color: 'bg-indigo-500' },
    { label: 'Right', value: 8, color: 'bg-blue-500' }
  ];

  const credibilityData = [
    { range: '90-100%', count: 45, color: 'bg-green-500' },
    { range: '80-89%', count: 32, color: 'bg-yellow-500' },
    { range: '70-79%', count: 18, color: 'bg-orange-500' },
    { range: '60-69%', count: 5, color: 'bg-red-500' }
  ];

  const trendingTopics = [
    { topic: 'Climate Change', articles: 127, trend: '+15%', sentiment: 'mixed' },
    { topic: 'Healthcare Reform', articles: 89, trend: '+8%', sentiment: 'negative' },
    { topic: 'Technology Innovation', articles: 156, trend: '+22%', sentiment: 'positive' },
    { topic: 'Economic Policy', articles: 94, trend: '-3%', sentiment: 'mixed' },
    { topic: 'International Relations', articles: 73, trend: '+12%', sentiment: 'neutral' }
  ];

  const readingPatterns = [
    { time: '6 AM', articles: 12, avgTime: '3.2m' },
    { time: '9 AM', articles: 45, avgTime: '4.1m' },
    { time: '12 PM', articles: 67, avgTime: '2.8m' },
    { time: '3 PM', articles: 38, avgTime: '3.5m' },
    { time: '6 PM', articles: 89, avgTime: '5.2m' },
    { time: '9 PM', articles: 124, avgTime: '6.8m' }
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 dark:text-green-400';
      case 'negative': return 'text-red-600 dark:text-red-400';
      case 'mixed': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const renderMetricContent = () => {
    switch (selectedMetric) {
      case 'bias':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Political Bias Distribution
            </h3>
            <div className="space-y-3">
              {biasDistribution.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-24 text-sm text-gray-600 dark:text-gray-400">
                    {item.label}
                  </div>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className={`${item.color} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                  <div className="w-12 text-sm font-medium text-gray-900 dark:text-white">
                    {item.value}%
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Insight:</strong> Your news consumption shows a balanced perspective with 35% center-oriented sources, 
                indicating good exposure to diverse viewpoints.
              </p>
            </div>
          </div>
        );

      case 'credibility':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Source Credibility Analysis
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {credibilityData.map((item, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.range}
                    </span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {item.count}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${(item.count / 100) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-green-800 dark:text-green-300">
                <strong>Quality Score:</strong> 77% of your sources have high credibility (80%+), 
                indicating excellent information quality in your news diet.
              </p>
            </div>
          </div>
        );

      case 'topics':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Trending Topics Analysis
            </h3>
            <div className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {topic.topic}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${
                        topic.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {topic.trend}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {topic.articles} articles
                    </span>
                    <span className={`capitalize ${getSentimentColor(topic.sentiment)}`}>
                      {topic.sentiment} sentiment
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'engagement':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Reading Patterns
            </h3>
            <div className="space-y-3">
              {readingPatterns.map((pattern, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-12">
                      {pattern.time}
                    </span>
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(pattern.articles / 124) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {pattern.articles} articles
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {pattern.avgTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-sm text-purple-800 dark:text-purple-300">
                <strong>Peak Reading:</strong> Your most active reading time is 9 PM with an average of 6.8 minutes per article, 
                suggesting deep engagement with evening content.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Enterprise Feature Badge */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">Enterprise Analytics Dashboard</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Advanced insights into news consumption patterns, bias analysis, and trending topics.
            </p>
          </div>
          <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-medium">
            Active
          </span>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              Analytics Dashboard
            </h2>
          </div>

          {/* Period Selector */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 overflow-x-auto">
            {periods.map(period => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
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

        {/* Metric Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map(metric => (
            <button
              key={metric.value}
              onClick={() => setSelectedMetric(metric.value)}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${
                selectedMetric === metric.value
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <metric.icon className={`w-5 h-5 ${
                  selectedMetric === metric.value ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'
                }`} />
                <span className={`text-xs sm:text-sm font-medium ${
                  selectedMetric === metric.value ? 'text-purple-900 dark:text-purple-100' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {metric.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Metric Content */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
          {renderMetricContent()}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-blue-800 dark:text-blue-300">Total Articles</span>
            </div>
            <span className="text-2xl font-bold text-blue-900 dark:text-blue-100">1,247</span>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm text-green-800 dark:text-green-300">Sources</span>
            </div>
            <span className="text-2xl font-bold text-green-900 dark:text-green-100">47</span>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm text-purple-800 dark:text-purple-300">Avg. Read Time</span>
            </div>
            <span className="text-2xl font-bold text-purple-900 dark:text-purple-100">4.2m</span>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span className="text-sm text-orange-800 dark:text-orange-300">Engagement</span>
            </div>
            <span className="text-2xl font-bold text-orange-900 dark:text-orange-100">+12%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;