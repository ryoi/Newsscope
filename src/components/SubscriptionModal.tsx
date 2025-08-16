import React from 'react';
import { X, Check, Crown, Star, Zap } from 'lucide-react';
import { SubscriptionTier } from '../types';

interface SubscriptionModalProps {
  tiers: SubscriptionTier[];
  currentTier: string;
  onClose: () => void;
  onUpgrade: (tierId: string) => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  tiers,
  currentTier,
  onClose,
  onUpgrade
}) => {
  const getTierIcon = (tierId: string) => {
    switch (tierId) {
      case 'pro': return <Crown className="w-6 h-6 text-orange-500" />;
      case 'enterprise': return <Star className="w-6 h-6 text-purple-500" />;
      default: return <Zap className="w-6 h-6 text-gray-500" />;
    }
  };

  const getTierStyle = (tierId: string) => {
    switch (tierId) {
      case 'pro': return 'border-orange-200 bg-orange-50 dark:border-orange-700 dark:bg-orange-900/10';
      case 'enterprise': return 'border-purple-200 bg-purple-50 dark:border-purple-700 dark:bg-purple-900/10';
      default: return 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800';
    }
  };

  const getButtonStyle = (tierId: string) => {
    if (currentTier === tierId) {
      return 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed';
    }
    switch (tierId) {
      case 'pro': return 'bg-orange-600 hover:bg-orange-700 text-white';
      case 'enterprise': return 'bg-purple-600 hover:bg-purple-700 text-white';
      default: return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Choose Your Plan
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map(tier => (
              <div
                key={tier.id}
                className={`rounded-lg border-2 p-6 relative transition-all hover:shadow-lg ${getTierStyle(tier.id)} ${
                  currentTier === tier.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {tier.id === 'pro' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="flex justify-center mb-3">
                    {getTierIcon(tier.id)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {tier.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${tier.price}
                    </span>
                    {tier.price > 0 && (
                      <span className="text-gray-500 dark:text-gray-400">/month</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onUpgrade(tier.id)}
                  disabled={currentTier === tier.id}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${getButtonStyle(tier.id)}`}
                >
                  {currentTier === tier.id ? 'Current Plan' : 
                   tier.price === 0 ? 'Downgrade' : 'Upgrade'}
                </button>
              </div>
            ))}
          </div>

          {/* Feature Comparison */}
          <div className="mt-8 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Feature Comparison
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 text-gray-700 dark:text-gray-300">Feature</th>
                    <th className="text-center py-2 text-gray-700 dark:text-gray-300">Basic</th>
                    <th className="text-center py-2 text-gray-700 dark:text-gray-300">Pro</th>
                    <th className="text-center py-2 text-gray-700 dark:text-gray-300">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  <tr>
                    <td className="py-2 text-gray-600 dark:text-gray-400">AI Fact Checking</td>
                    <td className="text-center py-2">-</td>
                    <td className="text-center py-2">
                      <Check className="w-4 h-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <Check className="w-4 h-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600 dark:text-gray-400">Political Bias Analysis</td>
                    <td className="text-center py-2">-</td>
                    <td className="text-center py-2">
                      <Check className="w-4 h-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <Check className="w-4 h-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600 dark:text-gray-400">Timeline Tracking</td>
                    <td className="text-center py-2">-</td>
                    <td className="text-center py-2">-</td>
                    <td className="text-center py-2">
                      <Check className="w-4 h-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;