import React, { useState, useEffect } from 'react';
import { ResumeData } from './types';
import { Header } from './components/Header';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { Homepage } from './components/Homepage';
import { isApiConfigured } from './services/geminiService';
import { INITIAL_RESUME_DATA } from './constants';
import { TemplateSelector } from './components/TemplateSelector';
import { ConfigError } from './components/ConfigError';

export type Template = 'classic' | 'modern' | 'compact' | '3d';
export type Step = 'homepage' | 'template' | 'form' | 'preview';

const App: React.FC = () => {
  if (!isApiConfigured) {
    return <ConfigError />;
  }

  const [step, setStep] = useState<Step>('homepage');
  
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const savedData = localStorage.getItem('resumeData');
      return savedData ? JSON.parse(savedData) : INITIAL_RESUME_DATA;
    } catch (error) {
      console.error("Failed to parse resumeData from localStorage", error);
      return INITIAL_RESUME_DATA;
    }
  });

  const [jobDescription, setJobDescription] = useState<string>(() => {
    return localStorage.getItem('jobDescription') || '';
  });

  const [selectedTemplate, setSelectedTemplate] = useState<Template>(() => {
    const savedTemplate = localStorage.getItem('selectedTemplate') as Template;
    return savedTemplate || 'classic';
  });

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem('jobDescription', jobDescription);
  }, [jobDescription]);

  useEffect(() => {
    localStorage.setItem('selectedTemplate', selectedTemplate);
  }, [selectedTemplate]);

  const handleResumeDataChange = (
    section: keyof ResumeData,
    data: any
  ) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };
  
  const handleResetResume = () => {
    if (window.confirm("Are you sure you want to start a new resume? All current data will be lost.")) {
      setResumeData(INITIAL_RESUME_DATA);
      setJobDescription('');
      setSelectedTemplate('classic');
      setStep('homepage');
    }
  };

  const renderStep = () => {
    switch(step) {
      case 'homepage':
        return <Homepage onStart={() => setStep('template')} />;
      case 'template':
        return (
          <div className="max-w-4xl mx-auto">
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onSelectTemplate={setSelectedTemplate}
              onNext={() => setStep('form')}
            />
          </div>
        );
      case 'form':
        return (
          <ResumeForm
            resumeData={resumeData}
            onResumeDataChange={handleResumeDataChange}
            jobDescription={jobDescription}
            onJobDescriptionChange={setJobDescription}
            onPreview={() => setStep('preview')}
            onBack={() => setStep('template')}
          />
        );
      case 'preview':
        return (
          <ResumePreview
            resumeData={resumeData}
            template={selectedTemplate}
            onEdit={() => setStep('form')}
          />
        );
      default:
        return <Homepage onStart={() => setStep('template')} />;
    }
  }

  return (
    <div className="min-h-screen text-slate-800 font-sans">
      <Header 
        onHomeClick={step !== 'homepage' ? () => setStep('homepage') : undefined}
        onResetResume={step !== 'homepage' ? handleResetResume : undefined}
      />
      <main className="container mx-auto px-4 py-8">
        {renderStep()}
      </main>
    </div>
  );
};

export default App;