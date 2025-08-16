import React from 'react';
import { Newspaper, TrendingUp } from 'lucide-react';
import NewsCard from './NewsCard';
import { NewsArticle } from '../types';

interface NewsFeedProps {
  articles: NewsArticle[];
  onFactCheck: (article: NewsArticle) => void;
  bookmarkedArticles: string[];
  onBookmark: (articleId: string) => void;
  hasProAccess: boolean;
  loading?: boolean;
}

const NewsFeed: React.FC<NewsFeedProps> = ({
  articles,
  onFactCheck,
  bookmarkedArticles,
  onBookmark,
  hasProAccess,
  loading = false
}) => {
  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm animate-pulse">
            <div className="aspect-video bg-gray-300 dark:bg-gray-600 rounded-t-lg" />
            <div className="p-6 space-y-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
              <div className="h-20 bg-gray-300 dark:bg-gray-600 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <Newspaper className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No articles found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your filters or search terms to find more articles.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Feed Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Latest News
          </h2>
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded">
            {articles.length} articles
          </span>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="space-y-6">
        {articles.map(article => (
          <NewsCard
            key={article.id}
            article={article}
            onFactCheck={onFactCheck}
            isBookmarked={bookmarkedArticles.includes(article.id)}
            onBookmark={onBookmark}
            hasProAccess={hasProAccess}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;