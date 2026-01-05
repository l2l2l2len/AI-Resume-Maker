import React, { useState, useEffect, useCallback } from 'react';
import { ResumeData } from './types';
import { MobileNav, NavPage } from './components/MobileNav';
import { Homepage } from './components/Homepage';
import { INITIAL_RESUME_DATA } from './constants';
import { TemplateCarousel } from './components/TemplateCarousel';
import { FormWizard } from './components/FormWizard';
import { LivePreview } from './components/LivePreview';
import { ProgressBar, TemplateIcon, FormIcon, PreviewIcon } from './components/ui/ProgressBar';
import { AutoSaveIndicator } from './components/ui/AutoSaveIndicator';
import { Footer, FooterPage } from './components/Footer';
import { About } from './components/pages/About';
import { FAQ } from './components/pages/FAQ';
import { PrivacyPolicy } from './components/pages/PrivacyPolicy';
import { TermsOfService } from './components/pages/TermsOfService';
import { Dashboard } from './components/pages/Dashboard';
import { MyResumes, SavedResume } from './components/pages/MyResumes';
import { Settings } from './components/pages/Settings';
import { ToastProvider, useToast } from './components/ui/Toast';
import { ThemeProvider } from './contexts/ThemeContext';

export type Template = 'classic' | 'modern' | 'compact' | 'ats' | 'ats-pro';
export type Step = 'homepage' | 'dashboard' | 'my-resumes' | 'settings' | 'template' | 'form' | 'preview' | 'about' | 'faq' | 'privacy' | 'terms';

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

