import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  resumeData: ResumeData;
}

export const TemplateCompact = React.forwardRef<HTMLDivElement, TemplateProps>(({ resumeData }, ref) => {
  const { personalInfo, summary, experience, internships, projects, education, skills, customSections } = resumeData;
  
  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <section className="mb-3">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-1">{title}</h2>
      {children}
    </section>
  );

  return (
    <div ref={ref} className="p-6 font-sans text-xs" style={{ fontFamily: 'Arial, sans-serif' }}>
      <header className="text-center mb-4">
        <h1 className="text-2xl font-bold tracking-tight">{personalInfo.name}</h1>
        <div className="text-xxs text-slate-600 flex justify-center flex-wrap gap-x-3">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.linkedin}</span>
          <span>{personalInfo.website}</span>
        </div>
      </header>

      <main>
        {summary && (
          <Section title="Summary">
            <p className="text-slate-700 text-justify">{summary}</p>
          </Section>
        )}

        {experience && experience.length > 0 && (
          <Section title="Experience">
            <div className="space-y-2">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-slate-800">{exp.role} at {exp.company}</h3>
                    <span className="font-medium text-slate-500">{exp.date}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-700 pl-2">
                    {exp.bulletPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {internships && internships.length > 0 && (
          <Section title="Internships">
            <div className="space-y-2">
              {internships.map((internship) => (
                <div key={internship.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-slate-800">{internship.role} at {internship.company}</h3>
                    <span className="font-medium text-slate-500">{internship.date}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-700 pl-2">
                    {internship.bulletPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {projects && projects.length > 0 && (
          <Section title="Projects">
            <div className="space-y-2">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-slate-800">{project.name}</h3>
                    {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{project.link}</a>}
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-700 pl-2">
                    {project.bulletPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}
        
        {education && education.length > 0 && (
          <Section title="Education">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-semibold text-slate-800">{edu.institution}</h3>
                  <p className="text-slate-600">{edu.degree}</p>
                </div>
                <span className="font-medium text-slate-500">{edu.date}</span>
              </div>
            ))}
          </Section>
        )}

        {skills && skills.length > 0 && (
          <Section title="Skills">
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, index) => (
                <span key={index} className="bg-slate-200 text-slate-800 text-xxs font-semibold px-2 py-0.5 rounded-md">
                  {skill}
                </span>
              ))}
            </div>
          </Section>
        )}

        {customSections && customSections.map((section) => (
          section.title && <Section key={section.id} title={section.title}>
            <ul className="list-disc list-inside space-y-0.5 text-slate-700 pl-2">
              {section.bulletPoints.map((point, index) => (
                point && <li key={index}>{point}</li>
              ))}
            </ul>
          </Section>
        ))}
      </main>
    </div>
  );
});