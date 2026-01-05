import React, { useState } from 'react';
import { ResumeData } from '../../types';
import { Template } from '../../App';
import { Button } from '../ui/Button';

// Icons
const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const DuplicateIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const MoreIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export interface SavedResume {
  id: string;
  name: string;
  template: Template;
  lastModified: Date;
  data: ResumeData;
}

interface MyResumesProps {
  savedResumes: SavedResume[];
  onCreateNew: () => void;
  onEditResume: (resume: SavedResume) => void;
  onDeleteResume: (id: string) => void;
  onDuplicateResume: (resume: SavedResume) => void;
  onDownloadResume: (resume: SavedResume) => void;
}

export const MyResumes: React.FC<MyResumesProps> = ({
  savedResumes = [],
  onCreateNew,
  onEditResume,
  onDeleteResume,
  onDuplicateResume,
  onDownloadResume,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredResumes = savedResumes.filter((resume) =>
    resume.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const handleDelete = (id: string) => {
    onDeleteResume(id);
    setDeleteConfirmId(null);
  };

  const getTemplateColor = (template: Template) => {
    switch (template) {
      case 'classic':
        return '#2563eb';
      case 'modern':
        return '#059669';
      case 'compact':
        return '#db2777';
      case 'ats':
        return '#374151';
      case 'ats-pro':
        return '#2563eb';
      default:
        return '#2563eb';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">My Resumes</h1>
            <Button onClick={onCreateNew} size="sm">
              <PlusIcon /> New
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search resumes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 min-h-[44px] bg-gray-100 border-0 rounded-xl text-base placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Empty State */}
        {savedResumes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center mt-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DocumentIcon />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No resumes yet</h2>
            <p className="text-gray-500 mb-6">
              Create your first resume and it will appear here
            </p>
            <Button onClick={onCreateNew}>
              <PlusIcon /> Create Your First Resume
            </Button>
          </div>
        ) : filteredResumes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No resumes match "{searchQuery}"</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredResumes.map((resume) => (
              <div
                key={resume.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <div className="flex items-stretch">
                  {/* Color bar */}
                  <div
                    className="w-1.5 flex-shrink-0"
                    style={{ backgroundColor: getTemplateColor(resume.template) }}
                  />

                  {/* Content */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0" onClick={() => onEditResume(resume)}>
                        <h3 className="font-medium text-gray-900 truncate">
                          {resume.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {resume.template.charAt(0).toUpperCase() + resume.template.slice(1)} • Modified {formatDate(resume.lastModified)}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 ml-2">
                        <button
                          onClick={() => onEditResume(resume)}
                          className="p-2.5 min-w-[44px] min-h-[44px] rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors touch-action-manipulation"
                          aria-label="Edit resume"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => setOpenMenuId(openMenuId === resume.id ? null : resume.id)}
                          className="p-2.5 min-w-[44px] min-h-[44px] rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors touch-action-manipulation"
                          aria-label="More options"
                        >
                          <MoreIcon />
                        </button>
                      </div>
                    </div>

                    {/* Dropdown menu */}
                    {openMenuId === resume.id && (
                      <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-2">
                        <button
                          onClick={() => {
                            onDownloadResume(resume);
                            setOpenMenuId(null);
                          }}
                          className="flex items-center gap-2 px-3 py-2 min-h-[40px] rounded-lg text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors touch-action-manipulation"
                        >
                          <DownloadIcon /> Download
                        </button>
                        <button
                          onClick={() => {
                            onDuplicateResume(resume);
                            setOpenMenuId(null);
                          }}
                          className="flex items-center gap-2 px-3 py-2 min-h-[40px] rounded-lg text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors touch-action-manipulation"
                        >
                          <DuplicateIcon /> Duplicate
                        </button>
                        <button
                          onClick={() => {
                            setDeleteConfirmId(resume.id);
                            setOpenMenuId(null);
                          }}
                          className="flex items-center gap-2 px-3 py-2 min-h-[40px] rounded-lg text-sm text-red-600 bg-red-50 hover:bg-red-100 transition-colors touch-action-manipulation"
                        >
                          <TrashIcon /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setDeleteConfirmId(null)}
          />
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-sm mx-auto bg-white rounded-2xl p-6 z-50 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Resume?
            </h3>
            <p className="text-gray-500 mb-6">
              This action cannot be undone. The resume will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1"
              >
                Delete
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyResumes;
