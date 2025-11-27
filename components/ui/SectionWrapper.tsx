import React from 'react';

interface SectionWrapperProps {
  title: string;
  children: React.ReactNode;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ title, children }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <h2 className="text-xl font-semibold mb-4 text-slate-800 border-b border-slate-200 pb-3">
        {title}
      </h2>
      {children}
    </div>
  );
};
