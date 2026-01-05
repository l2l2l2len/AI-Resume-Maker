import React, { useState } from 'react';
import { Template } from '../App';

interface TemplateCarouselProps {
  selectedTemplate: Template;
  onSelectTemplate: (template: Template) => void;
  onNext: () => void;
}

interface TemplateInfo {
  id: Template;
  name: string;
  description: string;
  color: string;
  features: string[];
  category: string[];
  users: number;
}

const templates: TemplateInfo[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional, clean design',
    color: '#2563eb',
    features: ['Professional', 'Single Column'],
    category: ['all', 'corporate', 'traditional'],
    users: 12400,
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Two-column bold layout',
    color: '#059669',
    features: ['Creative', 'Two Column'],
    category: ['all', 'creative', 'tech'],
    users: 8900,
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Space-efficient design',
    color: '#db2777',
    features: ['Dense', 'Detailed'],
    category: ['all', 'experienced', 'tech'],
    users: 6200,
  },
  {
    id: 'ats',
    name: 'ATS Simple',
    description: 'ATS-optimized minimal',
    color: '#374151',
    features: ['ATS-Friendly', 'Minimal'],
    category: ['all', 'ats', 'corporate'],
    users: 15800,
  },
  {
    id: 'ats-pro',
    name: 'ATS Pro',
    description: 'Professional ATS-friendly',
    color: '#2563eb',
    features: ['ATS-Optimized', 'Stylish'],
    category: ['all', 'ats', 'professional'],
    users: 9300,
  },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'ats', label: 'ATS Only' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'creative', label: 'Creative' },
  { id: 'tech', label: 'Tech' },
];

// Compact template preview components
const ClassicPreview: React.FC = () => (
  <div className="w-full h-full bg-white p-2 space-y-1.5">
    <div className="h-3 bg-gray-300 rounded mx-auto w-2/3" />
    <div className="h-1.5 bg-gray-200 rounded mx-auto w-1/2" />
    <div className="mt-2 space-y-1">
      <div className="h-1.5 bg-gray-100 rounded" />
      <div className="h-1.5 bg-gray-100 rounded w-5/6" />
      <div className="h-1.5 bg-gray-100 rounded w-4/6" />
    </div>
    <div className="mt-1.5 space-y-1">
      <div className="h-1.5 bg-gray-100 rounded" />
      <div className="h-1.5 bg-gray-100 rounded w-3/4" />
    </div>
  </div>
);

const ModernPreview: React.FC = () => (
  <div className="w-full h-full flex overflow-hidden">
    <div className="w-1/3 bg-gray-700 p-1.5 space-y-1">
      <div className="h-2 bg-gray-500 rounded w-3/4" />
      <div className="h-1 bg-gray-600 rounded w-full" />
      <div className="h-1 bg-gray-600 rounded w-2/3" />
    </div>
    <div className="w-2/3 bg-white p-1.5 space-y-1">
      <div className="h-1.5 bg-gray-200 rounded" />
      <div className="h-1.5 bg-gray-200 rounded w-5/6" />
      <div className="h-1 bg-gray-100 rounded w-4/6" />
    </div>
  </div>
);

const CompactPreview: React.FC = () => (
  <div className="w-full h-full bg-white p-2 space-y-1">
    <div className="h-2 bg-gray-300 rounded w-1/2" />
    <div className="h-1 bg-gray-100 rounded w-3/4" />
    <div className="h-1 bg-gray-100 rounded w-full" />
    <div className="h-1 bg-gray-100 rounded w-5/6" />
    <div className="h-1 bg-gray-100 rounded w-4/6" />
    <div className="h-1 bg-gray-100 rounded w-full" />
  </div>
);

const ATSPreview: React.FC = () => (
  <div className="w-full h-full bg-white p-2 space-y-1.5">
    <div className="text-center pb-1 border-b border-gray-300">
      <div className="h-2.5 bg-gray-800 rounded w-1/2 mx-auto mb-1" />
      <div className="h-1 bg-gray-300 rounded w-3/4 mx-auto" />
    </div>
    <div className="pt-1">
      <div className="h-1.5 bg-gray-800 rounded w-1/3 mb-1" />
      <div className="space-y-0.5">
        <div className="h-1 bg-gray-200 rounded w-full" />
        <div className="h-1 bg-gray-200 rounded w-5/6" />
      </div>
    </div>
  </div>
);

