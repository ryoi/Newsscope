import React, { useState } from 'react';
import { Search, Settings, User, Crown, Menu, X } from 'lucide-react';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  onSubscriptionClick: () => void;
  currentTier: string;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onSearchChange,
  onSubscriptionClick,
  currentTier,
  theme,
  onThemeToggle
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange(value);
  };

  const getTierColor = () => {
    switch (currentTier) {
      case 'pro': return 'text-orange-500';
      case 'enterprise': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">NS</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              NewsScope Pro
            </h1>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search news, topics, or sources..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Subscription Status */}
            <button
              onClick={onSubscriptionClick}
              className={`hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg border transition-colors ${
                currentTier === 'basic' 
                  ? 'border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800' 
                  : 'border-orange-300 bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:border-orange-500'
              }`}
            >
              {currentTier !== 'basic' && <Crown className="w-4 h-4 text-orange-500" />}
              <span className={`text-sm font-medium capitalize ${getTierColor()}`}>
                {currentTier}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* Settings */}
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            {/* User Profile */}
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 py-4 px-4">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Mobile Subscription */}
              <button
                onClick={onSubscriptionClick}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  currentTier === 'basic' 
                    ? 'border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800' 
                    : 'border-orange-300 bg-orange-50 hover:bg-orange-100 dark:bg-orange-900/20 dark:border-orange-500'
                }`}
              >
                {currentTier !== 'basic' && <Crown className="w-4 h-4 text-orange-500" />}
                <span className={`text-sm font-medium capitalize ${getTierColor()}`}>
                  {currentTier} Plan
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;