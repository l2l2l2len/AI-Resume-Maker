import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  resumeData: ResumeData;
}

export const TemplateModern = React.forwardRef<HTMLDivElement, TemplateProps>(({ resumeData }, ref) => {
  const { personalInfo, summary, experience, internships, projects, education, skills, customSections } = resumeData;

  const MainSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <section className="mb-6">
      <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 mb-2">{title}</h2>
      {children}
    </section>
  );

  return (
    <div ref={ref} className="flex min-h-full font-sans" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
      {/* Left Column */}
      <aside className="w-1/3 bg-slate-800 text-white p-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">{personalInfo.name}</h1>
        </header>
        
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-2 border-b border-slate-600 pb-1">Contact</h2>
          <div className="text-xs space-y-1 text-slate-300">
            <p>{personalInfo.email}</p>
            <p>{personalInfo.phone}</p>
            <p>{personalInfo.linkedin}</p>
            <p>{personalInfo.website}</p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-2 border-b border-slate-600 pb-1">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="text-xs mb-2">
              <h3 className="font-semibold text-white">{edu.institution}</h3>
              <p className="text-slate-300">{edu.degree}</p>
              <p className="text-slate-400">{edu.date}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-2 border-b border-slate-600 pb-1">Skills</h2>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {skills.map((skill, index) => (
              <span key={index} className="bg-slate-700 text-slate-200 px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </aside>

      {/* Right Column */}
      <main className="w-2/3 p-8 bg-white text-slate-800">
        {summary && (
          <MainSection title="Summary">
            <p className="text-sm text-slate-700 text-justify">{summary}</p>
          </MainSection>
        )}

        {experience && experience.length > 0 && (
          <MainSection title="Experience">
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-slate-900 text-md">{exp.role}</h3>
                    <span className="text-xs font-medium text-slate-500">{exp.date}</span>
                  </div>
                  <h4 className="text-sm font-medium text-slate-600 mb-1">{exp.company}</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
                    {exp.bulletPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </MainSection>
        )}

        {internships && internships.length > 0 && (
          <MainSection title="Internships">
            <div className="space-y-4">
              {internships.map((internship) => (
                <div key={internship.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-slate-900 text-md">{internship.role}</h3>
                    <span className="text-xs font-medium text-slate-500">{internship.date}</span>
                  </div>
                  <h4 className="text-sm font-medium text-slate-600 mb-1">{internship.company}</h4>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
                    {internship.bulletPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </MainSection>
        )}

        {projects && projects.length > 0 && (
          <MainSection title="Projects">
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-slate-900 text-md">{project.name}</h3>
                    {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-600 hover:underline">{project.link}</a>}
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
                    {project.bulletPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </MainSection>
        )}

        {customSections && customSections.map((section) => (
          section.title && <MainSection key={section.id} title={section.title}>
            <ul className="list-disc list-inside space-y-1 text-slate-700 text-sm">
              {section.bulletPoints.map((point, index) => (
                point && <li key={index}>{point}</li>
              ))}
            </ul>
          </MainSection>
        ))}
      </main>
    </div>
  );
});