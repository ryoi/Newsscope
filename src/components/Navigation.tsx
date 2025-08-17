import React from 'react';
import { Newspaper, Baseline as Timeline, Bookmark, Settings, BarChart3 } from 'lucide-react';

interface NavigationProps {
  currentView: 'feed' | 'timeline' | 'bookmarks' | 'analytics';
  onViewChange: (view: 'feed' | 'timeline' | 'bookmarks' | 'analytics') => void;
  hasEnterpriseAccess: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange, hasEnterpriseAccess }) => {
  const navItems = [
    { id: 'feed', label: 'News Feed', icon: Newspaper, available: true },
    { id: 'timeline', label: 'Timeline', icon: Timeline, available: hasEnterpriseAccess },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark, available: true },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, available: hasEnterpriseAccess }
  ] as const;

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto scrollbar-hide">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => item.available && onViewChange(item.id)}
              disabled={!item.available}
              className={`flex items-center space-x-1 sm:space-x-2 py-3 sm:py-4 px-3 sm:px-4 lg:px-6 border-b-2 transition-colors whitespace-nowrap flex-shrink-0 min-w-0 ${
                currentView === item.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : item.available
                  ? 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300'
                  : 'border-transparent text-gray-400 cursor-not-allowed'
              }`}
            >
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium text-xs sm:text-sm lg:text-base truncate">{item.label}</span>
              {!item.available && (
                <span className="hidden xl:inline px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded flex-shrink-0">
                  Enterprise
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;