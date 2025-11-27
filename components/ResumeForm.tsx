import React from 'react';
import { ResumeData, Experience, Education } from '../types';
import { SectionWrapper } from './ui/SectionWrapper';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';
import { PlusIcon, TrashIcon } from './icons';

interface ResumeFormProps {
  resumeData: ResumeData;
  onResumeDataChange: (section: keyof ResumeData, data: any) => void;
  jobDescription: string;
  onJobDescriptionChange: (value: string) => void;
  onPreview: () => void;
  onBack: () => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({
  resumeData,
  onResumeDataChange,
  jobDescription,
  onJobDescriptionChange,
  onPreview,
  onBack,
}) => {
  
  const handlePersonalInfoChange = (field: keyof ResumeData['personalInfo'], value: string) => {
    onResumeDataChange('personalInfo', { ...resumeData.personalInfo, [field]: value });
  };
  
  // --- Experience Handlers ---
  const handleExperienceChange = (index: number, field: keyof Experience, value: string | string[]) => {
    const newExperience = [...resumeData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    onResumeDataChange('experience', newExperience);
  };
  
  const handleExperienceBulletChange = (expIndex: number, bulletIndex: number, value: string) => {
    const newExperience = [...resumeData.experience];
    newExperience[expIndex].bulletPoints[bulletIndex] = value;
    onResumeDataChange('experience', newExperience);
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: `exp${Date.now()}`,
      company: '',
      role: '',
      date: '',
      bulletPoints: [''],
    };
    onResumeDataChange('experience', [...resumeData.experience, newExperience]);
  };

  const removeExperience = (index: number) => {
    const newExperience = resumeData.experience.filter((_, i) => i !== index);
    onResumeDataChange('experience', newExperience);
  };
  
  const addExperienceBullet = (expIndex: number) => {
    const newExperience = [...resumeData.experience];
    newExperience[expIndex].bulletPoints.push('');
    onResumeDataChange('experience', newExperience);
  };

  const removeExperienceBullet = (expIndex: number, bulletIndex: number) => {
    const newExperience = [...resumeData.experience];
    newExperience[expIndex].bulletPoints = newExperience[expIndex].bulletPoints.filter((_, i) => i !== bulletIndex);
    onResumeDataChange('experience', newExperience);
  };

  // --- Education Handlers ---
  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    onResumeDataChange('education', newEducation);
  };

  const addEducation = () => {
    const newEducationItem: Education = {
      id: `edu${Date.now()}`,
      institution: '',
      degree: '',
      date: '',
    };
    onResumeDataChange('education', [...resumeData.education, newEducationItem]);
  };

  const removeEducation = (index: number) => {
    const newEducation = resumeData.education.filter((_, i) => i !== index);
    onResumeDataChange('education', newEducation);
  };
  
  // --- Skills Handler ---
  const handleSkillsChange = (value: string) => {
    // Assuming skills are stored as a comma-separated string in the input
    // and converted to an array of strings.
    onResumeDataChange('skills', value.split(',').map(skill => skill.trim()));
  };

  return (
    <div className="space-y-8 pb-24">
      {/* Personal Info */}
      <SectionWrapper title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Full Name" value={resumeData.personalInfo.name} onChange={(e) => handlePersonalInfoChange('name', e.target.value)} />
          <Input label="Email" type="email" value={resumeData.personalInfo.email} onChange={(e) => handlePersonalInfoChange('email', e.target.value)} />
          <Input label="Phone" type="tel" value={resumeData.personalInfo.phone} onChange={(e) => handlePersonalInfoChange('phone', e.target.value)} />
          <Input label="LinkedIn Profile" value={resumeData.personalInfo.linkedin} onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)} />
          <Input label="Website/Portfolio" value={resumeData.personalInfo.website} onChange={(e) => handlePersonalInfoChange('website', e.target.value)} />
        </div>
      </SectionWrapper>

      {/* Summary */}
      <SectionWrapper title="Professional Summary">
        <Textarea 
          id="summary"
          rows={4}
          value={resumeData.summary}
          onChange={(e) => onResumeDataChange('summary', e.target.value)}
          placeholder="Write a brief summary of your professional background..."
        />
      </SectionWrapper>

      {/* Experience */}
      <SectionWrapper title="Work Experience">
        <div className="space-y-6">
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="p-4 border border-slate-200 rounded-md space-y-4 bg-slate-50">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-slate-700">Experience #{index + 1}</h3>
                <Button variant="secondary" onClick={() => removeExperience(index)} aria-label="Remove Experience">
                  <TrashIcon />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Company" value={exp.company} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} />
                <Input label="Role" value={exp.role} onChange={(e) => handleExperienceChange(index, 'role', e.target.value)} />
                <Input label="Date (e.g., Jan 2020 - Present)" value={exp.date} onChange={(e) => handleExperienceChange(index, 'date', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Key Responsibilities / Achievements</label>
                <div className="space-y-2">
                  {exp.bulletPoints.map((point, bulletIndex) => (
                    <div key={bulletIndex} className="flex items-center gap-2">
                      <Textarea 
                        id={`exp-${index}-bullet-${bulletIndex}`}
                        className="flex-grow"
                        rows={2}
                        value={point}
                        onChange={(e) => handleExperienceBulletChange(index, bulletIndex, e.target.value)}
                        placeholder={`Responsibility #${bulletIndex + 1}`}
                      />
                      <Button variant="secondary" onClick={() => removeExperienceBullet(index, bulletIndex)} aria-label="Remove Bullet Point">
                        <TrashIcon />
                      </Button>
                    </div>
                  ))}
                  <Button variant="secondary" onClick={() => addExperienceBullet(index)}>
                    <PlusIcon /> Add Bullet Point
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button onClick={addExperience}><PlusIcon /> Add Experience</Button>
        </div>
      </SectionWrapper>

      {/* Education */}
      <SectionWrapper title="Education">
        <div className="space-y-4">
          {resumeData.education.map((edu, index) => (
            <div key={edu.id} className="p-4 border border-slate-200 rounded-md space-y-4 bg-slate-50">
               <div className="flex justify-between items-center">
                 <h3 className="font-semibold text-slate-700">Education #{index + 1}</h3>
                <Button variant="secondary" onClick={() => removeEducation(index)} aria-label="Remove Education">
                  <TrashIcon />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Institution" value={edu.institution} onChange={(e) => handleEducationChange(index, 'institution', e.target.value)} />
                <Input label="Degree" value={edu.degree} onChange={(e) => handleEducationChange(index, 'degree', e.target.value)} />
                {/* Fix: Corrected typo from e.g.target.value to e.target.value */}
                <Input label="Date (e.g., Sep 2016 - May 2020)" value={edu.date} onChange={(e) => handleEducationChange(index, 'date', e.target.value)} />
              </div>
            </div>
          ))}
          <Button onClick={addEducation}><PlusIcon /> Add Education</Button>
        </div>
      </SectionWrapper>
      
      {/* Skills */}
      <SectionWrapper title="Skills">
        <Input 
          label="Skills (comma-separated)" 
          value={resumeData.skills.join(', ')} 
          onChange={(e) => handleSkillsChange(e.target.value)}
          placeholder="e.g., React, TypeScript, UI/UX Design"
        />
      </SectionWrapper>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 z-40">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Button variant="secondary" onClick={onBack}>
            Back to Templates
          </Button>
          <Button onClick={onPreview} className="px-8">
            Preview Resume
          </Button>
        </div>
      </div>
    </div>
  );
};