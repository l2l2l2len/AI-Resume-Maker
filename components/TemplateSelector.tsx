import React from 'react';
import { Template } from '../App';
import { SectionWrapper } from './ui/SectionWrapper';

interface TemplateSelectorProps {
  selectedTemplate: Template;
  onSelectTemplate: (template: Template) => void;
}

const templates: { id: Template, name: string }[] = [
  { id: 'classic', name: 'Classic' },
  { id: 'modern', name: 'Modern' },
  { id: 'compact', name: 'Compact' },
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedTemplate, onSelectTemplate }) => {
  return (
    <SectionWrapper title="Choose a Template">
      <div className="grid grid-cols-3 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template.id)}
            className={`p-2 rounded-lg border-2 transition-all duration-200 ${
              selectedTemplate === template.id
                ? 'border-blue-500 bg-blue-500/20'
                : 'border-slate-700 hover:border-slate-500'
            }`}
          >
            <div className={`h-24 w-full rounded bg-slate-800 flex items-center justify-center`}>
              {/* Simple visual representation of the template */}
              {template.id === 'classic' && <div className="w-10/12 h-10/12 bg-slate-600 rounded-sm p-1 space-y-1"><div className="h-2 bg-slate-500 rounded-sm"></div><div className="h-8 bg-slate-500 rounded-sm"></div></div>}
              {template.id === 'modern' && <div className="w-10/12 h-10/12 flex space-x-1"><div className="w-1/3 h-full bg-slate-500 rounded-sm"></div><div className="w-2/3 h-full bg-slate-600 rounded-sm p-1 space-y-1"><div className="h-2 bg-slate-500 rounded-sm"></div><div className="h-4 bg-slate-500 rounded-sm"></div></div></div>}
              {template.id === 'compact' && <div className="w-10/12 h-10/12 bg-slate-600 rounded-sm p-1 space-y-1 text-xs"><div className="h-2 bg-slate-500 rounded-sm"></div><div className="h-2 bg-slate-500 rounded-sm"></div><div className="h-2 bg-slate-500 rounded-sm"></div></div>}
            </div>
            <p className="text-sm font-semibold mt-2 text-center text-slate-200">{template.name}</p>
          </button>
        ))}
      </div>
    </SectionWrapper>
  );
};
