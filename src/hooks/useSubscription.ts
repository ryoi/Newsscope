import { useState } from 'react';
import { subscriptionTiers } from '../data/subscriptionTiers';

export const useSubscription = () => {
  const [currentTier, setCurrentTier] = useState('enterprise');
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const currentTierData = subscriptionTiers.find(tier => tier.id === currentTier);

  const hasProAccess = currentTier === 'pro' || currentTier === 'enterprise';
  const hasEnterpriseAccess = currentTier === 'enterprise';

  const handleUpgrade = (tierId: string) => {
    setCurrentTier(tierId);
    setShowSubscriptionModal(false);
    // In a real app, this would handle payment processing
  };

  return {
    currentTier,
    currentTierData,
    hasProAccess,
    hasEnterpriseAccess,
    showSubscriptionModal,
    setShowSubscriptionModal,
    handleUpgrade,
    subscriptionTiers
  };
};