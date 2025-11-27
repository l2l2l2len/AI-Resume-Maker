import React, { useState, useEffect } from 'react';
import { ResumeData, Experience } from './types';
import { Header } from './components/Header';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { Homepage } from './components/Homepage';
import { generateResumeSummary, generateExperiencePoints } from './services/geminiService';
import { INITIAL_RESUME_DATA } from './constants';
import { TemplateSelector } from './components/TemplateSelector';

export type Template = 'classic' | 'modern' | 'compact';

const App: React.FC = () => {
  const [view, setView] = useState<'homepage' | 'builder'>('homepage');
  
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

  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});

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
  
  const handleGenerateSummary = async () => {
    setLoadingStates(prev => ({ ...prev, summary: true }));
    try {
      const summary = await generateResumeSummary(resumeData, jobDescription);
      handleResumeDataChange('summary', summary);
    } catch (error) {
      console.error("Failed to generate summary:", error);
      alert("Error generating summary. Check the console for details.");
    } finally {
      setLoadingStates(prev => ({ ...prev, summary: false }));
    }
  };

  const handleGenerateExperience = async (experience: Experience, index: number) => {
    const key = `experience-${index}`;
    setLoadingStates(prev => ({ ...prev, [key]: true }));
    try {
      const bulletPoints = await generateExperiencePoints(experience, jobDescription);
      const updatedExperience = [...resumeData.experience];
      updatedExperience[index] = { ...updatedExperience[index], bulletPoints };
      handleResumeDataChange('experience', updatedExperience);
    } catch (error) {
      console.error(`Failed to generate experience for item ${index}:`, error);
      alert(`Error generating experience points. Check the console for details.`);
    } finally {
      setLoadingStates(prev => ({ ...prev, [key]: false }));
    }
  };

  const handleResetResume = () => {
    if (window.confirm("Are you sure you want to start a new resume? All current data will be lost.")) {
      setResumeData(INITIAL_RESUME_DATA);
      setJobDescription('');
      setSelectedTemplate('classic');
      setView('homepage');
    }
  };

  const showBuilder = () => setView('builder');
  const showHomepage = () => setView('homepage');

  return (
    <div className="min-h-screen text-slate-100 font-sans">
      <Header 
        onHomeClick={view === 'builder' ? showHomepage : undefined}
        onResetResume={view === 'builder' ? handleResetResume : undefined}
      />
      <main className="container mx-auto px-4 py-8">
        {view === 'homepage' ? (
          <Homepage onStart={showBuilder} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <ResumeForm
              resumeData={resumeData}
              onResumeDataChange={handleResumeDataChange}
              jobDescription={jobDescription}
              onJobDescriptionChange={setJobDescription}
              onGenerateSummary={handleGenerateSummary}
              onGenerateExperience={handleGenerateExperience}
              loadingStates={loadingStates}
            />
            <div className="sticky top-8 space-y-6">
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onSelectTemplate={setSelectedTemplate}
              />
              <ResumePreview resumeData={resumeData} template={selectedTemplate} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;