// Inner App component that uses Toast context
const AppContent: React.FC = () => {
  const [step, setStep] = useState<Step>('homepage');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  // Saved resumes state
  const [savedResumes, setSavedResumes] = useState<SavedResume[]>(() => {
    try {
      const saved = localStorage.getItem('savedResumes');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((r: any) => ({
          ...r,
          lastModified: new Date(r.lastModified),
        }));
      }
      return [];
    } catch {
      return [];
    }
  });

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

  // Save saved resumes to localStorage
  useEffect(() => {
    localStorage.setItem('savedResumes', JSON.stringify(savedResumes));
  }, [savedResumes]);

  const handleResumeDataChange = (
    section: keyof ResumeData,
    data: any
  ) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const handleStepClick = (stepIndex: number) => {
    const stepMap: Step[] = ['template', 'form', 'preview'];
    setStep(stepMap[stepIndex]);
  };

  const handleCreateNew = useCallback(() => {
    // Save current resume if it has content
    if (resumeData.personalInfo.name) {
      const newSavedResume: SavedResume = {
        id: `resume-${Date.now()}`,
        name: resumeData.personalInfo.name || 'Untitled Resume',
        template: selectedTemplate,
        lastModified: new Date(),
        data: resumeData,
      };
      setSavedResumes((prev) => {
        // Check if resume already exists (same name)
        const existingIndex = prev.findIndex((r) => r.name === newSavedResume.name);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = newSavedResume;
          return updated;
        }
        return [newSavedResume, ...prev];
      });
    }

    // Reset and start fresh
    setResumeData(INITIAL_RESUME_DATA);
    setSelectedTemplate('classic');
    setStep('template');
  }, [resumeData, selectedTemplate]);

  const handleEditResume = useCallback((resume: SavedResume) => {
    setResumeData(resume.data);
    setSelectedTemplate(resume.template);
    setStep('form');
    showToast(`Editing "${resume.name}"`, 'info');
  }, [showToast]);

  const handleDeleteResume = useCallback((id: string) => {
    setSavedResumes((prev) => prev.filter((r) => r.id !== id));
    showToast('Resume deleted', 'success');
  }, [showToast]);

  const handleDuplicateResume = useCallback((resume: SavedResume) => {
    const duplicated: SavedResume = {
      ...resume,
      id: `resume-${Date.now()}`,
      name: `${resume.name} (Copy)`,
      lastModified: new Date(),
    };
    setSavedResumes((prev) => [duplicated, ...prev]);
    showToast('Resume duplicated', 'success');
  }, [showToast]);

  const handleDownloadResume = useCallback((resume: SavedResume) => {
    // Load resume and navigate to preview for download
    setResumeData(resume.data);
    setSelectedTemplate(resume.template);
    setStep('preview');
  }, []);

  const handleSaveResume = useCallback(() => {
    const resumeName = resumeData.personalInfo.name || 'Untitled Resume';
    const newSavedResume: SavedResume = {
      id: `resume-${Date.now()}`,
      name: resumeName,
      template: selectedTemplate,
      lastModified: new Date(),
      data: resumeData,
    };
    setSavedResumes((prev) => {
      const existingIndex = prev.findIndex((r) => r.name === resumeName);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newSavedResume;
        return updated;
      }
      return [newSavedResume, ...prev];
    });
    showToast('Resume saved!', 'success');
  }, [resumeData, selectedTemplate, showToast]);

  const handleClearAllData = useCallback(() => {
    localStorage.clear();
    setResumeData(INITIAL_RESUME_DATA);
    setSelectedTemplate('classic');
    setSavedResumes([]);
    setStep('homepage');
    showToast('All data cleared', 'success');
  }, [showToast]);

  const handleNavigation = useCallback((page: NavPage) => {
    switch (page) {
      case 'dashboard':
        setStep('dashboard');
        break;
      case 'templates':
        setStep('template');
        break;
      case 'my-resumes':
        setStep('my-resumes');
        break;
      case 'settings':
        setStep('settings');
        break;
      case 'homepage':
      default:
        setStep('homepage');
        break;
    }
    window.scrollTo(0, 0);
  }, []);

  const currentStepIndex = getStepIndex(step);
  const isResumeFlow = ['template', 'form', 'preview'].includes(step);
  const showProgressBar = isResumeFlow;
  const showAutoSave = step === 'form';
  const showMobileNav = ['dashboard', 'my-resumes', 'settings', 'template', 'form', 'preview'].includes(step);

  const handleFooterNavigate = (page: FooterPage) => {
    setStep(page);
    window.scrollTo(0, 0);
  };

  const getNavPage = (): NavPage | undefined => {
    switch (step) {
      case 'dashboard': return 'dashboard';
      case 'my-resumes': return 'my-resumes';
      case 'settings': return 'settings';
      case 'template': return 'templates';
      default: return undefined;
    }
  };

  const renderStep = () => {
    switch(step) {
      case 'homepage':
        return <Homepage onStart={() => setStep('template')} />;
      case 'dashboard':
        return (
          <Dashboard
            onCreateNew={handleCreateNew}
            onEditResume={handleEditResume}
            onViewTemplates={() => setStep('template')}
            savedResumes={savedResumes}
            currentResumeName={resumeData.personalInfo.name || undefined}
          />
        );
      case 'my-resumes':
        return (
          <MyResumes
            savedResumes={savedResumes}
            onCreateNew={handleCreateNew}
            onEditResume={handleEditResume}
            onDeleteResume={handleDeleteResume}
            onDuplicateResume={handleDuplicateResume}
            onDownloadResume={handleDownloadResume}
          />
        );
      case 'settings':
        return (
          <Settings
            onClearData={handleClearAllData}
            onNavigateToAbout={() => setStep('about')}
            onNavigateToFAQ={() => setStep('faq')}
            onNavigateToPrivacy={() => setStep('privacy')}
            onNavigateToTerms={() => setStep('terms')}
          />
        );
      case 'template':
        return (
          <div className="max-w-5xl mx-auto animate-fade-in pt-4">
            <TemplateCarousel
              selectedTemplate={selectedTemplate}
              onSelectTemplate={setSelectedTemplate}
              onNext={() => setStep('form')}
            />
          </div>
        );
      case 'form':
        return (
          <div className="animate-fade-in max-w-4xl mx-auto px-4">
            <FormWizard
              resumeData={resumeData}
              onResumeDataChange={handleResumeDataChange}
              onComplete={() => setStep('preview')}
              onBack={() => setStep('template')}
            />
          </div>
        );
      case 'preview':
        return (
          <div className="animate-fade-in max-w-5xl mx-auto px-4">
            <LivePreview
              resumeData={resumeData}
              template={selectedTemplate}
              onEdit={() => setStep('form')}
              onSave={handleSaveResume}
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
  };

  const showFooter = ['homepage', 'about', 'faq', 'privacy', 'terms'].includes(step);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {showMobileNav && (
        <MobileNav
          currentPage={getNavPage()}
          onNavigate={handleNavigation}
          onCreateNew={handleCreateNew}
          showCreateButton={step !== 'template'}
        />
      )}

      <main id="main-content" className={`flex-1 ${isResumeFlow ? 'pt-4' : ''}`}>
        {/* Progress Bar */}
        {showProgressBar && (
          <div className="container mx-auto px-4 mb-4 animate-slide-down">
            <ProgressBar
              steps={STEPS}
              currentStep={currentStepIndex}
              onStepClick={handleStepClick}
            />

            {/* Auto-save indicator */}
            {showAutoSave && (
              <div className="flex justify-end mt-4 max-w-4xl mx-auto">
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

// Main App component wrapped with providers
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
