import React from 'react';
import { ResumeData } from '../../types';

interface TemplateProps {
  resumeData: ResumeData;
}

export const TemplateCompact = React.forwardRef<HTMLDivElement, TemplateProps>(({ resumeData }, ref) => {
  const { personalInfo, summary, experience, education, skills } = resumeData;

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
        <section className="mb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-1">Summary</h2>
          <p className="text-slate-700 text-justify">{summary}</p>
        </section>

        <section className="mb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-1">Experience</h2>
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
        </section>

        <section className="mb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-1">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="flex justify-between items-baseline">
              <div>
                <h3 className="font-semibold text-slate-800">{edu.institution}</h3>
                <p className="text-slate-600">{edu.degree}</p>
              </div>
              <span className="font-medium text-slate-500">{edu.date}</span>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-1">Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, index) => (
              <span key={index} className="bg-slate-200 text-slate-800 text-xxs font-semibold px-2 py-0.5 rounded-md">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
});
