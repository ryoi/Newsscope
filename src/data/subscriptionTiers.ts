import { SubscriptionTier } from '../types';

export const subscriptionTiers: SubscriptionTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    features: [
      'Access to 50 articles per day',
      'Basic news aggregation',
      'Simple search functionality',
      'Mobile app access'
    ],
    maxArticlesPerDay: 50,
    hasFactChecking: false,
    hasBiasAnalysis: false,
    hasTimeline: false,
    hasAdvancedFilters: false
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 12.99,
    features: [
      'Unlimited article access',
      'AI-powered fact checking',
      'Political bias analysis',
      'Advanced filtering options',
      'Bookmark and save articles',
      'Priority customer support'
    ],
    maxArticlesPerDay: -1,
    hasFactChecking: true,
    hasBiasAnalysis: true,
    hasTimeline: false,
    hasAdvancedFilters: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 29.99,
    features: [
      'Everything in Pro',
      'Timeline tracking for topics',
      'Historical context analysis',
      'Custom news alerts',
      'API access for integration',
      'Team collaboration features',
      'White-label options'
    ],
    maxArticlesPerDay: -1,
    hasFactChecking: true,
    hasBiasAnalysis: true,
    hasTimeline: true,
    hasAdvancedFilters: true
  }
];