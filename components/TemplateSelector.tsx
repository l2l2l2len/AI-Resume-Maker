import React from 'react';
import { Template } from '../App';
import { SectionWrapper } from './ui/SectionWrapper';
import { Button } from './ui/Button';

interface TemplateSelectorProps {
  selectedTemplate: Template;
  onSelectTemplate: (template: Template) => void;
  onNext: () => void;
}

interface TemplateInfo {
  id: Template;
  name: string;
  description: string;
  gradient: string;
  accentColor: string;
  shadowColor: string;
}

const templates: TemplateInfo[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional, clean design perfect for corporate roles',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    accentColor: '#667eea',
    shadowColor: 'rgba(102, 126, 234, 0.4)',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Two-column layout with a bold sidebar',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    accentColor: '#11998e',
    shadowColor: 'rgba(17, 153, 142, 0.4)',
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Space-efficient design for experienced professionals',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    accentColor: '#f5576c',
    shadowColor: 'rgba(245, 87, 108, 0.4)',
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
    gradient: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
    accentColor: '#374151',
    shadowColor: 'rgba(55, 65, 81, 0.4)',
  },
  {
    id: 'ats-pro',
    name: 'ATS Pro',
    description: 'Professional ATS-friendly design with subtle styling',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    accentColor: '#2563eb',
    shadowColor: 'rgba(37, 99, 235, 0.4)',
  },
];

// Template preview components
const ClassicPreview: React.FC = () => (
  <div className="w-full h-full bg-white rounded-lg p-3 space-y-2">
    <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded mx-auto w-2/3" />
    <div className="h-2 bg-slate-200 rounded mx-auto w-1/2" />
    <div className="mt-3 space-y-1.5">
      <div className="h-2 bg-slate-100 rounded" />
      <div className="h-2 bg-slate-100 rounded w-5/6" />
      <div className="h-2 bg-slate-100 rounded w-4/6" />
    </div>
  </div>
);

const ModernPreview: React.FC = () => (
  <div className="w-full h-full flex rounded-lg overflow-hidden">
    <div className="w-1/3 bg-slate-700 p-2">
      <div className="h-3 bg-slate-500 rounded w-3/4 mb-2" />
      <div className="h-2 bg-slate-600 rounded w-full mb-1" />
      <div className="h-2 bg-slate-600 rounded w-2/3" />
    </div>
    <div className="w-2/3 bg-white p-2 space-y-1.5">
      <div className="h-2 bg-slate-200 rounded" />
      <div className="h-2 bg-slate-200 rounded w-5/6" />
      <div className="h-2 bg-slate-100 rounded w-4/6" />
    </div>
  </div>
);

const CompactPreview: React.FC = () => (
  <div className="w-full h-full bg-white rounded-lg p-2 space-y-1">
    <div className="h-2.5 bg-slate-200 rounded w-1/2" />
    <div className="h-1.5 bg-slate-100 rounded w-2/3" />
    <div className="h-1.5 bg-slate-100 rounded w-full" />
    <div className="h-1.5 bg-slate-100 rounded w-5/6" />
    <div className="h-1.5 bg-slate-100 rounded w-4/6" />
    <div className="h-1.5 bg-slate-100 rounded w-full" />
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
    {/* Simple header */}
    <div className="text-center pb-1 border-b border-gray-300">
      <div className="h-3 bg-gray-800 rounded w-1/2 mx-auto mb-1" />
      <div className="h-1.5 bg-gray-300 rounded w-3/4 mx-auto" />
    </div>
    {/* Section */}
    <div className="pt-1">
      <div className="h-2 bg-gray-800 rounded w-1/3 mb-1 border-b border-gray-800" />
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
    {/* Header with accent */}
    <div className="pb-1.5 mb-1.5 border-b-2 border-blue-600">
      <div className="h-3 bg-slate-700 rounded w-2/3 mb-1" />
      <div className="flex gap-1">
        <div className="h-1.5 bg-gray-300 rounded w-1/4" />
        <div className="h-1.5 bg-gray-300 rounded w-1/4" />
      </div>
    </div>
    {/* Skills pills */}
    <div className="flex gap-1 mb-1.5 flex-wrap">
      <div className="h-2 bg-blue-100 rounded-full w-8" />
      <div className="h-2 bg-blue-100 rounded-full w-6" />
      <div className="h-2 bg-blue-100 rounded-full w-10" />
    </div>
    {/* Section */}
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
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900 mb-3">
          Choose Your
          <span
            className="ml-2"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Template
          </span>
        </h2>
        <p className="text-lg text-slate-600">
          Select a design that best represents your professional brand
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {templates.map((template, index) => {
          const isSelected = selectedTemplate === template.id;

          return (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template.id)}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-500 transform ${
                isSelected
                  ? 'scale-105 -translate-y-2'
                  : 'hover:scale-102 hover:-translate-y-1'
              }`}
              style={{
                boxShadow: isSelected
                  ? `0 25px 50px -12px ${template.shadowColor}, 0 0 0 3px ${template.accentColor}`
                  : '0 10px 30px -10px rgba(0,0,0,0.15)',
              }}
            >
              {/* Card background with gradient accent */}
              <div
                className="absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                style={{ background: template.gradient }}
              />

              {/* Top accent bar */}
              <div
                className="h-1.5 w-full"
                style={{ background: template.gradient }}
              />

              {/* Preview area */}
              <div className="bg-slate-100 p-4">
                <div
                  className="aspect-[210/150] rounded-xl overflow-hidden transition-transform duration-500 group-hover:scale-105"
                  style={{
                    boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.1)',
                  }}
                >
                  {getPreviewComponent(template.id)}
                </div>
              </div>

              {/* Info section */}
              <div className="bg-white p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-800">{template.name}</h3>
                  {isSelected && (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: template.gradient }}
                    >
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {template.description}
                </p>
              </div>

              {/* Selection indicator */}
              {isSelected && (
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 0 3px ${template.accentColor}`,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* CTA Button */}
      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="group px-10 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            boxShadow: '0 20px 40px rgba(102, 126, 234, 0.4)',
          }}
        >
          <span className="flex items-center gap-3">
            Continue with {templates.find((t) => t.id === selectedTemplate)?.name}
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
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
          </span>
        </button>
      </div>

      {/* Template features hint */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-6 text-sm text-slate-500">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            ATS-Friendly
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Print-Ready
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
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
