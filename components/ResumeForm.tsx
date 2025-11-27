
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
}

export const ResumeForm: React.FC<ResumeFormProps> = ({
  resumeData,
  onResumeDataChange,
  jobDescription,
  onJobDescriptionChange,
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

  const addExperience = () => {
    const newExp: Experience = { id: `exp${Date.now()}`, company: '', role: '', date: '', bulletPoints: [''] };
    onResumeDataChange('experience', [...resumeData.experience, newExp]);
  };
  
  const removeExperience = (index: number) => {
    const newExperience = resumeData.experience.filter((_, i) => i !== index);
    onResumeDataChange('experience', newExperience);
  };

  const handleBulletPointChange = (expIndex: number, bpIndex: number, value: string) => {
    const newExperience = [...resumeData.experience];
    const newBulletPoints = [...newExperience[expIndex].bulletPoints];
    newBulletPoints[bpIndex] = value;
    handleExperienceChange(expIndex, 'bulletPoints', newBulletPoints);
  };

  const addBulletPoint = (expIndex: number) => {
    const newExperience = [...resumeData.experience];
    newExperience[expIndex].bulletPoints.push('');
    onResumeDataChange('experience', newExperience);
  };

  const removeBulletPoint = (expIndex: number, bpIndex: number) => {
    const newExperience = [...resumeData.experience];
    const newBulletPoints = newExperience[expIndex].bulletPoints.filter((_, i) => i !== bpIndex);
    handleExperienceChange(expIndex, 'bulletPoints', newBulletPoints);
  };


  // --- Education Handlers ---
  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    onResumeDataChange('education', newEducation);
  };

  const addEducation = () => {
    const newEdu: Education = { id: `edu${Date.now()}`, institution: '', degree: '', date: '' };
    onResumeDataChange('education', [...resumeData.education, newEdu]);
  };

  const removeEducation = (index: number) => {
    const newEducation = resumeData.education.filter((_, i) => i !== index);
    onResumeDataChange('education', newEducation);
  };

  // --- Skills Handler ---
  const handleSkillsChange = (value: string) => {
    onResumeDataChange('skills', value.split(',').map(skill => skill.trim()));
  };

  return (
    <div className="space-y-6">
      <SectionWrapper title="Job Description (Optional)">
        <Textarea
          id="job-description"
          placeholder="Paste the job description here for your reference..."
          value={jobDescription}
          onChange={(e) => onJobDescriptionChange(e.target.value)}
          rows={8}
          className="text-sm"
        />
      </SectionWrapper>
      
      <SectionWrapper title="Personal Info">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Full Name" value={resumeData.personalInfo.name} onChange={(e) => handlePersonalInfoChange('name', e.target.value)} />
          <Input label="Email" type="email" value={resumeData.personalInfo.email} onChange={(e) => handlePersonalInfoChange('email', e.target.value)} />
          <Input label="Phone" value={resumeData.personalInfo.phone} onChange={(e) => handlePersonalInfoChange('phone', e.target.value)} />
          <Input label="LinkedIn" value={resumeData.personalInfo.linkedin} onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)} />
          <Input label="Website/Portfolio" value={resumeData.personalInfo.website} onChange={(e) => handlePersonalInfoChange('website', e.target.value)} className="sm:col-span-2" />
        </div>
      </SectionWrapper>

      <SectionWrapper title="Professional Summary">
        <Textarea
          id="summary"
          value={resumeData.summary}
          onChange={(e) => onResumeDataChange('summary', e.target.value)}
          rows={5}
        />
      </SectionWrapper>

      <SectionWrapper title="Work Experience">
        <div className="space-y-6">
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg space-y-4 relative">
               <button onClick={() => removeExperience(index)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500">
                  <TrashIcon />
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Company" value={exp.company} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} />
                <Input label="Role" value={exp.role} onChange={(e) => handleExperienceChange(index, 'role', e.target.value)} />
                <Input label="Date (e.g., Jan 2020 - Present)" value={exp.date} onChange={(e) => handleExperienceChange(index, 'date', e.target.value)} className="sm:col-span-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bullet Points</label>
                <div className="space-y-2">
                  {exp.bulletPoints.map((bp, bpIndex) => (
                    <div key={bpIndex} className="flex items-center space-x-2">
                      <Textarea id={`experience-${index}-bullet-${bpIndex}`} value={bp} onChange={(e) => handleBulletPointChange(index, bpIndex, e.target.value)} rows={2} className="flex-grow" />
                      <button onClick={() => removeBulletPoint(index, bpIndex)} className="text-slate-400 hover:text-red-500">
                        <TrashIcon />
                      </button>
                    </div>
                  ))}
                  <button onClick={() => addBulletPoint(index)} className="text-sm text-blue-600 hover:text-blue-800 flex items-center space-x-1">
                    <PlusIcon /> <span>Add bullet point</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button onClick={addExperience} variant="secondary" className="mt-4">
          <PlusIcon /> Add Experience
        </Button>
      </SectionWrapper>

      <SectionWrapper title="Education">
        <div className="space-y-4">
          {resumeData.education.map((edu, index) => (
            <div key={edu.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
              <button onClick={() => removeEducation(index)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500">
                  <TrashIcon />
              </button>
              <Input label="Institution" value={edu.institution} onChange={(e) => handleEducationChange(index, 'institution', e.target.value)} />
              <Input label="Degree/Major" value={edu.degree} onChange={(e) => handleEducationChange(index, 'degree', e.target.value)} />
              <Input label="Date (e.g., Sep 2016 - May 2020)" value={edu.date} onChange={(e) => handleEducationChange(index, 'date', e.target.value)} className="sm:col-span-2" />
            </div>
          ))}
        </div>
        <Button onClick={addEducation} variant="secondary" className="mt-4">
          <PlusIcon /> Add Education
        </Button>
      </SectionWrapper>

      <SectionWrapper title="Skills">
        <Textarea
          id="skills"
          placeholder="Enter skills, comma separated"
          value={resumeData.skills.join(', ')}
          onChange={(e) => handleSkillsChange(e.target.value)}
          rows={3}
        />
      </SectionWrapper>
    </div>
  );
};