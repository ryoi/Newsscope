import { useState, useEffect, useMemo } from 'react';
import { NewsArticle } from '../types';
import { mockArticles } from '../data/mockNews';

export const useNewsData = (
  searchQuery: string,
  selectedCategories: string[],
  selectedSources: string[],
  selectedBias: string[],
  selectedFactCheck: string[]
) => {
  const [loading, setLoading] = useState(false);

  const filteredArticles = useMemo(() => {
    let filtered = mockArticles;

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(article =>
        selectedCategories.includes(article.category)
      );
    }

    // Source filter
    if (selectedSources.length > 0) {
      filtered = filtered.filter(article =>
        selectedSources.includes(article.source)
      );
    }

    // Political bias filter
    if (selectedBias.length > 0) {
      filtered = filtered.filter(article =>
        selectedBias.includes(article.politicalBias.orientation)
      );
    }

    // Fact check filter
    if (selectedFactCheck.length > 0) {
      filtered = filtered.filter(article =>
        selectedFactCheck.includes(article.factCheckStatus.status)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategories, selectedSources, selectedBias, selectedFactCheck]);

  // Simulate loading when filters change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategories, selectedSources, selectedBias, selectedFactCheck]);

  const categories = useMemo(() => 
    Array.from(new Set(mockArticles.map(article => article.category))).sort()
  , []);

  const sources = useMemo(() => 
    Array.from(new Set(mockArticles.map(article => article.source))).sort()
  , []);

  return {
    articles: filteredArticles,
    categories,
    sources,
    loading
  };
};