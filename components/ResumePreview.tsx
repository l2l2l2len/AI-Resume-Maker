import React, { useRef, useState } from 'react';
import { ResumeData } from '../types';
import { Button } from './ui/Button';
import { DownloadIcon, SpinnerIcon, BackIcon } from './icons';
import { Template } from '../App';
import { TemplateClassic } from './templates/TemplateClassic';
import { TemplateModern } from './templates/TemplateModern';
import { TemplateCompact } from './templates/TemplateCompact';
import { TemplateATS } from './templates/TemplateATS';
import { TemplateATSPro } from './templates/TemplateATSPro';

declare const html2canvas: any;
declare const jspdf: { jsPDF: any };

interface ResumePreviewProps {
  resumeData: ResumeData;
  template: Template;
  onEdit: () => void;
}

const templates: { [key in Template]: React.ForwardRefExoticComponent<any> } = {
  classic: TemplateClassic,
  modern: TemplateModern,
  compact: TemplateCompact,
  'ats': TemplateATS,
  'ats-pro': TemplateATSPro,
};

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, template, onEdit }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;

    // Check if libraries are loaded
    if (typeof html2canvas === 'undefined') {
      alert("PDF library (html2canvas) is not loaded. Please refresh the page and try again.");
      return;
    }
    if (typeof jspdf === 'undefined' || !jspdf.jsPDF) {
      alert("PDF library (jsPDF) is not loaded. Please refresh the page and try again.");
      return;
    }

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const canvasAspectRatio = canvas.width / canvas.height;
      const pageAspectRatio = pdfWidth / pdfHeight;

      let finalWidth, finalHeight;
      if (canvasAspectRatio > pageAspectRatio) {
          finalWidth = pdfWidth;
          finalHeight = pdfWidth / canvasAspectRatio;
      } else {
          finalHeight = pdfHeight;
          finalWidth = pdfHeight * canvasAspectRatio;
      }

      const x = (pdfWidth - finalWidth) / 2;
      const y = 0;

      pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);

      const fileName = `${resumeData.personalInfo.name.replace(/\s+/g, '_') || 'Resume'}_Resume.pdf`;
      pdf.save(fileName);

    } catch (error: any) {
      console.error("Error downloading PDF:", error);
      alert(`Error generating PDF: ${error.message || 'Unknown error'}. Please try again.`);
    } finally {
      setIsDownloading(false);
    }
  };

  const SelectedTemplate = templates[template];

  return (
    <div className="w-full max-w-full overflow-x-hidden space-y-4 md:space-y-6 pb-24 md:pb-6">
      {/* Header with buttons */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <h2 className="text-xl font-semibold text-gray-900">Final Preview</h2>
        <div className="flex items-center gap-3">
          <Button onClick={onEdit} variant="secondary" className="flex-1 md:flex-none">
            <BackIcon /> Edit
          </Button>
          <Button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="hidden md:flex"
          >
            {isDownloading ? <SpinnerIcon /> : <DownloadIcon />}
            {isDownloading ? 'Downloading...' : 'Download PDF'}
          </Button>
        </div>
      </div>

      {/* Resume Preview - scales on mobile for proper viewing */}
      <div className="w-full overflow-x-auto md:overflow-visible">
        <div className="bg-gray-200 border border-gray-300 rounded-xl p-2 md:p-6 lg:p-8 resume-preview-container">
          <div className="bg-white text-black shadow-lg rounded-lg overflow-hidden resume-preview-inner">
            <SelectedTemplate ref={previewRef} resumeData={resumeData} />
          </div>
        </div>
      </div>

      <style>{`
        .resume-preview-container {
          width: 100%;
          max-width: 850px;
          margin-left: auto;
          margin-right: auto;
        }
        .resume-preview-inner {
          width: 100%;
          min-height: auto;
        }
        @media screen and (max-width: 767px) {
          .resume-preview-container {
            /* On mobile, show a scaled preview */
            transform-origin: top left;
          }
          .resume-preview-inner {
            /* Allow natural height on mobile */
            min-height: 400px;
          }
        }
        @media screen and (min-width: 768px) {
          .resume-preview-container {
            aspect-ratio: 210 / 297;
          }
          .resume-preview-inner {
            height: 100%;
            overflow: auto;
          }
        }
      `}</style>

      {/* Mobile floating download button - fixed at bottom with safe area */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 safe-area-bottom max-w-full">
        <button
          onClick={handleDownloadPdf}
          disabled={isDownloading}
          className="w-full py-3.5 px-6 min-h-[48px] rounded-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 flex items-center justify-center gap-2 disabled:opacity-50 transition-colors touch-action-manipulation"
        >
          {isDownloading ? <><SpinnerIcon />Downloading...</> : <><DownloadIcon />Download PDF</>}
        </button>
      </div>
    </div>
  );
};
