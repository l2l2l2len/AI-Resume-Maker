import React from 'react';
import { ResumeData, Experience, Education, Internship, Project, CustomSection } from '../types';
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

  // --- Internship Handlers (New) ---
  const handleInternshipChange = (index: number, field: keyof Internship, value: string | string[]) => {
    const newInternships = [...resumeData.internships];
    newInternships[index] = { ...newInternships[index], [field]: value };
    onResumeDataChange('internships', newInternships);
  };

  const handleInternshipBulletChange = (intIndex: number, bulletIndex: number, value: string) => {
    const newInternships = [...resumeData.internships];
    newInternships[intIndex].bulletPoints[bulletIndex] = value;
    onResumeDataChange('internships', newInternships);
  };

  const addInternship = () => {
    const newInternship: Internship = {
      id: `int${Date.now()}`,
      company: '',
      role: '',
      date: '',
      bulletPoints: [''],
    };
    onResumeDataChange('internships', [...resumeData.internships, newInternship]);
  };

  const removeInternship = (index: number) => {
    const newInternships = resumeData.internships.filter((_, i) => i !== index);
    onResumeDataChange('internships', newInternships);
  };

  const addInternshipBullet = (intIndex: number) => {
    const newInternships = [...resumeData.internships];
    newInternships[intIndex].bulletPoints.push('');
    onResumeDataChange('internships', newInternships);
  };

  const removeInternshipBullet = (intIndex: number, bulletIndex: number) => {
    const newInternships = [...resumeData.internships];
    newInternships[intIndex].bulletPoints = newInternships[intIndex].bulletPoints.filter((_, i) => i !== bulletIndex);
    onResumeDataChange('internships', newInternships);
  };

  // --- Project Handlers (New) ---
  const handleProjectChange = (index: number, field: keyof Project, value: string | string[]) => {
    const newProjects = [...resumeData.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    onResumeDataChange('projects', newProjects);
  };
  
  const handleProjectBulletChange = (projIndex: number, bulletIndex: number, value: string) => {
    const newProjects = [...resumeData.projects];
    newProjects[projIndex].bulletPoints[bulletIndex] = value;
    onResumeDataChange('projects', newProjects);
  };

  const addProject = () => {
    const newProject: Project = {
      id: `proj${Date.now()}`,
      name: '',
      link: '',
      bulletPoints: [''],
    };
    onResumeDataChange('projects', [...resumeData.projects, newProject]);
  };

  const removeProject = (index: number) => {
    const newProjects = resumeData.projects.filter((_, i) => i !== index);
    onResumeDataChange('projects', newProjects);
  };
  
  const addProjectBullet = (projIndex: number) => {
    const newProjects = [...resumeData.projects];
    newProjects[projIndex].bulletPoints.push('');
    onResumeDataChange('projects', newProjects);
  };

  const removeProjectBullet = (projIndex: number, bulletIndex: number) => {
    const newProjects = [...resumeData.projects];
    newProjects[projIndex].bulletPoints = newProjects[projIndex].bulletPoints.filter((_, i) => i !== bulletIndex);
    onResumeDataChange('projects', newProjects);
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
    onResumeDataChange('skills', value.split(',').map(skill => skill.trim()));
  };

  // --- Custom Section Handlers (New) ---
  const addCustomSection = () => {
    const newCustomSection: CustomSection = {
      id: `custom${Date.now()}`,
      title: 'New Section',
      bulletPoints: [''],
    };
    onResumeDataChange('customSections', [...resumeData.customSections, newCustomSection]);
  };

  const removeCustomSection = (index: number) => {
    const newCustomSections = resumeData.customSections.filter((_, i) => i !== index);
    onResumeDataChange('customSections', newCustomSections);
  };
  
  const handleCustomSectionTitleChange = (index: number, value: string) => {
    const newCustomSections = [...resumeData.customSections];
    newCustomSections[index].title = value;
    onResumeDataChange('customSections', newCustomSections);
  };
  
  const handleCustomSectionBulletChange = (secIndex: number, bulletIndex: number, value: string) => {
    const newCustomSections = [...resumeData.customSections];
    newCustomSections[secIndex].bulletPoints[bulletIndex] = value;
    onResumeDataChange('customSections', newCustomSections);
  };

  const addCustomSectionBullet = (secIndex: number) => {
    const newCustomSections = [...resumeData.customSections];
    newCustomSections[secIndex].bulletPoints.push('');
    onResumeDataChange('customSections', newCustomSections);
  };

  const removeCustomSectionBullet = (secIndex: number, bulletIndex: number) => {
    const newCustomSections = [...resumeData.customSections];
    newCustomSections[secIndex].bulletPoints = newCustomSections[secIndex].bulletPoints.filter((_, i) => i !== bulletIndex);
    onResumeDataChange('customSections', newCustomSections);
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

      {/* Internships (New) */}
      <SectionWrapper title="Internships">
        <div className="space-y-6">
          {resumeData.internships.map((internship, index) => (
            <div key={internship.id} className="p-4 border border-slate-200 rounded-md space-y-4 bg-slate-50">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-slate-700">Internship #{index + 1}</h3>
                <Button variant="secondary" onClick={() => removeInternship(index)} aria-label="Remove Internship">
                  <TrashIcon />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Company" value={internship.company} onChange={(e) => handleInternshipChange(index, 'company', e.target.value)} />
                <Input label="Role" value={internship.role} onChange={(e) => handleInternshipChange(index, 'role', e.target.value)} />
                <Input label="Date" value={internship.date} onChange={(e) => handleInternshipChange(index, 'date', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Key Responsibilities</label>
                <div className="space-y-2">
                  {internship.bulletPoints.map((point, bulletIndex) => (
                    <div key={bulletIndex} className="flex items-center gap-2">
                      <Textarea
                        id={`intern-${index}-bullet-${bulletIndex}`}
                        className="flex-grow"
                        rows={2}
                        value={point}
                        onChange={(e) => handleInternshipBulletChange(index, bulletIndex, e.target.value)}
                        placeholder={`Responsibility #${bulletIndex + 1}`}
                      />
                      <Button variant="secondary" onClick={() => removeInternshipBullet(index, bulletIndex)} aria-label="Remove Bullet Point">
                        <TrashIcon />
                      </Button>
                    </div>
                  ))}
                  <Button variant="secondary" onClick={() => addInternshipBullet(index)}>
                    <PlusIcon /> Add Bullet Point
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button onClick={addInternship}><PlusIcon /> Add Internship</Button>
        </div>
      </SectionWrapper>

      {/* Projects (New) */}
      <SectionWrapper title="Projects">
        <div className="space-y-6">
          {resumeData.projects.map((project, index) => (
            <div key={project.id} className="p-4 border border-slate-200 rounded-md space-y-4 bg-slate-50">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-slate-700">Project #{index + 1}</h3>
                <Button variant="secondary" onClick={() => removeProject(index)} aria-label="Remove Project">
                  <TrashIcon />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Project Name" value={project.name} onChange={(e) => handleProjectChange(index, 'name', e.target.value)} />
                <Input label="Project Link" value={project.link} onChange={(e) => handleProjectChange(index, 'link', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Description / Key Features</label>
                <div className="space-y-2">
                  {project.bulletPoints.map((point, bulletIndex) => (
                    <div key={bulletIndex} className="flex items-center gap-2">
                      <Textarea
                        id={`project-${index}-bullet-${bulletIndex}`}
                        className="flex-grow"
                        rows={2}
                        value={point}
                        onChange={(e) => handleProjectBulletChange(index, bulletIndex, e.target.value)}
                        placeholder={`Description #${bulletIndex + 1}`}
                      />
                      <Button variant="secondary" onClick={() => removeProjectBullet(index, bulletIndex)} aria-label="Remove Bullet Point">
                        <TrashIcon />
                      </Button>
                    </div>
                  ))}
                  <Button variant="secondary" onClick={() => addProjectBullet(index)}>
                    <PlusIcon /> Add Bullet Point
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button onClick={addProject}><PlusIcon /> Add Project</Button>
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

      {/* Custom Sections (New) */}
      {resumeData.customSections.map((section, index) => (
        <SectionWrapper key={section.id} title={section.title}>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                  <Input 
                      label="Section Title"
                      value={section.title}
                      onChange={(e) => handleCustomSectionTitleChange(index, e.target.value)}
                      className="font-semibold !text-lg"
                  />
                  <Button variant="secondary" onClick={() => removeCustomSection(index)} aria-label="Remove Custom Section" className="mt-7">
                      <TrashIcon />
                  </Button>
              </div>
              
              <label className="block text-sm font-medium text-slate-600 mb-1">Content</label>
              <div className="space-y-2">
                  {section.bulletPoints.map((point, bulletIndex) => (
                      <div key={bulletIndex} className="flex items-center gap-2">
                          <Textarea
                              id={`custom-${index}-bullet-${bulletIndex}`}
                              className="flex-grow"
                              rows={1}
                              value={point}
                              onChange={(e) => handleCustomSectionBulletChange(index, bulletIndex, e.target.value)}
                              placeholder={`Item #${bulletIndex + 1}`}
                          />
                          <Button variant="secondary" onClick={() => removeCustomSectionBullet(index, bulletIndex)} aria-label="Remove Item">
                              <TrashIcon />
                          </Button>
                      </div>
                  ))}
                  <Button variant="secondary" onClick={() => addCustomSectionBullet(index)}>
                      <PlusIcon /> Add Item
                  </Button>
              </div>
            </div>
        </SectionWrapper>
      ))}

      <div className="text-center">
        <Button onClick={addCustomSection} variant="secondary">
          <PlusIcon /> Add Custom Section
        </Button>
      </div>


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