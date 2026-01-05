import React, { useRef, useState, useEffect } from 'react';
import { Template } from '../App';
import { Button } from './ui/Button';
import { CheckCircle2 } from 'lucide-react';

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
}

const templates: TemplateInfo[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional, clean design perfect for corporate roles',
    color: '#2563eb',
    features: ['Professional', 'Single Column', 'Traditional'],
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Two-column layout with a bold sidebar',
    color: '#059669',
    features: ['Creative', 'Two Column', 'Bold'],
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Space-efficient design for experienced professionals',
    color: '#db2777',
    features: ['Dense', 'Efficient', 'Detailed'],
  },
  {
    id: 'ats',
    name: 'ATS Simple',
    description: 'Clean, minimal format optimized for ATS',
    color: '#374151',
    features: ['ATS-Friendly', 'Minimal', 'Clean'],
  },
  {
    id: 'ats-pro',
    name: 'ATS Pro',
    description: 'Professional ATS-friendly with subtle styling',
    color: '#2563eb',
    features: ['ATS-Optimized', 'Professional', 'Stylish'],
  },
];

// Template preview components
const ClassicPreview: React.FC = () => (
  <div className="w-full h-full bg-white rounded-lg p-4 space-y-3">
    <div className="h-5 bg-gray-200 rounded mx-auto w-3/4" />
    <div className="h-3 bg-gray-100 rounded mx-auto w-1/2" />
    <div className="mt-4 space-y-2">
      <div className="h-2.5 bg-gray-100 rounded" />
      <div className="h-2.5 bg-gray-100 rounded w-5/6" />
      <div className="h-2.5 bg-gray-100 rounded w-4/6" />
    </div>
    <div className="mt-3 space-y-2">
      <div className="h-2.5 bg-gray-100 rounded" />
      <div className="h-2.5 bg-gray-100 rounded w-3/4" />
    </div>
  </div>
);

const ModernPreview: React.FC = () => (
  <div className="w-full h-full flex rounded-lg overflow-hidden">
    <div className="w-1/3 bg-gray-700 p-3 space-y-2">
      <div className="h-4 bg-gray-500 rounded w-3/4" />
      <div className="h-2.5 bg-gray-600 rounded w-full" />
      <div className="h-2.5 bg-gray-600 rounded w-2/3" />
      <div className="mt-3 h-2.5 bg-gray-600 rounded" />
      <div className="h-2.5 bg-gray-600 rounded w-1/2" />
    </div>
    <div className="w-2/3 bg-white p-3 space-y-2">
      <div className="h-2.5 bg-gray-200 rounded" />
      <div className="h-2.5 bg-gray-200 rounded w-5/6" />
      <div className="h-2.5 bg-gray-100 rounded w-4/6" />
      <div className="mt-2 h-2.5 bg-gray-100 rounded" />
      <div className="h-2.5 bg-gray-100 rounded w-3/4" />
    </div>
  </div>
);

const CompactPreview: React.FC = () => (
  <div className="w-full h-full bg-white rounded-lg p-3 space-y-1.5">
    <div className="h-3.5 bg-gray-200 rounded w-1/2" />
    <div className="h-2 bg-gray-100 rounded w-3/4" />
    <div className="h-2 bg-gray-100 rounded w-full" />
    <div className="h-2 bg-gray-100 rounded w-5/6" />
    <div className="h-2 bg-gray-100 rounded w-4/6" />
    <div className="h-2 bg-gray-100 rounded w-full" />
    <div className="h-2 bg-gray-100 rounded w-3/4" />
  </div>
);

const ATSPreview: React.FC = () => (
  <div className="w-full h-full bg-white rounded-lg p-3 space-y-2">
    <div className="text-center pb-2 border-b border-gray-300">
      <div className="h-4 bg-gray-800 rounded w-1/2 mx-auto mb-1.5" />
      <div className="h-2 bg-gray-300 rounded w-3/4 mx-auto" />
    </div>
    <div className="pt-1">
      <div className="h-2.5 bg-gray-800 rounded w-1/3 mb-1.5" />
      <div className="space-y-1">
        <div className="h-2 bg-gray-200 rounded w-full" />
        <div className="h-2 bg-gray-200 rounded w-5/6" />
        <div className="h-2 bg-gray-200 rounded w-4/6" />
      </div>
    </div>
  </div>
);

const ATSProPreview: React.FC = () => (
  <div className="w-full h-full bg-white rounded-lg p-3">
    <div className="pb-2 mb-2 border-b-2 border-blue-600">
      <div className="h-4 bg-gray-700 rounded w-2/3 mb-1.5" />
      <div className="flex gap-1.5">
        <div className="h-2 bg-gray-300 rounded w-1/4" />
        <div className="h-2 bg-gray-300 rounded w-1/4" />
      </div>
    </div>
    <div className="flex gap-1.5 mb-2 flex-wrap">
      <div className="h-2.5 bg-blue-100 rounded-full px-2 w-10" />
      <div className="h-2.5 bg-blue-100 rounded-full px-2 w-8" />
      <div className="h-2.5 bg-blue-100 rounded-full px-2 w-12" />
    </div>
    <div className="h-2 bg-blue-600 rounded w-1/3 mb-1.5" />
    <div className="space-y-1">
      <div className="h-2 bg-gray-200 rounded w-full" />
      <div className="h-2 bg-gray-200 rounded w-5/6" />
    </div>
  </div>
);

