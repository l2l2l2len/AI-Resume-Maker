import React, { forwardRef } from 'react';
import { ResumeData } from '../../types';

interface TemplateATSProProps {
  resumeData: ResumeData;
}

export const TemplateATSPro = forwardRef<HTMLDivElement, TemplateATSProProps>(
  ({ resumeData }, ref) => {
    const { personalInfo, summary, experience, internships, projects, education, skills, customSections } = resumeData;

    return (
      <div
        ref={ref}
        className="bg-white text-black p-8 min-h-full"
        style={{
          fontFamily: 'Calibri, Arial, sans-serif',
          fontSize: '11pt',
          lineHeight: '1.5',
        }}
      >
        {/* Header with Blue Accent */}
        <header className="mb-6 pb-4 border-b-2 border-blue-600">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {personalInfo.name || 'Your Name'}
          </h1>
          <div className="text-sm text-gray-600 flex flex-wrap gap-3">
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <span>📧</span> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <span>📱</span> {personalInfo.phone}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <span>🔗</span> {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1">
                <span>🌐</span> {personalInfo.website}
              </span>
            )}
          </div>
        </header>

        {/* Skills at the top for keyword visibility */}
        {skills.length > 0 && skills.some(skill => skill) && (
          <section className="mb-5">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">
              Core Competencies
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.filter(skill => skill).map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-800 text-sm rounded border border-blue-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Summary */}
        {summary && (
          <section className="mb-5">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">
              Professional Summary
            </h2>
            <p className="text-gray-700">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && experience.some(exp => exp.company || exp.role) && (
          <section className="mb-5">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">
              Professional Experience
            </h2>
            {experience.map((exp, index) => (
              (exp.company || exp.role) && (
                <div key={exp.id || index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{exp.role}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500 font-medium">{exp.date}</span>
                  </div>
                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <ul className="mt-2 text-sm text-gray-700 space-y-1">
                      {exp.bulletPoints.map((point, i) => point && (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">▸</span>
                          <span>{point}</span>
                        </li>
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
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">
              Internship Experience
            </h2>
            {internships.map((internship, index) => (
              (internship.company || internship.role) && (
                <div key={internship.id || index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{internship.role}</h3>
                      <p className="text-gray-600">{internship.company}</p>
                    </div>
                    <span className="text-sm text-gray-500 font-medium">{internship.date}</span>
                  </div>
                  {internship.bulletPoints && internship.bulletPoints.length > 0 && (
                    <ul className="mt-2 text-sm text-gray-700 space-y-1">
                      {internship.bulletPoints.map((point, i) => point && (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">▸</span>
                          <span>{point}</span>
                        </li>
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
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">
              Projects
            </h2>
            {projects.map((project, index) => (
              project.name && (
                <div key={project.id || index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    {project.link && (
                      <span className="text-sm text-blue-600">{project.link}</span>
                    )}
                  </div>
                  {project.bulletPoints && project.bulletPoints.length > 0 && (
                    <ul className="mt-2 text-sm text-gray-700 space-y-1">
                      {project.bulletPoints.map((point, i) => point && (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">▸</span>
                          <span>{point}</span>
                        </li>
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
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">
              Education
            </h2>
            {education.map((edu, index) => (
              (edu.institution || edu.degree) && (
                <div key={edu.id || index} className="mb-2 flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">{edu.date}</span>
                </div>
              )
            ))}
          </section>
        )}

        {/* Custom Sections */}
        {customSections.map((section, index) => (
          section.title && section.bulletPoints.some(point => point) && (
            <section key={section.id || index} className="mb-5">
              <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">
                {section.title}
              </h2>
              <ul className="text-sm text-gray-700 space-y-1">
                {section.bulletPoints.map((point, i) => point && (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">▸</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          )
        ))}
      </div>
    );
  }
);

TemplateATSPro.displayName = 'TemplateATSPro';
