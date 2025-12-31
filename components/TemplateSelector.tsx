import React from 'react';
import { Template } from '../App';
import { CheckCircle2, ArrowRight } from 'lucide-react';

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
    id: '3d',
    name: '3D Depth',
    description: 'Stunning layered design with modern depth effects',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    accentColor: '#e94560',
    shadowColor: 'rgba(233, 69, 96, 0.4)',
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
    color: '#1d4ed8',
  },
];

// Template preview components
const ClassicPreview: React.FC = () => (
  <div className="w-full h-full bg-white rounded-lg p-3 space-y-2">
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
  <div className="w-full h-full flex rounded-lg overflow-hidden">
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
  <div className="w-full h-full bg-white rounded-lg p-2 space-y-1">
    <div className="h-2.5 bg-gray-200 rounded w-1/2" />
    <div className="h-1.5 bg-gray-100 rounded w-2/3" />
    <div className="h-1.5 bg-gray-100 rounded w-full" />
    <div className="h-1.5 bg-gray-100 rounded w-5/6" />
    <div className="h-1.5 bg-gray-100 rounded w-4/6" />
    <div className="h-1.5 bg-gray-100 rounded w-full" />
  </div>
);

const Depth3DPreview: React.FC = () => (
  <div
    className="w-full h-full rounded-lg p-2 relative overflow-hidden"
    style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)' }}
  >
    {/* Header bar */}
    <div
      className="h-8 rounded-md mb-2"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      }}
    />
    {/* Content cards */}
    <div className="flex gap-1.5">
      <div className="w-1/3 space-y-1.5">
        <div
          className="h-6 bg-white rounded-md"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
        />
        <div
          className="h-5 bg-white rounded-md"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
        />
      </div>
      <div className="w-2/3">
        <div
          className="h-full bg-white rounded-md"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
        />
      </div>
    </div>
  </div>
);

const ATSPreview: React.FC = () => (
  <div className="w-full h-full bg-white rounded-lg p-2 space-y-1.5">
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
  <div className="w-full h-full bg-white rounded-lg p-2">
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
    case '3d':
      return <Depth3DPreview />;
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
    <div className="max-w-5xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Choose Your Template
        </h2>
        <p className="text-lg text-gray-600">
          Select a design that best represents your professional brand
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
        {templates.map((template) => {
          const isSelected = selectedTemplate === template.id;

          return (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template.id)}
              className={`group relative bg-white rounded-xl overflow-hidden transition-all duration-200 text-left ${
                isSelected
                  ? 'ring-2 ring-blue-600 shadow-lg'
                  : 'border border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              {/* Top accent bar */}
              <div
                className="h-1 w-full"
                style={{ backgroundColor: template.color }}
              />

              {/* Preview area */}
              <div className="p-3 sm:p-4 bg-gray-50">
                <div className="aspect-[210/150] rounded-lg overflow-hidden">
                  {getPreviewComponent(template.id)}
                </div>
              </div>

              {/* Info section */}
              <div className="p-3 sm:p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                    {template.name}
                  </h3>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                  {template.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA Button */}
      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-lg"
        >
          Continue with {templates.find((t) => t.id === selectedTemplate)?.name}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Template features hint */}
      <div className="mt-10 text-center">
        <div className="inline-flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            ATS-Friendly
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            Print-Ready
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            PDF Export
          </span>
        </div>
      </div>
    </div>
  );
};
