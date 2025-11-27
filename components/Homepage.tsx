import React from 'react';
import { Button } from './ui/Button';
import { SparklesIcon, TargetIcon, FileTextIcon } from './icons';

interface HomepageProps {
  onStart: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="group relative bg-slate-900/40 backdrop-blur-md p-6 rounded-lg shadow-2xl border border-slate-700/50 text-center transition-all duration-300 hover:border-blue-500/50 hover:-translate-y-2">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
    <div className="relative">
        <div className="flex justify-center items-center mb-4">
          <div className="bg-slate-800/50 text-blue-400 rounded-full p-4 border border-slate-700/50">
            {icon}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-slate-100 mb-2">{title}</h3>
        <p className="text-sm text-slate-400">{children}</p>
    </div>
  </div>
);


export const Homepage: React.FC<HomepageProps> = ({ onStart }) => {
  return (
    <div className="text-center py-16 px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100 mb-4 tracking-tight">
        Build Your <span className="gradient-text">Job-Winning Resume</span> with AI
      </h1>
      <p className="max-w-3xl mx-auto text-lg text-slate-400 mb-10">
        Craft a professional resume tailored to any job description in minutes. Let our AI be your career co-pilot and land your dream job faster.
      </p>
      <Button onClick={onStart} className="px-8 py-3 text-lg font-bold shadow-lg shadow-purple-600/20 transform hover:scale-105">
        Get Started for Free
      </Button>

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-100">Why Choose AI Resume Maker?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
           <FeatureCard
             icon={<SparklesIcon />}
             title="AI-Powered Summary"
           >
              Instantly generate a compelling professional summary that grabs recruiters' attention.
           </FeatureCard>
           <FeatureCard
             icon={<TargetIcon />}
             title="Tailored Experience"
           >
              Optimize your work experience bullet points to match the specific keywords and requirements of the job.
           </FeatureCard>
           <FeatureCard
             icon={<FileTextIcon />}
             title="Professional Preview"
           >
              See your resume come to life in a clean, modern template as you type, ready to impress.
           </FeatureCard>
        </div>
      </div>
    </div>
  );
};