import React from 'react';
import { ResumeData } from '../../types';
import { Template } from '../../App';

// Icons
const PlusIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const TemplateIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

interface SavedResume {
  id: string;
  name: string;
  template: Template;
  lastModified: Date;
  data: ResumeData;
}

interface DashboardProps {
  onCreateNew: () => void;
  onEditResume: (resume: SavedResume) => void;
  onViewTemplates: () => void;
  savedResumes: SavedResume[];
  currentResumeName?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onCreateNew,
  onEditResume,
  onViewTemplates,
  savedResumes = [],
  currentResumeName,
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 pt-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
          <p className="text-blue-100">
            {currentResumeName
              ? `Continue working on "${currentResumeName}"`
              : 'Start creating your professional resume'}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-4xl mx-auto px-4 -mt-6">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={onCreateNew}
            className="flex flex-col items-center justify-center gap-2 p-4 min-h-[100px] bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow touch-action-manipulation"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <PlusIcon />
            </div>
            <span className="text-sm font-medium text-gray-700">New Resume</span>
          </button>

          <button
            onClick={onViewTemplates}
            className="flex flex-col items-center justify-center gap-2 p-4 min-h-[100px] bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow touch-action-manipulation"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <TemplateIcon />
            </div>
            <span className="text-sm font-medium text-gray-700">Templates</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-2xl font-bold text-gray-900">{savedResumes.length}</p>
            <p className="text-xs text-gray-500">Saved Resumes</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-2xl font-bold text-gray-900">5</p>
            <p className="text-xs text-gray-500">Templates</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <p className="text-2xl font-bold text-blue-600">Free</p>
            <p className="text-xs text-gray-500">Forever</p>
          </div>
        </div>

        {/* Recent Resumes */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Recent Resumes</h2>
            {savedResumes.length > 0 && (
              <span className="text-sm text-gray-500">{savedResumes.length} saved</span>
            )}
          </div>

          {savedResumes.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DocumentIcon />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">No resumes yet</h3>
              <p className="text-sm text-gray-500 mb-4">
                Create your first resume to get started
              </p>
              <button
                onClick={onCreateNew}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors touch-action-manipulation"
              >
                <PlusIcon />
                Create Resume
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {savedResumes.slice(0, 5).map((resume) => (
                <button
                  key={resume.id}
                  onClick={() => onEditResume(resume)}
                  className="flex items-center justify-between w-full p-4 hover:bg-gray-50 transition-colors touch-action-manipulation"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                      <DocumentIcon />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{resume.name}</p>
                      <p className="text-xs text-gray-500">
                        {resume.template} • {formatDate(resume.lastModified)}
                      </p>
                    </div>
                  </div>
                  <ChevronRightIcon />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <h3 className="font-semibold text-blue-900 mb-2">Pro Tips</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              Use action verbs to describe your achievements
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              Quantify your accomplishments with numbers
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              Keep your resume to one page if possible
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
