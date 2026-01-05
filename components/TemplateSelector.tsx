import React from 'react';
import { Template } from '../App';
import { Button } from './ui/Button';
import { CheckCircle2 } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: Template;
  onSelectTemplate: (template: Template) => void;
  onNext: () => void;
}

interface TemplateInfo {
  id: Template;
  name: string;
  description: string;
  color: string;
}

const templates: TemplateInfo[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional, clean design perfect for corporate roles',
    color: '#2563eb',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Two-column layout with a bold sidebar',
    color: '#059669',
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Space-efficient design for experienced professionals',
    color: '#db2777',
  },
  {
    id: 'ats',
    name: 'ATS Simple',
    description: 'Clean, minimal format optimized for applicant tracking systems',
    color: '#374151',
  },
  {
    id: 'ats-pro',
    name: 'ATS Pro',
    description: 'Professional ATS-friendly design with subtle styling',
    color: '#2563eb',
  },
];

// Template preview components
const ClassicPreview: React.FC = () => (
  <div className="w-full h-full bg-white rounded p-3 space-y-2">
    <div className="h-4 bg-gray-200 rounded mx-auto w-2/3" />
    <div className="h-2 bg-gray-100 rounded mx-auto w-1/2" />
    <div className="mt-3 space-y-1.5">
      <div className="h-2 bg-gray-100 rounded" />
      <div className="h-2 bg-gray-100 rounded w-5/6" />
      <div className="h-2 bg-gray-100 rounded w-4/6" />
    </div>
  </div>
);

const ModernPreview: React.FC = () => (
  <div className="w-full h-full flex rounded overflow-hidden">
    <div className="w-1/3 bg-gray-700 p-2">
      <div className="h-3 bg-gray-500 rounded w-3/4 mb-2" />
      <div className="h-2 bg-gray-600 rounded w-full mb-1" />
      <div className="h-2 bg-gray-600 rounded w-2/3" />
    </div>
    <div className="w-2/3 bg-white p-2 space-y-1.5">
      <div className="h-2 bg-gray-200 rounded" />
      <div className="h-2 bg-gray-200 rounded w-5/6" />
      <div className="h-2 bg-gray-100 rounded w-4/6" />
    </div>
  </div>
);

const CompactPreview: React.FC = () => (
  <div className="w-full h-full bg-white rounded p-2 space-y-1">
    <div className="h-2.5 bg-gray-200 rounded w-1/2" />
    <div className="h-1.5 bg-gray-100 rounded w-2/3" />
    <div className="h-1.5 bg-gray-100 rounded w-full" />
    <div className="h-1.5 bg-gray-100 rounded w-5/6" />
    <div className="h-1.5 bg-gray-100 rounded w-4/6" />
    <div className="h-1.5 bg-gray-100 rounded w-full" />
  </div>
);

const ATSPreview: React.FC = () => (
  <div className="w-full h-full bg-white rounded p-2 space-y-1.5">
    <div className="text-center pb-1 border-b border-gray-300">
      <div className="h-3 bg-gray-800 rounded w-1/2 mx-auto mb-1" />
      <div className="h-1.5 bg-gray-300 rounded w-3/4 mx-auto" />
    </div>
    <div className="pt-1">
      <div className="h-2 bg-gray-800 rounded w-1/3 mb-1" />
      <div className="space-y-0.5">
        <div className="h-1.5 bg-gray-200 rounded w-full" />
        <div className="h-1.5 bg-gray-200 rounded w-5/6" />
        <div className="h-1.5 bg-gray-200 rounded w-4/6" />
      </div>
    </div>
  </div>
);

const ATSProPreview: React.FC = () => (
  <div className="w-full h-full bg-white rounded p-2">
    <div className="pb-1.5 mb-1.5 border-b-2 border-blue-600">
      <div className="h-3 bg-gray-700 rounded w-2/3 mb-1" />
      <div className="flex gap-1">
        <div className="h-1.5 bg-gray-300 rounded w-1/4" />
        <div className="h-1.5 bg-gray-300 rounded w-1/4" />
      </div>
    </div>
    <div className="flex gap-1 mb-1.5 flex-wrap">
      <div className="h-2 bg-blue-100 rounded-full w-8" />
      <div className="h-2 bg-blue-100 rounded-full w-6" />
      <div className="h-2 bg-blue-100 rounded-full w-10" />
    </div>
    <div className="h-1.5 bg-blue-600 rounded w-1/3 mb-1" />
    <div className="space-y-0.5">
      <div className="h-1.5 bg-gray-200 rounded w-full" />
      <div className="h-1.5 bg-gray-200 rounded w-5/6" />
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

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onSelectTemplate,
  onNext,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto overflow-x-hidden">
      {/* Header */}
      <div className="text-center mb-6 md:mb-8 lg:mb-12 px-1">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Choose Your Template
        </h2>
        <p className="text-base text-gray-600">
          Select a design that best represents your professional brand
        </p>
      </div>

      {/* Template Grid - Single column on small mobile, 2 on larger mobile, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-12">
        {templates.map((template) => {
          const isSelected = selectedTemplate === template.id;

          return (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template.id)}
              className={`group relative bg-white rounded-xl overflow-hidden transition-all duration-200 touch-action-manipulation min-h-[180px] text-left ${
                isSelected
                  ? 'ring-2 ring-blue-600 shadow-lg'
                  : 'border border-gray-200 hover:shadow-md hover:border-gray-300 active:scale-[0.98]'
              }`}
            >
              {/* Top accent bar */}
              <div
                className="h-1.5 md:h-1 w-full"
                style={{ backgroundColor: template.color }}
              />

              {/* Preview area */}
              <div className="p-3 md:p-4 bg-gray-100">
                <div className="aspect-[210/150] rounded-lg overflow-hidden bg-gray-50">
                  {getPreviewComponent(template.id)}
                </div>
              </div>

              {/* Info section */}
              <div className="p-3 md:p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-semibold text-gray-900">
                    {template.name}
                  </h3>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {template.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA Button */}
      <div className="flex justify-center">
        <Button
          onClick={onNext}
          size="lg"
          className="w-full sm:w-auto px-8"
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

      {/* Template features hint */}
      <div className="mt-8 md:mt-12 text-center">
        <div className="inline-flex flex-wrap justify-center items-center gap-4 md:gap-6 text-base text-gray-500">
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            ATS-Friendly
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Print-Ready
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            PDF Export
          </span>
        </div>
      </div>
    </div>
  );
};
