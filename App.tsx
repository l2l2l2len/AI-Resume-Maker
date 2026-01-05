import React, { useState, useEffect } from 'react';
import { ResumeData } from './types';
import { Header } from './components/Header';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { Homepage } from './components/Homepage';
import { INITIAL_RESUME_DATA } from './constants';
import { TemplateSelector } from './components/TemplateSelector';
import { ProgressBar, TemplateIcon, FormIcon, PreviewIcon } from './components/ui/ProgressBar';
import { AutoSaveIndicator } from './components/ui/AutoSaveIndicator';
import { Footer, FooterPage } from './components/Footer';
import { About } from './components/pages/About';
import { FAQ } from './components/pages/FAQ';
import { PrivacyPolicy } from './components/pages/PrivacyPolicy';
import { TermsOfService } from './components/pages/TermsOfService';

export type Template = 'classic' | 'modern' | 'compact' | 'ats' | 'ats-pro';
export type Step = 'homepage' | 'template' | 'form' | 'preview' | 'about' | 'faq' | 'privacy' | 'terms';

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

const App: React.FC = () => {
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
      setSelectedTemplate('classic');
      setStep('homepage');
    }
  };

  const handleStepClick = (stepIndex: number) => {
    const stepMap: Step[] = ['template', 'form', 'preview'];
    setStep(stepMap[stepIndex]);
  };

  const currentStepIndex = getStepIndex(step);
  const isResumeFlow = ['template', 'form', 'preview'].includes(step);
  const showProgressBar = isResumeFlow;
  const showAutoSave = step === 'form';

  const handleFooterNavigate = (page: FooterPage) => {
    setStep(page);
    window.scrollTo(0, 0);
  };

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
      case 'about':
        return (
          <About
            onBack={() => setStep('homepage')}
            onStart={() => setStep('template')}
          />
        );
      case 'faq':
        return (
          <FAQ
            onBack={() => setStep('homepage')}
            onStart={() => setStep('template')}
          />
        );
      case 'privacy':
        return (
          <PrivacyPolicy
            onBack={() => setStep('homepage')}
          />
        );
      case 'terms':
        return (
          <TermsOfService
            onBack={() => setStep('homepage')}
          />
        );
      default:
        return <Homepage onStart={() => setStep('template')} />;
    }
  }

  const showHeader = isResumeFlow;
  const showFooter = ['homepage', 'about', 'faq', 'privacy', 'terms'].includes(step);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col w-full max-w-full overflow-x-hidden">
      {showHeader && (
        <Header
          onHomeClick={() => setStep('homepage')}
          onResetResume={handleResetResume}
        />
      )}

      <main
        id="main-content"
        className={`flex-1 w-full max-w-full overflow-x-hidden ${
          isResumeFlow ? 'mx-auto px-4 py-6 md:py-8 md:container' : ''
        }`}
      >
        {/* Progress Bar */}
        {showProgressBar && (
          <div className="mb-6 md:mb-8 animate-slide-down">
            <ProgressBar
              steps={STEPS}
              currentStep={currentStepIndex}
              onStepClick={handleStepClick}
            />

            {/* Auto-save indicator */}
            {showAutoSave && (
              <div className="flex justify-end mt-4">
                <AutoSaveIndicator isSaving={isSaving} lastSaved={lastSaved} />
              </div>
            )}
          </div>
        )}

        {renderStep()}
      </main>

      {showFooter && (
        <Footer onNavigate={handleFooterNavigate} />
      )}
    </div>
  );
};

export default App;
