import React from 'react';
import { Button } from './ui/Button';
import { TargetIcon, FileTextIcon, DownloadIcon } from './icons';

interface HomepageProps {
  onStart: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="group bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <div className="relative">
        <div className="flex justify-center items-center mb-4">
          <div className="bg-slate-100 text-blue-500 rounded-full p-4 border border-slate-200">
            {icon}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-sm text-slate-600">{children}</p>
    </div>
  </div>
);


export const Homepage: React.FC<HomepageProps> = ({ onStart }) => {
  return (
    <div className="text-center py-16 px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
        Build Your <span className="gradient-text">Job-Winning Resume</span>
      </h1>
      <p className="max-w-3xl mx-auto text-lg text-slate-600 mb-10">
        Craft a professional resume in minutes. Choose from multiple templates, see a live preview, and download as PDF to land your dream job faster.
      </p>
      <Button onClick={onStart} className="px-8 py-3 text-lg font-bold transform hover:scale-105">
        Get Started for Free
      </Button>

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Why Choose Resume Maker?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
           <FeatureCard
             icon={<FileTextIcon />}
             title="Multiple Templates"
           >
              Choose from a selection of ATS-friendly templates: Classic, Modern, and Compact.
           </FeatureCard>
           <FeatureCard
             icon={<TargetIcon />}
             title="Live Preview"
           >
              See your resume come to life in a clean, modern template as you type, ready to impress.
           </FeatureCard>
           <FeatureCard
             icon={<DownloadIcon />}
             title="Easy PDF Download"
           >
              Download a pixel-perfect PDF of your resume with a single click, ready for recruiters.
           </FeatureCard>
        </div>
      </div>
    </div>
  );
};