const ATSProPreview: React.FC = () => (
  <div className="w-full h-full bg-white p-2">
    <div className="pb-1 mb-1 border-b-2 border-blue-600">
      <div className="h-2.5 bg-gray-700 rounded w-2/3 mb-1" />
      <div className="flex gap-1">
        <div className="h-1 bg-gray-300 rounded w-1/4" />
        <div className="h-1 bg-gray-300 rounded w-1/4" />
      </div>
    </div>
    <div className="flex gap-1 mb-1.5 flex-wrap">
      <div className="h-1.5 bg-blue-100 rounded-full w-6" />
      <div className="h-1.5 bg-blue-100 rounded-full w-5" />
    </div>
    <div className="space-y-0.5">
      <div className="h-1 bg-gray-200 rounded w-full" />
      <div className="h-1 bg-gray-200 rounded w-5/6" />
    </div>
  </div>
);

const getPreviewComponent = (id: Template) => {
  switch (id) {
    case 'classic': return <ClassicPreview />;
    case 'modern': return <ModernPreview />;
    case 'compact': return <CompactPreview />;
    case 'ats': return <ATSPreview />;
    case 'ats-pro': return <ATSProPreview />;
    default: return <ClassicPreview />;
  }
};

// Icons
const CheckIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const formatUsers = (count: number) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

export const TemplateCarousel: React.FC<TemplateCarouselProps> = ({
  selectedTemplate,
  onSelectTemplate,
  onNext,
}) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTemplates = templates.filter(
    (t) => activeCategory === 'all' || t.category.includes(activeCategory)
  );

  return (
    <div className="pb-24 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="px-4 py-3">
          <h1 className="text-lg font-semibold text-gray-900 text-center">
            Choose Template
          </h1>
          <p className="text-xs text-gray-500 text-center mt-0.5">
            Select a design that fits your style
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-full transition-all
                ${activeCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="px-3 py-4">
        <div className="grid grid-cols-2 gap-3">
          {filteredTemplates.map((template) => {
            const isSelected = selectedTemplate === template.id;

            return (
              <button
                key={template.id}
                onClick={() => onSelectTemplate(template.id)}
                className={`
                  relative bg-white rounded-xl overflow-hidden transition-all text-left
                  touch-action-manipulation active:scale-[0.98]
                  ${isSelected
                    ? 'ring-2 ring-blue-600 shadow-lg'
                    : 'border border-gray-200 hover:shadow-md'
                  }
                `}
              >
                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 z-10 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <CheckIcon />
                  </div>
                )}

                {/* Color accent */}
                <div
                  className="h-1 w-full"
                  style={{ backgroundColor: template.color }}
                />

                {/* Preview */}
                <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                  {getPreviewComponent(template.id)}
                </div>

                {/* Info */}
                <div className="p-2.5">
                  <h3 className="text-sm font-semibold text-gray-900 mb-0.5">
                    {template.name}
                  </h3>
                  <p className="text-[10px] text-gray-500 mb-1.5 line-clamp-1">
                    {template.description}
                  </p>

                  {/* Users count */}
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <UsersIcon />
                    <span>Chosen by {formatUsers(template.users)} users</span>
                  </div>

                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {template.features.slice(0, 2).map((feature) => (
                      <span
                        key={feature}
                        className="px-1.5 py-0.5 text-[9px] font-medium bg-gray-100 text-gray-500 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No templates in this category</p>
            <button
              onClick={() => setActiveCategory('all')}
              className="mt-2 text-blue-600 text-sm font-medium"
            >
              View all templates
            </button>
          </div>
        )}
      </div>

      {/* Features hint */}
      <div className="px-4 py-3">
        <div className="flex justify-center gap-4 text-[10px] text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            ATS-Friendly
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            PDF Export
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Free
          </span>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-bottom">
        <div className="px-4 py-3">
          <button
            onClick={onNext}
            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors"
          >
            Confirm & Proceed
            <ArrowRightIcon />
          </button>
          <p className="text-[10px] text-gray-400 text-center mt-2">
            Selected: {templates.find((t) => t.id === selectedTemplate)?.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemplateCarousel;
