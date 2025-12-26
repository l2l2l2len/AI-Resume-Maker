import React, { forwardRef } from 'react';
import { ResumeData } from '../../types';

interface TemplateATSProps {
  resumeData: ResumeData;
}

export const TemplateATS = forwardRef<HTMLDivElement, TemplateATSProps>(
  ({ resumeData }, ref) => {
    const { personalInfo, summary, experience, internships, projects, education, skills, customSections } = resumeData;

    return (
      <div
        ref={ref}
        className="bg-white text-black p-8 min-h-full"
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '11pt',
          lineHeight: '1.4',
        }}
      >
        {/* Header - Simple centered name and contact */}
        <header className="text-center mb-6 pb-4 border-b-2 border-gray-800">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-wide">
            {personalInfo.name || 'Your Name'}
          </h1>
          <div className="text-sm text-gray-700 space-x-3">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>| {personalInfo.phone}</span>}
            {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
            {personalInfo.website && <span>| {personalInfo.website}</span>}
          </div>
        </header>

        {/* Summary */}
        {summary && (
          <section className="mb-5">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-gray-800 text-sm">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && experience.some(exp => exp.company || exp.role) && (
          <section className="mb-5">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-1 mb-2">
              Work Experience
            </h2>
            {experience.map((exp, index) => (
              (exp.company || exp.role) && (
                <div key={exp.id || index} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900">{exp.role}</h3>
                    <span className="text-sm text-gray-600">{exp.date}</span>
                  </div>
                  <p className="text-gray-700 italic">{exp.company}</p>
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <ul className="list-disc list-inside mt-1 text-sm text-gray-800 ml-2">
                      {exp.bulletPoints.map((point, i) => point && (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            ))}
          </section>
        )}

        {/* Internships */}
        {internships.length > 0 && internships.some(int => int.company || int.role) && (
          <section className="mb-5">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-1 mb-2">
              Internships
            </h2>
            {internships.map((internship, index) => (
              (internship.company || internship.role) && (
                <div key={internship.id || index} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900">{internship.role}</h3>
                    <span className="text-sm text-gray-600">{internship.date}</span>
                  </div>
                  <p className="text-gray-700 italic">{internship.company}</p>
                  {internship.bulletPoints && internship.bulletPoints.length > 0 && (
                    <ul className="list-disc list-inside mt-1 text-sm text-gray-800 ml-2">
                      {internship.bulletPoints.map((point, i) => point && (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            ))}
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && projects.some(proj => proj.name) && (
          <section className="mb-5">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-1 mb-2">
              Projects
            </h2>
            {projects.map((project, index) => (
              project.name && (
                <div key={project.id || index} className="mb-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    {project.link && <span className="text-sm text-gray-600">{project.link}</span>}
                  </div>
                  {project.bulletPoints && project.bulletPoints.length > 0 && (
                    <ul className="list-disc list-inside mt-1 text-sm text-gray-800 ml-2">
                      {project.bulletPoints.map((point, i) => point && (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && education.some(edu => edu.institution || edu.degree) && (
          <section className="mb-5">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-1 mb-2">
              Education
            </h2>
            {education.map((edu, index) => (
              (edu.institution || edu.degree) && (
                <div key={edu.id || index} className="mb-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <span className="text-sm text-gray-600">{edu.date}</span>
                  </div>
                  <p className="text-gray-700">{edu.institution}</p>
                </div>
              )
            ))}
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && skills.some(skill => skill) && (
          <section className="mb-5">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-1 mb-2">
              Skills
            </h2>
            <p className="text-sm text-gray-800">
              {skills.filter(skill => skill).join(' • ')}
            </p>
          </section>
        )}

        {/* Custom Sections */}
        {customSections.map((section, index) => (
          section.title && section.bulletPoints.some(point => point) && (
            <section key={section.id || index} className="mb-5">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-400 pb-1 mb-2">
                {section.title}
              </h2>
              <ul className="list-disc list-inside text-sm text-gray-800 ml-2">
                {section.bulletPoints.map((point, i) => point && (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </section>
          )
        ))}
      </div>
    );
  }
);

TemplateATS.displayName = 'TemplateATS';
