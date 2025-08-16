export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  source: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  category: string;
  tags: string[];
  politicalBias: PoliticalBias;
  credibilityScore: number;
  factCheckStatus: FactCheckStatus;
  readTime: number;
  url: string;
}

export interface PoliticalBias {
  orientation: 'left' | 'center-left' | 'center' | 'center-right' | 'right';
  confidence: number;
  reasoning: string;
}

export interface FactCheckStatus {
  status: 'verified' | 'partially-verified' | 'disputed' | 'false' | 'pending';
  confidence: number;
  summary: string;
  sources: string[];
}

export interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  features: string[];
  maxArticlesPerDay: number;
  hasFactChecking: boolean;
  hasBiasAnalysis: boolean;
  hasTimeline: boolean;
  hasAdvancedFilters: boolean;
}

export interface User {
  id: string;
  email: string;
  subscriptionTier: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  categories: string[];
  sources: string[];
  biasFilter: string[];
  autoFactCheck: boolean;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  summary: string;
  articles: NewsArticle[];
  significance: 'low' | 'medium' | 'high';
}