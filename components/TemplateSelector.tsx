import React from 'react';
import { Template } from '../App';
import { SectionWrapper } from './ui/SectionWrapper';
import { Button } from './ui/Button';

interface TemplateSelectorProps {
  selectedTemplate: Template;
  onSelectTemplate: (template: Template) => void;
  onNext: () => void;
}

const templates: { id: Template, name: string }[] = [
  { id: 'classic', name: 'Classic' },
  { id: 'modern', name: 'Modern' },
  { id: 'compact', name: 'Compact' },
  { id: '3d', name: '3D Depth' },
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplate, onSelectTemplate, onNext }) => {
  return (
    <div>
      <SectionWrapper title="Choose a Template">
        <p className="text-slate-600 mb-6 text-center">Select a template that best fits your style and industry.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template.id)}
              className={`p-2 rounded-lg border-2 transition-all duration-200 group ${
                selectedTemplate === template.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className={`h-32 w-full rounded bg-slate-100 flex items-center justify-center overflow-hidden relative transition-transform duration-300 group-hover:scale-105`}>
                {/* Simple visual representation of the template */}
                {template.id === 'classic' && <div className="w-10/12 h-10/12 bg-white border border-slate-200 rounded-sm p-1 space-y-2"><div className="h-2 bg-slate-300 rounded-sm"></div><div className="h-12 bg-slate-300 rounded-sm"></div></div>}
                {template.id === 'modern' && <div className="w-10/12 h-10/12 flex space-x-1"><div className="w-1/3 h-full bg-slate-300 rounded-sm"></div><div className="w-2/3 h-full bg-white border border-slate-200 rounded-sm p-1 space-y-2"><div className="h-2 bg-slate-300 rounded-sm"></div><div className="h-6 bg-slate-300 rounded-sm"></div></div></div>}
                {template.id === 'compact' && <div className="w-10/12 h-10/12 bg-white border border-slate-200 rounded-sm p-1 space-y-1 text-xs"><div className="h-2 bg-slate-300 rounded-sm"></div><div className="h-2 bg-slate-300 rounded-sm"></div><div className="h-2 bg-slate-300 rounded-sm"></div><div className="h-2 bg-slate-300 rounded-sm"></div></div>}
                {template.id === '3d' && <div className="w-10/12 h-10/12 rounded-sm p-1 relative" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}><div className="absolute top-1 left-1 right-1 h-5 rounded-sm" style={{background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'}}></div><div className="flex mt-6 gap-1"><div className="w-1/3 space-y-1"><div className="h-4 bg-white rounded-sm" style={{boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}></div><div className="h-3 bg-white rounded-sm" style={{boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}></div></div><div className="w-2/3 space-y-1"><div className="h-8 bg-white rounded-sm" style={{boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}></div></div></div></div>}
              </div>
              <p className="text-sm font-semibold mt-2 text-center text-slate-700">{template.name}</p>
            </button>
          ))}
        </div>
      </SectionWrapper>
      <div className="mt-8 flex justify-center">
        <Button onClick={onNext} className="px-8 py-3 text-lg">
          Next: Add Details
        </Button>
      </div>
    </div>
  );
};
