import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import FilterSidebar from './components/FilterSidebar';
import NewsFeed from './components/NewsFeed';
import TimelineView from './components/TimelineView';
import AnalyticsView from './components/AnalyticsView';
import FactCheckModal from './components/FactCheckModal';
import SubscriptionModal from './components/SubscriptionModal';
import { useNewsData } from './hooks/useNewsData';
import { useSubscription } from './hooks/useSubscription';
import { useTheme } from './hooks/useTheme';
import { mockTimeline } from './data/mockNews';
import { NewsArticle } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'feed' | 'timeline' | 'bookmarks' | 'analytics'>('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedBias, setSelectedBias] = useState<string[]>([]);
  const [selectedFactCheck, setSelectedFactCheck] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);
  const [showFilterSidebar, setShowFilterSidebar] = useState(true);

  const { theme, toggleTheme } = useTheme();
  const {
    currentTier,
    hasProAccess,
    hasEnterpriseAccess,
    showSubscriptionModal,
    setShowSubscriptionModal,
    handleUpgrade,
    subscriptionTiers
  } = useSubscription();

  // Listen for subscription modal events
  React.useEffect(() => {
    const handleOpenSubscriptionModal = () => {
      setShowSubscriptionModal(true);
    };

    window.addEventListener('openSubscriptionModal', handleOpenSubscriptionModal);
    return () => {
      window.removeEventListener('openSubscriptionModal', handleOpenSubscriptionModal);
    };
  }, [setShowSubscriptionModal]);

  const { articles, categories, sources, loading } = useNewsData(
    searchQuery,
    selectedCategories,
    selectedSources,
    selectedBias,
    selectedFactCheck
  );

  const handleFactCheck = (article: NewsArticle) => {
    setSelectedArticle(article);
  };

  const handleBookmark = (articleId: string) => {
    setBookmarkedArticles(prev =>
      prev.includes(articleId)
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const handleArticleSelect = (article: NewsArticle) => {
    setSelectedArticle(article);
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'timeline':
        return (
          <TimelineView
            events={mockTimeline}
            onArticleSelect={handleArticleSelect}
            hasEnterpriseAccess={hasEnterpriseAccess}
          />
        );
      case 'bookmarks':
        const bookmarkedNews = articles.filter(article => bookmarkedArticles.includes(article.id));
        return (
          <NewsFeed
            articles={bookmarkedNews}
            onFactCheck={handleFactCheck}
            bookmarkedArticles={bookmarkedArticles}
            onBookmark={handleBookmark}
            hasProAccess={hasProAccess}
            loading={loading}
          />
        );
      case 'analytics':
        return (
          <AnalyticsView hasEnterpriseAccess={hasEnterpriseAccess} />
        );
      default:
        return (
          <NewsFeed
            articles={articles}
            onFactCheck={handleFactCheck}
            bookmarkedArticles={bookmarkedArticles}
            onBookmark={handleBookmark}
            hasProAccess={hasProAccess}
            loading={loading}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header
        onSearchChange={setSearchQuery}
        onSubscriptionClick={() => setShowSubscriptionModal(true)}
        currentTier={currentTier}
        theme={theme}
        onThemeToggle={toggleTheme}
      />

      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        hasEnterpriseAccess={hasEnterpriseAccess}
      />

      <div className="max-w-7xl mx-auto flex">
        {/* Filter Sidebar */}
        {showFilterSidebar && currentView === 'feed' && (
          <div className="hidden lg:block">
            <FilterSidebar
              categories={categories}
              sources={sources}
              selectedCategories={selectedCategories}
              selectedSources={selectedSources}
              selectedBias={selectedBias}
              selectedFactCheck={selectedFactCheck}
              onCategoryChange={setSelectedCategories}
              onSourceChange={setSelectedSources}
              onBiasChange={setSelectedBias}
              onFactCheckChange={setSelectedFactCheck}
              hasProAccess={hasProAccess}
            />
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6">
          {renderMainContent()}
        </main>
      </div>

      {/* Modals */}
      {selectedArticle && (
        <FactCheckModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          hasProAccess={hasProAccess}
        />
      )}

      {showSubscriptionModal && (
        <SubscriptionModal
          tiers={subscriptionTiers}
          currentTier={currentTier}
          onClose={() => setShowSubscriptionModal(false)}
          onUpgrade={handleUpgrade}
        />
      )}
    </div>
  );
}

export default App;