const getPreviewComponent = (id: Template) => {
  switch (id) {
    case 'classic':
      return <ClassicPreview />;
    case 'modern':
      return <ModernPreview />;
    case 'compact':
      return <CompactPreview />;
    case 'ats':
      return <ATSPreview />;
    case 'ats-pro':
      return <ATSProPreview />;
    default:
      return <ClassicPreview />;
  }
};

const ChevronLeftIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export const TemplateCarousel: React.FC<TemplateCarouselProps> = ({
  selectedTemplate,
  onSelectTemplate,
  onNext,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(
    templates.findIndex((t) => t.id === selectedTemplate)
  );
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Update scroll indicators
  const updateScrollIndicators = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 10);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollIndicators);
      updateScrollIndicators();
      return () => container.removeEventListener('scroll', updateScrollIndicators);
    }
  }, []);

  // Scroll to selected template on mount
  useEffect(() => {
    const container = scrollContainerRef.current;
    const selectedIndex = templates.findIndex((t) => t.id === selectedTemplate);
    if (container && selectedIndex >= 0) {
      const cardWidth = container.offsetWidth * 0.8;
      const scrollPosition = selectedIndex * cardWidth - (container.offsetWidth - cardWidth) / 2;
      container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      setActiveIndex(selectedIndex);
    }
  }, []);

  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = container.offsetWidth * 0.8;
      const scrollPosition = index * cardWidth - (container.offsetWidth - cardWidth) / 2;
      container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      setActiveIndex(index);
    }
  };

  const scrollLeft = () => {
    if (activeIndex > 0) {
      scrollToIndex(activeIndex - 1);
    }
  };

  const scrollRight = () => {
    if (activeIndex < templates.length - 1) {
      scrollToIndex(activeIndex + 1);
    }
  };

  // Handle scroll end to snap to nearest card
  const handleScrollEnd = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = container.offsetWidth * 0.8;
      const scrollPosition = container.scrollLeft;
      const newIndex = Math.round(scrollPosition / cardWidth);
      setActiveIndex(Math.min(Math.max(newIndex, 0), templates.length - 1));
    }
  };

  return (
    <div className="relative pb-28">
      {/* Header */}
      <div className="text-center mb-6 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Choose Your Template
        </h2>
        <p className="text-base text-gray-600">
          Swipe to browse templates
        </p>
      </div>

      {/* Desktop navigation arrows */}
      <button
        onClick={scrollLeft}
        disabled={!canScrollLeft}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center bg-white rounded-full shadow-lg border border-gray-200 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all touch-action-manipulation"
        aria-label="Previous template"
      >
        <ChevronLeftIcon />
      </button>

      <button
        onClick={scrollRight}
        disabled={!canScrollRight}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center bg-white rounded-full shadow-lg border border-gray-200 text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all touch-action-manipulation"
        aria-label="Next template"
      >
        <ChevronRightIcon />
      </button>

      {/* Carousel Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 md:px-12 pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onTouchEnd={handleScrollEnd}
        onMouseUp={handleScrollEnd}
      >
        {templates.map((template, index) => {
          const isSelected = selectedTemplate === template.id;
          const isActive = index === activeIndex;

          return (
            <div
              key={template.id}
              className={`
                flex-shrink-0 w-[80vw] max-w-[320px] snap-center
                transition-all duration-300
                ${isActive ? 'scale-100' : 'scale-95 opacity-80'}
              `}
            >
              <button
                onClick={() => {
                  onSelectTemplate(template.id);
                  scrollToIndex(index);
                }}
                className={`
                  w-full bg-white rounded-2xl overflow-hidden transition-all duration-200
                  touch-action-manipulation text-left
                  ${isSelected
                    ? 'ring-2 ring-blue-600 shadow-xl'
                    : 'border border-gray-200 hover:shadow-lg active:scale-[0.98]'
                  }
                `}
              >
                {/* Top accent bar */}
                <div
                  className="h-2 w-full"
                  style={{ backgroundColor: template.color }}
                />

                {/* Preview area */}
                <div className="p-4 bg-gray-100">
                  <div className="aspect-[210/180] rounded-xl overflow-hidden bg-gray-50 shadow-inner">
                    {getPreviewComponent(template.id)}
                  </div>
                </div>

                {/* Info section */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {template.name}
                    </h3>
                    {isSelected && (
                      <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    {template.description}
                  </p>
                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-4">
        {templates.map((template, index) => (
          <button
            key={template.id}
            onClick={() => scrollToIndex(index)}
            className={`
              w-2.5 h-2.5 rounded-full transition-all touch-action-manipulation
              ${index === activeIndex
                ? 'bg-blue-600 w-6'
                : selectedTemplate === template.id
                  ? 'bg-blue-300'
                  : 'bg-gray-300'
              }
            `}
            aria-label={`Go to template ${template.name}`}
          />
        ))}
      </div>

      {/* Template features hint */}
      <div className="mt-6 text-center">
        <div className="inline-flex flex-wrap justify-center items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            ATS-Friendly
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Print-Ready
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            PDF Export
          </span>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-40 safe-area-bottom">
        <div className="container mx-auto px-4 py-3 max-w-4xl">
          <Button
            onClick={onNext}
            size="lg"
            className="w-full"
          >
            Continue with {templates.find((t) => t.id === selectedTemplate)?.name}
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCarousel;
