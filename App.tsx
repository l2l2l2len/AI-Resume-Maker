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
import { ProgressBar, TemplateIcon, FormIcon, PreviewIcon } from './components/ui/ProgressBar';
import { AutoSaveIndicator } from './components/ui/AutoSaveIndicator';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

export type Template = 'classic' | 'modern' | 'compact' | '3d' | 'ats' | 'ats-pro';
export type Step = 'homepage' | 'template' | 'form' | 'preview';

// Progress steps configuration
const STEPS = [
  { id: 'template', label: 'Template', icon: <TemplateIcon /> },
  { id: 'form', label: 'Details', icon: <FormIcon /> },
  { id: 'preview', label: 'Preview', icon: <PreviewIcon /> },
];

const getStepIndex = (step: Step): number => {
  switch (step) {
    case 'template': return 0;
    case 'form': return 1;
    case 'preview': return 2;
    default: return -1;
  }
};

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [step, setStep] = useState<Step>('homepage');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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

  // Auto-save with debounce
  useEffect(() => {
    setIsSaving(true);
    const timeoutId = setTimeout(() => {
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
      setLastSaved(new Date());
      setIsSaving(false);
    }, 500);

    return () => clearTimeout(timeoutId);
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

  const handleStepClick = (stepIndex: number) => {
    const stepMap: Step[] = ['template', 'form', 'preview'];
    setStep(stepMap[stepIndex]);
  };

  const currentStepIndex = getStepIndex(step);
  const showProgressBar = step !== 'homepage';
  const showAutoSave = step === 'form';

  const renderStep = () => {
    switch(step) {
      case 'homepage':
        return <Homepage onStart={() => setStep('template')} />;
      case 'template':
        return (
          <div className="max-w-5xl mx-auto animate-fade-in">
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onSelectTemplate={setSelectedTemplate}
              onNext={() => setStep('form')}
            />
          </div>
        );
      case 'form':
        return (
          <div className="animate-fade-in">
            <ResumeForm
              resumeData={resumeData}
              onResumeDataChange={handleResumeDataChange}
              jobDescription={jobDescription}
              onJobDescriptionChange={setJobDescription}
              onPreview={() => setStep('preview')}
              onBack={() => setStep('template')}
            />
          </div>
        );
      case 'preview':
        return (
          <div className="animate-fade-in">
            <ResumePreview
              resumeData={resumeData}
              template={selectedTemplate}
              onEdit={() => setStep('form')}
            />
          </div>
        );
      default:
        return <Homepage onStart={() => setStep('template')} />;
    }
  }

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${
        isLight ? 'text-slate-800' : 'text-slate-100'
      }`}
      style={{
        background: isLight
          ? 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)'
          : 'linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 100%)',
        minHeight: '100vh',
      }}
    >
      <Header
        onHomeClick={step !== 'homepage' ? () => setStep('homepage') : undefined}
        onResetResume={step !== 'homepage' ? handleResetResume : undefined}
      />

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Progress Bar */}
        {showProgressBar && (
          <div className="mb-6 sm:mb-8 animate-slide-down">
            <div className="flex justify-between items-center mb-4">
              <ProgressBar
                steps={STEPS}
                currentStep={currentStepIndex}
                onStepClick={handleStepClick}
              />
            </div>

            {/* Auto-save indicator */}
            {showAutoSave && (
              <div className="flex justify-end">
                <AutoSaveIndicator isSaving={isSaving} lastSaved={lastSaved} />
              </div>
            )}
          </div>
        )}

        {renderStep()}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  if (!isApiConfigured) {
    return <ConfigError />;
  }

  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
