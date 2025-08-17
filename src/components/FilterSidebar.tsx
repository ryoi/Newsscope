import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterSidebarProps {
  categories: string[];
  sources: string[];
  selectedCategories: string[];
  selectedSources: string[];
  selectedBias: string[];
  selectedFactCheck: string[];
  onCategoryChange: (categories: string[]) => void;
  onSourceChange: (sources: string[]) => void;
  onBiasChange: (bias: string[]) => void;
  onFactCheckChange: (factCheck: string[]) => void;
  hasProAccess: boolean;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  sources,
  selectedCategories,
  selectedSources,
  selectedBias,
  selectedFactCheck,
  onCategoryChange,
  onSourceChange,
  onBiasChange,
  onFactCheckChange,
  hasProAccess
}) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    sources: true,
    bias: hasProAccess,
    factCheck: hasProAccess,
    credibility: hasProAccess
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCheckboxChange = (
    value: string,
    selected: string[],
    onChange: (values: string[]) => void
  ) => {
    if (selected.includes(value)) {
      onChange(selected.filter(item => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const biasOptions = [
    { value: 'left', label: 'Left', color: 'text-red-600' },
    { value: 'center-left', label: 'Center Left', color: 'text-pink-600' },
    { value: 'center', label: 'Center', color: 'text-purple-600' },
    { value: 'center-right', label: 'Center Right', color: 'text-indigo-600' },
    { value: 'right', label: 'Right', color: 'text-blue-600' }
  ];

  const factCheckOptions = [
    { value: 'verified', label: 'Verified', color: 'text-green-600' },
    { value: 'partially-verified', label: 'Partially Verified', color: 'text-yellow-600' },
    { value: 'disputed', label: 'Disputed', color: 'text-orange-600' },
    { value: 'false', label: 'False', color: 'text-red-600' },
    { value: 'pending', label: 'Pending', color: 'text-gray-600' }
  ];

  const FilterSection: React.FC<{
    title: string;
    sectionKey: keyof typeof expandedSections;
    isProFeature?: boolean;
    children: React.ReactNode;
  }> = ({ title, sectionKey, isProFeature = false, children }) => (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between text-left"
        disabled={isProFeature && !hasProAccess}
      >
        <div className="flex items-center space-x-2">
          <h3 className="font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          {isProFeature && !hasProAccess && (
            <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs rounded font-medium">
              Pro
            </span>
          )}
        </div>
        {expandedSections[sectionKey] ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {expandedSections[sectionKey] && (
        <div className={`mt-3 space-y-2 ${isProFeature && !hasProAccess ? 'opacity-50' : ''}`}>
          {children}
        </div>
      )}
    </div>
  );

  return (
    <aside className="w-full lg:w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 lg:p-6 overflow-y-auto">
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filters
        </h2>
      </div>

      <div className="space-y-6">
        {/* Categories */}
        <FilterSection title="Categories" sectionKey="categories">
          {categories.map(category => (
            <label key={category} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCheckboxChange(category, selectedCategories, onCategoryChange)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
            </label>
          ))}
        </FilterSection>

        {/* Sources */}
        <FilterSection title="News Sources" sectionKey="sources">
          {sources.map(source => (
            <label key={source} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedSources.includes(source)}
                onChange={() => handleCheckboxChange(source, selectedSources, onSourceChange)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{source}</span>
            </label>
          ))}
        </FilterSection>

        {/* Political Bias - Pro Feature */}
        <FilterSection title="Political Bias" sectionKey="bias" isProFeature={true}>
          {biasOptions.map(bias => (
            <label key={bias.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBias.includes(bias.value)}
                onChange={() => handleCheckboxChange(bias.value, selectedBias, onBiasChange)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                disabled={!hasProAccess}
              />
              <span className={`text-sm ${bias.color} dark:opacity-80`}>
                {bias.label}
              </span>
            </label>
          ))}
        </FilterSection>

        {/* Fact Check Status - Pro Feature */}
        <FilterSection title="Fact Check Status" sectionKey="factCheck" isProFeature={true}>
          {factCheckOptions.map(status => (
            <label key={status.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFactCheck.includes(status.value)}
                onChange={() => handleCheckboxChange(status.value, selectedFactCheck, onFactCheckChange)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                disabled={!hasProAccess}
              />
              <span className={`text-sm ${status.color} dark:opacity-80`}>
                {status.label}
              </span>
            </label>
          ))}
        </FilterSection>

        {/* Credibility Range - Pro Feature */}
        <FilterSection title="Credibility Score" sectionKey="credibility" isProFeature={true}>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="70"
              disabled={!hasProAccess}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </FilterSection>
      </div>
    </aside>
  );
};

export default FilterSidebar;